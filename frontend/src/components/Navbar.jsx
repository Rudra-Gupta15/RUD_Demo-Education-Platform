import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Search, ShoppingCart, Grid, User, LogOut, X, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../state/AuthContext.jsx";
import { useCart } from "../state/CartContext.jsx";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, logout } = useAuth();
  const { cartCount, cartItems } = useCart();
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we are at the top, keep it visible
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else {
        // Standard behavior:
        // Scroll Down -> Hide (focus on content)
        // Scroll Up -> Show (need navigation)
        if (currentScrollY > lastScrollY.current) {
          // Scrolling Down
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY.current) {
          // Scrolling Up
          setIsVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
      setScrolled(currentScrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4">
      <motion.nav 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="pointer-events-auto flex items-center bg-white/70 backdrop-blur-xl rounded-full p-2 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-slate-200"
      >
        {/* Left: Brand Capsule */}
        <Link 
          to="/" 
          className="flex items-center gap-3 bg-white rounded-full py-2 pl-2 pr-6 hover:scale-[1.01] active:scale-95 transition-all shadow-md shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-inner">
            <ShieldCheck size={22} className="fill-white/10" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-[900] text-black leading-none tracking-tight">RUD</span>
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-0.5">AI & CYBER</span>
          </div>
        </Link>

        {/* Center: Navigation Links or Search Bar */}
        <div className="flex items-center justify-center overflow-hidden transition-all duration-500">
          <AnimatePresence mode="wait">
            {!isSearchOpen ? (
              <motion.div
                key="links"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="hidden lg:flex items-center gap-2 px-4"
              >
                <NavLink
                  to="/about"
                  className={({ isActive }) => `px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${isActive ? "bg-black text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)]" : "text-slate-500 hover:text-black hover:bg-slate-50"}`}
                >
                  About
                </NavLink>
                <NavLink
                  to="/projects"
                  className={({ isActive }) => `px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${isActive ? "bg-black text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)]" : "text-slate-500 hover:text-black hover:bg-slate-50"}`}
                >
                  Projects
                </NavLink>
                <NavLink
                  to="/learning"
                  className={({ isActive }) => {
                    const isActuallyActive = isActive || location.pathname.startsWith('/catalog');
                    return `flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${isActuallyActive ? "bg-black text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)]" : "text-slate-500 hover:text-black hover:bg-slate-50"}`;
                  }}
                >
                  <Grid size={14} strokeWidth={3} />
                  Learning
                </NavLink>
                <NavLink
                  to="/blog"
                  className={({ isActive }) => `px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${isActive ? "bg-black text-white shadow-[0_10px_20px_-5px_rgba(0,0,0,0.2)]" : "text-slate-500 hover:text-black hover:bg-slate-50"}`}
                >
                  Blog
                </NavLink>
              </motion.div>
            ) : (
              <motion.div
                key="search"
                initial={{ opacity: 0, width: 0, scale: 0.9 }}
                animate={{ opacity: 1, width: "320px", scale: 1 }}
                exit={{ opacity: 0, width: 0, scale: 0.9 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="flex items-center px-4"
              >
                <div className="relative w-full group/search">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search courses, articles..."
                    className="w-full bg-slate-100/80 border-none rounded-full py-2.5 pl-10 pr-4 text-[11px] font-black uppercase tracking-wider text-slate-800 focus:bg-white focus:ring-4 focus:ring-blue-500/10 outline-none transition-all placeholder:text-slate-400 placeholder:font-bold"
                    onKeyDown={(e) => e.key === "Escape" && setIsSearchOpen(false)}
                  />
                  <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within/search:text-blue-600 transition-colors" strokeWidth={3} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-6 px-4 mr-2 text-slate-500 shrink-0">
          <button 
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className={`transition-all duration-300 ${isSearchOpen ? "text-blue-600 rotate-90" : "hover:text-blue-600"}`}
          >
            {isSearchOpen ? <X size={22} strokeWidth={2.5} /> : <Search size={22} strokeWidth={2} />}
          </button>
          <Link to="/cart" className="relative hover:text-blue-600 transition-colors">
            <ShoppingCart size={22} strokeWidth={2} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-[18px] h-[18px] bg-[#2563eb] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Right: User Capsule */}
        <div className="group relative flex items-center gap-4 bg-white rounded-full py-2 pl-6 pr-2 shadow-md cursor-pointer hover:bg-slate-50 transition-all shrink-0">
          <div className="flex flex-col text-right">
            <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest leading-none">Active User</span>
            <span className="text-[11px] font-[900] text-black mt-0.5 leading-none">{user ? user.name : "Guest User"}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white shadow-md">
            <User size={20} strokeWidth={2.5} />
          </div>

          {/* User Dropdown Content */}
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
      </motion.nav>
    </div>
  );
}
