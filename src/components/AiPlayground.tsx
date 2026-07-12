import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Terminal, 
  Cpu, 
  Play, 
  RefreshCw, 
  Brain, 
  CheckCircle2, 
  HelpCircle, 
  Gauge, 
  Lightbulb, 
  Sparkles,
  Command,
  Clock,
  Video,
  PenTool,
  Code,
  FileText,
  Layers
} from "lucide-react";
import { PlaygroundResult } from "../types";
import ProposalWizard from "./ProposalWizard";

export default function AiPlayground() {
  const [activeTab, setActiveTab] = useState<"proposal" | "3d" | "script" | "webgl">("proposal");
  const [agentType, setAgentType] = useState("3D Rendering & Lighting Director");
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PlaygroundResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const selectTab = (tab: "proposal" | "3d" | "script" | "webgl") => {
    setActiveTab(tab);
    if (tab === "3d") {
      setAgentType("3D Rendering & Lighting Director");
    } else if (tab === "script") {
      setAgentType("Motivational Scriptwriter");
    } else if (tab === "webgl") {
      setAgentType("Interactive WebGL & AR Architect");
    }
    setUserPrompt("");
    setResult(null);
    setError(null);
  };

  const agents = [
    {
      name: "3D Rendering & Lighting Director",
      description: "Formulates photorealistic physical parameters, Raytracing values, and Octane cameras.",
      placeholder: "E.g., Scene setup for a modern luxury villa during sunset with soft warm volumetric fog and camera panning.",
      examples: [
        "Design a physical camera movement rig and volumetric lighting configuration for a photorealistic luxury villa living room at dusk.",
        "Configure physical Octane camera indices and PBR material indices to render polished gold foil accents on a luxury cosmetics packaging mockup."
      ]
    },
    {
      name: "Motivational Scriptwriter",
      description: "Drafts emotionally compelling voiceovers, visual pacing, and sonic cues.",
      placeholder: "E.g., Script for a high-energy athletic apparel campaign centered on the theme: 'Believe. Achieve. Inspire.'",
      examples: [
        "Draft an emotionally gripping 60-second scripted anthem about breakthrough limits, pairing narration lines with cinematic slow-motion drone shots.",
        "Synthesize a brand anthem script that translates green architecture into a rhythmic visual montage of sustainable skyline gardens."
      ]
    },
    {
      name: "Interactive WebGL & AR Architect",
      description: "Generates Three.js shader details, interaction handlers, and AR filters.",
      placeholder: "E.g., A real-time responsive particles canvas reacting to cursor position in three-dimensional space.",
      examples: [
        "Outline the Three.js WebGL scene structure, vertex shader code logic, and physics bindings for a grid of responsive floating metallic spheres.",
        "Provide parameters for a WebXR-based spatial interior preview application that allows users to place customized 3D furniture onto floor planes."
      ]
    }
  ];

  const handleSelectExample = (ex: string) => {
    setUserPrompt(ex);
  };

  const handleExecuteAgent = async () => {
    if (!userPrompt.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/playground/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ agentType, userPrompt })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || "Studio engine generation failed");
      }

      setResult(data.result);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An unexpected error occurred during simulation.");
    } finally {
      setLoading(false);
    }
  };

  const activeAgent = agents.find(a => a.name === agentType) || agents[0];

  return (
    <section id="playground" className="py-24 bg-transparent relative overflow-hidden bg-cosmic-grid">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-neon-orange/5 blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block exactly in tone with Visual Adda flyer */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-neon-orange" />
            <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-semibold font-mono">
              Visual Adda Digital Laboratory
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
            DIRECT YOUR VISUAL <span className="bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow bg-clip-text text-transparent">ENGINE</span>
          </h2>
          <p className="text-white/50 font-light text-sm sm:text-base max-w-2xl mx-auto">
            Experience our advanced digital creative models. Input any narrative, lighting prompt, or code framework constraints to see how our engines parse, formulate, and compile creative briefs.
          </p>
        </div>

        {/* Main Tab Switcher */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-zinc-950/60 p-2 border border-white/5 rounded-2xl backdrop-blur-md">
            {[
              { id: "proposal", label: "Proposal & ROI Wizard", icon: FileText, desc: "Briefing & Estimation" },
              { id: "3d", label: "3D CGI Director", icon: Cpu, desc: "Octane & Raytracing" },
              { id: "script", label: "Screenplay Director", icon: PenTool, desc: "Cinematic Copywriting" },
              { id: "webgl", label: "WebGL & AR Architect", icon: Code, desc: "Interactive Shaders" }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => selectTab(tab.id as any)}
                  className={`flex flex-col items-center text-center p-3 sm:p-4 rounded-xl transition-all duration-300 relative group cursor-pointer ${
                    isActive
                      ? "bg-white/5 border border-white/10 text-white shadow-xl"
                      : "border border-transparent text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-gradient-to-r from-neon-purple/5 to-neon-orange/5 rounded-xl border border-neon-orange/20 -z-10"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon className={`w-5 h-5 mb-2 transition-transform duration-300 group-hover:scale-110 ${isActive ? "text-neon-orange" : "text-white/40"}`} />
                  <span className="text-[11px] font-bold uppercase tracking-wider block leading-none">{tab.label}</span>
                  <span className="text-[9px] text-white/30 mt-1 font-mono tracking-normal block">{tab.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace Layout */}
        {activeTab === "proposal" ? (
          <ProposalWizard hideHeader={true} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Controls Column (Left) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative">
                <div className="absolute top-0 right-1/10 w-24 h-[1px] bg-gradient-to-r from-transparent via-neon-orange to-transparent"></div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-neon-orange/10 border border-neon-orange/20 flex items-center justify-center text-neon-orange shrink-0">
                    <Cpu className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-mono text-neon-orange uppercase tracking-widest font-bold">
                      Active Design Engine
                    </span>
                    <h4 className="font-display text-sm font-extrabold text-white uppercase tracking-wider">
                      {activeAgent.name}
                    </h4>
                  </div>
                </div>
                <p className="text-white/50 text-[11px] font-light text-left leading-normal mb-6">
                  {activeAgent.description}
                </p>

                {/* Prompt Input Area */}
              <div className="space-y-4">
                <h3 className="font-display text-base font-bold text-white flex items-center justify-between uppercase tracking-wide">
                  <span className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-neon-purple" />
                    <span>2. Define Scenario Brief</span>
                  </span>
                </h3>

                <textarea
                  id="agent-scenario-input"
                  value={userPrompt}
                  onChange={(e) => setUserPrompt(e.target.value)}
                  placeholder={activeAgent.placeholder}
                  className="w-full h-32 bg-zinc-950 border border-white/10 rounded-xl p-4 text-xs text-white placeholder-white/25 focus:outline-none focus:border-neon-orange/40 transition-colors"
                />

                {/* Pre-filled Examples */}
                <div className="space-y-2">
                  <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                    Or choose a prompt template:
                  </span>
                  <div className="space-y-1.5">
                    {activeAgent.examples.map((ex, i) => (
                      <button
                        key={i}
                        id={`example-btn-${i}`}
                        onClick={() => handleSelectExample(ex)}
                        className="w-full text-left text-[11px] text-white/60 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/5 hover:border-neon-orange/10 transition-all font-light line-clamp-1 truncate block cursor-pointer"
                      >
                        {ex}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  id="execute-agent-btn"
                  onClick={handleExecuteAgent}
                  disabled={loading || !userPrompt.trim()}
                  className={`w-full mt-2 py-3.5 rounded-full font-extrabold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    loading || !userPrompt.trim()
                      ? "bg-zinc-900 text-white/30 border border-white/5 cursor-not-allowed"
                      : "bg-gradient-to-r from-neon-purple to-neon-orange text-white hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-neon-orange" />
                      <span>Synthesizing creative loop...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 text-white" />
                      <span>Execute Design Engine</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

          {/* Terminal / Output Column (Right) */}
          <div className="lg:col-span-7 h-full min-h-[500px]">
            <div className="bg-[#0a0a0a]/90 border border-white/10 rounded-2xl h-full flex flex-col overflow-hidden relative shadow-2xl">
              
              {/* Terminal Title Bar */}
              <div className="bg-zinc-950 px-4 py-3 border-b border-white/10 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80"></span>
                  </div>
                  <span className="text-white/40 ml-2">Console v2.0 // <span className="text-neon-orange font-bold font-mono uppercase">{agentType}</span></span>
                </div>
                <div className="flex items-center gap-1.5 text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-neon-orange animate-pulse"></span>
                  <span>STUDIO ONLINE</span>
                </div>
              </div>

              {/* Terminal Output */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {/* Default State */}
                  {!loading && !result && !error && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex-1 flex flex-col items-center justify-center text-center py-16 space-y-4"
                    >
                      <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-white/50">
                        <Terminal className="w-8 h-8 text-neon-orange animate-pulse" />
                      </div>
                      <div className="space-y-1.5 max-w-sm">
                        <span className="block font-display font-semibold text-white text-sm">Engine Console Standby</span>
                        <p className="text-[11px] font-mono text-white/40 leading-normal">
                          Choose a Visual Adda creative model, formulate or paste a brief on the left, and click 'Execute Design Engine' to watch the asset parameters render.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* Loading State */}
                  {loading && (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 flex-1 py-4 text-left"
                    >
                      {/* Animated thinking steps */}
                      <div className="space-y-3 font-mono text-xs text-white/50">
                        <div className="flex items-center gap-2 text-neon-orange font-bold">
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>[INITIALIZING] Accessing Visual Adda high-speed server...</span>
                        </div>
                        <div className="flex items-center gap-2 pl-5 text-white/40">
                          <CheckCircle2 className="w-3.5 h-3.5 text-neon-orange" />
                          <span>Parsing creative constraints &amp; styles guide...</span>
                        </div>
                        <div className="flex items-center gap-2 pl-5 text-white/40 animate-pulse">
                          <span className="w-1.5 h-1.5 rounded-full bg-neon-orange animate-ping"></span>
                          <span>Baking lighting and keyframe vectors on server...</span>
                        </div>
                        <div className="flex items-center gap-2 pl-5 text-white/30">
                          <span>Awaiting JSON assembly scheme payload...</span>
                        </div>
                      </div>

                      {/* Code terminal animation */}
                      <div className="bg-black border border-white/5 rounded-lg p-4 font-mono text-[10px] text-white/30 h-36 overflow-hidden relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90"></div>
                        <div className="space-y-1">
                          <p className="text-neon-orange font-semibold">~$ node visual_adda_render_farm.js</p>
                          <p className="text-neon-purple">{"[STUDIO] Activating Blender Cycles / Raytrace thread-7..."}</p>
                          <p>{"[SUCCESS] Loaded HDRI environment map - dusk_cityscape_p3.exr"}</p>
                          <p>{"[STUDIO] Calculating step-by-step vector pathing schemas..."}</p>
                          <p>{"[STUDIO] Prompt: " + userPrompt.slice(0, 80) + "..."}</p>
                          <p className="text-neon-yellow">{"[COMPILING] Spawning multi-frame render farm with Gemini..."}</p>
                          <p className="animate-pulse">{"[STUDIO] Finalizing artistic outputs..."}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Error State */}
                  {error && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-red-500/10 border border-red-500/20 p-5 rounded-xl font-mono text-xs text-red-400 flex items-start gap-3 text-left"
                    >
                      <HelpCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold block mb-1">Execution Aborted:</span>
                        <p>{error}</p>
                        <span className="block mt-4 text-[10px] text-white/30">Please ensure your Gemini API Key is entered via the Settings &gt; Secrets menu and retry.</span>
                      </div>
                    </motion.div>
                  )}

                  {/* Complete Results State */}
                  {result && (
                    <motion.div
                      key="result"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-6 flex-1 text-left"
                      id="agent-simulation-result"
                    >
                      {/* Thought Chain */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                          <Brain className="w-4 h-4 text-neon-orange" />
                          <span>Creative Assembly Process (Thinking Steps)</span>
                        </h4>
                        
                        <div className="space-y-2.5">
                          {result.thoughtChain.map((step, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.1 }}
                              className="bg-white/5 border border-white/5 rounded-xl p-3.5 flex items-start gap-3.5 hover:border-neon-orange/20 transition-colors"
                            >
                              <div className="w-5 h-5 rounded-full bg-neon-orange/10 border border-neon-orange/20 flex items-center justify-center text-[10px] font-mono text-neon-orange shrink-0 mt-0.5">
                                {idx + 1}
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-white font-display uppercase">{step.stage}</span>
                                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/50 border border-white/5">
                                    {step.actionTaken}
                                  </span>
                                </div>
                                <p className="text-[11px] font-mono text-white/60 leading-normal">
                                  {step.thought}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Final Resolved Answer */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                          <Lightbulb className="w-4 h-4 text-neon-yellow" />
                          <span>Synthesized Deliverable Brief</span>
                        </h4>
                        <div className="bg-black/90 border border-neon-orange/20 rounded-xl p-5 font-mono text-xs text-white/90 leading-relaxed shadow-inner relative overflow-hidden">
                          {/* Glowing corner overlay */}
                          <div className="absolute top-0 right-0 w-8 h-8 bg-neon-orange/5 blur-md rounded-full"></div>
                          <p className="whitespace-pre-line">{result.finalResponse}</p>
                        </div>
                      </div>

                      {/* Metadata Cards */}
                      <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
                        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                          <span className="block text-[9px] font-mono text-white/40 uppercase tracking-wider">Sim Latency</span>
                          <span className="block text-xs font-mono text-white font-semibold mt-0.5 flex items-center justify-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-neon-orange" />
                            <span>{result.executionMetadata.timeElapsedMs || 482} ms</span>
                          </span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                          <span className="block text-[9px] font-mono text-white/40 uppercase tracking-wider">Confidence</span>
                          <span className="block text-xs font-mono text-neon-yellow font-semibold mt-0.5 flex items-center justify-center gap-1">
                            <Gauge className="w-3.5 h-3.5 text-neon-yellow" />
                            <span>{result.executionMetadata.confidenceScorePercent || 99.1}%</span>
                          </span>
                        </div>
                        <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-center">
                          <span className="block text-[9px] font-mono text-white/40 uppercase tracking-wider">Status</span>
                          <span className="block text-xs font-mono text-neon-lime font-semibold mt-0.5 flex items-center justify-center gap-1 uppercase">
                            <CheckCircle2 className="w-3.5 h-3.5 text-neon-lime" />
                            <span>{result.executionMetadata.agentStatus || "SUCCESS"}</span>
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
        )}

      </div>
    </section>
  );
}
