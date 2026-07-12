import React, { useState, useEffect } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import VisualAddaLogo from "./VisualAddaLogo";

interface HeaderProps {
  onNavigate: (page: string) => void;
  currentPage: string;
  isVisible?: boolean;
}

export default function Header({ onNavigate, currentPage, isVisible = true }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [estTime, setEstTime] = useState("");

  // Live EST Clock matching video (0:03 - 0:12)
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      const formatter = new Intl.DateTimeFormat("en-US", options);
      setEstTime("EST " + formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "home", label: "HOME" },
    { id: "about", label: "ABOUT" },
    { id: "technology", label: "TECHNOLOGY" },
    { id: "contact", label: "CONTACT" },
  ];

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 w-full z-50 bg-[#050505]/70 backdrop-blur-md border-b border-white/5 py-3.5 sm:py-5 px-4 sm:px-6 md:px-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-6 pointer-events-none"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo block */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            <button
              id="logo-btn"
              onClick={() => onNavigate("home")}
              className="flex items-center gap-1.5 sm:gap-2.5 text-left group cursor-pointer"
            >
              <VisualAddaLogo size={22} className="sm:w-8 sm:h-8" />
              <span className="text-xs sm:text-xl font-bold tracking-tight text-white uppercase group-hover:text-neon-orange transition-colors whitespace-nowrap">
                VISUAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-neon-yellow">ADDA</span>
              </span>
            </button>

            {/* Menu Trigger Button */}
            <button
              id="header-menu-trigger"
              onClick={() => setMobileMenuOpen(true)}
              className="flex items-center gap-1 sm:gap-2 px-2 py-1 sm:px-3 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white text-[9px] sm:text-[10px] font-mono uppercase tracking-widest rounded-md cursor-pointer transition-colors"
            >
              <Menu className="w-3.5 h-3.5 text-neon-orange" />
              <span>Menu</span>
            </button>
          </div>

          {/* Clock centered exactly as in the video (0:03) */}
          <div className="hidden md:block text-xs font-mono text-white/40 tracking-[0.2em] uppercase">
            {estTime || "EST 12:02:47 AM"}
          </div>

          {/* Right Action: Get In Touch */}
          <div className="flex items-center">
            <button
              id="header-get-in-touch"
              onClick={() => onNavigate("contact")}
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 bg-white text-black text-[10px] sm:text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-white/90 transition-all cursor-pointer flex items-center gap-1.5 sm:gap-2 shadow-lg hover:shadow-white/5 whitespace-nowrap"
            >
              <span>Get In Touch</span>
              <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-black flex items-center justify-center">
                <ArrowRight className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-white" />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Side-Drawer Menu with Blur Backdrop and fade entries (0:09 - 0:19 in video) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 cursor-pointer"
            />

            {/* Side Menu Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 190 }}
              className="fixed top-0 left-0 h-full w-full max-w-sm bg-[#050505] border-r border-white/10 z-50 p-8 sm:p-12 flex flex-col justify-between shadow-2xl text-left"
            >
              <div className="space-y-12">
                {/* Close Button top section */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <VisualAddaLogo size={28} />
                    <span className="text-base font-bold tracking-tight uppercase text-white">VISUAL ADDA</span>
                  </div>

                  <button
                    id="menu-close-btn"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1.5 hover:bg-white/10 border border-white/10 rounded-lg text-white/60 hover:text-white transition-colors cursor-pointer text-xs uppercase font-mono tracking-wider flex items-center gap-1"
                  >
                    <X className="w-3.5 h-3.5" />
                    <span className="text-[10px]">Close</span>
                  </button>
                </div>

                {/* Vertical Pages Navigation Links with active highlight states */}
                <nav className="flex flex-col gap-5 text-left">
                  {navItems.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`drawer-nav-${item.id}`}
                        onClick={() => {
                          onNavigate(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`text-left py-1 text-3xl sm:text-4xl font-bold tracking-tight transition-all duration-300 cursor-pointer ${
                          isActive
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-neon-orange to-neon-yellow translate-x-2"
                            : "text-white/40 hover:text-white/80 hover:translate-x-1"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Details (0:17 in video) */}
              <div className="space-y-6 pt-8 border-t border-white/5">
                <div className="flex items-center gap-3 text-white/40 hover:text-white/80 transition-colors text-sm font-mono">
                  <span className="text-neon-orange font-bold font-mono">Call:</span>
                  <a href="tel:+12831234578" className="hover:underline">
                    +1 (283) 123 45 78
                  </a>
                </div>
                <div className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  Visual Adda • Turning Vision into Experiences
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
