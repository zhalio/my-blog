import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export", // Commented out to enable API routes (Resend) and Image Optimization
  // images: {
  //   unoptimized: true, // Commented out to enable Image Optimization
  // },
};

export default withNextIntl(nextConfig);
