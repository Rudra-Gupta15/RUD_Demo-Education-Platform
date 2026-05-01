import { useState, useRef, useEffect } from "react";
import { Bot, Send, X, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;

const parseBoldText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index} className="font-bold text-slate-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

const renderMessageContent = (content, role) => {
  if (role === "user") {
    return <p className="whitespace-pre-wrap">{content}</p>;
  }

  const lines = content.split("\n");
  
  return (
    <div className="space-y-2 text-slate-700">
      {lines.map((line, idx) => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return null;

        const bulletRegex = /^[\*\-\u2022]\s+/;
        const numberRegex = /^(\d+)\.\s+/;
        
        let cleanText = trimmedLine;

        if (bulletRegex.test(trimmedLine)) {
          cleanText = trimmedLine.replace(bulletRegex, "");
        } else if (numberRegex.test(trimmedLine)) {
          cleanText = trimmedLine.replace(numberRegex, "");
        }

        return (
          <div key={idx} className="flex items-start gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-600 mt-1.5 flex-shrink-0 shadow-sm" />
            <span className="flex-1 leading-relaxed">{parseBoldText(cleanText)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your RUD AI assistant. How can I help you secure your systems or build your AI projects today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const payload = {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are SynapseLearn AI, a helpful tech assistant. Keep your responses extremely short, direct, and concise. Answer the user's query using short bullet points with asterisks (*). Put each point on a new line. Avoid paragraphs or long blocks of text."
          },
          ...messages.slice(1).map(m => ({ role: m.role, content: m.content })),
          { role: "user", content: input }
        ]
      };

      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!data.choices || data.choices.length === 0) {
        console.error("GROQ API ERROR:", data);
      }
      const botReply = data.choices?.[0]?.message?.content || 
        (data.error?.message ? `Groq Error: ${data.error.message}` : "I couldn't process that response. Please ask again.");

      setMessages((prev) => [...prev, { role: "assistant", content: botReply }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Apologies, our AI backend timed out. Try pinging again shortly." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[24rem] h-[32rem] max-w-[calc(100vw-2rem)] bg-white border border-slate-100 shadow-2xl rounded-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-brandprimary text-white p-4 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl">
                  <Bot size={24} className="text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">RUD AI Support Bot</h4>
                  <span className="text-xs text-indigo-100">Online & Ready</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-1.5 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain bg-slate-50/50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-medium shadow-soft ${
                      msg.role === "user" 
                        ? "bg-brandprimary text-white" 
                        : "bg-white text-slate-800 border border-slate-100"
                    }`}
                  >
                    {renderMessageContent(msg.content, msg.role)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-500 border border-slate-100 rounded-2xl px-4 py-3 text-sm font-medium shadow-soft flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brandprimary animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-brandprimary animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-brandprimary animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 text-sm font-medium outline-none transition focus:bg-white focus:border-brandprimary focus:ring-4 focus:ring-indigo-50 placeholder-slate-400"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || loading}
                className="bg-brandprimary text-white p-3 rounded-xl shadow-soft hover:bg-indigo-700 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-full bg-brandprimary text-white shadow-2xl flex items-center justify-center relative border-4 border-white overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X size={28} className="relative z-10" />
        ) : (
          <MessageCircle size={28} className="relative z-10" />
        )}
      </motion.button>
    </div>
  );
}
  
