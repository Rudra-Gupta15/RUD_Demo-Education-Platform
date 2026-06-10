import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { Building2, ShoppingCart, Grid, User, LogOut, Menu, X, LayoutDashboard, ShieldCheck } from "lucide-react";
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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY < 50) {
            setIsVisible(true);
          } else {
            setIsVisible(currentScrollY < lastScrollY.current);
          }
          lastScrollY.current = currentScrollY;
          setScrolled(currentScrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
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
          className="pointer-events-auto flex items-center bg-white/80 backdrop-blur-xl rounded-full p-1.5 sm:p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] border border-slate-200 w-full lg:w-auto will-change-transform transform-gpu"
        >
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 sm:gap-3 bg-white rounded-full py-1.5 pl-1.5 pr-4 sm:pr-6 hover:scale-[1.01] active:scale-95 transition-all shadow-md shrink-0"
          >
            <div className="relative p-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-slate-200 shadow-inner bg-white p-1.5 flex items-center justify-center">
                <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] sm:text-sm font-[900] text-black leading-none tracking-tight">ConvoSec AI</span>
              <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-0.5">AI & CYBER</span>
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
              <div className="absolute top-full -right-4 mt-10 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-150 group-hover:delay-0 translate-y-1 group-hover:translate-y-0 pointer-events-auto before:absolute before:inset-x-0 before:-top-10 before:h-10 before:content-[''] after:content-[''] after:absolute after:-top-[6px] after:right-6 after:w-3 after:h-3 after:bg-white after:border-t after:border-l after:border-slate-100 after:rotate-45 after:rounded-tl-[2px]">
                <Link to="/contact/business" className="block px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 rounded-xl transition-all relative z-10">Business</Link>
                <Link to="/contact/careers" className="block px-4 py-3 text-[10px] font-black uppercase tracking-wider text-slate-700 hover:bg-slate-50 rounded-xl transition-all relative z-10">Career</Link>
              </div>
            </div>
            <Link to="/cart" className="relative hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} strokeWidth={2} />
              {cartCount > 0 && (
                <span className={`absolute -top-2 -right-2 w-[18px] h-[18px] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white ${location.pathname === "/cart" ? "bg-black" : "bg-[#2563eb]"}`}>{cartCount}</span>
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
            <div className="absolute top-full -right-4 mt-6 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-150 group-hover:delay-0 translate-y-1 group-hover:translate-y-0 pointer-events-auto before:absolute before:inset-x-0 before:-top-6 before:h-6 before:content-[''] after:content-[''] after:absolute after:-top-[6px] after:right-9 after:w-3 after:h-3 after:bg-white after:border-t after:border-l after:border-slate-100 after:rotate-45 after:rounded-tl-[2px]">
              {user ? (
                <div className="relative z-10">
                  <div className="px-4 py-3 border-b border-slate-50 mb-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Logged in as</p>
                    <p className="text-xs font-black text-slate-900 truncate mt-0.5">{user.email}</p>
                  </div>
                  <Link to="/dashboard" className="block px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition-all">Dashboard</Link>
                  {user.email === "lucifer@convosecai.com" && (
                    <Link to="/dev-dashboard" className="block px-4 py-3 text-xs font-bold text-indigo-600 hover:bg-indigo-50 rounded-2xl transition-all">Dev Dashboard</Link>
                  )}
                  <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-all mt-1">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="relative z-10">
                  <Link to="/auth" className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-2xl transition-all">
                    <User size={16} /> Login or Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Right: Cart + Hamburger */}
          <div className="flex lg:hidden items-center gap-2 ml-auto pr-1">
            <Link to="/cart" className="relative p-2 text-slate-500 hover:text-blue-600 transition-colors">
              <ShoppingCart size={20} strokeWidth={2} />
              {cartCount > 0 && (
                <span className={`absolute top-0 right-0 w-[16px] h-[16px] text-white text-[8px] font-black rounded-full flex items-center justify-center ${location.pathname === "/cart" ? "bg-black" : "bg-[#2563eb]"}`}>{cartCount}</span>
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
            className="fixed top-[72px] sm:top-[80px] left-3 right-3 z-[99] bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-100 p-5 lg:hidden will-change-transform transform-gpu"
          >
            {/* Nav Links */}
            <nav className="flex flex-col gap-1.5">
              {navLinks.map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) => {
                    const active = to === "/learning" ? isLearningActive(location.pathname) : isActive;
                    return `group flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 ${active ? "bg-black text-white shadow-xl shadow-black/10 scale-[1.02]" : "text-slate-600 hover:bg-slate-50 hover:pl-5"}`;
                  }}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${location.pathname === to ? "bg-white/10" : "bg-slate-100 group-hover:bg-white"}`}>
                    {icon || <Grid size={16} />}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.1em]">{label}</span>
                </NavLink>
              ))}
            </nav>

            {/* User Specific — Dashboard */}
            {user && (
              <>
                <div className="h-px bg-slate-100/80 my-4 mx-2" />
                <div className="flex flex-col gap-1.5">
                  <Link
                    to="/dashboard"
                    className={`group flex items-center gap-3 px-4 py-4 rounded-2xl transition-all duration-300 ${location.pathname === "/dashboard" ? "bg-indigo-600 text-white shadow-xl shadow-indigo-100" : "bg-indigo-50/50 text-indigo-600 hover:bg-indigo-50 hover:pl-5"}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${location.pathname === "/dashboard" ? "bg-white/20" : "bg-white"}`}>
                      <LayoutDashboard size={18} strokeWidth={2.5} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black uppercase tracking-[0.1em]">Academy Dashboard</span>
                      <span className={`text-[9px] font-bold uppercase tracking-widest opacity-60 ${location.pathname === "/dashboard" ? "text-white" : "text-indigo-400"}`}>Control Plane</span>
                    </div>
                  </Link>
                  {user.email === "lucifer@convosecai.com" && (
                    <Link to="/dev-dashboard" className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider text-slate-500 bg-slate-50/50 hover:bg-slate-100 transition-all">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm"><ShieldCheck size={16} className="text-indigo-500" /></div>
                      Developer Panel
                    </Link>
                  )}
                </div>
              </>
            )}

            {/* Divider */}
            <div className="h-px bg-slate-100/80 my-4 mx-2" />

            {/* Contact Links */}
            <div className="grid grid-cols-2 gap-2">
              <Link to="/contact/business" className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-100 transition-all group">
                <Building2 size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-600">Business</span>
              </Link>
              <Link to="/contact/careers" className="flex flex-col gap-2 p-4 rounded-2xl bg-slate-50/50 hover:bg-slate-100 transition-all group">
                <User size={18} className="text-slate-400 group-hover:text-black transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-wider text-slate-600">Careers</span>
              </Link>
            </div>

            {/* Footer Section - Profile Card */}
            <div className="mt-6 p-4 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-between shadow-inner">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-black flex items-center justify-center text-white text-base font-black shadow-lg">
                  {user ? user.name[0] : <User size={18} />}
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.15em] leading-none">Scholar</span>
                  <span className="text-[14px] font-[900] text-slate-900 mt-1 leading-none truncate max-w-[100px]">{user ? user.name : "Guest"}</span>
                </div>
              </div>
              {user ? (
                <button onClick={logout} className="p-3 rounded-xl bg-white text-rose-600 shadow-sm hover:text-rose-700 active:scale-95 transition-all border border-slate-100">
                  <LogOut size={18} strokeWidth={3} />
                </button>
              ) : (
                <Link to="/auth" className="px-4 py-2.5 rounded-xl bg-black text-white text-[10px] font-black uppercase tracking-widest active:scale-95 transition-all">
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
