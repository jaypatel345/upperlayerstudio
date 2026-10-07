import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 coerces any quality not listed here down to the nearest entry,
    // so 90 has to be allowlisted for the case-study screenshots to use it.
    qualities: [75, 90],
    // Files in public/ aren't content-hashed, so the optimiser's default
    // 4-hour cache would re-encode every screenshot several times a day.
    // A week keeps them warm; rename a file to bust it sooner.
    minimumCacheTTL: 604800,
    // AVIF is ~20% smaller than WebP at the same quality, so the hero photo
    // keeps q90 but arrives lighter; WebP stays as the fallback.
    formats: ["image/avif", "image/webp"],
    // The defaults jump from 1200 to 1920, so a typical ~1340px laptop got the
    // 1920 hero. 1440 and 1600 fill that gap.
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2048, 3840],
  },
};

export default nextConfig;
