import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart, ShieldCheck, ArrowLeft, Clock, BarChart2,
  Search, X, ShoppingCart, User, Building, Route, CheckCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../state/CartContext.jsx";
import Reveal from "../components/Reveal.jsx";
import SEO from "../components/SEO.jsx";
import { demoCourses, dataScienceRoadmap } from "../data/courses.js";

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
function CourseCard({ course, onAddToCart, onClick }) {
  const isBest = course.rating >= 4.9;
  const d = discountPct(course.price, course.originalPrice);

  return (
    <div
      className="group relative flex flex-col h-full bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
      onClick={() => onClick(course)}
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={course.image}
          alt={course.title}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"; }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

        {/* Badges */}
        {isBest && (
          <span className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
            Bestseller
          </span>
        )}
        <span className="absolute top-3 right-3 bg-black/60 text-white text-[9px] font-semibold px-2.5 py-1 rounded-full">
          {course.difficulty || "All Levels"}
        </span>

        {/* Wishlist — appears on hover */}
        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute bottom-3 right-3 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:text-rose-500"
          title="Save to wishlist"
        >
          <Heart size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Title */}
        <h3 className="text-[13px] font-bold text-slate-900 leading-snug mb-1.5 line-clamp-2">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="flex items-center gap-1.5 text-[11px] text-slate-400 font-medium mb-2.5">
          <User size={11} className="flex-shrink-0" />
          {course.instructor}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-[12px] font-bold text-amber-600">{course.rating.toFixed(1)}</span>
          <span className="text-[10px] text-amber-400 tracking-wide">{starStr(course.rating)}</span>
          <span className="text-[10px] text-slate-400">({course.reviews.toLocaleString()})</span>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-3">
          <Clock size={11} className="flex-shrink-0" />
          <span>{course.duration || "Flexible"}</span>
          <span className="w-1 h-1 rounded-full bg-slate-300" />
          <BarChart2 size={11} className="flex-shrink-0" />
          <span>{course.difficulty || "All Levels"}</span>
        </div>

        {/* Tags */}
        {course.badges?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {course.badges.map((b) => (
              <span key={b} className="text-[9px] font-semibold px-2 py-0.5 rounded-md border border-slate-200 text-slate-500">
                {b}
              </span>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-[17px] font-black text-slate-900">
                {course.price === "TBC" ? "₹849" : course.price}
              </span>
              <span className="text-[11px] text-slate-300 line-through font-medium">
                {course.originalPrice === "TBC" ? "₹3,499" : course.originalPrice}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">
                {d}% off
              </span>
            </div>
            <div className="flex items-center gap-1 text-blue-600 group-hover:translate-x-0.5 transition-transform text-[10px] font-black uppercase tracking-wider">
              <span>More</span>
              <span>→</span>
            </div>
          </div>

          {/* Add to Cart — slides in on hover */}
          <button
            onClick={(e) => { e.stopPropagation(); handleAddToCart(course); }}
            className="w-full py-2 rounded-xl border border-blue-200 bg-blue-50 text-blue-700 text-[12px] font-bold
                       opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0
                       transition-all duration-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 active:scale-95 flex items-center justify-center gap-1.5"
          >
            <ShoppingCart size={13} />
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Roadmap Phase Card ── */
function RoadmapCard({ phase, index, navigate }) {
  const d = Math.round((1 - (499 + index * 100) / 1299) * 100);

  return (
    <div
      onClick={() => navigate(`/courses/${phase.slug}`)}
      className="group relative flex flex-col h-full bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
    >
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden flex-shrink-0">
        <img
          src={PHASE_IMAGES[index]}
          alt={phase.title}
          onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80"; }}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent" />

        {phase.isHot && (
          <span className="absolute top-3 left-3 bg-amber-400 text-amber-900 text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wide shadow-sm">
            Bestseller
          </span>
        )}
        <span className="absolute top-3 right-3 bg-black/60 text-white text-[9px] font-semibold px-2.5 py-1 rounded-full">
          Phase {phase.phase}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4">
        {/* Phase label */}
        <p className="flex items-center gap-1.5 text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1.5">
          <Route size={11} className="flex-shrink-0" />
          Roadmap · Phase {phase.phase}
        </p>

        <h3 className="text-[13px] font-bold text-slate-900 leading-snug mb-1.5 line-clamp-2">
          {phase.title}
        </h3>



        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <span className="text-[12px] font-bold text-amber-600">4.9</span>
          <span className="text-[10px] text-amber-400 tracking-wide">★★★★★</span>
          <span className="text-[10px] text-slate-400">(2.4k)</span>
        </div>

        {/* Topics as tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {phase.topics.slice(0, 3).map((t) => (
            <span key={t.name} className="text-[9px] font-semibold px-2 py-0.5 rounded-md border border-slate-200 text-slate-500">
              {t.name}
            </span>
          ))}
        </div>

        {/* Price */}
        <div className="mt-auto pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-[17px] font-black text-slate-900">₹{499 + index * 100}</span>
              <span className="text-[11px] text-slate-300 line-through">₹1,299</span>
              <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-md">{d}% off</span>
            </div>
            <div className="flex items-center gap-1 text-blue-600 group-hover:translate-x-0.5 transition-transform text-[10px] font-black uppercase tracking-wider">
              <span>More</span>
              <span>→</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Course Detail Modal ── */


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
          <div className="mb-14">
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

            <div className="flex items-stretch gap-5 overflow-x-auto py-6 pb-12 scrollbar-none snap-x snap-mandatory -mx-6 px-6">
              {dataScienceRoadmap.map((phase, i) => (
                <Reveal key={phase.phase} y={0} className="flex-shrink-0 snap-start h-auto">
                  <div className="w-[300px] h-full">
                    <RoadmapCard phase={phase} index={i} navigate={navigate} />
                  </div>
                </Reveal>
              ))}
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

                  <div className="flex items-stretch gap-5 overflow-x-auto py-6 pb-12 scrollbar-none snap-x snap-mandatory -mx-6 px-6">
                    {list.map((course) => (
                      <Reveal key={course.id} y={0} className="flex-shrink-0 snap-start h-auto">
                        <div className="w-[300px] h-full">
                          <CourseCard
                            course={course}
                            onAddToCart={handleAddToCart}
                            onClick={(c) => navigate(`/courses/${c.slug}`)}
                          />
                        </div>
                      </Reveal>
                    ))}
                  </div>
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