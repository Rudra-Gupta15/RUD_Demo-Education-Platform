import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart, ShieldCheck, ArrowLeft, Clock, BarChart2,
  Search, X, ShoppingCart, User, Building, Route, CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../state/CartContext.jsx";
import Reveal from "../components/Reveal.jsx";
import SEO from "../components/SEO.jsx";
import { demoCourses, dataScienceRoadmap, cyberSecurityRoadmap } from "../data/courses.js";

/* ─── helpers ─────────────────────────────────────────── */
const parsePrice = (s) => parseInt((s || "0").replace(/[₹,]/g, ""));
const discountPct = (price, original) =>
  Math.round((1 - parsePrice(price) / parsePrice(original)) * 100);
const starStr = (r) =>
  "★".repeat(Math.floor(r)) + (r % 1 >= 0.5 ? "½" : "");

/* ─── per-topic copy ───────────────────────────────────── */
const TOPIC_DESC = {
  "AI & Machine Learning": "Master the core pillars of artificial intelligence, from Python automation to real-world ML implementation.",
  "Deep Learning": "Build and deploy advanced neural networks covering CNNs, RNNs, transformers, and production-grade systems.",
  "Generative AI": "Master LLM fine-tuning, RAG pipelines, and AI agent orchestration for production workloads.",
  "Cybersecurity / VAPT": "Specialized cybersecurity training under the VAPT framework — networking, forensics, and compliance.",
  "Cybersecurity": "Develop elite offensive and defensive skills: ethical hacking, network auditing, and SOC analysis.",
  "Data & Business Analytics": "Transform raw data into actionable insights using advanced BI and AI-driven visualization techniques.",
};
const TOPIC_BULLETS = {
  "AI & Machine Learning": ["Master Python for data science & automation","Implement supervised and unsupervised learning","Solve real-world problems with ML models"],
  "Deep Learning": ["Build and optimize complex neural networks","Deploy AI systems at enterprise scale","Master Computer Vision and NLP frameworks"],
  "Generative AI": ["Deploy production-grade AI agents","Optimize LLM costs and latency","Build scalable RAG and vector search systems"],
  "Cybersecurity / VAPT": ["Operate within the VAPT professional framework","Investigate and resolve security incidents","Conduct professional-grade security audits"],
  "Cybersecurity": ["Perform advanced penetration testing","Master network defense and SOC operations","Identify and exploit system vulnerabilities"],
  "Data & Business Analytics": ["Transform raw data into actionable insights","Drive data-backed business decisions","Master industry-standard visualization tools"],
};
const getDesc = (c) => TOPIC_DESC[c.topic] || "Comprehensive training covering core concepts and practical applications in this specialised field.";
const getBullets = (c) => TOPIC_BULLETS[c.topic] || ["Master core concepts and advanced techniques","Gain hands-on experience through projects","Prepare for industry certifications"];

/* ─── phase images ─────────────────────────────────────── */
const PHASE_IMAGES = [
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518186239751-2477cf795151?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1605752683031-c4e1a6c5085a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1454165833767-027ffea9e77b?auto=format&fit=crop&w=800&q=80",
];

/* ══════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════ */

