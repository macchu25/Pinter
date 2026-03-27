import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import SidebarTabs from "@/components/layout/SidebarTabs";
import AuthProvider from "@/components/auth/AuthProvider";
import Floating3D from "@/components/ui/Floating3D";
import Footer from "@/components/layout/Footer";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pinter | Fashion, Travel, Lifestyle & Interiors",
  description: "Cảm hứng sống đa tầng cho phong cách sống hiện đại.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* Google AdSense - Native script to avoid data-nscript attribute issues */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={`${inter.className} bg-[#f8f8f6] text-[#1a1a1a] antialiased selection:bg-red-200 selection:text-red-900`}>
        <AuthProvider>
          <div className="flex min-h-screen relative overflow-hidden">
            {/* Grain Overlay */}
            <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

            <Floating3D />
            <SidebarTabs />
            <main className="flex-1 ml-20 md:ml-24 min-h-screen bg-[#f8f8f6]/50 backdrop-blur-[2px] relative z-10 flex flex-col">
              <div className="flex-1">
                {children}
              </div>
              <Footer />
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
