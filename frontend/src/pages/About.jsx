import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Compass, ShieldCheck, Users, Sparkles, Target, Linkedin, Mail, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

const infoPoints = [
  "Bridging the gap between academic learning and industry demands.",
  "AI-powered defense meets modern cybersecurity threats.",
  "Hands-on education through real-world impactful projects.",
  "Partnerships with companies for cutting-edge AI solutions.",
  "Building the future of digital security with intelligent systems."
];

const services = [
  {
    icon: Brain,
    color: "text-brandprimary",
    bg: "bg-indigo-50",
    title: "Coaching & Education",
    points: [
      "AI/ML fundamentals (Python, Algorithms, LLMs)",
      "Cybersecurity (Ethical Hacking, SOC Analysis)",
      "Integrated AI in Cybersecurity curriculum",
      "Live mentorship and certification"
    ]
  },
  {
    icon: ShieldCheck,
    color: "text-plasma",
    bg: "bg-pink-50",
    title: "Project Development",
    points: [
      "Real-world AI & Cyber projects for clients",
      "AI: Chatbots, CV, NLP, Automation",
      "Cyber: Vulnerability scanners, SIEM dashboards",
      "Student project assistance & research level projects"
    ]
  },
  {
    icon: Users,
    color: "text-cyan",
    bg: "bg-cyan-50",
    title: "Corporate Collaboration",
    points: [
      "Outsourced AI and Cybersecurity development",
      "Cybersecurity audits and AI consultancy",
      "Staff upskilling programs for companies",
      "Joint R&D for proofs of concept"
    ]
  },
  {
    icon: Target,
    color: "text-brandsecondary",
    bg: "bg-blue-50",
    title: "Internships & Placement",
    points: [
      "Structured internships with real project exposure",
      "Resume building and interview prep",
      "Direct connection with hiring partners",
      "Industry-aligned curriculum for readiness"
    ]
  }
];

const reasons = [
  { title: "AI-Powered Threats", text: "Modern attacks are no longer just human-driven — they are AI-powered (deepfakes, automated exploits)." },
  { title: "The Best Defense", text: "AI is the most powerful tool for anomaly detection, log analysis, and zero-day prediction." },
  { title: "Industry Demand", text: "Companies urgently need professionals who understand the intersection of both domains." },
  { title: "Underserved Niche", text: "This specialized field is vastly underserved in the current education and freelance market." }
];

const team = [
  {
    name: "Rudra.V Rajpure",
    role: "Founder & CEO",
    image: "/rudra_ceo.png",
    bio: "Visionary leader driving the mission to bridge the gap between AI innovation and battle-tested cybersecurity.",
    linkedin: "https://www.linkedin.com/in/rudra-rajgure-/",
    email: "rudraconvosecai@gmail.com"
  },
  {
    name: "Nikky Bisen",
    role: "Co-Founder & CTO",
    image: "/Nikky.jpg",
    bio: "Passionate AI/ML engineer specializing in building intelligent systems and scalable neural architectures.",
    linkedin: "https://www.linkedin.com/in/nikky-bisen-4a609115a/",
    email: "nikky@convosec.ai"
  },
  {
    name: "Rudra Gupta",
    role: "FULL STACK & Extension DEVELOPER",
    image: "/Rudra.png",
    bio: "Frontend engineer and AI/ML intern with a knack for building Chrome Extensions. Focused on practical, user-facing tools.",
    linkedin: "https://www.linkedin.com/in/rudra-kumar-gupta/",
    email: "rudra.gupta@convosec.ai"
  },
  {
    name: "Nolan Mehta",
    role: "Projects Mentor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Blue-team lead specializing in enterprise detection and student portfolio reviews.",
    linkedin: "#",
    email: "nolan@convosec.ai"
  }
];

