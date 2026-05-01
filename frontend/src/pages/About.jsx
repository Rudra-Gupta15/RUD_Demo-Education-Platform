import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Compass, ShieldCheck, Users, Sparkles, Target, Linkedin, Twitter, ArrowRight } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

const infoPoints = [
  "RUD is an AI-first education platform focusing on frontier security.",
  "Our curriculum is built by industry leaders from top tech firms.",
  "We emphasize hands-on projects and real-world portfolio building.",
  "Global community of 12,000+ active technical learners.",
  "Specialized tracks in Generative AI and Cybersecurity audits."
];

const values = [
  {
    icon: Compass,
    color: "text-brandprimary",
    bg: "bg-indigo-50",
    title: "Depth over hype",
    text: "Teach durable fundamentals while staying close to frontier tools."
  },
  {
    icon: ShieldCheck,
    color: "text-plasma",
    bg: "bg-pink-50",
    title: "Security by design",
    text: "Treat trust, privacy, and resilience as core engineering skills."
  },
  {
    icon: Sparkles,
    color: "text-cyan",
    bg: "bg-cyan-50",
    title: "Build in public",
    text: "Convert lessons into demos, portfolios, and measurable progress."
  }
];

const team = [
  {
    name: "Dr. Anaya Rao",
    role: "AI Curriculum Lead",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Applied AI researcher focused on reliable agentic systems and production LLM workflows.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Kabir Sen",
    role: "Cybersecurity Director",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Security engineer and red-team mentor with SOC and consulting experience.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Mira Shah",
    role: "Learning Experience",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "ML engineer who helps learners turn mathematical ideas into useful products.",
    linkedin: "#",
    twitter: "#"
  },
  {
    name: "Nolan Mehta",
    role: "Projects Mentor",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&h=400&q=80",
    bio: "Blue-team lead specializing in enterprise detection and student portfolio reviews.",
    linkedin: "#",
    twitter: "#"
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
    <section className="container-shell min-h-screen pt-32 pb-16">
      {/* Hero Section */}
      <div className="grid gap-12 lg:grid-cols-2 items-center mb-20">
        <Reveal>
          <p className="eyebrow">About RUD</p>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mt-3 leading-tight">
            Preparing technical learners for an AI-shaped, security-critical future.
          </h1>
          <p className="mt-5 text-lg leading-8 text-slate-600 font-medium">
            RUD exists because AI and cybersecurity are no longer separate career lanes. We teach builders how to ship intelligent systems and teach defenders how to understand the automation changing their work.
          </p>
          
          <div className="mt-8 grid grid-cols-2 gap-4 max-w-sm">
            {[["12k+", "Learners trained"], ["96%", "Completion rate"]].map(([val, lbl]) => (
              <div key={lbl} className="rounded-xl border border-slate-100 bg-white p-5 text-center shadow-soft">
                <p className="text-3xl font-extrabold text-brandprimary">{val}</p>
                <p className="mt-1 text-xs text-slate-500 font-bold uppercase tracking-wider">{lbl}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] group">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Team collaborating at RUD"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </div>
        </Reveal>
      </div>

      {/* Brain Video & Looping Points Section */}
      <div className="mb-32 relative">
        <Reveal>
          <div className="mb-10 ml-4">
            <p className="eyebrow">Company Pulse</p>
            <h2 className="text-3xl font-extrabold text-slate-900 mt-2">About Company and Culture</h2>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-[auto_1fr] gap-12 items-center min-h-[500px]">
          <Reveal>
            <div className="flex justify-start relative">
              <div className="relative group">
                {/* Outer Glow */}
                <div className="absolute inset-[-15px] bg-brandprimary/5 rounded-full blur-[50px] group-hover:bg-brandprimary/20 transition-all duration-1000" />
                
                <div className="relative w-80 h-80 xl:w-[400px] xl:h-[400px] rounded-full border-[10px] border-white shadow-2xl overflow-hidden ring-1 ring-slate-100/50">
                  <video 
                    src="/Brain.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover scale-110 grayscale brightness-110 group-hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="relative flex flex-col justify-center h-[400px] -ml-8">
            {/* Vertical Anchor Line */}
            <div className="absolute left-[38px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-100 to-transparent" />

            <div className="relative h-full flex items-center">
              <AnimatePresence mode="popLayout">
                {[0, 1, 2].map((offset) => {
                  const idx = (currentIndex + offset) % infoPoints.length;
                  const isMain = offset === 1;
                  // Tighter semicircle offset
                  const xOffset = offset === 1 ? 64 : 36;
                  
                  return (
                    <motion.div
                      key={`${idx}-${offset}`}
                      initial={{ opacity: 0, y: 50, x: 20 }}
                      animate={{ 
                        opacity: isMain ? 1 : 0.35, 
                        y: (offset - 1) * 110, // More open vertical spacing
                        x: xOffset,
                        scale: isMain ? 1.15 : 0.85,
                        filter: isMain ? "blur(0px)" : "blur(2px)"
                      }}
                      exit={{ opacity: 0, y: -50, x: 20 }}
                      transition={{ 
                        duration: 1.2,
                        ease: [0.22, 1, 0.36, 1] // Custom 'Quint' ease for silky motion
                      }}
                      className="absolute left-0 flex items-center gap-6 max-w-2xl group/item"
                    >
                      <div className={`w-3.5 h-3.5 rounded-full shrink-0 transition-all duration-700 relative z-10 ${isMain ? "bg-brandprimary shadow-[0_0_25px_rgba(79,70,229,0.5)] scale-125" : "bg-slate-200"}`} />
                      <p className={`font-black tracking-tight leading-snug transition-all duration-700 ${isMain ? "text-slate-900 text-3xl" : "text-slate-300 text-lg"}`}>
                        {infoPoints[idx]}
                      </p>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            <div className="absolute bottom-0 left-10 flex items-center gap-4 text-slate-300">
              <div className="flex gap-2">
                {infoPoints.map((_, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ 
                      width: i === currentIndex ? 24 : 6,
                      backgroundColor: i === currentIndex ? "#4f46e5" : "#f1f5f9"
                    }}
                    className="h-1.5 rounded-full" 
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow justify-center">Our Core Values</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">What drives our educational model</h2>
        </div>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-3 mb-24">
        {values.map(({ icon: Icon, color, bg, title, text }, index) => (
          <Reveal key={title} delay={index * 0.07}>
            <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-soft h-full transition-all duration-300 hover:shadow-md">
              <div className={`inline-flex rounded-xl p-3 ${bg}`}>
                <Icon className={color} size={24} />
              </div>
              <h3 className="mt-6 text-xl font-extrabold text-slate-900">{title}</h3>
              <p className="text-slate-500 mt-3 font-medium text-sm leading-relaxed">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Team Section */}
      <Reveal>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="eyebrow justify-center">Meet the Team</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">The experts building the curriculum</h2>
        </div>
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {team.map(({ name, role, image, bio, linkedin, twitter }, index) => (
          <Reveal key={name} delay={index * 0.05}>
            <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-soft h-full flex flex-col items-center text-center group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              {/* Photo */}
              <div className="w-24 h-24 rounded-full overflow-hidden mb-6 bg-slate-100 border-2 border-indigo-50 shadow-sm">
                <img 
                  src={image} 
                  alt={name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <h3 className="font-extrabold text-slate-900 text-lg">{name}</h3>
              <p className="text-brandprimary font-bold text-xs uppercase tracking-wider mt-1">{role}</p>
              
              <p className="mt-4 text-slate-500 text-sm font-medium leading-relaxed mb-6">
                {bio}
              </p>

              {/* Social Links */}
              <div className="flex gap-4 mt-auto">
                <a href={linkedin} className="text-slate-400 hover:text-brandprimary transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href={twitter} className="text-slate-400 hover:text-cyan transition-colors">
                  <Twitter size={18} />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
