// Warms the CDN caches so the first real visitor gets cached images and
// videos instead of waiting on a slow first fetch.
//
// Usage:
//   npm run warm                                         # warms all production images & videos
//   node scripts/warm-cache.mjs                          # warms all production images & videos
//   node scripts/warm-cache.mjs https://your-domain.com  # custom site URL
//   node scripts/warm-cache.mjs --dry                    # list URLs without fetching
//   node scripts/warm-cache.mjs --images-only            # only warm images
//   node scripts/warm-cache.mjs --videos-only            # only warm videos
//
import { readdirSync } from "node:fs";

// Paths below are relative to the repo root, wherever this is run from.
process.chdir(new URL("..", import.meta.url).pathname);

const args = process.argv.slice(2);
const DRY = args.includes("--dry");
const IMAGES_ONLY = args.includes("--images-only");
const VIDEOS_ONLY = args.includes("--videos-only");
const SITE = (args.find((a) => a.startsWith("http")) ?? "https://www.upperlayerstudio.com").replace(/\/$/, "");
const MEDIA = "https://media.upperlayerstudio.com";
const IMAGE_PARALLEL = 6;
const VIDEO_PARALLEL = 4;
// Browsers send this, and the Next.js image cache is keyed on the format picked.
const ACCEPT = "image/avif,image/webp,image/apng,image/*,*/*;q=0.8";

async function fetchOnce(url, options = {}, timeoutMs = 20000) {
  const started = Date.now();
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal });
    const body = await res.arrayBuffer();
    clearTimeout(timer);
    const cache =
      res.headers.get("x-vercel-cache") ??
      res.headers.get("cf-cache-status") ??
      (res.headers.get("age") && Number(res.headers.get("age")) > 0 ? "AGE" : "-");
    return {
      ok: res.ok,
      status: res.status,
      cache,
      bytes: body.byteLength,
      ms: Date.now() - started,
    };
  } catch (err) {
    clearTimeout(timer);
    return {
      ok: false,
      status: String(err.name === "AbortError" ? "TIMEOUT" : (err.cause?.code ?? err.message)),
      cache: "-",
      bytes: 0,
      ms: Date.now() - started,
    };
  }
}

async function fetchWithRetry(url, options = {}, timeoutMs = 20000, retries = 1) {
  let r = await fetchOnce(url, options, timeoutMs);
  while (!r.ok && retries > 0) {
    retries--;
    await new Promise((res) => setTimeout(res, 1000));
    r = await fetchOnce(url, options, timeoutMs);
  }
  return r;
}

async function pool(items, parallel, worker) {
  let next = 0;
  await Promise.all(
    Array.from({ length: parallel }, async () => {
      while (true) {
        const idx = next++;
        if (idx >= items.length) break;
        try {
          await worker(items[idx]);
        } catch {}
      }
    }),
  );
}

// 1. Pages from sitemap.
console.log(`\nFetching sitemap from ${SITE}/sitemap.xml ...`);
let pages = [];
try {
  const sitemapRes = await fetch(`${SITE}/sitemap.xml`);
  const sitemapText = await sitemapRes.text();
  pages = [...sitemapText.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(/^https?:\/\/[^/]+/, SITE),
  );
} catch {
  console.warn("Could not fetch sitemap.xml, falling back to core pages.");
  pages = [
    `${SITE}/`,
    `${SITE}/services`,
    `${SITE}/work`,
    `${SITE}/studio`,
    `${SITE}/contact`,
    `${SITE}/insights`,
    `${SITE}/lab`,
  ];
}
console.log(`Found ${pages.length} pages in sitemap.`);

// 2. Extract every image URL from each page
const images = new Set();

