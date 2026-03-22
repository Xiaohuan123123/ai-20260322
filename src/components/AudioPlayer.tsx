import React from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  title: string;
  subtitle: string;
  isPlaying: boolean;
  onTogglePlay: () => void;
  progress: number;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  title,
  subtitle,
  isPlaying,
  onTogglePlay,
  progress,
}) => {
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-lg z-40">
      <div className="bg-surface/40 backdrop-blur-3xl border border-white/10 p-4 rounded-2xl flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Album Art Thumbnail */}
        <div className="w-12 h-12 rounded-lg bg-primary/20 overflow-hidden flex-shrink-0 border border-white/10">
          <img
            src="https://picsum.photos/seed/music/100/100"
            alt="Cover"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Info */}
        <div className="flex-grow min-w-0">
          <div className="text-white text-sm font-medium truncate">{title}</div>
          <div className="text-on-surface-variant text-[10px] tracking-widest uppercase font-bold">
            {subtitle}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button className="text-white hover:text-primary transition-colors active:scale-90">
            <SkipBack size={20} fill="currentColor" />
          </button>
          <button
            onClick={onTogglePlay}
            className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-background active:scale-90 transition-transform hover:bg-primary"
          >
            {isPlaying ? (
              <Pause size={20} fill="currentColor" />
            ) : (
              <Play size={20} fill="currentColor" className="ml-1" />
            )}
          </button>
          <button className="text-white hover:text-primary transition-colors active:scale-90">
            <SkipForward size={20} fill="currentColor" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5">
          <div
            className="h-full bg-primary shadow-[0_0_10px_#00dddd] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
