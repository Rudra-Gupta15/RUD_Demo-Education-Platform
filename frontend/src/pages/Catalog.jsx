import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShieldCheck, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../state/CartContext.jsx";
import Reveal from "../components/Reveal.jsx";
import { demoCourses, dataScienceRoadmap } from "../data/courses.js";

const getCourseDescription = (course) => {
  const descriptions = {
    "AI & Machine Learning": "Master the core pillars of artificial intelligence, from Python automation to core ML algorithms and real-world implementation.",
    "Deep Learning": "An advanced program building on ML fundamentals, covering neural networks, deep learning architectures, and production deployment.",
    "Generative AI": "Master the art of deploying Generative AI models, focusing on LLM fine-tuning, RAG systems, and AI agent orchestration.",
    "Cybersecurity / VAPT": "Specialized cybersecurity training under the VAPT framework, covering Networking, Forensics, and Compliance.",
    "Cybersecurity": "Develop elite defense skills including ethical hacking, network auditing, and professional SOC analysis.",
    "Data & Business Analytics": "Transform raw data into actionable insights using advanced visualization and AI-driven business intelligence techniques."
  };
  return descriptions[course.topic] || "Comprehensive guide to mastering the core concepts and practical applications in this specialized technical field.";
};

const getCourseBullets = (course) => {
  const bullets = {
    "AI & Machine Learning": [
      "Master Python for data science and automation",
      "Implement supervised and unsupervised learning",
      "Solve real-world problems with ML models"
    ],
    "Deep Learning": [
      "Build and optimize complex neural networks",
      "Deploy AI systems at enterprise scale",
      "Master Computer Vision and NLP frameworks"
    ],
    "Generative AI": [
      "Deploy production-grade AI agents",
      "Optimize LLM costs and latency",
      "Build scalable RAG and vector search systems"
    ],
    "Cybersecurity / VAPT": [
      "Operate within the VAPT professional framework",
      "Investigate and resolve security incidents",
      "Conduct professional-grade security audits"
    ],
    "Cybersecurity": [
      "Perform advanced penetration testing",
      "Master network defense and SOC operations",
      "Identify and exploit system vulnerabilities"
    ],
    "Data & Business Analytics": [
      "Transform raw data into actionable insights",
      "Drive data-backed business decisions",
      "Master industry-standard visualization tools"
    ]
  };
  return bullets[course.topic] || [
    "Master core concepts and advanced techniques",
    "Gain hands-on experience through projects",
    "Prepare for industry certifications"
  ];
};