if (!VIDEOS_ONLY) {
  console.log("Discovering images across all pages...");
  await pool(pages, IMAGE_PARALLEL, async (page) => {
    try {
      const html = await (await fetch(page)).text();
      // Extract Next.js optimized images (all responsive widths)
      for (const m of html.matchAll(/\/_next\/image\?url=[^"'\s,]+/g)) {
        const url = m[0].replace(/&amp;/g, "&");
        images.add(SITE + url);
      }
      // Extract video posters
      for (const m of html.matchAll(/<video[^>]+poster="([^"]+)"/g)) {
        const poster = m[1].replace(/&amp;/g, "&");
        if (poster.startsWith("http")) images.add(poster);
        else if (poster.startsWith("/")) images.add(SITE + poster);
      }
    } catch (e) {
      console.warn(`Failed reading page ${page}:`, e.message);
    }
  });

  // Also include social OG and Twitter images for main routes
  const ogPages = [
    "",
    "/services/automation",
    "/services/voice",
    "/services/agents",
    "/services/product",
    "/work/newsbit",
    "/work/promptx",
    "/work/stylenest",
    "/work/borrower-copilot",
    "/work/aslioffer",
    "/work/frontdeskai",
    "/work/ai-lead-agent",
  ];
  for (const path of ogPages) {
    images.add(`${SITE}${path}/opengraph-image`);
    images.add(`${SITE}${path}/twitter-image`);
  }
}

// 3. Discover all video files in public/work
const videoPaths = [];
if (!IMAGES_ONLY) {
  try {
    const workDirs = readdirSync("public/work", { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);

    for (const dir of workDirs) {
      const files = readdirSync(`public/work/${dir}`).filter((f) => f.endsWith(".mp4"));
      for (const f of files) {
        videoPaths.push(`work/${dir}/${f}`);
      }
    }
  } catch (err) {
    console.warn("Could not scan public/work for videos:", err.message);
  }
}

// Prepare video URLs for both Vercel (SITE) and R2 (MEDIA)
const vercelVideos = videoPaths.map((p) => `${SITE}/${p}`);
const r2Videos = videoPaths.map((p) => `${MEDIA}/${p}`);
const allVideos = [...vercelVideos, ...r2Videos];

if (DRY) {
  console.log(`\n[DRY RUN] Would warm ${images.size} images and ${allVideos.length} video endpoints:`);
  console.log("\nSample images:");
  for (const u of [...images].slice(0, 5)) console.log(`  ${u}`);
  console.log("\nVideo endpoints on Vercel:");
  for (const u of vercelVideos) console.log(`  ${u}`);
  console.log("\nVideo endpoints on Cloudflare R2:");
  for (const u of r2Videos) console.log(`  ${u}`);
  process.exit(0);
}

const tally = { ok: 0, failed: [], bytes: 0, hits: 0, misses: 0 };
const record = (url, r) => {
  if (r.ok) {
    tally.ok++;
    tally.bytes += r.bytes;
    if (/HIT|AGE|PRERENDER/i.test(r.cache)) tally.hits++;
    else tally.misses++;
  } else {
    tally.failed.push(`${r.status} ${url}`);
  }
};

// 4. Warm Videos
if (allVideos.length > 0) {
  console.log(`\n--- Warming ${videoPaths.length} videos on Vercel and Cloudflare R2 (${allVideos.length} total endpoints, ${VIDEO_PARALLEL} parallel) ---`);
  await pool(allVideos, VIDEO_PARALLEL, async (url) => {
    // 128KB Range request primes the edge buffer and caches headers in ~100ms
    const r = await fetchWithRetry(url, { headers: { Range: "bytes=0-131071" } }, 15000, 1);
    record(url, r);
    const domain = url.startsWith(SITE) ? "Vercel" : "Cloudflare R2";
    const path = url.replace(SITE, "").replace(MEDIA, "");
    const mb = (r.bytes / (1024 * 1024)).toFixed(1);
    const s = (r.ms / 1000).toFixed(1);
    console.log(`  ${r.ok ? "✓" : "✗"} [${domain}] ${r.cache.padEnd(7)} ${path} (${mb} MB in ${s}s)${r.ok ? "" : ` [${r.status}]`}`);
  });
}

// 5. Warm Images
if (images.size > 0) {
  console.log(`\n--- Warming ${images.size} images (${IMAGE_PARALLEL} parallel) ---`);
  let done = 0;
  await pool([...images], IMAGE_PARALLEL, async (url) => {
    const r = await fetchWithRetry(url, { headers: { Accept: ACCEPT } }, 20000, 2);
    record(url, r);
    done++;
    if (done % 25 === 0 || done === images.size) {
      console.log(`  Progress: ${done}/${images.size} (${tally.hits} HIT, ${tally.misses} MISS/PRIME, ${tally.failed.length} FAIL)`);
    }
  });
}

// Summary
const totalRequests = images.size + allVideos.length;
const mbTotal = (tally.bytes / (1024 * 1024)).toFixed(1);
console.log("\n==========================================");
console.log(`Warming complete: ${tally.ok}/${totalRequests} successful`);
console.log(`  Cached (HIT): ${tally.hits}`);
console.log(`  Primed (MISS): ${tally.misses}`);
console.log(`  Total transferred: ${mbTotal} MB`);
if (tally.failed.length) {
  console.log(`\n  Failed (${tally.failed.length}):`);
  for (const f of tally.failed.slice(0, 10)) console.log(`    ${f}`);
}
console.log("==========================================\n");

process.exit(tally.failed.length > 0 ? 1 : 0);
