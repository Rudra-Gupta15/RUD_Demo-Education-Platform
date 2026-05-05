import { useState } from "react";
import { CheckCircle2, Mail, Send, GraduationCap, Briefcase, FileText, UserCheck, Sparkles, Rocket, Users, ShieldAlert, Code2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/client.js";
import Reveal from "../components/Reveal.jsx";

const careerBenefits = [
  {
    title: "Frontier Innovation",
    desc: "Work on production-grade AI agents and autonomous cybersecurity defense systems that solve real-world vulnerabilities.",
    icon: Sparkles,
    color: "text-amber-600",
    bg: "bg-amber-50"
  },
  {
    title: "Radical Growth",
    desc: "Direct mentorship from industry veterans and the freedom to own complex engineering pipelines from day one.",
    icon: Rocket,
    color: "text-blue-600",
    bg: "bg-blue-50"
  },
  {
    title: "Global Impact",
    desc: "Your research and code will empower thousands of developers and security professionals across the globe.",
    icon: Users,
    color: "text-emerald-600",
    bg: "bg-emerald-50"
  }
];

const cultureValues = [
  { title: "Security First", icon: ShieldAlert },
  { title: "AI-Native", icon: Code2 },
  { title: "Open Collaboration", icon: Users },
  { title: "Continuous Learning", icon: GraduationCap }
];

export default function CareerContact() {
  const [form, setForm] = useState({ name: "", email: "", university: "", role: "Internship", portfolio: "", message: "" });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "" });
    try {
      await api("/api/contact", { method: "POST", body: JSON.stringify({ ...form, subject: `Career Application: ${form.role}` }) });
      setStatus({
        type: "success",
        message: "Application transmitted! Our talent acquisition team will review your profile shortly."
      });
      setForm({ name: "", email: "", university: "", role: "Internship", portfolio: "", message: "" });
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-[radial-gradient(circle_at_center,_#ede9fe_0%,_transparent_60%)] blur-[120px]" />
      </div>

      <div className="container-shell relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-20 items-start">
          
          {/* Left Column: Content */}
          <div className="space-y-12">
            <Reveal>
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-600"></span>
                  </span>
                  Careers at ConvoSec
                </div>
                <h1 className="text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] text-slate-900">
                  Build the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Digital Defense.</span>
                </h1>
                <p className="text-lg text-slate-500 font-medium max-w-xl leading-relaxed">
                  We're assembling a team of elite engineers and researchers to redefine the intersection of AI agents and cybersecurity.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-6">
              {careerBenefits.map((benefit, i) => (
                <Reveal key={benefit.title} delay={0.1 + i * 0.1}>
                  <div className="group flex gap-6 p-6 rounded-3xl bg-white border border-slate-100 shadow-sm transition-all hover:shadow-md hover:border-indigo-100">
                    <div className={`flex-shrink-0 w-12 h-12 rounded-2xl ${benefit.bg} border border-slate-100 flex items-center justify-center ${benefit.color} group-hover:scale-110 transition-transform`}>
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
              <div className="pt-10 border-t border-slate-200">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6 text-center lg:text-left">Our Core Values</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {cultureValues.map((val) => (
                    <div key={val.title} className="flex flex-col items-center lg:items-start gap-3 p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                      <val.icon size={20} className="text-slate-400" />
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 text-center lg:text-left leading-tight">{val.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Application Form */}
          <div className="relative">
            {/* Decorative Glow */}
            <div className="absolute -inset-4 bg-indigo-100/50 blur-3xl opacity-50 rounded-[3rem]" />
            
            <Reveal delay={0.2}>
              <form 
                className="relative bg-white border border-slate-200 rounded-[2.5rem] p-8 lg:p-12 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden" 
                onSubmit={handleSubmit}
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-amber-500 to-indigo-600" />
                
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900">Application Portal</h2>
                  <p className="text-slate-500 text-sm mt-2">Submit your details for review by our engineering team.</p>
                </div>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Legal Name</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300 font-medium"
                        placeholder="Jane Doe"
                        value={form.name}
                        onChange={update("name")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Personal Email</label>
                      <input
                        type="email"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300 font-medium"
                        placeholder="jane@domain.com"
                        value={form.email}
                        onChange={update("email")}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">University / Org</label>
                      <input
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300 font-medium"
                        placeholder="MIT / Independent"
                        value={form.university}
                        onChange={update("university")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Interest Level</label>
                      <select
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none font-bold"
                        value={form.role}
                        onChange={update("role")}
                        required
                      >
                        <option value="Internship">Internship (3-6 mo)</option>
                        <option value="Full-time">Full-time Engineering</option>
                        <option value="Freelance">Project-based Contractor</option>
                        <option value="Research">AI Research Fellowship</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Portfolio / Links</label>
                    <input
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300 font-medium"
                      placeholder="GitHub, LinkedIn, or Website"
                      value={form.portfolio}
                      onChange={update("portfolio")}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider">Key Project Achievement</label>
                    <textarea
                      className="w-full min-h-[140px] bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-slate-300 resize-none font-medium"
                      placeholder="Describe your most technically challenging work..."
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
                    {submitting ? "Transmitting..." : "Send Application"}
                    <Send size={18} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </button>
                
                <p className="mt-6 text-center text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  Encrypted Application Portal
                </p>
              </form>
            </Reveal>
          </div>

        </div>
      </div>

      {/* ── Internship Enrollment Process ── */}
      <div className="mt-32 pt-24 border-t border-slate-100">
        <div className="container-shell">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <Reveal>
              <p className="text-xs font-bold text-indigo-600 uppercase tracking-[0.3em] mb-4">The Pathway</p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Internship <br/>
                <span className="text-indigo-600">Enrollment Process</span>
              </h2>
            </Reveal>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-10 md:p-16 rounded-[3rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16" />
              <h3 className="text-3xl font-black text-slate-900 mb-12 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-sm">I</div>
                How to Join Our Live Projects
              </h3>
              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                {[
                  { s: "Student Registration", d: "Submit application via the internship registration portal." },
                  { s: "Verification", d: "Credentials and eligibility are verified by the HR/Operations team." },
                  { s: "Domain Selection", d: "Student selects preferred domain (AI/ML or Cybersecurity)." },
                  { s: "Project Assignment", d: "Student is assigned to a real company project with a domain mentor." },
                  { s: "Mentorship & Monitoring", d: "Regular check-ins, task tracking, and performance evaluation." },
                  { s: "Completion", d: "Successful interns receive a Certificate of Completion and Letter of Recommendation." }
                ].map((step, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="flex gap-6 group">
                      <div className="flex flex-col items-center shrink-0">
                        <div className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-sm font-black text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 transition-all">
                          {i + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900 mb-1">{step.s}</h4>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.d}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Asset Section */}
      <div className="mt-32 border-y border-slate-100 bg-white">
        <div className="container-shell py-24">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-20 items-center">
            <Reveal delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-indigo-100 blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                <div className="relative rounded-[3rem] overflow-hidden border-[12px] border-slate-50 shadow-2xl aspect-[16/9]">
                  <img 
                    src="/tech_office_collaboration_premium_1777889270846.png" 
                    alt="Team Collaboration" 
                    className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-60" />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-slate-900 leading-tight">
                  Be part of the <span className="text-blue-600">Next Wave</span> of AI Security.
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  We don't just hire for skills; we hire for obsession. If you spend your weekends fine-tuning models or hunting for Zero-Days, you belong at ConvoSec.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Team member" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">Join our growing team</p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">4 positions open this quarter</p>
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
