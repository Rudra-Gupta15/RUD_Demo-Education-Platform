import { useState } from "react";
import { CheckCircle2, Mail, MapPin, MessageSquare, Send, Building2, Briefcase, Globe, Shield, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/client.js";
import Reveal from "../components/Reveal.jsx";

const contactInfo = [
  { 
    icon: Mail, 
    label: "Strategic Partnerships", 
    value: "partners@convosec.ai", 
    bg: "bg-indigo-500/10", 
    color: "text-indigo-400" 
  },
  { 
    icon: Building2, 
    label: "Global Headquarters", 
    value: "Tech Hub, Bangalore, IN", 
    bg: "bg-emerald-500/10", 
    color: "text-emerald-400" 
  },
  { 
    icon: Globe, 
    label: "Enterprise Sales", 
    value: "Schedule a Demo", 
    bg: "bg-blue-500/10", 
    color: "text-blue-400" 
  }
];

const benefits = [
  {
    title: "Tailored AI Roadmaps",
    desc: "Custom-engineered learning paths aligned with your specific technology stack and business objectives.",
    icon: Zap
  },
  {
    title: "Vetted Talent Pipeline",
    desc: "Direct access to our top-performing graduates specialized in Cybersecurity and Applied AI.",
    icon: Shield
  },
  {
    title: "Enterprise Resilience",
    desc: "Collaborative security auditing and AI implementation strategies to future-proof your infrastructure.",
    icon: Briefcase
  }
];

export default function BusinessContact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", industry: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      await api("/api/contact", { method: "POST", body: JSON.stringify({ ...form, subject: "Business Partnership" }) });
      setStatus({
        type: "success",
        message: "Your inquiry has been logged securely. Our executive team will reach out within 24 business hours."
      });
      setForm({ name: "", company: "", email: "", industry: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative min-h-screen bg-[#f8fafc] text-slate-900 pt-32 pb-24 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1000px] pointer-events-none opacity-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(circle_at_center,_#dbeafe_0%,_transparent_60%)] blur-[120px]" />
      </div>
      
      <div className="container-shell relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Left Column: Content */}
          <div className="space-y-12">
            <Reveal>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold uppercase tracking-widest">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                  </span>
                  Enterprise Solutions
                </div>
                <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] text-slate-900">
                  Accelerate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Evolution.</span>
                </h1>
                <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
                  Join forces with ConvoSec to integrate cutting-edge AI capabilities and robust security frameworks into your organizational DNA.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6">
              {benefits.map((benefit, i) => (
                <Reveal key={benefit.title} delay={0.1 + i * 0.1}>
                  <div className="group flex gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-blue-100">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
                      <benefit.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div className="pt-8 border-t border-slate-200">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Trusted by Industry Leaders</p>
                <div className="flex flex-wrap gap-8 opacity-60 grayscale filter">
                  {/* These would be actual logos in a real app */}
                  <span className="text-xl font-black italic text-slate-400">CYBERLABS</span>
                  <span className="text-xl font-black tracking-tighter text-slate-400">AI_CORE</span>
                  <span className="text-xl font-black uppercase text-slate-400">NexaSafe</span>
                  <span className="text-xl font-black text-slate-400">FORTIS</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Form */}
          <div className="relative">
            {/* Decorative Glow behind form */}
            <div className="absolute -inset-4 bg-blue-100/50 blur-3xl opacity-50 rounded-[3rem]" />
            
            <Reveal delay={0.2}>
              <form 
                className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden" 
                onSubmit={handleSubmit}
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-blue-500 to-indigo-600" />
                
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900">Start a Conversation</h2>
                  <p className="text-slate-500 text-sm mt-2">Professional partnership inquiries only.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Representative Name</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300"
                        placeholder="e.g. Elena Vance"
                        value={form.name}
                        onChange={update("name")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Organization</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300"
                        placeholder="e.g. Vance Research"
                        value={form.company}
                        onChange={update("company")}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Business Email</label>
                      <input
                        type="email"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300"
                        placeholder="elena@vance.io"
                        value={form.email}
                        onChange={update("email")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Sector</label>
                      <select
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none"
                        value={form.industry}
                        onChange={update("industry")}
                        required
                      >
                        <option value="">Select Sector</option>
                        <option value="SaaS">Technology / SaaS</option>
                        <option value="Finance">Finance & Banking</option>
                        <option value="Public">Public Infrastructure</option>
                        <option value="Research">Research & Academia</option>
                        <option value="Defense">Defense & Intelligence</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Project Scope / Objectives</label>
                    <textarea
                      className="w-full min-h-[140px] bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300 resize-none"
                      placeholder="Briefly describe your partnership goals or training requirements..."
                      value={form.message}
                      onChange={update("message")}
                      required
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {status.message && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-6 rounded-2xl p-4 text-sm font-bold flex items-center gap-3 ${
                        status.type === "success"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-red-50 text-red-700 border border-red-100"
                      }`}
                    >
                      {status.type === "success" && <CheckCircle2 size={18} />}
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  disabled={submitting}
                  className="w-full mt-10 relative group"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-300" />
                  <div className="relative flex items-center justify-center gap-3 bg-slate-900 text-white rounded-2xl px-8 py-5 text-base font-black transition-all hover:bg-blue-600 disabled:opacity-50">
                    {submitting ? "Processing Inquiry..." : "Initialize Partnership"}
                    <Send size={18} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
                
                <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Secure End-to-End Transmission
                </p>
              </form>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {contactInfo.map((info, i) => (
                <Reveal key={info.label} delay={0.5 + i * 0.1}>
                  <div className="p-5 rounded-[2rem] bg-white border border-slate-100 text-center group hover:border-blue-100 transition-colors shadow-sm">
                    <div className={`mx-auto w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <info.icon size={20} />
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">{info.label}</p>
                    <p className="text-xs font-bold text-slate-800 truncate">{info.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Visual Asset Section */}
      <div className="mt-32 border-y border-slate-100 bg-white">
        <div className="container-shell py-24">
          <div className="grid lg:grid-cols-[1fr_1.5fr] gap-20 items-center">
            <Reveal>
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-slate-900 leading-tight">
                  Where <span className="text-blue-600">Human Expertise</span> meets <span className="text-indigo-600">Machine Intelligence.</span>
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-1 h-auto bg-blue-600 rounded-full" />
                    <p className="text-slate-500 text-lg italic leading-relaxed">
                      "Our partnership with ConvoSec redefined how our engineering team approached AI security. Their specialized training was the catalyst for our global infrastructure overhaul."
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Testimonial" />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">Marcus Thorne</p>
                      <p className="text-[10px] text-slate-400 uppercase font-black">CTO, NexaSafe Systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-blue-100 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl aspect-[16/9]">
                  <img 
                    src="/business_collaboration_premium_1777889008154.png" 
                    alt="Official Business Collaboration" 
                    className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="backdrop-blur-md bg-white/70 border border-white p-6 rounded-2xl shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-black text-blue-600 uppercase tracking-widest mb-1">Upcoming Summit</p>
                          <p className="text-xl font-black text-slate-900">AI Ethics & Global Security 2026</p>
                        </div>
                        <div className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold">
                          Singapore · Oct 12
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


