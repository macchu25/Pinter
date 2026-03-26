"use client";

import React from 'react';
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-2xl font-bold tracking-tighter text-blue-600">
            PINTER
          </a>
          <div className="hidden md:flex gap-6 text-sm font-medium">
            <a href="/category/lifestyle" className="hover:text-blue-600 transition-colors">Lifestyle</a>
            <a href="/category/travel" className="hover:text-blue-600 transition-colors">Travel</a>
            <a href="/category/food" className="hover:text-blue-600 transition-colors">Food</a>
            <a href="/category/interior" className="hover:text-blue-600 transition-colors">Interior</a>
            <a href="/blog" className="hover:text-blue-600 transition-colors">Blog</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </button>
          {session ? (
            <button 
              onClick={() => signOut()}
              className="px-4 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gray-800 transition-all shadow-sm"
            >
              Sign Out
            </button>
          ) : (
            <a 
              href="/api/auth/signin"
              className="px-4 py-2 bg-blue-600 text-white rounded-full text-xs font-bold uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm"
            >
              Sign In
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
