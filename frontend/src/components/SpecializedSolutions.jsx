import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Brain, Shield, Code, GraduationCap } from "lucide-react";

const SPECIALIZATIONS = [
  {
    id: 1,
    title: "Coaching & Education",
    icon: GraduationCap,
    color: "blue",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    points: [
      "AI/ML Fundamentals (Python, LLMs)",
      "Cybersecurity (Hacking, SOC Analysis)",
      "Integrated AI-Security Curriculum",
      "Live Mentorship & Certification"
    ]
  },
  {
    id: 2,
    title: "Project Development",
    icon: Brain,
    color: "indigo",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
    points: [
      "Bespoke AI Solutions for Business",
      "SIEM Dashboards & Threat Intel",
      "Automated Pipeline Development",
      "Research-Level IEEE Projects"
    ]
  },
  {
    id: 3,
    title: "Corporate Collaboration",
    icon: Code,
    color: "slate",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    points: [
      "Outsourced Tech Development",
      "Cybersecurity Audits & Consultancy",
      "Staff Training & Upskilling",
      "Joint R&D & Proofs of Concept"
    ]
  },
  {
    id: 4,
    title: "Internships & Placement",
    icon: Shield,
    color: "emerald",
    img: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=800&q=80",
    points: [
      "Structured Project-Based Exposure",
      "Resume & Interview Preparation",
      "Direct Hiring Partner Network",
      "Placement Readiness Programs"
    ]
  }
];

export default function SpecializedSolutions() {
  const [index, setIndex] = useState(0);

  const rotateClockwise = () => {
    setIndex((prev) => (prev + 1) % SPECIALIZATIONS.length);
  };

  const rotateCounterClockwise = () => {
    setIndex((prev) => (prev - 1 + SPECIALIZATIONS.length) % SPECIALIZATIONS.length);
  };

  useEffect(() => {
    const timer = setInterval(rotateClockwise, 5000);
    return () => clearInterval(timer);
  }, []);

  const getPosition = (idx) => {
    const diff = (idx - index + SPECIALIZATIONS.length) % SPECIALIZATIONS.length;
    if (diff === 0) return "center";
    if (diff === 1) return "right";
    if (diff === SPECIALIZATIONS.length - 1) return "left";
    return "hidden";
  };

  return (
    <section className="py-32 bg-slate-50 overflow-hidden font-['Outfit']">
      <div className="container-shell">
        <div className="text-center mb-20">
          <div className="w-16 h-1 bg-blue-600 rounded-full mx-auto mb-6"></div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
            Our Specialized Solutions
          </h2>
          <p className="text-slate-500 font-medium mt-4 max-w-2xl mx-auto">
            Deep technical expertise across the most critical domains of the modern digital landscape.
          </p>
        </div>

        <div className="relative h-[600px] flex items-center justify-center">
          {/* Navigation Buttons */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 lg:px-10 z-30 pointer-events-none">
            <button 
              onClick={rotateCounterClockwise}
              className="w-14 h-14 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 pointer-events-auto transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronLeft size={28} />
            </button>
            <button 
              onClick={rotateClockwise}
              className="w-14 h-14 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 pointer-events-auto transition-transform hover:scale-110 active:scale-95"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Cards Container */}
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center perspective-1000">
            <AnimatePresence initial={false}>
              {SPECIALIZATIONS.map((spec, i) => {
                const pos = getPosition(i);
                if (pos === "hidden") return null;

                const isCenter = pos === "center";
                
                return (
                  <motion.div
                    key={spec.id}
                    layout
                    initial={{ 
                      opacity: 0, 
                      scale: 0.8, 
                      x: pos === "right" ? 400 : pos === "left" ? -400 : 0,
                      z: -100 
                    }}
                    animate={{ 
                      opacity: isCenter ? 1 : 0.4, 
                      scale: isCenter ? 1 : 0.7, 
                      x: pos === "right" ? 500 : pos === "left" ? -500 : 0,
                      z: isCenter ? 0 : -300,
                      rotateY: pos === "right" ? -25 : pos === "left" ? 25 : 0,
                      filter: isCenter ? "blur(0px)" : "blur(4px)"
                    }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className={`absolute w-full max-w-[850px] bg-white rounded-[3rem] shadow-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row ${isCenter ? "z-20" : "z-10"}`}
                  >
                    {/* Left: Image Section */}
                    <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden bg-slate-100">
                      <img 
                        src={spec.img} 
                        alt={spec.title} 
                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-tr from-${spec.color}-900/40 to-transparent`}></div>
                    </div>

                    {/* Right: Info Section */}
                    <div className="md:w-1/2 p-10 flex flex-col justify-between">
                      <div>
                        <div className={`w-14 h-14 rounded-2xl bg-${spec.color}-50 flex items-center justify-center text-${spec.color}-600 mb-6`}>
                          <spec.icon size={28} />
                        </div>
                        <h3 className="text-3xl font-black text-slate-900 mb-6">{spec.title}</h3>
                        
                        <div className="space-y-4">
                          {spec.points.map((point, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <CheckCircle2 size={18} className={`text-${spec.color}-500 shrink-0`} />
                              <span className="text-slate-600 font-bold text-sm">{point}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Spec. Unit {spec.id}</span>
                        <button className={`text-${spec.color}-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2 group`}>
                          Learn More <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
