import React from "react";
import { ArrowUp, ShieldCheck, Github, Twitter, Linkedin, Video } from "lucide-react";
import VisualAddaLogo from "./VisualAddaLogo";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const menuItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "technology", label: "TECHNOLOGY" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-white/10 pt-20 pb-12 relative overflow-hidden text-left">
      {/* Subtle bottom glows */}
      <div className="absolute bottom-0 left-1/3 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Logo & Branding */}
          <div className="md:col-span-5 space-y-6">
            <button
              id="footer-logo-btn"
              onClick={() => {
                onNavigate("home");
                scrollToTop();
              }}
              className="flex items-center gap-3.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 flex items-center justify-center shrink-0">
                <VisualAddaLogo className="w-full h-full text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-widest uppercase text-white font-sans">
                VISUAL ADDA
              </span>
            </button>
            <p className="text-sm text-white/50 font-light leading-relaxed max-w-sm font-sans">
              We help real estate builders, creative agencies, and global enterprises turn ideas into immersive experiences. Specializing in photorealistic 3D CGI walkthroughs, event graphics, and scripted media productions.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-4 text-xs font-mono">
            <h4 className="text-white/40 uppercase tracking-widest font-bold text-[10px]">
              Menu Pages
            </h4>
            <ul className="space-y-3 text-white/60">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    id={`footer-link-${item.id}`}
                    onClick={() => {
                      onNavigate(item.id);
                      scrollToTop();
                    }}
                    className="hover:text-neon-orange transition-colors cursor-pointer text-left uppercase"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Newsletter */}
          <div className="md:col-span-4 space-y-4 text-xs font-sans">
            <h4 className="text-white/40 uppercase tracking-widest font-bold text-[10px] font-mono">
              Newsletter Subscription
            </h4>
            <p className="text-white/60 font-light text-sm">
              Receive updates on our latest renders, 3D techniques, and storyboard insights twice a month.
            </p>
            <div className="flex gap-2 max-w-md">
              <input
                type="email"
                placeholder="producer@company.com"
                className="flex-grow bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-neon-orange/40 transition-colors font-sans"
              />
              <button className="px-6 py-3 bg-white text-black font-extrabold uppercase text-[10px] tracking-widest rounded-xl hover:bg-white/90 transition-all cursor-pointer font-sans shrink-0">
                Subscribe
              </button>
            </div>
            <p className="text-[10px] text-white/30 font-light font-mono">
              Fully secure data policy. Zero spam.
            </p>
          </div>

        </div>

        {/* Bottom indicators */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 font-mono">
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-start font-semibold">
            <span>VISUAL ADDA ©2026</span>
            <span>|</span>
            <span className="flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-neon-orange" />
              <span>Full-scale creative studio production</span>
            </span>
          </div>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-neon-orange transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-neon-orange transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-neon-orange transition-colors font-semibold uppercase text-[10px] tracking-wider">
                Vimeo
              </a>
            </div>
            <button
              id="back-to-top-btn"
              onClick={scrollToTop}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-lg border border-white/10 text-white/60 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
