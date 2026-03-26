import React from 'react';
import { getPostBySlug, getAllPosts } from "@/lib/api";
import Sidebar from "@/components/layout/Sidebar";
import AdSlot from "@/components/ads/AdSlot";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  
  if (!slug) return { title: 'Post Not Found' };

  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: 'Post Not Found | Pinter',
    };
  }

  return {
    title: `${post.title} | Pinter`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: 'article',
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return notFound();
  }

  const post = await getPostBySlug(slug);

  // Fallback demo content if not found in DB
  if (!post && slug !== 'demo') {
     // Return demo content for presentation
  }

  const displayPost = post || {
    title: 'Cách Trang Trí Phòng Khách Theo Phong Cách Minimalism',
    excerpt: 'Làm thế nào để căn hộ nhỏ của bạn trở nên rộng rãi và ấm cúng hơn?',
    content: { compiledSource: '' }, // Just a mock
    coverImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop',
    category: { name: 'Interior', slug: 'interior' },
    author: 'Interior Pro',
    publishedAt: new Date().toISOString()
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-blue-600 mb-4">
          <a href={`/category/${displayPost.category.slug}`}>{displayPost.category.name}</a>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400">{new Date(displayPost.publishedAt).toLocaleDateString('vi-VN')}</span>
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-8 leading-tight">
          {displayPost.title}
        </h1>
        <div className="flex items-center gap-4 border-y py-6 mb-12">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">
            {displayPost.author.charAt(0)}
          </div>
          <div>
            <div className="font-bold">{displayPost.author}</div>
            <div className="text-xs text-gray-400 uppercase tracking-widest">Biên tập viên Pinter</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8">
          <div className="aspect-video w-full bg-gray-100 rounded-3xl overflow-hidden mb-12">
            <img src={displayPost.coverImage} alt={displayPost.title} className="w-full h-full object-cover" />
          </div>

          <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:underline mb-20">
             {post ? (
               typeof post.content === 'string' ? (
                 <MDXRemote source={post.content} />
               ) : (
                 <MDXRemote {...post.content} />
               )
             ) : (
               <>
                 <p className="text-xl leading-relaxed mb-6 font-medium text-gray-600">
                   Trang trí phòng khách không chỉ là việc sắp xếp đồ đạc, mà là cách bạn thể hiện cá tính và tạo ra không gian thư giãn cho chính mình.
                 </p>
                 <p className="mb-6">
                   Trong thế giới hiện đại đầy ồn ào, phong cách Minimalism (tối giản) nổi lên như một giải pháp tuyệt vời để tìm lại sự cân bằng. "Ít hơn là nhiều hơn" - đó là tôn chỉ của phong cách này.
                 </p>
                 <AdSlot slotId="in-article-ad" height={250} />
                 <h2 className="text-2xl font-bold mt-10 mb-6">1. Chọn Gam Màu Trung Tính</h2>
                 <p className="mb-6">
                   Những gam màu như trắng, be, xám nhạt không bao giờ lỗi mốt. Chúng tạo cảm giác không gian rộng mở và sạch sẽ.
                 </p>
                 <h2 className="text-2xl font-bold mt-10 mb-6">2. Nội Thất Đa Năng</h2>
                 <p className="mb-6">
                   Hãy chọn những món đồ có thể phục vụ nhiều mục đích khác nhau để tiết kiệm diện tích tối đa.
                 </p>
               </>
             )}
          </div>

          <div className="mt-16 pt-8 border-t">
             <h3 className="font-bold text-xl mb-8">Bạn có thể thích</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Related Post Placeholders */}
               <div className="bg-gray-50 p-6 rounded-2xl border border-transparent hover:border-blue-600 transition-colors">
                 <h4 className="font-bold mb-2">5 Món ăn đường phố nên thử khi đến Đà Lạt</h4>
                 <span className="text-xs text-blue-600 font-bold uppercase tracking-widest leading-none">Travel</span>
               </div>
               <div className="bg-gray-50 p-6 rounded-2xl border border-transparent hover:border-blue-600 transition-colors">
                 <h4 className="font-bold mb-2">Xu hướng thời trang bền vững năm 2026</h4>
                 <span className="text-xs text-blue-600 font-bold uppercase tracking-widest leading-none">Fashion</span>
               </div>
             </div>
          </div>
        </div>

        <div className="lg:col-span-4">
          <Sidebar />
        </div>
      </div>
    </div>
  );
}
