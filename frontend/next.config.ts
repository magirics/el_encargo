import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  allowedDevOrigins: ["192.168.1.*"],
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
