"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown, Check, Loader2, Image as ImageIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getAllCategories, createPost, uploadImage } from "@/lib/api";

export default function CreateNewPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    content: "",
    coverImage: "",
  });

  // UI State
  const [categories, setCategories] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Load Categories
  useEffect(() => {
    async function loadCategories() {
      try {
        const catData = await getAllCategories();
        setCategories(catData);
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    loadCategories();
  }, []);

  // Sync Slug with Title
  useEffect(() => {
    if (formData.title && !formData.slug) {
      const generatedSlug = formData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.title]);

  // Protected Route Check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");
    try {
      const result = await uploadImage(file);
      setFormData((prev) => ({ ...prev, coverImage: result.imageUrl }));
    } catch (err: any) {
      setError("Failed to upload image: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
       setError("You must be logged in to publish.");
       return;
    }

    if (!formData.title || !formData.category || !formData.content) {
      setError("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    console.log("Submit clicked. Session status:", status);
    console.log("Current session data keys:", Object.keys(session || {}));
    
    const token = (session as any)?.accessToken;
    if (!token) {
      console.error("Token is missing! Session content:", session);
      setError("Session token missing. Your session might be too old or the backend server was unreachable during login. Please Sign Out and Sign In again to refresh your credentials.");
      setIsSubmitting(false);
      return;
    }

    try {
      // Find the selected category object by ID
      const selectedCategory = categories.find(c => c._id === formData.category);
      if (!selectedCategory) throw new Error("Category not found");

      // Auto-generate excerpt if empty (+ handle markdown characters)
      const finalExcerpt = formData.excerpt.trim() || 
                          formData.content.slice(0, 160).replace(/[#*`]/g, "").trim() + "...";

      const postPayload = {
        ...formData,
        excerpt: finalExcerpt,
        category: selectedCategory._id,
        author: session.user?.name || "Admin",
      };

      console.log("Submitting post with token:", token.substring(0, 10) + "...");
      const result = await createPost(postPayload, token);
      console.log("Post created successfully:", result);
      
      setSuccess(true);
      setTimeout(() => {
        router.push("/blog");
      }, 2000);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to create post. Please check your credentials.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#f5f5f7]">
        <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f7] flex flex-col md:flex-row h-screen overflow-hidden font-sans">
      {/* LEFT SIDE - IMAGE CONTAINER */}
      <div className="relative w-full md:w-[40%] h-[300px] md:h-[calc(100vh-4rem)] md:my-8 md:ml-8 md:mr-10 rounded-[2rem] overflow-hidden flex-shrink-0 shadow-lg group">
        {formData.coverImage ? (
          <img
            src={formData.coverImage}
            alt="Cover Preview"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <video
            src="/add.mov"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/10 transition-colors duration-1000"></div>
        
        {/* Top Badge */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase px-6 py-4 rounded-2xl text-lg md:text-xl tracking-tight shadow-xl">
            {success ? "Success!" : "New Creative Post"}
          </div>
        </div>

        {/* Bottom Status */}
        {error && (
          <div className="absolute bottom-6 left-6 right-6 p-4 bg-red-500/90 backdrop-blur-md text-white font-bold rounded-2xl text-sm animate-shake">
            {error}
          </div>
        )}
      </div>

      {/* RIGHT SIDE - FORM CONTAINER */}
      <div className="relative w-full md:flex-1 h-full bg-white rounded-none shadow-sm flex flex-col overflow-hidden">
        
        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-32">
          <form id="create-post-form" onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
            
            {/* Row 1: Title and Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                  Volume Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="The Mystery of Pinter..."
                  className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-5 py-5 text-gray-800 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="url-slug..."
                  className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-5 py-5 text-gray-800 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Row 2: Category and Cover Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                  <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                    Category *
                </label>
                <div className="relative">
                  <select 
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="appearance-none w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-5 py-5 text-[#111] font-bold focus:ring-2 focus:ring-gray-200 outline-none transition-all cursor-pointer"
                  >
                    <option value="" disabled>Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>{cat.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                  Cover Image
                </label>
                <label className="w-full h-[64px] border-2 border-dashed border-gray-200 rounded-[1.25rem] px-5 py-4 flex items-center justify-center text-[#8e9bb0] font-bold text-sm bg-white cursor-pointer hover:bg-gray-50 hover:border-gray-300 transition-all overflow-hidden">
                  <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} disabled={isSubmitting || isUploading} />
                  {isUploading ? (
                    <Loader2 className="animate-spin w-4 h-4 mr-2" />
                  ) : (
                    <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent opacity-80 mr-1">+</span>
                  )}
                  {formData.coverImage ? "Change Image" : "Select Book Cover"}
                </label>
              </div>
            </div>

            {/* Row 3: Short Excerpt */}
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                Short Excerpt (Optional)
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="A brief summary (or let it auto-generate)..."
                rows={3}
                className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-5 py-5 text-gray-800 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Row 4: Story Content */}
            <div className="space-y-2 flex-1 min-h-[300px] flex flex-col">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                Story Content (Markdown) *
              </label>
              <textarea
                name="content"
                required
                value={formData.content}
                onChange={handleInputChange}
                placeholder="# Introduction&#10;Start writing your magic..."
                className="w-full flex-1 min-h-[300px] bg-[#f8f9fa] border-none rounded-[1.25rem] px-5 py-5 text-gray-800 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all resize-none font-mono text-sm leading-relaxed"
              ></textarea>
            </div>
          </form>
        </div>

        {/* Sticky Action Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:px-12 md:py-8 bg-gradient-to-t from-white via-white to-white/0 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-50/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin/posts" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" /> Go back
            </Link>
          </div>
          <button 
            type="submit"
            form="create-post-form"
            disabled={isSubmitting || isUploading || success}
            className="w-full sm:w-auto bg-[#1a1c23] mr-20 text-white px-10 py-4 md:py-5 rounded-[1.25rem] font-black uppercase text-sm tracking-widest hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/10 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Publishing...
              </>
            ) : success ? (
              <>
                <Check className="w-4 h-4" /> Published
              </>
            ) : (
              "Publish Volume"
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
}
