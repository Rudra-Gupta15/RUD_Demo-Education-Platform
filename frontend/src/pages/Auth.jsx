import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth } from "../state/AuthContext.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "signup") await signup(form);
      else await login({ email: form.email, password: form.password });
      navigate("/learning");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex h-screen w-full overflow-hidden bg-white">
      {/* Left Side: Form */}
      <div className="flex w-full flex-col px-8 lg:w-1/2 lg:px-16 xl:px-20 justify-center">
        <div className="mx-auto w-full max-w-md py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
              <ShieldCheck size={18} />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-black leading-none">RUD</span>
              <span className="text-[7px] font-black text-slate-400 uppercase tracking-widest">AI & Cyber Platform</span>
            </div>
          </Link>

          <Reveal>
            <h1 className="text-2xl font-black text-slate-900 leading-tight">
              {mode === "login" ? "Welcome back!" : "Start your journey."}
            </h1>
            <p className="mt-1 text-slate-500 text-xs font-medium">
              {mode === "login" ? "Log in with your email" : "Create an account to get started"}
            </p>
          </Reveal>

          <form className="mt-6 space-y-3.5" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                <input 
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-black transition-all" 
                  placeholder="John Doe" 
                  value={form.name} 
                  onChange={(e) => setForm({ ...form, name: e.target.value })} 
                  required 
                />
              </div>
            )}
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
              <input 
                type="email" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-black transition-all" 
                placeholder="rudra@example.com" 
                value={form.email} 
                onChange={(e) => setForm({ ...form, email: e.target.value })} 
                required 
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center px-1">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400">Password</label>
                <button type="button" className="text-[9px] font-black uppercase tracking-widest text-blue-600 hover:underline">Forgot?</button>
              </div>
              <input 
                type="password" 
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-xs font-bold text-slate-800 outline-none focus:bg-white focus:border-black transition-all" 
                placeholder="••••••••" 
                value={form.password} 
                onChange={(e) => setForm({ ...form, password: e.target.value })} 
                required 
              />
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" id="remember" className="w-3.5 h-3.5 rounded border-slate-300 text-black focus:ring-black" />
              <label htmlFor="remember" className="text-[10px] font-bold text-slate-500">Remember Me</label>
            </div>

            {error && <p className="rounded-xl bg-rose-50 border border-rose-100 p-3 text-[10px] font-bold text-rose-600">{error}</p>}

            <button 
              type="submit" 
              className="w-full rounded-xl bg-[#3b82f6] hover:bg-blue-600 py-3.5 text-xs font-black text-white shadow-lg transition-all active:scale-95 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Processing..." : mode === "login" ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[9px] font-black uppercase tracking-widest"><span className="bg-white px-3 text-slate-400">Or continue with</span></div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-[10px] font-bold text-slate-700 hover:bg-slate-50 transition-all">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12.48 10.92v3.28h7.84c-.24 1.84-.9 3.33-2.03 4.44-1.33 1.33-3.38 2.78-6.94 2.78-5.48 0-9.67-4.43-9.67-9.92 0-5.49 4.19-9.92 9.67-9.92 3.1 0 5.41 1.23 7.08 2.85l2.32-2.32c-2.33-2.22-5.45-3.53-9.4-3.53-7.66 0-14 6.34-14 14s6.34 14 14 14c4.13 0 7.28-1.36 9.7-3.9 2.52-2.52 3.32-6.07 3.32-8.68 0-.64-.05-1.25-.15-1.84h-12.87z"/></svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 py-2.5 text-[10px] font-bold text-slate-700 hover:bg-slate-50 transition-all">
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24"><path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </button>
          </div>

          <p className="mt-6 text-center text-[10px] font-bold text-slate-500">
            {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-blue-600 hover:underline"
            >
              {mode === "login" ? "Sign Up" : "Log In"}
            </button>
          </p>

          <p className="mt-8 text-center text-[9px] font-bold text-slate-400">
            © 2009-2026 RUD Solutions. All Rights Reserved. | <Link to="/privacy" className="hover:text-slate-600">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Right Side: Hero Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0a0a0f]">
        {/* Main Background Image */}
        <img 
          src="/auth_hero.png" 
          alt="Corporate Office" 
          className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-overlay"
        />
        
        {/* Side Strip of Images */}
        <div className="absolute right-0 top-0 bottom-0 w-[80px] xl:w-[120px] bg-black/20 backdrop-blur-sm border-l border-white/10 overflow-hidden flex flex-col">
          {["/p1.png", "/p2.png", "/p3.png", "/p4.png"].map((img, i) => (
            <div key={i} className="flex-1 border-b border-white/10 last:border-0 overflow-hidden">
              <img 
                src={img} 
                alt={`Student ${i+1}`} 
                className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>

        <div className="relative z-10 flex flex-col justify-end p-12 xl:p-20 w-full">
          <Reveal>
            <h2 className="text-3xl xl:text-5xl font-black text-white leading-tight">
              Get Certified. <br /> Get Ahead.
            </h2>
            <p className="mt-4 text-base text-slate-300 font-medium max-w-lg leading-relaxed">
              Empower your career with industry-leading AI and Cyber Security certifications.
            </p>
          </Reveal>

          <div className="mt-8 space-y-4">
            {[
              "15,000+ Careers advanced through our programs",
              "200+ Live training sessions every single month",
              "92% Placement rate for our specialized tracks"
            ].map((stat, i) => (
              <Reveal key={i} delay={0.2 + i * 0.1}>
                <div className="flex items-center gap-3 text-white font-bold text-sm">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                    <CheckCircle2 size={14} strokeWidth={3} />
                  </div>
                  <span className="text-slate-100">{stat}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
