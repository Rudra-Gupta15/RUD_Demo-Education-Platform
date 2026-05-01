import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play, CheckCircle2, Shield, BrainCircuit, Cloud, Lock, Terminal } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import ModernHero from "../components/ModernHero.jsx";
import SpecializedSolutions from "../components/SpecializedSolutions.jsx";
import { useState, useEffect } from "react";

const INDUSTRIES_DATA = [
  { 
    id: "ai-dev",
    name: "AI Project Development", 
    desc: "End-to-end AI and Cybersecurity solutions built for modern enterprises.",
    img: "/hero1.png",
    color: "from-blue-600/90"
  },
  { 
    id: "coaching",
    name: "Coaching Courses", 
    desc: "Expert-led learning paths in AI, hacking, and digital defense.",
    img: "/program_cyber.png",
    color: "from-indigo-600/90"
  },
  { 
    id: "training",
    name: "Training Programs", 
    desc: "Intensive corporate and individual upskilling for the tech-first future.",
    img: "/hero2.png",
    color: "from-slate-900/90"
  },
  { 
    id: "web-sol",
    name: "Bespoke Web Solutions", 
    desc: "High-performance web products integrated with AI and security.",
    img: "/program_genai.png",
    color: "from-blue-900/90"
  }
];

export default function Home() {
  const [industries, setIndustries] = useState(INDUSTRIES_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndustries(prev => {
        return [prev[1], prev[3], prev[0], prev[2]];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white text-slate-900">
      
      {/* ── HERO SECTION ── */}
      <ModernHero />

      {/* ── INNOVATIVE SOLUTIONS SECTION ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container-shell flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Clipped Image with Floating Badge */}
          <div className="flex-1 relative">
            <Reveal>
              <div className="relative group">
                {/* Main Image with Diagonal Clip Path */}
                <div 
                  className="w-full aspect-[4/3] bg-slate-100 overflow-hidden shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]"
                  style={{ 
                    clipPath: "polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)" 
                  }}
                >
                  <img 
                    src="/innovative_team.png" 
                    alt="Pioneering AI & Cybersecurity Team" 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Success Circle Badge */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="absolute -bottom-10 right-[15%] w-40 h-40 rounded-full bg-[#0a3d62] border-[6px] border-white shadow-2xl flex flex-col items-center justify-center text-white text-center z-20"
                >
                  <span className="text-4xl font-black leading-none">10+</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Successful<br/>Years</span>
                </motion.div>

                {/* Background decorative frame */}
                <div 
                  className="absolute -inset-4 -z-10 bg-slate-50 opacity-50"
                  style={{ 
                    clipPath: "polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)" 
                  }}
                ></div>
              </div>
            </Reveal>
          </div>

          {/* Right: Content */}
          <div className="flex-1 space-y-8">
            <Reveal delay={0.2}>
              <div className="space-y-6">
                <div className="w-16 h-1 bg-[#2563eb] rounded-full"></div>
                <h2 className="text-3xl md:text-[2.75rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                  Pioneering AI & <br/>
                  <span className="text-blue-600">Cybersecurity Excellence</span>
                </h2>
                <div className="space-y-4 text-slate-500 text-base md:text-lg leading-relaxed font-medium">
                  <p>
                    We are a leading-edge AI + Cybersecurity firm specializing in custom 
                    development, bespoke web solutions, and professional upskilling. 
                    We empower organizations to leverage the power of Artificial Intelligence 
                    while maintaining a robust, zero-trust security posture.
                  </p>
                  <p>
                    Focused on user-friendly solutions and strong client relationships, 
                    we ensure seamless alignment of technology with client business goals, 
                    delivering high-quality, updated solutions that exceed expectations.
                  </p>
                </div>
                
                <div className="pt-4">
                  <Link 
                    to="/about" 
                    className="inline-block bg-[#0a3d62] text-white px-10 py-4 rounded-full font-bold text-base hover:bg-[#082d49] transition-all shadow-xl shadow-blue-100 active:scale-95"
                  >
                    More About Us
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ── SPECIALIZED SOLUTIONS SECTION ── */}
      <SpecializedSolutions />

      {/* ── OUR INDUSTRIES SECTION ── */}
      <section className="py-16 bg-slate-50 overflow-hidden min-h-[80vh] flex items-center">
        <div className="container-shell w-full">
          <div className="text-center mb-10 space-y-2">
            <Reveal>
              <div className="w-12 h-1.5 bg-blue-600 rounded-full mx-auto mb-4"></div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900">Our Industries</h2>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base">
                We deliver specialized AI and Cybersecurity solutions across diverse sectors, 
                driving innovation and securing digital infrastructure globally.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <AnimatePresence mode="popLayout">
              {industries.map((pillar) => (
                <motion.div 
                  layout
                  key={pillar.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    layout: { duration: 0.8, ease: "easeInOut" },
                    opacity: { duration: 0.4 }
                  }}
                  whileHover={{ y: -8, scale: 1.01 }}
                  className="group relative h-[320px] rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200 border-4 border-white"
                >
                  <img 
                    src={pillar.img} 
                    alt={pillar.name} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${pillar.color} via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95`}></div>
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-2xl font-black text-white mb-2">
                      {pillar.name}
                    </h3>
                    <p className="text-white/90 text-sm font-medium leading-relaxed max-w-[280px]">
                      {pillar.desc}
                    </p>
                    <div className="mt-4 w-10 h-1 bg-white rounded-full transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>


      {/* ── DETAILED FEATURE SECTION (PILL IMAGE) ── */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-16 md:gap-24">
          
          {/* Left Text */}
          <div className="flex-1 z-10">
            <Reveal>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                Why Choose <span className="text-blue-600">RUD?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-slate-600 mb-10 leading-relaxed text-lg font-medium">
                We don't just teach technology; we build it. RUD offers a unique synergy 
                where professional project development meets elite-level education. 
                Our dual-focus approach ensures that our students learn from active 
                practitioners, and our clients receive solutions built with the latest 
                industry rigor.
              </p>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="space-y-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052cc] flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                    <BrainCircuit size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0a192f] text-lg">Dual-Expertise Advantage</h4>
                    <p className="text-slate-500 mt-1 font-medium">Benefit from a team that actively builds AI systems while leading the next generation of tech talent.</p>
                  </div>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0052cc] flex items-center justify-center shrink-0 border border-blue-100 shadow-sm">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0a192f] text-lg">Commercial-Grade Labs</h4>
                    <p className="text-slate-500 mt-1 font-medium">Access the same secure environments we use for our commercial projects, providing professional experience.</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Image (Pill shaped) */}
          <div className="flex-1 relative w-full flex justify-center py-10">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_2px,transparent_2px),linear-gradient(to_bottom,#f1f5f9_2px,transparent_2px)] bg-[size:60px_60px] opacity-80 z-0"></div>
            
            <Reveal delay={0.3}>
              <div className="relative w-[280px] h-[550px] rounded-[10rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.2)] border-[12px] border-white z-10 bg-slate-900">
                <img 
                  src="/program_cyber.png" 
                  className="w-full h-full object-cover opacity-80" 
                  alt="Tech Innovation"
                />
              </div>
            </Reveal>
            
            {/* Floating Badges */}
            <Reveal delay={0.5}>
              <div className="absolute top-1/4 -left-6 bg-white rounded-full p-4 shadow-2xl border border-slate-50 flex flex-col items-center justify-center w-32 h-32 z-20 hover:-translate-y-2 transition-transform cursor-default">
                <Terminal size={36} className="text-blue-600 mb-2" />
                <span className="text-[10px] font-black text-center text-[#0a192f] uppercase tracking-widest leading-none">AI Engine</span>
              </div>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="absolute bottom-1/3 -right-6 bg-white rounded-full p-4 shadow-2xl border border-slate-50 flex flex-col items-center justify-center w-32 h-32 z-20 hover:-translate-y-2 transition-transform cursor-default">
                <Shield size={36} className="text-blue-600 mb-2" />
                <span className="text-[10px] font-black text-center text-[#0a192f] uppercase tracking-widest leading-none">Cyber Shield</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ABSTRACT BACKGROUND & BOTTOM CTA ── */}
      <section className="py-32 bg-slate-50 relative overflow-hidden flex justify-center items-center border-t border-slate-200">
        {/* Hexagon/Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_2px,transparent_2px)] [background-size:30px_30px]"></div>
        
        {/* Abstract Light Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-60"></div>

        <div className="relative z-10 text-center max-w-2xl px-4">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a192f] mb-6 tracking-tight">Ready to secure the future?</h2>
            <p className="text-lg md:text-xl text-slate-600 mb-10 font-medium">Join thousands of professionals upgrading their skills today.</p>
            <Link to="/learning" className="inline-block bg-[#0052cc] text-white px-12 py-5 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-[0_10px_30px_rgba(0,82,204,0.3)] hover:-translate-y-1">
              Get Started Now
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
