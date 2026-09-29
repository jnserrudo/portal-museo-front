// Genera copias livianas (WebP) de las imagenes de public/ en public/opt/.
// Los originales NUNCA se modifican: solo se leen.
// Nombre de salida: <ruta original completa>.opt.webp (y .thumb.webp para miniaturas).
// Uso: npm run images:opt   (agregar --force para regenerar todo)
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const OUT_DIR = path.join(PUBLIC_DIR, 'opt');
const MANIFEST = path.join(ROOT, 'src', 'utils', 'optimizedImages.json');
const FORCE = process.argv.includes('--force');
const IMAGE_EXT = /\.(jpe?g|png)$/i;

const variantsFor = (rel) => {
  const name = path.basename(rel).toLowerCase();
  if (rel.startsWith('visita-virtual/')) {
    return [
      { suffix: 'opt', width: 2560, quality: 80 },
      { suffix: 'thumb', width: 400, quality: 70 },
    ];
  }
  if (name.startsWith('logo') || name.includes('-logo')) return [{ suffix: 'opt', width: 400, quality: 85 }];
  if (name.startsWith('museo_frente')) return [{ suffix: 'opt', width: 1920, quality: 78 }];
  if (rel.startsWith('salas/')) return [{ suffix: 'opt', width: 1600, quality: 78 }];
  return [{ suffix: 'opt', width: 1200, quality: 78 }];
};

async function listImages(dir, base = '') {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      if (rel === 'opt') continue;
      out.push(...(await listImages(path.join(dir, entry.name), rel)));
    } else if (IMAGE_EXT.test(entry.name)) {
      out.push(rel);
    }
  }
  return out;
}

async function isUpToDate(src, dest) {
  try {
    const [s, d] = await Promise.all([fs.stat(src), fs.stat(dest)]);
    return d.mtimeMs >= s.mtimeMs;
  } catch {
    return false;
  }
}

async function processImage(rel) {
  const src = path.join(PUBLIC_DIR, rel);
  const srcSize = (await fs.stat(src)).size;
  const meta = await sharp(src).metadata();
  const rotated = (meta.orientation ?? 1) >= 5;
  dimensions[rel] = rotated ? [meta.height, meta.width] : [meta.width, meta.height];
  const results = [];
  for (const v of variantsFor(rel)) {
    const dest = path.join(OUT_DIR, `${rel}.${v.suffix}.webp`);
    if (!path.resolve(dest).startsWith(path.resolve(OUT_DIR) + path.sep)) {
      throw new Error(`Ruta de salida fuera de public/opt: ${dest}`);
    }
    if (!FORCE && (await isUpToDate(src, dest))) {
      results.push({ rel, variant: v.suffix, srcSize, outSize: (await fs.stat(dest)).size, skipped: true });
      continue;
    }
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await sharp(src)
      .rotate()
      .resize({ width: v.width, withoutEnlargement: true })
      .webp({ quality: v.quality, effort: 5 })
      .toFile(dest);
    results.push({ rel, variant: v.suffix, srcSize, outSize: (await fs.stat(dest)).size, skipped: false });
  }
  return results;
}

const kb = (b) => `${Math.round(b / 1024)} KB`.padStart(9);

const dimensions = {};
const images = await listImages(PUBLIC_DIR);
console.log(`Imagenes encontradas: ${images.length}${FORCE ? ' (--force)' : ''}\n`);

const all = [];
const CONCURRENCY = 4;
for (let i = 0; i < images.length; i += CONCURRENCY) {
  const batch = await Promise.all(images.slice(i, i + CONCURRENCY).map(processImage));
  for (const rows of batch) {
    for (const r of rows) {
      all.push(r);
      const pct = r.variant === 'opt' ? ` (-${Math.round((1 - r.outSize / r.srcSize) * 100)}%)` : '';
      console.log(`${kb(r.srcSize)} -> ${kb(r.outSize)}${pct.padEnd(8)} ${r.skipped ? '[ya estaba] ' : ''}${r.rel}.${r.variant}.webp`);
    }
  }
}

const opt = all.filter((r) => r.variant === 'opt');
const totalSrc = opt.reduce((a, r) => a + r.srcSize, 0);
const totalOut = opt.reduce((a, r) => a + r.outSize, 0);
const bigger = opt.filter((r) => r.outSize >= r.srcSize);
console.log(`\nTotal originales: ${(totalSrc / 1048576).toFixed(1)} MB`);
console.log(`Total copias .opt: ${(totalOut / 1048576).toFixed(1)} MB`);
console.log(`Miniaturas .thumb: ${all.filter((r) => r.variant === 'thumb').length}`);
if (bigger.length) {
  console.log(`\nAtencion: ${bigger.length} copia(s) no son mas livianas que el original (se seguira usando el original):`);
  bigger.forEach((r) => console.log(`  ${r.rel}`));
}

// Manifiesto: dimensiones del original (w, h) y variantes (v) que existen y pesan menos que el original.
const manifest = {};
for (const rel of images) {
  const [w, h] = dimensions[rel];
  manifest[rel] = { w, h, v: [] };
}
for (const r of all) {
  if (r.outSize < r.srcSize) manifest[r.rel].v.push(r.variant);
}
const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
await fs.writeFile(MANIFEST, `${JSON.stringify(sorted, null, 2)}\n`);
console.log(`\nManifiesto: ${path.relative(ROOT, MANIFEST)} (${Object.keys(sorted).length} imagenes)`);
