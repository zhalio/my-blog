import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // 配置 BasePath
  // 如果你的仓库名是 my-blog，则填写 "/my-blog"
  basePath: process.env.NODE_ENV === 'production' ? "/my-blog" : "",
};

export default withNextIntl(nextConfig);
