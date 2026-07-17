import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  PenTool, 
  Box, 
  Compass, 
  Presentation, 
  Video, 
  Mic, 
  MousePointer, 
  ArrowRight, 
  Sparkles, 
  Terminal, 
  Lock,
  X,
  Tv,
  Film,
  Layers,
  ArrowUpRight
} from "lucide-react";

export default function ServicesBento() {
  const [selectedService, setSelectedService] = useState<number | null>(null);

  // Exact 7 specialties extracted from the Visual Adda brand image!
  const services = [
    {
      id: 0,
      icon: PenTool,
      iconColor: "text-neon-purple",
      badge: "Animations & Graphics",
      title: "2D Animations & Graphics",
      subtitle: "Engaging visuals that communicate and captivate",
      description: "Custom digital illustrations, vector designs, storyboarded character sheets, explainer animation video elements, and stylized graphic templates crafted to captivate audiences and outline core product mechanics with artistic charm.",
      sampleImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      tech: ["After Effects", "Adobe Animate", "Lottie Files", "Illustrator"],
      flowchart: ["Narrative Scripting", "Storyboard Illustration", "Vector Asset Rigging", "Motion Keyframing", "Audio Sync & Delivery"]
    },
    {
      id: 1,
      icon: Box,
      iconColor: "text-neon-orange",
      badge: "CGI & 3D Rendering",
      title: "CGI & 3D Content",
      subtitle: "Realistic 3D visuals that create immersive experiences",
      description: "State-of-the-art 3D product renders, cinematic CGI assets, fluid/rigid body physics simulation, and photorealistic ambient textures. Built to establish immediate premium credibility and showcase complex mechanical or spatial designs.",
      sampleImage: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=800&q=80",
      tech: ["Blender", "Cinema 4D", "Unreal Engine 5", "Octane Render"],
      flowchart: ["3D Polygon Modeling", "PBR Texture Mapping", "Physics & Particle Bake", "Ray-traced Rendering", "Grade & Visual FX Sync"]
    },
    {
      id: 2,
      icon: Compass,
      iconColor: "text-neon-cyan",
      badge: "Spatial Flythrough",
      title: "Walkthroughs",
      subtitle: "Architectural & experiential walkthroughs that bring spaces to life",
      description: "Architectural flythrough renders and experiential virtual paths that allow viewers to travel through planned physical spaces, luxury real estate projects, and premium stage configurations with realistic daylight and perspective mapping.",
      sampleImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      tech: ["Lumion", "Twinmotion", "Unreal Engine 5", "V-Ray"],
      flowchart: ["CAD Structural Import", "PBR Materialization", "Lighting & Camera Rigging", "Path-bound Rendering", "Final Soundtrack Blend"]
    },
    {
      id: 3,
      icon: Presentation,
      iconColor: "text-neon-yellow",
      badge: "Creative Decking",
      title: "Event Content & Design Deck",
      subtitle: "Powerful presentations & event content that inspire and impress",
      description: "Ultra-premium slide structures, high-impact corporate pitch decks, mega LED stage backdrop loop videos, and widescreen projection assets designed to grab corporate attendee attention and establish high brand value.",
      sampleImage: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80",
      tech: ["After Effects", "Figma", "Resolume Arena", "Keynote Pro"],
      flowchart: ["Key Message Structuring", "Widescreen Grid Setup", "Visual Asset Injection", "Resolume Projection Test", "LED Slice Delivery"]
    },
    {
      id: 4,
      icon: Video,
      iconColor: "text-neon-pink",
      badge: "Production Studio",
      title: "Digital Video Production",
      subtitle: "High-quality videos that tell your story with impact",
      description: "End-to-end premium film editing, DaVinci color grading, crisp corporate storytelling, overlay title motion graphics, and audio master tracks designed to communicate your story with high conversions and maximum clarity.",
      sampleImage: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80",
      tech: ["DaVinci Resolve", "Premiere Pro", "After Effects", "Audition"],
      flowchart: ["Footage Culling", "A-Roll Assembly Line", "Color Balance Correction", "Sound FX Overlays", "High-Res H.265 Master Export"]
    },
    {
      id: 5,
      icon: Mic,
      iconColor: "text-neon-lime",
      badge: "Storytelling Films",
      title: "Motivational Scripted AV",
      subtitle: "Story-driven AVs that motivate, engage & drive change",
      description: "Deeply moving corporate anthems, campaign launch videos, and high-energy scripted brand films centered on three psychological anchors: Believe. Achieve. Inspire.",
      sampleImage: "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
      tech: ["Creative Copywriting", "Professional Voicecasting", "Premium Audio Mixing", "Climactic Montage Editing"],
      flowchart: ["Core Philosophy Mapping", "Voiceover Script Approval", "Tone-set Music Selection", "Footage Montage Layering", "Climax Assembly Render"]
    },
    {
      id: 6,
      icon: MousePointer,
      iconColor: "text-neon-indigo",
      badge: "Interactive Apps",
      title: "Digital Activities",
      subtitle: "Interactive digital experiences that engage and connect",
      description: "Bespoke touch-screen visualizers, interactive WebGL showcases, sensory augmented-reality social camera overlays, and customized immersive tools that turn passive viewers into active brand participants.",
      sampleImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tech: ["Three.js", "WebXR Platform", "Spark AR Filters", "React Three Fiber"],
      flowchart: ["Interface Wireframing", "Three.js Canvas Mount", "Physics & Interaction Bindings", "Multi-device Optimization", "Edge Deployment Output"]
    }
  ];

  return (
    <section id="services-section" className="py-24 bg-transparent relative overflow-hidden">
      {/* Background visual accents */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-80 h-80 rounded-full bg-neon-orange/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Header Block exactly in tone with Visual Adda flyer */}
        <div className="text-left max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-neon-orange" />
            <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-semibold">
              OUR SPECIALTIES &amp; DELIVERABLES
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
            ONE STUDIO, <br />
            <span className="bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow bg-clip-text text-transparent">
              ENDLESS POSSIBILITIES.
            </span>
          </h2>
          <p className="text-white/50 font-light text-sm sm:text-base max-w-2xl leading-relaxed">
            From hyper-detailed 3D walkthroughs and high-end video production to engaging 2D graphics and custom interactive installations, we match raw creative power with cutting-edge visual tech.
          </p>
        </div>

        {/* Bento Grid with premium cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="services-bento-grid">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            
            // Create a gorgeous grid layout rhythm by having some span larger or different styling
            const isFeatured = index === 0 || index === 4;

            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                layoutId={`service-card-${service.id}`}
                onClick={() => setSelectedService(index)}
                whileHover={{ y: -6, borderColor: "rgba(234, 88, 12, 0.4)" }}
                className={`group relative bg-[#0a0a0a]/90 border border-white/5 rounded-2xl p-6 sm:p-8 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-[0_15px_30px_rgba(234,88,12,0.05)] ${
                  isFeatured ? "md:col-span-2 lg:col-span-1 border-white/10" : ""
                }`}
              >
                {/* Visual Glow Gradient Accent */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-purple/5 via-transparent to-neon-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Card Heading Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-neon-orange/10 group-hover:border-neon-orange/30 transition-all">
                    <IconComponent className={`w-5 h-5 ${service.iconColor}`} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-[9px] font-mono text-white/50 tracking-wider uppercase border border-white/5">
                      {service.badge}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-neon-orange/20 transition-all">
                      <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>

                {/* Title & Copy */}
                <div className="space-y-2 mb-4 text-left">
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight uppercase group-hover:text-neon-orange transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                    {service.subtitle}
                  </p>
                </div>

                {/* Main sample imagery or mockup simulation preview */}
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border border-white/5 mb-4 bg-zinc-900">
                  <img
                    src={service.sampleImage}
                    alt={service.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Subtle color overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80 pointer-events-none"></div>
                </div>

                {/* Preview CTA */}
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-neon-orange group-hover:text-white font-bold uppercase tracking-widest transition-colors mt-auto">
                  <span>View Details &amp; Workflow</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Detail Modal with logical steps and tech lists */}
        <AnimatePresence>
          {selectedService !== null && (
            <div id="service-detail-modal-bg" className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 overflow-y-auto backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                id="service-detail-modal-content"
                className="bg-[#0c0c0c] border border-white/10 rounded-2xl w-full max-w-3xl p-6 sm:p-8 md:p-10 relative overflow-hidden my-8"
              >
                {/* Orange Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow"></div>

                {/* Close Button */}
                <button
                  id="close-service-modal"
                  onClick={() => setSelectedService(null)}
                  className="absolute top-6 right-6 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full border border-white/10 cursor-pointer transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Content Head */}
                <div className="flex items-start gap-4 mb-8 pb-6 border-b border-white/5 text-left">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10 text-white">
                    {React.createElement(services[selectedService].icon, {
                      className: `w-7 h-7 ${services[selectedService].iconColor}`
                    })}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-neon-orange uppercase tracking-widest block">
                      {services[selectedService].badge}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-1">
                      {services[selectedService].title}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
                  {/* Left Column: Descriptions and Technologies used */}
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-neon-orange" />
                        <span>Discipline Overview</span>
                      </h4>
                      <p className="text-white/70 font-light text-sm sm:text-base leading-relaxed">
                        {services[selectedService].description}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-semibold">
                        Core Industry Tech Stack
                      </h4>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {services[selectedService].tech.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs font-mono rounded-lg bg-white/5 border border-white/10 text-white"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Workflow logic mapping */}
                  <div className="md:col-span-5 space-y-5 bg-white/[0.02] p-5 rounded-xl border border-white/5 relative">
                    <h4 className="text-xs font-mono text-white/70 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-neon-orange" />
                      <span>Studio Workflow Steps</span>
                    </h4>
                    
                    <div className="space-y-4 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-white/10">
                      {services[selectedService].flowchart.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3 pl-6 relative">
                          <div className={`absolute left-1.5 top-1.5 w-3 h-3 rounded-full border bg-zinc-950 flex items-center justify-center ${idx === 0 ? "border-neon-orange" : "border-white/20"}`}>
                            {idx === 0 && <span className="w-1.5 h-1.5 rounded-full bg-neon-orange animate-pulse"></span>}
                          </div>
                          <div>
                            <span className="block text-[10px] font-mono text-white/30">Step 0{idx + 1}</span>
                            <span className="block text-xs font-semibold text-white/80">{step}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 text-[10px] font-mono text-white/30 flex items-center gap-1.5 justify-center border-t border-white/5">
                      <Lock className="w-3 h-3 text-neon-orange" />
                      <span>Studio Delivery Guarantee</span>
                    </div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <span className="text-[10px] font-mono text-white/30">
                    *Timeline depends on project assets and scale
                  </span>
                  <button
                    id="modal-cta-blueprint"
                    onClick={() => {
                      setSelectedService(null);
                      const el = document.getElementById("contact-section-id");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      } else {
                        // Or scroll to footer/contact link
                        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                      }
                    }}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-neon-purple to-neon-orange text-white font-extrabold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all cursor-pointer"
                  >
                    Discuss Visual Brief
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
