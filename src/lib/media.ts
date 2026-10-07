import type { ImageLoaderProps } from "next/image";

/**
 * Case-study media and the site photos are served from Cloudflare R2 at
 * media.upperlayerstudio.com rather than from Vercel, which was very slow to
 * deliver large files to Indian ISPs. Paths keep their public/ shape, so
 * /work/newsbit/showcase.mp4 lives at <origin>/work/newsbit/showcase.mp4.
 *
 * In development the files come straight from public/ as before. To try the
 * bucket locally, set NEXT_PUBLIC_MEDIA_URL. After adding or replacing media,
 * run `node scripts/build-media.mjs` then `bash scripts/upload-media.sh`.
 */
export const MEDIA_ORIGIN =
  process.env.NEXT_PUBLIC_MEDIA_URL ??
  (process.env.NODE_ENV === "production" ? "https://media.upperlayerstudio.com" : "");

/**
 * Widths every image is pre-sized to by scripts/build-media.mjs. Images never
 * upscale, so a variant wider than its source is just the source re-encoded.
 */
export const VARIANT_WIDTHS = [640, 1280, 1920, 2880] as const;

const isMedia = (src: string) => src.startsWith("/work/") || src.startsWith("/hero/");

/** Full URL for a video or other file served as-is. */
export function mediaUrl(src: string) {
  return MEDIA_ORIGIN && isMedia(src) ? MEDIA_ORIGIN + src : src;
}

/**
 * next/image loader: picks the smallest pre-sized WebP at least as wide as
 * the browser asked for. Anything outside /work and /hero, and everything in
 * development, goes through Next's own optimiser as before.
 */
export function mediaLoader({ src, width, quality }: ImageLoaderProps) {
  if (!MEDIA_ORIGIN || !isMedia(src)) {
    return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality ?? 75}`;
  }
  const w = VARIANT_WIDTHS.find((v) => v >= width) ?? VARIANT_WIDTHS[VARIANT_WIDTHS.length - 1];
  return `${MEDIA_ORIGIN}${src.replace(/\.(webp|jpg|png)$/, "")}.w${w}.webp`;
}
