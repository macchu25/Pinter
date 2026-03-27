import React from 'react';
import { getAllPosts, getAllCategories } from "@/lib/api";
import Sidebar from "@/components/layout/Sidebar";
import AdSlot from "@/components/ads/AdSlot";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";

export const metadata = {
  title: 'Blog | Pinter Editorial',
  description: 'Exploring the intersection of culture, design, and modern life.',
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  // Premium Mock data for a "full" look
  const mockPosts = [
    {
      _id: 'mock1',
      title: 'The Future of Sustainable Urban Living',
      slug: 'sustainable-urban-living',
      excerpt: 'How architects and urban planners are reimagining our cities to be more resilient and connected to nature.',
      coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Architecture', slug: 'travel' },
      author: 'Julian Thorne',
      publishedAt: new Date().toISOString()
    },
    {
      _id: 'mock2',
      title: 'The Renaissance of Craftsmanship',
      slug: 'renaissance-of-craftmanship',
      excerpt: 'Why high-end handmade goods are seeing a massive resurgence in a world dominated by mass production.',
      coverImage: 'https://images.unsplash.com/photo-1629992101753-56d196c8aced?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Lifestyle', slug: 'lifestyle' },
      author: 'Sophia Chen',
      publishedAt: new Date().toISOString()
    }
  ];

  const displayPosts = [...posts];
  if (displayPosts.length < 6) {
    displayPosts.push(...mockPosts.slice(0, 6 - displayPosts.length));
  }

  const featuredPost = displayPosts[0];

  return (
    <div className="bg-white min-h-screen">
      {/* Editorial Hero */}
      <section className="relative pt-32 pb-20 border-b border-gray-50 overflow-hidden">
        <div className="max-w-[1700px] mx-auto px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
            <div className="max-w-5xl">
              <div className="flex items-center gap-3 text-blue-600 font-black text-[10px] uppercase tracking-[0.25em] mb-8">
                <Sparkles size={14} />
                The 2026 Editorial Collection
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-gray-900 tracking-tight leading-[0.95] mb-10">
                Stories that <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Shape the World.</span>
              </h1>
              <p className="text-xl text-gray-400 font-medium max-w-xl leading-relaxed">
                A curated selection of thoughts, insights, and discoveries from the frontiers of modern culture.
              </p>
            </div>
          </div>

          {/* Featured Sections - 7:3 Split */}
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">

            {/* Left Side: Featured Content (7 Parts) */}
            <div className="lg:col-span-7 group cursor-pointer">
              <div className="relative aspect-[16/10] rounded-[3.5rem] overflow-hidden shadow-2xl mb-10 group-hover:shadow-blue-500/10 transition-all duration-700">
                <img src={featuredPost.coverImage} alt={featuredPost.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                {/* Text Content Overlay - Aligned Left */}
                <div className="absolute bottom-12 left-12 right-12 text-left">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="px-4 py-1 bg-blue-600 rounded-full text-white text-[10px] font-black uppercase tracking-widest">{featuredPost.category.name}</span>
                    <span className="text-white/40 text-[10px] font-black uppercase tracking-widest">Featured Story</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6 max-w-2xl">{featuredPost.title}</h2>
                  <p className="text-white/70 text-lg line-clamp-2 max-w-xl font-medium mb-8">{featuredPost.excerpt}</p>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white font-black">
                      {featuredPost.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-white font-bold">{featuredPost.author}</div>
                      <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">Lead Editor</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Advertisement Container (3 Parts) */}
            <div className="lg:col-span-3 flex flex-col gap-8">
              <AdSlot slotId="featured-sidebar" height={600} isRealAd={false} className="m-0" />

              {/* Secondary Featured Link */}
              <div className="p-8 bg-blue-600 rounded-[3rem] text-white shadow-xl shadow-blue-600/20 group cursor-pointer overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <div className="relative z-10">
                  <h3 className="font-black text-xl leading-tight mb-4">Explore our 2026 Season Collection</h3>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest group-hover:gap-4 transition-all">
                    Read more <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[150px] -mr-[400px] -mt-[400px] -z-0"></div>
      </section>

      {/* Main Feed Area */}
      <main className="max-w-[1600px] mx-auto px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-16">

          <div className="lg:col-span-7">
            {/* Filter Bar */}
            <div className="flex items-center justify-between mb-16 border-b border-gray-100 pb-8">
              <div className="flex gap-8 overflow-x-auto no-scrollbar">
                <a href="/blog" className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 border-b-2 border-blue-600 pb-8 -mb-8">Latest</a>
                {categories.map((cat: any) => (
                  <a key={cat._id} href={`/category/${cat.slug}`} className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors pb-8 -mb-8">
                    {cat.name}
                  </a>
                ))}
              </div>
              <div className="hidden md:flex items-center gap-2 text-gray-300">
                <TrendingUp size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Popularity</span>
              </div>
            </div>

            {/* Post Feed */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-20">
              {displayPosts.slice(3).map((post: any) => (
                <div key={post._id} className="group cursor-pointer">
                  <div className="relative aspect-[16/10] rounded-[2rem] overflow-hidden shadow-md mb-8 group-hover:shadow-xl transition-all duration-500">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] font-black text-blue-600 uppercase tracking-widest mb-4 text-left">
                    {post.category.name}
                    <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-gray-400">{new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 leading-tight mb-4 group-hover:text-blue-600 transition-colors uppercase tracking-tight text-left">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 line-clamp-2 mb-8 leading-relaxed font-medium text-sm text-left">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center font-black text-[10px] text-gray-500 uppercase">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-900">{post.author}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-300 group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-24 pt-16 border-t border-gray-50 flex justify-center">
              <button className="px-12 py-5 bg-black text-white rounded-full font-black text-xs uppercase tracking-[0.25em] hover:bg-blue-600 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10">
                Read Older Stories
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Sidebar />
          </div>

        </div>
      </main>
    </div>
  );
}
