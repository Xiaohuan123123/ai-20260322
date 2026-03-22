import React from 'react';
import { Play } from 'lucide-react';

interface MusicCardProps {
  title: string;
  style: string;
  duration: string;
  imageUrl: string;
}

export const MusicCard: React.FC<MusicCardProps> = ({ title, style, duration, imageUrl }) => {
  return (
    <div className="group bg-surface-low p-5 rounded-2xl active:scale-[0.98] transition-all duration-500 hover:bg-surface cursor-pointer border border-transparent hover:border-white/5">
      <div className="relative aspect-square rounded-xl overflow-hidden mb-4 shadow-xl">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
            <Play size={32} fill="white" className="ml-1 text-white" />
          </div>
        </div>
      </div>
      <h3 className="text-white font-medium truncate">{title}</h3>
      <p className="text-on-surface-variant text-sm mt-1">
        {style} • {duration}
      </p>
    </div>
  );
};
