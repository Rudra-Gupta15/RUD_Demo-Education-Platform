import { useState } from "react";
import { Clock, SlidersHorizontal } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

const categories = ["All", "Generative AI", "AI & Machine Learning", "Data Science & Business Analytics", "Project Management", "Cyber Security", "Cloud Computing & DevOps"];

const allCourses = [
  // Generative AI
  { id: 1, category: "Generative AI", title: "Microsoft Applied Agentic AI: Systems Design & Impact", partner: "Microsoft", duration: "10 Weeks", badge: "Trending Now", logo: "Ⓜ️" },
  { id: 2, category: "Generative AI", title: "Microsoft Applied Generative AI Specialization", partner: "Microsoft", duration: "16 Weeks", badge: "Most Popular", logo: "Ⓜ️" },
  { id: 3, category: "Generative AI", title: "Advanced Executive Program In Applied Generative AI", partner: "IIT Pravartak", duration: "4 Months", badge: "Most Popular", logo: "🎓" },
  { id: 4, category: "Generative AI", title: "Michigan Engineering Applied Generative AI Specialization", partner: "Michigan Engineering", duration: "16 Weeks", badge: "New Launch", logo: "〽️" },
  { id: 5, category: "Generative AI", title: "Michigan Engineering Generative AI Applications for Leaders", partner: "Michigan Engineering", duration: "12 Weeks", badge: "", logo: "〽️" },
  { id: 6, category: "Generative AI", title: "Professional Certificate Course in Generative AI and Machine Learning", partner: "IIT Kanpur", duration: "11 Months", badge: "Trending Now", logo: "🎓" },
  { id: 7, category: "Generative AI", title: "Oxford Programme in Organising for AI", partner: "Oxford University", duration: "12 Weeks", badge: "New Launch", logo: "🏰" },
  
  // AI & Machine Learning
  { id: 8, category: "AI & Machine Learning", title: "Professional Certificate in Machine Learning and Deep Learning", partner: "IIT Kanpur", duration: "11 Months", badge: "Bestseller", logo: "🎓" },
  { id: 9, category: "AI & Machine Learning", title: "Machine Learning Engineering for Production (MLOps)", partner: "Google AI", duration: "12 Weeks", badge: "Trending Now", logo: "🇬" },
  { id: 10, category: "AI & Machine Learning", title: "Computer Vision and NLP with PyTorch", partner: "Daniel Bourke", duration: "6 Months", badge: "Premium", logo: "👁️" },
  { id: 11, category: "AI & Machine Learning", title: "TensorFlow Developer Certificate Bootcamp", partner: "Andrei Neagoie", duration: "8 Weeks", badge: "Bestseller", logo: "🤖" },

  // Data Science
  { id: 12, category: "Data Science & Business Analytics", title: "Data Science Professional Certificate", partner: "IBM", duration: "10 Months", badge: "Trending Now", logo: "ℹ️" },
  { id: 13, category: "Data Science & Business Analytics", title: "Business Analytics Specialization", partner: "Wharton", duration: "16 Weeks", badge: "Most Popular", logo: "🇼" },

  // Project Management
  { id: 14, category: "Project Management", title: "PMP Certification Training Course", partner: "PMI", duration: "8 Weeks", badge: "Bestseller", logo: "📋" },
  { id: 15, category: "Project Management", title: "Agile and Scrum Master Specialization", partner: "Scrum.org", duration: "6 Weeks", badge: "Trending", logo: "🔄" },

  // Cyber Security
  { id: 16, category: "Cyber Security", title: "Advanced Executive Program in Cybersecurity", partner: "IIT Bangalore", duration: "6 Months", badge: "Most Popular", logo: "🎓" },
  { id: 17, category: "Cyber Security", title: "CompTIA Security+ Complete Boot Camp", partner: "CompTIA", duration: "5 Weeks", badge: "Bestseller", logo: "🛡️" },
  { id: 18, category: "Cyber Security", title: "Certified Ethical Hacker (CEH) Masterclass", partner: "EC-Council", duration: "12 Weeks", badge: "Trending Now", logo: "💻" }
];

export default function Courses() {
  const [category, setCategory] = useState("All");

  const filteredCourses = category === "All" 
    ? allCourses 
    : allCourses.filter(c => c.category === category);

  return (
    <section className="container-shell min-h-screen py-16">
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
