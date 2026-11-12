import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  images: {
    // 85 is used for the full-screen paintings (opening screen and idle gallery).
    qualities: [75, 85],
    // Hero images for the Writing posts that are hosted elsewhere.
    remotePatterns: [
      new URL("https://damassets.autodesk.net/content/dam/**"),
      new URL("https://www.lefoodist.com/images/**"),
      new URL("https://www.cincinnati.com/gcdn/**"),
    ],
  },
};

export default nextConfig;
