import React from 'react';
import PostCard from "@/components/blog/PostCard";
import AdSlot from "@/components/ads/AdSlot";
import Sidebar from "@/components/layout/Sidebar";
import { getPostsByCategory, getAllCategories } from "@/lib/api";
import { notFound } from "next/navigation";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug) return { title: 'Not Found' };
  
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);
  return {
    title: `${categoryName} | Pinter Magazine`,
    description: `Khám phá các bài viết và mẹo hay nhất về ${categoryName.toLowerCase()} tại Pinter.`,
    openGraph: {
      title: `${categoryName} | Pinter Magazine`,
      description: `Khám phá các bài viết và mẹo hay nhất về ${categoryName.toLowerCase()} tại Pinter.`,
      type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return categories.map((cat: any) => ({
    slug: cat.slug,
  }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug) {
    return notFound();
  }

  const posts = await getPostsByCategory(slug);
  
  // Mocking title if no posts (for demo)
  const categoryName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 border-b pb-8">
        <h1 className="text-4xl font-bold mb-4">{categoryName}</h1>
        <p className="text-gray-500 max-w-2xl">
          Khám phá những bài viết mới nhất và hay nhất về chủ đề {categoryName.toLowerCase()}. 
          Tất cả nội dung được biên tập kỹ lưỡng để mang lại cảm hứng cho bạn.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {posts.map((post: any) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-3xl">
              <h3 className="text-xl font-bold text-gray-400">Chưa có bài viết nào trong danh mục này.</h3>
              <p className="text-gray-400 mt-2">Vui lòng quay lại sau!</p>
            </div>
          )}
          
          <div className="mt-12">
            <AdSlot slotId="category-bottom-ad" height={250} />
          </div>
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
