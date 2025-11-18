import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.boringavatars.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-native-web/dist/apis/StyleSheet/registry": path.resolve(
        __dirname,
        "lib/react-native-web-style-registry.ts"
      ),
    };
    return config;
  },
};

export default nextConfig;
