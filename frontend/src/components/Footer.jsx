import { Link } from "react-router-dom";
import { Linkedin, Mail, MapPin, Instagram, Twitter } from "lucide-react";

const footerData = {
  contact: [
    { icon: Mail, text: "rudraconvosecai@gmail.com", href: "mailto:rudraconvosecai@gmail.com" },
    { icon: MapPin, text: "Remote-first, Worldwide" },
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
    <footer className="bg-[#021526] text-white pt-20 pb-10">
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

          {/* Programs (was Services) */}
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

          {/* Resources (was Industries) */}
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

          {/* Company (was Products) */}
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
          
          <p className="text-sm text-white/70 font-medium">
            © {new Date().getFullYear()} CONVOSEC AI PLATFORM. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-xs font-medium text-white/70">
            <Link to="#" className="hover:text-white transition-colors">Site Map</Link>
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
