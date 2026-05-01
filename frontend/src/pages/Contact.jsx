import { useState } from "react";
import { CheckCircle2, Mail, MapPin, MessageSquare, Send, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { api } from "../api/client.js";
import Reveal from "../components/Reveal.jsx";

const contactInfo = [
  { icon: Mail, label: "Email", value: "hello@convosec.ai", bg: "bg-indigo-50", color: "text-brandprimary" },
  { icon: MapPin, label: "Location", value: "Remote-first, worldwide", bg: "bg-cyan-50", color: "text-cyan" },
  { icon: Zap, label: "Response time", value: "Usually within 24 hours", bg: "bg-pink-50", color: "text-plasma" }
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
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
      await api("/api/contact", { method: "POST", body: JSON.stringify(form) });
      setStatus({
        type: "success",
        message: "Thanks! Your message has been saved and our team will respond soon."
      });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="container-shell min-h-screen pt-32 pb-16">
      {/* Hero Header */}
      <Reveal>
        <div className="max-w-2xl mb-12">
          <p className="eyebrow">Contact Us</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mt-3 leading-tight">
            Talk to ConvoSec AI about learning paths, projects, and collaboration.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 font-medium">
            Whether you're a student, a business needing AI solutions, or a college seeking workshops, we're ready to help you build the future.
          </p>
        </div>
      </Reveal>

      {/* Main Layout Grid */}
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">
        {/* Left Side: Form */}
        <Reveal delay={0.1}>
          <form className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-soft relative overflow-hidden" onSubmit={handleSubmit}>
            <div className="absolute inset-x-0 top-0 h-[4px] bg-brandprimary" />

            <h2 className="text-2xl font-extrabold text-slate-900">Send us a message</h2>
            <p className="text-slate-400 mt-1 text-sm font-medium">We usually reply in less than 24 hours.</p>

            <div className="mt-8 grid gap-6">
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Your name
                <input
                  id="contact-name"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:bg-white focus:border-brandprimary focus:ring-4 focus:ring-indigo-100 placeholder-slate-400"
                  placeholder="Priya Rao"
                  value={form.name}
                  onChange={update("name")}
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Email address
                <input
                  id="contact-email"
                  type="email"
                  className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:bg-white focus:border-brandprimary focus:ring-4 focus:ring-indigo-100 placeholder-slate-400"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={update("email")}
                  required
                />
              </label>
              <label className="grid gap-2 text-sm font-bold text-slate-700">
                Message
                <textarea
                  id="contact-message"
                  className="min-h-48 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition focus:bg-white focus:border-brandprimary focus:ring-4 focus:ring-indigo-100 placeholder-slate-400 resize-none"
                  placeholder="Tell us what you're building or learning..."
                  value={form.message}
                  onChange={update("message")}
                  required
                />
              </label>
            </div>

            <AnimatePresence>
              {status.message && (
                <motion.p
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`mt-6 rounded-xl p-4 text-sm font-medium ${
                    status.type === "success"
                      ? "border border-emerald-100 bg-emerald-50 text-emerald-700"
                      : "border border-red-100 bg-red-50 text-red-700"
                  }`}
                >
                  {status.message}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              id="contact-submit"
              disabled={submitting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brandprimary px-6 py-4 text-sm font-extrabold text-white shadow-soft transition-all duration-200 hover:bg-indigo-700 hover:shadow-md hover:-translate-y-0.5 w-full mt-6 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Sending..." : "Send Message"} <Send size={16} />
            </button>
          </form>
        </Reveal>

        {/* Right Side: Photo and Info */}
        <div className="flex flex-col gap-8">
          {/* Photo */}
          <Reveal delay={0.2}>
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] shadow-soft border border-slate-100 group">
              <img 
                src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=800&q=80" 
                alt="Support team" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent" />
            </div>
          </Reveal>

          {/* Contact Details */}
          <Reveal delay={0.3}>
            <div className="grid gap-4">
              {contactInfo.map(({ icon: Icon, label, value, bg, color }) => (
                <div key={label} className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-soft">
                  <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${bg} ${color}`}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</p>
                    <p className="mt-0.5 text-sm font-extrabold text-slate-700">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* What we help with */}
          <Reveal delay={0.4}>
            <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-brandprimary flex items-center gap-2">
                <MessageSquare size={14} />
                We can help with
              </p>
              <ul className="mt-4 grid gap-3">
                {[
                  "Course enrollment & pricing",
                  "Live cohort schedules",
                  "Corporate training programs",
                  "Collaboration & partnerships"
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
