import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShieldCheck, ArrowRight, CheckCircle2, Shield, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../state/AuthContext.jsx";
import SEO from "../components/SEO.jsx";
import Reveal from "../components/Reveal.jsx";

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", objective: "Personal Learning" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  async function handleSocialLogin(provider) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:5000/api/auth/social-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: provider + " User", email: provider.toLowerCase() + "@example.com", provider })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to social login");
      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(`Social Auth Failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = mode === "signup" ? await signup(form) : await login({ email: form.email, password: form.password });

      // Conditional Redirection
      if (res.email === "lucifer@convosecai.com") {
        navigate("/dev-dashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="flex h-screen w-full overflow-hidden bg-white">
      <SEO
        title={mode === "login" ? "Login | Secure Access" : "Sign Up | Join the Platform"}
        description="Access your ConvoSec AI dashboard to manage your learning journey, projects, and certifications."
      />
      {/* Left Side: Form */}
      <div className="flex w-full flex-col px-8 lg:w-1/2 lg:px-16 xl:px-24 relative bg-white overflow-y-auto py-12">
        {/* Architectural Background Detail */}
        <div className="absolute top-0 left-0 w-1 h-full bg-slate-900" />

        <div className="mx-auto w-full max-w-md py-4 my-auto">
          {/* Logo - Industrial Style */}
          <Link to="/" className="flex items-center gap-5 mb-14 group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden transition-all duration-500 border border-slate-200 shadow-sm group-hover:border-slate-900 p-0.5">
              <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black text-slate-900 leading-none tracking-tighter uppercase">ConvoSec AI</span>
              <div className="w-full h-[2px] bg-slate-900 mt-2 mb-2" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Operational Unit</span>
            </div>
          </Link>

          <Reveal>
            <div className="w-full h-[1px] bg-slate-100 mb-6" />
            <div className="flex items-center gap-4 mb-2">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Auth_Protocol_{mode === "login" ? "01" : "02"}</span>
              <div className="flex-1 h-[1px] bg-slate-100" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 leading-none tracking-tighter uppercase mb-2">
              {mode === "login" ? "Welcome back." : "Initiate Access."}
            </h1>
            <p className="text-slate-500 text-sm font-medium tracking-tight">
              {mode === "login" ? "Authorized personnel only. Please sign in." : "Create your credentials for platform entry."}
            </p>
          </Reveal>

          <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">01. Full Name</label>
                  <input
                    className="w-full rounded-none border border-slate-200 bg-slate-50/30 px-4 py-4 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-slate-900 transition-all placeholder:text-slate-300"
                    placeholder=""
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">02. Engagement Objective</label>
                  <select
                    className="w-full rounded-none border border-slate-200 bg-slate-50/30 px-4 py-4 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-slate-900 transition-all appearance-none cursor-pointer"
                    value={form.objective}
                    onChange={(e) => setForm({ ...form, objective: e.target.value })}
                    required
                  >
                    <option value="Personal Learning">Personal Learning</option>
                    <option value="Partner">Business Partner</option>
                    <option value="Sponsor">Sponsorship</option>
                    <option value="Project Demand">Project Inquiry</option>
                    <option value="Intern">Internship Candidate</option>
                    <option value="Full-time Job">Full-time Career</option>
                    <option value="Other">Other Objectives</option>
                  </select>
                </div>
              </>
            )}
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{mode === "signup" ? "03" : "01"}. Email Address</label>
              <input
                type="email"
                className="w-full rounded-none border border-slate-200 bg-slate-50/30 px-4 py-4 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-slate-900 transition-all placeholder:text-slate-300"
                placeholder=""
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{mode === "signup" ? "04" : "02"}. Secure Password</label>
                <button type="button" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-slate-900 transition-colors">Recovery?</button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-none border border-slate-200 bg-slate-50/30 px-4 py-4 pr-12 text-sm font-bold text-slate-800 outline-none focus:bg-white focus:border-slate-900 transition-all placeholder:text-slate-300"
                  placeholder=""
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded-none border-slate-300 text-slate-900 focus:ring-slate-900" />
              <label htmlFor="remember" className="text-[10px] font-black uppercase tracking-widest text-slate-500">Maintain Session</label>
            </div>

            {error && <p className="border-l-4 border-rose-500 bg-rose-50 p-4 text-xs font-bold text-rose-600 uppercase tracking-wider">{error}</p>}

            <button
              type="submit"
              className="group w-full rounded-none bg-slate-900 hover:bg-blue-600 py-5 text-xs font-black text-white uppercase tracking-[0.3em] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
              disabled={loading}
            >
              <span className="flex items-center gap-2">
                {loading ? "Decrypting..." : mode === "login" ? "Enter Secure Node" : "Create My Identity"}
              </span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Social Logins */}
          <div className="mt-10 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest"><span className="bg-white px-4 text-slate-400 tracking-[0.4em]">External Nodes</span></div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <button
              onClick={() => handleSocialLogin("Google")}
              disabled={loading}
              className="flex items-center justify-center gap-3 rounded-none border border-slate-200 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-700 hover:border-slate-900 hover:bg-slate-50 transition-all group disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google Hub
            </button>
            <button
              onClick={() => handleSocialLogin("LinkedIn")}
              disabled={loading}
              className="flex items-center justify-center gap-3 rounded-none border border-slate-200 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-700 hover:border-[#0077B5] hover:bg-slate-50 transition-all group disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0077B5">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Linked Node
            </button>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              {mode === "login" ? "No account?" : "Already member?"}
            </p>
            <button
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
              className="text-[10px] font-black uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 pb-0.5 hover:text-blue-600 hover:border-blue-600 transition-all"
            >
              {mode === "login" ? "Register Unit" : "Enter Securely"}
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Clean & Minimalist Hero Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#0c0c12]">
        {/* Soft Background Asset */}
        <div className="absolute inset-0 z-0">
          <img
            src="/auth_hero.png"
            alt="Technical Infrastructure"
            className="w-full h-full object-cover opacity-20 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0c0c12]" />
        </div>

        {/* Minimalist Vertical Success Gallery */}
        <div className="absolute right-0 top-0 bottom-0 w-[80px] xl:w-[120px] bg-black/40 backdrop-blur-md border-l border-white/5 overflow-hidden flex flex-col z-20">
          {["/p1.png", "/p2.png", "/p3.png", "/p4.png"].map((img, i) => (
            <div key={i} className="flex-1 overflow-hidden border-b border-white/5 grayscale hover:grayscale-0 transition-all duration-700 opacity-40 hover:opacity-100">
              <img
                src={img}
                alt={`Operator ${i + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Main Content Overlay - Minimalist */}
        <div className="relative z-10 flex flex-col justify-center p-16 xl:p-24 w-full h-full">
          <Reveal>
            <div className="max-w-xl">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-[1px] bg-blue-600" />
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Elite Certification</span>
              </div>

              <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight tracking-tighter uppercase mb-6">
                Mastering the <br />
                Security <span className="text-blue-600">Frontier.</span>
              </h2>

              <p className="text-base text-slate-400 font-medium leading-relaxed max-w-md">
                Deploying intelligent systems for the next generation of global technological leaders.
              </p>
            </div>
          </Reveal>
        </div>

        {/* Corner Detail */}
        <div className="absolute top-12 left-12 opacity-10">
          <Shield size={40} className="text-white" strokeWidth={0.5} />
        </div>
      </div>
    </section>
  );
}
