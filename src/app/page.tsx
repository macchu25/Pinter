import Image from "next/image";
import DashboardHero from "@/components/home/DashboardHero";
import RightSidebar from "@/components/home/RightSidebar";
import PostCard from "@/components/blog/PostCard";
import { getAllPosts, getAllCategories } from "@/lib/api";

export default async function Home() {
  const posts = await getAllPosts();
  const categories = await getAllCategories();

  // Premium Mock data
  const mockPosts = [
    {
      _id: 'mock1',
      title: 'The World of Ice and Fire',
      slug: 'world-of-ice-and-fire',
      excerpt: 'Đà Lạt luôn là điểm đến hấp dẫn...',
      coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Travel', slug: 'travel' },
      author: 'George R.R Martin',
      publishedAt: new Date().toISOString()
    },
    {
      _id: 'mock2',
      title: 'Fantastic Beasts',
      slug: 'fantastic-beasts',
      excerpt: 'Phở bò là linh hồn của ẩm thực...',
      coverImage: 'https://images.unsplash.com/photo-1629992101753-56d196c8aced?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Food', slug: 'food' },
      author: 'J.K Rowlings',
      publishedAt: new Date().toISOString()
    },
    {
      _id: 'mock3',
      title: 'Game of Thrones',
      slug: 'game-of-thrones',
      excerpt: 'Làm thế nào để căn hộ nhỏ...',
      coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Interior', slug: 'interior' },
      author: 'George R.R Martin',
      publishedAt: new Date().toISOString()
    },
    {
      _id: 'mock4',
      title: 'The Wise Man\'s Fear',
      slug: 'wise-mans-fear',
      excerpt: 'Hạnh phúc không ở đâu xa...',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop',
      category: { name: 'Lifestyle', slug: 'lifestyle' },
      author: 'Patrick Rothfuss',
      publishedAt: new Date().toISOString()
    }
  ];

  // Merge real + mock
  const displayPosts = [...posts];
  if (displayPosts.length < 6) {
    const needed = 6 - displayPosts.length;
    displayPosts.push(...mockPosts.slice(0, needed));
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Side */}
        <div className="lg:col-span-9">
          <DashboardHero />

          <section className="mb-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-bold">Popular Now</h2>
              <button className="text-gray-400 hover:text-gray-900 group flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                See all
              </button>
            </div>
            <div className="columns-2 md:columns-3 xl:columns-5 2xl:columns-6 gap-8 space-y-8">
              {displayPosts.slice(0, 6).map((post: any) => (
                <div key={post._id} className="break-inside-avoid mb-8">
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-xl font-bold">New Series Collection</h2>
              <button className="text-gray-400 hover:text-gray-900 group flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
                See all
              </button>
            </div>

            <div className="space-y-6">
              {(posts.length > 4 ? posts.slice(4, 6) : displayPosts.slice(0, 1)).map((post: any) => (
                <div key={post._id} className="flex items-center gap-6 p-4 rounded-3xl hover:bg-white transition-colors cursor-pointer group">
                  <div className="w-20 h-24 bg-gray-200 rounded-lg overflow-hidden shrink-0 shadow-sm group-hover:shadow-md transition-all">
                    <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{post.author} • 8 chapters each vol</p>
                  </div>
                  <div className="text-sm font-bold text-gray-400 pr-4">
                    2 vol
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Side */}
        <RightSidebar />
      </div>
    </div>
  );
}
