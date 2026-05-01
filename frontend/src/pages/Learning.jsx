import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, BookOpen, BrainCircuit, CheckCircle2, RadioTower, Shield, Sparkles, Trophy, Grid } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

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
  ["12k+", "learners trained"],
  ["42", "cohorts shipped"],
  ["96%", "project completion"],
  ["28", "industry labs"]
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
    quote: "SynapseLearn helped our team connect AI speed with security discipline.",
    name: "Nadia S.",
    role: "Founder",
    initials: "NS"
  }
];

const categories = [
  "Most Popular",
  "Generative AI",
  "AI & Machine Learning",
  "Data Science & Business Analytics",
  "Project Management",
  "Cyber Security",
  "Agile and Scrum",
  "Cloud Computing & DevOps",
  "Business and Leadership",
  "Software Development",
  "Product and Design"
];

const programs = [
  {
    id: 1,
    categories: ["Most Popular", "Project Management", "Agile and Scrum", "Business and Leadership"],
    title: "PMP® Certification Training",
    partner: "Project Management Institute",
    duration: "4 Weeks",
    cohortStart: "2nd May '26",
    image: "/program_pmp.png",
    logo: "PMI"
  },
  {
    id: 2,
    categories: ["Most Popular", "Generative AI", "AI & Machine Learning", "Data Science & Business Analytics", "Software Development"],
    title: "Professional Certificate Program in Generative AI Machine Learning and...",
    partner: "Technology Innovation Hub of IIT Delhi",
    duration: "11 Months",
    cohortStart: "6th May '26",
    image: "/program_genai.png",
    logo: "IITD"
  },
  {
    id: 3,
    categories: ["Most Popular", "Cyber Security", "Cloud Computing & DevOps", "Product and Design"],
    title: "Advanced Executive Program in Cybersecurity",
    partner: "International Institute of Information Technology Bangalore",
    duration: "8 Months",
    cohortStart: "5th May '26",
    image: "/program_cyber.png",
    logo: "IIITB"
  }
];

export default function Learning() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeCategory, setActiveCategory] = useState("Most Popular");
  const navigate = useNavigate();

  const slides = [
    {
      title: "Learn. Grow.\nGet Ahead with AI ✨",
      bulletPoints: [
        "15,000+ Careers advanced",
        "100+ Live classes every month",
        "92% Report career success"
      ],
      primaryBtn: "Explore Programs",
      primaryUrl: "/courses",
      secondaryBtn: "Try SynapseLearn for Business",
      secondaryUrl: "/contact",
      image: "/hero1.png"
    },
    {
      title: "Master Cyber Security.\nProtect the Future. 🛡️",
      bulletPoints: [
        "10,000+ Certified learners",
        "Real SOC environments",
        "88% Placement rate"
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
    <div className="pt-32">
      {/* ── Top Bar with "More Courses" Button ── */}
      <div className="container-shell flex justify-end mb-4">
        <button 
          onClick={() => navigate('/catalog')}
          className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95"
        >
          <Grid size={16} />
          More Courses
        </button>
      </div>

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
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-black px-8 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-slate-800 active:scale-95" 
                    to={slides[currentSlide].primaryUrl}
                  >
                    {slides[currentSlide].primaryBtn}
                  </Link>
                  <Link 
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-700 transition hover:-translate-y-0.5 hover:border-black/60 hover:bg-slate-50 active:scale-95" 
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
                    alt="SynapseLearn Learner" 
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
                  className={`whitespace-nowrap text-left px-4 py-3 rounded-lg text-sm font-bold transition-all ${
                    activeCategory === cat
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
                    <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft flex flex-col h-full group transition-all hover:shadow-md">
                      {/* Image Container */}
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Overlapping Partner Badge */}
                        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 flex items-center gap-2 shadow-sm border border-slate-100/50 max-w-[calc(100%-2rem)]">
                          <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center font-black text-xs text-black shrink-0">
                            {program.logo}
                          </div>
                          <span className="text-xs font-bold text-slate-800 truncate">
                            {program.partner}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-extrabold text-slate-900 mb-4 line-clamp-2">
                          {program.title}
                        </h3>
                        
                        <div className="mt-auto space-y-2 text-sm text-slate-500 font-semibold mb-6">
                          <p>Duration: <span className="text-slate-700">{program.duration}</span></p>
                          <p>Cohort Starts: <span className="text-slate-700">{program.cohortStart}</span></p>
                        </div>

                        <Link
                          to="/courses"
                          className="w-full text-center py-3 rounded-lg border border-slate-200 text-sm font-bold text-black hover:bg-slate-50 hover:border-black/30 transition-all active:scale-95 mt-auto"
                        >
                          View Program
                        </Link>
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
