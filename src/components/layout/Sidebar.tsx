import React from 'react';
import AdSlot from '@/components/ads/AdSlot';

const Sidebar = () => {
  return (
    <aside className="space-y-8">
      <div className="bg-gray-100 p-6 rounded-2xl">
        <h3 className="font-bold text-lg mb-4">Theo dõi chúng tôi</h3>
        <p className="text-gray-500 text-sm">Nhận thông tin mới nhất về phong cách sống và du lịch.</p>
        <div className="mt-4 flex gap-4">
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">f</a>
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-pink-600 hover:text-white transition-colors">i</a>
          <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-400 hover:text-white transition-colors">t</a>
        </div>
      </div>

      <div className="sticky top-20">
        <h3 className="font-bold text-lg mb-4 uppercase tracking-widest text-gray-400">Quảng cáo</h3>
        <AdSlot slotId="sidebar-ad-1" height={600} />
        
        <div className="mt-8">
          <h3 className="font-bold text-lg mb-4">Bài viết phổ biến</h3>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <a key={i} href="#" className="flex gap-4 group">
                <div className="w-20 h-20 bg-gray-200 shrink-0 rounded-lg overflow-hidden">
                  {/* Placeholder for small image */}
                </div>
                <div>
                  <h4 className="font-bold text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                    Cách trang trí phòng khách theo phong cách Minimalism
                  </h4>
                  <span className="text-xs text-gray-400">24/03/2026</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
