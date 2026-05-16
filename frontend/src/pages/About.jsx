import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Brain, ShieldCheck, Users, Target, Linkedin, Github, Globe, Mail, ArrowUpRight, Sparkles, MoveRight } from "lucide-react";
import SEO from "../components/SEO.jsx";

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
    title: "AI & Machine Learning Courses",
    tag: "Education",
    desc: "Structured training programs covering Python fundamentals, Artificial Intelligence, Machine Learning, and Deep Learning — with hands-on project work throughout.",
    points: ["Python Foundations", "ML Algorithms", "Deep Learning", "Project Work"],
    href: "/learning"
  },
  {
    icon: ShieldCheck,
    num: "02",
    title: "Cybersecurity Training (VAPT)",
    tag: "Security",
    desc: "Courses under the Vulnerability Assessment and Penetration Testing (VAPT) framework covering Networking, Digital Forensics, and Compliance.",
    points: ["Networking", "Digital Forensics", "Compliance", "VAPT Framework"],
    href: "/learning"
  },
  {
    icon: Users,
    num: "03",
    title: "Project-Based Internships (Free)",
    tag: "Internships",
    desc: "Real-time internship placements on live company projects, managed by domain experts with continuous mentorship, evaluation, and certification.",
    points: ["Live Projects", "Expert Mentorship", "Performance Evaluation", "Zero Cost"],
    href: "/projects"
  },
  {
    icon: Target,
    num: "04",
    title: "Mentorship & Evaluation",
    tag: "Expertise",
    desc: "Each student or intern is assigned to a domain-specific expert who oversees their progress, provides technical guidance, and evaluates performance.",
    points: ["1-on-1 Guidance", "Technical Support", "Progress Tracking", "Milestone Checks"],
    href: "/learning"
  },
  {
    icon: Sparkles,
    num: "05",
    title: "Certification & LOA",
    tag: "Recognition",
    desc: "All course completers receive Completion Certificates and source code. Interns receive Letters of Recommendation based on performance.",
    points: ["Completion Certificates", "Project Source Code", "Letters of Recommendation", "Performance Badges"],
    href: "/learning"
  },
];

const philosophyPoints = [
  {
    title: "Organisational Credibility & Legitimacy",
    desc: "The company operates with full legal standing — valid company registration, government-authorized credentials, formal MoUs with partner organisations, and professionally certified documentation. Every client and partner organisation engaging with the company deals with a fully legitimate, accountable entity — not a casual setup."
  },
  {
    title: "Project Integrity",
    desc: "The company maintains its own registered, ongoing projects at all times. This is non-negotiable. No client engagement or partnership is built on hollow promises — the company backs every collaboration with real, active project infrastructure and a team that is operationally ready to deliver."
  },
  {
    title: "Domain Expertise",
    desc: "The company specialises in two high-demand, high-precision technical domains — Artificial Intelligence / Machine Learning and Cybersecurity (VAPT). Clients and partner organisations engage with a company that has dedicated domain experts, not generalists. Every project and every partnership is handled by the right specialist."
  },
  {
    title: "Institutional Trust Through MoUs",
    desc: "The company actively pursues and maintains formal Memorandums of Understanding (MoUs) with reputed organisations. This is a deliberate strategy to build a verifiable network of trust — giving clients and partners the assurance that the company operates within structured, mutually agreed frameworks rather than informal arrangements."
  },
  {
    title: "Disciplined Operations & Governance",
    desc: "Internal discipline is treated as a company-wide standard. Employees hold valid offer letters, experience letters, and receive regular compensation. All operational processes — onboarding, verification, project allocation, performance evaluation — follow defined workflows. Clients engaging with the company can expect organised, process-driven execution, not ad-hoc responses."
  },
  {
    title: "Accountability at Every Level",
    desc: "Each domain has a designated responsible employee who owns delivery within that domain. There is no ambiguity in ownership. When a client or partner organisation is involved, there is always a clear point of accountability — a specific person responsible for outcomes, not a diffused team with no defined responsibility."
  },
  {
    title: "Technology-Forward Positioning",
    desc: "The company does not operate on outdated technology stacks. It actively monitors and adapts to the latest industry trends, ensuring that its technical capabilities — and by extension the value it brings to clients and partners — remain current, competitive, and relevant in a rapidly evolving technology landscape."
  },
  {
    title: "Zero Compromise on Standards",
    desc: "Any violation of organisational terms — internally or externally — is treated as an actionable offence. The company holds a firm line on professional conduct, delivery standards, and ethical operations. Clients and partner organisations can trust that the company will not compromise on the quality or integrity of what it commits to deliver"
  }
];

