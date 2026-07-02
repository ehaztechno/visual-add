import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Play, Pause, Volume2, VolumeX, Sparkles, Compass, Lightbulb, Target, Flame } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

// Interactive premium videos reflecting the disciplines of Visual Adda
const REEL_VIDEOS = [
  {
    id: "abstract",
    name: "Visual Storytelling Reel",
    url: "https://player.vimeo.com/external/517617478.sd.mp4?s=dbdb8f7d97b09ca6fca8735df3e5cb1594e96e05&profile_id=164&oauth2_token_id=57447761",
    tagline: "High-fidelity motion designs & immersive aesthetic simulations"
  },
  {
    id: "3d",
    name: "CGI & 3D Walkthrough Preview",
    url: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0227e339d3c051412b1d30f7142471c&profile_id=139&oauth2_token_id=57447761",
    tagline: "Realistic architectural and spatial virtual environments"
  },
  {
    id: "production",
    name: "Digital Video Production",
    url: "https://player.vimeo.com/external/409101201.sd.mp4?s=1273ff38b97d1e89cfecfb68433364f9b8c34f26&profile_id=165&oauth2_token_id=57447761",
    tagline: "High-quality cinematics that capture story-driven AVs"
  }
];

export default function Hero({ onNavigate }: HeroProps) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeVideo = REEL_VIDEOS[activeVideoIndex];

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.log("Video play request interrupted", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const selectVideo = (index: number) => {
    setActiveVideoIndex(index);
    setIsPlaying(true);
    // Let the video component handle updating the source automatically via standard React keys
  };

  return (
    <section
      id="hero-section"
      className="relative min-h-screen pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-transparent flex flex-col justify-center"
    >
      {/* Decorative Orbs to accent the orange/yellow/purple theme of Visual Adda */}
      <div className="absolute top-[-100px] right-[-100px] w-[600px] h-[600px] bg-neon-purple/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-neon-orange/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Adda Identity & Taglines */}
          <div className="lg:col-span-6 space-y-8 text-left">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-orange/20 bg-neon-orange/5"
            >
              <span className="w-2 h-2 rounded-full bg-neon-orange animate-pulse"></span>
              <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-bold">
                TURNING VISION INTO EXPERIENCES
              </span>
            </motion.div>

            {/* Giant Title from the image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-2"
            >
              <h1 className="font-display text-[44px] sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[0.95] text-left uppercase">
                WE BRING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow drop-shadow-xl">
                  IDEAS
                </span> <br />
                TO LIFE.
              </h1>
            </motion.div>

            {/* Sub-tagline extracted from the image */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/70 text-base sm:text-lg font-light max-w-xl leading-relaxed"
            >
              THROUGH VISUAL STORYTELLING, CREATIVE DESIGN &amp; CUTTING-EDGE TECHNOLOGY.
            </motion.p>

            {/* Custom Interactive CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                id="hero-primary-cta"
                onClick={() => {
                  const el = document.getElementById("services-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-8 py-4 bg-gradient-to-r from-neon-purple to-neon-orange hover:from-neon-purple/90 hover:to-neon-orange/90 text-white font-extrabold rounded-full flex items-center justify-center gap-3 transition-all cursor-pointer text-xs uppercase tracking-wider shadow-lg shadow-neon-orange/10 hover:shadow-neon-orange/20"
              >
                <span>Explore Services</span>
              </button>
              <button
                id="hero-secondary-cta"
                onClick={() => onNavigate("contact")}
                className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-extrabold rounded-full transition-all cursor-pointer text-xs uppercase tracking-wider"
              >
                <span>Start a Project</span>
              </button>
            </motion.div>
          </div>

          {/* Right Column: Big Auto-Playing Video Frame & Controls */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-6 relative w-full"
            id="video-hero-player-panel"
          >
            {/* Ambient Backdrop glow corresponding to current video state */}
            <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/20 via-neon-orange/15 to-transparent rounded-2xl blur-2xl opacity-80 pointer-events-none"></div>

            <div className="relative bg-[#0a0a0a]/90 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md overflow-hidden shadow-2xl">
              
              {/* Card Title Header with active status indicator */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-orange opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-orange"></span>
                  </span>
                  <span className="font-mono text-[10px] text-white/50 uppercase tracking-widest font-semibold">
                    Visual Adda Creative Showreel
                  </span>
                </div>
                <div className="text-[9px] font-mono bg-white/5 px-2 py-0.5 rounded border border-white/10 text-white/80">
                  AUTO-PLAYING LOOP
                </div>
              </div>

              {/* Big video showcase container */}
              <div className="relative aspect-video w-full bg-black rounded-xl overflow-hidden group border border-white/5">
                <video
                  key={activeVideo.url}
                  ref={videoRef}
                  src={activeVideo.url}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />

                {/* Dark Overlay gradient for sleek aesthetic contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-4">
                  <p className="text-white text-xs font-semibold">{activeVideo.name}</p>
                  <p className="text-white/60 text-[10px] font-mono mt-0.5">{activeVideo.tagline}</p>
                </div>

                {/* Left/Right Overlaid Action Buttons for Quick Play/Mute controls */}
                <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
                  <button
                    onClick={togglePlay}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white transition-all cursor-pointer"
                    title={isPlaying ? "Pause Reel" : "Play Reel"}
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full bg-black/60 hover:bg-black/90 border border-white/10 text-white transition-all cursor-pointer"
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5 text-neon-orange" /> : <Volume2 className="w-3.5 h-3.5 text-neon-yellow" />}
                  </button>
                </div>
              </div>

              {/* Multi-discipline quick selectors based on specialties */}
              <div className="mt-4 pt-3 border-t border-white/5">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider mb-2 text-left">
                  Switch discipline preview:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {REEL_VIDEOS.map((vid, idx) => (
                    <button
                      key={vid.id}
                      onClick={() => selectVideo(idx)}
                      className={`py-2 px-3 text-[10px] font-mono rounded-lg border transition-all text-center cursor-pointer block truncate ${
                        activeVideoIndex === idx
                          ? "bg-gradient-to-r from-neon-purple/20 to-neon-orange/20 border-neon-orange text-white font-bold"
                          : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {vid.id.toUpperCase()} REEL
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 4 Brand Pillars / Core Values Extracted from the bottom left of the VISUAL ADDA image */}
        <div className="mt-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-white/10 rounded-2xl overflow-hidden border border-white/10">
            
            {/* Pillar 1: CREATIVE MIND */}
            <div className="bg-[#050505]/90 p-6 sm:p-8 text-left hover:bg-white/[0.02] transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20 mb-4 group-hover:scale-110 transition-transform">
                <Lightbulb className="w-4 h-4 text-neon-purple" />
              </div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1.5 font-bold font-mono">Core Pillar</p>
              <h3 className="text-lg font-bold text-white font-display">CREATIVE MIND</h3>
              <p className="text-[11px] text-white/40 mt-1 font-light leading-snug">
                Bold artistry and aesthetic novelty behind every concept.
              </p>
            </div>

            {/* Pillar 2: STRATEGIC THINKING */}
            <div className="bg-[#050505]/90 p-6 sm:p-8 text-left hover:bg-white/[0.02] transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-neon-indigo/10 flex items-center justify-center border border-neon-indigo/20 mb-4 group-hover:scale-110 transition-transform">
                <Compass className="w-4 h-4 text-neon-indigo" />
              </div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1.5 font-bold font-mono">Workflow</p>
              <h3 className="text-lg font-bold text-white font-display">STRATEGIC THINKING</h3>
              <p className="text-[11px] text-white/40 mt-1 font-light leading-snug">
                Precision alignment of visuals with corporate storytelling.
              </p>
            </div>

            {/* Pillar 3: FLAWLESS EXECUTION */}
            <div className="bg-[#050505]/90 p-6 sm:p-8 text-left hover:bg-white/[0.02] transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-neon-orange/10 flex items-center justify-center border border-neon-orange/20 mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-4 h-4 text-neon-orange" />
              </div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1.5 font-bold font-mono">Production</p>
              <h3 className="text-lg font-bold text-white font-display">FLAWLESS EXECUTION</h3>
              <p className="text-[11px] text-white/40 mt-1 font-light leading-snug">
                Cutting-edge tech workflows yielding premium results.
              </p>
            </div>

            {/* Pillar 4: IMPACTFUL RESULTS */}
            <div className="bg-[#050505]/90 p-6 sm:p-8 text-left hover:bg-white/[0.02] transition-colors group">
              <div className="w-8 h-8 rounded-lg bg-neon-yellow/10 flex items-center justify-center border border-neon-yellow/20 mb-4 group-hover:scale-110 transition-transform">
                <Flame className="w-4 h-4 text-neon-yellow" />
              </div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-1.5 font-bold font-mono">Delivery</p>
              <h3 className="text-lg font-bold text-white font-display">IMPACTFUL RESULTS</h3>
              <p className="text-[11px] text-white/40 mt-1 font-light leading-snug">
                Memorable visual assets that elevate engagement and conversion.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Subtle side aesthetic layout indicator */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-4 rotate-90 origin-right pointer-events-none">
        <span className="h-px w-12 bg-white/20"></span>
        <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] whitespace-nowrap font-mono">
          ONE STUDIO, ENDLESS POSSIBILITIES.
        </span>
      </div>
    </section>
  );
}
