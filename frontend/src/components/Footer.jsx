import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ShieldCheck, Twitter } from "lucide-react";

const nav = [
  {
    label: "Platform",
    links: [
      ["Courses", "/courses"],
      ["Online Learning", "/learning"],
      ["Projects", "/projects"],
      ["Blog & Articles", "/blog"]
    ]
  },
  {
    label: "Company",
    links: [
      ["About Us", "/about"],
      ["Contact", "/contact"],
      ["Get Started", "/auth"]
    ]
  },
  {
    label: "Learning Tracks",
    links: [
      ["Agentic AI Systems", "/courses/agentic-ai-systems"],
      ["Ethical Hacking Lab", "/courses/ethical-hacking-lab"],
      ["ML Foundations", "/courses/machine-learning-foundations"],
      ["SOC Blue Team", "/courses/soc-analyst-blue-team"]
    ]
  }
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Twitter, label: "Twitter / X", href: "https://twitter.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Mail, label: "Email", href: "mailto:hello@quorion.ai" }
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-slate-400">
      {/* Decorative Background Glows */}
      <div className="absolute top-0 left-1/4 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 translate-y-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container-shell relative z-10 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="inline-flex items-center gap-3 font-extrabold text-white text-2xl tracking-tight">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow-soft">
                <ShieldCheck size={22} />
              </span>
              SynapseLearn
            </Link>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">
              AI and cybersecurity education for builders, analysts, and future technical leaders. Live cohorts, recorded labs, real projects.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-slate-800 bg-slate-900/50 text-slate-400 transition-all hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-white hover:scale-110 shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {nav.map(({ label, links }) => (
            <div key={label} className="space-y-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-400">{label}</p>
              <ul className="grid gap-3.5">
                {links.map(([text, to]) => (
                  <li key={to}>
                    <Link
                      to={to}
                      className="text-sm text-slate-400 transition-all hover:text-white hover:translate-x-1 inline-block"
                    >
                      {text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-800/60 pt-8 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} SynapseLearn. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 items-center">
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer transition-colors">Terms of Service</span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 font-medium">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
