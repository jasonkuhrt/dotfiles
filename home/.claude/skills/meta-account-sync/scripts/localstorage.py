"""The Claude app's localStorage: read a key, and put one while the app is closed.

The app's web page keeps some state only in its localStorage, such as session
presets, and mirrors it out to files it never reads back. localStorage is a
Chromium leveldb. A put appends one write batch to the database's current log,
which leveldb replays the next time the app opens it, so a put is made only
inside closed(), which holds the lock the app holds while it runs.
"""

import contextlib
import fcntl
import os
import struct
from pathlib import Path

DIR = Path.home() / "Library/Application Support/Claude/Local Storage/leveldb"
ORIGIN = b"_https://claude.ai\x00\x01"
BLOCK = 32768
FULL, FIRST, MIDDLE, LAST = 1, 2, 3, 4
VALUE = 1


def _crc_table():
    table = []
    for n in range(256):
        c = n
        for _ in range(8):
            c = (c >> 1) ^ 0x82F63B78 if c & 1 else c >> 1
        table.append(c)
    return table


CRC = _crc_table()


def _crc(data):
    """leveldb's masked CRC-32C."""
    c = 0xFFFFFFFF
    for x in data:
        c = CRC[(c ^ x) & 0xFF] ^ (c >> 8)
    c ^= 0xFFFFFFFF
    return (((c >> 15) | (c << 17)) + 0xA282EAD8) & 0xFFFFFFFF


def _varint(b, i):
    n = shift = 0
    while True:
        c = b[i]
        i += 1
        n |= (c & 0x7F) << shift
        if c < 0x80:
            return n, i
        shift += 7


def _put_varint(n):
    out = bytearray()
    while n >= 0x80:
        out.append(n & 0x7F | 0x80)
        n >>= 7
    out.append(n)
    return bytes(out)


def _unsnappy(b):
    size, i = _varint(b, 0)
    out = bytearray()
    while i < len(b):
        tag = b[i]
        i += 1
        if tag & 3 == 0:
            n = tag >> 2
            if n >= 60:
                width = n - 59
                n = int.from_bytes(b[i:i + width], "little")
                i += width
            out += b[i:i + n + 1]
            i += n + 1
            continue
        if tag & 3 == 1:
            n, offset = ((tag >> 2) & 7) + 4, ((tag >> 5) << 8) | b[i]
            i += 1
        else:
            width = 2 if tag & 3 == 2 else 4
            n, offset = (tag >> 2) + 1, int.from_bytes(b[i:i + width], "little")
            i += width
        for _ in range(n):
            out.append(out[-offset])
    if len(out) != size:
        raise ValueError("snappy block decodes to the wrong size")
    return bytes(out)


def _records(path):
    """The whole records of a leveldb log file; a torn or bad record ends it."""
    data = path.read_bytes()
    pos, parts = 0, None
    while pos + 7 <= len(data):
        left = BLOCK - pos % BLOCK
        if left < 7:
            pos += left
            continue
        crc, n, kind = struct.unpack("<IHB", data[pos:pos + 7])
        body = data[pos + 7:pos + 7 + n]
        if len(body) < n or crc != _crc(bytes([kind]) + body):
            return
        pos += 7 + n
        if kind == FULL:
            yield body
        elif kind == FIRST:
            parts = body
        elif kind in (MIDDLE, LAST) and parts is not None:
            parts += body
            if kind == LAST:
                yield parts
                parts = None


def _manifest():
    """The live log number, last sequence and table numbers, per the manifest."""
    log, last, tables = 0, 0, set()
    for edit in _records(DIR / (DIR / "CURRENT").read_text().strip()):
        i = 0
        while i < len(edit):
            tag, i = _varint(edit, i)
            if tag == 1:  # comparator name
                n, i = _varint(edit, i)
                i += n
            elif tag == 2:
                log, i = _varint(edit, i)
            elif tag in (3, 9):  # next file number, previous log number
                _, i = _varint(edit, i)
            elif tag == 4:
                last, i = _varint(edit, i)
            elif tag == 5:  # compaction pointer: level, internal key
                _, i = _varint(edit, i)
                n, i = _varint(edit, i)
                i += n
            elif tag == 6:  # deleted file: level, number
                _, i = _varint(edit, i)
                number, i = _varint(edit, i)
                tables.discard(number)
            elif tag == 7:  # new file: level, number, size, smallest, largest
                _, i = _varint(edit, i)
                number, i = _varint(edit, i)
                _, i = _varint(edit, i)
                for _ in range(2):
                    n, i = _varint(edit, i)
                    i += n
                tables.add(number)
            else:
                raise ValueError(f"unknown manifest tag {tag}")
    return log, last, tables


