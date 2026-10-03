import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Next 16 coerces any quality not listed here down to the nearest entry,
    // so 90 has to be allowlisted for the case-study screenshots to use it.
    qualities: [75, 90],
  },
};

export default nextConfig;
