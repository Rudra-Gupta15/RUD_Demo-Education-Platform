import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Shield, Lock, Code, GraduationCap } from "lucide-react";
import { useState, useEffect } from "react";

const CAROUSEL_DATA = [
  { id: 1, category: "Development", title: "Custom AI Solutions", icon: Brain, color: "#2563eb", img: "/hero_dashboard.png" },
  { id: 2, category: "Security", title: "Elite Digital Defense", icon: Shield, color: "#ef4444", img: "/hero_cyber.png" },
  { id: 3, category: "Integrated", title: "AI + Cybersecurity", icon: Lock, color: "#8b5cf6", img: "/hero2.png" },
  { id: 4, category: "Products", title: "Bespoke Web Products", icon: Code, color: "#06b6d4", img: "/hero_webdev.png" },
  { id: 5, category: "Education", title: "Corporate Training", icon: GraduationCap, color: "#f59e0b", img: "/program_pmp.png" }
];

export default function ModernHero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_DATA.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeCard = CAROUSEL_DATA[currentIndex];

  return (
    <section className="relative h-screen max-h-screen bg-white text-[#0f172a] overflow-hidden font-['Outfit'] flex items-center pt-32">
      {/* Decorative subtle background elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4 z-0" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-slate-50 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/4 z-0" />

      <div className="container-shell relative z-10 grid lg:grid-cols-2 gap-12 items-center h-full max-h-[85vh]">
        
        {/* Left Side: Text Content */}
        <div className="max-w-2xl flex flex-col justify-center h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563eb] text-[10px] font-extrabold uppercase tracking-widest mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]"></span>
              AI + Cybersecurity Firm
            </div>
            
            {/* Heading */}
            <h1 className="text-5xl lg:text-[4.75rem] font-extrabold leading-[1.05] tracking-tight mb-6 text-[#0f172a]">
              We Build AI. <br/>
              We Secure Systems. <br/>
              <span className="text-[#3b82f6]">We Teach Both.</span>
            </h1>
            
            {/* Subtext */}
            <p className="text-lg lg:text-xl text-slate-500 font-medium leading-relaxed max-w-lg mb-8">
              From custom AI development and bespoke web solutions to elite cybersecurity coaching and corporate training programs.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/learning" 
                className="group flex items-center gap-3 px-8 py-4 bg-[#0f172a] text-white rounded-2xl font-bold text-base transition-all hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-200 active:scale-95"
              >
                Explore Courses <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link 
                to="/contact" 
                className="px-10 py-4 bg-white border border-slate-200 text-[#0f172a] rounded-2xl font-bold text-base hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
              >
                Hire Us
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Visual Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-[650px] lg:max-w-none ml-auto h-full flex items-center"
        >
          {/* Main Visual Image */}
          <div className="relative rounded-[3rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border-8 border-white bg-slate-100 aspect-[4/3] lg:max-h-[60vh] lg:h-full">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeCard.img}
                src={activeCard.img} 
                alt={activeCard.title} 
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Floating Card Carousel */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeCard.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md p-4 pr-10 rounded-[1.5rem] shadow-xl flex items-center gap-4 border border-white min-w-[260px]"
              >
                <div 
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-colors duration-500"
                  style={{ backgroundColor: activeCard.color }}
                >
                   <activeCard.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest mb-0.5" style={{ color: activeCard.color }}>
                    {activeCard.category}
                  </p>
                  <p className="text-sm font-bold text-[#0f172a] whitespace-nowrap">{activeCard.title}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Dots */}
            <div className="absolute bottom-10 right-10 flex gap-2">
              {CAROUSEL_DATA.map((_, idx) => (
                <div 
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-500 ${currentIndex === idx ? "w-8 bg-white" : "w-2 bg-white/40"}`}
                ></div>
              ))}
            </div>
          </div>

          {/* Decorative blurred dot */}
          <div className="absolute -z-10 -bottom-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-60"></div>
        </motion.div>
      </div>
    </section>
  );
}
