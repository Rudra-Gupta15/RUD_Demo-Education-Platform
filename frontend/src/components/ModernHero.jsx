import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

export default function ModernHero() {
  const [currentContent, setCurrentContent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentContent((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen bg-[#f1f5f9] text-[#0f172a] overflow-hidden font-['Outfit'] flex items-center pt-32 sm:pt-40 lg:pt-32">
      {/* Background Image with Neural Network & Scale Effect */}
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.15 }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        className="absolute inset-0 z-0 opacity-60 bg-center bg-cover"
        style={{ backgroundImage: "url('/hero_bg.png')" }}
      />

      {/* Radial Vignette & Darkening Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-slate-200/50 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(15,23,42,0.2)_100%)] z-0" />

      <div className="container-shell relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-8 lg:py-0">
        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl -mt-12 lg:mt-0"
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[#0047AB] font-bold tracking-[0.25em] uppercase text-xs sm:text-sm mb-4"
          >
            Welcome to our innovation space
          </motion.p>

          {/* Main Brand Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-5xl lg:text-7xl font-black mb-6 tracking-tighter"
          >
            <span className="bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              ConvoSec AI
            </span>
          </motion.h1>

          {/* Dynamic Content Switching - Rigid height container to eliminate all flexing */}
          <div className="relative w-full mb-6">
            <div className="relative h-[220px] sm:h-[260px] lg:h-[220px]">
              <AnimatePresence mode="wait">
                {currentContent === 0 ? (
                  <motion.div
                    key="ai-content"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col justify-start"
                  >
                    {/* Sub-headline */}
                    <h2 className="text-slate-700 font-bold text-2xl lg:text-4xl mb-4 leading-[1.1] max-w-2xl">
                      Next-Generation AI Product Development & Strategic Enterprise Consulting
                    </h2>

                    {/* Detailed Paragraph */}
                    <p className="text-slate-500 font-medium text-base lg:text-xl max-w-2xl leading-relaxed">
                      We specialize in building secure, scalable AI ecosystems and conducting rigorous business transformation through LLM integration, Computer Vision, and Enterprise Automation to drive sustainable growth and innovation.
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="cyber-content"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex flex-col justify-start"
                  >
                    {/* Sub-headline */}
                    <h2 className="text-slate-700 font-bold text-2xl lg:text-4xl mb-4 leading-[1.1] max-w-2xl">
                      Modern Cybersecurity Solutions for Businesses, Startups & Digital Products
                    </h2>

                    {/* Detailed Paragraph */}
                    <p className="text-slate-500 font-medium text-base lg:text-xl max-w-2xl leading-relaxed">
                      We help businesses strengthen their digital infrastructure through practical cybersecurity solutions focused on prevention, detection, compliance, secure development, and risk reduction.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Content Indicators (Dots) */}
            <div className="flex gap-2 mt-8">
              {[0, 1].map((idx) => (
                <motion.div
                  key={idx}
                  onClick={() => setCurrentContent(idx)}
                  animate={{
                    width: currentContent === idx ? 24 : 8,
                    backgroundColor: currentContent === idx ? "#004aad" : "#cbd5e1",
                  }}
                  className="h-2 rounded-full cursor-pointer transition-all duration-300 hover:bg-[#004aad]/50"
                />
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to="/about"
              className="px-8 py-3.5 bg-[#004aad] text-white rounded-full font-bold text-sm transition-all hover:bg-[#003a8a] hover:shadow-xl hover:shadow-blue-200 active:scale-95 uppercase tracking-wider"
            >
              About Us
            </Link>
            <Link
              to="/projects"
              className="px-8 py-3.5 bg-transparent border-2 border-[#00a8cc] text-[#00a8cc] rounded-full font-bold text-sm hover:bg-[#00a8cc] hover:text-white transition-all active:scale-95 uppercase tracking-wider"
            >
              Explore Innovation
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Circular Video Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
          className="relative flex justify-center items-center lg:order-last mb-8 lg:mb-0"
        >
          <div className="relative w-full aspect-square max-w-[420px] flex items-center justify-center">
            {/* Video Container */}
            <div className="relative z-10 w-full aspect-square rounded-full shadow-2xl border border-slate-200 overflow-hidden bg-black flex items-center justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover scale-125"
              >
                <source src="/Hero.mp4" type="video/mp4" />
              </video>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300"
      >
        <div className="w-6 h-10 border-2 border-slate-200 rounded-full flex justify-center p-1">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-1.5 h-1.5 bg-slate-300 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

