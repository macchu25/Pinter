import { MetadataRoute } from 'next';
import { getAllPosts, getAllCategories } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const categories = await getAllCategories();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const postUrls = posts.map((post: any) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
  }));

  const categoryUrls = categories.map((cat: any) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...categoryUrls,
    ...postUrls,
  ];
}
