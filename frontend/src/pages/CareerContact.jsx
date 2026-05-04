import { useState } from "react";
import { CheckCircle2, Mail, Send, GraduationCap, Briefcase, FileText, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/client.js";
import Reveal from "../components/Reveal.jsx";

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
        message: "Application submitted! Our recruitment team will review your profile and get back to you if there's a match."
      });
      setForm({ name: "", email: "", university: "", role: "Internship", portfolio: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container-shell min-h-screen pt-32 pb-16 bg-[#fafafa]">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <Reveal>
          <div className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            <UserCheck size={14} /> Join the elite
          </div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-7xl leading-[1.05]">
            Build your career at the <span className="text-brandprimary">frontier of AI.</span>
          </h1>
          <p className="mt-8 text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            We're looking for high-energy interns and developers who want to push the boundaries of AI agents and cybersecurity defense.
          </p>
        </Reveal>
      </div>

      <div className="max-w-4xl mx-auto">
        <Reveal delay={0.2}>
          <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-indigo-100/50">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <label className="block space-y-2">
                  <span className="text-sm font-black text-slate-800 flex items-center gap-2">
                    Full Name <span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-brandprimary transition-all font-medium"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={update("name")}
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-black text-slate-800 flex items-center gap-2">
                    Personal Email <span className="text-red-500">*</span>
                  </span>
                  <input
                    required
                    type="email"
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-brandprimary transition-all font-medium"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={update("email")}
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <label className="block space-y-2">
                  <span className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <GraduationCap size={16} /> University / Organization
                  </span>
                  <input
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-brandprimary transition-all font-medium"
                    placeholder="MIT, IIT, or Independent"
                    value={form.university}
                    onChange={update("university")}
                  />
                </label>
                <label className="block space-y-2">
                  <span className="text-sm font-black text-slate-800 flex items-center gap-2">
                    <Briefcase size={16} /> Interested In
                  </span>
                  <select
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-brandprimary transition-all font-black"
                    value={form.role}
                    onChange={update("role")}
                  >
                    <option value="Internship">Internship (3-6 Months)</option>
                    <option value="Full-time">Full-time Role</option>
                    <option value="Freelance">Project-based Freelance</option>
                    <option value="Mentorship">Mentorship Program</option>
                  </select>
                </label>
              </div>

              <label className="block space-y-2">
                <span className="text-sm font-black text-slate-800 flex items-center gap-2">
                  <FileText size={16} /> Portfolio / GitHub / LinkedIn Link
                </span>
                <input
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-brandprimary transition-all font-medium"
                  placeholder="https://github.com/yourusername"
                  value={form.portfolio}
                  onChange={update("portfolio")}
                />
              </label>

              <label className="block space-y-2">
                <span className="text-sm font-black text-slate-800 flex items-center gap-2">
                  Tell us about your most impressive project
                </span>
                <textarea
                  className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white focus:border-brandprimary transition-all min-h-[160px] resize-none font-medium"
                  placeholder="What did you build? What was the outcome?"
                  value={form.message}
                  onChange={update("message")}
                  required
                />
              </label>

              <AnimatePresence>
                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-6 rounded-2xl text-sm font-bold flex items-center gap-3 ${
                      status.type === "success" 
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-100" 
                        : "bg-red-50 text-red-800 border border-red-100"
                    }`}
                  >
                    <CheckCircle2 size={20} className={status.type === "success" ? "text-emerald-500" : "text-red-500"} />
                    {status.message}
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                disabled={submitting}
                className="w-full bg-brandprimary hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-100 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 text-lg"
              >
                {submitting ? "Submitting..." : "Apply Now"} <Send size={20} />
              </button>
            </form>
          </div>
        </Reveal>

        {/* Benefits Grid */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 px-4">
          {[
            { title: "Cutting Edge", desc: "Work on real-world AI agents and cybersecurity defense systems." },
            { title: "Mentorship", desc: "Direct guidance from industry veterans at ConvoSec AI." },
            { title: "Impact", desc: "Your code and research will reach thousands of learners globally." }
          ].map((item, i) => (
            <Reveal key={i} delay={0.4 + i * 0.1}>
              <div className="text-center space-y-3">
                <h3 className="text-lg font-black text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
