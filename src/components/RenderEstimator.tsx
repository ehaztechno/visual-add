import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  Clock, 
  Terminal, 
  Flame, 
  TrendingUp, 
  Server
} from "lucide-react";

export default function RenderEstimator() {
  const [resolution, setResolution] = useState<string>("4k");
  const [frameRate, setFrameRate] = useState<number>(60);
  const [engine, setEngine] = useState<string>("ue5-pathtrace");
  const [duration, setDuration] = useState<number>(30); // in seconds

  // Render Estimator Calculations
  const calculateEstimate = () => {
    let baseTimePerFrameSeconds = 12; // UE5 path-trace 4K standard
    if (resolution === "1080p") baseTimePerFrameSeconds = 3.5;
    if (resolution === "8k") baseTimePerFrameSeconds = 48;

    if (engine === "octane") baseTimePerFrameSeconds *= 1.4;
    if (engine === "ue5-realtime") baseTimePerFrameSeconds *= 0.1; // super fast realtime raster
    if (engine === "redshift") baseTimePerFrameSeconds *= 1.1;

    const totalFrames = duration * frameRate;
    const totalLocalSeconds = totalFrames * baseTimePerFrameSeconds;
    
    // Cloud render farm is roughly 40x faster due to clustering
    const totalFarmSeconds = totalLocalSeconds / 40;

    const formattedLocal = formatDuration(totalLocalSeconds);
    const formattedFarm = formatDuration(totalFarmSeconds);
    
    // Bandwidth
    const frameSizeMB = resolution === "1080p" ? 5 : resolution === "4k" ? 22 : 85;
    const totalDataSizeGB = ((totalFrames * frameSizeMB) / 1024).toFixed(1);

    return {
      totalFrames,
      localTime: formattedLocal,
      farmTime: formattedFarm,
      dataSize: totalDataSizeGB,
      nodeCount: Math.max(4, Math.min(64, Math.round(totalFrames / 150))),
      timeSavedPercent: 97.5
    };
  };

  const formatDuration = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${seconds}s`;
  };

  const estimate = calculateEstimate();

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-orange/40 to-transparent" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 space-y-8 text-left">
          <div className="space-y-3">
            <span className="px-3 py-1 bg-neon-orange/10 border border-neon-orange/20 text-neon-orange text-[9px] font-mono uppercase tracking-widest rounded-full font-bold">
              Interactive Lab
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase font-display">
              Render Node Estimator
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Toggle rendering formats below to calculate processing frame rates, file assets load, and dynamic cluster configurations on our visual server nodes.
            </p>
          </div>

          {/* Resolution selection */}
          <div className="space-y-3">
            <label className="text-[11px] font-mono text-white/40 uppercase tracking-widest font-bold block">
              1. Target Resolution
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "1080p", label: "FHD 1080p", desc: "Digital Promos" },
                { id: "4k", label: "UHD 4K Ultra HD", desc: "Premium Standard" },
                { id: "8k", label: "8K Extreme CGI", desc: "Broadcast Widescreen" }
              ].map((res) => (
                <button
                  key={res.id}
                  onClick={() => setResolution(res.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                    resolution === res.id
                      ? "bg-white text-black border-white"
                      : "bg-white/[0.02] border-white/10 hover:border-white/20 text-white"
                  }`}
                >
                  <span className="block text-xs font-bold font-mono uppercase">{res.label}</span>
                  <span className={`block text-[9px] mt-0.5 ${resolution === res.id ? "text-black/60" : "text-white/40"}`}>
                    {res.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Frame Rate & Engine Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Engine Select */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono text-white/40 uppercase tracking-widest font-bold block">
                2. Core Render Engine
              </label>
              <select
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                className="w-full p-3.5 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white font-mono focus:outline-none focus:border-neon-orange uppercase cursor-pointer"
              >
                <option value="ue5-pathtrace" className="bg-[#050505]">UE5 Path-Tracing (Cinematic)</option>
                <option value="octane" className="bg-[#050505]">Octane Spectral (Photoreal)</option>
                <option value="redshift" className="bg-[#050505]">Redshift GPU (VFX Heavy)</option>
                <option value="ue5-realtime" className="bg-[#050505]">UE5 Unreal Raster (Instant)</option>
              </select>
            </div>

            {/* Frame Rate */}
            <div className="space-y-3">
              <label className="text-[11px] font-mono text-white/40 uppercase tracking-widest font-bold block">
                3. Target Frame Rate
              </label>
              <div className="flex gap-2">
                {[24, 30, 60].map((fps) => (
                  <button
                    key={fps}
                    onClick={() => setFrameRate(fps)}
                    className={`flex-1 py-3 border rounded-xl text-xs font-mono font-bold cursor-pointer transition-colors ${
                      frameRate === fps
                        ? "bg-neon-orange border-neon-orange text-black"
                        : "bg-white/[0.02] border-white/10 text-white hover:border-white/20"
                    }`}
                  >
                    {fps} FPS
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Duration Slider */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[11px] font-mono">
              <span className="text-white/40 uppercase tracking-widest font-bold">4. Total Walkthrough Duration</span>
              <span className="text-neon-orange font-bold text-sm font-mono">{duration} SECONDS</span>
            </div>
            <input
              type="range"
              min="5"
              max="180"
              step="5"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full accent-neon-orange bg-white/10 h-1.5 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-[9px] font-mono text-white/30">
              <span>5 SECONDS</span>
              <span>90s (Cinema Trailer)</span>
              <span>180 SECONDS (Full Tour)</span>
            </div>
          </div>

        </div>

        {/* Calculations Dashboard Visualizer */}
        <div className="lg:col-span-6 bg-black/60 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6 text-left relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Terminal className="w-5 h-5 text-white/10" />
          </div>

          <div className="space-y-1">
            <h4 className="text-xs font-mono text-white/40 uppercase tracking-wider">PIPELINE METADATA SUMMARY</h4>
            <div className="text-sm font-bold text-white font-mono flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-neon-orange animate-pulse" />
              <span>VA_RENDER_CLUSTER_09 // READY</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 border-t border-b border-white/10 py-6 my-4">
            <div className="space-y-1">
              <span className="block text-[10px] font-mono text-white/40 uppercase tracking-wider">Frames to Render</span>
              <span className="block text-2xl font-black text-white font-mono">{estimate.totalFrames.toLocaleString()}</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] font-mono text-white/40 uppercase tracking-wider">Estimated Cache Size</span>
              <span className="block text-2xl font-black text-white font-mono">{estimate.dataSize} GB</span>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] font-mono text-white/40 uppercase tracking-wider">Standard Desktop Render</span>
              <span className="block text-sm font-mono text-white/70 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-neon-orange" />
                <span>{estimate.localTime}</span>
              </span>
            </div>
            <div className="space-y-1">
              <span className="block text-[10px] font-mono text-white/40 uppercase tracking-wider">VA Distributed Render</span>
              <span className="block text-sm font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                <span>{estimate.farmTime}</span>
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex items-start gap-3">
              <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400 mt-0.5">
                <TrendingUp className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h5 className="text-xs font-bold text-emerald-400 uppercase font-mono">97.5% Time Savings Reclaimed</h5>
                <p className="text-[11px] text-white/50 font-light mt-0.5 leading-relaxed">
                  By moving execution pipeline to our localized cluster array, we deliver broadcast packages 40x faster than traditional systems.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
              <span>GPU Cluster Allocation</span>
              <span className="text-neon-orange font-bold font-mono">{estimate.nodeCount} Render Nodes active</span>
            </div>
            
            {/* Horizontal Progress Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(estimate.nodeCount / 64) * 100}%` }}
                transition={{ duration: 0.5 }}
                className="h-full bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow rounded-full" 
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