/* ── Course Card ── */
function CourseCard({ course, index = 0, onAddToCart, onClick }) {
  const isBest = course.rating >= 4.9;

  return (
    <div
      className="group relative flex flex-col h-[380px] bg-[#0b0f19] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
      onClick={() => onClick(course)}
    >
      {/* Background Layer with isolated clipping to fix Safari/Chrome corner bug */}
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
        {/* Background Image */}
        <img
          src={course.image}
          alt={course.title}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"; }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
      </div>
      
      {/* Watermark Number */}
      <span className="absolute -top-4 left-0 text-[140px] font-light text-white/[0.04] leading-none select-none font-serif tracking-tighter">
        {(index + 1).toString().padStart(2, '0')}
      </span>

      {/* Combined Top Badge */}
      <div className="absolute top-6 left-6 flex items-center rounded-full overflow-hidden shadow-xl bg-[#0b101a]/90 backdrop-blur-md border border-white/10">
        {isBest && (
          <div className="bg-gradient-to-r from-amber-500/20 to-amber-500/5 text-amber-400 text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1.5 border-r border-white/10">
            Best Seller
          </div>
        )}
        <div className="text-white/90 text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-1.5">
          {course.topic || "Course"}
        </div>
      </div>

      {/* Content Bottom */}
      <div className="relative mt-auto p-8 flex flex-col items-start w-full">
        <h3 className="font-serif text-[24px] leading-[1.2] text-white mb-6">
          {course.title}
        </h3>
        
        {/* Bottom row with Cart button and Arrow */}
        <div className="flex items-center justify-between w-full mt-2">
           <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(course); }}
            className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/90 text-[11px] font-bold uppercase tracking-wider
                       opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0
                       transition-all duration-300 hover:bg-white hover:text-black flex items-center gap-2"
          >
            <ShoppingCart size={13} />
            Add
          </button>
          
          <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black ml-auto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Roadmap Phase Card ── */
function RoadmapCard({ phase, index, navigate, onAddToCart }) {
  return (
    <div
      onClick={() => navigate(`/courses/${phase.slug}`)}
      className="group relative flex flex-col h-[380px] bg-[#0b0f19] border border-white/5 rounded-[2rem] overflow-hidden shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
    >
      {/* Background Layer with isolated clipping to fix Safari/Chrome corner bug */}
      <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
        {/* Background Image */}
        <img
          src={PHASE_IMAGES[index % PHASE_IMAGES.length]}
          alt={phase.title}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"; }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
      </div>
      
      {/* Watermark Number */}
      <span className="absolute -top-4 left-0 text-[140px] font-light text-white/[0.04] leading-none select-none font-serif tracking-tighter">
        {(index + 1).toString().padStart(2, '0')}
      </span>

      {/* Top Right Pill */}
      <div className="absolute top-6 right-6 border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-full font-medium">
        PHASE {phase.phase}
      </div>

      {/* Content Bottom */}
      <div className="relative mt-auto p-8 flex flex-col items-start w-full">
        
        <h3 className="font-serif text-[24px] leading-[1.2] text-white mb-6">
          {phase.title}
        </h3>
        
        {/* Bottom row */}
        <div className="flex items-center justify-between w-full mt-2">
           <button
            onClick={(e) => { 
              e.stopPropagation(); 
              if(onAddToCart) onAddToCart({ 
                id: `phase-${phase.phase}`, 
                title: phase.title, 
                price: "₹Free", 
                originalPrice: "₹1,299", 
                image: PHASE_IMAGES[index % PHASE_IMAGES.length] 
              }); 
            }}
            className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/90 text-[11px] font-bold uppercase tracking-wider
                       opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0
                       transition-all duration-300 hover:bg-white hover:text-black flex items-center gap-2"
          >
            <ShoppingCart size={13} />
            Add
          </button>
          
          <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black ml-auto">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Scrollable Row with Arrow Buttons ── */
function ScrollRow({ children }) {
  const rowRef = useRef(null);
  const [canLeft, setCanLeft]   = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = useCallback(() => {
    const el = rowRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }, []);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    return () => { el.removeEventListener("scroll", updateArrows); ro.disconnect(); };
  }, [updateArrows]);

  const scroll = (dir) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 640, behavior: "smooth" });
  };

  return (
    <div>
      {/* Arrow controls — top right, above the cards */}
      <div className="flex justify-end gap-2 mb-1">
        <button
          onClick={() => scroll(-1)}
          disabled={!canLeft}
          aria-label="Scroll left"
          className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-200 active:scale-95
            ${canLeft
              ? "bg-white border-slate-300 text-slate-700 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
              : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
            }`}
        >
          ‹
        </button>
        <button
          onClick={() => scroll(1)}
          disabled={!canRight}
          aria-label="Scroll right"
          className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-200 active:scale-95
            ${canRight
              ? "bg-white border-slate-300 text-slate-700 shadow-sm hover:bg-blue-600 hover:text-white hover:border-blue-600 cursor-pointer"
              : "bg-slate-100 border-slate-200 text-slate-300 cursor-not-allowed"
            }`}
        >
          ›
        </button>
      </div>

      {/* Scrollable track */}
      <div
        ref={rowRef}
        className="flex items-stretch gap-5 overflow-x-auto py-4 pb-10 scrollbar-none snap-x snap-mandatory -mx-6 px-6"
      >
        {children}
      </div>
    </div>
  );
}

