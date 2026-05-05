import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Building2, ShoppingCart, Grid, User, LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../state/AuthContext.jsx";
import { useCart } from "../state/CartContext.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(currentScrollY < lastScrollY.current);
      }
      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { to: "/about", label: "About" },
    { to: "/projects", label: "Projects" },
    { to: "/learning", label: "Learning", icon: <Grid size={14} strokeWidth={3} /> },
    { to: "/blog", label: "Blog" },
  ];

  const isLearningActive = (pathname) =>
    pathname.startsWith("/learning") ||
    pathname.startsWith("/catalog") ||
    pathname.startsWith("/courses");

  return (
    <>
      {/* ── Desktop / Tablet Floating Pill Navbar ── */}
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-3 sm:px-4">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="pointer-events-auto flex items-center bg-white/80 backdrop-blur-xl rounded-full p-1.5 sm:p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] border border-slate-200 w-full lg:w-auto"
        >
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 bg-white rounded-full py-1.5 pl-1.5 pr-3 sm:pr-6 hover:scale-[1.01] active:scale-95 transition-all shadow-md shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-slate-100 shadow-sm bg-white p-1 flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-[900] text-black leading-none tracking-tight">ConvoSec AI</span>
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-0.5">AI & CYBER</span>
            </div>
          </Link>

          {/* Center Nav Links — Desktop only */}
          <div className="hidden lg:flex items-center gap-1 px-3 xl:px-4 flex-1 justify-center">
            {navLinks.map(({ to, label, icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => {
                  const active = to === "/learning" ? isLearningActive(location.pathname) : isActive;
                  return `flex items-center gap-1.5 px-3 xl:px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${active ? "bg-black text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)]" : "text-slate-500 hover:text-black hover:bg-slate-50"}`;
                }}
              >
                {icon}{label}
              </NavLink>
            ))}
          </div>

          {/* Right Actions — Desktop */}
          <div className="hidden lg:flex items-center gap-4 px-3 xl:px-4 mr-2 text-slate-500 shrink-0">
            <div className="group relative">
              <button
                onClick={() => navigate("/contact/business")}
                className={`transition-all flex items-center gap-1 ${location.pathname.startsWith("/contact") ? "text-black scale-110" : "hover:text-blue-600"}`}
              >
                <Building2 size={20} strokeWidth={2.5} />
              </button>
              <div className="absolute top-full right-0 mt-4 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 pointer-events-auto">
                <Link to="/contact/business" className="block px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 rounded-xl transition-all">Business</Link>
                <Link to="/contact/careers" className="block px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 rounded-xl transition-all">Internship/Job</Link>
              </div>
            </div>
            <Link to="/cart" className="relative hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-[18px] h-[18px] bg-[#2563eb] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>
              )}
            </Link>
          </div>

          {/* User Capsule — Desktop */}
          <div className="hidden lg:flex group relative items-center gap-3 bg-white rounded-full py-2 pl-5 pr-2 shadow-md cursor-pointer hover:bg-slate-50 transition-all shrink-0">
            <div className="flex flex-col text-right">
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none">Active User</span>
              <span className="text-[11px] font-[900] text-black mt-0.5 leading-none">{user ? user.name : "Guest User"}</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white shadow-md">
              <User size={18} strokeWidth={2.5} />
            </div>
            <div className="absolute top-full right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 pointer-events-auto">
              {user ? (
                <>
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
                    <p className="text-xs font-black text-slate-900 truncate mt-0.5">{user.email}</p>
                  </div>
                  <Link to="/learning" className="block px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition-all">Dashboard</Link>
                  <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-all mt-1">
                    <LogOut size={16} /> Sign Out
                  </button>
                </>
              ) : (
                <Link to="/auth" className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition-all">
                  <User size={16} /> Login or Sign Up
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Right: Cart + Hamburger */}
          <div className="flex lg:hidden items-center gap-2 ml-auto pr-1">
            <Link to="/cart" className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-[16px] h-[16px] bg-[#2563eb] text-white text-[8px] font-black rounded-full flex items-center justify-center">{cartCount}</span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="p-2 rounded-full bg-black text-white transition-all active:scale-90"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* ── Mobile Slide-Down Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed top-[72px] sm:top-[80px] left-3 right-3 z-[99] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-100 p-5 lg:hidden"
          >
            {/* Nav Links */}
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => {
                    const active = to === "/learning" ? isLearningActive(location.pathname) : isActive;
                    return `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${active ? "bg-black text-white" : "text-slate-700 hover:bg-slate-50"}`;
                  }}
                >
                  {icon && <span>{icon}</span>}{label}
                </NavLink>
              ))}
            </nav>

            {/* Divider */}
            <div className="h-px bg-slate-100 my-3" />

            {/* Contact Links */}
            <div className="flex flex-col gap-1 mb-4">
              <Link to="/contact/business" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                <Building2 size={16} /> Business Enquiry
              </Link>
              <Link to="/contact/careers" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all">
                <User size={16} /> Internship / Job
              </Link>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-100 my-3" />

            {/* User */}
            <div className="px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active User</p>
                <p className="text-sm font-black text-slate-900 mt-0.5">{user ? user.name : "Guest User"}</p>
              </div>
              {user ? (
                <button onClick={logout} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-50 text-rose-600 text-xs font-bold">
                  <LogOut size={14} /> Sign Out
                </button>
              ) : (
                <Link to="/auth" className="flex items-center gap-2 px-4 py-2 rounded-xl bg-black text-white text-xs font-bold">
                  <User size={14} /> Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
