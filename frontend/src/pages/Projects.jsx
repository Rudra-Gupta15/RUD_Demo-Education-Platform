import { ExternalLink } from "lucide-react";
import Reveal from "../components/Reveal.jsx";

const demoProjects = [
  {
    id: 1,
    title: "AI-Powered Threat Detection",
    description: "An advanced machine learning model trained to detect zero-day vulnerabilities and network anomalies in real-time.",
    tech_stack: ["Python", "TensorFlow", "Scikit-Learn", "AWS"],
    demo_link: "#",
    image: "/program_cyber.png"
  },
  {
    id: 2,
    title: "Zero Trust Network Architecture",
    description: "A secure access framework implementing identity-based authentication, microsegmentation, and continuous monitoring.",
    tech_stack: ["Go", "Kubernetes", "Istio", "HashiCorp Vault"],
    demo_link: "#",
    image: "/program_cyber.png"
  },
  {
    id: 3,
    title: "SynapseLearn Autonomous Agent",
    description: "An AI agent capable of writing, testing, and deploying secure code based on natural language requirements.",
    tech_stack: ["React", "Node.js", "OpenAI API", "PostgreSQL"],
    demo_link: "#",
    image: "/program_genai.png"
  },
  {
    id: 4,
    title: "Financial Fraud Analytics Suite",
    description: "Real-time transaction analysis pipeline that flags suspicious patterns and prevents fraudulent charges.",
    tech_stack: ["Python", "Apache Spark", "Kafka", "MongoDB"],
    demo_link: "#",
    image: "/program_pmp.png"
  },
  {
    id: 5,
    title: "Next-Gen SIEM Dashboard",
    description: "A centralized security operations center interface providing actionable insights from distributed logs.",
    tech_stack: ["Vue.js", "Elasticsearch", "Logstash", "Kibana"],
    demo_link: "#",
    image: "/program_cyber.png"
  },
  {
    id: 6,
    title: "Predictive Health Analytics",
    description: "Machine learning models predicting patient outcomes and optimizing resource allocation for hospitals.",
    tech_stack: ["R", "Python", "Docker", "GCP"],
    demo_link: "#",
    image: "/program_genai.png"
  }
];

export default function Projects() {
  return (
    <section className="container-shell min-h-screen py-16">
      <Reveal>
        <p className="eyebrow">Projects</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mt-3">
          Real-world builds from the SynapseLearn studio.
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
                      className="text-xs font-bold px-2.5 py-1 bg-slate-50 border border-slate-100 text-slate-600 rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Demo Link */}
                <a
                  href={project.demo_link}
                  className="inline-flex items-center gap-2 text-sm font-extrabold text-brandprimary group/link hover:text-indigo-700 transition-colors"
                >
                  View Live Demo 
                  <ExternalLink size={16} className="transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
