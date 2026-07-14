import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Tv, 
  RotateCw, 
  Volume2, 
  Camera, 
  Terminal, 
  Copy, 
  Check, 
  Flame, 
  Music, 
  Disc,
  Play,
  Heart
} from "lucide-react";

interface StoryboardShot {
  shotNumber: number;
  title: string;
  duration: number;
  cameraMovement: string;
  lighting: string;
  cgiPrompt: string;
  voiceover: string;
}

interface StoryboardDraft {
  pitch: string;
  recommendedEngine: string;
  sfxProfile: string;
  storyboard: StoryboardShot[];
}

export default function CinematicDirector() {
  const [format, setFormat] = useState("3d-walkthrough");
  const [mood, setMood] = useState("golden-hour");
  const [brief, setBrief] = useState("");
  const [loading, setLoading] = useState(false);
  const [draft, setDraft] = useState<StoryboardDraft | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedPromptIndex, setCopiedPromptIndex] = useState<number | null>(null);

  const formats = [
    { id: "3d-walkthrough", label: "3D CGI Walkthrough", desc: "Architectural & high-fidelity tours" },
    { id: "brand-promo", label: "Cinematic Brand Promo", desc: "Sleek, atmospheric modern promos" },
    { id: "2d-explainer", label: "2D Animated Explainer", desc: "Dynamic motion design & concepts" },
    { id: "corporate-film", label: "Corporate Film / AV", desc: "Powerful widescreen video backdrops" }
  ];

  const moods = [
    { id: "golden-hour", label: "Golden Hour Warmth", desc: "Rich amber rays, long photoreal shadows" },
    { id: "cyberpunk-neon", label: "Cyberpunk Neon Grid", desc: "Vibrant violet & neon orange refraction" },
    { id: "minimalist-brutalist", label: "Minimalist Brutalism", desc: "High contrast monochrome, raw concrete textures" },
    { id: "cinematic-misty", label: "Misty Cinematic Noir", desc: "Moody teal and orange backlighting, fog volumes" }
  ];

  const sampleBriefs = [
    "A sleek luxury high-rise penthouse facing the Mumbai skyline at night.",
    "A vibrant brand mascot jumping out of a sketchpad and dancing across neon streets.",
    "An interactive WebGL dashboard opening up with futuristic 3D wireframe visuals.",
    "A soaring cinematic flyover of a futuristic eco-friendly resort hidden in dense forest."
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brief.trim()) {
      setError("Please describe your visual concept or choose a preset brief below!");
      return;
    }

    setLoading(true);
    setError(null);
    setDraft(null);

    try {
      const response = await fetch("/api/director/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          format: formats.find(f => f.id === format)?.label || format,
          mood: moods.find(m => m.id === mood)?.label || mood,
          brief
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || "Failed to generate storyboard draft.");
      }

      setDraft(data.draft);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, index: number, isPrompt: boolean) => {
    navigator.clipboard.writeText(text);
    if (isPrompt) {
      setCopiedPromptIndex(index);
      setTimeout(() => setCopiedPromptIndex(null), 2000);
    } else {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-neon-purple/5 blur-3xl rounded-full pointer-events-none" />
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left column: Inputs & Controls */}
        <div className="lg:col-span-5 space-y-8 text-left">
          <div className="space-y-3">
            <span className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-[9px] font-mono uppercase tracking-widest rounded-full font-bold inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-neon-purple" />
              Lightweight AI Feature
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase font-display">
              Studio AI Director
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              Generate fully-fledged cinematic storyboard drafts, camera movements, CGI prompts, and voiceover scripts using our highly-optimized, low-memory Gemini 3.5 engine.
            </p>
          </div>

          <form onSubmit={handleGenerate} className="space-y-6">
            
            {/* Format selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-white/40 uppercase tracking-widest font-bold block">
                1. Select Pipeline Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                {formats.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFormat(f.id)}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      format === f.id
                        ? "bg-white text-black border-white"
                        : "bg-white/[0.01] border-white/10 hover:border-white/20 text-white"
                    }`}
                  >
                    <span className="block text-[11px] font-bold font-mono uppercase">{f.label}</span>
                    <span className={`block text-[8px] mt-0.5 leading-tight ${format === f.id ? "text-black/60" : "text-white/40"}`}>
                      {f.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mood selection */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-white/40 uppercase tracking-widest font-bold block">
                2. Choose Aesthetic Mood
              </label>
              <div className="grid grid-cols-2 gap-2">
                {moods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMood(m.id)}
                    className={`p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      mood === m.id
                        ? "bg-neon-orange text-black border-neon-orange"
                        : "bg-white/[0.01] border-white/10 hover:border-white/20 text-white"
                    }`}
                  >
                    <span className="block text-[11px] font-bold font-mono uppercase">{m.label}</span>
                    <span className={`block text-[8px] mt-0.5 leading-tight ${mood === m.id ? "text-black/70" : "text-white/40"}`}>
                      {m.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Brief Textarea */}
            <div className="space-y-2">
              <label className="text-[11px] font-mono text-white/40 uppercase tracking-widest font-bold block">
                3. Input Story Concept / Scene brief
              </label>
              <textarea
                value={brief}
                onChange={(e) => setBrief(e.target.value)}
                placeholder="Describe what you want to visualize (e.g. A panoramic sweep over an ultra-modern organic hotel villa surrounded by deep mist and palm trees)..."
                rows={3}
                className="w-full p-4 bg-white/[0.03] border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-neon-purple leading-relaxed resize-none font-sans"
              />
            </div>

            {/* Sample Brief Presets */}
            <div className="space-y-2">
              <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider block">Or click a visual preset:</span>
              <div className="flex flex-wrap gap-1.5">
                {sampleBriefs.map((preset, pIdx) => (
                  <button
                    key={pIdx}
                    type="button"
                    onClick={() => setBrief(preset)}
                    className="px-2.5 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-md text-[9px] text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    Preset 0{pIdx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold font-mono uppercase text-xs tracking-widest transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden ${
                loading 
                  ? "bg-white/10 text-white/40 cursor-not-allowed"
                  : "bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow text-black hover:scale-[1.02] cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.2)]"
              }`}
            >
              {loading ? (
                <>
                  <RotateCw className="w-4 h-4 animate-spin text-white" />
                  <span>DRAFTING CINEMATIC STORYBOARD...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black animate-pulse" />
                  <span>DRAFT STORYBOARD</span>
                </>
              )}
            </button>

          </form>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 font-mono text-center">
              {error}
            </div>
          )}
        </div>

        {/* Right column: Interactive Output Visualizer */}
        <div className="lg:col-span-7 h-full flex flex-col justify-between">
          <AnimatePresence mode="wait">
            {draft ? (
              <motion.div
                key="output"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                {/* Director Header Card */}
                <div className="bg-black/40 border border-white/10 rounded-2xl p-6 text-left space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/5 pb-4">
                    <div className="space-y-1">
                      <span className="text-[9px] font-mono text-neon-orange uppercase tracking-widest font-bold">Generated Cinematic Draft</span>
                      <h3 className="text-xl font-extrabold tracking-tight text-white uppercase font-display">
                        &ldquo;{draft.pitch}&rdquo;
                      </h3>
                    </div>
                    <div className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-right">
                      <span className="block text-[8px] font-mono text-white/40 uppercase">RENDER PIPELINE</span>
                      <span className="block text-[10px] font-mono text-white font-bold">{draft.recommendedEngine}</span>
                    </div>
                  </div>

                  {/* Audio design detail */}
                  <div className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-3 text-xs text-white/70">
                    <div className="p-2 bg-neon-purple/10 border border-neon-purple/20 rounded-lg text-neon-purple">
                      <Volume2 className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[9px] font-mono text-white/40 uppercase">AUDIO DESIGN PROFILE</span>
                      <span className="font-light">{draft.sfxProfile}</span>
                    </div>
                  </div>
                </div>

                {/* Staggered Shots Timeline */}
                <div className="space-y-4 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                  {draft.storyboard.map((shot, sIdx) => (
                    <div 
                      key={shot.shotNumber} 
                      className="bg-black/30 border border-white/5 hover:border-white/15 rounded-xl p-5 text-left space-y-4 transition-all relative overflow-hidden group"
                    >
                      {/* Top Bar of each Shot */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-neon-purple text-black font-mono font-black text-xs flex items-center justify-center">
                            {shot.shotNumber}
                          </span>
                          <h4 className="text-sm font-bold tracking-wide text-white uppercase font-mono">
                            {shot.title}
                          </h4>
                        </div>
                        <span className="text-[10px] font-mono text-neon-orange font-bold uppercase bg-neon-orange/10 px-2.5 py-0.5 rounded-full">
                          {shot.duration} SECONDS
                        </span>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-white/40 uppercase flex items-center gap-1">
                            <Camera className="w-3 h-3 text-white/40" /> Camera Motion
                          </span>
                          <p className="text-white/80 font-light leading-relaxed">{shot.cameraMovement}</p>
                        </div>
                        <div className="space-y-1">
                          <span className="text-[9px] font-mono text-white/40 uppercase flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-white/40" /> Lighting &amp; VFX
                          </span>
                          <p className="text-white/80 font-light leading-relaxed">{shot.lighting}</p>
                        </div>
                      </div>

                      {/* Script Panel */}
                      <div className="bg-white/[0.02] border border-white/5 rounded-xl p-3.5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-neon-purple uppercase font-bold tracking-wider">VOICEOVER SCRIPT</span>
                          <button
                            onClick={() => copyToClipboard(shot.voiceover, sIdx, false)}
                            className="text-white/30 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[9px] font-mono"
                          >
                            {copiedIndex === sIdx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>COPY SCRIPT</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-white/90 italic font-serif leading-relaxed">
                          &ldquo;{shot.voiceover}&rdquo;
                        </p>
                      </div>

                      {/* Render Prompt Panel */}
                      <div className="bg-black/60 border border-white/5 rounded-xl p-3 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono text-white/30 uppercase tracking-wider flex items-center gap-1">
                            <Terminal className="w-3 h-3 text-white/30" /> CGI RENDER PROMPT
                          </span>
                          <button
                            onClick={() => copyToClipboard(shot.cgiPrompt, sIdx, true)}
                            className="text-white/30 hover:text-white transition-colors cursor-pointer flex items-center gap-1 text-[9px] font-mono"
                          >
                            {copiedPromptIndex === sIdx ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">COPIED</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>COPY PROMPT</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-[11px] text-white/60 font-mono leading-relaxed select-all">
                          {shot.cgiPrompt}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="h-full flex flex-col items-center justify-center border border-white/10 border-dashed rounded-2xl p-12 text-center text-white/30 space-y-4 min-h-[400px]"
              >
                {loading ? (
                  <div className="space-y-4">
                    <div className="relative w-16 h-16 mx-auto">
                      <div className="absolute inset-0 rounded-full border-4 border-t-neon-purple border-r-transparent border-b-transparent border-l-transparent animate-spin" />
                      <div className="absolute inset-2 rounded-full border-4 border-b-neon-orange border-r-transparent border-t-transparent border-l-transparent animate-spin-slow" />
                      <div className="absolute inset-4 rounded-full border-4 border-l-neon-yellow border-r-transparent border-b-transparent border-t-transparent animate-pulse flex items-center justify-center">
                        <Disc className="w-4 h-4 text-white animate-spin" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-mono text-white animate-pulse">CREATIVE AI AGENT WORKING...</p>
                      <p className="text-xs text-white/40 max-w-sm mx-auto leading-relaxed">
                        Compiling camera coordinates, lighting temperatures, narrative scripts, and rendering engine prompts.
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-full text-white/20">
                      <Tv className="w-10 h-10" />
                    </div>
                    <div className="space-y-1.5 max-w-sm">
                      <h4 className="text-white text-sm font-bold uppercase tracking-wider font-mono">
                        Storyboard Output Terminal
                      </h4>
                      <p className="text-xs text-white/50 leading-relaxed font-light">
                        Select your pipeline specifications and click <strong className="text-neon-purple">DRAFT STORYBOARD</strong> to witness the AI Agent formulate an interactive production roadmap.
                      </p>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