export default function Catalog() {
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const topics = [...new Set(demoCourses.map(c => c.topic))];
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        if (currentScrollY > lastScrollY.current) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = (e, course) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setHoveredCourse({
      ...course,
      rect: {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height
      }
    });
  };

  const handleMouseLeave = () => {
    setHoveredCourse(null);
  };

  return (
    <section className="min-h-screen pt-32 pb-16">
      {/* ── Fixed Floating Back Button ── */}
      <motion.button
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate('/learning')}
        className="fixed top-[84px] sm:top-[34px] left-4 sm:left-20 z-[110] w-12 h-12 sm:w-14 sm:h-14 bg-black text-white rounded-full flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] hover:bg-slate-800 active:scale-95 group"
        title="Go Back"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="absolute left-full ml-3 px-3 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl hidden sm:block">
          Go Back
        </span>
      </motion.button>

      {/* ── Main Page Header ── */}
      <div className="container-shell mb-16">
        <Reveal y={0}>
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
              What to <span className="text-blue-600">learn next</span>
            </h1>
            <p className="text-sm font-bold text-slate-400">Based on your interests in AI & Data Science</p>
          </div>
        </Reveal>
      </div>

      {/* ── Strategic Roadmap Subheader ── */}
      <div className="container-shell mb-10">
        <Reveal y={0}>
          <div className="max-w-4xl">
            <p className="text-xs font-black text-blue-600 uppercase tracking-[0.3em] mb-4">Strategic Learning Path</p>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Data Science & <span className="text-blue-600">AI Roadmap</span>
            </h2>
          </div>
        </Reveal>
      </div>

      {/* ── 8-Phase Roadmap: Horizontal Scroll ── */}
      <div className="container-shell mb-24">
        <div className="relative group">
          <div className="flex overflow-x-auto gap-8 pb-12 scrollbar-none snap-x snap-mandatory">
            {dataScienceRoadmap.map((phase, i) => {
              const phaseImages = [
                "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80", // 1
                "https://images.unsplash.com/photo-1518186239751-2477cf795151?auto=format&fit=crop&w=800&q=80", // 2
                "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80", // 3
                "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80", // 4
                "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80", // 5
                "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80", // 6
                "https://images.unsplash.com/photo-1605752683031-c4e1a6c5085a?auto=format&fit=crop&w=800&q=80", // 7
                "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&w=800&q=80", // 8
              ];

              return (
                <div
                  key={phase.phase}
                  onClick={() => navigate(`/courses/${phase.slug}`)}
                  className="flex-shrink-0 w-[300px] group flex flex-col bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer snap-start overflow-hidden rounded-xl active:scale-[0.98]"
                >
                  {/* Thumbnail Image */}
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={phaseImages[i]}
                      alt={phase.title}
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
                      }}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center font-black text-xs text-blue-600 shadow-sm border border-white/20">
                      {phase.phase}
                    </div>
                    {phase.isHot && (
                      <div className="absolute top-3 left-3 bg-amber-400 text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight shadow-sm">
                        Bestseller
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-3.5 flex-1 flex flex-col">
                    <h3 className="text-[15px] font-bold text-slate-900 leading-tight mb-1 line-clamp-1">
                      {phase.title}
                    </h3>
                    <p className="text-[10px] text-slate-500 font-medium mb-2">
                      RUD-Demo Engineering
                    </p>

                    {/* Rating Mockup */}
                    <div className="flex items-center gap-1 mb-3">
                      <span className="text-[11px] font-bold text-amber-700">4.9</span>
                      <div className="flex items-center text-amber-500 text-[8px]">
                        {"★".repeat(5)}
                      </div>
                      <span className="text-[9px] text-slate-400">(2.4k)</span>
                    </div>

                    {/* Topics List (Compact) */}
                    <div className="space-y-1.5 mb-4 flex-1">
                      {phase.topics.map((topic, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-blue-500/50 flex-shrink-0" />
                          <p className="text-[10px] font-bold text-slate-700 line-clamp-1">{topic.name}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
                      <div className="flex flex-row items-center gap-2">
                        <span className="text-base font-black text-slate-900">₹{499 + (i * 100)}</span>
                        <span className="text-[9px] text-slate-400 line-through font-bold">₹{1299}</span>
                      </div>
                      <span className="text-[8px] font-black text-blue-600 uppercase tracking-widest px-2 py-1 rounded-md bg-blue-50 border border-blue-100">
                        P{phase.phase}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* ── Course Inventory: Horizontal Scroll ── */}
      <div className="container-shell space-y-24">
        {topics.map((topic) => (
          <div key={topic} className="space-y-8">
            <Reveal y={0}>
              <div className="flex items-center gap-4">
                <h3 className="text-xl font-black text-slate-900">{topic} Roadmap</h3>
                <div className="h-px flex-1 bg-slate-100" />
                <button className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
              </div>
            </Reveal>

            <div className="relative group">
              <div className="flex overflow-x-auto gap-8 pb-12 scrollbar-none snap-x snap-mandatory">
                {demoCourses
                  .filter((c) => c.topic === topic)
                  .map((course) => (
                    <div
                      key={course.id}
                      className="flex-shrink-0 w-[280px] group flex flex-col bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer snap-start overflow-hidden"
                      onMouseEnter={(e) => handleMouseEnter(e, course)}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => navigate(`/courses/${course.slug || "python-ai-data-science"}`)}
                    >
                      {/* Thumbnail */}
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={course.image}
                          alt={course.title}
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
                          }}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
                          {course.level || "Expert"}
                        </div>
                        {course.rating > 4.8 && (
                          <div className="absolute top-4 left-4 bg-amber-400 text-black px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tight shadow-sm">
                            Bestseller
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4 flex flex-col flex-1">
                        <h4 className="text-sm font-bold text-slate-900 leading-tight mb-1 line-clamp-1">
                          {course.title}
                        </h4>
                        <p className="text-[10px] text-slate-500 font-medium mb-2">
                          {course.instructor}
                        </p>

                        <div className="mt-auto">
                          <div className="flex items-center gap-1.5 mb-3">
                            <span className="text-[11px] font-bold text-amber-700">{course.rating}</span>
                            <div className="flex items-center text-amber-500 text-[8px]">
                              {"★".repeat(Math.floor(course.rating))}
                            </div>
                            <span className="text-[9px] text-slate-400">({course.reviews})</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="text-base font-black text-slate-900">{course.price === "TBC" ? "₹849" : course.price}</span>
                              <span className="text-[10px] text-slate-300 line-through font-bold">₹{course.originalPrice === "TBC" ? "3,499" : course.originalPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Course Popup */}
      <AnimatePresence>
        {hoveredCourse && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 bg-white rounded-2xl shadow-2xl p-6 border border-slate-200 max-w-sm pointer-events-auto"
            style={{
              top: Math.max(16, Math.min(window.innerHeight - 450, hoveredCourse.rect.top)),
              left: hoveredCourse.rect.right + 16 > window.innerWidth - 400
                ? hoveredCourse.rect.left - 400
                : hoveredCourse.rect.right + 16,
            }}
            onMouseEnter={() => setHoveredCourse(hoveredCourse)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Arrow */}
            <div
              className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-l border-b border-slate-200 rotate-45 ${hoveredCourse.rect.right + 16 > window.innerWidth - 400
                ? "right-[-6px] rotate-[225deg] border-l-0 border-b-0 border-r border-t"
                : "left-[-6px]"
                }`}
            />

            {/* Title */}
            <h3 className="text-base font-extrabold text-slate-900 leading-snug">
              {hoveredCourse.title}
            </h3>

            {/* Badges & Meta */}
            <div className="flex items-center gap-3 mt-2 text-xs">
              <span className="bg-black text-white font-bold px-2.5 py-1 rounded-md text-[10px] flex items-center gap-1 shadow-sm">
                <ShieldCheck size={12} className="stroke-[2.5]" />
                Premium
              </span>
              <span className="text-emerald-600 font-extrabold">Updated April 2025</span>
            </div>

            <div className="flex items-center gap-2 mt-3 text-xs font-bold text-slate-500">
              <span>36.5 total hours</span>
              <span>•</span>
              <span>Beginner Level</span>
              <span>•</span>
              <span>Subtitles</span>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-xs mt-3 leading-relaxed">
              {getCourseDescription(hoveredCourse)}
            </p>

            {/* Bullet Points */}
            <ul className="mt-4 space-y-3">
              {getCourseBullets(hoveredCourse).map((bullet, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <span className="text-slate-900 mt-1 flex-shrink-0">
                    <svg className="w-3.5 h-3.5 text-slate-800 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 5" />
                    </svg>
                  </span>
                  <span className="leading-tight">{bullet}</span>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => {
                  addToCart(hoveredCourse);
                }}
                className="flex-1 bg-black hover:bg-slate-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-all duration-200 active:scale-95 shadow-md shadow-slate-100"
              >
                Add to cart
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-slate-200 text-black hover:bg-slate-50 transition-all duration-200">
                <Heart size={18} className="text-black" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Course Detail Modal */}
      <AnimatePresence>
        {expandedCourse && (
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4 md:p-12 overflow-y-auto animate-fade-in">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedCourse(null)}
                className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold text-lg transition"
              >
                &times;
              </button>

              {/* Left Side Content */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                <span className="text-xs font-bold uppercase tracking-wider text-black bg-slate-100 px-3 py-1 rounded-full">
                  {expandedCourse.topic}
                </span>

                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-4 leading-tight">
                  {expandedCourse.title}
                </h2>

                <p className="text-slate-600 text-sm mt-4 leading-relaxed">
                  {getCourseDescription(expandedCourse)}
                </p>

                <p className="text-xs text-slate-400 mt-2 font-medium">
                  Created by <span className="font-bold text-slate-700">{expandedCourse.instructor}</span>
                </p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mt-4">
                  <span className="text-sm font-bold text-amber-700">{expandedCourse.rating}</span>
                  <div className="flex items-center text-amber-500 text-sm">
                    {"★".repeat(Math.round(expandedCourse.rating))}
                    <span className="text-slate-200">
                      {"★".repeat(5 - Math.round(expandedCourse.rating))}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">({expandedCourse.reviews.toLocaleString()} ratings)</span>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {expandedCourse.badges.map((badge) => (
                    <span
                      key={badge}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md ${badge === "Premium"
                        ? "bg-black text-white"
                        : "bg-teal-100 text-teal-700"
                        }`}
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                {/* What you'll learn */}
                <div className="mt-10 border-t border-slate-100 pt-6">
                  <h3 className="text-lg font-extrabold text-slate-900 mb-4">What you'll learn</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {getCourseBullets(expandedCourse).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs font-medium text-slate-600">
                        <span className="text-black mt-0.5 flex-shrink-0">
                          <svg className="w-4 h-4 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 5" />
                          </svg>
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right Side Sticky Card */}
              <div className="w-full md:w-[340px] bg-slate-50 p-8 border-t md:border-t-0 md:border-l border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm mb-6">
                    <img
                      src={expandedCourse.image}
                      alt={expandedCourse.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-lg cursor-pointer transition duration-200">
                        <svg className="w-6 h-6 text-slate-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-3xl font-black text-slate-900">{expandedCourse.price}</span>
                    <span className="text-sm text-slate-400 line-through font-medium">{expandedCourse.originalPrice}</span>
                  </div>

                  <p className="text-black text-xs font-bold mb-6">
                    Special introductory price!
                  </p>
                </div>

                <div className="space-y-3 mt-auto">
                  <button
                    onClick={() => {
                      addToCart(expandedCourse);
                      setExpandedCourse(null);
                    }}
                    className="w-full bg-black hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-slate-100"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => {
                      addToCart(expandedCourse);
                      setExpandedCourse(null);
                      navigate("/checkout");
                    }}
                    className="w-full border-2 border-slate-200 hover:border-slate-300 font-bold py-3 px-4 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition duration-200"
                  >
                    Buy now
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
