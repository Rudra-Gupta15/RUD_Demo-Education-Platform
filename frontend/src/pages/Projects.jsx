import { useState } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, X, Info, CheckCircle2, Cpu, Database, MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "../components/Reveal.jsx";


const demoProjects = [
  {
    id: 1,
    title: "Financial Suggestions Application",
    description: "A comprehensive AI-driven advisory platform providing personalized financial recommendations using Google Gemini and real-time market data.",
    detailed_explanation: "Project Overview: An intelligent financial advisory ecosystem designed to simplify investment decision-making through AI analysis.\n\nKey Concepts:\n- Real-time Market Analysis: Monitors live fluctuations across stocks, crypto, and traditional assets to identify emerging trends.\n- Personalized Financial Strategy: Tailors investment suggestions based on individual user risk tolerance and portfolio goals.\n- Actionable Insights: Converts complex market data into clear, easy-to-understand recommendations for wealth management.",
    tech_stack: ["Python", "Flask", "Google Gemini", "yfinance", "SQLite", "TailwindCSS"],
    demo_link: "https://github.com/Nikky-05/Financial_Suggestions_Application_main",
    image: "/financial_advisor_app.png",
  },
  {
    id: 2,
    title: "Sanskrit Document RAG System",
    description: "A Retrieval-Augmented Generation system for querying Sanskrit documents. Features a fully local CPU-based architecture using TinyLlama and FAISS.",
    detailed_explanation: "Project Overview: A specialized information retrieval system built to unlock knowledge from ancient Sanskrit manuscripts using modern AI.\n\nKey Concepts:\n- Intelligent Document Querying: Allows users to ask natural language questions directly to a collection of complex ancient texts.\n- Contextual Information Recovery: Ensures that retrieved answers maintain the historical and linguistic integrity of the original documents.\n- Secure Local Processing: Operates entirely on local hardware, ensuring that sensitive or rare manuscripts are processed without cloud exposure.",
    tech_stack: ["Python", "TinyLlama", "FAISS", "Sentence-Transformers", "RAG"],
    demo_link: "https://github.com/Nikky-05/RAG_Sanskrit_Nikky",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "AgriStack MIS Analytics",
    description: "A professional conversational analytics platform for agricultural data. Features an AI-driven NLP layer for natural language querying.",
    detailed_explanation: "Project Overview: A conversational analytics dashboard built for large-scale agricultural data monitoring and government oversight.\n\nKey Concepts:\n- Conversational Data Reporting: Translates plain-language queries into detailed agricultural reports and statistical visualizations.\n- Administrative Governance: Implements regional data scoping to ensure officials only see information relevant to their specific jurisdiction.\n- Real-time KPI Tracking: Visualizes critical agricultural metrics like crop distribution and yield forecasts through high-level interactive charts.",
    tech_stack: ["FastAPI", "PostgreSQL", "Ollama", "Pandas", "Chart.js", "Python"],
    demo_link: "#",
    image: "https://images.unsplash.com/photo-1595841696677-6489ff3f8cd1?auto=format&fit=crop&w=800&q=80",
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section className="container-shell min-h-screen pt-32 pb-16 relative">
      <Reveal>
        <p className="eyebrow">Projects</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mt-3">
          Real-world builds from the ConvoSec AI studio.
        </h1>
        <p className="text-slate-500 mt-4 max-w-2xl font-medium">
          Every project here started as a course capstone and became a showcase of what AI and cybersecurity skills look like in practice.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {demoProjects.map((project, index) => (
          <Reveal key={project.id} delay={index * 0.05}>
            <div className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-soft flex flex-col h-full group transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              {/* Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100 border-b border-slate-100">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-brandprimary shadow-sm">
                  Featured
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-brandprimary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-bold px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-slate-50 text-slate-900 font-bold text-sm rounded-xl border border-slate-100 transition-all hover:bg-brandprimary hover:text-white hover:border-brandprimary hover:shadow-lg active:scale-95 group/btn"
                >
                  <Info size={16} className="transition-transform group-hover/btn:rotate-12" />
                  Explanation of the Project
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Explanation Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {selectedProject && (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-md cursor-zoom-out"
              />
              
              {/* Modal Content Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 40 }}
                className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col max-h-full"
              >
                <div className="p-8 overflow-y-auto custom-scrollbar">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-brandprimary uppercase tracking-[0.2em]">Project Deep Dive</p>
                      <h2 className="text-3xl font-black text-slate-900 leading-tight">{selectedProject.title}</h2>
                    </div>
                    <button 
                      onClick={() => setSelectedProject(null)}
                      className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <div className="space-y-8">
                    <div className="prose prose-slate max-w-none">
                      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                        <p className="text-slate-600 font-medium leading-relaxed whitespace-pre-wrap">
                          {selectedProject.detailed_explanation}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Cpu size={20} /></div>
                          <h4 className="font-bold text-slate-900">Core Engine</h4>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Built with {selectedProject.tech_stack[0]} and {selectedProject.tech_stack[1]}</p>
                      </div>
                      <div className="p-5 rounded-2xl border border-slate-100 bg-white shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 bg-indigo-50 text-brandprimary rounded-lg"><Database size={20} /></div>
                          <h4 className="font-bold text-slate-900">Data Layer</h4>
                        </div>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Utilizing {selectedProject.tech_stack.slice(-2).join(", ")}</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-brandsecondary font-bold text-sm">
                        <CheckCircle2 size={18} />
                        Verified Showcase
                      </div>
                      {selectedProject.demo_link !== "#" && (
                        <a
                          href={selectedProject.demo_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-brandprimary text-white rounded-2xl font-bold text-sm shadow-glow transition-all hover:scale-[1.02] active:scale-95"
                        >
                          View Source <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

    </section>
  );
}

