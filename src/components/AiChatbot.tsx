import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Send, X, Bot, Sparkles, ArrowUpRight, HelpCircle, RefreshCw, ChevronDown } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: Date;
}

interface AiChatbotProps {
  onNavigate?: (page: string) => void;
}

export default function AiChatbot({ onNavigate }: AiChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "model",
      text: "Namaste! I am **AddaBot**, your direct AI creative representative for **Visual Adda**.\n\nWhether you need photorealistic **3D CGI architectural walkthroughs**, stylized **2D animations**, or **corporate films**, I'm here to assist. What can we build for you today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(1);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Quick starter questions to make interaction immediate
  const starters = [
    { label: "Pricing & Plans", prompt: "What are your Visual Adda CGI and video production pricing plans in INR?" },
    { label: "3D CGI Walkthroughs", prompt: "Tell me about your 3D Architectural CGI walkthrough process." },
    { label: "Meet the Team", prompt: "Who are the visual specialists and creative minds behind the studio?" },
    { label: "Interactive Tools", prompt: "What interactive utilities can I try out on this website?" }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  // Click outside to minimize on desktop is nice, but float works best
  const handleSend = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed) return;

    // Append user message
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // Collect history
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload
        })
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || data.details || "Failed to reach creative server");
      }

      const modelMsg: Message = {
        id: `model-${Date.now()}`,
        role: "model",
        text: data.text,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (err: any) {
      console.error("Chatbot API error:", err);
      setErrorMsg(err?.message || "Connection interrupted. Please verify your Gemini API secret configuration.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(message);
    }
  };

  // Safe markdown helper since react-markdown is imported, but standard inline regex is super safe
  const renderMessageText = (text: string) => {
    // Simple bold markdown converter: **text** -> <strong>text</strong>
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-extrabold text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div id="ai-agent-bot-widget" className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {/* Chat window panel */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="w-[90vw] sm:w-[380px] h-[540px] bg-[#070707] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl relative mb-4"
          >
            {/* Ambient cyber border header */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow"></div>

            {/* Header */}
            <div className="p-4 bg-zinc-950/85 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-neon-purple/20 to-neon-orange/20 border border-neon-orange/30 flex items-center justify-center relative">
                  <Bot className="w-5 h-5 text-neon-orange animate-pulse" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-black"></span>
                </div>
                <div className="text-left">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">AddaBot AI Agent</h4>
                  <p className="text-[10px] text-white/40 font-mono">Visual Adda Representative • India</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {/* Reset button to clear history */}
                <button
                  onClick={() => {
                    setMessages([
                      {
                        id: "initial",
                        role: "model",
                        text: "Welcome back! History reset successfully.\n\nI am **AddaBot**, your creative consultant. Ask me anything about our hyper-fidelity 3D CGI or character illustrations!",
                        timestamp: new Date()
                      }
                    ]);
                    setErrorMsg(null);
                  }}
                  title="Reset conversation"
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/5 cursor-pointer transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Message Thread Body */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} items-start gap-2.5`}
                >
                  {msg.role !== "user" && (
                    <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Bot className="w-4 h-4 text-neon-orange" />
                    </div>
                  )}

                  <div className="flex flex-col space-y-1 max-w-[80%] text-left">
                    <div
                      className={`p-3 rounded-xl text-xs leading-relaxed whitespace-pre-wrap ${
                        msg.role === "user"
                          ? "bg-zinc-900 border border-white/10 text-white rounded-tr-none"
                          : "bg-white/[0.02] border border-white/5 text-white/80 rounded-tl-none font-sans"
                      }`}
                    >
                      {renderMessageText(msg.text)}
                    </div>
                    <span className="text-[9px] font-mono text-white/30 px-1">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-neon-orange animate-spin" />
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 p-3 rounded-xl rounded-tl-none max-w-[80%] text-left">
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-orange animate-bounce"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-yellow animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-purple animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}

              {errorMsg && (
                <div className="p-3 bg-red-950/20 border border-red-500/20 rounded-xl text-[11px] text-red-400 text-left space-y-2">
                  <p className="font-semibold uppercase tracking-wider">Production Link Interrupted</p>
                  <p>{errorMsg}</p>
                  <button 
                    onClick={() => handleSend(messages[messages.length - 1]?.text || "Hello")}
                    className="px-2 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-300 font-mono text-[9px] uppercase cursor-pointer"
                  >
                    Retry Connection
                  </button>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Preseeded Starter Prompts (Visible when dialogue is short or user is exploring) */}
            <div className="px-4 py-2 border-t border-white/5 bg-zinc-950/40">
              <span className="block text-[8px] font-mono text-white/30 uppercase tracking-widest text-left mb-1.5">
                Quick Assistant Starters:
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {starters.map((starter, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(starter.prompt)}
                    className="flex-shrink-0 px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 text-[10px] text-white/60 hover:text-white font-mono cursor-pointer transition-all duration-200"
                  >
                    {starter.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation Assistant Directives (Guides user back to forms/wizard) */}
            <div className="px-4 py-2 bg-zinc-950/80 border-t border-white/5 flex items-center justify-between text-[10px] text-white/55">
              <span className="font-mono">Quick Navigate:</span>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onNavigate) onNavigate("contact");
                  }}
                  className="text-neon-orange hover:underline uppercase font-mono text-[9px] tracking-wider flex items-center gap-0.5 cursor-pointer"
                >
                  Contact Form <ArrowUpRight className="w-3 h-3" />
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    if (onNavigate) onNavigate("proposal");
                  }}
                  className="text-neon-purple hover:underline uppercase font-mono text-[9px] tracking-wider flex items-center gap-0.5 cursor-pointer"
                >
                  Proposal Wizard <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Form Input Area */}
            <div className="p-3 bg-zinc-950 border-t border-white/5 flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask AddaBot anything..."
                className="flex-1 bg-white/5 border border-white/5 focus:border-neon-orange/40 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/20 focus:outline-none transition-all"
                disabled={isLoading}
              />
              <button
                onClick={() => handleSend(message)}
                disabled={!message.trim() || isLoading}
                className="p-2.5 rounded-xl bg-neon-orange text-black hover:bg-neon-yellow transition-all flex items-center justify-center disabled:opacity-40 disabled:hover:bg-neon-orange cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating launcher trigger button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center justify-center gap-2 lg:gap-2.5 w-12 h-12 md:w-14 md:h-14 lg:w-auto lg:px-4.5 lg:py-3.5 rounded-full bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow text-black font-extrabold uppercase text-xs tracking-widest shadow-[0_0_25px_rgba(249,115,22,0.3)] hover:shadow-[0_0_35px_rgba(249,115,22,0.55)] cursor-pointer group transition-all"
      >
        {isOpen ? (
          <>
            <X className="w-5 h-5 md:w-6 md:h-6 text-black lg:hidden" />
            <ChevronDown className="w-4 h-4 text-black group-hover:rotate-180 transition-transform duration-300 hidden lg:block" />
            <span className="hidden lg:inline">Minimize Agent</span>
          </>
        ) : (
          <>
            <div className="relative flex items-center justify-center">
              <Bot className="w-5 h-5 md:w-6 md:h-6 lg:w-4.5 lg:h-4.5 text-black animate-pulse" />
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            </div>
            <span className="hidden lg:inline">Talk to AddaBot</span>
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 lg:-top-1.5 lg:-right-1.5 bg-white text-black text-[9px] font-mono font-bold w-4.5 h-4.5 rounded-full border border-black flex items-center justify-center shadow-lg animate-bounce">
                1
              </span>
            )}
          </>
        )}
      </motion.button>
    </div>
  );
}