def _block(f, offset, size):
    f.seek(offset)
    raw = f.read(size + 5)
    return _unsnappy(raw[:size]) if raw[size] == 1 else raw[:size]


def _entries(block):
    restarts = struct.unpack("<I", block[-4:])[0]
    end, i, key = len(block) - 4 - 4 * restarts, 0, b""
    while i < end:
        shared, i = _varint(block, i)
        own, i = _varint(block, i)
        n, i = _varint(block, i)
        key = key[:shared] + block[i:i + own]
        i += own
        yield key, block[i:i + n]
        i += n


def _table(path):
    with open(path, "rb") as f:
        f.seek(-48, 2)
        footer = f.read(48)
        _, i = _varint(footer, 0)
        _, i = _varint(footer, i)
        offset, i = _varint(footer, i)
        size, _ = _varint(footer, i)
        for _, handle in _entries(_block(f, offset, size)):
            at, j = _varint(handle, 0)
            n, _ = _varint(handle, j)
            for key, value in _entries(_block(f, at, n)):
                tag = struct.unpack("<Q", key[-8:])[0]
                yield key[:-8], tag >> 8, value if tag & 0xFF == VALUE else None


def _batch(payload):
    seq, count = struct.unpack("<QI", payload[:12])
    i = 12
    for n in range(count):
        kind = payload[i]
        n_key, i = _varint(payload, i + 1)
        key = payload[i:i + n_key]
        i += n_key
        value = None
        if kind == VALUE:
            n_value, i = _varint(payload, i)
            value = payload[i:i + n_value]
            i += n_value
        yield key, seq + n, value


def _scan():
    """Each key's newest value (None once deleted), the newest sequence, the live log."""
    log, last, tables = _manifest()
    newest = {}

    def see(key, seq, value):
        if seq > newest.get(key, (-1,))[0]:
            newest[key] = (seq, value)

    for number in tables:
        path = DIR / f"{number:06d}.ldb"
        for entry in _table(path if path.exists() else path.with_suffix(".sst")):
            see(*entry)
    logs = sorted(int(p.stem) for p in DIR.glob("*.log") if int(p.stem) >= log)
    for number in logs:
        for payload in _records(DIR / f"{number:06d}.log"):
            for entry in _batch(payload):
                see(*entry)
    last = max([last, *(seq for seq, _ in newest.values())])
    return newest, last, logs


def read(key):
    """The newest value of a localStorage key, or None. Safe while the app runs."""
    for attempt in range(5):
        try:
            value = _scan()[0].get(ORIGIN + key.encode(), (0, None))[1]
            break
        except FileNotFoundError:  # a compaction removed a file mid-read
            if attempt == 4:
                raise
    if value is None:
        return None
    return value[1:].decode("latin-1" if value[0] == 1 else "utf-16-le")


@contextlib.contextmanager
def closed():
    """Hold the database's lock. Raises BlockingIOError while the app holds it."""
    fd = os.open(DIR / "LOCK", os.O_RDWR)
    try:
        fcntl.lockf(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
        yield
    finally:
        os.close(fd)


def put(key, text):
    """Store a localStorage value. Only inside closed()."""
    _, last, logs = _scan()
    if not logs:
        raise FileNotFoundError(f"{DIR} has no live log to append to")
    try:
        value = b"\x01" + text.encode("latin-1")
    except UnicodeEncodeError:
        value = b"\x00" + text.encode("utf-16-le")
    key = ORIGIN + key.encode()
    payload = (struct.pack("<QI", last + 1, 1) + bytes([VALUE])
               + _put_varint(len(key)) + key + _put_varint(len(value)) + value)
    path = DIR / f"{logs[-1]:06d}.log"
    offset, out, first = path.stat().st_size, bytearray(), True
    while True:
        left = BLOCK - offset % BLOCK
        if left < 7:
            out += bytes(left)
            offset += left
            left = BLOCK
        n = min(len(payload), left - 7)
        end = n == len(payload)
        kind = (FULL if end else FIRST) if first else (LAST if end else MIDDLE)
        body, payload = payload[:n], payload[n:]
        out += struct.pack("<IHB", _crc(bytes([kind]) + body), n, kind) + body
        offset += 7 + n
        first = False
        if end:
            break
    with open(path, "ab") as f:
        f.write(out)
        f.flush()
        os.fsync(f.fileno())
