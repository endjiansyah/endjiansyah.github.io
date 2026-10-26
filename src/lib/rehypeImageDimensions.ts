/**
 * Rehype plugin lokal (tanpa dependency tambahan): menambahkan atribut
 * width/height + loading/decoding ke setiap <img> hasil render markdown.
 *
 * Kenapa penting untuk Google Images:
 *  - width/height asli memberi tahu Google dimensi nyata gambar (syarat
 *    ImageObject yang valid dan salah satu sinyal peringkat di Google Images).
 *  - Mencegah CLS (layout shift) sehingga halaman tidak "melompat" saat dimuat.
 */

import { readImageDimensions } from './imageDimensions';

interface HastNode {
  type: string;
  tagName?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}

function walk(node: HastNode): void {
  if (node.type === 'element' && node.tagName === 'img' && node.properties) {
    const src = String(node.properties.src ?? '');
    if (src.startsWith('/')) {
      const dim = readImageDimensions(src);
      if (dim) {
        if (!node.properties.width) node.properties.width = dim.width;
        if (!node.properties.height) node.properties.height = dim.height;
      }
    }
    if (!node.properties.loading) node.properties.loading = 'lazy';
    if (!node.properties.decoding) node.properties.decoding = 'async';
  }
  for (const child of node.children ?? []) walk(child);
}

export default function rehypeImageDimensions() {
  return (tree: HastNode) => {
    walk(tree);
  };
}
