import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Grid, Menu, Search, ShieldCheck, User, X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../state/AuthContext.jsx";
import { useCart } from "../state/CartContext.jsx";

const popupCourses = {
  "Generative AI": [
    { title: "Microsoft Applied Agentic AI: Systems Design & Impact", partner: "Microsoft", duration: "10 Weeks", badge: "Trending Now", logo: "Ⓜ️" },
    { title: "Microsoft Applied Generative AI Specialization", partner: "Microsoft", duration: "16 Weeks", badge: "Most Popular", logo: "Ⓜ️" },
    { title: "Advanced Executive Program In Applied Generative AI", partner: "IIT Pravartak", duration: "4 Months", badge: "Most Popular", logo: "🎓" },
    { title: "Michigan Engineering Applied Generative AI Specialization", partner: "Michigan Engineering", duration: "16 Weeks", badge: "New Launch", logo: "〽️" },
    { title: "Michigan Engineering Generative AI Applications for Leaders", partner: "Michigan Engineering", duration: "12 Weeks", badge: "", logo: "〽️" },
    { title: "Professional Certificate Course in Generative AI and Machine Learning", partner: "IIT Kanpur", duration: "11 Months", badge: "Trending Now", logo: "🎓" },
    { title: "Oxford Programme in Organising for AI", partner: "Oxford University", duration: "12 Weeks", badge: "New Launch", logo: "🏰" }
  ],
  "AI & Machine Learning": [
    { title: "Professional Certificate in Machine Learning and Deep Learning", partner: "IIT Kanpur", duration: "11 Months", badge: "Bestseller", logo: "🎓" },
    { title: "Machine Learning Engineering for Production (MLOps)", partner: "Google AI", duration: "12 Weeks", badge: "Trending Now", logo: "🇬" },
    { title: "Applied AI and Machine Learning Advanced Certificate", partner: "Michigan Engineering", duration: "6 Months", badge: "", logo: "〽️" },
    { title: "AWS Certified Machine Learning - Specialty Prep", partner: "AWS", duration: "8 Weeks", badge: "Top Rated", logo: "🅰️" }
  ],
  "Data Science & Business Analytics": [
    { title: "Data Science Professional Certificate", partner: "IBM", duration: "10 Months", badge: "Trending Now", logo: "ℹ️" },
    { title: "Business Analytics and Predictive Modeling Specialization", partner: "Wharton", duration: "16 Weeks", badge: "Most Popular", logo: "🇼" },
    { title: "Advanced Certificate in Data Analytics & Engineering", partner: "IIT Madras", duration: "8 Months", badge: "New", logo: "🎓" }
  ],
  "Project Management": [
    { title: "PMP Certification Training Course", partner: "PMI", duration: "8 Weeks", badge: "Bestseller", logo: "📋" },
    { title: "Agile and Scrum Master Specialization", partner: "Scrum.org", duration: "6 Weeks", badge: "Trending", logo: "🔄" },
    { title: "Lean Six Sigma Green Belt Certification", partner: "ASQ", duration: "10 Weeks", badge: "", logo: "🟢" }
  ],
  "Cyber Security": [
    { title: "Advanced Executive Program in Cybersecurity", partner: "IIT Bangalore", duration: "6 Months", badge: "Most Popular", logo: "🎓" },
    { title: "CompTIA Security+ Complete Boot Camp", partner: "CompTIA", duration: "5 Weeks", badge: "Bestseller", logo: "🛡️" },
    { title: "Certified Ethical Hacker (CEH) Masterclass", partner: "EC-Council", duration: "12 Weeks", badge: "Trending Now", logo: "💻" }
  ],
  "Cloud Computing & DevOps": [
    { title: "Cloud Architect Certification Program", partner: "AWS & Azure", duration: "12 Months", badge: "Most Popular", logo: "☁️" },
    { title: "Post Graduate Program in DevOps", partner: "Caltech", duration: "9 Months", badge: "Bestseller", logo: "🎓" },
    { title: "Docker and Kubernetes Administrator Course", partner: "Mirantis", duration: "8 Weeks", badge: "Trending", logo: "🐳" }
  ]
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Generative AI");
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout } = useAuth();
  const { cartCount, cartItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <nav className="container-shell flex h-20 items-center justify-between gap-4">
        
        {/* Left Section: Logo & All Courses */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 shrink-0 font-black text-2xl tracking-tight text-slate-900">
            <ShieldCheck className="text-brandprimary" size={28} />
            <span>SynapseLearn</span>
          </Link>
          
          {/* Popover All Courses */}
          <div 
            className="hidden sm:block relative" 
            onMouseEnter={() => setIsCoursesOpen(true)} 
            onMouseLeave={() => setIsCoursesOpen(false)}
          >
            <button 
              className="flex items-center gap-2 rounded-lg bg-brandprimary px-4 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-200 hover:bg-indigo-600 active:scale-95"
              onClick={() => setIsCoursesOpen(!isCoursesOpen)}
            >
              <Grid size={18} />
              <span>All Courses</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${isCoursesOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Popup Modal */}
            <AnimatePresence>
              {isCoursesOpen && (
                <div className="fixed inset-x-0 top-[5rem] flex justify-center z-[100]">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="w-[90vw] md:w-[70rem] max-h-[80vh] overflow-hidden bg-white border border-slate-100 shadow-2xl rounded-2xl flex"
                  >
                  {/* Left Sidebar for Categories */}
                  <div className="w-1/3 bg-slate-50 border-r border-slate-100 overflow-y-auto overscroll-contain p-4 flex flex-col gap-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2 mb-2">Categories</p>
                    {Object.keys(popupCourses).map((category) => (
                      <button
                        key={category}
                        className={`w-full text-left px-4 py-3 text-sm font-bold rounded-xl transition-all duration-200 flex items-center justify-between ${
                          selectedCategory === category 
                            ? "bg-white text-brandprimary shadow-sm border border-slate-100" 
                            : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
                        }`}
                        onMouseEnter={() => setSelectedCategory(category)}
                        onClick={() => setSelectedCategory(category)}
                      >
                        <span>{category}</span>
                        {selectedCategory === category && <div className="w-1.5 h-1.5 rounded-full bg-brandprimary" />}
                      </button>
                    ))}
                  </div>

                  {/* Right Content Pane */}
                  <div className="w-2/3 p-8 flex flex-col bg-white overflow-y-auto overscroll-contain">
                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-xs font-extrabold text-brandprimary uppercase tracking-widest">Career Aligned Learning Paths</h3>
                      <p className="text-slate-400 text-xs font-bold mt-1">Master essential skills for your dream career</p>
                    </div>

                    {/* Grid of Courses */}
                    <div className="grid gap-4 sm:grid-cols-2 flex-1">
                      {popupCourses[selectedCategory].map((course, idx) => (
                        <div 
                          key={idx} 
                          className="bg-white border border-slate-100 rounded-xl p-4 shadow-soft flex flex-col h-full group hover:shadow-md hover:border-slate-200 transition-all duration-300"
                        >
                          {/* Partner Logo */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="text-xl">{course.logo}</span>
                            <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">{course.partner}</span>
                          </div>

                          {/* Title */}
                          <h4 className="text-sm font-extrabold text-slate-800 leading-snug flex-1 group-hover:text-brandprimary transition-colors line-clamp-2">
                            {course.title}
                          </h4>

                          {/* Bottom Duration & Badge */}
                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-50">
                            <span className="text-[10px] font-bold text-slate-400">{course.duration}</span>
                            {course.badge && (
                              <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded ${
                                course.badge === "Trending Now" ? "bg-emerald-50 text-emerald-700" :
                                course.badge === "Most Popular" ? "bg-orange-50 text-orange-700" : "bg-indigo-50 text-indigo-700"
                              }`}>
                                {course.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                      <Link 
                        to="/learning" 
                        onClick={() => setIsCoursesOpen(false)}
                        className="inline-flex items-center justify-center rounded-xl border border-slate-200 hover:border-brandprimary px-5 py-2.5 text-xs font-extrabold text-brandprimary hover:bg-slate-50 transition-all duration-200"
                      >
                        Explore All Programs
                      </Link>
                    </div>
                  </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Center Section: Search Bar */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md relative items-center">
          <Search className="absolute left-4 text-slate-400" size={20} />
          <input
            type="text"
            placeholder="What do you want to learn?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-sm placeholder-slate-400 focus:bg-white focus:border-brandprimary focus:ring-2 focus:ring-indigo-100 outline-none transition-all"
          />
        </form>

        {/* Right Section: Nav Links & Profile */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <NavLink 
            to="/about" 
            className={({ isActive }) => 
              `text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 ${
                isActive ? "bg-indigo-50 text-brandprimary" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/projects" 
            className={({ isActive }) => 
              `text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 ${
                isActive ? "bg-indigo-50 text-brandprimary" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`
            }
          >
            Projects
          </NavLink>
          <NavLink 
            to="/learning" 
            className={({ isActive }) => 
              `text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 ${
                isActive ? "bg-indigo-50 text-brandprimary" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`
            }
          >
            Learning
          </NavLink>
          <NavLink 
            to="/blog" 
            className={({ isActive }) => 
              `text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 ${
                isActive ? "bg-indigo-50 text-brandprimary" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`
            }
          >
            Blog
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              `text-sm font-bold px-4 py-2 rounded-full transition-all duration-200 ${
                isActive ? "bg-indigo-50 text-brandprimary" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`
            }
          >
            Contact
          </NavLink>

          {/* Cart Icon */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCartOpen(true)}
            onMouseLeave={() => setIsCartOpen(false)}
          >
            <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-200 block">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-brandprimary rounded-full transform translate-x-1/2 -translate-y-1/2">
                {cartCount}
              </span>
            </Link>

            {/* Cart Preview Popup */}
            <AnimatePresence>
              {isCartOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-100 shadow-2xl rounded-2xl p-4 z-[100]"
                >
                  {cartItems.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center py-4">Your cart is empty.</p>
                  ) : (
                    <>
                      <div className="max-h-60 overflow-y-auto space-y-3 pb-3 border-b border-slate-100">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex gap-3 items-center">
                            <div className="w-16 h-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-100">
                              <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-xs font-bold text-slate-800 truncate">{item.title}</h4>
                              <p className="text-[10px] text-slate-500 truncate">By {item.instructor}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-xs font-extrabold text-slate-900">{item.price}</span>
                                {item.originalPrice && (
                                  <span className="text-[10px] text-slate-400 line-through">{item.originalPrice}</span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">Total:</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-black text-slate-900">
                              ₹{cartItems.reduce((total, item) => total + parseFloat(item.price.replace(/[^\d.]/g, "")), 0).toFixed(2)}
                            </span>
                            {cartItems.some(item => item.originalPrice) && (
                              <span className="text-xs text-slate-400 line-through">
                                ₹{cartItems.reduce((total, item) => {
                                  const orig = item.originalPrice ? parseFloat(item.originalPrice.replace(/[^\d.]/g, "")) : parseFloat(item.price.replace(/[^\d.]/g, ""));
                                  return total + orig;
                                }, 0).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </div>
                        <Link 
                          to="/cart" 
                          onClick={() => setIsCartOpen(false)}
                          className="w-full mt-3 bg-brandprimary hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all duration-200 flex items-center justify-center shadow-md shadow-indigo-100"
                        >
                          Go to cart
                        </Link>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile/Auth */}
          <div className="relative group">
            {user ? (
              <button className="flex items-center gap-2 rounded-full border border-slate-200 p-1 bg-slate-50 hover:bg-slate-100 transition">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-brandprimary text-white font-bold text-sm">
                  {user.name.charAt(0)}
                </div>
                <ChevronDown size={16} className="text-slate-500 mr-1" />
              </button>
            ) : (
              <Link to="/auth" className="flex items-center gap-2 rounded-full border border-slate-200 p-1.5 bg-slate-50 hover:bg-slate-100 transition">
                <div className="grid h-8 w-8 place-items-center rounded-full bg-slate-200 text-slate-600">
                  <User size={18} />
                </div>
                <ChevronDown size={16} className="text-slate-500 mr-1" />
              </Link>
            )}

            {/* Profile Dropdown */}
            {user && (
              <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-white p-2 border border-slate-100 shadow-soft invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all">
                <div className="px-4 py-2 border-b border-slate-100 mb-1">
                  <p className="text-xs text-slate-400 font-semibold">Signed in as</p>
                  <p className="text-sm font-bold text-slate-800 truncate">{user.email}</p>
                </div>
                <Link to="/learning" className="block rounded-lg px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">Dashboard</Link>
                <button onClick={logout} className="w-full text-left block rounded-lg px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50">
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center lg:hidden">
          <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-full transition-all duration-200 mr-2">
            <ShoppingCart size={20} />
            <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-brandprimary rounded-full transform translate-x-1/2 -translate-y-1/2">
              {cartCount}
            </span>
          </Link>
          <button className="grid h-10 w-10 place-items-center rounded-md border border-slate-200" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {open && (
        <div className="container-shell grid gap-2 pb-6 border-t border-slate-100 bg-white lg:hidden">
          <Link to="/learning" onClick={() => setOpen(false)} className="flex items-center gap-2 rounded-lg bg-brandprimary px-4 py-3 mt-4 text-sm font-bold text-white">
            <Grid size={18} />
            <span>All Courses</span>
          </Link>
          <form onSubmit={handleSearch} className="flex relative items-center mt-2">
            <Search className="absolute left-4 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="What do you want to learn?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:border-brandprimary outline-none"
            />
          </form>
          <div className="grid mt-4 gap-1">
            <Link to="/about" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">About</Link>
            <Link to="/projects" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">Projects</Link>
            <Link to="/learning" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">Learning</Link>
            <Link to="/blog" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">Blog</Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100">Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}