export default function About() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % infoPoints.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#050505] text-white min-h-screen pt-40 pb-16">
      {/* Premium Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          animate={{ 
            x: [0, 100, 0], 
            y: [0, 50, 0],
            scale: [1, 1.2, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-brandprimary/10 rounded-full blur-[120px]"
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0], 
            y: [0, 100, 0],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 -right-24 w-80 h-80 bg-brandsecondary/10 rounded-full blur-[100px]"
        />
        <motion.div 
          animate={{ 
            x: [0, 50, 0], 
            y: [0, -50, 0] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-0 left-1/4 w-72 h-72 bg-plasma/5 rounded-full blur-[90px]"
        />
      </div>

      <div className="container-shell relative z-10">
        {/* Hero Section */}
        <div className="grid gap-16 lg:grid-cols-2 items-center mb-32 min-h-[70vh]">
          <Reveal>
            <p className="eyebrow !text-brandsecondary">About the Startup</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl mt-4 leading-tight">
              Where AI innovation meets battle-tested Cybersecurity.
            </h1>
            <p className="mt-7 text-lg leading-8 text-slate-400 font-medium">
              We are a tech-forward startup bridging the gap between academic learning and real-world industry demands. By offering hands-on education, building impactful projects, and partnering with companies, we deliver cutting-edge solutions for an intelligent, secure future.
            </p>

            <div className="mt-12 grid grid-cols-2 gap-6 max-w-sm">
              {[["12k+", "Learners trained"], ["96%", "Completion rate"]].map(([val, lbl]) => (
                <div key={lbl} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-center shadow-2xl">
                  <p className="text-3xl font-extrabold text-brandprimary">{val}</p>
                  <p className="mt-1 text-xs text-slate-500 font-bold uppercase tracking-wider">{lbl}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative rounded-[36px] overflow-hidden shadow-2xl aspect-[4/3] group ring-1 ring-white/10">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                alt="Team collaborating at ConvoSec AI"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>

        {/* Brain Video & Looping Points Section */}
        <div className="mb-32 relative">
          <Reveal>
            <div className="mb-10 ml-4">
              <p className="eyebrow !text-brandsecondary">Company Pulse</p>
              <h2 className="text-3xl font-extrabold text-white mt-2">About Company and Culture</h2>
            </div>
          </Reveal>

          <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-center min-h-[500px]">
            <Reveal>
              <div className="flex justify-start relative">
                <div className="relative group">
                  {/* Outer Glow */}
                  <div className="absolute inset-[-15px] bg-brandprimary/20 rounded-full blur-[50px] group-hover:bg-brandprimary/40 transition-all duration-1000" />

                  <div className="relative w-80 h-80 xl:w-[400px] xl:h-[400px] rounded-full border-[10px] border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/20">
                    <video
                      src="/Brain.mp4"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover scale-110 grayscale brightness-150 group-hover:grayscale-0 transition-all duration-1000"
                    />
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="relative flex flex-col justify-center h-[400px] -ml-8">
              {/* Vertical Anchor Line */}
              <div className="absolute left-[38px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />

              <div className="relative h-full flex items-center">
                <AnimatePresence mode="popLayout">
                  {[0, 1, 2].map((offset) => {
                    const idx = (currentIndex + offset) % infoPoints.length;
                    const isMain = offset === 1;
                    const xOffset = offset === 1 ? 64 : 36;

                    return (
                      <motion.div
                        key={`${idx}-${offset}`}
                        initial={{ opacity: 0, y: 50, x: 20 }}
                        animate={{
                          opacity: isMain ? 1 : 0.25,
                          y: (offset - 1) * 110,
                          x: xOffset,
                          scale: isMain ? 1.15 : 0.85,
                          filter: isMain ? "blur(0px)" : "blur(4px)"
                        }}
                        exit={{ opacity: 0, y: -50, x: 20 }}
                        transition={{
                          duration: 1.2,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        className="absolute left-0 flex items-center gap-6 max-w-2xl group/item"
                      >
                        <div className={`w-3.5 h-3.5 rounded-full shrink-0 transition-all duration-700 relative z-10 ${isMain ? "bg-brandsecondary shadow-[0_0_25px_rgba(6,182,212,0.5)] scale-125" : "bg-white/20"}`} />
                        <p className={`font-black tracking-tight leading-snug transition-all duration-700 ${isMain ? "text-white text-3xl" : "text-white/30 text-lg"}`}>
                          {infoPoints[idx]}
                        </p>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              <div className="absolute bottom-0 left-10 flex items-center gap-4 text-white/20">
                <div className="flex gap-2">
                  {infoPoints.map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        width: i === currentIndex ? 24 : 6,
                        backgroundColor: i === currentIndex ? "#06B6D4" : "rgba(255,255,255,0.1)"
                      }}
                      className="h-1.5 rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services & Offerings */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow !text-brandsecondary justify-center">Services & Offerings</p>
            <h2 className="text-3xl font-extrabold text-white mt-2">What we build and teach</h2>
          </div>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-32">
          {services.map(({ icon: Icon, color, bg, title, points }, index) => (
            <Reveal key={title} delay={index * 0.07}>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl h-full transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 flex flex-col">
                <div className={`inline-flex rounded-xl p-3 w-fit ${bg.replace('bg-', 'bg-opacity-10 bg-')}`}>
                  <Icon className={color} size={24} />
                </div>
                <h3 className="mt-6 text-xl font-extrabold text-white">{title}</h3>
                <ul className="mt-4 space-y-2 flex-1">
                  {points.map((p, i) => (
                    <li key={i} className="text-slate-400 font-medium text-xs flex gap-2">
                      <span className="text-brandsecondary">•</span> {p}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Why AI + Cybersecurity */}
        <div className="mb-32">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="eyebrow !text-brandsecondary">Strategic Vision</p>
              <h2 className="text-3xl font-extrabold text-white mt-2 mb-6">Why AI + Cybersecurity Together?</h2>
              <p className="text-slate-400 font-medium mb-8">
                Modern cyber threats are no longer just human-driven — they are AI-powered. We uniquely combine both domains because defense must be as intelligent as the attack.
              </p>
              <div className="grid gap-6">
                {reasons.map((r, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-brandsecondary mt-2 shrink-0" />
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">{r.title}</h4>
                      <p className="text-slate-500 text-xs font-medium">{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="bg-brandprimary/5 border border-brandprimary/20 rounded-[32px] p-8 md:p-12 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <ShieldCheck size={120} className="text-brandprimary" />
                </div>
                <h3 className="text-2xl font-black text-white mb-6">Target Audience</h3>
                <div className="space-y-4">
                  {[
                    "Engineering & BCA/MCA students looking for practical skills",
                    "Freshers preparing for placements in tech roles",
                    "Working professionals upskilling in AI or Cybersecurity",
                    "Startups & SMEs needing affordable AI/Security solutions",
                    "Institutions seeking guest lectures & curriculum support"
                  ].map((target, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                        <ArrowRight size={14} className="text-brandsecondary" />
                      </div>
                      <p className="text-slate-300 font-bold text-sm">{target}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Key Differentiators */}
        <div className="mb-32">
          <Reveal>
            <div className="text-center mb-12">
              <p className="eyebrow !text-brandsecondary justify-center">The Edge</p>
              <h2 className="text-3xl font-extrabold text-white mt-2">Key Differentiators</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: "Practical-first", desc: "No fluff, just real project-based learning." },
              { title: "Expert Mentors", desc: "Industry and research experience combined." },
              { title: "Affordable", desc: "Competitive pricing for students and SMEs." },
              { title: "Unified Domain", desc: "Both fields under one roof for seamless synergy." },
              { title: "Community", desc: "A network of learners, builders, and pros." }
            ].map((diff, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 text-center h-full hover:border-brandsecondary/50 transition-colors">
                  <h4 className="text-white font-black text-sm mb-2">{diff.title}</h4>
                  <p className="text-slate-500 text-[11px] font-bold leading-relaxed">{diff.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <p className="eyebrow !text-brandsecondary justify-center">Meet the Team</p>
            <h2 className="text-3xl font-extrabold text-white mt-2">The experts building the curriculum</h2>
          </div>
        </Reveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {team.map(({ name, role, image, bio, linkedin, email }, index) => (
            <Reveal key={name} delay={index * 0.05}>
              <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl h-full flex flex-col items-center text-center group transition-all duration-300 hover:bg-white/10 hover:-translate-y-1">
                {/* Photo */}
                <div className="w-40 h-40 rounded-full overflow-hidden mb-6 bg-white/5 border-2 border-white/10 shadow-xl">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                  />
                </div>

                <h3 className="font-extrabold text-white text-lg">{name}</h3>
                <p className="text-brandsecondary font-bold text-xs uppercase tracking-wider mt-1">{role}</p>

                <p className="mt-4 text-slate-400 text-sm font-medium leading-relaxed mb-6">
                  {bio}
                </p>

                {/* Social Links */}
                <div className="flex gap-4 mt-auto">
                  <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-brandsecondary transition-colors">
                    <Linkedin size={18} />
                  </a>
                  <a href={`mailto:${email}`} className="text-slate-500 hover:text-brandsecondary transition-colors">
                    <Mail size={18} />
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

