/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false, "pino-pretty": false };
    return config;
  },
  env: {
    WEB3_STORAGE_KEY: process.env.WEB3_STORAGE_KEY,
    PROJECT_ID: process.env.PROJECT_ID,
  },
  images: {
    remotePatterns: [
      {
        hostname: "**",
        protocol: "https"
      }
    ]
  }
}

module.exports = nextConfig
