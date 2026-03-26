'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Search, Bell, ChevronRight, LogOut } from 'lucide-react';
import { useSession, signIn, signOut } from "next-auth/react";

const DashboardHero = () => {
  const { data: session } = useSession();

  return (
    <section className="mb-12">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-10">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search book name, author, edition..." 
            className="w-full pl-12 pr-4 py-3 bg-white border border-transparent focus:border-red-400/20 rounded-2xl outline-none text-sm transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          {session ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 px-3 py-1.5 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-100 shrink-0">
                  <img src={session.user?.image || ""} alt={session.user?.name || ""} referrerPolicy="no-referrer" />
                </div>
                <span className="font-bold text-xs hidden md:block max-w-[100px] truncate">{session.user?.name}</span>
                <button 
                  onClick={() => signOut()}
                  className="p-1.5 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-all ml-1"
                  title="Đăng xuất"
                >
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          ) : (
            <button 
              onClick={() => signIn('google')}
              className="flex items-center gap-3 px-5 py-2.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all group"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <span className="font-bold text-sm text-gray-700">Đăng nhập Gmail</span>
            </button>
          )}
          
          <button className="w-11 h-11 bg-white border border-gray-100 rounded-2xl flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition-all">
            <Bell size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row items-center justify-between bg-[#f0efe9]/80 backdrop-blur-md p-10 md:p-16 rounded-[40px] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50 min-h-[400px]">
        {/* Decorative 3D elements in Hero */}
        <motion.div 
          animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-red-400/5 rounded-full blur-3xl" 
        />
        
        <div className="w-full lg:w-1/2 relative z-10 lg:pl-10" style={{ perspective: '2000px' }}>
          <motion.div
            initial={{ rotateY: -15, skewY: -1, z: 0 }}
            style={{ transformStyle: 'preserve-3d', transformOrigin: 'left center' }}
          >
            <h1 className="text-5xl md:text-7xl xl:text-8xl font-black mb-10 text-[#1a1a1a] drop-shadow-sm leading-[1.1]">
              Happy reading, <br /> 
              <motion.span className="text-red-500">
                {"Pinter".split("").map((char, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: index * 0.1,
                      repeat: Infinity,
                      repeatDelay: 5
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                <motion.span
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 0.8, repeat: Infinity, times: [0, 0.5, 1] }}
                  className="inline-block w-[2px] h-[1em] bg-red-500 ml-1 translate-y-[10%]"
                />
              </motion.span>
            </h1>
            <p className="text-gray-500 text-xl md:text-2xl mb-12 max-w-lg leading-relaxed font-medium opacity-80">
              Wow! you&apos;ve delved deep into the wizarding world&apos;s secrets. Have Harry&apos;s parents died yet? Oops, looks like you&apos;re not there yet. Get reading now!
            </p>
            <button className="flex items-center gap-2 px-8 py-4 bg-[#1a1a1a] text-white font-bold rounded-2xl hover:bg-red-500 transition-all group shadow-lg hover:shadow-red-500/20 active:scale-95 text-lg">
              Start reading
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
        
        <div className="w-full lg:w-1/2 relative mt-12 lg:mt-0 flex items-center justify-center lg:justify-end lg:pr-10">
          <div className="relative" style={{ perspective: '1000px' }}>
            <motion.div 
              initial={{ rotateY: -20, rotateX: 5, z: 0 }}
              animate={{ rotateY: -10 }}
              transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
              className="relative w-72 h-96 md:w-80 md:h-[450px] shadow-[30px_30px_60px_rgba(0,0,0,0.15)] rounded-r-lg overflow-hidden border-l-4 border-black/20"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img 
                src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1974&auto=format&fit=crop" 
                className="w-full h-full object-cover"
                alt="Book cover"
              />
            </motion.div>
            
            {/* Floating elements behind book */}
            <motion.div 
              animate={{ y: [0, -30, 0], x: [0, 15, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 w-24 h-24 bg-white/40 backdrop-blur-md rounded-3xl shadow-xl z-[-1] border border-white/60"
            />
            
            <motion.div 
              animate={{ y: [0, 25, 0], x: [0, -20, 0], rotate: [0, 15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -top-12 -right-8 w-16 h-16 bg-red-400/20 backdrop-blur-sm rounded-2xl shadow-lg z-[-1] border border-red-400/30"
            />

            {/* Additional shapes for "more bounce" */}
            <motion.div 
              animate={{ y: [0, -40, 0], x: [0, -30, 0], rotate: [0, 45, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 -right-20 w-12 h-12 bg-blue-400/10 backdrop-blur-sm rounded-xl shadow-lg z-[-1]"
            />

            <motion.div 
              animate={{ y: [0, 30, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="absolute -bottom-16 right-20 w-20 h-20 bg-red-400/5 rounded-full blur-2xl z-[-1]"
            />

            <motion.div 
              animate={{ x: [0, 20, 0], y: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute top-1/2 -right-10 w-8 h-8 bg-white/20 backdrop-blur-md rounded-lg border border-white/40 shadow-xl"
            />
            
            <motion.div 
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-20 -right-20 w-40 h-40 border border-red-500/10 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
