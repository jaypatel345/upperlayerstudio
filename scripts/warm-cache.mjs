// Warms the CDN caches so the first real visitor gets cached images and
// videos instead of waiting on a slow first fetch. Run it from India (your
// Mac) after each deploy, since caches are per region:
//
//   node scripts/warm-cache.mjs
//   node scripts/warm-cache.mjs https://www.upperlayerstudio.com   # another site
//   node scripts/warm-cache.mjs --dry    # list what it would warm, fetch nothing
//
// It reads every page in the sitemap, requests each optimised image at the
// widths phones, laptops and retina screens actually use, and downloads each
// walkthrough video (720p) from the media domain once.
import { readdirSync, existsSync } from "node:fs";

// Paths below are relative to the repo root, wherever this is run from.
process.chdir(new URL("..", import.meta.url).pathname);

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const SITE = (args.find((a) => a.startsWith("http")) ?? "https://www.upperlayerstudio.com").replace(/\/$/, "");
const MEDIA = "https://media.upperlayerstudio.com";
// One width per kind of screen; browsers pick from the srcset, so warming
// every width would multiply the work for little gain.
const WIDTHS = new Set([640, 828, 1080, 1200, 1920]);
const PARALLEL = 6;
// Browsers send this, and the image cache is keyed on the format it picks.
const ACCEPT = "image/avif,image/webp,image/apng,image/*,*/*;q=0.8";

async function get(url, accept) {
  const started = Date.now();
  try {
    const res = await fetch(url, { headers: accept ? { Accept: accept } : {} });
    const body = await res.arrayBuffer();
    const cache = res.headers.get("x-vercel-cache") ?? res.headers.get("cf-cache-status") ?? "-";
    return { ok: res.ok, status: res.status, cache, bytes: body.byteLength, ms: Date.now() - started };
  } catch (err) {
    return { ok: false, status: String(err.cause?.code ?? err.message), cache: "-", bytes: 0, ms: Date.now() - started };
  }
}

async function pool(items, worker) {
  let next = 0;
  await Promise.all(
    Array.from({ length: PARALLEL }, async () => {
      while (next < items.length) await worker(items[next++]);
    }),
  );
}

// 1. Pages, from the sitemap.
const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text();
const pages = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, SITE));
console.log(`${pages.length} pages in the sitemap`);

// 2. Optimised images on those pages, at the warmed widths.
const images = new Set();
await pool(pages, async (page) => {
  const html = await (await fetch(page)).text();
  for (const m of html.matchAll(/\/_next\/image\?url=[^"'\s,]+/g)) {
    const url = m[0].replace(/&amp;/g, "&");
    const w = Number(new URL(url, SITE).searchParams.get("w"));
    if (WIDTHS.has(w)) images.add(SITE + url);
  }
});

// 3. Walkthrough videos, straight from the media bucket. Only the 720p cuts:
// that is what nearly every visitor is served (see AutoplayVideo).
const videos = readdirSync("public/work")
  .filter((dir) => existsSync(`public/work/${dir}/showcase-720.mp4`))
  .map((dir) => `${MEDIA}/work/${dir}/showcase-720.mp4`);

if (DRY) {
  console.log(`Would warm ${images.size} images and ${videos.length} videos. For example:`);
  for (const u of [...images].slice(0, 3)) console.log(`  ${u}`);
  for (const u of videos.slice(0, 2)) console.log(`  ${u}`);
  process.exit(0);
}

const tally = { ok: 0, failed: [], bytes: 0, hits: 0 };
const record = (url, r) => {
  if (r.ok) {
    tally.ok++;
    tally.bytes += r.bytes;
    if (/HIT/i.test(r.cache)) tally.hits++;
  } else tally.failed.push(`${r.status} ${url}`);
};

console.log(`Warming ${images.size} images...`);
let done = 0;
await pool([...images], async (url) => {
  record(url, await get(url, ACCEPT));
  if (++done % 50 === 0) console.log(`  ${done}/${images.size}`);
});

console.log(`Warming ${videos.length} videos (this is the slow part)...`);
await pool(videos, async (url) => {
  const r = await get(url);
  record(url, r);
  console.log(`  ${r.ok ? "ok  " : "FAIL"} ${url.replace(MEDIA, "")}  ${(r.bytes / 1e6).toFixed(1)} MB in ${(r.ms / 1000).toFixed(0)} s`);
});

const total = images.size + videos.length;
console.log(
  `\nDone: ${tally.ok}/${total} warmed (${tally.hits} were already cached), ${(tally.bytes / 1e6).toFixed(0)} MB fetched.`,
);
if (tally.failed.length) {
  console.log(`${tally.failed.length} failed; run the script again to retry:`);
  for (const f of tally.failed.slice(0, 20)) console.log(`  ${f}`);
  process.exitCode = 1;
}
