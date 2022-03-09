/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: ['images.microcms-assets.io'],
    disableStaticImages: true,
  },
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*?)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/articles',
        destination: '/',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tags',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
