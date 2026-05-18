import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingRoot: 'C:/Users/Hiruw/OneDrive/Documents/next.js/sri-lanka-luxe-voyages',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
