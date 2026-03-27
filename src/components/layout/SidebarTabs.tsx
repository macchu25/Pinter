'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  Library,
  Clock,
  Bookmark,
  Settings,
  AlignLeft,
  Search,
  PlusCircle,
  LayoutGrid
} from 'lucide-react';

const SidebarTabs = () => {
  const pathname = usePathname();

  const tabs = [
    { icon: <Home size={22} />, path: '/', label: 'Home' },
    { icon: <Library size={22} />, path: '/blog', label: 'Library' },
    { icon: <Clock size={22} />, path: '/recent', label: 'Recent' },
    { icon: <Bookmark size={22} />, path: '/saved', label: 'Saved' },
    { icon: <Settings size={22} />, path: '/settings', label: 'Settings' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-24 bg-white border-r border-gray-100 flex flex-col items-center py-8 z-50">
      <Link href="/" className="mb-12">
        <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white">
          <AlignLeft size={24} />
        </div>
      </Link>

      <nav className="flex flex-col gap-8 flex-1">
        {tabs.map((tab) => {
          const isActive = pathname === tab.path;
          return (
            <Link key={tab.path} href={tab.path} className="relative group transition-transform duration-300 hover:scale-110">
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-red-400/10 rounded-2xl -m-3 shadow-[0_8px_16px_rgba(248,113,113,0.1)]"
                  initial={{ z: -10 }}
                  animate={{ z: 0 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <div
                className={`
                  relative z-10 p-1 transition-all duration-300
                  ${isActive ? 'text-red-500 [text-shadow:0_4px_8px_rgba(239,68,68,0.2)]' : 'text-gray-400 group-hover:text-gray-900'}
                `}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="group-hover:[transform:translateZ(10px)] transition-transform duration-300">
                  {tab.icon}
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-6 mt-auto">
        <Link href="/admin/categories/new" className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-colors">
          <LayoutGrid size={22} />
        </Link>
        <Link href="/admin/posts/new" className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-gray-900 transition-colors">
          <PlusCircle size={22} />
        </Link>
        <button className="p-1 text-gray-400 hover:text-gray-900 transition-colors">
          <AlignLeft size={22} className="rotate-180" />
        </button>
      </div>
    </aside>
  );
};

export default SidebarTabs;
