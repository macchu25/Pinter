'use client';

import React from 'react';
import Link from 'next/link';
import { Globe, Mail, Send, MessageSquare, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-[#f0efe9]/50 backdrop-blur-sm border-t border-gray-100 py-16 px-8 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Logo & About */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-6">Pinter</h2>
            <p className="text-gray-400 text-sm leading-relaxed font-medium">
              A curated dashboard for modern readers. Discover fashion, travel, and lifestyle inspirations through our unique 3D experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Explore</h3>
            <ul className="space-y-4">
              {['Collection', 'Highlights', 'Trending', 'Archive'].map((item) => (
                <li key={item}>
                  <Link href={`/category/${item.toLowerCase()}`} className="text-sm font-bold text-[#1a1a1a] hover:text-red-500 transition-colors flex items-center gap-1 group">
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Support</h3>
            <ul className="space-y-4">
              {['Terms', 'Privacy', 'Cookie Policy', 'Accessibility'].map((item) => (
                <li key={item}>
                  <Link href="/" className="text-sm font-bold text-[#1a1a1a] hover:text-red-500 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Connect</h3>
            <div className="flex gap-4 mb-6">
              {[Globe, Mail, Send, MessageSquare].map((Icon, i) => (
                <button 
                  key={i}
                  className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-gray-400 hover:text-red-500 hover:shadow-md transition-all"
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              hello@pinter.digital
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            © 2026 PINTER DIGITAL. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8">
            <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-all">
              DESIGNED BY DEEPMIND
            </button>
            <button className="text-[10px] font-black uppercase tracking-widest text-[#1a1a1a]">
              EN / VN
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
