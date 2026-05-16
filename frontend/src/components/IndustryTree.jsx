import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const IndustryPillar = ({ tag, title, desc, image, index, activeIndex, setActiveIndex }) => {
  const isActive = activeIndex === index;
  const isAnyActive = activeIndex !== null;

  return (
    <motion.div
      onMouseEnter={() => setActiveIndex(index)}
      onMouseLeave={() => setActiveIndex(null)}
      animate={{
        flex: isActive ? 4 : isAnyActive ? 0.6 : 1,
      }}
      transition={{
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="relative h-[400px] sm:h-[500px] overflow-hidden cursor-pointer border-r border-slate-200/50 last:border-r-0 group flex flex-col will-change-[flex]"
    >
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <motion.img
          animate={{
            scale: isActive ? 1.1 : 1,
            filter: isActive ? "grayscale(0%) brightness(1)" : "grayscale(0.2) brightness(0.8)",
          }}
          transition={{ duration: 0.8 }}
          src={image}
          className="w-full h-full object-cover"
          alt={title}
          onError={(e) => {
            console.error("Image failed to load:", image);
          }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-0"}`} />
      </div>

      {/* Content Container */}
      <div className="relative flex-1 flex flex-col justify-between p-6 z-10 pointer-events-none">
        {/* Header */}
        <div className="flex flex-col h-full">
          <motion.span
            animate={{ opacity: isActive ? 1 : 0.6 }}
            className="text-[9px] font-black uppercase tracking-[0.3em] text-blue-400 mb-4"
          >
            {tag}
          </motion.span>

          <div className="relative flex-1">
            {/* Title Container - Using absolute positioning for the vertical state to prevent layout jiggle */}
            <AnimatePresence mode="wait">
              {isActive ? (
                <motion.h3
                  key="active"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  className="text-2xl sm:text-3xl font-black text-white leading-tight"
                >
                  {title}
                </motion.h3>
              ) : (
                <motion.h3
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-lg font-black text-white/60 whitespace-nowrap absolute top-0 left-0 origin-top-left rotate-90 translate-x-[1.2rem]"
                >
                  {title}
                </motion.h3>
              )}
            </AnimatePresence>
          </div>

          {/* Footer - Description fades in place without shifting layout */}
          <div className="mt-auto min-h-[60px]">
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-xs sm:text-sm font-semibold text-slate-200 leading-relaxed pr-4">
                    {desc}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Static Index - Bottom Right */}
      <div className="absolute bottom-6 right-6 font-black text-5xl text-white/10 pointer-events-none select-none">
        0{index + 1}
      </div>
    </motion.div>
  );
};

export default function IndustryTree() {
  const [activeIndex, setActiveIndex] = useState(null);

  const industries = [
    { tag: "Intelligence", title: "Artificial Intelligence", desc: "Advanced neural systems and computer vision frameworks for industrial automation.", image: "/ai.png" },
    { tag: "Education", title: "Coaching & Education", desc: "Bridging the gap between theory and industry with world-class curriculum.", image: "/edu.png" },
    { tag: "Innovation", title: "LLM Frameworks", desc: "Secure and efficient large language model integration strategies for enterprises.", image: "/llm.png" },
    { tag: "Defense", title: "Cyber Security", desc: "Predictive threat hunting and ironclad defensive architectures for critical assets.", image: "/cyb.png" },
    { tag: "Audit", title: "VAPT Audits", desc: "Elite-level vulnerability assessment and penetration testing to ensure compliance.", image: "/vapt.png" },
    { tag: "Development", title: "Project Building", desc: "End-to-end technical project orchestration, from architectural design to full-scale deployment.", image: "/proj.png" },
  ];

  return (
    <section className="bg-white relative overflow-hidden font-['Outfit'] border-t border-slate-50">
      <div className="max-w-[1600px] mx-auto py-16 sm:py-20">
        {/* Header Section */}
        <div className="px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-4">
              Our Core Ecosystem
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tighter leading-none whitespace-nowrap">
              Specialized <span className="text-blue-600">Industries</span>
            </h2>
          </div>
          <div className="max-w-xs">
            <p className="text-slate-500 text-sm font-semibold leading-relaxed border-l-2 border-blue-600/20 pl-6">
              Elite technical domains where we combine deep research with industrial operational excellence.
            </p>
          </div>
        </div>

        {/* Pillars Grid - Using fixed height for stability */}
        <div className="flex flex-col xl:flex-row w-full border-t border-slate-100 overflow-hidden bg-slate-950">
          {industries.map((item, idx) => (
            <IndustryPillar
              key={idx}
              index={idx}
              tag={item.tag}
              title={item.title}
              desc={item.desc}
              image={item.image}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
            />
          ))}
        </div>
      </div>
    </section>
  );
}