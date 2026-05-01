import { Link } from "react-router-dom";
import { Linkedin, Mail, MapPin, Instagram, Twitter } from "lucide-react";

const footerData = {
  contact: [
    { icon: Mail, text: "rudraconvosecai@gmail.com", href: "mailto:rudraconvosecai@gmail.com" },
    { icon: MapPin, text: "Remote-first, Worldwide" },
    { icon: MapPin, text: "AI & Cybersecurity Hub" },
  ],
  services: [
    "AI Project Development", "Cybersecurity Audits", "Cloud Infrastructure", 
    "Web Application Security", "Deep Learning Models", "Threat Intelligence", 
    "Risk Assessment", "Network Defense"
  ],
  industries: [
    "Finance & Banking", "Healthcare Tech", "Government Systems", "Education", 
    "E-commerce", "SaaS Enterprises", "Critical Infrastructure"
  ],
  products: [
    "ConvoSec Learning Lab", "Cyber Shield Pro", "AI Agent Suite", 
    "Security Sandbox", "Zero-Trust Mesh", "Threat Detector"
  ]
};

const socials = [
  { icon: Linkedin, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Twitter, href: "#" }
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

          {/* Services */}
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3">Services</h3>
              <div className="w-20 h-0.5 bg-white/20 relative">
                <div className="absolute left-0 top-0 w-8 h-full bg-white"></div>
              </div>
            </div>
            <ul className="divide-y divide-white/10">
              {footerData.services.map((item) => (
                <li key={item} className="py-3">
                  <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3">Industries</h3>
              <div className="w-20 h-0.5 bg-white/20 relative">
                <div className="absolute left-0 top-0 w-8 h-full bg-white"></div>
              </div>
            </div>
            <ul className="divide-y divide-white/10">
              {footerData.industries.map((item) => (
                <li key={item} className="py-3">
                  <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-3">Products</h3>
              <div className="w-20 h-0.5 bg-white/20 relative">
                <div className="absolute left-0 top-0 w-8 h-full bg-white"></div>
              </div>
            </div>
            <ul className="divide-y divide-white/10">
              {footerData.products.map((item) => (
                <li key={item} className="py-3">
                  <Link to="#" className="text-sm text-white/70 hover:text-white transition-colors block">
                    {item}
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
