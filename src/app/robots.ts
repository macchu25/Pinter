import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Chặn quét các trang quản trị để bảo mật
    },
    sitemap: 'https://pinter-eight.vercel.app/sitemap.xml',
  };
}
