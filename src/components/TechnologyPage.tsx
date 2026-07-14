import React from "react";
import { motion } from "motion/react";
import CinematicDirector from "./CinematicDirector";
import { 
  Cpu, 
  Layers, 
  Tv, 
  Sliders
} from "lucide-react";

export default function TechnologyPage() {
  const techStacks = [
    {
      id: "cgi",
      title: "Real-time Unreal Engine 5 & Path-Tracing",
      subtitle: "Cinematic lighting and geometry pipeline",
      icon: Layers,
      description: "We utilize Unreal Engine 5's Lumen global illumination and Nanite virtualized micropolygon geometry combined with state-of-the-art path-traced Octane Renderers to deliver photorealistic 4K walkthrough cycles.",
      benefits: ["Hyper-fidelity reflections", "Interactive daylight simulation", "Unlimited polygon budgets", "Zero noise path-tracing artifacts"],
      color: "from-neon-orange to-neon-yellow"
    },
    {
      id: "render-farm",
      title: "Distributed Multi-GPU Render Farm",
      subtitle: "High-density RTX & H100 computing power",
      icon: Cpu,
      description: "Our dedicated private render infrastructure scales rendering power dynamically. By clustering multi-GPU rendering nodes, we process extreme frame buffers, particle sims, and global volumes in minutes instead of days.",
      benefits: ["Over 25,000 CUDA cores online", "Dedicated SSD caching channels", "Redundant backup render nodes", "99.9% uptime pipeline SLA"],
      color: "from-neon-purple via-neon-pink to-neon-orange"
    },
    {
      id: "webgl",
      title: "WebGL & Interactive Spatial Configurators",
      subtitle: "Real-time architectural model engines",
      icon: Tv,
      description: "We build tailored Three.js, React Three Fiber, and WebGL web rigs. This allows prospective buyers to load entire 3D models on standard web browsers and phones, customize home layouts, paint colors, and walk around in real time.",
      benefits: ["Zero software installation needed", "Optimized mobile asset streaming", "Dynamic lighting customization", "Highly responsive layout toggles"],
      color: "from-neon-yellow via-emerald-400 to-neon-purple"
    },
    {
      id: "vfx",
      title: "Procedural VFX & Spatial Audio Design",
      subtitle: "Immersive sensory experiences",
      icon: Sliders,
      description: "Our production studio handles high-tempo particle dynamics, architectural fluid models, and audio synchronization. We design bespoke soundscapes with spatial directional audio cues for widescreen LED backdrop screens.",
      benefits: ["Foley & voiceover synchronization", "Resolume Arena multi-screen mapping", "Procedural weather dynamics", "Dolby Atmos surround engineering"],
      color: "from-blue-400 to-neon-purple"
    }
  ];

  return (
    <section className="bg-transparent pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 space-y-24">
        
        {/* Header Block */}
        <div className="space-y-6 text-left max-w-4xl">
          <p className="text-xs font-mono text-neon-orange uppercase tracking-widest font-bold">Production Infrastructure</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[0.9] uppercase">
            OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow">TECH STACK</span> &amp; CREATIVE PIPELINES.
          </h1>
          <p className="text-white/60 font-light text-lg leading-relaxed max-w-2xl pt-4">
            Visual Adda bridges advanced computing nodes, photorealistic graphics engines, and cinematic sound dynamics. Discover how we construct hyper-fidelity visuals that deliver real-world business impact.
          </p>
        </div>

        {/* Bento Grid of Tech Pipelines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {techStacks.map((tech, index) => {
            const IconComponent = tech.icon;
            return (
              <motion.div
                key={tech.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/[0.01] border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Decorative background aura */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-b from-white/[0.02] to-transparent rounded-bl-full pointer-events-none" />
                
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl">
                      <IconComponent className="w-8 h-8 text-neon-orange group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      Pipeline 0{index + 1}
                    </span>
                  </div>

                  <div className="space-y-2 text-left">
                    <p className="text-xs font-mono text-white/40 uppercase tracking-widest">{tech.subtitle}</p>
                    <h3 className="text-2xl font-bold tracking-tight text-white uppercase group-hover:text-neon-orange transition-colors">
                      {tech.title}
                    </h3>
                    <p className="text-white/60 text-sm font-light leading-relaxed pt-2">
                      {tech.description}
                    </p>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 mt-8">
                  <div className="grid grid-cols-2 gap-4 text-left">
                    {tech.benefits.map((benefit, bIdx) => (
                      <div key={bIdx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-neon-orange" />
                        <span className="text-xs text-white/70 font-mono">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* AI Storyboard Draft Assistant */}
        <CinematicDirector />

      </div>
    </section>
  );
}
