'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
    const router = useRouter();

    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl: '/admin/posts/new' });
    };

    return (
        <div className="min-h-screen bg-[#f8f8f6] flex items-center justify-center px-4 relative overflow-hidden">
            {/* Decorative background shapes */}
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-red-400/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/5 rounded-full blur-[120px]" />

            <div className="max-w-md w-full relative z-10">
                <div className="bg-[#f0efe9]/80 backdrop-blur-md p-10 md:p-12 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white/50">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black text-[#1a1a1a] mb-2 uppercase tracking-tighter">Pinter Admin</h1>
                        <p className="text-gray-400 font-medium text-sm">Access the editorial dashboard</p>
                    </div>

                    <div className="space-y-6">
                        <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Secure Access</p>
                        
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full flex items-center justify-center gap-4 py-4 bg-white border border-gray-100 text-[#1a1a1a] font-bold rounded-2xl shadow-sm hover:shadow-xl hover:translate-y-[-2px] transition-all active:scale-95 group"
                        >
                            <div className="w-6 h-6 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" className="w-5 h-5">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                            </div>
                            <span className="tracking-tight">Đăng nhập với Google</span>
                        </button>

                        <div className="pt-4 text-center">
                            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                                Authorized Personnel Only
                            </p>
                        </div>
                    </div>

                    <div className="mt-12 text-center pt-8 border-t border-gray-100">
                        <button
                            onClick={() => router.push('/')}
                            className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-red-500 transition-all"
                        >
                            Back to Reading
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
