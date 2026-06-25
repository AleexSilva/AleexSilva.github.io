import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.EXPORT_STATIC === "true" ? "export" : "standalone",
};

export default nextConfig;