/* ── Toast ── */
function Toast({ message, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-[999] flex items-center gap-2.5 bg-slate-900 text-white text-sm font-semibold px-5 py-3 rounded-2xl shadow-2xl"
        >
          <CheckCircle size={16} className="text-emerald-400" />
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════ */
export default function Catalog() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");
  const [searchQ, setSearchQ] = useState("");

  const [toast, setToast] = useState({ show: false, msg: "" });
  const [cartCount, setCartCount] = useState(0);
  const toastTimer = useRef(null);
  const lastScrollY = useRef(0);
  const [navVisible, setNavVisible] = useState(true);

  const { addToCart } = useCart();
  const navigate = useNavigate();

  /* Fetch courses */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses");
        const data = await res.json();
        setCourses(data.courses?.length > 0 ? data.courses : demoCourses);
      } catch {
        setCourses(demoCourses);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  /* Scroll-hide nav */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setNavVisible(y < 50 || y < lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Toast helper */
  const showToast = (msg) => {
    setToast({ show: true, msg });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2800);
  };

  /* Cart handler */
  const handleAddToCart = (course) => {
    addToCart(course);
    setCartCount((n) => n + 1);
    showToast(`"${course.title.slice(0, 30)}${course.title.length > 30 ? "…" : ""}" added`);

  };

  /* Derived data */
  const topics = ["All", ...new Set(courses.map((c) => c.topic || c.category))];

  const filteredCourses = courses.filter((c) => {
    const matchTab = activeTab === "All" || (c.topic || c.category) === activeTab;
    const q = searchQ.toLowerCase();
    const matchQ =
      !q ||
      c.title.toLowerCase().includes(q) ||
      (c.topic || c.category || "").toLowerCase().includes(q) ||
      (c.instructor || "").toLowerCase().includes(q) ||
      (c.badges || []).some((b) => b.toLowerCase().includes(q));
    return matchTab && matchQ;
  });

  const visibleTopics =
    activeTab === "All"
      ? [...new Set(courses.map((c) => c.topic || c.category))]
      : [activeTab];

  const showRoadmap = activeTab === "All" && !searchQ;

  return (
    <section className="min-h-screen bg-slate-50 pt-28 pb-20">
      <SEO
        title="Course Catalog | Master AI & Cybersecurity"
        description="Explore our curated catalog of AI, Machine Learning, and Cybersecurity courses."
        keywords="course catalog, AI courses, cybersecurity training, machine learning roadmap, VAPT"
      />

      {/* ── Back Button ── */}
      <motion.button
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: navVisible ? 0 : -100, opacity: navVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate("/learning")}
        className="fixed top-[84px] sm:top-[34px] left-4 sm:left-16 z-[110] w-11 h-11 bg-white border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shadow-md hover:bg-slate-900 hover:text-white hover:border-slate-900 active:scale-95 group transition-all duration-200"
        title="Go Back"
      >
        <ArrowLeft size={17} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
      </motion.button>

      <div className="container-shell">

        <Reveal y={0}>
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-[11px] font-black text-blue-600 uppercase tracking-[0.35em] mb-2">Course Catalog</p>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1] mb-2">
                What to <span className="text-blue-600">learn next</span>
              </h1>
              <p className="text-sm text-slate-400 font-medium">Curated for your interest in AI &amp; Data Science</p>
            </div>
          </div>
        </Reveal>



        {/* ── Search ── */}
        <Reveal y={0}>
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm mb-5">
            <Search size={16} className="text-slate-400 flex-shrink-0" />
            <input
              type="text"
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search courses, topics, or instructors…"
              className="flex-1 text-sm text-slate-700 bg-transparent outline-none placeholder:text-slate-400"
            />
            {searchQ && (
              <button onClick={() => setSearchQ("")} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={15} />
              </button>
            )}
          </div>
        </Reveal>

        {/* ── Category Tabs ── */}
        <Reveal y={0}>
          <div className="flex gap-2 flex-wrap mb-8 pb-5 border-b border-slate-200" role="tablist">
            {topics.map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={activeTab === t}
                onClick={() => setActiveTab(t)}
                className={`px-4 py-1.5 rounded-full text-[11px] font-bold border transition-all duration-150 ${
                  activeTab === t
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Roadmap Section ── */}
        {showRoadmap && (
          <div className="mb-14 flex flex-col gap-12">
            <div>
              <Reveal y={0}>
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1.5">Strategic Learning Path</p>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Data Science &amp; <span className="text-blue-600">AI Roadmap</span>
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">8 phases</span>
                </div>
              </Reveal>

              <ScrollRow>
                {dataScienceRoadmap.map((phase, i) => (
                  <Reveal key={phase.phase} y={0} className="flex-shrink-0 snap-start h-[380px]">
                    <div className="w-[300px] h-full">
                      <RoadmapCard phase={phase} index={i} navigate={navigate} onAddToCart={handleAddToCart} />
                    </div>
                  </Reveal>
                ))}
              </ScrollRow>
            </div>

            <div>
              <Reveal y={0}>
                <div className="flex items-end justify-between mb-5">
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-1.5">Strategic Learning Path</p>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                      Cyber Security <span className="text-blue-600">Roadmap</span>
                    </h2>
                  </div>
                  <span className="text-[11px] font-bold text-slate-400">6 phases</span>
                </div>
              </Reveal>

              <ScrollRow>
                {cyberSecurityRoadmap.map((phase, i) => (
                  <Reveal key={phase.phase} y={0} className="flex-shrink-0 snap-start h-[380px]">
                    <div className="w-[300px] h-full">
                      <RoadmapCard phase={phase} index={i} navigate={navigate} onAddToCart={handleAddToCart} />
                    </div>
                  </Reveal>
                ))}
              </ScrollRow>
            </div>
          </div>
        )}

        {/* ── Course Sections ── */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-14">
            {visibleTopics.map((topic) => {
              const list = filteredCourses.filter((c) => (c.topic || c.category) === topic);
              if (!list.length) return null;
              return (
                <div key={topic}>
                  <Reveal y={0}>
                    <div className="flex items-center gap-4 mb-6">
                      <h2 className="text-lg font-black text-slate-900 whitespace-nowrap">{topic}</h2>
                      <div className="h-px flex-1 bg-slate-200" />
                      <span className="text-[11px] font-bold text-slate-400">
                        {list.length} course{list.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </Reveal>

                  <ScrollRow>
                    {list.map((course, idx) => (
                      <Reveal key={course.id} y={0} className="flex-shrink-0 snap-start h-[380px]">
                        <div className="w-[300px] h-full">
                          <CourseCard
                            course={course}
                            index={idx}
                            onAddToCart={handleAddToCart}
                            onClick={(c) => navigate(`/courses/${c.slug}`)}
                          />
                        </div>
                      </Reveal>
                    ))}
                  </ScrollRow>
                </div>
              );
            })}

            {/* Empty state */}
            {filteredCourses.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <span className="text-5xl mb-4">🔍</span>
                <p className="text-lg font-black text-slate-900 mb-1">No courses found</p>
                <p className="text-sm text-slate-400">
                  Try a different keyword or{" "}
                  <button onClick={() => { setSearchQ(""); setActiveTab("All"); }} className="text-blue-600 font-bold hover:underline">
                    clear all filters
                  </button>
                </p>
              </div>
            )}
          </div>
        )}
      </div>



      {/* ── Toast ── */}
      <Toast show={toast.show} message={toast.msg} />
    </section>
  );
}