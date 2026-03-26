import React from 'react';

interface AdSlotProps {
  slotId: string;
  format?: 'auto' | 'fluid' | 'rectangle';
  height?: number;
}

const AdSlot: React.FC<AdSlotProps> = ({ slotId, format = 'auto', height }) => {
  return (
    <div 
      className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-400 text-sm font-medium overflow-hidden my-6"
      style={{ minHeight: height || 250 }}
    >
      <div className="text-center p-4">
        <div className="uppercase tracking-widest text-[10px] mb-2">Google AdSense</div>
        <div>Slot: {slotId}</div>
        <div className="text-[10px] mt-1 opacity-50">Placeholder cho quảng cáo thực tế</div>
      </div>
      {/* 
        Thêm script AdSense ở đây trong dự án thực tế:
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXX"
             data-ad-slot={slotId}
             data-ad-format={format}
             data-full-width-responsive="true"></ins>
      */}
    </div>
  );
};

export default AdSlot;
