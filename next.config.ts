// next.config.js
import type { NextConfig } from "next";

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn-images-1.medium.com",
        pathname: "/**",
      },
      // ADICIONE ESTE BLOCO PARA O MIRO.MEDIUM.COM
      {
        protocol: "https",
        hostname: "miro.medium.com",
        pathname: "/**",
      },
      // Adicione outros domínios conforme necessário
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    config.externals = [
      ...config.externals,
      { "@prisma/client": "@prisma/client" },
    ];

    if (isServer) {
      config.externals.push({
        "@prisma/client": "@prisma/client",
      });
    }

    return config;
  },
};

export default nextConfig;
