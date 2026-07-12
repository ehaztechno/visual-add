import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Building2, 
  Sparkles, 
  TrendingUp, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronLeft,
  Clock,
  Coins,
  ShieldAlert,
  Video,
  Monitor,
  PenTool
} from "lucide-react";
import BeforeAfterSlider from "./BeforeAfterSlider";

export default function CaseStudies() {
  const [activeCase, setActiveCase] = useState(0);

  const cases = [
    {
      id: 0,
      client: "Godrej Properties",
      industry: "Real Estate & Construction",
      title: "Hyper-Realistic 3D Architectural CGI Walkthrough",
      metrics: {
        timeReduction: "3.2x",
        dollarSaved: "₹70 Lakhs",
        accuracy: "99.2%",
        label1: "Render Optimization",
        value1: "4K Path-Traced Octane Renders",
        label2: "Commercial Impact",
        value2: "140+ Lead Sales Conversions"
      },
      summary: "Formulated a completely customized, photorealistic 3D rendering and motion walkthrough sequence for Godrej's upcoming luxury high-rise. Captured subtle dusk light bounces and cinematic lens flares, reducing sales cycle closure times dramatically.",
      tech: ["Unreal Engine 5.4", "Blender Cycles", "Octane Render Clusters", "Adobe After Effects"]
    },
    {
      id: 1,
      client: "Sotheby's Realty",
      industry: "Ultra-Luxury Estates",
      title: "Interactive WebGL Spatial Interior Explorer",
      metrics: {
        timeReduction: "10x",
        dollarSaved: "₹99 Lakhs",
        accuracy: "98.7%",
        label1: "Avg Tour Duration",
        value1: "15 mins per session",
        label2: "Interaction Speed",
        value2: "Less than 12ms latency"
      },
      summary: "Developed a stunning, browser-native 3D spatial model layout app. Allows premium global buyers to walkthrough multi-million dollar property blueprints, toggle room lighting between morning/sunset, and inspect material finishes seamlessly on-the-fly.",
      tech: ["Three.js WebGL", "React Three Fiber", "GSAP Animations", "Tailwind CSS"]
    },
    {
      id: 2,
      client: "SUSE Global Events",
      industry: "Corporate & Tech Conventions",
      title: "Cinematic Keynote Motivational Video & Synchronized Backdrop Rigs",
      metrics: {
        timeReduction: "100%",
        dollarSaved: "₹33 Lakhs",
        accuracy: "100%",
        label1: "LED Wall Resolution",
        value1: "18,000px Ultra-Wide Frame",
        label2: "Synchronized Assets",
        value2: "45 mins of live looping media"
      },
      summary: "Produced an emotionally gripping 3-minute scripted motivational video to open SUSE's global summit. Designed high-tempo, generative screen backgrounds synchronized with speaker cue tracks and onstage lasers for an unforgettable sensory impact.",
      tech: ["Resolume Arena", "TouchDesigner", "Stable Diffusion XL Video", "DaVinci Resolve Studio"]
    }
  ];

  const handleNext = () => {
    setActiveCase((prev) => (prev + 1) % cases.length);
  };

  const handlePrev = () => {
    setActiveCase((prev) => (prev - 1 + cases.length) % cases.length);
  };

  return (
    <section id="cases" className="py-24 bg-transparent relative overflow-hidden bg-cosmic-grid">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 left-1/10 w-80 h-80 bg-neon-orange/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/10 right-1/10 w-80 h-80 bg-neon-purple/5 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Video className="w-3.5 h-3.5 text-neon-orange" />
            <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-semibold font-mono">
              Visual Adda Portfolios
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
            OUR WORKS <span className="bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow bg-clip-text text-transparent">&amp; CAMPAIGNS</span>
          </h2>
          <p className="text-white/50 font-light text-sm sm:text-base max-w-2xl mx-auto">
            Review detailed case histories of hyper-realistic 3D walkthroughs, custom high-contrast graphic installations, and scripted brand films that achieved real commercial returns.
          </p>
        </div>

        {/* Showcase Box */}
        <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-3xl overflow-hidden relative shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Column: Visual Metrics & Logo */}
            <div className="lg:col-span-5 bg-black/60 p-6 sm:p-10 md:p-12 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 relative text-left">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-neon-orange/20"></div>
              
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-semibold block">
                    {cases[activeCase].industry}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white mt-1 uppercase tracking-tight">
                    {cases[activeCase].client}
                  </h3>
                </div>

                {/* Big Metric Display */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-5xl md:text-6xl font-black text-white">
                      {cases[activeCase].metrics.timeReduction}
                    </span>
                    <span className="text-xs font-mono text-neon-orange uppercase font-bold">
                      Tour Boost
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl md:text-4xl font-extrabold text-neon-yellow">
                      {cases[activeCase].metrics.dollarSaved}
                    </span>
                    <span className="text-xs font-mono text-white/40 uppercase">
                      Agency Value Delivered
                    </span>
                  </div>
                </div>
              </div>

              {/* Slider Navigation Controls */}
              <div className="flex items-center gap-4 mt-8 lg:mt-0">
                <button
                  id="case-nav-prev"
                  onClick={handlePrev}
                  className="p-3 bg-white/5 border border-white/10 hover:border-white/20 text-white/50 hover:text-white rounded-xl cursor-pointer transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-1.5 font-mono text-xs text-white/40 font-semibold">
                  <span className="text-white">0{activeCase + 1}</span>
                  <span>/</span>
                  <span>0{cases.length}</span>
                </div>
                <button
                  id="case-nav-next"
                  onClick={handleNext}
                  className="p-3 bg-white/5 border border-white/10 hover:border-white/20 text-white/50 hover:text-white rounded-xl cursor-pointer transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

            {/* Right Column: Case Deep-Dive Narrative */}
            <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between text-left">
              
              <div className="space-y-6">
                <h4 className="font-display text-lg sm:text-xl font-bold text-white leading-snug uppercase tracking-wide">
                  {cases[activeCase].title}
                </h4>

                <p className="text-white/60 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                  {cases[activeCase].summary}
                </p>

                {/* Submetrics list */}
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5 text-xs font-mono">
                  <div className="space-y-1">
                    <span className="text-white/40 block uppercase tracking-wider text-[9px] font-bold">
                      {cases[activeCase].metrics.label1}
                    </span>
                    <span className="text-white font-semibold block">
                      {cases[activeCase].metrics.value1}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-white/40 block uppercase tracking-wider text-[9px] font-bold">
                      {cases[activeCase].metrics.label2}
                    </span>
                    <span className="text-neon-orange font-semibold block">
                      {cases[activeCase].metrics.value2}
                    </span>
                  </div>
                </div>
              </div>

              {/* Technologies Tag */}
              <div className="mt-8 pt-6 border-t border-white/5">
                <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest mb-3 font-semibold">
                  Creative Software Suite &amp; Rigs:
                </span>
                <div className="flex flex-wrap gap-2">
                  {cases[activeCase].tech.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-zinc-950 text-xs font-mono rounded-lg border border-white/5 text-white/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* Before vs After production comparison slider */}
        <BeforeAfterSlider />

      </div>
    </section>
  );
}
