import React from 'react';

interface VisualizerProps {
  isPlaying: boolean;
  isGenerating?: boolean;
}

export const Visualizer: React.FC<VisualizerProps> = ({ isPlaying, isGenerating }) => {
  const bars = Array.from({ length: 15 });

  return (
    <div className="relative w-full aspect-square bg-surface-low rounded-2xl overflow-hidden flex items-center justify-center border border-white/5">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-secondary/10" />
      
      {/* Waveform Bars */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none flex items-center justify-center gap-1 px-8">
        {bars.map((_, i) => (
          <div
            key={i}
            className={`w-1.5 rounded-full transition-all duration-300 ${
              i % 2 === 0 ? 'bg-primary' : 'bg-secondary'
            }`}
            style={{
              height: isGenerating 
                ? `${20 + Math.random() * 60}%` 
                : isPlaying 
                  ? `${10 + Math.random() * 80}%` 
                  : '10%',
              opacity: 0.4 + (Math.random() * 0.6),
              transitionDelay: `${i * 50}ms`,
              animation: isPlaying || isGenerating ? `pulse-slow ${1 + Math.random()}s infinite` : 'none'
            }}
          />
        ))}
      </div>

      {/* Center Text */}
      <div className="relative z-10 text-center">
        <p className="text-on-surface-variant text-[10px] tracking-[0.2em] uppercase mb-2 font-bold">
          {isGenerating ? 'Analyzing Mood' : isPlaying ? 'Resonating' : 'Sonic Ether'}
        </p>
        <h3 className="text-white text-2xl font-light tracking-wide">
          {isGenerating ? 'Weaving Soundscape...' : 'Ethereal Resonance'}
        </h3>
      </div>
    </div>
  );
};
