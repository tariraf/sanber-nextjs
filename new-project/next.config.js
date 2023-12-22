/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clipartcraft.com'
      },
    ],
  },
}

module.exports = nextConfig
