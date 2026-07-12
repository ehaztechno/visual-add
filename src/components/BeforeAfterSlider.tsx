import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, HelpCircle, ArrowLeftRight, Monitor, PenTool } from "lucide-react";

interface ComparisonPreset {
  id: string;
  name: string;
  category: string;
  icon: any;
  beforeImg: string;
  afterImg: string;
  beforeLabel: string;
  afterLabel: string;
  beforeDesc: string;
  afterDesc: string;
}

export default function BeforeAfterSlider() {
  const [activeTab, setActiveTab] = useState<string>("cgi");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update container width on mount, tab changes, and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    
    // Small timeout to allow Layout & Animation transitions to complete before measuring
    const timer = setTimeout(updateWidth, 150);

    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    };
  }, [activeTab]);

  const presets: ComparisonPreset[] = [
    {
      id: "cgi",
      name: "3D Architectural CGI",
      category: "CGI & Render Optimization",
      icon: Monitor,
      beforeImg: "/src/assets/images/penthouse_wireframe_1783814452453.jpg",
      afterImg: "/src/assets/images/penthouse_render_1783814467364.jpg",
      beforeLabel: "Grey Mesh Viewport",
      afterLabel: "4K Octane Path-Traced Render",
      beforeDesc: "Initial geometry draft & blueprint alignment in viewport environment.",
      afterDesc: "Finished photorealistic presentation with complex cinematic sunset light bounces."
    },
    {
      id: "character",
      name: "2D Character Concept",
      category: "Creative 2D & Illustration",
      icon: PenTool,
      beforeImg: "/src/assets/images/mascot_sketch_1783814482269.jpg",
      afterImg: "/src/assets/images/mascot_polished_1783814495202.jpg",
      beforeLabel: "Raw Graphite Sketch",
      afterLabel: "Polished Digital Vector",
      beforeDesc: "Initial hand-drawn design, capturing structure, proportion, and weight.",
      afterDesc: "Fully dynamic vector render with neon lighting, shading depth, and branding elements."
    }
  ];

  const currentPreset = presets.find((p) => p.id === activeTab) || presets[0];

  // Calculate position based on event coordinate
  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    if (e.touches[0]) {
      handleMove(e.touches[0].clientX);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      if (e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleGlobalMouseMove);
      window.addEventListener("mouseup", handleGlobalMouseUp);
      window.addEventListener("touchmove", handleGlobalTouchMove, { passive: true });
      window.addEventListener("touchend", handleGlobalMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchmove", handleGlobalTouchMove);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="mt-16 bg-[#0a0a0a]/80 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
      <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-neon-purple/20"></div>
      
      <div className="flex flex-col lg:flex-row items-stretch gap-8 relative z-10">
        {/* Control and info Panel */}
        <div className="lg:w-2/5 flex flex-col justify-between text-left space-y-6">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-neon-orange animate-pulse" />
              <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-semibold">
                Interactive Case Visualizer
              </span>
            </div>
            
            <h3 className="font-display text-2xl font-extrabold text-white uppercase tracking-tight">
              Before &amp; After <span className="bg-gradient-to-r from-neon-orange to-neon-yellow bg-clip-text text-transparent">Production Slider</span>
            </h3>
            
            <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed">
              Drag the interactive slider handle in the visual stage to instantly contrast the raw production files, sketches, and geometry with our final path-traced or vector-rendered client deliverables.
            </p>
          </div>

          {/* Preset Selector Buttons */}
          <div className="space-y-3">
            <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
              Select Showcase Pipeline:
            </span>
            <div className="grid grid-cols-2 gap-3">
              {presets.map((preset) => {
                const Icon = preset.icon;
                const isActive = activeTab === preset.id;
                return (
                  <button
                    key={preset.id}
                    onClick={() => {
                      setActiveTab(preset.id);
                      setSliderPosition(50);
                    }}
                    className={`flex items-center gap-3 p-3 rounded-xl border text-left cursor-pointer transition-all duration-300 ${
                      isActive
                        ? "border-neon-orange/40 bg-neon-orange/5 text-white"
                        : "border-white/5 bg-zinc-950 text-white/50 hover:border-white/10 hover:text-white"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isActive ? "bg-neon-orange/10 text-neon-orange" : "bg-white/5 text-white/40"}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wide leading-none">{preset.name}</span>
                      <span className="block text-[9px] text-white/30 mt-1 font-mono tracking-tight leading-none">{preset.category}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic description of states based on slider position */}
          <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-[11px] space-y-3">
            <div className="flex items-center gap-1.5 text-white/40">
              <HelpCircle className="w-3.5 h-3.5 text-neon-purple" />
              <span>STAGES CORRELATION DETAIL:</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-neon-yellow">Before:</span>
                <span className="text-white/60 font-light font-sans leading-relaxed">{currentPreset.beforeDesc}</span>
              </div>
              <div className="flex items-start gap-2 pt-2 border-t border-white/5">
                <span className="text-neon-orange">After:</span>
                <span className="text-white/60 font-light font-sans leading-relaxed">{currentPreset.afterDesc}</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Slider Sandbox Area */}
        <div className="lg:w-3/5 flex flex-col justify-center">
          <div 
            ref={containerRef}
            className="w-full aspect-[16/9] relative rounded-2xl overflow-hidden border border-white/10 bg-zinc-950 select-none shadow-2xl group cursor-col-resize touch-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {/* After Image (Base bottom layer) */}
            <img 
              src={currentPreset.afterImg} 
              alt={currentPreset.afterLabel}
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
              draggable="false"
            />
            
            {/* Before Image (Top sliding layer clipped by width) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${sliderPosition}%` }}
            >
              <img 
                src={currentPreset.beforeImg} 
                alt={currentPreset.beforeLabel}
                className="absolute inset-0 h-full object-cover max-w-none"
                style={{ width: containerWidth ? `${containerWidth}px` : "100%" }}
                referrerPolicy="no-referrer"
                draggable="false"
              />
            </div>

            {/* Glowing vertical slider line boundary */}
            <div 
              className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-purple via-neon-orange to-neon-yellow z-20 pointer-events-none"
              style={{ left: `${sliderPosition}%` }}
            >
              {/* Drag button indicator */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-black border border-neon-orange/50 flex items-center justify-center text-white shadow-[0_0_15px_rgba(249,115,22,0.3)] group-hover:scale-110 active:scale-95 transition-transform">
                <ArrowLeftRight className="w-4 h-4 text-neon-orange" />
              </div>
            </div>

            {/* Overlay Labels */}
            {/* Before Label (top left side) */}
            <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded bg-black/80 border border-white/10 font-mono text-[9px] font-bold text-white uppercase tracking-wider backdrop-blur-sm pointer-events-none shadow">
              {currentPreset.beforeLabel}
            </div>

            {/* After Label (top right side) */}
            <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded bg-black/80 border border-white/10 font-mono text-[9px] font-bold text-neon-orange uppercase tracking-wider backdrop-blur-sm pointer-events-none shadow">
              {currentPreset.afterLabel}
            </div>

            {/* Help Prompt Overlaid on Image */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-1.5 rounded-full bg-zinc-950/90 border border-white/5 font-mono text-[9px] font-semibold text-white/50 tracking-wider backdrop-blur-md pointer-events-none flex items-center gap-2 transition-opacity group-hover:opacity-100 opacity-60">
              <ArrowLeftRight className="w-3.5 h-3.5 text-neon-orange animate-pulse" />
              <span>DRAG OR TAP TO COMPARE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
