// scripts/optimize-images.mjs
// Converts JPG/PNG to WebP, keeping originals as fallback
import sharp from 'sharp';
import { readdirSync, statSync, existsSync } from 'fs';
import { join, extname, basename } from 'path';

const DIRS = ['./public/images'];
const QUALITY_WEBP = 82;
const MAX_WIDTH = 1920;

async function convertDir(dir) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); }
  catch { return; }

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) { await convertDir(fullPath); continue; }

    const ext = extname(entry.name).toLowerCase();
    if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

    const base = fullPath.slice(0, -ext.length);
    const webpPath = `${base}.webp`;

    if (existsSync(webpPath)) {
      console.log(`  SKIP (exists): ${webpPath}`);
      continue;
    }

    try {
      const img = sharp(fullPath);
      const meta = await img.metadata();
      await img
        .resize({ width: Math.min(meta.width ?? MAX_WIDTH, MAX_WIDTH), withoutEnlargement: true })
        .webp({ quality: QUALITY_WEBP, effort: 4 })
        .toFile(webpPath);

      const origSize = statSync(fullPath).size;
      const newSize = statSync(webpPath).size;
      console.log(`  OK: ${entry.name} ${(origSize/1024).toFixed(0)}KB -> ${(newSize/1024).toFixed(0)}KB (-${Math.round((1-newSize/origSize)*100)}%) → ${basename(webpPath)}`);
    } catch (e) {
      console.error(`  ERR: ${entry.name}: ${e.message}`);
    }
  }
}

for (const dir of DIRS) {
  console.log(`\nProcessing: ${dir}`);
  await convertDir(dir);
}
console.log('\nDone!');
