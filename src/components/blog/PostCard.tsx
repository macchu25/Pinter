'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import TiltContainer from '@/components/ui/TiltContainer';

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    coverImage: string;
    category: {
      name: string;
      slug: string;
    };
    author: string;
    publishedAt: string;
  };
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <motion.article 
      className="group cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <TiltContainer intensity={5}>
        <div className="relative mb-4 group/card">
          <Link href={`/blog/${post.slug}`} className="block overflow-hidden rounded-2xl bg-white shadow-md group-hover:shadow-2xl transition-all duration-500">
            {post.coverImage ? (
              <motion.img 
                src={post.coverImage} 
                alt={post.title} 
                className="w-full h-auto block"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.6 }}
              />
            ) : (
              <div className="w-full aspect-[3/4] flex items-center justify-center text-gray-200 text-2xl font-bold bg-gray-50">
                BOOK
              </div>
            )}
            {/* Elegant glass overlay on hover */}
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover/card:opacity-100 transition-opacity pointer-events-none" />
          </Link>
        </div>
        <div className="mt-4">
          <h3 className="text-sm font-bold group-hover:text-red-500 transition-colors line-clamp-1 mb-1">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          <div className="flex items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            <span>{post.author.split(' ')[0]}</span>
            <span>2 vol</span>
          </div>
        </div>
      </TiltContainer>
    </motion.article>
  );
};

export default PostCard;
