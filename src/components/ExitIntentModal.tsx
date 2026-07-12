import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, ArrowRight, Flame, Mail, Send } from "lucide-react";

interface ExitIntentModalProps {
  onNavigate: (pageId: string) => void;
}

export default function ExitIntentModal({ onNavigate }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Prevent triggering if already shown in this session
    const hasBeenShown = sessionStorage.getItem("flick_exit_intent_shown");
    if (hasBeenShown === "true") return;

    let delayTimer: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when cursor leaves the window at the top (exit intent)
      if (e.clientY <= 20) {
        // Debounce slightly to ensure it's a deliberate action
        delayTimer = setTimeout(() => {
          setIsOpen(true);
          sessionStorage.setItem("flick_exit_intent_shown", "true");
        }, 150);
      }
    };

    const handleMouseLeaveDoc = () => {
      // Direct mouseleave on document window
      delayTimer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("flick_exit_intent_shown", "true");
      }, 150);
    };

    document.addEventListener("mouseleave", handleMouseLeaveDoc);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeaveDoc);
      window.removeEventListener("mouseout", handleMouseLeave);
      if (delayTimer) clearTimeout(delayTimer);
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleCTA = () => {
    setIsOpen(false);
    onNavigate("contact");
    
    // Smooth scroll to contact form if it exists
    setTimeout(() => {
      const el = document.getElementById("contact-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-xl cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-cosmic-dark p-8 sm:p-10 text-center border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.15)] z-10"
          >
            {/* Ambient Background Glow Effects */}
            <div className="absolute top-0 left-1/4 w-48 h-48 bg-neon-purple/10 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-neon-orange/10 rounded-full blur-[80px] pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modern Animated Icon Badge */}
            <div className="mx-auto w-14 h-14 rounded-2xl bg-gradient-to-tr from-neon-purple to-neon-orange p-[1px] mb-6 flex items-center justify-center">
              <div className="w-full h-full bg-cosmic-dark rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-neon-orange animate-pulse" />
              </div>
            </div>

            {/* Text Hierarchy */}
            <div className="space-y-3 mb-8">
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-neon-orange font-bold">
                Wait! Before You Leave
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white uppercase tracking-tight leading-tight">
                LET'S WORK <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow">
                  TOGETHER
                </span>
              </h3>
              <p className="text-white/60 text-sm max-w-sm mx-auto leading-relaxed">
                Have an extraordinary idea or an upcoming visual production? Let's turn your strategic brand goals into high-impact reality.
              </p>
            </div>

            {/* Actions Grid */}
            <div className="space-y-3 relative z-10">
              <button
                onClick={handleCTA}
                className="w-full py-4 px-6 bg-gradient-to-r from-neon-purple to-neon-orange hover:from-neon-purple/90 hover:to-neon-orange/90 text-white font-extrabold rounded-full flex items-center justify-center gap-2.5 transition-all cursor-pointer text-xs uppercase tracking-wider shadow-lg shadow-neon-orange/10 hover:shadow-neon-orange/25"
              >
                <span>Get a Free Strategic Proposal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleClose}
                className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all rounded-full text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                Maybe Next Time
              </button>
            </div>

            {/* Bottom mini Trust Badge */}
            <div className="mt-8 pt-6 border-t border-white/5 flex justify-center items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <div className="flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-neon-orange" />
                <span>Premium Quality</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-neon-purple" />
                <span>Quick Response</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
