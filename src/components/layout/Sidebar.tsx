import React from 'react';
import AdSlot from '@/components/ads/AdSlot';
import { Mail, ArrowRight } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="space-y-12">
      {/* Newsletter / Social Section */}
      <div className="bg-black text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-blue-600/30 transition-all duration-700"></div>
        
        <h3 className="font-bold text-2xl mb-2 relative z-10 tracking-tight">Stay Inspired</h3>
        <p className="text-gray-400 text-sm mb-6 relative z-10 leading-relaxed font-light">
          Join 50,000+ readers and get our weekly selection of curated stories directly to your inbox.
        </p>
        
        <div className="relative mb-6">
          <input 
            type="email" 
            placeholder="your@email.com" 
            className="w-full bg-white/10 border border-white/20 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-500"
          />
          <button className="absolute right-2 top-2 p-2 bg-blue-600 rounded-xl hover:bg-blue-700 transition-all">
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="flex gap-4 relative z-10 border-t border-white/10 pt-6">
          <a href="#" className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all border border-white/10 group/icon">
            <svg className="w-5 h-5 fill-current text-gray-400 group-hover/icon:text-white" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-pink-600 hover:scale-110 transition-all border border-white/10 group/icon">
            <svg className="w-5 h-5 fill-current text-gray-400 group-hover/icon:text-white" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>
          <a href="#" className="w-10 h-10 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-blue-400 hover:scale-110 transition-all border border-white/10 group/icon">
            <svg className="w-5 h-5 fill-current text-gray-400 group-hover/icon:text-white" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="sticky top-24">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400">Sponsored</h3>
          <div className="h-[1px] flex-1 bg-gray-100 ml-4"></div>
        </div>
        
        <AdSlot slotId="sidebar-ad-1" height={300} />
        
        <div className="mt-12">
          <h3 className="font-black text-xs uppercase tracking-[0.2em] text-gray-400 mb-8 border-b border-gray-100 pb-4">Most Read This Week</h3>
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <a key={i} href="#" className="flex gap-5 group">
                <div className="relative w-20 h-20 bg-gray-100 shrink-0 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-all">
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10"></div>
                  <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?auto=format&fit=crop&q=80&w=200`} alt="Article" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-sm group-hover:text-blue-600 transition-colors leading-[1.4] line-clamp-2 mb-1">
                    {i === 1 ? "The Digital Nomads' Guide to Living in Đà Lạt" : i === 2 ? "10 Secret Coffee Spots in Sài Gòn" : "Why Modern Minimalism is Evolving"}
                  </h4>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">March 24, 2026</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Categories Quick List */}
        <div className="mt-12 bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100">
           <h3 className="font-bold text-sm mb-6 px-1">Discover More</h3>
           <div className="flex flex-wrap gap-2">
              {['Travel', 'Food', 'Lifestyle', 'Interior', 'Tech'].map((tag) => (
                <a key={tag} href="#" className="px-4 py-2 bg-white text-xs font-bold text-gray-500 rounded-xl hover:bg-white hover:text-black border border-gray-100 transition-all shadow-sm">
                  {tag}
                </a>
              ))}
           </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
