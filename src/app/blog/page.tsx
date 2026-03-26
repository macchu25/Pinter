import React from 'react';
import { getAllPosts, getAllCategories } from "@/lib/api";
import PostCard from "@/components/blog/PostCard";
import Sidebar from "@/components/layout/Sidebar";
import Image from "next/image";

export const metadata = {
  title: 'Blog | Pinter',
  description: 'Khám phá thế giới qua những câu chuyện và kiến thức thú vị tại Pinter.',
};

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  // Premium Mock data for a "full" look
  const mockPosts = [
    {
      _id: 'mock1',
      title: 'The World of Ice and Fire',
      slug: 'world-of-ice-and-fire',
      excerpt: 'Đà Lạt luôn là điểm đến hấp dẫn với vẻ đẹp thơ mộng và khí hậu ôn hòa...',
      coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Travel', slug: 'travel' },
      author: 'George R.R Martin',
      publishedAt: new Date().toISOString()
    },
    {
      _id: 'mock2',
      title: 'Fantastic Beasts',
      slug: 'fantastic-beasts',
      excerpt: 'Phở bò là linh hồn của ẩm thực Việt Nam, mang hương vị đậm đà truyền thống...',
      coverImage: 'https://images.unsplash.com/photo-1629992101753-56d196c8aced?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Food', slug: 'food' },
      author: 'J.K Rowlings',
      publishedAt: new Date().toISOString()
    },
    {
      _id: 'mock3',
      title: 'Game of Thrones',
      slug: 'game-of-thrones',
      excerpt: 'Làm thế nào để căn hộ nhỏ của bạn trở nên rộng rãi và ấm cúng hơn?',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Interior', slug: 'interior' },
      author: 'George R.R Martin',
      publishedAt: new Date().toISOString()
    },
    {
      _id: 'mock4',
      title: 'The Wise Man\'s Fear',
      slug: 'wise-mans-fear',
      excerpt: 'Hạnh phúc không ở đâu xa, đôi khi chỉ là những giây phút tĩnh lặng bên tách cà phê...',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Lifestyle', slug: 'lifestyle' },
      author: 'Patrick Rothfuss',
      publishedAt: new Date().toISOString()
    },
    {
       _id: 'mock5',
       title: 'Vẻ Đẹp Đà Lạt Qua Những Mùa Hoa',
       slug: 've-dep-da-lat',
       excerpt: 'Khám phá những sắc hoa rực rỡ và lãng mạn tại thành phố ngàn hoa...',
       coverImage: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?q=80&w=2070&auto=format&fit=crop',
       category: { name: 'Travel', slug: 'travel' },
       author: 'Bảo Anh',
       publishedAt: new Date().toISOString()
    },
    {
       _id: 'mock6',
       title: 'Cà Phê Sáng Tại Sài Gòn',
       slug: 'ca-phe-sang-sai-gon',
       excerpt: 'Văn hóa cà phê bệt và những góc quán quen thuộc của người dân thành phố...',
       coverImage: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop',
       category: { name: 'Lifestyle', slug: 'lifestyle' },
       author: 'Minh Thư',
       publishedAt: new Date().toISOString()
    }
  ];

  // Combine real posts with mock data if needed to keep the UI full
  const displayPosts = [...posts];
  if (displayPosts.length < 6) {
    const remainingCount = 6 - displayPosts.length;
    displayPosts.push(...mockPosts.slice(0, remainingCount));
  }

  const featuredPost = displayPosts[0];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={featuredPost.coverImage} 
            alt="Hero Background" 
            className="w-full h-full object-cover blur-sm brightness-[0.4] scale-105 transition-transform duration-700 hover:scale-100"
          />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-600/20 backdrop-blur-md border border-blue-600/30 text-blue-400 text-xs font-bold uppercase tracking-widest mb-6 animate-fade-in">
            Feature Stories 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight max-w-4xl mx-auto leading-tight">
            Khám Phá Thế Giới <br/> Qua Từng Trang Viết
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Phơi bày những câu chuyện ẩn giấu, văn hóa địa phương và những góc nhìn mới mẻ về cuộc sống hiện đại.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all transform hover:-translate-y-1">
              Bắt đầu đọc
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-bold rounded-full border border-white/20 hover:bg-white/20 transition-all transform hover:-translate-y-1">
              Tìm hiểu thêm
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Feed */}
          <div className="lg:col-span-8">
            {/* Category Navigation */}
            <div className="flex items-center gap-6 mb-12 overflow-x-auto pb-4 no-scrollbar border-b">
              <a href="/blog" className="text-sm font-bold border-b-2 border-blue-600 pb-4 text-blue-600 shrink-0 uppercase tracking-widest">Tất cả</a>
              {categories.map((cat: any) => (
                <a 
                  key={cat._id} 
                  href={`/category/${cat.slug}`} 
                  className="text-sm font-bold text-gray-400 hover:text-gray-900 pb-4 shrink-0 uppercase tracking-widest transition-colors"
                >
                  {cat.name}
                </a>
              ))}
            </div>

            {/* Featured Section Grid */}
            <div className="flex flex-col md:flex-row gap-8 mb-16">
               {displayPosts.slice(0, 2).map((post: any) => (
                 <div key={post._id} className="flex-1 group cursor-pointer">
                    <div className="relative rounded-3xl overflow-hidden mb-6 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                      <img src={post.coverImage} alt={post.title} className="w-full h-auto block transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-bold uppercase tracking-widest text-black">
                        {post.category.name}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                    <p className="text-gray-500 line-clamp-2 mb-4 font-light leading-relaxed">{post.excerpt}</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-xs">
                        {post.author.charAt(0)}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{post.author} • {new Date(post.publishedAt).toLocaleDateString('vi-VN')}</span>
                    </div>
                 </div>
               ))}
            </div>

            {/* Post Feed Masonry */}
            <div className="mb-12">
              <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-gray-400 mb-10">Mới Cập Nhật</h2>
              <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                {displayPosts.slice(2).map((post: any) => (
                  <div key={post._id} className="break-inside-avoid">
                    <PostCard post={post} />
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination / Load More */}
            <div className="mt-20 flex justify-center">
              <button className="flex items-center gap-2 px-10 py-4 bg-black text-white rounded-full font-bold text-sm uppercase tracking-widest hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
                Xem thêm bài viết
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-2">
                  <path d="M8.66667 3.33334L12.3333 7.00001M12.3333 7.00001L8.66667 10.6667M12.3333 7.00001L2.33333 7.00001" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>

        </div>
      </div>
    </div>
  );
}
