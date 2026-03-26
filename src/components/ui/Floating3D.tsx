'use client';

import React from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Floating3D = () => {
  const { scrollY } = useScroll();
  
  // Create parallax values for different elements
  const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -400]);
  const rotate1 = useTransform(scrollY, [0, 1000], [0, 45]);
  const rotate2 = useTransform(scrollY, [0, 1000], [0, -30]);

  const springY1 = useSpring(y1, { stiffness: 50, damping: 20 });
  const springY2 = useSpring(y2, { stiffness: 50, damping: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Soft blur orbs */}
      <motion.div 
        style={{ y: springY1, rotate: rotate1 }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-red-100/30 rounded-full blur-[100px]"
      />
      <motion.div 
        style={{ y: springY2, rotate: rotate2 }}
        className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-blue-50/20 rounded-full blur-[120px]"
      />
      
      {/* Decorative 3D-like shapes */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-[20%] left-[5%] w-12 h-12 border-2 border-red-200/40 rounded-xl"
        style={{ transformPerspective: 1000, rotateX: 45 }}
      />
      <motion.div 
        animate={{ 
          y: [0, 30, 0],
          rotate: [0, -15, 0]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-[20%] right-[10%] w-24 h-24 border border-blue-200/30 rounded-full"
        style={{ transformPerspective: 1000, rotateY: 30 }}
      />
    </div>
  );
};

export default Floating3D;
