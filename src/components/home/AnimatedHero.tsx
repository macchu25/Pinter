'use client';

import React from 'react';
import { motion } from 'framer-motion';

const AnimatedHero = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, rotateX: 45, y: 50 }}
      whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{ perspective: "1200px" }}
      className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center bg-blue-50/50 p-8 rounded-3xl overflow-hidden relative"
    >
      <div className="relative z-10">
        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-4 block">Editorial Pick</span>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          Khám Phá Cảm Hứng Sống Đa Tầng Cùng Pinter
        </h1>
        <p className="text-gray-600 text-lg mb-8 max-w-md line-clamp-3">
          Chúng tôi mang đến cho bạn những góc nhìn mới mẻ nhất về thời trang, du lịch, nội thất và phong cách sống hiện đại.
        </p>
        <button className="px-8 py-3 bg-blue-600 text-white font-bold rounded-full hover:bg-black transition-all transform hover:scale-105">
          Đọc Ngay
        </button>
      </div>
      <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=2070&auto=format&fit=crop" 
          alt="Hero image"
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

export default AnimatedHero;
