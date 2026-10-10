#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { deflateSync } from 'node:zlib'

const sizes = [16, 32, 48, 128]
const oversample = 4
const outputDirectory = fileURLToPath(new URL('../extension/icons/', import.meta.url))

const crcTable = Array.from({ length: 256 }, (_, value) => {
  let crc = value
  for (let bit = 0; bit < 8; bit += 1) {
    crc = (crc & 1) === 1 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1
  }
  return crc >>> 0
})

const crc32 = (buffers) => {
  let crc = 0xffffffff
  for (const buffer of buffers) {
    for (const byte of buffer) {
      crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8)
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

const chunk = (type, data = Buffer.alloc(0)) => {
  const name = Buffer.from(type)
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const checksum = Buffer.alloc(4)
  checksum.writeUInt32BE(crc32([name, data]))
  return Buffer.concat([length, name, data, checksum])
}

const encodePng = (width, height, pixels) => {
  const stride = width * 4
  const scanlines = Buffer.alloc((stride + 1) * height)
  for (let y = 0; y < height; y += 1) {
    const row = y * (stride + 1)
    scanlines[row] = 0
    pixels.copy(scanlines, row + 1, y * stride, (y + 1) * stride)
  }

  const header = Buffer.alloc(13)
  header.writeUInt32BE(width, 0)
  header.writeUInt32BE(height, 4)
  header[8] = 8
  header[9] = 6

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(scanlines, { level: 9 })),
    chunk('IEND'),
  ])
}

const mix = (from, to, amount) =>
  from.map((channel, index) => Math.round(channel + (to[index] - channel) * amount))

const insideRoundedRect = (x, y, left, top, right, bottom, radius) => {
  const centerX = Math.max(left + radius, Math.min(x, right - radius))
  const centerY = Math.max(top + radius, Math.min(y, bottom - radius))
  const dx = x - centerX
  const dy = y - centerY
  return dx * dx + dy * dy <= radius * radius
}

