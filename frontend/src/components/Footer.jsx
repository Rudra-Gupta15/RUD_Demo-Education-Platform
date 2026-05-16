import { Link } from "react-router-dom";
import { Linkedin, Mail, MapPin, Instagram, Twitter, Bot } from "lucide-react";

const footerData = {
  contact: [
    { icon: Mail, text: "info@convosecai.com", href: "mailto:info@convosecai.com" },
    { icon: MapPin, text: "Nagpur, India" },
    { icon: MapPin, text: "AI & Cybersecurity Hub" },
  ],
  programs: [
    { name: "AI & Machine Learning", href: "/catalog" },
    { name: "Cybersecurity / VAPT", href: "/catalog" },
    { name: "Deep Learning", href: "/catalog" },
    { name: "Generative AI", href: "/catalog" },
    { name: "Data & Business Analytics", href: "/catalog" }
  ],
  resources: [
    { name: "Course Catalog", href: "/learning" },
    { name: "Research Projects", href: "/projects" },
    { name: "Industry Blog", href: "/blog" },
    { name: "Learning Roadmap", href: "/learning" },
    { name: "Student Portal", href: "/learning" }
  ],
  company: [
    { name: "About ConvoSec", href: "/about" },
    { name: "Join the Team", href: "/contact/careers" },
    { name: "Business Solutions", href: "/contact/business" },
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" }
  ]
};

const socials = [
  { icon: Linkedin, href: "https://linkedin.com/company/rudraconvosec" },
  { icon: Instagram, href: "https://instagram.com/rudraconvosec" },
  { icon: Twitter, href: "https://twitter.com/rudraconvosec" }
];

export default function Footer() {
  return (
    <footer className="bg-[#000913] text-white pt-20 pb-10 font-['Outfit']">
        <div className="container-shell">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            
            {/* Contact Info */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Contact Info</h3>
                <div className="w-20 h-0.5 bg-white/20 relative">
                  <div className="absolute left-0 top-0 w-8 h-full bg-white"></div>
                </div>
              </div>
              <ul className="space-y-8">
                {footerData.contact.map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/80">
                      <item.icon size={18} />
                    </div>
                    {item.href ? (
                      <a href={item.href} className="text-sm text-white/70 hover:text-white transition-colors mt-2">{item.text}</a>
                    ) : (
                      <span className="text-sm text-white/70 mt-2">{item.text}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Programs */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Programs</h3>
                <div className="w-20 h-0.5 bg-white/20 relative">
                  <div className="absolute left-0 top-0 w-8 h-full bg-white"></div>
                </div>
              </div>
              <ul className="divide-y divide-white/10">
                {footerData.programs.map((item) => (
                  <li key={item.name} className="py-3">
                    <Link to={item.href} className="text-sm text-white/70 hover:text-white transition-colors block">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Resources</h3>
                <div className="w-20 h-0.5 bg-white/20 relative">
                  <div className="absolute left-0 top-0 w-8 h-full bg-white"></div>
                </div>
              </div>
              <ul className="divide-y divide-white/10">
                {footerData.resources.map((item) => (
                  <li key={item.name} className="py-3">
                    <Link to={item.href} className="text-sm text-white/70 hover:text-white transition-colors block">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3">Company</h3>
                <div className="w-20 h-0.5 bg-white/20 relative">
                  <div className="absolute left-0 top-0 w-8 h-full bg-white"></div>
                </div>
              </div>
              <ul className="divide-y divide-white/10">
                {footerData.company.map((item) => (
                  <li key={item.name} className="py-3">
                    <Link to={item.href} className="text-sm text-white/70 hover:text-white transition-colors block">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              {socials.map((social, i) => (
                <a key={i} href={social.href} className="text-white/70 hover:text-white transition-colors">
                  <social.icon size={20} />
                </a>
              ))}
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] sm:text-sm text-white/40 font-black uppercase tracking-widest">
                © {new Date().getFullYear()} CONVOSEC AI PLATFORM. All Rights Reserved.
              </p>
            </div>

            <div className="flex gap-6 text-[10px] font-black uppercase tracking-widest text-white/40">
              <Link to="#" className="hover:text-white transition-colors">Site Map</Link>
              <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
            </div>
          </div>
        </div>

        {/* Designed By Credit */}
        <div className="mt-12 flex justify-center">
          <a 
            href="https://rudra-gupta.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.3em] text-white/10 hover:text-white/60 transition-all duration-700 group"
          >
            Designed By <Bot size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-700 text-blue-500/40" />
          </a>
        </div>
      </footer>
    );
}
