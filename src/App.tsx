import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import AboutAgency from "./components/AboutAgency";
import ServicesBento from "./components/ServicesBento";
import RenderEstimator from "./components/RenderEstimator";
import TechnologyPage from "./components/TechnologyPage";
import CaseStudies from "./components/CaseStudies";
import PricingFaq from "./components/PricingFaq";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import GlobalSlinkyBackground from "./components/GlobalSlinkyBackground";
import ExitIntentModal from "./components/ExitIntentModal";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);

  // Monitor scroll height to trigger floating header once past top video
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handler for custom multi-page navigation
  const handleNavigate = (pageId: string) => {
    setCurrentPage(pageId);
    // Smoothly scroll to the very top of the new page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen text-slate-200 selection:bg-neon-purple/40 selection:text-white relative bg-transparent overflow-x-hidden font-sans">
      
      {/* Immersive Scroll-bound 3D Slinky Background Canvas with real-time morphing state */}
      <GlobalSlinkyBackground currentPage={currentPage} />

      {/* Premium Header with navigation actions and live EST clock */}
      <Header 
        onNavigate={handleNavigate} 
        currentPage={currentPage} 
        isVisible={true} 
      />

      {/* Main Pages with gorgeous fade-in-up animations */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="bg-transparent"
            >
              {/* Hero section */}
              <div id="hero-section">
                <Hero onNavigate={handleNavigate} />
              </div>

              {/* Bento Grid Specialties & Solutions */}
              <div id="services-section">
                <ServicesBento />
              </div>

              {/* Dynamic Production Render Calculator */}
              <div id="estimator-section" className="max-w-7xl mx-auto px-6 sm:px-12 py-16 relative z-10">
                <RenderEstimator />
              </div>

              {/* Case Studies Carousel */}
              <div id="cases-section">
                <CaseStudies />
              </div>

              {/* Pricing & FAQ retainers */}
              <div id="pricing-section">
                <PricingFaq />
              </div>
            </motion.div>
          )}

          {currentPage === "about" && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="bg-transparent"
            >
              <AboutAgency onNavigate={handleNavigate} />
            </motion.div>
          )}

          {currentPage === "technology" && (
            <motion.div
              key="technology"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="bg-transparent"
            >
              <TechnologyPage />
            </motion.div>
          )}

          {currentPage === "contact" && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="bg-transparent"
            >
              <ContactPage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Strategic Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Exit Intent Prompt */}
      <ExitIntentModal onNavigate={handleNavigate} />
    </div>
  );
}
