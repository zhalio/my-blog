import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  // 1. 开启静态导出
  output: "export",
  
  // 2. 关闭图片优化 (GitHub Pages 不支持 Next.js 的默认图片优化)
  images: {
    unoptimized: true,
  },

  // 3. 配置 BasePath (非常重要！)
  // 如果你的仓库名是 username.github.io，则留空 ""
  // 如果你的仓库名是 my-blog，则填写 "/my-blog"
  // 本地开发时 (dev) 不使用 basePath，方便访问 localhost:3000
  basePath: isProd ? "/my-blog" : "", 
};

export default withNextIntl(nextConfig);