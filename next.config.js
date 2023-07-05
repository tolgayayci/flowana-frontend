/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rewrites() {
    return {
      beforeFiles: [
          // if the host is `app.acme.com`,
          // this rewrite will be applied
          {
              source: '/:path*',
              has: [
                  {
                      type: 'host',
                      value: 'aave.localhost:3000/',
                  },
              ],
              destination: '/aave/:path*',
          },
      ]
  }
  },
}

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({nextConfig})
