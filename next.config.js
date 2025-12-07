/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable Turbopack (default in Next.js 16) with empty config to silence warning
  turbopack: {},
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
};

module.exports = nextConfig;
