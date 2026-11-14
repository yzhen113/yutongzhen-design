import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Case study exports are very high-res; keep sharp output quality high
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 640],
    qualities: [75, 95, 100],
  },
  // Product and Experience were merged into one Projects list on the home page.
  async redirects() {
    return [
      { source: "/product", destination: "/", permanent: false },
      { source: "/experience", destination: "/", permanent: false },
    ];
  },
};

export default nextConfig;
