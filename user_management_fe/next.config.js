/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    backendApiHost: 'http://localhost:8000',
  },
}

module.exports = nextConfig
