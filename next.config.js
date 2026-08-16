const createNextIntlPlugin = require('next-intl/plugin')

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.r2.dev' },
      { protocol: 'https', hostname: '**.r2.cloudflarestorage.com' },
      ...(process.env.R2_PUBLIC_URL
        ? [{ protocol: 'https', hostname: new URL(process.env.R2_PUBLIC_URL).hostname }]
        : []),
    ],
  },
}

module.exports = withNextIntl(nextConfig)
