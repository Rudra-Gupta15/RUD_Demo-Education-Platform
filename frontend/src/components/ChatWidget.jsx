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
    { role: "assistant", content: "Hi! I'm your ConvoSec AI assistant. How can I help you secure your systems or build your AI projects today?" }
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
            content: `You are ConvoSec AI, the official intelligent assistant for the ConvoSec platform. 
            
            Company Overview & Credits:
            - Name: ConvoSec AI
            - Founder & CEO: Rudra Rajgure
            - Mission: Empowering Minds, Engineering Futures.
            - Focus: Unifying Convolutional Intelligence and Cybersecurity.
            
            What We Do (Our Services):
            1. Education: Industrial-grade tracks in AI/ML and Cybersecurity (VAPT). We offer live cohorts, recorded labs, and real-world projects.
            2. Project Development: Building bespoke AI and Security solutions, including AI SaaS, Computer Vision, LLM integrations, and network security for businesses.
            3. Corporate Collaboration: Partnering with organizations for specialized R&D and consultancy.
            
            Our Courses (Which ones are best?):
            - AI Mastery Roadmap (10 Phases): Covers everything from Python to Deep Learning, Generative AI (LLMs), and MLOps. 
            - Cybersecurity Roadmap: Covers Ethical Hacking, VAPT, Digital Forensics, and SOC Analyst Bootcamps.
            - Bestsellers/Recommended: "Generative AI & LLMs (Phase 6)" and "Ethical Hacking & VAPT (Course 2)" are our most popular and highly recommended courses.
            
            Partnerships & Jobs:
            - To partner with us: For corporate collaborations, R&D, or business consulting, contact us via https://convosecai.com/contact/business
            - To get a job/internship: We offer industry-aligned internships to prepare talent. Visit https://convosecai.com/contact/careers or email support to apply for jobs and internships.
            
            Tone & Style:
            - Professional, authoritative, yet helpful and encouraging.
            - Keep responses extremely direct and concise.
            - Use short bullet points with asterisks (*) for clarity.
            - Put each point on a new line.
            - Avoid long paragraphs.`
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
    <div className="fixed bottom-6 right-6 z-[999] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[24rem] h-[32rem] max-h-[calc(100vh-16rem)] max-w-[calc(100vw-2rem)] bg-white border border-slate-900 shadow-2xl rounded-none flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shadow-sm relative overflow-hidden">
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
              <div className="flex items-center gap-3 relative z-10">
                <div className="bg-white/10 p-2 rounded-none border border-white/10">
                  <Bot size={24} className="text-white animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">ConvoSec AI Support Bot</h4>
                  <span className="text-xs text-slate-400">Online & Ready</span>
                </div>
              </div>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 overscroll-contain bg-slate-50/50">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-none px-4 py-2.5 text-sm font-medium shadow-sm ${
                      msg.role === "user" 
                        ? "bg-slate-900 text-white" 
                        : "bg-white text-slate-800 border border-slate-100"
                    }`}
                  >
                    {renderMessageContent(msg.content, msg.role)}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white text-slate-500 border border-slate-100 rounded-none px-4 py-3 text-sm font-medium shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-900 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-slate-900 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-slate-900 animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input Footer */}
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-900/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 border border-slate-200 bg-slate-50 rounded-none px-4 py-3 text-sm font-medium outline-none transition focus:bg-white focus:border-slate-900 focus:ring-4 focus:ring-slate-50 placeholder-slate-400"
              />
              <button 
                type="submit" 
                disabled={!input.trim() || loading}
                className="bg-slate-900 text-white p-3 rounded-none shadow-md hover:bg-slate-800 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
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
        className="w-16 h-16 rounded-full bg-slate-900 text-white shadow-2xl flex items-center justify-center relative border-4 border-white overflow-hidden group"
      >
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '6px 6px' }} />
        <div className="absolute inset-0 bg-slate-800 opacity-0 group-hover:opacity-100 transition-opacity" />
        {isOpen ? (
          <X size={28} className="relative z-10" />
        ) : (
          <Bot size={28} className="relative z-10" />
        )}
      </motion.button>
    </div>
  );
}
  
