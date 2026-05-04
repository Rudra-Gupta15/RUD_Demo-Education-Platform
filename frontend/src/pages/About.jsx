import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Brain, ShieldCheck, Users, Target, Linkedin, Github, Globe, Mail, ArrowUpRight, Sparkles, MoveRight } from "lucide-react";

/* ─── ANIMATION HELPERS ─────────────────────────────────────────── */
function useReveal(threshold = "-60px") {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: threshold });
  return [ref, inView];
}

function LineReveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useReveal();
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "105%" }}
        animate={inView ? { y: 0 } : {}}
        transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

function FadeReveal({ children, delay = 0, className = "" }) {
  const [ref, inView] = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── DATA ──────────────────────────────────────────────────────── */
const services = [
  {
    icon: Brain,
    num: "01",
    title: "Coaching & Education",
    tag: "Learning",
    desc: "AI/ML fundamentals and integrated Cybersecurity curriculum designed for the next generation of digital defenders — from theory to deployment.",
    points: ["Python & Algorithms", "Ethical Hacking", "LLM Security", "Live Mentorship"],
  },
  {
    icon: ShieldCheck,
    num: "02",
    title: "Project Development",
    tag: "Solutions",
    desc: "Real-world AI and Cyber solutions engineered for modern business demands — from intelligent threat detection to full automation pipelines.",
    points: ["Intelligent Chatbots", "SIEM Dashboards", "Vulnerability Scanners", "Automation Tools"],
  },
  {
    icon: Users,
    num: "03",
    title: "Corporate Collaboration",
    tag: "Enterprise",
    desc: "Outsourced R&D and specialized consultancy for organizations integrating AI safely into security infrastructure at scale.",
    points: ["Cybersecurity Audits", "AI Strategy", "Staff Upskilling", "Joint R&D"],
  },
  {
    icon: Target,
    num: "04",
    title: "Internships & Placement",
    tag: "Careers",
    desc: "Industry-aligned programs bridging academic talent to real hiring partners — with project exposure that hiring managers actually value.",
    points: ["Resume Building", "Interview Prep", "Direct Placement", "Real Experience"],
  },
];

const philosophyPoints = [
  "Bridging academic learning and industry demands.",
  "AI-powered defense against modern cyber threats.",
  "Hands-on education through impactful projects.",
  "Partnerships building cutting-edge AI solutions.",
  "Building the future of digital security.",
];

const team = [
  {
    name: "Rudra.V Rajpure",
    initials: "RR",
    role: "Founder & CEO",
    image: "/rudra_ceo.png",
    bio: "Visionary leader driving the mission to bridge AI innovation with battle-tested cybersecurity practice. Founder of ConvoSec AI's core philosophy and product direction.",
    linkedin: "https://www.linkedin.com/in/rudra-rajgure-/",
    email: "rudraconvosecai@gmail.com",
  },
  {
    name: "Nikky Bisen",
    initials: "NB",
    role: "Co-Founder & CTO",
    image: "/Nikky.jpg",
    bio: "Passionate AI/ML engineer specializing in intelligent systems and scalable neural architectures. Leads all technical strategy and engineering culture.",
    linkedin: "https://www.linkedin.com/in/nikky-bisen-4a609115a/",
    email: "nikky@convosec.ai",
  },
  {
    name: "Rudra Gupta",
    initials: "RG",
    role: "Full Stack Developer",
    image: "/Rudra.png",
    bio: "Frontend specialist and extension developer focused on building practical, user-facing AI tools. Published author of multiple production Chrome extensions.",
    linkedin: "https://www.linkedin.com/in/rudra-kumar-gupta/",
    portfolio: "https://rudra-gupta.vercel.app/",
    email: "rudra.gupta@convosec.ai",
  },
  {
    name: "Samruddhi Khedkar",
    initials: "SK",
    role: "AI Engineer",
    image: "/samruddhi.png",
    bio: "AI Engineer specializing in Computer Vision, Deep Learning, and Prompt Engineering to build intelligent systems.",
    linkedin: "https://linkedin.com/in/samruddhi-khedkar-670070239",
    github: "https://github.com/samruddhikhedkar02",
    email: "samruddhi@convosec.ai",
  },
];


const teamworkQuotes = [
  {
    author: "Steve Jobs",
    role: "Co-Founder, Apple",
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?auto=format&fit=crop&q=80&w=800",
    slogan: "Great things in business are never done by one person. They're done by a team of people.",
  },
  {
    author: "Henry Ford",
    role: "Founder, Ford Motor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
    slogan: "Coming together is a beginning. Keeping together is progress. Working together is success.",
  },
  {
    author: "Helen Keller",
    role: "Author & Activist",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
    slogan: "Alone we can do so little; together we can do so much.",
  },
  {
    author: "Vince Lombardi",
    role: "Legendary Coach",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
    slogan: "Individual commitment to a group effort—that is what makes a team work.",
  },
  {
    author: "Margaret Mead",
    role: "Anthropologist",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
    slogan: "Never doubt that a small group of thoughtful, committed citizens can change the world.",
  },
];

const stats = [
  { value: "50+", label: "Projects Built" },
  { value: "04", label: "Core Services" },
  { value: "100%", label: "AI-Powered" },
  { value: "4", label: "Expert Team" },
];

/* ─── SERVICE ROW ───────────────────────────────────────────────── */
function ServiceRow({ service, idx }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useReveal("-40px");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="group border-t border-slate-100 cursor-pointer relative overflow-hidden transition-all duration-500 hover:bg-slate-50/50 px-6 -mx-6 rounded-2xl"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Animated accent background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700 ease-out" />

        <div className="relative flex items-start gap-8 py-10 lg:py-14 z-10">
          {/* Stylistic Number */}
          <div className="shrink-0 w-16">
            <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] block mb-2 opacity-50 group-hover:opacity-100 transition-opacity">
              Phase
            </span>
            <span className="text-4xl font-black text-slate-200 group-hover:text-blue-200 transition-colors duration-500 leading-none">
              {service.num}
            </span>
          </div>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-16">
              {/* Title block */}
              <div className="lg:w-80 shrink-0">
                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300 mb-3">
                  {service.title}
                </h3>
                <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-white bg-slate-900 px-3 py-1.5 rounded-full">
                  {service.tag}
                </span>
              </div>

              {/* Description & Detail */}
              <div className="flex-1 min-w-0">
                <p className="text-slate-500 leading-relaxed text-lg mb-6 group-hover:text-slate-700 transition-colors">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.points.map((p) => (
                    <span
                      key={p}
                      className="text-[11px] font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl shadow-sm group-hover:border-blue-200 group-hover:bg-blue-50/50 transition-all"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Interaction Circle */}
              <div className="shrink-0 relative">
                <motion.div
                  animate={{ 
                    scale: open ? 1.1 : 1,
                    backgroundColor: open ? "#2563eb" : "transparent"
                  }}
                  className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300"
                >
                  <ArrowUpRight 
                    size={20} 
                    className={`${open ? "text-white" : "text-slate-400"} transition-colors`} 
                  />
                </motion.div>
                {/* Decorative pulse */}
                {open && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 bg-blue-400 rounded-full -z-10"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── TEAM CARD ─────────────────────────────────────────────────── */
function TeamCard({ member, idx }) {
  const [ref, inView] = useReveal();
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
      className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:border-blue-100 hover:shadow-2xl transition-all duration-500 text-center flex flex-col h-full"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative w-48 h-48 mx-auto mb-8 shrink-0">
        {/* Rotating border accent */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-10px] rounded-[2.5rem] border border-dashed border-blue-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-blue-600/10 rounded-[2rem] rotate-6 group-hover:rotate-12 transition-transform duration-500" />
        <div className="relative w-full h-full rounded-[2rem] overflow-hidden border-4 border-white shadow-xl bg-slate-50">
          <img 
            src={member.image} 
            alt={member.name} 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
          />
        </div>
      </div>
      
      <h3 className="text-xl lg:text-2xl font-black text-slate-900 mb-1 whitespace-nowrap">{member.name}</h3>
      <p className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-4">{member.role}</p>
      <p className="text-slate-500 text-sm leading-relaxed mb-8 px-4 flex-1">
        {member.bio}
      </p>

      <div className="flex items-center justify-center gap-4 mt-auto">
        {[
          { href: member.linkedin, icon: Linkedin, label: "LinkedIn" },
          member.github && { href: member.github, icon: Github, label: "GitHub" },
          member.portfolio && { href: member.portfolio, icon: Globe, label: "Portfolio" },
          { href: `mailto:${member.email}`, icon: Mail, label: "Email" },
        ].filter(Boolean).map(({ href, icon: Icon, label }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.15, backgroundColor: "rgb(37 99 235)", color: "white" }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-500 transition-all duration-300"
          >
            <Icon size={16} />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}

/* ─── MARQUEE ───────────────────────────────────────────────────── */
function Marquee() {
  const items = ["AI Security", "Machine Learning", "Ethical Hacking", "LLM Defense", "Cyber Intelligence", "Neural Systems"];
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-slate-100 py-5 bg-white">
      <motion.div
        animate={{ x: [0, -50 * items.length + "%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap w-max"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-3 text-sm font-bold text-slate-400 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────── */
export default function About() {
  const [activePhil, setActivePhil] = useState(0);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setActivePhil((p) => (p + 1) % philosophyPoints.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-['Outfit'] overflow-x-hidden">

      {/* ══════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center pt-40 pb-20 overflow-hidden">

        {/* Very subtle noise texture overlay */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.018]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
          }}
        />

        {/* Single contained light bloom — not floating orb */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[150px] -z-10 opacity-60" />

        <div className="container-shell">
          <div className="grid lg:grid-cols-[1fr_480px] gap-16 xl:gap-24 items-center">

            {/* LEFT: Editorial copy */}
            <motion.div style={{ opacity: heroOpacity }}>
              {/* Eyebrow */}
              <FadeReveal delay={0.1}>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-8 h-px bg-blue-600" />
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em]">
                    ConvoSec AI — Defense Reimagined
                  </span>
                </div>
              </FadeReveal>

              {/* Headline — Panoramic single line */}
              <div className="mb-8">
                <LineReveal delay={0.2} className="py-2">
                  <h1 className="text-[clamp(38px,5.5vw,76px)] font-black leading-[1.2] tracking-tight text-slate-900 whitespace-nowrap">
                    Beyond{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                      Intelligence.
                    </span>
                  </h1>
                </LineReveal>
              </div>

              <FadeReveal delay={0.5}>
                <p className="text-slate-500 text-lg leading-relaxed max-w-lg mb-12 font-light">
                  ConvoSec AI bridges frontier AI research with battle-hardened cybersecurity —
                  delivering education, solutions, and consultancy that builds a more resilient digital world.
                </p>
              </FadeReveal>

              <FadeReveal delay={0.62}>
                <div className="flex items-center gap-5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="group/btn flex items-center gap-3 px-7 py-3.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-blue-600 transition-colors duration-300"
                  >
                    Meet the Team
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <MoveRight size={15} />
                    </motion.span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    Our Mission
                    <div className="w-4 h-px bg-current" />
                  </motion.button>
                </div>
              </FadeReveal>

              {/* Stats strip */}
              <FadeReveal delay={0.78}>
                <div className="flex gap-10 mt-16 pt-10 border-t border-slate-200/80">
                  {stats.map((s, i) => (
                    <div key={s.label}>
                      <p className="text-3xl font-black text-slate-900 tracking-tight">{s.value}</p>
                      <p className="text-xs text-slate-400 font-medium mt-0.5 uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>
              </FadeReveal>
            </motion.div>

            {/* RIGHT: Video — Circular premium frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex justify-center items-center"
              style={{ y: videoY }}
            >
              {/* Rotating border accents */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute w-[110%] h-[110%] rounded-full border-2 border-dashed border-blue-200/40"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="absolute w-[125%] h-[125%] rounded-full border border-dashed border-slate-200/30"
              />

              <div className="relative w-full aspect-square rounded-full overflow-hidden border-[12px] border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] bg-slate-900 z-10">
                <video
                  src="/Brain.mp4"
                  autoPlay muted loop playsInline
                  className="w-full h-full object-cover"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-transparent" />

                {/* Status indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2.5 rounded-full z-20">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-400" />
                  </span>
                  <span className="text-white text-[11px] font-bold tracking-[0.2em] uppercase">Systems Online</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ══════════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#f8fafc]">
        <div className="container-shell">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <FadeReveal>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.3em] mb-5">Capabilities</p>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[0.95]">
                Comprehensive AI & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                  Cyber Solutions
                </span>
              </h2>
            </FadeReveal>
            <FadeReveal delay={0.1} className="lg:max-w-md">
              <p className="text-slate-400 text-lg leading-relaxed font-medium">
                End-to-end services navigating the complex intersection of artificial intelligence
                and modern security architecture at global scale.
              </p>
            </FadeReveal>
          </div>

          {/* Editorial service list */}
          <div>
            {services.map((service, idx) => (
              <ServiceRow key={service.num} service={service} idx={idx} />
            ))}
            <div className="border-t border-slate-200" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PHILOSOPHY
      ══════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white border-y border-slate-100">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left: content */}
            <div>
              <FadeReveal className="mb-12">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Our Core DNA</p>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Philosophy in Motion
                </h2>
              </FadeReveal>

              {/* Animated philosophy carousel */}
              <div className="relative">
                {/* Progress dots */}
                <div className="flex gap-1.5 mb-8">
                  {philosophyPoints.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: i === activePhil ? "1.75rem" : "0.375rem",
                        backgroundColor: i === activePhil ? "#2563eb" : "#e2e8f0",
                      }}
                      transition={{ duration: 0.35 }}
                      className="h-1 rounded-full cursor-pointer"
                      onClick={() => setActivePhil(i)}
                    />
                  ))}
                </div>

                {/* Point display */}
                <div className="relative h-48 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activePhil}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -30 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex items-center"
                    >
                      <div className="flex items-start gap-6">
                        <span className="text-[90px] font-black text-slate-100 leading-[0.8] select-none pt-2">
                          {String(activePhil + 1).padStart(2, "0")}
                        </span>
                        <div className="pt-4">
                          <p className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight">
                            {philosophyPoints[activePhil]}
                          </p>
                          <div className="flex items-center gap-2 mt-4">
                            <div className="w-5 h-px bg-blue-500" />
                            <span className="text-xs text-blue-500 font-bold uppercase tracking-wider">ConvoSec Principle</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* All points list */}
                <div className="mt-8 space-y-3">
                  {philosophyPoints.map((pt, i) => (
                    <motion.div
                      key={i}
                      onClick={() => setActivePhil(i)}
                      animate={{ opacity: i === activePhil ? 1 : 0.35 }}
                      className="flex items-center gap-3 cursor-pointer group/pt"
                    >
                      <motion.div
                        animate={{ width: i === activePhil ? "1.5rem" : "0.75rem" }}
                        className="h-px bg-blue-500 transition-all"
                      />
                      <span className={`text-sm font-medium transition-colors ${i === activePhil ? "text-slate-900" : "text-slate-400 group-hover/pt:text-slate-600"}`}>
                        {pt}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Sliding Quote Tile */}
            <FadeReveal delay={0.15} className="relative">
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-blue-200 rounded-tr-2xl" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-slate-200 rounded-bl-2xl" />

              <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.15)] bg-slate-900 aspect-square">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePhil}
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={teamworkQuotes[activePhil % teamworkQuotes.length].image} 
                      alt="Teamwork Quote" 
                      className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Quote Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                  <motion.div
                    key={activePhil}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Wisdom in Collaboration</p>
                    <h3 className="text-white text-xl lg:text-2xl font-bold tracking-tight leading-tight mb-4 italic">
                      "{teamworkQuotes[activePhil % teamworkQuotes.length].slogan}"
                    </h3>
                    <div className="flex items-center gap-3 border-t border-white/10 pt-4">
                      <div className="w-1 h-8 bg-blue-500" />
                      <div>
                        <p className="text-white text-sm font-black uppercase tracking-widest">
                          {teamworkQuotes[activePhil % teamworkQuotes.length].author}
                        </p>
                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                          {teamworkQuotes[activePhil % teamworkQuotes.length].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </FadeReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          TEAM
      ══════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#f8fafc]">
        <div className="container-shell">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <FadeReveal>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">People</p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                The Leadership Team
              </h2>
            </FadeReveal>
            <FadeReveal delay={0.1} className="lg:max-w-xs">
              <p className="text-slate-400 text-[15px] leading-relaxed">
                Driven by a passion for security and intelligence — bringing together expertise
                across engineering, AI research, and ethical hacking.
              </p>
            </FadeReveal>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <TeamCard key={member.name} member={member} idx={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════════ */}
      <section className="py-10 bg-[#f8fafc]">
        <div className="container-shell">
          <FadeReveal>
            <div className="relative bg-slate-900 rounded-3xl overflow-hidden">
              {/* Subtle texture on dark bg */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                  backgroundSize: "50px 50px",
                }}
              />
              {/* Single bloom — not floating orb */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[100px]" />

              <div className="relative z-10 p-12 lg:p-20">
                <div className="max-w-3xl">
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Join the movement</p>

                  <LineReveal>
                    <h2 className="text-4xl lg:text-6xl font-black text-white tracking-tight leading-[0.95] mb-6">
                      Ready to build a
                    </h2>
                  </LineReveal>
                  <LineReveal delay={0.12}>
                    <h2 className="text-4xl lg:text-6xl font-black tracking-tight leading-[0.95] mb-10">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        more secure future?
                      </span>
                    </h2>
                  </LineReveal>

                  <FadeReveal delay={0.3}>
                    <p className="text-slate-400 text-lg font-light leading-relaxed mb-12 max-w-xl">
                      Explore our courses, projects, and consultancy services.
                      Let's build resilient digital systems together.
                    </p>
                  </FadeReveal>

                  <FadeReveal delay={0.42}>
                    <div className="flex flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.03, backgroundColor: "#3b82f6" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-sm transition-colors duration-200"
                      >
                        Explore Learning Hub
                        <ArrowUpRight size={15} />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
                        whileTap={{ scale: 0.97 }}
                        className="flex items-center gap-3 px-8 py-4 bg-white/8 text-white border border-white/20 rounded-xl font-bold text-sm transition-colors duration-200"
                      >
                        Contact Sales
                      </motion.button>
                    </div>
                  </FadeReveal>
                </div>

                {/* Right side decorative stat */}
                <div className="absolute right-12 bottom-12 hidden lg:block text-right">
                  <p className="text-6xl font-black text-white/10 leading-none tracking-tight">50+</p>
                  <p className="text-slate-600 text-xs font-bold uppercase tracking-widest mt-1">Projects Delivered</p>
                </div>
              </div>
            </div>
          </FadeReveal>
        </div>
      </section>

      {/* Bottom spacing */}
      <div className="h-16 bg-[#f8fafc]" />
    </div>
  );
}