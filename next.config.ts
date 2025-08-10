import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    reactCompiler: true,
    optimizePackageImports: ["@chakra-ui/react"],
    useCache: true,
  },
  images: {
    remotePatterns: [
      // new URL(`https://images.unsplash.com`),

      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  webpack(config, { dev }) {
    if (dev) {
      config.devtool = false;
    }
    return config;
  },
};

export default nextConfig;
