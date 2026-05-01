import { useState } from "react";
import { Clock, SlidersHorizontal } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

const categories = ["All", "AI Fundamentals", "Cybersecurity", "Integrated AI-Security", "Professional Tracks"];

const allCourses = [
  // AI Fundamentals
  { id: 1, category: "AI Fundamentals", title: "Python for Artificial Intelligence & Data Science", partner: "ConvoSec Academy", duration: "8 Weeks", badge: "Core", logo: "🐍" },
  { id: 2, category: "AI Fundamentals", title: "Deep Learning & Neural Network Architectures", partner: "ConvoSec Academy", duration: "12 Weeks", badge: "Trending Now", logo: "🧠" },
  { id: 3, category: "AI Fundamentals", title: "LLM Engineering & Generative AI Systems", partner: "ConvoSec Academy", duration: "10 Weeks", badge: "Most Popular", logo: "✨" },
  
  // Cybersecurity
  { id: 4, category: "Cybersecurity", title: "Ethical Hacking & Network Security Essentials", partner: "ConvoSec Academy", duration: "10 Weeks", badge: "Bestseller", logo: "🛡️" },
  { id: 5, category: "Cybersecurity", title: "SOC Analysis & Incident Response Training", partner: "ConvoSec Academy", duration: "12 Weeks", badge: "New Launch", logo: "👁️" },
  { id: 6, category: "Cybersecurity", title: "Advanced Penetration Testing & Exploit Development", partner: "ConvoSec Academy", duration: "16 Weeks", badge: "Elite", logo: "💻" },
  
  // Integrated AI-Security
  { id: 7, category: "Integrated AI-Security", title: "AI-Powered Threat Intelligence & Anomaly Detection", partner: "ConvoSec Academy", duration: "14 Weeks", badge: "Unique", logo: "🚀" },
  { id: 8, category: "Integrated AI-Security", title: "Building AI-Driven Vulnerability Scanners", partner: "ConvoSec Academy", duration: "12 Weeks", badge: "Hands-on", logo: "🔍" },
  { id: 9, category: "Integrated AI-Security", title: "Defending Against AI-Powered Cyber Attacks", partner: "ConvoSec Academy", duration: "10 Weeks", badge: "Frontier", logo: "⚔️" },

  // Professional Tracks
  { id: 10, category: "Professional Tracks", title: "Certified AI + Cybersecurity Professional (CACP)", partner: "ConvoSec AI", duration: "6 Months", badge: "Full Career", logo: "🎓" },
  { id: 11, category: "Professional Tracks", title: "Corporate Digital Defense Bootcamp", partner: "ConvoSec AI", duration: "4 Weeks", badge: "Corporate", logo: "🏢" }
];

export default function Courses() {
  const [category, setCategory] = useState("All");

  const filteredCourses = category === "All" 
    ? allCourses 
    : allCourses.filter(c => c.category === category);

  return (
    <section className="container-shell min-h-screen pt-32 pb-16">
      <Reveal>
        <p className="eyebrow">Courses</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mt-3 leading-tight">
          AI and cybersecurity programs with real lab momentum.
        </h1>
      </Reveal>

      {/* Filters */}
      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-slate-100 bg-white p-4 md:flex-row md:items-center md:justify-between shadow-soft">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-700">
          <SlidersHorizontal size={18} /> Filter by Category
        </div>
        <div className="flex flex-wrap gap-3">
          <select
            id="course-category-filter"
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 focus:bg-white focus:border-brandprimary focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course, index) => (
          <Reveal key={course.id} delay={index * 0.05}>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-soft flex flex-col h-full group hover:shadow-md hover:border-slate-200 transition-all duration-300">
              {/* Partner Logo */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">{course.logo}</span>
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">{course.partner}</span>
              </div>

              {/* Title */}
              <h4 className="text-base font-extrabold text-slate-800 leading-snug flex-1 group-hover:text-brandprimary transition-colors">
                {course.title}
              </h4>

              {/* Bottom Duration & Badge */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-50">
                <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                  <Clock size={14} /> {course.duration}
                </span>
                {course.badge && (
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-md ${
                    course.badge === "Trending Now" ? "bg-emerald-50 text-emerald-700" :
                    course.badge === "Most Popular" ? "bg-orange-50 text-orange-700" : "bg-indigo-50 text-indigo-700"
                  }`}>
                    {course.badge}
                  </span>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