const team = [
  {
    name: "Rudra.V Rajpure",
    initials: "RR",
    role: "Founder & CEO",
    image: "/rudra_ceo.png",
    bio: "Visionary leader driving the mission to bridge AI innovation, Cybersecurity, and Business Analytics with industry-ready practices. Founder of ConvoSec AI's core philosophy.",
    linkedin: "https://www.linkedin.com/in/rudra-rajgure-/",
    email: "rudraconvosecai@gmail.com",
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
    image: "Steve_Jobs.jpg",
    slogan: "Great things in business are never done by one person. They're done by a team of people.",
  },
  {
    author: "Henry Ford",
    role: "Founder, Ford Motor",
    image: "Henry_Ford.png",
    slogan: "Coming together is a beginning. Keeping together is progress. Working together is success.",
  },
  {
    author: "Helen Keller",
    role: "Author & Activist",
    image: "Helen_Keller.jpg",
    slogan: "Alone we can do so little; together we can do so much.",
  },
  {
    author: "Vince Lombardi",
    role: "Legendary Coach",
    image: "Vince_Lombardi.jpg",
    slogan: "Individual commitment to a group effort—that is what makes a team work.",
  },
  {
    author: "Margaret Mead",
    role: "Anthropologist",
    image: "Margaret_Mead.jpg",
    slogan: "Never doubt that a small group of thoughtful, committed citizens can change the world.",
  },
];

const stats = [
  { value: "20+", label: "Projects Built" },
  { value: "04", label: "Core Domains" },
  { value: "100%", label: "Practical" },
  { value: "Founders", label: "Led Mentorship" },
];

