import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

export const PUBLIC_DIR = './public';

/**
 * Baca dimensi asli gambar dari header file, tanpa dependency eksternal.
 * Mendukung PNG, WebP (VP8/VP8L/VP8X), dan JPEG.
 * Mengembalikan null untuk SVG atau format tak dikenal.
 */
export function readImageDimensions(publicPath: string): { width: number; height: number } | null {
  const filePath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ''));
  if (!existsSync(filePath)) return null;

  let buf: Buffer;
  try {
    buf = readFileSync(filePath);
  } catch {
    return null;
  }

  // SVG/XML: tidak punya dimensi piksel tetap.
  if (buf.length > 5 && buf.subarray(0, 5).toString('ascii') === '<?xml') return null;

  // PNG: lebar/tinggi di IHDR (offset 16 & 20).
  if (buf.length > 24 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }

  // WebP (RIFF....WEBP)
  if (
    buf.length > 30 &&
    buf.subarray(0, 4).toString('ascii') === 'RIFF' &&
    buf.subarray(8, 12).toString('ascii') === 'WEBP'
  ) {
    const chunk = buf.subarray(12, 16).toString('ascii');
    if (chunk === 'VP8X') {
      return {
        width: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
        height: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
      };
    }
    if (chunk === 'VP8 ') {
      return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    }
    if (chunk === 'VP8L') {
      const bits = buf.readUInt32LE(21);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
  }

  // JPEG: cari marker SOF.
  if (buf.length > 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset < buf.length - 9) {
      if (buf[offset] !== 0xff) {
        offset++;
        continue;
      }
      const marker = buf[offset + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
      }
      offset += 2 + buf.readUInt16BE(offset + 2);
    }
  }

  return null;
}
