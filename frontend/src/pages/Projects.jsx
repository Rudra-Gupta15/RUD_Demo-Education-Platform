import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X, ArrowRight, Circle, Network, Search, Target, Zap, ShieldCheck, FileText } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Reveal from "../components/Reveal.jsx";

const demoProjects = [
  {
    id: 1,
    title: "Financial Suggestions Application",
    tag: "FinTech AI",
    description: "A comprehensive AI-driven advisory platform providing personalized financial recommendations using Google Gemini and real-time market data.",
    detailed_explanation: "Project Overview: An intelligent financial advisory ecosystem designed to simplify investment decision-making through AI analysis.\n\nKey Concepts:\n- Real-time Market Analysis: Monitors live fluctuations across stocks, crypto, and traditional assets to identify emerging trends.\n- Personalized Financial Strategy: Tailors investment suggestions based on individual user risk tolerance and portfolio goals.\n- Actionable Insights: Converts complex market data into clear, easy-to-understand recommendations for wealth management.",
    tech_stack: ["Python", "Flask", "Gemini", "yfinance"],
    demo_link: "https://github.com/Nikky-05/Financial_Suggestions_Application_main",
    image: "/financial_advisor_app.png",
    color: "#2563eb",
  },
  {
    id: 2,
    title: "Sanskrit Document RAG System",
    tag: "NLP Research",
    description: "A Retrieval-Augmented Generation system for querying Sanskrit documents. Features a fully local CPU-based architecture using TinyLlama and FAISS.",
    detailed_explanation: "Project Overview: A specialized information retrieval system built to unlock knowledge from ancient Sanskrit manuscripts using modern AI.\n\nKey Concepts:\n- Intelligent Document Querying: Allows users to ask natural language questions directly to a collection of complex ancient texts.\n- Contextual Information Recovery: Ensures that retrieved answers maintain the historical and linguistic integrity of the original documents.\n- Secure Local Processing: Operates entirely on local hardware, ensuring that sensitive or rare manuscripts are processed without cloud exposure.",
    tech_stack: ["Python", "TinyLlama", "FAISS", "RAG"],
    demo_link: "https://github.com/Nikky-05/RAG_Sanskrit_Nikky",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80",
    color: "#f59e0b",
  },
  {
    id: 3,
    title: "AgriStack MIS Analytics",
    tag: "GovTech",
    description: "A professional conversational analytics platform for agricultural data. Features an AI-driven NLP layer for natural language querying.",
    detailed_explanation: "Project Overview: A conversational analytics dashboard built for large-scale agricultural data monitoring and government oversight.\n\nKey Concepts:\n- Conversational Data Reporting: Translates plain-language queries into detailed agricultural reports and statistical visualizations.\n- Administrative Governance: Implements regional data scoping to ensure officials only see information relevant to their specific jurisdiction.\n- Real-time KPI Tracking: Visualizes critical agricultural metrics like crop distribution and yield forecasts through high-level interactive charts.",
    tech_stack: ["FastAPI", "PostgreSQL", "Ollama", "Pandas"],
    demo_link: "#",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&q=80",
    color: "#10b981",
  },
  {
    id: 4,
    title: "Cold Email Campaign Automation",
    tag: "Sales Automation",
    description: "A full-stack outreach platform that automates lead generation through Excel-based list processing, Jinja2 personalization, and intelligent rate-limiting.",
    detailed_explanation: "Project Overview: An end-to-end automation engine designed to streamline high-volume cold email outreach while maintaining high deliverability.\n\nKey Concepts:\n- Dynamic Personalization: Utilizes Jinja2 templating to inject lead-specific data into email bodies and subjects for tailored communication.\n- Intelligent Rate Limiting: Implements configurable sending windows and exponential backoff to comply with provider limits and ensure inbox placement.\n- Robust Delivery Logic: Supports dual-provider dispatch (SendGrid API + SMTP fallback) with real-time status tracking from pending to sent or failed.",
    tech_stack: ["FastAPI", "Celery", "Redis", "SendGrid"],
    demo_link: "#",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    color: "#1e293b",
  },
  {
    id: 5,
    title: "PaddleOCR — Indian KYC API",
    tag: "Computer Vision",
    description: "An AI-powered extraction engine for Indian government identity documents, featuring biometric face verification and multi-pass OCR pipelines.",
    detailed_explanation: "Project Overview: A high-precision KYC verification service designed to automate data extraction from Aadhaar, PAN, Voter ID, Passport, and DL.\n\nKey Concepts:\n- Multi-Pass OCR Pipeline: Implements a triple-pass strategy with image enhancement and binarization to ensure high accuracy on low-quality scans.\n- Biometric Face Matching: Integrates MTCNN and InceptionResnetV1 to compare live selfies against document photos with deep learning embeddings.\n- Unified Schema Mapping: Normalizes disparate document formats into a consistent JSON response, simplifying integration for fintech and banking platforms.",
    tech_stack: ["FastAPI", "PaddleOCR", "PyTorch", "MTCNN"],
    demo_link: "#",
    image: "https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&w=800&q=80",
    color: "#0ea5e9",
  },
  {
    id: 6,
    title: "AutoMail for Bank — AI Email System",
    tag: "Enterprise AI",
    description: "An intelligent automation engine for financial institutions that leverages LLMs and RAG to detect customer intent and generate personalized email responses.",
    detailed_explanation: "Project Overview: A next-generation customer service platform designed to revolutionize banking communication through AI-driven automation.\n\nKey Concepts:\n- AI Intent Detection: Utilizes advanced LLMs (GPT-4/Gemini) to accurately classify customer queries from account creation to loan inquiries.\n- RAG-Based Retrieval: Queries internal knowledge bases using vector embeddings (Pinecone/FAISS) to fetch precise, up-to-date banking policies and FAQs.\n- Seamless Handoff Logic: Automatically identifies complex or high-priority inquiries that require human intervention, routing them with full conversation context to specialized departments.",
    tech_stack: ["Python", "GPT-4", "Pinecone", "FastAPI"],
    demo_link: "#",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    color: "#4f46e5",
  },
  {
    id: 7,
    title: "AgriIntel AI Chatbot — Agricultural Intelligence",
    tag: "Agritech",
    description: "An advanced conversational system that analyzes millions of rows of agricultural data to provide instant, data-backed insights and visualizations.",
    detailed_explanation: "Project Overview: A comprehensive intelligence platform designed to empower stakeholders with actionable insights derived from massive agricultural datasets.\n\nKey Concepts:\n- LLM-Driven Dynamic Querying: Interprets natural language to dynamically generate optimized database queries across millions of rows of crop, seasonal, and land data.\n- Intelligent Data Visualization: Automatically generates intuitive charts and regional maps to present complex statistical trends in a user-friendly format.\n- Cross-Referenced Data Integrity: Validates and enriches insights by cross-referencing real-time central and state government agricultural databases.",
    tech_stack: ["Python", "FastAPI", "Gemini", "Apache Spark"],
    demo_link: "#",
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80",
    color: "#84cc16",
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div 
      className="bg-[#fafaf9] min-h-screen font-['Cormorant_Garamond'] overflow-x-hidden selection:bg-slate-900 selection:text-white relative" 
      ref={containerRef}
    >
      {/* Grain texture overlay */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none z-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='4' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-slate-200/40 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-amber-100/30 to-transparent blur-3xl" />
        </div>

        <motion.div className="container-shell" style={{ y: heroY, opacity: heroOpacity }}>
          <Reveal>
            <div className="max-w-5xl">
              <div className="flex items-center gap-6 mb-8">
                <motion.div 
                  className="w-12 h-[1px] bg-slate-900"
                  initial={{ width: 0 }}
                  animate={{ width: 48 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
                <span className="text-xs font-['Space_Mono'] tracking-[0.3em] text-slate-500 uppercase">
                  Our Work
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-light text-slate-900 tracking-tight mb-8">
                Production-Grade <span className="font-serif italic text-blue-600">Innovation</span>
              </h1>
              
              <p className="text-slate-600 text-xl max-w-2xl leading-relaxed font-light">
                Delivering enterprise-scale solutions across AI, Cybersecurity, and Business Analytics 
                — built for real-world impact.
              </p>
              
              <div className="flex items-center gap-8 mt-12">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-['Space_Mono'] text-slate-500">7 Active Projects</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm font-['Space_Mono'] text-slate-500">Enterprise Ready</span>
                </div>
              </div>
            </div>
          </Reveal>
        </motion.div>
      </section>


      {/* ── PROJECTS BENTO GRID ── */}
      <section className="pb-12 relative z-10">
        <div className="container-shell">
          {/* Uniform grid for smaller tiles */}
          <div className="grid md:grid-cols-12 gap-6 auto-rows-[320px]">
            {demoProjects.map((project, idx) => {
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="md:col-span-4 group relative"
                  onMouseEnter={() => setHoveredId(project.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedProject(project)}
                >
                  {/* Main card */}
                  <div className="relative h-full bg-white overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-700 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                    
                    {/* Image layer */}
                    <div className="absolute inset-0">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        style={{
                          filter: hoveredId === project.id ? 'grayscale(0%)' : 'grayscale(100%)',
                          transition: 'filter 0.7s ease'
                        }}
                      />
                      
                      {/* Color overlay */}
                      <motion.div 
                        className="absolute inset-0"
                        style={{ 
                          backgroundColor: project.color,
                          mixBlendMode: 'multiply'
                        }}
                        initial={{ opacity: 0.7 }}
                        animate={{ opacity: hoveredId === project.id ? 0.2 : 0.7 }}
                        transition={{ duration: 0.7 }}
                      />
                      
                      {/* Dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/60 to-slate-900/20" />
                    </div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-between">
                      {/* Top section - number and tag */}
                      <div className="flex items-start justify-between">
                        <motion.span 
                          className="text-[80px] font-light text-white/10 leading-none font-['Space_Mono']"
                          initial={{ y: -20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: idx * 0.1 + 0.3 }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </motion.span>
                        
                        <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full">
                          <span className="text-[10px] font-['Space_Mono'] tracking-widest text-white/90 uppercase">
                            {project.tag}
                          </span>
                        </div>
                      </div>

                      {/* Bottom section - title and tech */}
                      <div>
                        <motion.h3 
                          className="text-2xl font-light text-white mb-2 leading-tight"
                          animate={{ 
                            y: hoveredId === project.id ? -4 : 0 
                          }}
                          transition={{ duration: 0.5 }}
                        >
                          {project.title}
                        </motion.h3>
                        
                        <motion.p 
                          className="text-white/70 text-xs leading-relaxed mb-4 max-w-xl font-light line-clamp-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          {project.description}
                        </motion.p>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2 flex-wrap">
                            {project.tech_stack.slice(0, 3).map((tech, i) => (
                              <motion.div 
                                key={tech}
                                className="px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ 
                                  opacity: hoveredId === project.id ? 1 : 0,
                                  scale: hoveredId === project.id ? 1 : 0.8
                                }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                              >
                                <span className="text-[10px] font-['Space_Mono'] text-white/80">
                                  {tech}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          <motion.div
                            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
                            animate={{ 
                              scale: hoveredId === project.id ? 1.1 : 1,
                              rotate: hoveredId === project.id ? 45 : 0
                            }}
                            transition={{ duration: 0.5 }}
                          >
                            <ArrowRight size={20} className="text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </div>

                    {/* Animated border on hover */}
                    <motion.div
                      className="absolute inset-0 border-2"
                      style={{ borderColor: project.color }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredId === project.id ? 0.5 : 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <motion.div 
              className="fixed inset-0 z-[9999] flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Backdrop */}
              <motion.div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl"
                onClick={() => setSelectedProject(null)}
              />
              
              {/* Modal content */}
              <motion.div
                initial={{ scale: 0.9, y: 40, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 40, opacity: 0 }}
                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                className="relative w-full max-w-7xl h-[90vh] bg-white shadow-2xl overflow-hidden flex flex-col lg:flex-row"
              >
                {/* Left side - Image hero */}
                <div className="lg:w-2/5 relative overflow-hidden bg-slate-900">
                  <img 
                    src={selectedProject.image} 
                    className="w-full h-full object-cover opacity-40 grayscale" 
                    alt={selectedProject.title} 
                  />
                  <div 
                    className="absolute inset-0" 
                    style={{ 
                      background: `linear-gradient(135deg, ${selectedProject.color}DD, ${selectedProject.color}88)`,
                      mixBlendMode: 'multiply'
                    }}
                  />
                  
                  {/* Floating number */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[280px] font-light text-white/10 font-['Space_Mono'] leading-none">
                      {String(selectedProject.id).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-0 left-0 right-0 p-12">
                    <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full inline-block mb-6">
                      <span className="text-[10px] font-['Space_Mono'] tracking-widest text-white uppercase">
                        {selectedProject.tag}
                      </span>
                    </div>
                    <h2 className="text-4xl font-light text-white leading-tight mb-4">
                      {selectedProject.title}
                    </h2>
                    <div className="flex gap-2 flex-wrap">
                      {selectedProject.tech_stack.map(tech => (
                        <div key={tech} className="px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full">
                          <span className="text-[10px] font-['Space_Mono'] text-white/80">{tech}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="flex-1 overflow-y-auto bg-[#fafaf9] relative">
                  {/* Close button */}
                  <button 
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-8 right-8 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:rotate-90 transition-transform duration-500 z-10"
                  >
                    <X size={20} />
                  </button>

                  <div className="p-12 lg:p-16">
                    <div className="mb-12">
                      <div className="w-12 h-[1px] bg-slate-900 mb-6" />
                      <h3 className="text-xs font-['Space_Mono'] tracking-[0.3em] text-slate-500 uppercase mb-8">
                        Project Architecture
                      </h3>
                    </div>

                    <div className="prose prose-lg max-w-none">
                      <p className="text-slate-700 leading-relaxed font-light whitespace-pre-wrap text-lg">
                        {selectedProject.detailed_explanation}
                      </p>
                    </div>

                    {/* Architecture cards */}
                    <div className="grid sm:grid-cols-2 gap-6 mt-16">
                      <div className="p-8 border border-slate-200 bg-white hover:border-slate-900 transition-colors duration-500">
                        <div className="text-xs font-['Space_Mono'] tracking-widest text-slate-400 uppercase mb-4">
                          Primary Stack
                        </div>
                        <div className="text-2xl font-light text-slate-900 mb-2">
                          {selectedProject.tech_stack[0]}
                        </div>
                        <p className="text-sm text-slate-600 font-light">
                          Core execution layer
                        </p>
                      </div>

                      <div className="p-8 border border-slate-200 bg-white hover:border-slate-900 transition-colors duration-500">
                        <div className="text-xs font-['Space_Mono'] tracking-widest text-slate-400 uppercase mb-4">
                          Intelligence
                        </div>
                        <div className="text-2xl font-light text-slate-900 mb-2">
                          {selectedProject.tech_stack[2] || selectedProject.tech_stack[1]}
                        </div>
                        <p className="text-sm text-slate-600 font-light">
                          AI processing engine
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
      {/* ── PROJECT PHILOSOPHY ── */}
      <section className="pb-32">
        <div className="container-shell">
          <Reveal>
            <div className="p-12 lg:p-20 bg-[#f4f1ea] border border-slate-200 rounded-[3rem] shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50 rounded-full blur-3xl -mr-40 -mt-40" />
              <div className="relative z-10 grid lg:grid-cols-[1fr_2fr] gap-16 items-center">
                <div>
                  <p className="text-xs font-['Space_Mono'] tracking-[0.3em] text-blue-600 uppercase mb-4">Our Approach</p>
                  <h2 className="text-4xl lg:text-5xl font-light text-slate-900 tracking-tight leading-[1.1]">
                    Bridging Research <br/>
                    & <span className="font-serif italic text-blue-600">Utility</span>
                  </h2>
                </div>
                <div className="space-y-8 text-slate-600 text-xl font-light leading-relaxed">
                  <p>
                    Our projects are not mere demonstrations — they are high-fidelity, production-grade 
                    ecosystems architected to solve critical challenges in AI, Cybersecurity, and Business Intelligence. 
                    We prioritize operational readiness over abstract theory.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-10 pt-10 border-t border-slate-100">
                    <div>
                      <h4 className="text-slate-900 font-bold text-lg mb-3">Architectural Integrity</h4>
                      <p className="text-base text-slate-500">
                        From multi-pass OCR pipelines to complex RAG systems, we implement deep-tech 
                        solutions that handle non-trivial data complexities.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-slate-900 font-bold text-lg mb-3">Enterprise Scalability</h4>
                      <p className="text-base text-slate-500">
                        Built on robust backends like FastAPI, Celery, and Redis, ensuring every 
                        innovation is ready for deployment at scale.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-12 bg-[#fafaf9] border-t border-slate-100 overflow-hidden relative">
        {/* Abstract Background Decoration */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500 rounded-full blur-[160px]" />
        </div>

        <div className="container-shell relative z-10">
          <div className="max-w-4xl mb-24">
            <Reveal>
              <div className="flex items-center gap-6 mb-8 text-blue-600">
                <div className="w-12 h-[1px] bg-current" />
                <span className="text-xs font-['Space_Mono'] tracking-[0.3em] uppercase">
                  Operating Standard
                </span>
              </div>
              <h2 className="text-4xl lg:text-6xl font-light tracking-tight mb-8 text-slate-900">
                The <span className="font-serif italic text-blue-600">VAPT</span> Framework
              </h2>
              <p className="text-slate-500 text-xl leading-relaxed font-light">
                Vulnerable Accessible Penetration Techniques (VAPT) is our core organizational standard. 
                Everything we do in cybersecurity — from training to live enterprise services — 
                flows through this unified framework.
              </p>
            </Reveal>
          </div>

          {/* 6 Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Networking",
                icon: Network,
                desc: "Foundational security layer covering architecture, protocols, and structural vulnerability assessment.",
                points: ["Network Protocols", "Structural Vulnerability", "Traffic Analysis"]
              },
              {
                title: "Digital Forensics",
                icon: Search,
                desc: "Investigative discipline for evidence preservation, incident recovery, and post-event accountability.",
                points: ["Evidence Integrity", "Incident Reconstruction", "Legal Reporting"]
              },
              {
                title: "Compliance",
                icon: FileText,
                desc: "Governance layer ensuring regulatory alignment, risk management, and formal security audits.",
                points: ["Regulatory Standards", "Risk Governance", "Audit Readiness"]
              },
              {
                title: "Penetration Testing",
                icon: Target,
                desc: "Ethical exploitation of systems to expose vulnerabilities before malicious actors can find them.",
                points: ["Exploit Validation", "Red Teaming", "Actionable Remediation"]
              },
              {
                title: "Threat Analysis",
                icon: Zap,
                desc: "Intelligence-driven identification and prioritization of emerging threats before they materialize.",
                points: ["Attack Vector Mapping", "Predictive Defense", "Threat Intelligence"]
              },
              {
                title: "Security Audits",
                icon: ShieldCheck,
                desc: "Formal governance-level evaluation of entire organizational security postures against global standards.",
                points: ["Control Implementation", "Policy Review", "Gap Analysis"]
              }
            ].map((service, idx) => (
              <Reveal key={service.title} delay={idx * 0.05}>
                <div className="p-7 bg-[#f4f1ea] border border-slate-200/60 rounded-3xl hover:border-blue-300 transition-all duration-500 group h-full flex flex-col shadow-sm hover:shadow-xl">
                  <div className="w-11 h-11 rounded-2xl bg-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-xl shadow-blue-500/20">
                    <service.icon size={18} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black mb-3 text-slate-900 group-hover:text-blue-600 transition-colors tracking-tight">
                    {service.title}
                  </h3>
                  <p className="font-sans text-slate-600 text-[14px] leading-relaxed mb-6 flex-1">
                    {service.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-200/40">
                    {service.points.map(p => (
                      <span key={p} className="px-3 py-1 rounded-full bg-white/40 border border-slate-200/50 text-[10px] font-['Space_Mono'] font-bold uppercase tracking-widest text-slate-500 group-hover:text-blue-600 transition-colors">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}