const render = (size) => {
  const width = size * oversample
  const pixels = Buffer.alloc(width * width * 4)
  const unit = width / 16

  const blend = (x, y, color, alpha = 1) => {
    if (x < 0 || y < 0 || x >= width || y >= width || alpha <= 0) return
    const offset = (y * width + x) * 4
    const sourceAlpha = alpha * (color[3] ?? 255) / 255
    const targetAlpha = pixels[offset + 3] / 255
    const resultAlpha = sourceAlpha + targetAlpha * (1 - sourceAlpha)
    if (resultAlpha === 0) return
    for (let channel = 0; channel < 3; channel += 1) {
      pixels[offset + channel] = Math.round(
        (color[channel] * sourceAlpha + pixels[offset + channel] * targetAlpha * (1 - sourceAlpha)) /
          resultAlpha,
      )
    }
    pixels[offset + 3] = Math.round(resultAlpha * 255)
  }

  const roundedRect = (left, top, right, bottom, radius, color, alpha = 1) => {
    const bounds = [left, top, right, bottom, radius].map((value) => value * unit)
    for (let y = Math.floor(bounds[1]); y < Math.ceil(bounds[3]); y += 1) {
      for (let x = Math.floor(bounds[0]); x < Math.ceil(bounds[2]); x += 1) {
        if (insideRoundedRect(x + 0.5, y + 0.5, ...bounds)) blend(x, y, color, alpha)
      }
    }
  }

  const circle = (centerX, centerY, radius, color, alpha = 1) => {
    const cx = centerX * unit
    const cy = centerY * unit
    const r = radius * unit
    for (let y = Math.floor(cy - r); y < Math.ceil(cy + r); y += 1) {
      for (let x = Math.floor(cx - r); x < Math.ceil(cx + r); x += 1) {
        if ((x + 0.5 - cx) ** 2 + (y + 0.5 - cy) ** 2 <= r ** 2) blend(x, y, color, alpha)
      }
    }
  }

  const polygon = (points, color, alpha = 1) => {
    const scaled = points.map(([x, y]) => [x * unit, y * unit])
    const minY = Math.floor(Math.min(...scaled.map(([, y]) => y)))
    const maxY = Math.ceil(Math.max(...scaled.map(([, y]) => y)))
    for (let y = minY; y < maxY; y += 1) {
      const intersections = []
      for (let index = 0; index < scaled.length; index += 1) {
        const [x1, y1] = scaled[index]
        const [x2, y2] = scaled[(index + 1) % scaled.length]
        const scanY = y + 0.5
        if ((y1 <= scanY && scanY < y2) || (y2 <= scanY && scanY < y1)) {
          intersections.push(x1 + ((scanY - y1) * (x2 - x1)) / (y2 - y1))
        }
      }
      intersections.sort((a, b) => a - b)
      for (let index = 0; index < intersections.length; index += 2) {
        for (let x = Math.floor(intersections[index]); x < Math.ceil(intersections[index + 1]); x += 1) {
          if (x + 0.5 >= intersections[index] && x + 0.5 <= intersections[index + 1]) {
            blend(x, y, color, alpha)
          }
        }
      }
    }
  }

  const backgroundBounds = [0.7, 0.7, 15.3, 15.3, 3.3].map((value) => value * unit)
  const purpleTop = [118, 78, 238]
  const purpleBottom = [67, 35, 166]
  for (let y = 0; y < width; y += 1) {
    for (let x = 0; x < width; x += 1) {
      if (!insideRoundedRect(x + 0.5, y + 0.5, ...backgroundBounds)) continue
      const diagonal = Math.max(0, Math.min(1, (x + y) / (2 * width)))
      const color = mix(purpleTop, purpleBottom, diagonal)
      const highlight = Math.max(0, 1 - Math.hypot(x - width * 0.25, y - width * 0.12) / (width * 0.85))
      blend(x, y, mix(color, [255, 255, 255], highlight * 0.08))
    }
  }

  // Browser window: a bright frame with a compact title bar.
  roundedRect(2.55, 3.05, 13.45, 11.75, 1.45, [255, 255, 255], 0.97)
  roundedRect(3.65, 4.15, 12.35, 10.65, 0.62, [78, 43, 184], 1)
  roundedRect(3.65, 4.15, 12.35, 6.2, 0.62, [101, 61, 216], 1)
  roundedRect(3.65, 5.57, 12.35, 6.2, 0, [255, 255, 255], 0.92)
  circle(4.7, 4.92, 0.37, [255, 255, 255], 0.95)
  circle(5.85, 4.92, 0.37, [255, 255, 255], 0.72)

  // Thumbtack: broad shoulders survive at 16px; the point reads clearly at every size.
  roundedRect(7.15, 6.72, 11.45, 7.82, 0.42, [255, 255, 255], 1)
  polygon(
    [
      [7.9, 7.45],
      [10.7, 7.45],
      [10.2, 9.58],
      [9.72, 9.88],
      [9.42, 12.75],
      [8.9, 9.88],
      [8.4, 9.58],
    ],
    [255, 255, 255],
  )

  const downsampled = Buffer.alloc(size * size * 4)
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      for (let channel = 0; channel < 4; channel += 1) {
        let total = 0
        for (let sampleY = 0; sampleY < oversample; sampleY += 1) {
          for (let sampleX = 0; sampleX < oversample; sampleX += 1) {
            const sourceX = x * oversample + sampleX
            const sourceY = y * oversample + sampleY
            total += pixels[(sourceY * width + sourceX) * 4 + channel]
          }
        }
        downsampled[(y * size + x) * 4 + channel] = Math.round(total / oversample ** 2)
      }
    }
  }

  return encodePng(size, size, downsampled)
}

await mkdir(outputDirectory, { recursive: true })
await Promise.all(
  sizes.map((size) => writeFile(join(outputDirectory, `icon-${size}.png`), render(size))),
)

console.log(`Generated ${sizes.map((size) => `icon-${size}.png`).join(', ')} in ${outputDirectory}`)
