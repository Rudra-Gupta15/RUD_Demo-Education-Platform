import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight, Shield, Brain, Zap, Globe, Lock } from "lucide-react";

const services = [
  {
    id: 1,
    title: "AI & Machine Learning",
    desc: "Build autonomous agents and predictive models with cutting-edge LLMs.",
    icon: Brain,
    color: "bg-blue-600",
    image: "/program_genai.png"
  },
  {
    id: 2,
    title: "Cyber Security",
    desc: "Advanced threat detection, penetration testing, and zero-trust security.",
    icon: Shield,
    color: "bg-indigo-600",
    image: "/program_cyber.png"
  },
  {
    id: 3,
    title: "Cloud Infrastructure",
    desc: "Scalable, secure, and resilient cloud architectures for modern apps.",
    icon: Globe,
    color: "bg-cyan-600",
    image: "/hero1.png"
  },
  {
    id: 4,
    title: "Bespoke Web Solutions",
    desc: "High-performance web applications integrated with AI and security.",
    icon: Zap,
    color: "bg-emerald-600",
    image: "/hero2.png"
  }
];

export default function ServicesCarousel() {
  const [items, setItems] = useState(services);

  const rotate = (direction = 1) => {
    setItems((prev) => {
      const newItems = [...prev];
      if (direction === 1) {
        const last = newItems.pop();
        newItems.unshift(last);
      } else {
        const first = newItems.shift();
        newItems.push(first);
      }
      return newItems;
    });
  };

  useEffect(() => {
    const interval = setInterval(() => rotate(1), 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container-shell">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="w-12 h-1.5 bg-blue-600 rounded-full mb-6"></div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight">
              Our Specialized <br/>
              <span className="text-blue-600">Solutions</span>
            </h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => rotate(-1)}
              className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={24} className="text-slate-600" />
            </button>
            <button 
              onClick={() => rotate(1)}
              className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center hover:bg-slate-800 transition-colors"
            >
              <ChevronRight size={24} className="text-white" />
            </button>
          </div>
        </div>

        <div className="relative flex justify-center items-center h-[500px] md:h-[600px]">
          <AnimatePresence mode="popLayout">
            {items.map((service, index) => {
              // Determine position styles based on index
              let position = "side-left";
              if (index === 1) position = "center";
              if (index === 2) position = "side-right";
              if (index > 2 || index === 0) position = "hidden";

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: position === "hidden" ? 0 : 1,
                    scale: position === "center" ? 1.1 : 0.9,
                    x: position === "center" ? 0 : position === "side-left" ? -350 : 350,
                    zIndex: position === "center" ? 30 : 10,
                    filter: position === "center" ? "grayscale(0%)" : "grayscale(100%)",
                  }}
                  transition={{ 
                    layout: { duration: 0.8, ease: "easeInOut" },
                    duration: 0.8 
                  }}
                  className={`absolute w-[300px] md:w-[450px] aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white ${
                    position === "hidden" ? "pointer-events-none" : ""
                  }`}
                >
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12 text-white`}>
                    <div className="mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${service.color} flex items-center justify-center mb-4`}>
                        <service.icon size={24} />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black mb-3">{service.title}</h3>
                      <p className={`text-sm md:text-base font-medium text-white/80 transition-opacity duration-500 ${position === "center" ? "opacity-100" : "opacity-0"}`}>
                        {service.desc}
                      </p>
                    </div>
                    <motion.div 
                      className={`flex items-center gap-2 font-bold text-sm ${position === "center" ? "opacity-100" : "opacity-0"}`}
                    >
                      Learn More <ArrowRight size={16} />
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
