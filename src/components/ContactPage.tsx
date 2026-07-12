import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, Check, HeartHandshake } from "lucide-react";

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState("3D CGI Walkthrough");
  const [budget, setBudget] = useState("₹10 Lakhs - ₹25 Lakhs");
  const [timeline, setTimeline] = useState("Within a month");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    agree: true,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Auto-reset after a short while so they can try again
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        fullName: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        agree: true,
      });
    }, 4500);
  };

  const inquiryTypes = ["3D CGI Walkthrough", "2D Animation", "Corporate Film / AV", "Interactive WebGL", "General Brief"];
  const budgets = ["Under ₹4 Lakhs", "₹4 Lakhs - ₹10 Lakhs", "₹10 Lakhs - ₹25 Lakhs", "₹25 Lakhs+"];
  const timelines = ["Immediately", "Within a month", "1 - 3 months", "Flexible"];

  return (
    <section className="bg-transparent pt-32 pb-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10 space-y-20">
        
        {/* Page title and descriptive intro */}
        <div className="space-y-4 text-left max-w-3xl">
          <p className="text-xs font-mono text-neon-orange uppercase tracking-widest font-bold">Get In Touch</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[0.9] uppercase">
            LET'S COLLABORATE.
          </h1>
          <p className="text-white/60 font-light text-lg leading-relaxed pt-2">
            We are always excited to discuss new visual briefs, architectural layouts, or complex high-resolution projects. Let's create an extraordinary sensory experience.
          </p>
        </div>

        {/* Informational Columns Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-white/10 text-left">
          
          {/* Col 1: Studio Business */}
          <div className="space-y-4 p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-neon-orange/20 transition-all">
            <div className="w-8 h-8 rounded-lg bg-neon-orange/10 flex items-center justify-center border border-neon-orange/20">
              <Mail className="w-4 h-4 text-neon-orange" />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">Our Studio</h3>
            <div className="space-y-1.5 text-sm font-mono">
              <p className="text-neon-orange hover:underline">
                <a href="mailto:hello@visualadda.com">hello@visualadda.com</a>
              </p>
              <p className="text-white/50 font-light">
                <a href="tel:+12831234578">+1 (283) 123 45 78</a>
              </p>
            </div>
          </div>

          {/* Col 2: Studio Hub */}
          <div className="space-y-4 p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-neon-orange/20 transition-all text-left">
            <div className="w-8 h-8 rounded-lg bg-neon-yellow/10 flex items-center justify-center border border-neon-yellow/20">
              <MapPin className="w-4 h-4 text-neon-yellow" />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">Studio Hub</h3>
            <p className="text-sm text-white/60 font-light leading-relaxed">
              404 Cyber Hub, Sector 24,<br />
              Gurugram, HR 122002
            </p>
          </div>

          {/* Col 3: Stay Connected */}
          <div className="space-y-4 p-6 rounded-2xl bg-white/[0.01] border border-white/5 hover:border-neon-orange/20 transition-all">
            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
              <HeartHandshake className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-display font-bold text-base text-white uppercase tracking-wider">Stay Connected</h3>
            <div className="flex gap-4 items-center pt-1">
              <a href="#" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                LinkedIn
              </a>
              <a href="#" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                Instagram
              </a>
              <a href="#" className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-white/70 hover:text-white hover:bg-white/10 transition-colors">
                Vimeo
              </a>
            </div>
          </div>

        </div>

        {/* Elegant Form block "Write Us" */}
        <div className="bg-white/[0.01] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden text-left">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-neon-orange/20 to-transparent" />
          
          <div className="space-y-1">
            <p className="text-xs font-mono text-neon-orange uppercase tracking-widest font-bold">Write Us</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display uppercase">
              Submit Your Creative Brief
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="mt-12 space-y-10">
            {/* 1. Inquiry Type selection chips */}
            <div className="space-y-3">
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
                Which creative asset do you need?
              </label>
              <div className="flex flex-wrap gap-2.5">
                {inquiryTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setInquiryType(type)}
                    className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                      inquiryType === type
                        ? "bg-white text-black border-white font-semibold"
                        : "bg-white/5 text-white/60 border-white/10 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Budget Selection chips */}
            <div className="space-y-3">
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
                Target Production Budget
              </label>
              <div className="flex flex-wrap gap-2.5">
                {budgets.map((b) => (
                  <button
                    key={b}
                    type="button"
                    onClick={() => setBudget(b)}
                    className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                      budget === b
                        ? "bg-white text-black border-white font-semibold"
                        : "bg-white/5 text-white/60 border-white/10 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Timeline selection chips */}
            <div className="space-y-3">
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
                Target Timeline
              </label>
              <div className="flex flex-wrap gap-2.5">
                {timelines.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTimeline(t)}
                    className={`px-4 py-2 text-xs font-mono rounded-lg border transition-all cursor-pointer ${
                      timeline === t
                        ? "bg-white text-black border-white font-semibold"
                        : "bg-white/5 text-white/60 border-white/10 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Text Input Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-neon-orange/40 placeholder-white/20 transition-colors"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="e.g. rahul@properties.com"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-neon-orange/40 placeholder-white/20 transition-colors"
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
                  Company / Organization
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  placeholder="e.g. DLF Developers"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-neon-orange/40 placeholder-white/20 transition-colors"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-neon-orange/40 placeholder-white/20 transition-colors"
                />
              </div>
            </div>

            {/* 5. Message Textarea */}
            <div className="space-y-2">
              <label className="block text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
                Brief details of your visual requirements *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Describe what you want us to create, reference videos, aesthetic styles, etc..."
                className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-neon-orange/40 placeholder-white/20 transition-colors resize-none font-sans"
              />
            </div>

            {/* 6. Consent Checkbox */}
            <div className="flex items-start gap-3">
              <input
                id="contact-consent"
                type="checkbox"
                checked={formData.agree}
                onChange={(e) => handleInputChange("agree", e.target.checked)}
                className="mt-1 accent-neon-orange w-4 h-4 rounded border-white/10 bg-white/5 cursor-pointer"
              />
              <label htmlFor="contact-consent" className="text-xs text-white/50 leading-normal cursor-pointer select-none">
                I agree to the privacy statement and understand that our project materials and blueprints will be protected under strict corporate confidentiality (NDA).
              </label>
            </div>

            {/* Submit & Success */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
              <button
                type="submit"
                className="w-full sm:w-auto px-10 py-4.5 bg-white text-black font-extrabold uppercase text-[11px] tracking-widest rounded-full hover:bg-white/95 hover:shadow-2xl hover:shadow-white/5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Submit brief</span>
                <Send className="w-3.5 h-3.5 text-black" />
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    className="flex items-center gap-2.5 text-neon-orange text-xs font-mono font-bold"
                  >
                    <Check className="w-4 h-4 stroke-[3px]" />
                    <span>Brief received! Our Executive Creative Director will reach you in 2 hours.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>

      </div>
    </section>
  );
}
