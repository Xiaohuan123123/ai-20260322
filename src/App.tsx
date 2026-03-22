import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Wand2, PlusCircle, Compass, Library, Zap, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Visualizer } from './components/Visualizer';
import { AudioPlayer } from './components/AudioPlayer';
import { MusicCard } from './components/MusicCard';

// Mock API
const generateMusic = (prompt: string): Promise<{ audioUrl: string; title: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        title: prompt.length > 20 ? prompt.substring(0, 20) + "..." : prompt || "New Soundscape"
      });
    }, 3000);
  });
};

export default function App() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<{ audioUrl: string; title: string } | null>(null);
  const [progress, setProgress] = useState(0);
  const [mood, setMood] = useState('chill');
  const [style, setStyle] = useState('lofi');

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (isPlaying && progress < 100) {
      const interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isPlaying, progress]);

  const handleGenerate = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setIsPlaying(false);
    setProgress(0);

    try {
      const result = await generateMusic(prompt);
      setCurrentTrack(result);
      setIsPlaying(true);
    } catch (error) {
      console.error("Generation failed", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-background/40 backdrop-blur-3xl border-b border-white/10 flex justify-between items-center px-6 h-16">
        <div className="flex items-center gap-4 cursor-pointer active:scale-95 transition-transform">
          <Menu className="text-primary" size={24} />
        </div>
        <div className="text-xl font-light tracking-[0.1em] text-white uppercase">Sonic Ether</div>
        <div className="w-8 h-8 rounded-full bg-surface-variant overflow-hidden cursor-pointer active:scale-95 transition-transform border border-white/10">
          <img
            src="https://picsum.photos/seed/user/100/100"
            alt="User"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </header>

      <main className="relative pt-24 px-6 max-w-7xl mx-auto flex flex-col items-center nebula-gradient">
        {/* Hero */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center text-center space-y-8 mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-light tracking-tight text-white max-w-4xl leading-tight">
            Sculpt your <span className="text-primary italic text-glow">sonic</span> nebula
          </h1>
          <p className="text-on-surface-variant text-lg max-w-xl font-light tracking-wide">
            Describe a mood, a memory, or a dream. Our neural engine will weave it into a unique high-fidelity soundscape.
          </p>
        </motion.section>

        {/* Main Interface */}
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Input Area */}
          <div className="lg:col-span-7 space-y-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-surface-lowest rounded-2xl p-1 border border-white/5">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full bg-transparent border-none focus:ring-0 text-white placeholder:text-on-surface-variant/40 p-6 min-h-[180px] resize-none font-light text-xl leading-relaxed"
                  placeholder="A rainy midnight in a neon city, lo-fi textures, soft synth pads, distant thunder..."
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex bg-surface-low rounded-full p-1 border border-white/5">
                {['chill', 'epic', 'sad'].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
                      mood === m ? 'bg-white text-background' : 'text-on-surface-variant hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="flex bg-surface-low rounded-full p-1 border border-white/5">
                {['lofi', 'piano', 'synth'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setStyle(s)}
                    className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-widest font-bold transition-all ${
                      style === s ? 'bg-white text-background' : 'text-on-surface-variant hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="group relative bg-primary text-background px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 active:scale-95 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,221,221,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles size={20} className={isGenerating ? 'animate-spin' : ''} />
                {isGenerating ? 'Generating...' : 'Generate Music'}
              </button>
              <button className="glass text-white px-8 py-4 rounded-xl font-medium text-lg hover:bg-white/10 active:scale-95 transition-all flex items-center gap-2">
                <Wand2 size={20} />
                Enhance Prompt
              </button>
            </div>
          </div>

          {/* Visualizer Area */}
          <div className="lg:col-span-5 w-full">
            <Visualizer isPlaying={isPlaying} isGenerating={isGenerating} />
          </div>
        </div>

        {/* Library Section */}
        <section className="w-full mt-24 space-y-10">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <h2 className="text-3xl font-medium text-white">Your Sonic Library</h2>
              <p className="text-on-surface-variant font-light">Continuations of your musical identity.</p>
            </div>
            <button className="text-primary flex items-center gap-2 text-sm uppercase tracking-widest font-bold hover:underline">
              View All <Zap size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <MusicCard
              title="Midnight Cyberpunk"
              style="Dark Synthwave"
              duration="3:42"
              imageUrl="https://picsum.photos/seed/cyber/400/400"
            />
            <MusicCard
              title="Aura of Solitude"
              style="Ambient Piano"
              duration="5:12"
              imageUrl="https://picsum.photos/seed/solitude/400/400"
            />
            <MusicCard
              title="Neural Pulse"
              style="Experimental Glitch"
              duration="2:20"
              imageUrl="https://picsum.photos/seed/pulse/400/400"
            />
            <div className="group border-2 border-dashed border-white/5 bg-transparent p-5 rounded-2xl flex flex-col items-center justify-center min-h-[280px] hover:border-primary/40 transition-all duration-500 cursor-pointer">
              <PlusCircle size={40} className="text-white/20 group-hover:text-primary transition-colors mb-4" />
              <span className="text-white/40 group-hover:text-white transition-colors uppercase tracking-[0.2em] text-xs font-bold">New Canvas</span>
            </div>
          </div>
        </section>
      </main>

      {/* Audio Player */}
      <AnimatePresence>
        {currentTrack && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <AudioPlayer
              title={currentTrack.title}
              subtitle="Sonic Ether Engine v2.4"
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              progress={progress}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 w-full h-20 bg-background/60 backdrop-blur-2xl border-t border-white/5 flex justify-around items-center px-8 z-50">
        <NavItem icon={<Compass size={24} />} label="Discover" />
        <NavItem icon={<Sparkles size={24} />} label="Create" active />
        <NavItem icon={<Library size={24} />} label="Library" />
        <NavItem icon={<Zap size={24} />} label="Ether" />
      </nav>

      {/* Background Aura */}
      <div className="fixed top-1/4 -right-32 w-96 h-96 bg-secondary/5 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="fixed bottom-1/4 -left-32 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none z-0" />
    </div>
  );
}

function NavItem({ icon, label, active = false }: { icon: React.ReactNode; label: string; active?: boolean }) {
  return (
    <button className={`flex flex-col items-center justify-center transition-all duration-300 active:scale-90 ${active ? 'text-primary' : 'text-on-surface-variant hover:text-white'}`}>
      {icon}
      <span className="text-[10px] tracking-[0.1em] uppercase font-bold mt-1">{label}</span>
      {active && <div className="absolute -bottom-1 w-1 h-1 bg-primary rounded-full" />}
    </button>
  );
}
