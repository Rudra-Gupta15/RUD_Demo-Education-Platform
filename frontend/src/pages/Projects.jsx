import { ExternalLink } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

const demoProjects = [
  {
    id: 1,
    title: "Financial Suggestions Application",
    description: "A comprehensive AI-driven advisory platform providing personalized financial recommendations using Google Gemini and real-time market data across stocks, crypto, and more.",
    tech_stack: ["Python", "Flask", "Google Gemini", "yfinance", "SQLite", "TailwindCSS"],
    demo_link: "https://github.com/Nikky-05/Financial_Suggestions_Application_main",
    image: "/financial_advisor_app.png",
    author: "Nikky Bisen"
  }
];

export default function Projects() {
  return (
    <section className="container-shell min-h-screen pt-32 pb-16">
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
                <div className="flex flex-wrap gap-1.5 mb-6 mt-auto">
                  {project.tech_stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] font-bold px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links & Attribution */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-50">
                  <a
                    href={project.demo_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-extrabold text-brandprimary group/link hover:text-indigo-700 transition-colors"
                  >
                    GitHub 
                    <ExternalLink size={16} className="transition-transform group-hover/link:translate-x-1" />
                  </a>
                  
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest text-right">
                    Made by <br />
                    <span className="text-slate-900">{project.author}</span>
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
