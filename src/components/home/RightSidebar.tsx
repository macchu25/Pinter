'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, MoreHorizontal, Play } from 'lucide-react';

const RightSidebar = () => {
  const friends = [
    { name: 'Roberto Jordan', activeChat: 'Chapter Five: Diagon Alley', img: 'https://i.pravatar.cc/100?u=1' },
    { name: 'Anna Henry', activeChat: 'I finished reading the chapter', img: 'https://i.pravatar.cc/100?u=2' },
  ];

  return (
    <aside className="hidden xl:flex flex-col gap-10 lg:col-span-3 h-full">
      {/* Cinematic Media Card (Zoom Only) */}
      <div className="bg-black rounded-[40px] shadow-sm overflow-hidden aspect-[1.1] relative group border border-gray-100/10">
        <video 
          src="/dashboard.mov" 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-40 transition-opacity pointer-events-none" />
        
        {/* Simple Title Overlay */}
        <div className="absolute bottom-8 left-8 z-10">
          <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-tight opacity-80 group-hover:opacity-100 transition-opacity">DASHBOARD PREIVEW</h3>
          <h4 className="text-30vh text-white uppercase tracking-tighter leading-tight opacity-80 group-hover:opacity-100 transition-opacity">Macchu Studio</h4>
        </div>
      </div>

      {/* Reader Friends Card */}
      <div className="bg-white p-8 rounded-[40px] shadow-sm flex-1">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-bold text-lg">Reader Friends</h3>
          <button className="text-gray-400"><MoreHorizontal size={20} /></button>
        </div>

        <div className="space-y-8">
          {friends.map((friend) => (
            <div key={friend.name} className="flex gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden shrink-0">
                <img src={friend.img} alt={friend.name} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-sm mb-1">{friend.name}</h4>
                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                   {friend.activeChat}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
