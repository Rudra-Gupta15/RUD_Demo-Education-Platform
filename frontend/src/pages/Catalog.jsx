import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShieldCheck, ArrowLeft, Clock, BarChart2, Subtitles } from "lucide-react";
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
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        if (data.courses?.length > 0) {
          setCourses(data.courses);
        } else {
          setCourses(demoCourses);
        }
      } catch (err) {
        setCourses(demoCourses);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const topics = [...new Set(courses.map(c => c.topic || c.category))];

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY.current);
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

  const handleMouseLeave = () => setHoveredCourse(null);

  const phaseImages = [
    "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518186239751-2477cf795151?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1605752683031-c4e1a6c5085a?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&w=800&q=80",
  ];

  return (
    <section className="min-h-screen bg-slate-50 pt-28 pb-20">

      {/* ── Floating Back Button ── */}
      <motion.button
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate('/learning')}
        className="fixed top-[84px] sm:top-[34px] left-4 sm:left-16 z-[110] w-11 h-11 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shadow-md hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95 group transition-all duration-200"
        title="Go Back"
      >
        <ArrowLeft size={17} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
      </motion.button>

      {/* ── Page Header ── */}
      <div className="container-shell mb-14">
        <Reveal y={0}>
          <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.35em] mb-3">Course Catalog</p>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-3">
            What to <span className="text-blue-600">learn next</span>
          </h1>
          <p className="text-sm text-slate-400 font-medium">Curated for your interest in AI & Data Science</p>
        </Reveal>
      </div>

      {/* ── Roadmap Section ── */}
      <div className="container-shell mb-16">
        <Reveal y={0}>
          <div className="flex items-end justify-between mb-6">
            <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1.5">Strategic Learning Path</p>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                Data Science & <span className="text-blue-600">AI Roadmap</span>
              </h2>
            </div>
            <span className="text-[11px] font-bold text-slate-400 hidden sm:block">8 phases · scroll →</span>
          </div>
        </Reveal>

        {/* Roadmap Cards */}
        <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-none snap-x snap-mandatory -mx-1 px-1">
          {dataScienceRoadmap.map((phase, i) => (
            <div
              key={phase.phase}
              onClick={() => navigate(`/courses/${phase.slug}`)}
              className="flex-shrink-0 w-[260px] group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer snap-start flex flex-col"
            >
              {/* Image */}
              <div className="relative h-36 overflow-hidden">
                <img
                  src={phaseImages[i]}
                  alt={phase.title}
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
                  }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Phase badge */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-slate-900 text-[10px] font-black px-2.5 py-1 rounded-full shadow-sm">
                  Phase {phase.phase}
                </div>

                {phase.isHot && (
                  <div className="absolute top-3 right-3 bg-amber-400 text-amber-900 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                    Bestseller
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1 line-clamp-2">
                  {phase.title}
                </h3>
                <p className="text-[10px] font-semibold text-slate-400 mb-3">RUD-Demo Engineering</p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  <span className="text-[11px] font-bold text-amber-600">4.9</span>
                  <span className="text-amber-400 text-[9px] leading-none">★★★★★</span>
                  <span className="text-[9px] text-slate-400">(2.4k)</span>
                </div>

                {/* Topics */}
                <div className="space-y-1 mb-4 flex-1">
                  {phase.topics.slice(0, 3).map((topic, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400 flex-shrink-0" />
                      <p className="text-[10px] font-semibold text-slate-600 line-clamp-1">{topic.name}</p>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-auto">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-base font-black text-slate-900">₹{499 + (i * 100)}</span>
                    <span className="text-[10px] text-slate-300 line-through font-medium">₹1,299</span>
                  </div>
                  <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform text-xs font-black">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Course Inventory ── */}
      <div className="container-shell space-y-16">
        {topics.map((topic) => (
          <div key={topic}>
            <Reveal y={0}>
              <div className="flex items-center gap-4 mb-7">
                <h3 className="text-lg font-black text-slate-900 whitespace-nowrap">{topic}</h3>
                <div className="h-px flex-1 bg-slate-200" />
                <button className="text-[11px] font-black text-blue-600 uppercase tracking-widest hover:underline whitespace-nowrap">
                  View All
                </button>
              </div>
            </Reveal>

            <div className="flex overflow-x-auto gap-5 pb-4 scrollbar-none snap-x snap-mandatory -mx-1 px-1">
              {courses
                .filter((c) => (c.topic || c.category) === topic)
                .map((course) => (
                  <div
                    key={course.id}
                    className="flex-shrink-0 w-[264px] group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer snap-start flex flex-col"
                    onMouseEnter={(e) => handleMouseEnter(e, course)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => navigate(`/courses/${course.slug || "python-ai-data-science"}`)}
                  >
                    {/* Thumbnail */}
                    <div className="relative h-36 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        onError={(e) => {
                          e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
                        }}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-slate-800 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide shadow-sm">
                        {course.level || "Expert"}
                      </div>
                      {course.rating > 4.8 && (
                        <div className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wide">
                          Bestseller
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col flex-1">
                      <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1 line-clamp-2">
                        {course.title}
                      </h4>
                      <p className="text-[10px] font-semibold text-slate-400 mb-3">{course.instructor}</p>

                      <div className="mt-auto">
                        <div className="flex items-center gap-1.5 mb-3">
                          <span className="text-[11px] font-bold text-amber-600">{course.rating}</span>
                          <span className="text-amber-400 text-[9px] leading-none">
                            {"★".repeat(Math.floor(course.rating))}
                          </span>
                          <span className="text-[9px] text-slate-400">({course.reviews})</span>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                          <div className="flex items-baseline gap-2">
                            <span className="text-base font-black text-slate-900">
                              {course.price === "TBC" ? "₹849" : course.price}
                            </span>
                            <span className="text-[10px] text-slate-300 line-through font-medium">
                              ₹{course.originalPrice === "TBC" ? "3,499" : course.originalPrice}
                            </span>
                          </div>
                          <span className="text-blue-600 group-hover:translate-x-0.5 transition-transform text-xs font-black">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Hover Popup ── */}
      <AnimatePresence>
        {hoveredCourse && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-50 w-[340px] bg-white rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18)] border border-slate-100 overflow-hidden pointer-events-auto"
            style={{
              top: Math.max(16, Math.min(window.innerHeight - 480, hoveredCourse.rect.top)),
              left: hoveredCourse.rect.right + 16 > window.innerWidth - 360
                ? hoveredCourse.rect.left - 356
                : hoveredCourse.rect.right + 16,
            }}
            onMouseEnter={() => setHoveredCourse(hoveredCourse)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-700" />

            <div className="p-5">
              {/* Header */}
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-1">
                  <h3 className="text-[15px] font-extrabold text-slate-900 leading-snug mb-1.5">
                    {hoveredCourse.title}
                  </h3>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-slate-900 text-white text-[9px] font-black px-2 py-1 rounded-md">
                      <ShieldCheck size={10} />
                      Premium
                    </span>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Updated Apr 2025
                    </span>
                  </div>
                </div>
              </div>

              {/* Meta row */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5 text-slate-500">
                  <Clock size={11} className="flex-shrink-0" />
                  <span className="text-[10px] font-semibold">36.5 hrs</span>
                </div>
                <div className="w-px h-3 bg-slate-200" />
                <div className="flex items-center gap-1.5 text-slate-500">
                  <BarChart2 size={11} className="flex-shrink-0" />
                  <span className="text-[10px] font-semibold">Beginner</span>
                </div>
                <div className="w-px h-3 bg-slate-200" />
                <span className="text-[10px] font-semibold text-slate-500">Subtitles</span>
              </div>

              {/* Description */}
              <p className="text-[12px] text-slate-600 leading-relaxed mb-4">
                {getCourseDescription(hoveredCourse)}
              </p>

              {/* Bullets */}
              <ul className="space-y-2.5 mb-5">
                {getCourseBullets(hoveredCourse).map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-blue-600 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 5" />
                      </svg>
                    </span>
                    <span className="text-[12px] text-slate-700 leading-snug">{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => addToCart(hoveredCourse)}
                  className="flex-1 bg-slate-900 hover:bg-blue-600 text-white font-bold py-2.5 px-4 rounded-xl text-[12px] transition-all duration-200 active:scale-95"
                >
                  Add to cart
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-xl border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 hover:bg-rose-50 transition-all duration-200">
                  <Heart size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Expanded Course Modal ── */}
      <AnimatePresence>
        {expandedCourse && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[999] flex items-center justify-center p-4 md:p-12 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.2 }}
              className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]"
            >
              <button
                onClick={() => setExpandedCourse(null)}
                className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-lg transition"
              >
                ×
              </button>

              {/* Left */}
              <div className="flex-1 p-8 md:p-12 overflow-y-auto">
                <span className="text-[10px] font-black uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {expandedCourse.topic}
                </span>

                <h2 className="text-2xl md:text-3xl font-black text-slate-900 mt-4 mb-3 leading-tight">
                  {expandedCourse.title}
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed mb-2">
                  {getCourseDescription(expandedCourse)}
                </p>
                <p className="text-xs text-slate-400 font-medium mb-4">
                  By <span className="font-bold text-slate-600">{expandedCourse.instructor}</span>
                </p>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-sm font-bold text-amber-600">{expandedCourse.rating}</span>
                  <span className="text-amber-400 text-sm">{"★".repeat(Math.round(expandedCourse.rating))}</span>
                  <span className="text-xs text-slate-400">({expandedCourse.reviews?.toLocaleString()} ratings)</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {expandedCourse.badges?.map((badge) => (
                    <span key={badge} className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${badge === "Premium" ? "bg-slate-900 text-white" : "bg-teal-50 text-teal-700"}`}>
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="border-t border-slate-100 pt-7">
                  <h3 className="text-base font-extrabold text-slate-900 mb-5">What you'll learn</h3>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {getCourseBullets(expandedCourse).map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs text-slate-600">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full bg-blue-50 flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-blue-600 stroke-[3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 5" />
                          </svg>
                        </span>
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Right sticky panel */}
              <div className="w-full md:w-[320px] bg-slate-50 border-t md:border-t-0 md:border-l border-slate-100 p-7 flex flex-col gap-6">
                <div className="aspect-[16/10] overflow-hidden rounded-xl border border-slate-200 relative bg-slate-100 shadow-sm">
                  <img src={expandedCourse.image} alt={expandedCourse.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center cursor-pointer">
                      <svg className="w-5 h-5 text-slate-800 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-baseline gap-2.5 mb-1">
                    <span className="text-3xl font-black text-slate-900">{expandedCourse.price}</span>
                    <span className="text-sm text-slate-300 line-through">{expandedCourse.originalPrice}</span>
                  </div>
                  <p className="text-[11px] font-bold text-blue-600">Special introductory price</p>
                </div>

                <div className="space-y-2.5 mt-auto">
                  <button
                    onClick={() => { addToCart(expandedCourse); setExpandedCourse(null); }}
                    className="w-full bg-slate-900 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all duration-200 active:scale-95"
                  >
                    Add to cart
                  </button>
                  <button
                    onClick={() => { addToCart(expandedCourse); setExpandedCourse(null); navigate("/checkout"); }}
                    className="w-full border border-slate-200 hover:border-slate-300 font-bold py-3 px-4 rounded-xl text-sm text-slate-700 hover:bg-slate-100 transition duration-200"
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