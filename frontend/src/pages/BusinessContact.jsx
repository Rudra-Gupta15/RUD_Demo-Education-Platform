import { useState } from "react";
import { CheckCircle2, Mail, MapPin, MessageSquare, Send, Building2, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/client.js";
import Reveal from "../components/Reveal.jsx";

const contactInfo = [
  { icon: Mail, label: "Business Inquiries", value: "partners@convosec.ai", bg: "bg-indigo-50", color: "text-brandprimary" },
  { icon: Building2, label: "Corporate Office", value: "Bangalore, India", bg: "bg-cyan-50", color: "text-cyan" },
  { icon: Briefcase, label: "Partnerships", value: "B2B & Institutional", bg: "bg-pink-50", color: "text-plasma" }
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
        message: "Request received! Our business development team will reach out to you within 24 hours."
      });
      setForm({ name: "", company: "", email: "", industry: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container-shell min-h-screen pt-32 pb-16 bg-white">
      {/* Hero Header */}
      <Reveal>
        <div className="max-w-3xl mb-12">
          <p className="eyebrow text-indigo-600">Business Partnership</p>
          <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-6xl mt-3 leading-[1.1]">
            Scale your team with elite <span className="text-brandprimary">AI & Cyber</span> capabilities.
          </h1>
          <p className="mt-6 text-xl leading-8 text-slate-600 font-medium max-w-2xl">
            We partner with enterprises, startups, and institutions to deliver specialized training, security auditing, and AI implementation services.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] items-start">
        {/* Contact Form */}
        <Reveal delay={0.1}>
          <form className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 sm:p-12 shadow-xl relative overflow-hidden" onSubmit={handleSubmit}>
            <div className="absolute inset-x-0 top-0 h-[6px] bg-brandprimary" />

            <div className="grid gap-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-slate-800">
                  Full Name
                  <input
                    className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:ring-4 focus:ring-indigo-100 focus:border-brandprimary"
                    placeholder="E.g. Vikram Sharma"
                    value={form.name}
                    onChange={update("name")}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-800">
                  Company Name
                  <input
                    className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:ring-4 focus:ring-indigo-100 focus:border-brandprimary"
                    placeholder="E.g. TechCorp Solutions"
                    value={form.company}
                    onChange={update("company")}
                    required
                  />
                </label>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <label className="grid gap-2 text-sm font-bold text-slate-800">
                  Work Email
                  <input
                    type="email"
                    className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:ring-4 focus:ring-indigo-100 focus:border-brandprimary"
                    placeholder="vikram@techcorp.com"
                    value={form.email}
                    onChange={update("email")}
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-bold text-slate-800">
                  Industry
                  <select
                    className="rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:ring-4 focus:ring-indigo-100 focus:border-brandprimary"
                    value={form.industry}
                    onChange={update("industry")}
                    required
                  >
                    <option value="">Select Industry</option>
                    <option value="SaaS">SaaS / Software</option>
                    <option value="Fintech">Fintech & Banking</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Education">Education / University</option>
                    <option value="Cybersecurity">Cybersecurity Firm</option>
                    <option value="Other">Other</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm font-bold text-slate-800">
                How can we help your business?
                <textarea
                  className="min-h-32 rounded-xl border border-slate-200 bg-white px-4 py-4 text-slate-900 outline-none transition focus:ring-4 focus:ring-indigo-100 focus:border-brandprimary resize-none"
                  placeholder="Describe your requirements (e.g., Corporate training for 50 developers...)"
                  value={form.message}
                  onChange={update("message")}
                  required
                />
              </label>
            </div>

            <AnimatePresence>
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className={`mt-6 rounded-xl p-4 text-sm font-bold ${
                    status.type === "success"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                      : "bg-red-50 text-red-700 border border-red-100"
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-black px-8 py-5 text-base font-black text-white shadow-xl transition-all duration-300 hover:bg-slate-800 hover:-translate-y-1 w-full mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Processing..." : "Submit Inquiry"} <Send size={20} />
            </button>
          </form>
        </Reveal>

        {/* Info Column */}
        <div className="space-y-8">
          <Reveal delay={0.2}>
            <div className="bg-white border border-slate-100 p-8 rounded-[2rem] shadow-soft space-y-6">
              <h3 className="text-xl font-black text-slate-900">Why partner with us?</h3>
              <ul className="space-y-4">
                {[
                  "Curriculum tailored to your tech stack",
                  "Direct access to vetted AI & Cyber talent",
                  "Scalable B2B pricing & dedicated support",
                  "Project-based assessments for your team"
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-slate-600 font-bold text-sm">
                    <CheckCircle2 size={18} className="text-indigo-600 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid gap-4">
              {contactInfo.map(({ icon: Icon, label, value, bg, color }) => (
                <div key={label} className="flex items-center gap-5 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                  <div className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl ${bg} ${color} shadow-sm`}>
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{label}</p>
                    <p className="mt-1 text-sm font-black text-slate-800">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.4}>
            <div className="relative rounded-[2rem] overflow-hidden aspect-video shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80" 
                alt="Partnership meeting" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-indigo-600/10 mix-blend-multiply" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
