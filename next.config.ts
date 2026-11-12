import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // 85 is used for the full-screen paintings in the gallery hero.
    qualities: [75, 85],
  },
};

export default nextConfig;
