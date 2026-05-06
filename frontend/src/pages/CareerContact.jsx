import { useState } from "react";
import { CheckCircle2, Mail, Send, GraduationCap, Briefcase, FileText, UserCheck, Sparkles, Rocket, Users, ShieldAlert, Code2, ArrowRight, Shield, Award, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/client.js";
import Reveal from "../components/Reveal.jsx";

const careerBenefits = [
  {
    title: "Frontier Innovation",
    desc: "Work on production-grade AI agents and autonomous cybersecurity defense systems that solve real-world vulnerabilities.",
    icon: Sparkles
  },
  {
    title: "Radical Growth",
    desc: "Direct mentorship from industry veterans and the freedom to own complex engineering pipelines from day one.",
    icon: Rocket
  },
  {
    title: "Global Impact",
    desc: "Your research and code will empower thousands of developers and security professionals across the globe.",
    icon: Users
  }
];

const cultureValues = [
  { title: "Security First", icon: ShieldAlert },
  { title: "AI-Native", icon: Code2 },
  { title: "Open Collaboration", icon: Users },
  { title: "Continuous Learning", icon: GraduationCap }
];

export default function CareerContact() {
  const [form, setForm] = useState({ 
    name: "", 
    email: "", 
    university: "", 
    role: "Internship", 
    linkedin: "",
    github: "",
    portfolio: "",
    resume: null 
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function update(field) {
    return (e) => setForm({ ...form, [field]: e.target.value });
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setForm({ ...form, resume: file });
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: "" });
    try {
      // In a real app, you'd use FormData for file uploads
      await api("/api/contact", { 
        method: "POST", 
        body: JSON.stringify({ 
          ...form, 
          resume: form.resume ? form.resume.name : "No file attached",
          subject: `Career Application: ${form.role}` 
        }) 
      });
      setStatus({
        type: "success",
        message: "Application transmitted! Our talent acquisition team will review your profile shortly."
      });
      setForm({ name: "", email: "", university: "", role: "Internship", linkedin: "", github: "", portfolio: "", resume: null });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative min-h-screen bg-white text-slate-900 pt-32 pb-24 overflow-hidden">
      {/* Structural Background */}
      <div className="absolute inset-0 bg-subtle-grid pointer-events-none opacity-40" />

      <div className="container-shell relative z-10">
        <div className="max-w-4xl mx-auto mb-20 text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              Talent Acquisition
            </div>
            <h1 className="text-6xl lg:text-8xl font-black tracking-tighter leading-tight text-slate-900 mb-8 whitespace-nowrap">
              Join the <span className="text-brandprimary">Vanguard.</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
              We're assembling a team of elite engineers and researchers to redefine the intersection of AI agents and cybersecurity.
            </p>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Benefits & Values */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-8">
              {careerBenefits.map((benefit, i) => (
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
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Our DNA</h3>
                <div className="grid grid-cols-2 gap-4">
                  {cultureValues.map((val) => (
                    <div key={val.title} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded bg-white border border-slate-200 flex items-center justify-center">
                        <val.icon size={12} className="text-slate-400" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">{val.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Application Form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.2}>
              <div className="bg-white border border-slate-200 rounded-3xl p-8 lg:p-12 shadow-soft relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-brandprimary opacity-10" />
                
                <div className="mb-10 flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Application Portal</h2>
                    <p className="text-slate-500 text-sm mt-1">Submit your engineering profile.</p>
                  </div>
                  <UserCheck className="text-slate-200" size={32} />
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Full Legal Name</label>
                      <input
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary font-medium"
                        placeholder=""
                        value={form.name}
                        onChange={update("name")}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Personal Email</label>
                      <input
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary font-medium"
                        placeholder=""
                        value={form.email}
                        onChange={update("email")}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">University / Org</label>
                      <input
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary font-medium"
                        placeholder=""
                        value={form.university}
                        onChange={update("university")}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Inquiry Type</label>
                      <select
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all focus:border-brandprimary appearance-none cursor-pointer font-bold"
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

                  <div className="grid sm:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">LinkedIn URL</label>
                      <input
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary font-medium"
                        placeholder=""
                        value={form.linkedin}
                        onChange={update("linkedin")}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">GitHub (Optional)</label>
                      <input
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary font-medium"
                        placeholder=""
                        value={form.github}
                        onChange={update("github")}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-8 items-end">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Portfolio (Optional)</label>
                      <input
                        className="w-full bg-transparent border-b border-slate-200 py-2 text-slate-900 outline-none transition-all placeholder:text-slate-300 focus:border-brandprimary font-medium"
                        placeholder=""
                        value={form.portfolio}
                        onChange={update("portfolio")}
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Resume / CV (PDF)</label>
                      <div className="relative">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                          className="hidden"
                          id="resume-upload"
                          required
                        />
                        <label 
                          htmlFor="resume-upload"
                          className="w-full flex items-center justify-between bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-100 transition-all border-dashed"
                        >
                          <span className="truncate">{form.resume ? form.resume.name : "Select PDF File"}</span>
                          <FileText size={16} className="text-slate-400" />
                        </label>
                      </div>
                    </div>
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
                      {submitting ? "Processing..." : "Transmit Application"}
                      <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </span>
                  </button>
                  
                  <div className="flex items-center justify-center gap-6 opacity-40">
                    <div className="flex items-center gap-2">
                      <Shield size={12} />
                      <span className="text-[8px] font-black uppercase tracking-widest">Secure Transmission</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award size={12} />
                      <span className="text-[8px] font-black uppercase tracking-widest">ISO Standard</span>
                    </div>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── Internship Enrollment Process ── */}
      <div className="mt-32 pt-24 border-t border-slate-100 bg-slate-50/50">
        <div className="container-shell">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-20">
            <Reveal>
              <div className="sticky top-32">
                <p className="text-[10px] font-black text-brandprimary uppercase tracking-[0.3em] mb-4">Operations</p>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-tight mb-6">
                  Internship <br />
                  <span className="text-brandprimary">Pipeline.</span>
                </h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed italic">
                  "Six clear steps from formal application to professional certification. We prioritize merit and technical rigor above all."
                </p>
              </div>
            </Reveal>

            <div className="grid md:grid-cols-2 gap-x-12 gap-y-12">
              {[
                { s: "Student Registration", d: "Submit application via the internship registration portal." },
                { s: "Verification", d: "Credentials and eligibility are verified by the HR/Operations team." },
                { s: "Domain Selection", d: "Student selects preferred domain (AI/ML or Cybersecurity)." },
                { s: "Project Assignment", d: "Student is assigned to a real company project with a domain mentor." },
                { s: "Mentorship & Monitoring", d: "Regular check-ins, task tracking, and performance evaluation." },
                { s: "Certification", d: "Successful interns receive a Certificate of Completion and LOR." }
              ].map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <div className="group flex gap-6">
                    <div className="shrink-0 w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-xs font-black text-slate-300 group-hover:bg-brandprimary group-hover:text-white group-hover:border-brandprimary transition-all duration-300">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-2">{step.s}</h4>
                      <p className="text-sm text-slate-500 font-medium leading-relaxed">{step.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Corporate Asset Section */}
      <div className="mt-32 bg-slate-900 py-32 text-white">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <Reveal delay={0.2}>
              <div className="relative group">
                <div className="absolute inset-0 bg-brandprimary/20 blur-[100px] opacity-20 pointer-events-none" />
                <div className="relative rounded-2xl overflow-hidden transition-all duration-1000 border border-slate-800">
                  <img 
                    src="/tech_office_collaboration_premium_1777889270846.png" 
                    alt="Team Collaboration" 
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="space-y-12">
                <h2 className="text-5xl font-black tracking-tighter leading-none">
                  Be part of the <br />
                  <span className="text-slate-500 italic">Next Wave.</span>
                </h2>
                <p className="text-xl text-slate-400 font-medium leading-relaxed">
                  We don't just hire for skills; we hire for obsession. If you spend your weekends fine-tuning models or hunting for Zero-Days, you belong at ConvoSec.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-800 bg-slate-700 overflow-hidden shadow-sm">
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Team member" className="" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="text-sm font-black text-white">Join our growing team</p>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">4 positions open this quarter</p>
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
