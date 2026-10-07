// Pre-sizes every image in public/work and public/hero into .media/, as the
// WebP variants src/lib/media.ts asks the R2 bucket for:
//   public/work/newsbit/01-home.webp -> .media/work/newsbit/01-home.w1280.webp
// Videos aren't touched; scripts/upload-media.sh sends those as they are.
//
//   node scripts/build-media.mjs
import { execSync } from "node:child_process";
import { mkdirSync, existsSync, statSync } from "node:fs";
import { dirname } from "node:path";
import sharp from "sharp";

// Keep in step with VARIANT_WIDTHS in src/lib/media.ts.
const WIDTHS = [640, 1280, 1920, 2880];

const files = execSync(
  `find public/work public/hero -type f \\( -name "*.webp" -o -name "*.jpg" -o -name "*.png" \\)`,
)
  .toString()
  .trim()
  .split("\n");

let made = 0;
for (const file of files) {
  const base = file.replace(/^public\//, ".media/").replace(/\.(webp|jpg|png)$/, "");
  mkdirSync(dirname(base), { recursive: true });
  for (const w of WIDTHS) {
    const out = `${base}.w${w}.webp`;
    // Skip variants that are newer than their source; a replaced image is redone.
    if (existsSync(out) && statSync(out).mtimeMs >= statSync(file).mtimeMs) continue;
    await sharp(file)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 85, effort: 5 })
      .toFile(out);
    made++;
  }
}
console.log(`${files.length} images, ${made} new variants in .media/`);
