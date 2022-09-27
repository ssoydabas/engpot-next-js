/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_ENV: process.env.NEXT_ENV,
    API_URL: process.env.API_URL,
  },
};

module.exports = nextConfig;
