import React, { useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { Sparkles, Compass, Lightbulb, Flame, ChevronDown } from "lucide-react";

interface HeroProps {
  onNavigate: (sectionId: string) => void;
  userInteracted?: boolean;
}

export default function Hero({ onNavigate, userInteracted = false }: HeroProps) {
  const [isPlaying] = useState(true);
  const [isMuted] = useState(true);
  
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Sync YouTube iframe play/pause state via postMessage API
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isPlaying ? "playVideo" : "pauseVideo";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*"
      );
    }
  }, [isPlaying]);

  // Sync YouTube iframe mute state via postMessage API
  useEffect(() => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? "mute" : "unMute";
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: "command", func: command, args: [] }),
        "*"
      );
    }
  }, [isMuted]);

  return (
    <div id="hero-section" className="w-full bg-[#050505]">
      {/* 1. Fully-Immersive Clean Full-Screen Video Section */}
      <section
        id="hero-video-viewport"
        className="relative h-screen w-full overflow-hidden bg-black select-none"
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden z-0 bg-black pointer-events-none">
          <iframe
            ref={iframeRef}
            src="https://www.youtube.com/embed/vQDgWrLdn4I?autoplay=1&mute=1&controls=0&loop=1&playlist=vQDgWrLdn4I&showinfo=0&rel=0&iv_load_policy=3&playsinline=1&enablejsapi=1"
            title="Flick Studios Showreel"
            className="absolute pointer-events-none border-none"
            style={{
              width: "100vw",
              height: "56.25vw", // 16:9 aspect ratio cover layout
              minHeight: "100vh",
              minWidth: "177.77vh",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1.35)",
            }}
            allow="autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          
          {/* Subtle vignette/shading to keep the pure video look clean and deep */}
          <div className="absolute inset-0 bg-black/10 z-10" />
        </div>

        {/* Elegant Bouncing Scroll Down Indicator to guide the user */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer select-none"
          onClick={() => {
            const el = document.getElementById("hero-content-viewport");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="text-[10px] font-mono tracking-[0.4em] text-white/60 uppercase">Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          >
            <ChevronDown className="w-5 h-5 text-white/70 hover:text-white transition-colors" />
          </motion.div>
        </div>

        {/* Subtle aesthetic vertical label on the side */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex items-center gap-4 rotate-90 origin-right pointer-events-none z-20">
          <span className="h-px w-12 bg-white/20"></span>
          <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] whitespace-nowrap font-mono">
            CINEMATIC SHOWREEL
          </span>
        </div>
      </section>

      {/* 2. Main Hero Intro Section (The Brand Essence, moved below the video) */}
      <section
        id="hero-content-viewport"
        className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center bg-[#050505] py-24 border-t border-white/5"
      >
        {/* Decorative background glow orbs for professional visual depth */}
        <div className="absolute top-1/4 right-10 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[140px] pointer-events-none z-0 animate-pulse" />
        <div className="absolute bottom-1/4 left-10 w-[500px] h-[500px] bg-neon-orange/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 w-full flex-grow flex flex-col justify-center gap-16">
          
          {/* Text and Actions block */}
          <div className="max-w-3xl space-y-8 text-left">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neon-orange/20 bg-neon-orange/5">
              <span className="w-2 h-2 rounded-full bg-neon-orange animate-pulse"></span>
              <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-bold">
                TURNING VISION INTO EXPERIENCES
              </span>
            </div>

            {/* Giant Title */}
            <div className="space-y-2">
              <h1 className="font-display text-[44px] sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[0.95] text-left uppercase">
                WE BRING <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow drop-shadow-xl">
                  IDEAS
                </span> <br />
                TO LIFE.
              </h1>
            </div>

            {/* Sub-tagline */}
            <p className="text-white/70 text-base sm:text-lg font-light max-w-xl leading-relaxed uppercase">
              THROUGH VISUAL STORYTELLING, CREATIVE DESIGN &amp; CUTTING-EDGE TECHNOLOGY.
            </p>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap gap-4 pt-2">
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
            </div>
          </div>

          {/* Core Brand Pillars Grid */}
          <div className="w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0.5 bg-white/10 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Pillar 1 */}
              <div className="bg-[#050505]/95 p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-neon-purple/10 flex items-center justify-center border border-neon-purple/20 mb-3 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-4 h-4 text-neon-purple" />
                </div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1 font-bold font-mono">Core Pillar</p>
                <h3 className="text-sm font-bold text-white font-display uppercase">CREATIVE MIND</h3>
                <p className="text-[10px] text-white/40 mt-1 font-light leading-snug">
                  Bold artistry and aesthetic novelty behind every concept.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="bg-[#050505]/95 p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-neon-indigo/10 flex items-center justify-center border border-neon-indigo/20 mb-3 group-hover:scale-110 transition-transform">
                  <Compass className="w-4 h-4 text-neon-indigo" />
                </div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1 font-bold font-mono">Workflow</p>
                <h3 className="text-sm font-bold text-white font-display uppercase">STRATEGIC THINKING</h3>
                <p className="text-[10px] text-white/40 mt-1 font-light leading-snug">
                  Precision alignment of visuals with corporate storytelling.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="bg-[#050505]/95 p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-neon-orange/10 flex items-center justify-center border border-neon-orange/20 mb-3 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4 text-neon-orange" />
                </div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1 font-bold font-mono">Production</p>
                <h3 className="text-sm font-bold text-white font-display uppercase">FLAWLESS EXECUTION</h3>
                <p className="text-[10px] text-white/40 mt-1 font-light leading-snug">
                  Cutting-edge tech workflows yielding premium results.
                </p>
              </div>

              {/* Pillar 4 */}
              <div className="bg-[#050505]/95 p-5 sm:p-6 text-left hover:bg-white/[0.02] transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-neon-yellow/10 flex items-center justify-center border border-neon-yellow/20 mb-3 group-hover:scale-110 transition-transform">
                  <Flame className="w-4 h-4 text-neon-yellow" />
                </div>
                <p className="text-[9px] text-white/40 uppercase tracking-widest mb-1 font-bold font-mono">Delivery</p>
                <h3 className="text-sm font-bold text-white font-display uppercase">IMPACTFUL RESULTS</h3>
                <p className="text-[10px] text-white/40 mt-1 font-light leading-snug">
                  Memorable visual assets that elevate engagement and conversion.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
