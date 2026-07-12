import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, 
  Settings, 
  HelpCircle, 
  Coins, 
  Briefcase, 
  Workflow, 
  Calendar, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  Cpu, 
  CheckCircle,
  AlertCircle,
  Video,
  Layers,
  Sparkle
} from "lucide-react";
import { ProposalInput, ProposalBlueprint } from "../types";

export default function ProposalWizard({ hideHeader = false }: { hideHeader?: boolean } = {}) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Intake State
  const [formData, setFormData] = useState<ProposalInput>({
    companyName: "",
    industry: "Real Estate & Property",
    bottlenecks: "",
    budget: "₹12 Lakhs - ₹28 Lakhs (Scale)",
    teamSize: "Growth (Full AV + CGI)"
  });

  // Generated Blueprint State
  const [blueprint, setBlueprint] = useState<ProposalBlueprint | null>(null);
  const [consultationBooked, setConsultationBooked] = useState(false);

  const handleInputChange = (field: keyof ProposalInput, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (step === 1 && !formData.companyName.trim()) return;
    if (step === 2 && !formData.bottlenecks.trim()) return;
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleGenerateBlueprint = async () => {
    setLoading(true);
    setError(null);
    setBlueprint(null);

    try {
      const response = await fetch("/api/proposal/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || data.details || "Failed to generate proposal");
      }

      setBlueprint(data.blueprint);
      setStep(4); // Advance to results screen
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to compile custom design proposal. Please confirm your server and API key configurations.");
    } finally {
      setLoading(false);
    }
  };

  const handleBookConsultation = () => {
    setConsultationBooked(true);
  };

  const handleReset = () => {
    setStep(1);
    setBlueprint(null);
    setConsultationBooked(false);
    setFormData({
      companyName: "",
      industry: "Real Estate & Property",
      bottlenecks: "",
      budget: "₹12 Lakhs - ₹28 Lakhs (Scale)",
      teamSize: "Growth (Full AV + CGI)"
    });
  };

  const industries = [
    "Real Estate & Property",
    "Corporate & Tech Enterprises",
    "Advertising & Marketing Agency",
    "Hospitality & Luxury Hotels",
    "Automotive & Industrial",
    "Events, Concerts & Stadiums",
    "E-Commerce & Fashion"
  ];

  const budgets = [
    "₹4 Lakhs - ₹12 Lakhs (Standard AV/Graphics)",
    "₹12 Lakhs - ₹28 Lakhs (Interactive Web + Walkthrough)",
    "₹28 Lakhs - ₹60 Lakhs (Full Suite Studio Deliverables)",
    "₹60 Lakhs+ (Bespoke Continuous Branding Partner)"
  ];

  const projectScopes = [
    "Pilot (Single Video or CGI Asset)",
    "Growth (Full AV + CGI Walkthroughs)",
    "Enterprise (Multi-channel Campaigns)",
    "Bespoke (Immersive WebGL & Continuous Renders)"
  ];

  return (
    <section id="blueprint" className={hideHeader ? "w-full text-left relative" : "py-24 bg-transparent relative overflow-hidden"}>
      {!hideHeader && (
        <>
          {/* Decorative Blur Backgrounds */}
          <div className="absolute top-1/3 left-1/10 w-96 h-96 rounded-full bg-neon-purple/5 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/10 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl animate-pulse-glow" />
        </>
      )}

      <div className={hideHeader ? "w-full" : "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"}>
        
        {/* Header Block */}
        {!hideHeader && (
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-neon-orange" />
              <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-semibold font-mono">
                Bespoke Media Briefing Tool
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
              FORMULATE YOUR <span className="bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow bg-clip-text text-transparent">CREATIVE BLUEPRINT</span>
            </h2>
            <p className="text-white/50 font-light text-sm sm:text-base max-w-2xl mx-auto">
              Input a few details about your project needs. Our dynamic director engine powered by Gemini generates a tailored visual production proposal, roadmap, and pricing framework.
            </p>
          </div>
        )}

        {/* Wizard Main Container */}
        <div className="max-w-4xl mx-auto bg-[#0a0a0a]/90 border border-white/10 rounded-3xl backdrop-blur-md overflow-hidden shadow-2xl relative">
          
          {/* Progress Bar */}
          {step <= 3 && (
            <div className="h-1.5 w-full bg-white/5 flex">
              <div 
                className="h-full bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          )}

          {/* Form Step 1: Project Demographics */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-10 md:p-12 space-y-8"
              >
                <div className="space-y-2 text-left">
                  <span className="text-xs font-mono text-neon-orange uppercase tracking-widest font-semibold">
                    Step 01 / 03
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                    Project Profile
                  </h3>
                  <p className="text-white/50 font-light text-xs sm:text-sm">
                    Tell us about your brand or development project so we can custom-align our camera frameworks and rendering resolutions.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                  {/* Company Name */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider font-semibold">
                      Company / Project Name *
                    </label>
                    <input
                      id="company-name-input"
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                      placeholder="E.g., Grand Solitaire Luxury Towers"
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-neon-orange/40 transition-colors"
                    />
                  </div>

                  {/* Industry Select */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider font-semibold">
                      Business Domain / Sector
                    </label>
                    <select
                      id="industry-select"
                      value={formData.industry}
                      onChange={(e) => handleInputChange("industry", e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-orange/40 transition-colors cursor-pointer"
                    >
                      {industries.map(ind => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>

                  {/* Project Scope Select */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider font-semibold">
                      Target Project Scope
                    </label>
                    <select
                      id="team-size-select"
                      value={formData.teamSize}
                      onChange={(e) => handleInputChange("teamSize", e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-orange/40 transition-colors cursor-pointer"
                    >
                      {projectScopes.map(sz => (
                        <option key={sz} value={sz}>{sz}</option>
                      ))}
                    </select>
                  </div>

                  {/* Budget Selector */}
                  <div className="space-y-2">
                    <label className="block text-xs font-mono text-white/40 uppercase tracking-wider font-semibold">
                      Target Investment Budget
                    </label>
                    <select
                      id="budget-select"
                      value={formData.budget}
                      onChange={(e) => handleInputChange("budget", e.target.value)}
                      className="w-full bg-zinc-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-neon-orange/40 transition-colors cursor-pointer"
                    >
                      {budgets.map(bg => (
                        <option key={bg} value={bg}>{bg}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex justify-end">
                  <button
                    id="step1-next-btn"
                    onClick={nextStep}
                    disabled={!formData.companyName.trim()}
                    className={`px-8 py-3.5 rounded-full font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all ${
                      !formData.companyName.trim()
                        ? "bg-zinc-900 text-white/30 border border-white/5 cursor-not-allowed"
                        : "bg-gradient-to-r from-neon-purple to-neon-orange text-white hover:shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                    }`}
                  >
                    <span>Proceed to Requirements</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Form Step 2: Define Requirements */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-10 md:p-12 space-y-8"
              >
                <div className="space-y-2 text-left">
                  <span className="text-xs font-mono text-neon-orange uppercase tracking-widest font-semibold">
                    Step 02 / 03
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                    Creative Brief &amp; Assets Drag
                  </h3>
                  <p className="text-white/50 font-light text-xs sm:text-sm">
                    Describe what you are trying to produce. Detail any specific visual styles, references, emotional tone, or specific walkthrough layouts you require.
                  </p>
                </div>

                <div className="space-y-4 text-left">
                  <label className="block text-xs font-mono text-white/40 uppercase tracking-wider font-semibold">
                    Detail Your Brief *
                  </label>
                  <textarea
                    id="bottlenecks-textarea"
                    value={formData.bottlenecks}
                    onChange={(e) => handleInputChange("bottlenecks", e.target.value)}
                    placeholder="E.g., We are launching a premium residential township. We need a 3-minute ultra-realistic 3D walkthrough showcasing the grand entrance lobby, infinity pool deck, and duplex apartment layout. The vibe should be ultra-luxury during sunset with soothing emotional background music."
                    className="w-full h-44 bg-zinc-950 border border-white/10 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-white/20 focus:outline-none focus:border-neon-orange/40 transition-colors font-sans"
                  />
                  <div className="flex gap-2">
                    <span className="text-[10px] text-white/40 font-mono font-semibold">Recommendation:</span>
                    <span className="text-[10px] text-neon-orange font-mono hover:underline cursor-pointer" onClick={() => handleInputChange("bottlenecks", "We are a boutique hotel brand. We need a 60-second high-tempo promotional reel with warm lighting, pairing deep drone walkthroughs with cozy indoor shots. Highlight our local cuisine and visual heritage.")}>
                      Auto-fill boutique hotel promo reel brief
                    </span>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <button
                    id="step2-prev-btn"
                    onClick={prevStep}
                    className="px-6 py-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all font-bold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    id="step2-next-btn"
                    onClick={!formData.bottlenecks.trim() ? undefined : nextStep}
                    disabled={!formData.bottlenecks.trim()}
                    className={`px-8 py-3.5 rounded-full font-extrabold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer transition-all ${
                      !formData.bottlenecks.trim()
                        ? "bg-zinc-900 text-white/30 border border-white/5 cursor-not-allowed"
                        : "bg-gradient-to-r from-neon-purple to-neon-orange text-white hover:shadow-[0_0_15px_rgba(234,88,12,0.3)]"
                    }`}
                  >
                    <span>Proceed to Summary</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Form Step 3: Synthesis Review */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-10 md:p-12 space-y-8"
              >
                <div className="space-y-2 text-left">
                  <span className="text-xs font-mono text-neon-orange uppercase tracking-widest font-semibold">
                    Step 03 / 03
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white uppercase tracking-tight">
                    Synthesize Creative Blueprint
                  </h3>
                  <p className="text-white/50 font-light text-xs sm:text-sm">
                    Review your brief details. Clicking synthesize will direct our Gemini model to formulate a structured creative media pipeline blueprint specifically for {formData.companyName}.
                  </p>
                </div>

                {/* Parameters Preview Card */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 text-xs font-mono text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/5">
                    <div>
                      <span className="text-white/40 block font-semibold uppercase">Project Name</span>
                      <span className="text-white font-bold block mt-0.5">{formData.companyName}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block font-semibold uppercase">Operating Sector</span>
                      <span className="text-neon-orange font-bold block mt-0.5">{formData.industry}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-white/5">
                    <div>
                      <span className="text-white/40 block font-semibold uppercase">Target Scale</span>
                      <span className="text-white block mt-0.5">{formData.teamSize}</span>
                    </div>
                    <div>
                      <span className="text-white/40 block font-semibold uppercase">Proposed Budget</span>
                      <span className="text-neon-purple block mt-0.5">{formData.budget}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-white/40 block font-semibold uppercase">Creative Requirements &amp; Brief</span>
                    <p className="text-white/80 block mt-1 font-light leading-relaxed whitespace-pre-line font-sans">{formData.bottlenecks}</p>
                  </div>
                </div>

                {/* Loading / Error alerts */}
                {loading && (
                  <div className="bg-neon-orange/5 border border-neon-orange/10 rounded-xl p-4 flex items-center gap-3 text-left">
                    <RefreshCw className="w-5 h-5 text-neon-orange animate-spin shrink-0" />
                    <span className="text-xs font-mono text-white/70">
                      Visual Adda engine modeling your custom camera rigs, story boards, and render estimates... (Approx. 5-10s)
                    </span>
                  </div>
                )}

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl flex items-start gap-3 text-left">
                    <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-red-400">Synthesis Failed:</span>
                      <p className="text-[11px] font-mono text-red-300 mt-1 leading-normal">{error}</p>
                    </div>
                  </div>
                )}

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <button
                    id="step3-prev-btn"
                    onClick={prevStep}
                    disabled={loading}
                    className="px-6 py-3 rounded-full border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all font-bold text-xs tracking-wider uppercase flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    id="step3-generate-btn"
                    onClick={handleGenerateBlueprint}
                    disabled={loading}
                    className="px-8 py-3.5 rounded-full bg-gradient-to-r from-neon-purple to-neon-orange text-white font-extrabold text-xs tracking-widest uppercase flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin text-neon-orange" />
                        <span>Compiling Roadmap...</span>
                      </>
                    ) : (
                      <>
                        <Layers className="w-4 h-4 text-white" />
                        <span>Synthesize Visual Proposal</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Results Screen */}
            {step === 4 && blueprint && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 sm:p-10 md:p-12 space-y-10 text-left"
                id="proposal-blueprint-results"
              >
                
                {/* Header Metadata */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-white/10">
                  <div>
                    <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-bold block">
                      VISUAL BLUEPRINT SCHEMATIC // GENERATED SUCCESSFULLY
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1 uppercase">
                      {formData.companyName} Campaign
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      id="reset-blueprint-btn"
                      onClick={handleReset}
                      className="px-4 py-2 text-xs font-mono text-white/50 hover:text-white bg-white/5 rounded-lg border border-white/5 cursor-pointer"
                    >
                      New Blueprint
                    </button>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-neon-orange/10 border border-neon-orange/20 text-neon-orange font-bold">
                      ADDA-V2.0
                    </span>
                  </div>
                </div>

                {/* 1. Executive Summary */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-neon-orange" />
                    <span>I. EXECUTIVE BRIEF OPPORTUNITY AUDIT</span>
                  </h4>
                  <p className="text-white/80 font-light text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-white/[0.01] p-5 rounded-2xl border border-white/5 font-sans">
                    {blueprint.executiveSummary}
                  </p>
                </div>

                {/* 2. Projected Financial ROI metrics */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-neon-yellow" />
                    <span>II. ESTIMATED PRODUCTION &amp; ENGAGEMENT SAVINGS</span>
                  </h4>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center hover:border-neon-purple/30 transition-all relative overflow-hidden group">
                      <span className="block text-[9px] font-mono text-white/40 uppercase tracking-wider font-semibold">Value Reclaimed</span>
                      <span className="block font-display text-xl sm:text-2xl font-extrabold text-neon-orange mt-1">
                        ₹{blueprint.projectedROI.annualSavingsUSD.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[9px] font-mono text-white/30 mt-1 block">In-house production value</span>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center hover:border-neon-orange/30 transition-all relative overflow-hidden group">
                      <span className="block text-[9px] font-mono text-white/40 uppercase tracking-wider font-semibold">Production Hours Saved</span>
                      <span className="block font-display text-xl sm:text-2xl font-extrabold text-neon-purple mt-1">
                        {blueprint.projectedROI.hoursReclaimedWeekly} Hours
                      </span>
                      <span className="text-[9px] font-mono text-white/30 mt-1 block">Rendering cycles saved</span>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center hover:border-neon-yellow/30 transition-all relative overflow-hidden group">
                      <span className="block text-[9px] font-mono text-white/40 uppercase tracking-wider font-semibold">Engagement Gain</span>
                      <span className="block font-display text-xl sm:text-2xl font-extrabold text-neon-yellow mt-1">
                        +{blueprint.projectedROI.efficiencyGainPercent}%
                      </span>
                      <span className="text-[9px] font-mono text-white/30 mt-1 block">Estimated CTR / Attention</span>
                    </div>

                    <div className="bg-white/5 border border-white/5 p-4 rounded-xl text-center hover:border-neon-orange/30 transition-all relative overflow-hidden group">
                      <span className="block text-[9px] font-mono text-white/40 uppercase tracking-wider font-semibold">Production Duration</span>
                      <span className="block font-display text-xl sm:text-2xl font-extrabold text-white mt-1">
                        {blueprint.projectedROI.paybackPeriodMonths} Weeks
                      </span>
                      <span className="text-[9px] font-mono text-white/30 mt-1 block">Estimated delivery</span>
                    </div>
                  </div>
                </div>

                {/* 3. Proposed Creative Workflows */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Workflow className="w-4 h-4 text-neon-orange" />
                    <span>III. PROPOSED VISUAL SOLUTIONS &amp; ASSETS</span>
                  </h4>

                  <div className="space-y-4 font-sans">
                    {blueprint.architecturalWorkflows.map((flow, index) => (
                      <div 
                        key={index} 
                        id={`proposal-workflow-${index}`}
                        className="bg-white/[0.01] border border-white/5 rounded-2xl p-5 sm:p-6 hover:border-white/10 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-3 border-b border-white/5">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded bg-neon-orange/10 border border-neon-orange/20 text-[10px] font-mono text-neon-orange flex items-center justify-center font-bold">
                              0{index + 1}
                            </span>
                            <h5 className="font-display font-bold text-base text-white uppercase">{flow.title}</h5>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-950 border border-white/5 text-white/40">
                              Priority: <span className="text-neon-orange font-bold">{flow.impactLevel}</span>
                            </span>
                          </div>
                        </div>

                        <p className="text-white/60 font-light text-xs sm:text-sm leading-relaxed mb-4">
                          {flow.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2 text-left">
                          {/* Left: Logic Steps */}
                          <div className="md:col-span-7 space-y-2.5">
                            <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                              Logical Production Stages:
                            </span>
                            <div className="space-y-1.5 font-mono text-xs text-white/70">
                              {flow.stepByStepFlow.map((step, idx) => (
                                <div key={idx} className="flex items-start gap-2.5">
                                  <span className="text-neon-orange font-bold">↳</span>
                                  <span>{step}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Right: Stack */}
                          <div className="md:col-span-5 space-y-2">
                            <span className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-semibold">
                              Creative Engine Rigs:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {flow.techStack.map((tech, idx) => (
                                <span 
                                  key={idx} 
                                  className="px-2.5 py-0.5 rounded bg-zinc-950 text-[10px] font-mono text-neon-orange border border-white/5 font-semibold"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Implementation Phases */}
                <div className="space-y-4 font-sans">
                  <h4 className="text-xs font-mono text-white/50 uppercase tracking-widest font-semibold flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-neon-orange" />
                    <span>IV. PHASED PRODUCTION TIMELINE ROADMAP</span>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {blueprint.implementationPhases.map((phase, idx) => (
                      <div 
                        key={idx} 
                        className="bg-[#0a0a0a]/50 border border-white/10 p-5 rounded-2xl relative"
                      >
                        <div className="absolute top-0 right-5 transform -translate-y-1/2 px-3 py-0.5 rounded-full bg-zinc-950 border border-white/10 text-[9px] font-mono text-neon-orange font-bold uppercase tracking-wider">
                          Weeks 1-{phase.durationWeeks}
                        </div>
                        <span className="block text-[10px] font-mono text-white/30 uppercase tracking-widest">
                          Phase 0{phase.phaseNumber}
                        </span>
                        <h5 className="font-display font-bold text-sm text-white mt-1 mb-3 uppercase">
                          {phase.title}
                        </h5>
                        <ul className="space-y-2 text-[11px] font-light text-white/50">
                          {phase.deliverables.map((del, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-neon-orange mt-1.5 shrink-0"></span>
                              <span>{del}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Advisory Advice */}
                <div className="bg-neon-orange/5 border border-neon-orange/10 p-5 rounded-2xl space-y-2 font-sans">
                  <h5 className="font-display font-bold text-sm text-neon-orange flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-neon-orange" />
                    <span>V. CREATIVE READINESS &amp; BINDING ADVISORY</span>
                  </h5>
                  <p className="text-white/70 font-light text-xs sm:text-sm leading-relaxed">
                    {blueprint.concludingAdvice}
                  </p>
                </div>

                {/* Booking Consultation Card */}
                <div className="p-6 sm:p-8 bg-gradient-to-tr from-neon-orange/10 via-neon-purple/5 to-transparent rounded-2xl border border-neon-orange/30 flex flex-col md:flex-row items-center justify-between gap-6 font-sans">
                  <div className="space-y-2 text-center md:text-left">
                    <h5 className="font-display font-extrabold text-lg text-white uppercase">
                      Pitch Briefing Consultation
                    </h5>
                    <p className="text-xs text-white/50 font-light max-w-lg">
                      Schedule a 1-on-1 briefing call with our Executive Creative Producer to finalize render resolutions, pricing models, and video storyboards.
                    </p>
                  </div>

                  <div className="shrink-0 w-full md:w-auto">
                    {consultationBooked ? (
                      <div className="flex items-center gap-2 bg-neon-lime/10 border border-neon-lime/20 px-6 py-3 rounded-xl text-xs font-mono text-neon-lime font-bold">
                        <CheckCircle className="w-4 h-4 text-neon-lime" />
                        <span>Pitch Call Reserved!</span>
                      </div>
                    ) : (
                      <button
                        id="book-briefing-btn"
                        onClick={handleBookConsultation}
                        className="w-full md:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-neon-purple to-neon-orange text-white font-extrabold text-xs tracking-wider uppercase hover:shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <span>Schedule Pitch Meeting</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
}
