"use client";
import React, { useEffect } from 'react';

interface AdSlotProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle' | 'horizontal' | 'vertical';
  height?: number;
  className?: string;
  isRealAd?: boolean; // Set to true to attempt loading real ads
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const AdSlot: React.FC<AdSlotProps> = ({ 
  slotId, 
  format = 'auto', 
  height, 
  className = "",
  isRealAd = process.env.NODE_ENV === 'production' && !!process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID
}) => {
  useEffect(() => {
    if (isRealAd) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err);
      }
    }
  }, [isRealAd, slotId]);

  if (!isRealAd) {
    return (
      <div 
        className={`bg-gray-50 border-2 border-dashed border-gray-200 rounded-[2rem] flex items-center justify-center text-gray-400 text-sm font-medium overflow-hidden my-8 ${className}`}
        style={{ minHeight: height || 250 }}
      >
        <div className="text-center p-6">
          <div className="uppercase tracking-[0.2em] text-[10px] mb-2 font-black text-gray-300">Google AdSense</div>
          <div className="text-xs font-bold">Slot: {slotId}</div>
          <div className="text-[10px] mt-2 opacity-50 italic">Khu vực hiển thị quảng cáo thực tế</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`ad-container my-8 overflow-hidden flex justify-center ${className}`}
      style={{ minHeight: height || 100 }}
    >
      {/* 
        THAY THẾ data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" 
        bằng mã Publisher ID của bạn trong tài khoản AdSense
      */}
      <ins className="adsbygoogle"
           style={{ display: 'block', width: '100%' }}
           data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX'} 
           data-ad-slot={slotId}
           data-ad-format={format}
           data-full-width-responsive="true"></ins>
    </div>
  );
};

export default AdSlot;
