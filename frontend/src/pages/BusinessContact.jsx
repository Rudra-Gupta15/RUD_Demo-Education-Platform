import { useState } from "react";
import { CheckCircle2, Mail, MapPin, MessageSquare, Send, Building2, Briefcase, Globe, Shield, Zap, ArrowRight, Award, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/client.js";
import Reveal from "../components/Reveal.jsx";
import SEO from "../components/SEO.jsx";

const contactInfo = [
  { 
    icon: Mail, 
    label: "Strategic Partnerships", 
    value: "partners@convosec.ai", 
  },
  { 
    icon: Building2, 
    label: "Global Headquarters", 
    value: "Tech Hub, Bangalore, IN", 
  },
  { 
    icon: Globe, 
    label: "Enterprise Sales", 
    value: "Schedule a Demo", 
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
    <section className="relative min-h-screen bg-white text-slate-900 pt-32 pb-24 overflow-hidden">
      <SEO 
        title="Business Partnerships | Enterprise AI & Security Solutions" 
        description="Partner with ConvoSec AI to scale your enterprise IQ through tailored AI roadmaps and a vetted talent pipeline in cybersecurity."
        keywords="enterprise AI, business partnerships, corporate training, AI consulting, cybersecurity for business"
      />
      {/* Structural Background */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-40" />
      
      <div className="container-shell relative z-10">
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Executive Partnerships
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-tight text-slate-900 mb-8 whitespace-nowrap">
              Scale your <span className="text-brandprimary">Enterprise IQ.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              We provide the pedagogical infrastructure and technical talent required to navigate the frontier of Applied AI and Cybersecurity.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Benefits & Trust */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              {benefits.map((benefit, i) => (
                <Reveal key={benefit.title} delay={0.1 + i * 0.1}>
                  <div className="group flex gap-6 pb-8 border-b border-slate-100 last:border-0">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-900 group-hover:bg-brandprimary group-hover:text-white group-hover:border-brandprimary transition-all">
                      <benefit.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">{benefit.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{benefit.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.4}>
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-slate-900">Joined by 200+ Institutions</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-2xl font-black text-brandprimary">98%</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Success Rate</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-black text-brandprimary">24h</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Response Time</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-soft relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brandprimary opacity-10" />
                
                <div className="mb-10 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Inquiry Portal</h2>
                    <p className="text-slate-500 text-sm mt-1">Formal engagement request.</p>
                  </div>
                  <Briefcase className="text-slate-200" size={32} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Full Name</label>
                      <input
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary"
                        placeholder=""
                        value={form.name}
                        onChange={update("name")}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Organization</label>
                      <input
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary"
                        placeholder=""
                        value={form.company}
                        onChange={update("company")}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Professional Email</label>
                      <input
                        type="email"
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary"
                        placeholder=""
                        value={form.email}
                        onChange={update("email")}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Industry Sector</label>
                      <select
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all focus:border-brandprimary appearance-none cursor-pointer"
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

                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Partnership Objectives</label>
                    <textarea
                      className="w-full min-h-[120px] bg-slate-50 border border-slate-200 rounded-xl p-4 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary focus:ring-1 focus:ring-brandprimary/20 resize-none"
                      placeholder=""
                      value={form.message}
                      onChange={update("message")}
                      required
                    />
                  </div>

                  <AnimatePresence>
                    {status.message && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className={`rounded-xl p-4 text-sm font-bold flex items-center gap-3 ${
                          status.type === "success"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-red-50 text-red-700"
                        }`}
                      >
                        {status.type === "success" && <CheckCircle2 size={18} />}
                        {status.message}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    disabled={submitting}
                    className="w-full relative group bg-slate-900 text-white rounded-xl px-8 py-5 text-sm font-black uppercase tracking-[0.2em] transition-all hover:bg-brandprimary disabled:opacity-50 overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {submitting ? "Processing..." : "Submit Proposal"}
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                  
                  <div className="flex items-center justify-center gap-6 opacity-40">
                    <div className="flex items-center gap-2">
                      <Shield size={12} />
                      <span className="text-[8px] font-black uppercase tracking-widest">SSL Encrypted</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={12} />
                      <span className="text-[8px] font-black uppercase tracking-widest">ISO Certified</span>
                    </div>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Global Reach Section */}
        <div className="mt-32 pt-24 border-t border-slate-100">
          <div className="grid md:grid-cols-3 gap-12">
            {contactInfo.map((info, i) => (
              <Reveal key={info.label} delay={0.5 + i * 0.1}>
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400">
                    <info.icon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">{info.label}</p>
                    <p className="text-lg font-bold text-slate-900">{info.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Corporate Asset Section */}
      <div className="mt-32 bg-slate-900 py-32 text-white">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <Reveal>
              <div className="space-y-12">
                <h2 className="text-5xl font-black tracking-tighter leading-none">
                  Defining the next <br />
                  <span className="text-slate-500 italic">Industrial Revolution.</span>
                </h2>
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <div className="flex-shrink-0 w-px h-24 bg-brandprimary" />
                    <p className="text-xl text-slate-400 font-medium leading-relaxed italic">
                      "Our partnership with ConvoSec redefined how our engineering team approached AI security. Their specialized training was the catalyst for our global infrastructure overhaul."
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-slate-800 border border-slate-700 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" alt="Testimonial" className="" />
                    </div>
                    <div>
                      <p className="text-base font-bold">Marcus Thorne</p>
                      <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">CTO, NexaSafe Systems</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="relative group">
                <div className="absolute inset-0 bg-brandprimary/20 blur-[100px] opacity-20 pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden transition-all duration-1000 border border-slate-800">
                  <img 
                    src="/business_collaboration_premium_1777889008154.png" 
                    alt="Corporate Partnership" 
                    className="w-full aspect-[4/3] object-cover"
                  />
                  <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}


