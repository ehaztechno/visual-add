import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Loader2, 
  HelpCircle,
  Clock,
  ArrowRight
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Welcome to Visual Adda! I'm your Creative AI assistant. How can I help you accelerate your 3D walkthroughs or pipeline workflows today?",
      timestamp: new Date()
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    "What services do you offer?",
    "How do we save 97.5% render time?",
    "Do you build interactive WebGL?",
    "What engine do you recommend?"
  ];

  // Auto scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || loading) return;

    const userMsg: Message = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: textToSend,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      // Keep only last 6 messages to keep tokens/memory extremely small
      const payloadMessages = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content
      })).slice(-6);

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: payloadMessages })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to reach our creative nodes.");
      }

      const assistantMsg: Message = {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content: data.reply,
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error(err);
      setError("Connection offline. Please make sure your server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Floating Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-[360px] sm:w-[400px] h-[520px] bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_10px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0a0515] to-[#100820] border-b border-white/10 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-neon-purple to-neon-orange flex items-center justify-center relative shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                  <Bot className="w-5 h-5 text-black" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wide flex items-center gap-1">
                    Studio Assistant
                  </h4>
                  <span className="text-[9px] font-mono text-white/40 uppercase">VA_SUPPORT_BOT // ONLINE</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                    msg.role === "user" 
                      ? "bg-white/10 text-white" 
                      : "bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                  }`}>
                    {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div className="space-y-1 text-left">
                    <div className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-white text-black rounded-tr-none font-medium"
                        : "bg-white/[0.03] border border-white/5 text-white/95 rounded-tl-none font-light"
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[8px] font-mono text-white/30 block mt-0.5">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex gap-3 mr-auto max-w-[85%]">
                  <div className="w-7 h-7 rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30 flex items-center justify-center animate-pulse">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="p-3.5 bg-white/[0.03] border border-white/5 text-white/40 rounded-2xl rounded-tl-none text-xs flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-neon-purple" />
                    <span className="font-mono text-[10px] uppercase tracking-wider animate-pulse">Consulting Studio Director...</span>
                  </div>
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-[10px] text-red-400 font-mono text-center">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips Panel */}
            <div className="p-3 bg-black/40 border-t border-white/5 space-y-1.5 text-left">
              <span className="text-[8px] font-mono text-white/30 uppercase tracking-widest flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-white/30" /> SUGGESTED TOPICS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(suggestion)}
                    className="px-2.5 py-1.5 bg-white/[0.02] hover:bg-white/10 border border-white/10 rounded-lg text-[10px] text-white/70 hover:text-white transition-all text-left flex items-center gap-1 cursor-pointer"
                  >
                    <span>{suggestion}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-white/40" />
                  </button>
                ))}
              </div>
            </div>

            {/* Footer Form Input */}
            <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-[#08080c] flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about pipeline budgets, rendering time..."
                className="flex-1 bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder-white/30 focus:outline-none focus:border-neon-purple"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className={`p-3 rounded-xl transition-all ${
                  input.trim() && !loading
                    ? "bg-gradient-to-r from-neon-purple to-neon-orange text-black hover:scale-105 cursor-pointer"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Cost disclaimer badge */}
            <div className="bg-[#050505] py-1 border-t border-white/5 text-center flex items-center justify-center gap-1">
              <Clock className="w-2.5 h-2.5 text-emerald-400" />
              <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">
                Optimized with Gemini 3.5-Flash (Free-tier safe)
              </span>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-purple via-neon-orange to-neon-yellow flex items-center justify-center shadow-[0_5px_25px_rgba(168,85,247,0.45)] cursor-pointer group relative overflow-hidden"
      >
        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {isOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-black" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full animate-pulse" />
          </div>
        )}
      </motion.button>

    </div>
  );
}
