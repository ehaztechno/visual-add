import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, Quote, ArrowUpRight, Github, Twitter, Linkedin, Users, Layers, ShieldCheck, HeartHandshake } from "lucide-react";
import VisualAddaLogo from "./VisualAddaLogo";

interface AboutAgencyProps {
  onNavigate?: (section: string) => void;
}

export default function AboutAgency({ onNavigate }: AboutAgencyProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic 3D Torus Helix inside HTML5 Canvas with Orange/Purple tones!
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let angleX = 0;
    let angleY = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight || 500;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const R = 110; // major radius
    const r = 38;  // minor radius
    const numRings = 70;
    const pointsPerRing = 14;

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      const projectedPoints: { x: number; y: number; z: number; color: string }[] = [];

      for (let i = 0; i < numRings; i++) {
        const theta = (i / numRings) * Math.PI * 2;
        for (let j = 0; j < pointsPerRing; j++) {
          const phi = (j / pointsPerRing) * Math.PI * 2;

          const px = (R + r * Math.cos(phi)) * Math.cos(theta);
          const py = (R + r * Math.cos(phi)) * Math.sin(theta);
          const pz = r * Math.sin(phi);

          // rotate Y
          let x1 = px * Math.cos(angleY) - pz * Math.sin(angleY);
          let z1 = px * Math.sin(angleY) + pz * Math.cos(angleY);

          // rotate X
          let y2 = py * Math.cos(angleX) - z1 * Math.sin(angleX);
          let z2 = py * Math.sin(angleX) + z1 * Math.cos(angleX);

          const fov = 400;
          const distance = 300;
          const scale = fov / (distance + z2);
          const projX = cx + x1 * scale;
          const projY = cy + y2 * scale;

          const opacity = Math.max(0.1, Math.min(1.0, (z2 + r) / (2 * r) + 0.2));
          // Purple to Orange gradient interpolation in HSL: Hue shift from 275 (purple) to 25 (orange) based on depth
          const hue = Math.round(275 - (z2 + r) / (2 * r) * 250); 
          const color = `hsla(${hue}, 85%, 65%, ${opacity * 0.35})`;

          projectedPoints.push({ x: projX, y: projY, z: z2, color });
        }
      }

      for (let i = 0; i < numRings; i++) {
        for (let j = 0; j < pointsPerRing; j++) {
          const currIdx = i * pointsPerRing + j;
          const nextRingIdx = ((i + 1) % numRings) * pointsPerRing + j;
          const nextPointIdx = i * pointsPerRing + ((j + 1) % pointsPerRing);

          const pCurr = projectedPoints[currIdx];
          const pNextRing = projectedPoints[nextRingIdx];
          const pNextPoint = projectedPoints[nextPointIdx];

          if (pCurr && pNextRing) {
            ctx.beginPath();
            ctx.strokeStyle = pCurr.color;
            ctx.moveTo(pCurr.x, pCurr.y);
            ctx.lineTo(pNextRing.x, pNextRing.y);
            ctx.stroke();
          }

          if (pCurr && pNextPoint) {
            ctx.beginPath();
            ctx.strokeStyle = pCurr.color;
            ctx.moveTo(pCurr.x, pCurr.y);
            ctx.lineTo(pNextPoint.x, pNextPoint.y);
            ctx.stroke();
          }
        }
      }

      angleX += 0.004;
      angleY += 0.006;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const team = [
    {
      name: "Aryan Dev",
      role: "Creative Director",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400",
      socials: { linkedin: "#", twitter: "#", github: "#" }
    },
    {
      name: "Tanya Sen",
      role: "3D Specialist & CGI Lead",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400",
      socials: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Rishi Raj",
      role: "Digital Video Producer",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400",
      socials: { linkedin: "#", github: "#" }
    },
    {
      name: "Karan Mehta",
      role: "Walkthrough Architect",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      socials: { linkedin: "#", twitter: "#" }
    },
    {
      name: "Sneha Kapur",
      role: "Interactive Tech Lead",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400",
      socials: { linkedin: "#", twitter: "#", github: "#" }
    }
  ];

  const valuePillars = [
    {
      title: "Real Estate Developers",
      description: "Present architectural projects through breathtaking photorealistic CGI walkthroughs and immersive layout animations."
    },
    {
      title: "Corporate Agencies",
      description: "Pitch ideas with custom event content, premium keynote decks, and high-energy scripted anthems."
    },
    {
      title: "Ad & Marketing Teams",
      description: "Fuel marketing with digital video production and bespoke graphics that tell a story with lasting impact."
    }
  ];

  const testimonials = [
    {
      quote: "Visual Adda brings true craftsmanship to the table. Their 3D spatial walkthroughs transformed how we present our upcoming commercial properties to key investors.",
      author: "Vikram Malhotra",
      role: "Managing Director",
      company: "Aero Realty Group",
    },
    {
      quote: "The motivational scripted AV they delivered for our corporate launch was stellar. It perfectly combined sound design with emotional visual montages.",
      author: "Meera Nair",
      role: "Head of Brand Communication",
      company: "Aventis Technologies",
    },
    {
      quote: "Unbelievable quality in their CGI and 3D modeling. Our product visuals look hyper-realistic, saving us hundreds of hours in live photo shoots.",
      author: "Siddharth Goel",
      role: "Product Design Chief",
      company: "Zenith Automotive",
    }
  ];

  const clientLogos = [
    { name: "REMAX", url: "#" },
    { name: "SOTHEBYS", url: "#" },
    { name: "GODREJ", url: "#" },
    { name: "DLF", url: "#" },
    { name: "ITC HOTELS", url: "#" },
  ];

  return (
    <section className="bg-transparent pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 space-y-32">
        
        {/* Intro Block "Who we are?" */}
        <div className="space-y-6 text-left max-w-4xl">
          <p className="text-xs font-mono text-neon-orange uppercase tracking-widest font-bold">Who we are?</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[0.9] uppercase">
            WE ARE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow">VISUAL ADDA</span>. CREATING EXPERIENCES. DELIVERING IMPACT.
          </h1>
          <p className="text-white/60 font-light text-lg leading-relaxed max-w-2xl pt-4">
            A premium full-service creative agency specializing in hyper-fidelity 3D CGI walkthroughs, motivational corporate AVs, high-end video production, and engaging digital installations.
          </p>
        </div>

        {/* 3D Helix & Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold">OUR DESIGN PHILOSOPHY</p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight uppercase">
              ONE STUDIO. <br />ENDLESS POSSIBILITIES.
            </h2>
            <p className="text-white/60 font-light text-base leading-relaxed">
              We operate at the intersection of cinematic storytelling and advanced computer graphics. Whether rendering complex architectural walkthroughs, producing high-impact corporate design decks, or formulating story-driven motivational films, our focus remains on unmatched clarity and aesthetic prestige.
            </p>
            <p className="text-white/60 font-light text-base leading-relaxed">
              Our multidisciplinary team helps startups, global enterprises, and real estate developers elevate their ideas with crisp, high-contrast, modern media assets that turn passive spectators into committed participants.
            </p>
          </div>

          <div className="lg:col-span-6 h-[400px] sm:h-[500px] relative order-1 lg:order-2 bg-gradient-to-tr from-white/[0.01] to-white/[0.03] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute top-4 left-4 text-[10px] font-mono text-white/30 uppercase tracking-widest">
              Visual Adda 3D Helix Simulation • Active
            </div>
            <canvas ref={canvasRef} className="w-full h-full block" />
          </div>
        </div>

        {/* Counters / Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-white/10">
          <div className="text-left space-y-2 p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-neon-orange/20 transition-all">
            <span className="block text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-display">10+</span>
            <span className="block text-[10px] font-mono text-neon-orange uppercase tracking-widest font-bold">Years of Creative Excellence</span>
            <p className="text-xs text-white/50 font-light mt-1">Leading high-profile multimedia productions and virtual campaigns globally.</p>
          </div>
          <div className="text-left space-y-2 p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-neon-orange/20 transition-all">
            <span className="block text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-display">400+</span>
            <span className="block text-[10px] font-mono text-neon-orange uppercase tracking-widest font-bold">Visual Projects Delivered</span>
            <p className="text-xs text-white/50 font-light mt-1">High-fidelity 3D assets, walkthrough rendering cycles, and broadcast-ready edits.</p>
          </div>
          <div className="text-left space-y-2 p-6 bg-white/[0.01] border border-white/5 rounded-2xl hover:border-neon-orange/20 transition-all">
            <span className="block text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 font-display">100%</span>
            <span className="block text-[10px] font-mono text-neon-orange uppercase tracking-widest font-bold">Client Impact Score</span>
            <p className="text-xs text-white/50 font-light mt-1">Consistently producing design solutions that elevate customer perception.</p>
          </div>
        </div>

        {/* Clients at a Glance */}
        <div className="space-y-8 py-12 border-t border-white/10 text-center">
          <div className="max-w-2xl mx-auto space-y-3">
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold">TRUSTED BY GLOBAL REAL ESTATE &amp; ENTERPRISE LEADER BRANDS</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display uppercase">
              PARTNERING WITH INDUSTRIES OF IMPACT.
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-0.5 bg-white/10 rounded-2xl overflow-hidden border border-white/10 mt-12">
            {clientLogos.map((logo, idx) => (
              <div
                key={idx}
                className="bg-[#050505] py-10 px-4 flex items-center justify-center group hover:bg-white/[0.02] transition-colors cursor-pointer"
              >
                <span className="text-lg font-bold tracking-widest text-white/20 group-hover:text-neon-orange transition-colors uppercase font-mono">
                  {logo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-12 text-left">
          <div className="space-y-3">
            <p className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold">CLIENT TESTIMONIALS</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              Stories of visual impact.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div
                key={idx}
                className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 space-y-6 flex flex-col justify-between hover:bg-white/[0.04] transition-all hover:-translate-y-1 duration-300"
              >
                <div className="space-y-4">
                  <Quote className="w-6 h-6 text-neon-orange" />
                  <p className="text-sm text-white/80 font-light leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-6 border-t border-white/5">
                  <h4 className="font-bold text-white text-sm">{t.author}</h4>
                  <p className="text-[11px] text-white/40 font-mono mt-0.5">
                    {t.role} • <span className="text-neon-orange font-bold">{t.company}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High-fidelity Team Grid */}
        <div className="space-y-12 text-left">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="space-y-3">
              <p className="text-xs font-mono text-white/40 uppercase tracking-widest font-bold">OUR CREATIVE ROSTER</p>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
                MEET THE EXPERTS.
              </h2>
            </div>
            <p className="text-white/50 text-sm font-light max-w-sm leading-relaxed">
              Our specialists blend cinema direction, 3D architecture walkthrough physics, and graphics production workflows to realize stunning results.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
            {team.map((t, idx) => (
              <div
                key={idx}
                className="group relative bg-[#0d0d0d] border border-white/5 hover:border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-zinc-900">
                  <img
                    src={t.image}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Subtle black gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
                <div className="p-4 space-y-1 text-left">
                  <h4 className="font-display font-bold text-sm text-white">{t.name}</h4>
                  <p className="text-[10px] font-mono text-white/40 uppercase tracking-wider">{t.role}</p>

                  <div className="flex items-center gap-2.5 pt-3 border-t border-white/5 mt-3 opacity-60 group-hover:opacity-100 transition-opacity">
                    <a href="#" className="text-white/60 hover:text-neon-orange transition-colors">
                      <Linkedin className="w-3.5 h-3.5" />
                    </a>
                    <a href="#" className="text-white/60 hover:text-neon-orange transition-colors">
                      <Twitter className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Startups & Creative value propositions */}
        <div className="space-y-12 text-left py-12 border-t border-white/10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-mono text-neon-orange uppercase tracking-widest font-bold">SOLUTIONS BY SECTOR</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              CREATIVE PIPELINES FOR YOUR DOMAIN.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valuePillars.map((p, idx) => (
              <div
                key={idx}
                className="p-8 bg-white/[0.01] border border-white/5 hover:border-white/10 rounded-2xl space-y-4 hover:bg-white/[0.02] transition-all duration-300"
              >
                <div className="w-8 h-8 rounded-lg bg-neon-orange/10 border border-neon-orange/20 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-neon-orange" />
                </div>
                <h3 className="font-display font-bold text-base text-white uppercase">{p.title}</h3>
                <p className="text-xs text-white/60 font-light leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Official Brand Identity Showcase */}
        <div className="space-y-12 text-left py-12 border-t border-white/10" id="brand-identity-system">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs font-mono text-neon-orange uppercase tracking-widest font-bold">OFFICIAL BRAND ASSETS</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white uppercase">
              OUR BRAND IDENTITY SYSTEM.
            </h2>
            <p className="text-white/50 text-sm font-light leading-relaxed">
              We operate under three carefully-vetted, high-fidelity brand logo variations designed to align perfectly with event media, light/dark themes, and various design contexts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Logo 1: Gradient */}
            <div className="p-8 bg-[#09090c] border border-white/5 rounded-2xl space-y-6 hover:border-white/15 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-6 bg-black/40 border border-white/5 rounded-xl flex items-center justify-center min-h-[140px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <VisualAddaLogo showText={true} variant="gradient" size={26} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">01 // Original Slate Gradient</h3>
                  <p className="text-[11px] text-white/50 font-mono mt-1 uppercase">Purple-Orange Gradient // Default Editorial Logo</p>
                </div>
              </div>
              <p className="text-xs text-white/40 font-light leading-relaxed pt-4 border-t border-white/5">
                Optimized for premium editorial content, structural print backdrops, and default website footers. Combines corporate composure with creative energy.
              </p>
            </div>

            {/* Logo 2: Solid Orange */}
            <div className="p-8 bg-[#0c0a09] border border-white/5 rounded-2xl space-y-6 hover:border-white/15 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-6 bg-black/40 border border-white/5 rounded-xl flex items-center justify-center min-h-[140px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <VisualAddaLogo showText={true} variant="solid" size={26} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">02 // Solid Coral Orange</h3>
                  <p className="text-[11px] text-white/50 font-mono mt-1 uppercase">Single-Color Solid // High-Contrast Utility</p>
                </div>
              </div>
              <p className="text-xs text-white/40 font-light leading-relaxed pt-4 border-t border-white/5">
                Our active flat utility logo. Ideal for watermark overlay signoffs, dark-mode overlays, chatbot profiles, and unified monochrome branding.
              </p>
            </div>

            {/* Logo 3: Vibrant */}
            <div className="p-8 bg-[#0b090c] border border-white/5 rounded-2xl space-y-6 hover:border-white/15 transition-all flex flex-col justify-between">
              <div className="space-y-4">
                <div className="p-6 bg-black/40 border border-white/5 rounded-xl flex items-center justify-center min-h-[140px] relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-fuchsia-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <VisualAddaLogo showText={true} variant="vibrant" size={26} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">03 // Vibrant Cosmic Glow</h3>
                  <p className="text-[11px] text-white/50 font-mono mt-1 uppercase">Neon Purple-Yellow Gradient // Active Digital</p>
                </div>
              </div>
              <p className="text-xs text-white/40 font-light leading-relaxed pt-4 border-t border-white/5">
                Specifically tailored for active digital navigation bars and high-contrast digital devices. Leverages electric purple and glowing yellow-orange.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action at bottom of about */}
        <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-orange/30 to-transparent" />
          <div className="max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white leading-tight tracking-tight uppercase">
              VISUAL ADDA IS A DIGITAL DESIGN STUDIO TURNING VAGUE IDEAS INTO <span className="text-neon-orange font-medium">REALISTIC EXPERIENCES</span>.
            </h2>
            <p className="text-sm text-white/40 font-mono uppercase tracking-wider">
              ONE STUDIO. ENDLESS POSSIBILITIES.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                if (onNavigate) {
                  onNavigate("contact");
                } else {
                  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }
              }}
              className="px-8 py-4 bg-white text-black font-extrabold uppercase text-xs tracking-widest rounded-full hover:bg-white/90 transition-all cursor-pointer shadow-xl shadow-white/5"
            >
              Contact Our Studio
            </button>
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <Users className="w-4 h-4 text-neon-orange" />
              <span>Team active and ready to brief</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
