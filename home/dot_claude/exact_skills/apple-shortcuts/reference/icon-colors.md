# Shortcut Icon Colors & Glyphs

Reference for `scut manage icon --color <name|int> --glyph <int>`.

## Colors

Stored as unsigned int32 in `ZSHORTCUTICON.ZBACKGROUNDCOLORVALUE`. SQLite may return signed values (subtract 2^32).

### Named colors (supported by `scut manage icon --color`)

| Name       | Value        | Hex        | ARGB Approximation      |
|------------|-------------|------------|-------------------------|
| red        | 4294901760  | 0xFFFF0000 | bright red              |
| orange     | 4294944000  | 0xFFFFA500 | orange                  |
| yellow     | 4294957056  | 0xFFFFD800 | yellow                  |
| green      | 4283215696  | 0xFF4CAF50 | material green          |
| teal       | 1440408063  | 0x55DAE1FF | teal / cyan             |
| lightblue  | 463140863   | 0x1B9AF7FF | sky blue                |
| blue       | 4282601983  | 0xFF4351FF | medium blue             |
| darkblue   | 946986751   | 0x3871DEFF | navy blue               |
| indigo     | 2071128575  | 0x7B72E9FF | indigo / violet         |
| purple     | 2846468607  | 0xA9A9A9FF | purple (Apple-encoded)  |
| magenta    | 3679049983  | 0xDB49D8FF | magenta / fuchsia       |
| pink       | 4293591295  | 0xFFEB00FF | pink                    |
| rose       | 3980825855  | 0xED4694FF | rose / hot pink         |
| amber      | 4274264319  | 0xFEC418FF | amber / dark gold       |
| gray       | 2240066815  | 0x8584B4FF | gray                    |

Note: Apple's color encoding doesn't follow standard ARGB — values include color space and platform-specific information. Names are mapped by visual appearance in Shortcuts.app.

### Passing raw integers

Any integer value can be passed directly: `scut manage icon "Name" --color 4282601983`

### Discovery query

Find all colors in use:

```sql
SELECT DISTINCT i.ZBACKGROUNDCOLORVALUE, s.ZNAME
FROM ZSHORTCUT s
JOIN ZSHORTCUTICON i ON s.ZICON = i.Z_PK
WHERE s.ZTOMBSTONED = 0 OR s.ZTOMBSTONED IS NULL
ORDER BY i.ZBACKGROUNDCOLORVALUE;
```

## Glyphs

Stored as integer in `ZSHORTCUTICON.ZGLYPHNUMBER`. Values are SF Symbol code points.

### Known glyph numbers

These were observed in the user's shortcut library:

| Glyph  | Shortcut            | Likely SF Symbol     |
|--------|---------------------|----------------------|
| 59790  | Add SOTL            | music.note           |
| 61440  | Play Sound          | speaker.wave.2       |
| 61532  | Work Day Music      | headphones           |
| 61781  | Cooking With CBC    | fork.knife           |
| 62072  | Night Light Washroom| lightbulb            |
| 62084  | Noon Break          | sun.max              |

Note: SF Symbol code points are not publicly documented by Apple. These mappings are inferred from context. More can be discovered by creating shortcuts in the GUI and querying the DB.

### Discovery query

```sql
SELECT i.ZGLYPHNUMBER, s.ZNAME
FROM ZSHORTCUT s
JOIN ZSHORTCUTICON i ON s.ZICON = i.Z_PK
WHERE s.ZTOMBSTONED = 0 OR s.ZTOMBSTONED IS NULL
ORDER BY i.ZGLYPHNUMBER;
```
