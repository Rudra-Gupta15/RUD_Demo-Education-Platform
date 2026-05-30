import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowRight, ArrowLeft, BookOpen, BrainCircuit, CheckCircle2, RadioTower, Shield, Sparkles, Trophy, Grid } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import SEO from "../components/SEO.jsx";

/** Animated number counter that counts up from 0 to `target` when in view. */
function CountUp({ target, suffix = "" }) {
  const ref = useRef(null);
  const hasRun = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true;
          // parse numeric part
          const numericValue = parseFloat(target.replace(/[^0-9.]/g, ""));
          const prefix = target.match(/^[^0-9]*/)?.[0] || "";
          const trailSuffix = target.match(/[^0-9.]+$/)?.[0] || suffix;
          const start = Date.now();
          const DURATION = 1600;

          function tick() {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / DURATION, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * numericValue * 10) / 10;
            el.textContent = `${prefix}${current % 1 === 0 ? current : current.toFixed(1)}${trailSuffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix]);

  return <span ref={ref}>{target}</span>;
}

const features = [
  { icon: BrainCircuit, title: "AI Mastery", text: "LLMs, agentic AI, ML foundations, evaluation, and production workflows.", color: "text-cyan" },
  { icon: Shield, title: "Cyber Labs", text: "Ethical hacking, SOC operations, network security, and detection engineering.", color: "text-plasma" },
  { icon: Trophy, title: "Real Projects", text: "Build portfolio-grade systems inspired by actual AI and security work.", color: "text-violet" },
  { icon: BookOpen, title: "Research Blog", text: "Technical articles that translate fast-moving ideas into practical skill.", color: "text-cyan" }
];

const stats = [
  ["850+", "learners trained"],
  ["12", "cohorts shipped"],
  ["94%", "project completion"],
  ["8", "industry labs"]
];

const testimonials = [
  {
    quote: "The agentic AI course finally made production LLM architecture feel concrete.",
    name: "Priya K.",
    role: "ML Engineer",
    initials: "PK"
  },
  {
    quote: "The SOC labs felt like the work I do on shift, not toy examples.",
    name: "Arjun M.",
    role: "Security Analyst",
    initials: "AM"
  },
  {
    quote: "ConvoSec Academy helped our team connect AI speed with security discipline.",
    name: "Nadia S.",
    role: "Founder",
    initials: "NS"
  }
];

const categories = [
  "Data Science & AI Roadmap",
  "Cyber Security Roadmap",
  "AI & Machine Learning",
  "Cybersecurity / VAPT",
  "Cybersecurity"
];

const programs = [
  {
    id: 1,
    categories: ["Data Science & AI Roadmap", "AI & Machine Learning"],
    title: "Foundation (0 → Beginner)",
    partner: "ConvoSec Academy",
    duration: "Flexible (Project-Based)",
    cohortStart: "Ongoing Enrollment",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=800&q=80",
    logo: "CSA"
  },
  {
    id: 2,
    categories: ["Data Science & AI Roadmap", "AI & Machine Learning"],
    title: "Machine Learning Core",
    partner: "ConvoSec Academy",
    duration: "Flexible (Project-Based)",
    cohortStart: "Ongoing Enrollment",
    image: "https://images.unsplash.com/photo-1518186239751-2477cf795151?auto=format&fit=crop&w=800&q=80",
    logo: "CSA"
  },
  {
    id: 3,
    categories: ["Data Science & AI Roadmap", "AI & Machine Learning"],
    title: "Deep Learning",
    partner: "ConvoSec Academy",
    duration: "Flexible (Project-Based)",
    cohortStart: "Ongoing Enrollment",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
    logo: "CSA"
  }
];

export default function Learning() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Data Science & AI Roadmap");
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      setIsVisible(true);
    } else {
      if (latest > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    }
    lastScrollY.current = latest;
  });

  const slides = [
    {
      title: "Learn. Grow.\nGet Ahead with AI",
      bulletPoints: [
        "500+ Careers advanced",
        "Weekly interactive cohorts",
        "Project-based mastery"
      ],
      primaryBtn: "Explore Programs",
      primaryUrl: "/courses",
      secondaryBtn: "Try ConvoSec for Business",
      secondaryUrl: "/contact",
      image: "/hero1.png"
    },
    {
      title: "Master Cyber Security.\nProtect the Future.",
      bulletPoints: [
        "200+ Certified learners",
        "Hands-on laboratory access",
        "Direct industry mentorship"
      ],
      primaryBtn: "Explore Labs",
      primaryUrl: "/projects",
      secondaryBtn: "Enterprise Training",
      secondaryUrl: "/contact",
      image: "/hero2.png"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="pt-24 pb-20">
      <SEO 
        title="Learning Academy | Master AI & Cybersecurity Skills" 
        description="Join ConvoSec Academy to master AI, Machine Learning, and Cybersecurity through project-based learning and industry-aligned cohorts."
        keywords="AI academy, cybersecurity certification, technical skills, machine learning learning path, career growth tech"
      />
      {/* ── Fixed "More Courses" Circle Button ── */}
      <motion.button
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        onClick={() => navigate('/catalog')}
        className="fixed top-[84px] sm:top-[34px] right-4 sm:right-20 z-[110] w-12 h-12 sm:w-14 sm:h-14 bg-black text-white rounded-full flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)] hover:bg-slate-800 group"
        title="More Courses"
      >
        <Grid size={20} className="transition-transform duration-500" />
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-black text-white text-[10px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-xl hidden sm:block">
          More Courses
        </span>
      </motion.button>

      {/* ── Hero Carousel ── */}
      <section className="relative overflow-hidden bg-white py-12 sm:py-16 text-slate-900 border-b border-slate-100">
        <div className="container-shell">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]"
            >
              {/* Left Side: Text and info */}
              <div>
                <h1 className="whitespace-pre-line text-4xl font-black tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.15]">
                  {slides[currentSlide].title}
                </h1>

                {/* Bullet Points */}
                <div className="mt-8 space-y-4">
                  {slides[currentSlide].bulletPoints.map((point, index) => (
                    <div key={index} className="flex items-center gap-3 text-lg font-semibold text-slate-700">
                      <CheckCircle2 className="text-[#3b82f6] shrink-0" size={24} />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-8 py-4 text-base font-bold text-white shadow-soft transition hover:bg-slate-800"
                    to={slides[currentSlide].primaryUrl}
                  >
                    {slides[currentSlide].primaryBtn}
                  </Link>
                  <Link
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-700 transition hover:border-black/60 hover:bg-slate-50"
                    to={slides[currentSlide].secondaryUrl}
                  >
                    {slides[currentSlide].secondaryBtn}
                  </Link>
                </div>
              </div>

              {/* Right Side: Large Image with dot indicators */}
              <div className="relative flex flex-col items-center">
                <div className="relative h-[400px] w-full sm:h-[500px] overflow-hidden rounded-2xl bg-slate-50 border border-slate-100 shadow-soft">
                  <img
                    src={slides[currentSlide].image}
                    alt="ConvoSec Learner"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                {/* Dot Indicators */}
                <div className="mt-6 flex gap-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "w-8 bg-black" : "w-3 bg-slate-200 hover:bg-slate-300"}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Our Educational Ecosystem ── */}
      <section className="py-24 bg-white">
        <div className="container-shell">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16">
            <Reveal y={0}>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-4">Architecture</p>
                <h2 className="text-4xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                  Educational <br />
                  <span className="text-blue-600">Ecosystem</span>
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8">
                  A structured technical roadmap designed for end-to-end skill transformation 
                  in Artificial Intelligence and Cybersecurity.
                </p>
                <div className="h-px w-20 bg-slate-200" />
              </div>
            </Reveal>

            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-16">
              {[
                { title: "Artificial Intelligence", desc: "Core neural network architectures, natural language processing, and autonomous agent design." },
                { title: "Machine Learning", desc: "Statistical modeling, predictive analytics, and production-ready ML pipeline orchestration." },
                { title: "Deep Learning", desc: "Advanced computer vision, generative models, and large-scale model optimization." },
                { title: "Cybersecurity / VAPT", desc: "Offensive security operations, digital forensics, and compliance within the VAPT framework." },
                { title: "Data & Business Analytics", desc: "Strategic intelligence through AI-driven data visualization and business logic modeling." }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 0.05} y={0}>
                  <div className="group">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-black text-slate-300 group-hover:text-blue-600 transition-colors">0{i + 1}</span>
                      <div className="h-px flex-1 bg-slate-100 group-hover:bg-blue-100 transition-colors" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Certifications & Career Outcomes ── */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container-shell">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
            <Reveal y={0}>
              <div className="max-w-xl">
                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em] mb-2">The Result</p>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">
                  Professional <span className="text-blue-600">Credentials</span>
                </h2>
              </div>
            </Reveal>
            <Reveal delay={0.1} y={0}>
              <p className="text-slate-500 text-sm font-medium max-w-xs leading-relaxed">
                Tangible assets that validate your technical expertise in the global talent market.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Course Certification",
                desc: "An industry-recognized Certificate of Completion verified by ConvoSec Academy.",
                icon: Trophy
              },
              {
                title: "Project Source Code",
                desc: "Direct ownership of high-fidelity codebase from every production-grade project.",
                icon: Grid
              },
              {
                title: "Career Credentials",
                desc: "Performance-verified documents including a formal LOR for top performers.",
                icon: Sparkles
              }
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.05} y={0}>
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-100 transition-colors h-full">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore Our Top Programs ── */}
      <section className="bg-slate-50 py-16 border-b border-slate-100">
        <div className="container-shell">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-12">
              Explore Our Top Programs
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar */}
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-2 pb-4 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${activeCategory === cat
                    ? "bg-black text-white shadow-soft"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Program Grid */}
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {programs
                .filter((p) => p.categories.includes(activeCategory))
                .map((program) => (
                  <Reveal key={program.id}>
                    <div
                      onClick={() => navigate("/courses")}
                      className="group relative flex flex-col h-[380px] bg-[#0b0f19] border border-white/5 rounded-[2rem] shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer"
                    >
                      {/* Background Layer with isolated clipping */}
                      <div className="absolute inset-0 rounded-[2rem] overflow-hidden">
                        <img
                          src={program.image}
                          alt={program.title}
                          onError={(e) => {
                            e.target.src = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80";
                          }}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/80 to-transparent" />
                      </div>

                      {/* Watermark Number */}
                      <span className="absolute -top-4 left-0 text-[140px] font-light text-white/[0.04] leading-none select-none font-serif tracking-tighter">
                        {program.id.toString().padStart(2, '0')}
                      </span>

                      {/* Top Right Pill (Category) */}
                      <div className="absolute top-6 right-6 border border-white/10 bg-white/5 backdrop-blur-md text-white/80 text-[9px] uppercase tracking-[0.2em] px-4 py-2 rounded-full font-medium z-10 max-w-[120px] truncate text-center">
                        {program.categories[program.categories.length - 1]}
                      </div>

                      {/* Top Left Partner Badge */}
                      <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/10 z-10">
                        <div className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center font-black text-[9px] text-white shrink-0">
                          {program.logo}
                        </div>
                        <span className="text-[10px] font-bold text-white/90">
                          {program.partner}
                        </span>
                      </div>

                      {/* Content Bottom */}
                      <div className="relative mt-auto p-8 flex flex-col items-start w-full pointer-events-none">
                        <div className="space-y-1 mb-4 text-[10px] text-white/50 font-medium uppercase tracking-wider">
                          <p>Duration: <span className="text-white/80">{program.duration}</span></p>
                          <p>Cohort: <span className="text-white/80">{program.cohortStart}</span></p>
                        </div>

                        <h3 className="font-serif text-[24px] leading-[1.2] text-white mb-6 line-clamp-2">
                          {program.title}
                        </h3>

                        {/* Bottom row */}
                        <div className="flex items-center justify-between w-full mt-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 group-hover:text-white transition-colors">
                            View Program
                          </span>
                          <div className="w-12 h-12 rounded-full border border-white/20 bg-white/5 backdrop-blur-md flex items-center justify-center text-white transition-all duration-300 group-hover:bg-white group-hover:text-black">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
