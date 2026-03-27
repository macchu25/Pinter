"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Check, Loader2, Image as ImageIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createCategory, uploadImage } from "@/lib/api";

export default function CreateCategoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    image: "",
  });

  // UI State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Sync Slug with Name
  useEffect(() => {
    if (formData.name && !formData.slug) {
      const generatedSlug = formData.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
      setFormData((prev) => ({ ...prev, slug: generatedSlug }));
    }
  }, [formData.name]);

  // Protected Route Check
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/api/auth/signin");
    }
  }, [status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setFormData((prev) => ({ ...prev, image: result.imageUrl }));
    } catch (err: any) {
      setError("Failed to upload image: " + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
       setError("You must be logged in.");
       return;
    }

    if (!formData.name || !formData.slug) {
      setError("Please fill in required fields (Name and Slug).");
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    const token = (session as any)?.accessToken;
    if (!token) {
      setError("Session token missing. Please Sign Out and Sign In again.");
      setIsSubmitting(false);
      return;
    }

    try {
      await createCategory(formData, token);
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/posts/new"); // Go back to post creation so they can use the new category
      }, 2000);
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Failed to create category.");
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
        {formData.image ? (
          <img
            src={formData.image}
            alt="Category Preview"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        ) : (
          <img
            src="/cate.png"
            alt="Default Category"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-black/10 transition-colors duration-1000"></div>
        
        {/* Top Badge */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-black uppercase px-6 py-4 rounded-2xl text-lg md:text-xl tracking-tight shadow-xl">
            {success ? "Success!" : "New Category"}
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
          <form id="create-category-form" onSubmit={handleSubmit} className="flex flex-col gap-8 w-full max-w-3xl mx-auto">
            
            <div className="space-y-2">
              <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Create New Category</h1>
              <p className="text-gray-500 font-medium">Categories help organize your blog posts and make them easier to find.</p>
            </div>

            {/* Name and Slug */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Technology, Lifestyle..."
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
                  required
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="category-slug..."
                  className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-5 py-5 text-gray-800 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Briefly describe what this category is about..."
                rows={4}
                className="w-full bg-[#f8f9fa] border-none rounded-[1.25rem] px-5 py-5 text-gray-800 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-gray-200 outline-none transition-all resize-none"
              ></textarea>
            </div>

            {/* Image Upload */}
            
          </form>
        </div>

        {/* Sticky Action Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:px-12 md:py-8 bg-gradient-to-t from-white via-white to-white/0 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-50/50 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <Link href="/admin/posts/new" className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4" /> Go back
            </Link>
          </div>
          <button 
            type="submit"
            form="create-category-form"
            disabled={isSubmitting || isUploading || success}
            className="w-full sm:w-auto bg-[#1a1c23] mr-20 text-white px-10 py-4 md:py-5 rounded-[1.25rem] font-black uppercase text-sm tracking-widest hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-black/10 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Creating...
              </>
            ) : success ? (
              <>
                <Check className="w-4 h-4" /> Created
              </>
            ) : (
              "Create Category"
            )}
          </button>
        </div>
        
      </div>
    </div>
  );
}
