import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Play, CheckCircle2, Shield, BrainCircuit, Cloud, Lock, Terminal, Target } from "lucide-react";
import Reveal from "../components/Reveal.jsx";
import ModernHero from "../components/ModernHero.jsx";
import SpecializedSolutions from "../components/SpecializedSolutions.jsx";
import LoadingScreen from "../components/LoadingScreen.jsx";
import SEO from "../components/SEO.jsx";
import { useState, useEffect } from "react";

const INDUSTRIES_DATA = [
  {
    id: "education",
    name: "Coaching & Education",
    desc: "Structured courses in AI/ML, Cybersecurity (VAPT), and Business Analytics.",
    img: "/study.jpg",
    color: "from-indigo-600/90"
  },
  {
    id: "projects",
    name: "Project Development",
    desc: "Bespoke AI and Security solutions built for modern business demands.",
    img: "/pro.png",
    color: "from-blue-600/90"
  },
  {
    id: "corporate",
    name: "Corporate Collaboration",
    desc: "Partnering with companies for specialized R&D and consultancy.",
    img: "/col.png",
    color: "from-slate-900/90"
  },
  {
    id: "internships",
    name: "Internships & Placement",
    desc: "Industry-aligned programs to prepare talent for real-world roles.",
    img: "/intern.png",
    color: "from-blue-900/90"
  }
];

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
        title="Home | Empowering Minds, Engineering Futures" 
        description="ConvoSec AI is a premium AI and cybersecurity education platform offering live cohorts, recorded labs, and real-world projects."
        keywords="AI education, cybersecurity courses, ethical hacking, SOC analyst, LLM"
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
                    src="22.jpg"
                    alt="Pioneering AI & Cybersecurity Team"
                    className="w-full h-full object-cover transition-all duration-700"
                  />
                </div>

                {/* Floating Industry Badge */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
                  className="absolute -bottom-8 sm:-bottom-10 right-[15%] w-28 h-28 sm:w-40 sm:h-40 rounded-full bg-[#0a3d62] border-[4px] sm:border-[6px] border-white shadow-2xl flex flex-col items-center justify-center text-white text-center z-20"
                >
                  <span className="text-2xl sm:text-3xl font-black leading-none">NEXT</span>
                  <span className="text-[8px] sm:text-[10px] font-bold uppercase tracking-widest mt-1">GEN<br />STARTUP</span>
                </motion.div>

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
                <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-black text-slate-900 leading-[1.1] tracking-tight">
                  Pioneering AI & <br />
                  <span className="text-blue-600">Cybersecurity Excellence</span>
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

      {/* ── OUR INDUSTRIES SECTION ── */}
      <section className="py-12 sm:py-16 bg-slate-50 overflow-hidden min-h-[70vh] sm:min-h-[80vh] flex items-center">
        <div className="container-shell w-full">
          <div className="text-center mb-8 sm:mb-10 space-y-2">
            <Reveal>
              <div className="w-12 h-1.5 bg-blue-600 rounded-full mx-auto mb-4" />
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900">Our Industries</h2>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto text-sm sm:text-base">
                We deliver specialized AI and Cybersecurity solutions across diverse sectors,
                driving innovation and securing digital infrastructure globally.
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
            {INDUSTRIES_DATA.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.3 } }}
                className="group relative h-[240px] sm:h-[280px] lg:h-[320px] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-xl shadow-slate-200 border-4 border-white cursor-pointer"
              >
                <img
                  src={pillar.img}
                  alt={pillar.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${pillar.color} via-black/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95`} />
                <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                  <h3 className="text-xl sm:text-2xl font-black text-white mb-1 sm:mb-2">
                    {pillar.name}
                  </h3>
                  <p className="text-white/90 text-sm font-medium leading-relaxed max-w-[280px]">
                    {pillar.desc}
                  </p>
                  <div className="mt-3 sm:mt-4 w-10 h-1 bg-white rounded-full transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DETAILED FEATURE SECTION (PILL IMAGE) — hidden on mobile ── */}
      <section className="py-20 sm:py-32 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center gap-10 md:gap-24">

          {/* Left Text */}
          <div className="flex-1 z-10">
            <Reveal>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
                Why Choose <span className="text-blue-600">ConvoSec AI?</span>
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
              <div className="relative w-[260px] h-[500px] lg:w-[280px] lg:h-[550px] rounded-[10rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.2)] border-[12px] border-white z-10 bg-slate-900">
                <img
                  src="/tech_office_collaboration_premium_1777889270846.png"
                  className="w-full h-full object-cover opacity-80"
                  alt="Tech Innovation"
                />
              </div>
            </Reveal>

            {/* Floating Badges */}
            <Reveal delay={0.5}>
              <div className="absolute top-1/4 -left-4 lg:-left-6 bg-white rounded-full p-3 lg:p-4 shadow-2xl border border-slate-50 flex flex-col items-center justify-center w-24 h-24 lg:w-32 lg:h-32 z-20 hover:-translate-y-2 transition-transform cursor-default">
                <Terminal size={28} className="text-blue-600 mb-1 lg:mb-2" />
                <span className="text-[9px] font-black text-center text-[#0a192f] uppercase tracking-widest leading-none">AI Engine</span>
              </div>
            </Reveal>
            <Reveal delay={0.6}>
              <div className="absolute bottom-1/3 -right-4 lg:-right-6 bg-white rounded-full p-3 lg:p-4 shadow-2xl border border-slate-50 flex flex-col items-center justify-center w-24 h-24 lg:w-32 lg:h-32 z-20 hover:-translate-y-2 transition-transform cursor-default">
                <Shield size={28} className="text-blue-600 mb-1 lg:mb-2" />
                <span className="text-[9px] font-black text-center text-[#0a192f] uppercase tracking-widest leading-none">Cyber Shield</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ABSTRACT BACKGROUND & BOTTOM CTA ── */}
      <section className="py-20 sm:py-32 bg-slate-50 relative overflow-hidden flex justify-center items-center border-t border-slate-200">
        {/* Hexagon/Geometric Background Pattern */}
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#94a3b8_2px,transparent_2px)] [background-size:30px_30px]" />

        {/* Abstract Light Shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-60" />

        <div className="relative z-10 text-center max-w-2xl px-4">
          <Reveal>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a192f] mb-4 sm:mb-6 tracking-tight">Ready to secure the future?</h2>
            <p className="text-base sm:text-lg md:text-xl text-slate-600 mb-8 sm:mb-10 font-medium">Join thousands of professionals upgrading their skills today.</p>
            <Link to="/learning" className="inline-block bg-[#0052cc] text-white px-10 sm:px-12 py-4 sm:py-5 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-[0_10px_30px_rgba(0,82,204,0.3)] hover:-translate-y-1">
              Get Started Now
            </Link>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