/* ─── SERVICE ROW ───────────────────────────────────────────────── */
function ServiceRow({ service, idx }) {
  const [open, setOpen] = useState(false);
  const [ref, inView] = useReveal("-40px");
  const Icon = service.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="group border-t border-slate-100 cursor-pointer relative overflow-hidden transition-all duration-500 hover:bg-white px-4 sm:px-8 -mx-4 sm:-mx-8 rounded-[2rem] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.08)]"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Dynamic Shimmer Sweep */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            initial={{ x: "-100%" }}
            whileHover={{ x: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12"
          />
        </div>
        
        {/* Breathing Side Glow */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-600 group-hover:h-1/3 transition-all duration-500 rounded-r-full shadow-[0_0_20px_rgba(37,99,235,0.6)]" />

        <div className="relative flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12 py-6 sm:py-8 z-10">
          {/* Phase & Icon with Dynamic Pulse */}
          <div className="shrink-0 flex items-center gap-4 lg:w-40">
            <div className="relative">
              <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.3em] block mb-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                Phase
              </span>
              <span className="text-3xl sm:text-4xl font-black text-slate-200 group-hover:text-blue-100 transition-colors duration-500 leading-none">
                {service.num}
              </span>
            </div>
            <div className="relative">
              <motion.div 
                animate={{ 
                  boxShadow: ["0 0 0px rgba(37,99,235,0)", "0 0 20px rgba(37,99,235,0.4)", "0 0 0px rgba(37,99,235,0)"] 
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-all duration-500"
              >
                <Icon size={20} strokeWidth={1.5} />
              </motion.div>
              {/* Refined Ambient Bloom on Hover */}
              <div className="absolute inset-0 rounded-xl bg-blue-500/25 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </div>
          </div>

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
              <div className="lg:w-72 shrink-0">
                <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-600 transition-colors duration-300 mb-2 leading-tight">
                  {service.title}
                </h3>
                <span className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-white bg-slate-900 px-3 py-1 rounded-full group-hover:bg-blue-600 transition-all duration-300 relative overflow-hidden">
                  <div className="w-1 h-1 rounded-full bg-blue-400 animate-pulse relative z-10" />
                  <span className="relative z-10">{service.tag}</span>
                  {/* Subtle tag sweep */}
                  <motion.div
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    className="absolute inset-0 bg-white/20 skew-x-12"
                  />
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-slate-500 leading-relaxed text-sm mb-4 group-hover:text-slate-700 transition-colors font-medium">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-2">
                  {service.points.map((p) => (
                    <motion.span
                      key={p}
                      whileHover={{ y: -1, scale: 1.02 }}
                      className="text-[10px] font-bold text-slate-600 bg-white/70 backdrop-blur-md border border-slate-100 px-3 py-1.5 rounded-lg shadow-sm group-hover:border-blue-200 group-hover:bg-blue-50/80 transition-all flex items-center gap-2"
                    >
                      <div className="w-1 h-1 rounded-full bg-slate-300 group-hover:bg-blue-500 transition-colors" />
                      {p}
                    </motion.span>
                  ))}
                </div>
              </div>

              <Link to={service.href} className="shrink-0 relative hidden lg:block self-center">
                <motion.div
                  animate={{
                    backgroundColor: open ? "rgb(37 99 235)" : "white",
                    boxShadow: open ? "0 0 25px rgba(37,99,235,0.4)" : "0 0 0px rgba(0,0,0,0)"
                  }}
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center transition-all duration-300 shadow-sm group-hover:border-blue-600"
                >
                  <ArrowUpRight
                    size={20}
                    className={`${open ? "text-white" : "text-slate-400"} transition-colors`}
                  />
                </motion.div>
              </Link>
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
            className="w-full h-full object-cover transition-all duration-700 scale-105 group-hover:scale-100"
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
  const items = ["AI Security", "Machine Learning", "Ethical Hacking", "LLM Defense", "Cyber Intelligence", "Neural Systems", "Cloud Security", "Data Privacy"];
  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-slate-100 py-6 bg-white relative">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="flex items-center gap-16 whitespace-nowrap w-max"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-4 text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── STACK COMPONENT ─────────────────────────────────────────── */
const stackItems = [
  {
    id: "01",
    title: "Python: The Core Foundation",
    desc: "Python is our primary programming language for all AI work, used across language fundamentals, scripting, automation, and model development.",
    details: ["Core Syntax & OOP", "Data Handling Automation", "AI/ML Base Environment"],
    color: "from-blue-600 to-indigo-600"
  },
  {
    id: "02",
    title: "Artificial Intelligence (AI)",
    desc: "Core methodologies for problem-solving and intelligent system design, applied directly within our live project development modules.",
    details: ["Intelligent System Design", "Applied Problem Solving", "Real-world Logic Frameworks"],
    color: "from-indigo-600 to-purple-600"
  },
  {
    id: "03",
    title: "Machine Learning (ML)",
    desc: "The operational core of our work, covering Supervised/Unsupervised learning and the end-to-end pipeline from data to deployment.",
    details: ["Predictive Modelling", "Pattern Recognition", "Pipeline Optimization"],
    color: "from-purple-600 to-pink-600"
  },
  {
    id: "04",
    title: "Deep Learning",
    desc: "Our most advanced layer, focusing on Neural Network architectures and training models at scale for CV and NLP demands.",
    details: ["Neural Architectures", "Large-scale Training", "Computer Vision & NLP"],
    color: "from-pink-600 to-rose-600"
  }
];

function AppliedAIStack() {
  const [items, setItems] = useState(stackItems);

  useEffect(() => {
    const timer = setInterval(() => {
      setItems((prev) => {
        const [first, ...rest] = prev;
        return [...rest, first];
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleItemClick = (clickedItem) => {
    setItems((prev) => {
      const index = prev.findIndex(item => item.id === clickedItem.id);
      if (index === 0) return prev;
      const part1 = prev.slice(index);
      const part2 = prev.slice(0, index);
      return [...part1, ...part2];
    });
  };

  const activeItem = items[0];
  const sideItems = items.slice(1);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-6 items-stretch">
      {/* Left: Big Active Item */}
      <motion.div
        layout
        key={activeItem.id}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative min-h-[440px] rounded-[2rem] p-8 lg:p-12 bg-white border border-slate-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col justify-center group"
      >
        {/* Animated Background Decor */}
        <div className={`absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br ${activeItem.color} opacity-[0.03] rounded-full -mr-64 -mt-64 blur-3xl`} />

        <div className="relative z-10">
          <motion.span
            layoutId={`id-${activeItem.id}`}
            className={`inline-block px-5 py-2 rounded-full bg-gradient-to-r ${activeItem.color} text-white text-[10px] font-black uppercase tracking-[0.3em] mb-6 shadow-lg shadow-blue-500/20`}
          >
            Phase {activeItem.id}
          </motion.span>

          <motion.h3
            layoutId={`title-${activeItem.id}`}
            className="text-3xl lg:text-4xl font-black text-slate-900 mb-5 tracking-tight leading-[1.1]"
          >
            {activeItem.title}
          </motion.h3>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg lg:text-xl leading-relaxed mb-8 font-medium max-w-xl"
          >
            {activeItem.desc}
          </motion.p>

          <div className="flex flex-wrap gap-4">
            {activeItem.details.map((detail, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="px-6 py-3 bg-slate-50 text-slate-700 text-sm font-bold rounded-2xl border border-slate-100 shadow-sm"
              >
                {detail}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Decorative corner icon */}
        <div className="absolute bottom-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
          <Brain size={100} />
        </div>
      </motion.div>

      {/* Right: Small Side Items */}
      <div className="flex flex-col gap-6 justify-center">
        <AnimatePresence mode="popLayout">
          {sideItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={() => handleItemClick(item)}
              className="cursor-pointer group relative p-6 rounded-[1.5rem] bg-white border border-slate-100 hover:border-blue-200 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-center gap-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/10`}>
                  {item.id}
                </div>
                <div className="flex-1">
                  <h4 className="text-slate-900 font-black text-lg group-hover:text-blue-600 transition-colors">
                    {item.title.split(":")[0]}
                  </h4>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">
                    Click to Expand
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowUpRight size={18} />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Static Note */}
        <div className="mt-4 p-6 rounded-[1.5rem] bg-slate-900 text-white relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-sm font-bold leading-relaxed relative z-10">
            "Our AI framework is built on a philosophy of continuous adaptation—integrating emerging tools as they redefine the global landscape."
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN ──────────────────────────────────────────────────────── */
export default function About() {
  const [activePhil, setActivePhil] = useState(0);
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setActivePhil((p) => (p + 1) % philosophyPoints.length), 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-[#f8fafc] min-h-screen font-['Outfit'] overflow-x-hidden">
      <SEO
        title="About Us | Our Vision & Expert Team"
        description="Learn about ConvoSec AI's mission to bridge the gap between technical education and real-world project execution in AI, ML, and Cybersecurity."
        keywords="about ConvoSec AI, AI education mission, cybersecurity training team, Rudra Rajpure, Nikky Bisen"
      />

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
          <div className="grid lg:grid-cols-[1fr_480px] gap-10 xl:gap-24 items-center">

            {/* LEFT: Editorial copy */}
            <motion.div style={{ opacity: heroOpacity }}>
              {/* Eyebrow */}
              <FadeReveal delay={0.1}>
                <div className="flex items-center gap-3 mb-10">
                  <div className="w-8 h-px bg-blue-600" />
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em]">
                    ConvoSec AI — Empowering Minds, Engineering Futures
                  </span>
                </div>
              </FadeReveal>

              {/* Headline */}
              <div className="mb-6 sm:mb-8">
                <LineReveal delay={0.2} className="py-2">
                  <h1 className="text-[clamp(32px,6vw,76px)] font-black leading-[1.2] tracking-tight text-slate-900 whitespace-nowrap">
                    Beyond{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                      Intelligence.
                    </span>
                  </h1>
                </LineReveal>
              </div>

              <FadeReveal delay={0.5}>
                <p className="text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mb-6 sm:mb-8 font-light">
                  A technology-driven venture operating at the intersection of technical education and real-world project execution.
                  We deliver two core functions under one unified platform — structured technical training and live
                  project-based work — both anchored in AI, Machine Learning, Deep Learning, and Cybersecurity (VAPT).
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
                    onClick={() => missionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    Our Mission
                    <div className="w-4 h-px bg-current" />
                  </motion.button>
                </div>
              </FadeReveal>

              {/* Stats strip */}
              <FadeReveal delay={0.78}>
                <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-6 sm:gap-10 mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-200/80">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{s.value}</p>
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
              className="relative flex justify-center items-center order-first lg:order-last -mt-4 lg:-mt-12"
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



      {/* ── VISUAL IDENTITY GRID — SEAMLESS & COMPACT ── */}
      <section ref={missionRef} className="py-0 bg-white">
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 auto-rows-[250px] sm:auto-rows-[300px] lg:h-[650px] overflow-hidden border-none rounded-none">

            {/* Vision Statement (Large) */}
            <FadeReveal className="lg:col-span-2 lg:row-span-2 h-full">
              <div className="relative h-full w-full overflow-hidden group cursor-default">
                <img
                  src="/vision.png"
                  alt="Vision"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                {/* Initial Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 p-10 lg:p-14 flex flex-col justify-end group-hover:justify-center transition-all duration-500">
                  <h3 className="text-3xl lg:text-4xl font-black text-white tracking-tight mb-4 group-hover:mb-6">Vision Statement</h3>
                  <div className="max-h-0 opacity-0 group-hover:max-h-[400px] group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
                    <p className="text-white text-lg lg:text-2xl font-black mb-6 leading-tight">
                      "To be a globally recognized learning ecosystem transforming aspiring individuals into industry-ready professionals."
                    </p>
                    <div className="pt-6 border-t border-white/20">
                      <p className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-3">The Outcome</p>
                      <p className="text-white/80 text-sm lg:text-base font-light leading-relaxed">
                        Turning technical potential into professional leadership through structured, real-world project excellence.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeReveal>

            {/* Mission Statement */}
            <FadeReveal delay={0.1} className="h-full">
              <div className="relative h-full w-full overflow-hidden group cursor-default border-l border-white/10">
                <img
                  src="/mission.png"
                  alt="Mission"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end group-hover:justify-center transition-all duration-500">
                  <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight mb-2 group-hover:mb-4">Mission Statement</h3>
                  <div className="max-h-0 opacity-0 group-hover:max-h-48 group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
                    <p className="text-white text-sm lg:text-lg font-black mb-3 leading-tight">
                      Empowering learners to lead confidently through industry-aligned education.
                    </p>
                    <p className="text-white/80 text-xs lg:text-sm font-light leading-relaxed">
                      "To deliver high-quality internship experiences in AI/ML, Cybersecurity, and Business Analytics."
                    </p>
                  </div>
                </div>
              </div>
            </FadeReveal>

            {/* Empowerment */}
            <FadeReveal delay={0.2} className="h-full">
              <div className="relative h-full w-full overflow-hidden group cursor-default border-l border-white/10">
                <img
                  src="/emp.jpg"
                  alt="Empowerment"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end group-hover:justify-center transition-all duration-500">
                  <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight mb-2 group-hover:mb-4">Empowerment</h3>
                  <div className="max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
                    <p className="text-white text-sm lg:text-lg font-black mb-3 leading-tight">
                      Architecting technical confidence.
                    </p>
                    <p className="text-white/80 text-xs lg:text-sm font-light leading-relaxed uppercase tracking-wider">
                      Technical depth and scalable engineering mastery at the core.
                    </p>
                  </div>
                </div>
              </div>
            </FadeReveal>

            {/* Leadership */}
            <FadeReveal delay={0.3} className="h-full">
              <div className="relative h-full w-full overflow-hidden group cursor-default border-t border-l border-white/10">
                <img
                  src="/leader.png"
                  alt="Leadership"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end group-hover:justify-center transition-all duration-500">
                  <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight mb-2 group-hover:mb-4">Leadership</h3>
                  <div className="max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
                    <p className="text-white text-sm lg:text-lg font-black mb-3 leading-tight">
                      Cultivating industrial pioneers.
                    </p>
                    <p className="text-white/80 text-xs lg:text-sm font-light leading-relaxed uppercase tracking-wider">
                      Developing the next generation of AI and Cybersecurity leaders.
                    </p>
                  </div>
                </div>
              </div>
            </FadeReveal>

            {/* Ethics */}
            <FadeReveal delay={0.4} className="h-full">
              <div className="relative h-full w-full overflow-hidden group cursor-default border-t border-l border-white/10">
                <img
                  src="/ethic.jpg"
                  alt="Ethics"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-0" />
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="absolute inset-0 p-8 flex flex-col justify-end group-hover:justify-center transition-all duration-500">
                  <h3 className="text-xl lg:text-2xl font-black text-white tracking-tight mb-2 group-hover:mb-4">Ethics</h3>
                  <div className="max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
                    <p className="text-white text-sm lg:text-lg font-black mb-3 leading-tight">
                      Unwavering integrity.
                    </p>
                    <p className="text-white/80 text-xs lg:text-sm font-light leading-relaxed uppercase tracking-wider">
                      Absolute commitment to professional standards and integrity.
                    </p>
                  </div>
                </div>
              </div>
            </FadeReveal>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#f8fafc]">
        <div className="container-shell">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
            <FadeReveal>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.3em] mb-5">Capabilities</p>
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[0.95]">
                Comprehensive AI & <br />
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
          THE GOAL / FOUNDATION
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container-shell">
          <div className="max-w-6xl">
            <FadeReveal>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.3em] mb-6">Our Foundation</p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-10">
                Why ConvoSec AI Was <span className="text-blue-600">Established</span>
              </h2>
            </FadeReveal>

            <div className="grid md:grid-cols-1 gap-12">
              <FadeReveal delay={0.1}>
                <div className="relative">
                  <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-transparent opacity-20" />
                  <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-light italic">
                    "We were established to address the growing convergence of Artificial Intelligence, Cybersecurity, Business Intelligence, and Data Analytics — building a new generation of professionals who can architect, secure, analyze, and intelligently drive the digital ecosystems of tomorrow."
                  </p>
                </div>
              </FadeReveal>

              <FadeReveal delay={0.2}>
                <div className="space-y-8 text-slate-500 text-lg leading-relaxed font-medium">
                  <p>
                    We recognized that the modern industry does not need just coders or analysts in isolation —
                    it needs versatile, cross-domain professionals who can seamlessly operate at the intersection
                    of technology, security, and business intelligence.
                  </p>
                  <p>
                    Our foundation was laid with the belief that practical, hands-on, and industry-integrated
                    education is the only true pathway to producing professionals who are not just employable,
                    but exceptionally impactful. Every course we design, every internship we offer, and every
                    skill we impart is driven by one singular purpose — to equip our learners with the
                    technical depth, analytical mindset, and security awareness needed to thrive and lead
                    in an AI-powered, data-driven, and cyber-resilient world.
                  </p>
                </div>
              </FadeReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          AI TECHNOLOGY FRAMEWORK
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="container-shell">
          <div className="mb-12">
            <FadeReveal>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">The Stack</p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                Our Applied <span className="text-blue-600">AI Framework</span>
              </h2>
            </FadeReveal>
          </div>

          <AppliedAIStack />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          PHILOSOPHY
      ══════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            <div>
              <FadeReveal className="mb-12">
                <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Our Core DNA</p>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                  Philosophy in Motion
                </h2>
              </FadeReveal>

              <div className="relative">
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

                <div className="relative min-h-[320px] overflow-hidden">
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
                          <h3 className="text-2xl lg:text-3xl font-black text-slate-900 leading-tight tracking-tight mb-4">
                            {philosophyPoints[activePhil].title}
                          </h3>
                          <p className="text-slate-500 text-sm lg:text-base leading-relaxed mb-4">
                            {philosophyPoints[activePhil].desc}
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
              </div>
            </div>

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
                      className="w-full h-full object-cover transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/30 to-transparent" />
                  </motion.div>
                </AnimatePresence>

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

      {/* ── FUTURE GOALS & OBJECTIVES ── */}
      <section className="py-24 bg-white">
        <div className="container-shell">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeReveal>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-[0.3em] mb-4">The Horizon</p>
              <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-8">
                Future Goals & <br />
                <span className="text-blue-600">Objectives</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed font-medium max-w-xl">
                We are building towards a future where intelligence and security are inseparable
                components of every digital ecosystem.
              </p>
            </FadeReveal>

            <div className="space-y-4">
              {[
                "Build a unified intelligence platform where AI/ML, Cybersecurity, and Business Analytics work together as one ecosystem",
                "Develop automation-driven security systems powered by predictive analytics and machine learning insights",
                "Transform data into real-time security intelligence, enabling proactive and decision-driven protection",
                "Create self-learning, analytics-driven cybersecurity frameworks that continuously evolve with threats",
                "Enable organizations to make secure, data-driven business decisions through intelligent, integrated technology systems"
              ].map((goal, i) => (
                <FadeReveal key={i} delay={i * 0.1}>
                  <div className="flex gap-8 p-8 bg-white border border-slate-100 group hover:border-slate-900 transition-all duration-500 relative overflow-hidden rounded-none">
                    {/* Index Indicator */}
                    <div className="shrink-0 flex flex-col items-center gap-4">
                      <span className="text-[10px] font-black text-slate-300 group-hover:text-slate-900 transition-colors tracking-widest uppercase">
                        {(i + 1).toString().padStart(2, '0')}
                      </span>
                      <div className="w-px h-full bg-slate-100 group-hover:bg-slate-900 transition-colors" />
                    </div>
                    {/* Goal Content */}
                    <p className="text-slate-600 font-bold leading-relaxed text-[15px] group-hover:text-slate-900 transition-colors">
                      {goal}
                    </p>
                    {/* Industrial Accent Bar */}
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-900 scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-500" />
                  </div>
                </FadeReveal>
              ))}
            </div>
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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

              <div className="relative z-10 p-8 sm:p-12 lg:p-20">
                <div className="max-w-3xl">
                  <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Join the movement</p>

                  <LineReveal>
                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-[0.95] mb-4 sm:mb-6">
                      Build, Secure & Scale
                    </h2>
                  </LineReveal>
                  <LineReveal delay={0.12}>
                    <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black tracking-tight leading-[0.95] mb-8 sm:mb-10">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                        with ConvoSec AI
                      </span>
                    </h2>
                  </LineReveal>

                  <FadeReveal delay={0.3}>
                    <p className="text-slate-400 text-lg font-light leading-relaxed mb-12 max-w-xl">
                      Request a Custom Analytics & Cybersecurity Solution or
                      Book Your Free Strategy Consultation today.
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