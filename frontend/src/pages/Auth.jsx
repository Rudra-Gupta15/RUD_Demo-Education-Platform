import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LockKeyhole } from "lucide-react";
import { useAuth } from "../state/AuthContext.jsx";

export default function Auth() {
  const [mode, setMode] = useState("signup");
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
    <section className="container-shell grid min-h-screen place-items-center py-16">
      <form className="glass w-full max-w-md rounded-lg p-6 sm:p-8" onSubmit={handleSubmit}>
        <div className="grid h-12 w-12 place-items-center rounded-md bg-cyan/10 text-cyan">
          <LockKeyhole />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">{mode === "signup" ? "Create your account" : "Welcome back"}</h1>
        <p className="muted mt-2">Access cohorts, labs, and your student dashboard.</p>
        <div className="mt-6 grid grid-cols-2 rounded-md border border-slate-200 bg-slate-50/50 p-1">
          {["signup", "login"].map((item) => (
            <button
              type="button"
              key={item}
              className={`rounded px-3 py-2 text-sm font-bold capitalize ${mode === item ? "bg-brandprimary text-white" : "text-slate-500"}`}
              onClick={() => setMode(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4">
          {mode === "signup" && (
            <input className="rounded-md border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brandprimary" placeholder="Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
          )}
          <input type="email" className="rounded-md border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brandprimary" placeholder="Email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
          <input type="password" className="rounded-md border border-slate-200 bg-white px-4 py-3 outline-none focus:border-brandprimary" placeholder="Password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required minLength={8} />
        </div>
        {error && <p className="mt-5 rounded-md bg-red-50 p-3 text-sm text-red-600 border border-red-100">{error}</p>}
        <button className="btn-primary mt-6 w-full disabled:opacity-60" disabled={loading}>
          {loading ? "Working..." : mode === "signup" ? "Create Account" : "Login"}
        </button>
      </form>
    </section>
  );
}
