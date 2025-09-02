import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['img.freepik.com'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
