/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    typedRoutes: true
  },
  distDir: '.next',
  poweredByHeader: false,
  generateEtags: true
}

module.exports = nextConfig 