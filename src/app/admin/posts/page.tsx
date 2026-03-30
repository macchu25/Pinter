import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quản lý bài viết</h1>
        <Link 
          href="/admin/posts/new" 
          className="bg-black text-white px-6 py-2 rounded-full font-bold hover:bg-gray-800 transition-colors"
        >
          Tạo bài viết mới
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-sm overflow-hidden border border-gray-100">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 font-bold text-sm">Hình ảnh</th>
              <th className="px-6 py-4 font-bold text-sm">Tiêu đề</th>
              <th className="px-6 py-4 font-bold text-sm">Chuyên mục</th>
              <th className="px-6 py-4 font-bold text-sm">Ngày đăng</th>
              <th className="px-6 py-4 font-bold text-sm text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                  Chưa có bài viết nào.
                </td>
              </tr>
            ) : (
              posts.map((post: any) => (
                <tr key={post._id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="w-12 h-16 bg-gray-100 rounded-lg overflow-hidden">
                      <img src={post.coverImage} className="w-full h-full object-cover" alt={post.title} />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-bold">{post.title}</p>
                    <p className="text-xs text-gray-400">{post.slug}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold uppercase bg-gray-100 px-3 py-1 rounded-full">
                      {post.category?.name || 'Chưa phân loại'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('vi-VN')}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-red-500 hover:underline text-sm font-bold">Xóa</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
