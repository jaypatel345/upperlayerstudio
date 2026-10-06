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
  },
};

export default nextConfig;
