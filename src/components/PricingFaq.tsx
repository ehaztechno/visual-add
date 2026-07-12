import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Check, 
  HelpCircle, 
  Sparkles, 
  HelpCircle as QuestionIcon, 
  ChevronDown, 
  ChevronUp, 
  Zap, 
  ShieldCheck, 
  Lock,
  Coins,
  Video
} from "lucide-react";

export default function PricingFaq() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("annual");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const tiers = [
    {
      name: "Standard Reel & AV Plan",
      price: billingPeriod === "annual" ? 99000 : 125000,
      period: "project",
      badge: "Standard",
      description: "Perfect for high-tempo social campaigns, single real estate trailers, or corporate visual pitches.",
      features: [
        "1 custom promotional video (up to 60s)",
        "Fully custom cinematic transitions & color grading",
        "Royalty-free premium background scoring",
        "Up to 2 full creative revision cycles",
        "Average delivery: 7 - 10 business days"
      ],
      cta: "Initiate Video Brief",
      highlight: false
    },
    {
      name: "Interactive Walkthrough Suite",
      price: billingPeriod === "annual" ? 225000 : 280000,
      period: "project",
      badge: "Most Prescribed",
      description: "Photorealistic 3D CGI architectural animations and browser-native virtual spatial walk-rounds.",
      features: [
        "1 detailed 3D CGI walkthrough (up to 3 mins)",
        "Premium path-traced Octane lighting rigs",
        "Daytime, twilight, and nighttime environment toggles",
        "High-fidelity voiceover & custom scriptwriting",
        "1 interactive WebGL space layout viewer",
        "Average delivery: 14 - 21 business days"
      ],
      cta: "Launch CGI Project",
      highlight: true
    },
    {
      name: "Studio Retainer Partner",
      price: billingPeriod === "annual" ? 510000 : 640000,
      period: "month",
      badge: "Unlimited Studio",
      description: "Your dedicated professional visual effects, 3D architecture, and cinematography department on tap.",
      features: [
        "Unlimited active CGI walkthroughs & video assets",
        "Continuous render-farm cycles allocation",
        "Live-event immersive graphic overlays & stage backdrops",
        "Direct master storyboard integration consulting",
        "Bespoke interactive WebXR & WebGL developments",
        "24/7 priority access hot-line to Creative Director"
      ],
      cta: "Become Studio Partner",
      highlight: false
    }
  ];

  const faqs = [
    {
      q: "Who owns the intellectual property and master render files?",
      a: "You do. Upon project completion and final invoice settlement, full worldwide intellectual property rights, 4K final exports, and raw resource files are completely transferred to your organization with zero ongoing royalty liabilities."
    },
    {
      q: "What inputs do you need to start a 3D CGI Walkthrough?",
      a: "To begin, we typically require architectural drawings (CAD/PDF formats), interior design layouts, reference material specifications, and any mood boards you have. If those don't exist, our designers can map them out for you."
    },
    {
      q: "Can we request custom music and professional voiceovers?",
      a: "Yes! Every standard walkthrough and AV plan includes full licensing for premium royalty-free music. We also partner with premium voiceover talent across multiple languages to match your brand's specific narrative tone."
    },
    {
      q: "What is your revision process like?",
      a: "We work in structured milestones: Draft Storyboard, Gray-box 3D layout, Clay-render lighting preview, and Final Render. At each stage, your team reviews and provides feedback, ensuring there are no surprises in the final delivery."
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-transparent relative overflow-hidden">
      {/* Absolute Ambient Glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-neon-orange/5 blur-3xl" />
      <div className="absolute bottom-1/4 right-1/10 w-80 h-80 rounded-full bg-neon-purple/5 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <Coins className="w-3.5 h-3.5 text-neon-orange" />
            <span className="text-[10px] font-mono text-neon-orange uppercase tracking-widest font-semibold font-mono">
              Production Investments
            </span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white uppercase">
            TRANSPARENT PRICING, <span className="bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow bg-clip-text text-transparent">CREATIVE MASTERY</span>
          </h2>
          <p className="text-white/50 font-light text-sm sm:text-base max-w-2xl mx-auto">
            Choose a creative engagement level that matches your timeline. All plans feature ultra-high-resolution 4K deliverables and absolute visual prestige.
          </p>

          {/* Billing Toggle */}
          <div className="pt-6 flex items-center justify-center gap-3">
            <span className={`text-xs font-mono transition-colors ${billingPeriod === "monthly" ? "text-white font-semibold" : "text-white/40"}`}>
              Standard Rate
            </span>
            <button
              id="billing-period-toggle"
              onClick={() => setBillingPeriod(billingPeriod === "monthly" ? "annual" : "monthly")}
              className="relative w-12 h-6 rounded-full bg-white/5 border border-white/10 cursor-pointer flex items-center p-0.5 transition-colors"
            >
              <div
                className={`w-4.5 h-4.5 rounded-full bg-neon-orange shadow-md transition-transform duration-300 ${
                  billingPeriod === "annual" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
            <span className={`text-xs font-mono transition-colors flex items-center gap-1.5 ${billingPeriod === "annual" ? "text-neon-orange font-semibold" : "text-white/40"}`}>
              <span>Annual Retainer Package</span>
              <span className="text-[9px] px-1.5 py-0.5 bg-neon-orange/10 border border-neon-orange/20 rounded font-bold text-neon-orange uppercase tracking-wider font-mono">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Tiers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24" id="pricing-tiers-grid">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              id={`pricing-tier-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
              className={`bg-[#0a0a0a]/90 border rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-300 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] ${
                tier.highlight
                  ? "border-neon-orange/50 bg-gradient-to-b from-neon-orange/10 to-transparent shadow-[0_0_20px_rgba(234,88,12,0.15)]"
                  : "border-white/10"
              }`}
            >
              {/* Highlight Banner */}
              {tier.highlight && (
                <div className="absolute top-0 right-8 transform -translate-y-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-neon-purple to-neon-orange text-[9px] font-mono text-white uppercase tracking-wider font-bold">
                  Recommended Service
                </div>
              )}

              {/* Title Section */}
              <div className="space-y-4 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">
                    {tier.badge}
                  </span>
                  {tier.highlight && <Zap className="w-4 h-4 text-neon-orange animate-pulse" />}
                </div>

                <h3 className="font-display text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                  {tier.name}
                </h3>

                <p className="text-white/50 font-light text-xs sm:text-sm">
                  {tier.description}
                </p>

                {/* Price Display */}
                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-baseline gap-1">
                    <span className="font-display text-4xl sm:text-5xl font-black text-white">
                      {typeof tier.price === "number" ? `₹${tier.price.toLocaleString('en-IN')}` : tier.price}
                    </span>
                    <span className="text-xs font-mono text-white/40 lowercase">
                      /{tier.period}
                    </span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 pt-6 border-t border-white/5">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs text-white/70 font-light leading-normal font-sans">
                      <Check className="w-4 h-4 text-neon-orange shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="pt-8 mt-6 border-t border-white/5">
                <button
                  id={`cta-btn-${tier.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`w-full py-3.5 rounded-full font-extrabold text-xs tracking-widest uppercase transition-all cursor-pointer ${
                    tier.highlight
                      ? "bg-gradient-to-r from-neon-purple to-neon-orange text-white hover:shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                      : "bg-white/5 border border-white/10 text-white hover:text-white hover:bg-white/10"
                  }`}
                  onClick={() => {
                    const el = document.getElementById("blueprint");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {tier.cta}
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* FAQs Accordion Block */}
        <div className="max-w-3xl mx-auto space-y-8" id="faq-block">
          <div className="text-center space-y-2">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight">
              Production &amp; Project FAQs
            </h3>
            <p className="text-white/50 text-xs sm:text-sm font-light">
              Critical corporate answers regarding creative deliverables, revision metrics, and continuous support agreements.
            </p>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  id={`faq-item-${index}`}
                  className="bg-white/[0.01] border border-white/5 rounded-2xl p-4 sm:p-5 hover:border-white/10 transition-colors"
                >
                  <button
                    id={`faq-toggle-${index}`}
                    onClick={() => toggleFaq(index)}
                    className="w-full flex justify-between items-center text-left gap-4 font-display font-bold text-sm sm:text-base text-white cursor-pointer uppercase tracking-wide"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp className="w-4 h-4 text-neon-orange shrink-0" /> : <ChevronDown className="w-4 h-4 text-white/30 shrink-0" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-white/60 font-light text-xs sm:text-sm leading-relaxed mt-4 pt-4 border-t border-white/5 font-sans">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-center justify-center gap-2.5 text-xs text-white/40 font-mono font-semibold">
            <Lock className="w-4 h-4 text-neon-orange" />
            <span>CONFIDENTIAL WORKFLOWS • STRICT NON-DISCLOSURE AGREEMENT (NDA) GUARANTEE</span>
          </div>

        </div>

      </div>
    </section>
  );
}
