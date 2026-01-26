import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Commented out to enable API routes and Image Optimization
  // images: {
  //   unoptimized: true, // Commented out to enable Image Optimization
  // },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'clpmxrgdzhsitzjlmkhf.supabase.co',
      },
    ],
  },
  async redirects() {
    return [
      // 重定向 www 到非 www 域名（确保 Cookie 一致性）
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.emmmxx.xyz',
          },
        ],
        destination: 'https://emmmxx.xyz/:path*',
        permanent: true,
      },
      {
        source: '/favicon.ico',
        destination: '/icon',
        permanent: true,
      },
    ]
  },
};

export default withNextIntl(nextConfig);
