import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play, CheckCircle2, Shield, BrainCircuit, Cloud, Lock, Terminal, Target } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import ModernHero from "../components/ModernHero.jsx";
import SpecializedSolutions from "../components/SpecializedSolutions.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import SEO from "../components/SEO.jsx";
import IndustryTree from "../components/IndustryTree.jsx";
import { useState, useEffect } from "react";



export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial loading delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-white min-h-screen font-sans overflow-x-hidden selection:bg-blue-500 selection:text-white text-slate-900">
      <SEO
        title="ConvoSec | Empowering Minds, Engineering Futures"
        description="ConvoSec AI (convosecai) is a premium AI and cybersecurity education platform. ConvoSec offers live cohorts, recorded labs, and real-world projects."
        keywords="convosec, convosecai, ConvoSec AI, convo sec, AI education, cybersecurity courses, ethical hacking, SOC analyst, LLM"
      />

      {/* ── LOADING SCREEN ── */}
      <AnimatePresence>
        {loading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {/* ── HERO SECTION ── */}
      <ModernHero />

      {/* ── INNOVATIVE SOLUTIONS SECTION ── */}
      <section className="py-16 sm:py-24 bg-white overflow-hidden">
        <div className="container-shell flex flex-col lg:flex-row items-center gap-10 lg:gap-24">

          {/* Left: Clipped Image with Floating Badge */}
          <div className="flex-1 relative w-full">
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
                    src="/22.png"
                    alt="Pioneering AI & Cybersecurity Team"
                    loading="lazy"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>



                {/* Background decorative frame */}
                <div
                  className="absolute -inset-4 -z-10 bg-slate-50 opacity-50"
                  style={{
                    clipPath: "polygon(15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%, 0% 15%)"
                  }}
                />
              </div>
            </Reveal>
          </div>

          {/* Right: Content */}
          <div className="flex-1 space-y-6 sm:space-y-8 mt-10 sm:mt-0">
            <Reveal delay={0.2}>
              <div className="space-y-4 sm:space-y-6">
                <div className="w-16 h-1 bg-[#2563eb] rounded-full" />
                <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-bold text-slate-900 leading-[1.1] tracking-tight">
                  Build Secure & <br />
                  <span className="text-blue-600">Intelligent Systems</span>
                </h2>
                <div className="space-y-3 sm:space-y-4 text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed font-medium">
                  <p>
                    We are a globally recognized learning ecosystem dedicated to transforming
                    aspiring individuals into industry-ready professionals. By bridging the gap
                    between education and real-world technology demands, we empower the next generation
                    of leaders in AI/ML, Cybersecurity, and Business Analytics.
                  </p>
                  <p>
                    From hands-on education to bespoke project development and corporate consultancy,
                    we deliver cutting-edge solutions. We believe the future of digital security
                    lies in intelligent systems — and we're here to build and teach exactly that.
                  </p>
                </div>

                <div className="pt-2 sm:pt-4">
                  <Link
                    to="/about"
                    className="inline-block bg-[#0a3d62] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base hover:bg-[#082d49] transition-all shadow-xl shadow-blue-100 active:scale-95"
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

      {/* ── OUR INDUSTRIES SECTION (DYNAMIC TREE) ── */}
      <IndustryTree />

      {/* ── DETAILED FEATURE SECTION (PILL IMAGE) — hidden on mobile ── */}
      <section className="py-20 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-24">

          {/* Left Text */}
          <div className="flex-1 z-10">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
                Why Choose <span className="text-blue-600">ConvoSec?</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-slate-500 mb-6 sm:mb-8 leading-relaxed text-[15px] sm:text-[16px] font-medium max-w-lg">
                We operate as a technology-first company focused on AI-powered cybersecurity solutions,
                not just a service provider. We address the modern business need where data intelligence
                and security must work together, not separately.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-1 sm:space-y-2">
                {[
                  { icon: BrainCircuit, text: "Integrating AI/ML with security to build intelligent, adaptive systems." },
                  { icon: Shield, text: "Solutions designed to be predictive, scalable, and industry-aligned." },
                  { icon: Target, text: "Positioned as a long-term innovation partner for future growth." },
                  { icon: Lock, text: "Unifying data intelligence and security into a single ecosystem." }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 sm:p-2.5 rounded-xl hover:bg-blue-50 transition-colors group">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <item.icon size={16} />
                    </div>
                    <p className="text-slate-600 font-semibold text-[13px] sm:text-[14px] leading-snug">{item.text}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right Image (Pill shaped) — hidden on mobile to prevent layout issues */}
          <div className="flex-1 relative w-full hidden md:flex justify-center py-10">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_2px,transparent_2px),linear-gradient(to_bottom,#f1f5f9_2px,transparent_2px)] bg-[size:60px_60px] opacity-80 z-0" />

            <Reveal delay={0.3}>
              <div className="relative w-[260px] h-[500px] lg:w-[280px] lg:h-[550px] rounded-full overflow-hidden shadow-xl border-8 border-white z-10 bg-slate-900">
                <img
                  src="/tech_office_collaboration_premium_1777889270846.png"
                  className="w-full h-full object-cover opacity-80"
                  alt="Tech Innovation"
                  loading="lazy"
                />
              </div>
            </Reveal>


          </div>
        </div>
      </section>

      {/* ── ABSTRACT BACKGROUND & BOTTOM CTA ── */}
      <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden flex justify-center items-center border-t border-slate-200">
        {/* Hexagon/Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_2px,transparent_2px)] [background-size:30px_30px]" />



        <div className="relative z-10 text-center max-w-2xl px-4">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a192f] mb-4 sm:mb-6 tracking-tight">Ready to secure the future?</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 font-medium">Join our growing community of professionals upgrading their skills today.</p>
            <Link to="/learning" className="inline-block bg-[#0052cc] text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-[0_10px_30px_rgba(0,82,204,0.3)] hover:-translate-y-1">
              Get Started Now
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
