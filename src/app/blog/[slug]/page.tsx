import React from 'react';
import { getPostBySlug, getAllPosts } from "@/lib/api";
import Sidebar from "@/components/layout/Sidebar";
import AdSlot from "@/components/ads/AdSlot";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Metadata } from 'next';
import Image from "next/image";
import { Calendar, Clock, Share2, Bookmark, MessageSquare } from 'lucide-react';

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

  const displayPost = post || {
    title: 'The Art of Minimalist Living in Modern Apartments',
    excerpt: 'Discover how to transform your small living space into a sanctuary of peace and productivity through intentional design.',
    content: '', 
    coverImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop',
    category: { name: 'Interior', slug: 'interior' },
    author: 'Elena Vance',
    publishedAt: new Date().toISOString()
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section - Aligned Left */}
      <header className="relative pt-20 pb-12 md:pt-32 md:pb-16 overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-8 relative z-10">
          <div className="text-left">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-full text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-8">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></span>
              {displayPost.category.name}
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1] mb-10 max-w-4xl">
              {displayPost.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 text-gray-400 font-bold text-xs uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-blue-500" />
                {new Date(displayPost.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-blue-500" />
                6 Min Read
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare size={14} className="text-blue-500" />
                12 Comments
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-0 opacity-10 pointer-events-none">
           <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </header>

      <div className="max-w-[1600px] mx-auto px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16">
          
          {/* Main Article Body (7 Parts) */}
          <article className="lg:col-span-7">
            {/* Featured Image */}
            <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.15)] group mb-20 transition-all duration-700 hover:shadow-blue-500/10">
              <Image 
                src={displayPost.coverImage} 
                alt={displayPost.title} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                fill
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="flex items-center justify-between mb-12 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
              <div className="flex items-center gap-5">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center font-black text-white text-xl shadow-lg">
                  {displayPost.author.charAt(0)}
                </div>
                <div>
                  <div className="font-black text-gray-900 text-lg">{displayPost.author}</div>
                  <div className="text-xs text-gray-400 font-bold uppercase tracking-widest">Senior Content Editor</div>
                </div>
              </div>
              <div className="hidden sm:flex gap-3">
                <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                  <Share2 size={20} />
                </button>
                <button className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm">
                  <Bookmark size={20} />
                </button>
              </div>
            </div>

            <div className="prose prose-xl max-w-none prose-headings:font-black prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-gray-600 prose-img:rounded-[2rem] prose-a:text-blue-600 prose-blockquote:border-l-4 prose-blockquote:border-blue-600 prose-blockquote:bg-blue-50/50 prose-blockquote:p-8 prose-blockquote:rounded-3xl prose-blockquote:not-italic prose-blockquote:font-medium">
               {post ? (
                 typeof post.content === 'string' ? (
                   <MDXRemote source={post.content} />
                 ) : (
                   <MDXRemote {...post.content} />
                 )
               ) : (
                 <>
                   <p className="text-2xl leading-relaxed mb-10 font-medium text-gray-900 italic">
                     "Simplicity is the ultimate sophistication." This quote by Leonardo da Vinci perfectly encapsulates the essence of modern minimalist design.
                   </p>
                   <p>
                     In an era dominated by constant noise and digital clutter, the spaces we inhabit have become more crucial than ever. Minimalism is not just an aesthetic choice; it's a philosophy of intentional living that prioritizes function, clarity, and peace.
                   </p>
                   <AdSlot slotId="in-article-ad" height={250} />
                   <h2>The Foundation of Calm</h2>
                   <p>
                     When we strip away the unnecessary, we allow the essential to shine. In interior design, this translates to clean lines, a limited color palette, and a careful selection of materials that age gracefully.
                   </p>
                   <ul>
                     <li><strong>Natural Light:</strong> The most important element of any minimalist space.</li>
                     <li><strong>Negative Space:</strong> Learning to appreciate the "empty" areas as much as the furnished ones.</li>
                     <li><strong>Quality over Quantity:</strong> Investing in pieces that serve multiple purposes and last a lifetime.</li>
                   </ul>
                   <blockquote>
                     The secret of happiness, you see, is not found in seeking more, but in developing the capacity to enjoy less.
                   </blockquote>
                 </>
               )}
            </div>

            {/* Tag Cloud */}
            <div className="mt-20 pt-10 border-t flex flex-wrap gap-3">
               {['Minimalism', 'Interior', 'Design', 'Architecture', 'Wellness'].map(tag => (
                 <span key={tag} className="px-6 py-3 bg-gray-50 text-gray-500 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-gray-100 cursor-pointer transition-all">
                   #{tag}
                 </span>
               ))}
            </div>
          </article>

          {/* Sidebar (3 Parts) */}
          <aside className="lg:col-span-3 self-start">
            <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
}
