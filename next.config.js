/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    return config;
  },
  env: {
    WEB3_STORAGE_KEY: process.env.WEB3_STORAGE_KEY,
  }
}

module.exports = nextConfig
