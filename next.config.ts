import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    imageSizes: [64, 96, 128, 256, 384, 640, 750],
    qualities: [75, 80, 86, 90, 92, 95],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
