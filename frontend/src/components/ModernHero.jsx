import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Typewriter({ words }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), 1500);
      return;
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
      setSpeed(reverse ? 50 : 100);
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, speed]);

  return (
    <span className="inline-block whitespace-nowrap">
      {words[index].substring(0, subIndex)}
      <span className="inline-block w-[3px] h-[0.9em] bg-[#00a8cc] ml-1 align-middle animate-pulse"></span>
    </span>
  );
}

export default function ModernHero() {
  return (
    <section className="relative min-h-screen bg-white text-[#0f172a] overflow-hidden font-['Outfit'] flex items-center pt-28 sm:pt-32">
      {/* Background Image with Neural Network */}
      <div
        className="absolute inset-0 z-0 opacity-40 bg-center bg-cover"
        style={{ backgroundImage: "url('/hero_bg.png')" }}
      />

      {/* Subtle overlay to ensure text readability */}
      <div className="absolute inset-0 bg-white/20 z-0" />

      <div className="container-shell relative z-10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full py-8 lg:py-0">

        {/* Left Side: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {/* Logo Name / Brand */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl lg:text-8xl font-black text-[#0f172a] mb-4 tracking-tighter drop-shadow-[6px_6px_0px_rgba(15,23,42,0.08)]"
          >
            ConvoSec AI
          </motion.h2>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="font-black leading-[1.1] tracking-tight mb-6 sm:mb-8 text-[#0f172a]"
          >
            <div className="text-[2.25rem] lg:text-5xl md:whitespace-nowrap">
              <span>Unifying </span>
              <span className="text-[#00a8cc]">
                <Typewriter words={["Intelligence", "Neural Networks", "Data Streams"]} />
              </span>
            </div>
            <div className="text-[2.25rem] lg:text-5xl md:whitespace-nowrap">
              <span>Securing </span>
              <span className="text-[#004aad]">
                <Typewriter words={["Every Signal", "Global Networks", "Future Systems"]} />
              </span>
            </div>
          </motion.h1>

          {/* Tagline & Slogan */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-7 sm:mb-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-[2px] bg-[#00a8cc] shrink-0" />
              <p className="text-base sm:text-lg lg:text-2xl text-slate-700 font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                Convolutional Intelligence
              </p>
            </div>
            <p className="text-sm sm:text-lg lg:text-xl text-slate-500 font-medium italic pl-11">
              "Secure Every Signal."
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap gap-3 sm:gap-5"
          >
            <Link
              to="/about"
              className="px-7 sm:px-10 py-3 sm:py-4 bg-[#004aad] text-white rounded-full font-black text-sm lg:text-base transition-all hover:bg-[#003a8a] hover:shadow-xl hover:shadow-blue-200 active:scale-95 uppercase tracking-wider"
            >
              About Us
            </Link>
            <Link
              to="/projects"
              className="px-7 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-[#00a8cc] text-[#00a8cc] rounded-full font-black text-sm lg:text-base hover:bg-[#00a8cc] hover:text-white transition-all active:scale-95 uppercase tracking-wider"
            >
              Explore Innovation
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side: Hero Logo / Shield */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96], delay: 0.2 }}
          className="relative flex justify-center items-center order-first lg:order-last -mt-6 lg:-mt-12 mb-8 lg:mb-0"
        >
          <div className="relative p-6 xl:p-10">
            {/* 1. Middle Security Shield (Counter-rotating Arc) */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2 z-0"
            >
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="47"
                  fill="none"
                  stroke="url(#shield-gradient)"
                  strokeWidth="2.5"
                  strokeDasharray="60 180"
                  strokeLinecap="round"
                  animate={{ strokeDasharray: ["40 200", "120 120", "40 200"] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                />
                <defs>
                  <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#001a4d" />
                    <stop offset="100%" stopColor="#003399" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>

            {/* 2. Core Pulse Aura */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.25, 0.1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-6 bg-gradient-to-br from-[#001a4d] to-[#003399] rounded-full blur-[80px] z-0"
            />

            <motion.div
              layoutId="hero-logo"
              className="relative w-[320px] sm:w-[380px] md:w-[420px] lg:w-full lg:max-w-[480px] aspect-square rounded-full border-[12px] sm:border-[18px] border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden bg-white p-6 flex items-center justify-center z-10"
            >
              {/* Main Logo Image fitted in circle */}
              <img
                src="/logo.png"
                alt="ConvoSec AI Hero"
                className="w-full h-full object-contain"
              />

              {/* Internal subtle depth shadow */}
              <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(0,0,0,0.03)] pointer-events-none" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator (Optional, but looks premium) */}
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

