import { useEffect, useState, useRef } from "react";
import { useAuth } from "../state/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";
import { demoCourses } from "../data/courses";
import SEO from "../components/SEO.jsx";
import {
  LayoutDashboard, Users, BookOpen, Terminal, ShieldCheck,
  Mail, Settings, LogOut, Plus, Trash2, Edit, ArrowRight,
  Download, Bell, X, Save, Sun, Moon, ExternalLink,
  Activity, Globe, Cpu, Zap, Upload, Search, Shield, Command,
  Filter, FileText, AlertCircle, Server, Code
} from "lucide-react";

// ── Design Tokens (GitHub-style Dark) ──────────────────────────────────────────
const T = {
  bg: "#f8fafc",
  surface: "#ffffff",
  surfaceHover: "#f1f5f9",
  border: "#e2e8f0",
  borderLight: "#f1f5f9",
  text: "#0f172a",
  muted: "#64748b",
  faint: "#94a3b8",
  accent: "#6366f1",
  accentDim: "#4f46e5",
  green: "#10b981",
  greenBg: "#ecfdf5",
  red: "#ef4444",
  redBg: "#fef2f2",
  yellow: "#f59e0b",
  yellowBg: "#fffbeb",
  purple: "#8b5cf6",
  purpleBg: "#f5f3ff",
  teal: "#14b8a6",
  mono: "'JetBrains Mono', 'Fira Code', monospace",
  sans: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif",
};

// ── Mock Generators for Ops Monitoring ─────────────────────────────────────────
const genLogEntry = (i) => {
  const methods = ["GET", "POST", "PUT", "DELETE"];
  const paths = ["/api/courses", "/api/auth/signup", "/api/admin/users", "/api/contacts"];
  return {
    id: i,
    ts: new Date(Date.now() - i * 1800000),
    method: methods[Math.floor(Math.random() * methods.length)],
    path: paths[Math.floor(Math.random() * paths.length)],
    status: [200, 200, 201, 400, 404, 500][Math.floor(Math.random() * 6)],
    latency: Math.floor(Math.random() * 300) + 20,
    ip: `103.21.${Math.floor(Math.random() * 255)}.1`,
    size: Math.floor(Math.random() * 5000) + 100,
  };
};

const DEPS = [
  { name: "PostgreSQL Database", status: "healthy", latency: 12, region: "localhost", icon: "🗄" },
  { name: "Express API (Auth)", status: "healthy", latency: 18, region: "localhost", icon: "🔐" },
  { name: "Local File System", status: "healthy", latency: 42, region: "localhost", icon: "📦" },
  { name: "Vite React Frontend", status: "healthy", latency: 4, region: "client", icon: "⚡" },
];

// ── Shared UI Components ───────────────────────────────────────────────────────
const Sparkline = ({ data, color = T.accent, height = 28 }) => {
  const max = Math.max(...data, 1);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * 60;
    const y = height - (v / max) * (height - 4) - 2;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width="60" height={height} style={{ display: "block" }}>
      <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
    </svg>
  );
};

const LatencyBar = ({ value, max = 500 }) => {
  const pct = Math.min((value / max) * 100, 100);
  const color = value < 100 ? T.green : value < 250 ? T.yellow : T.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 60, height: 4, background: T.border, borderRadius: 2 }}>
        <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 2 }} />
      </div>
      <span style={{ fontFamily: T.mono, fontSize: 10, color: T.muted }}>{value}ms</span>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const s = {
    healthy: { bg: T.greenBg, fg: T.green },
    degraded: { bg: T.yellowBg, fg: T.yellow },
    down: { bg: T.redBg, fg: T.red },
    resolved: { bg: T.greenBg, fg: T.green },
    ongoing: { bg: T.yellowBg, fg: T.yellow },
  }[status] || { bg: T.surface, fg: T.muted };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: s.bg, color: s.fg, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 600, fontFamily: T.mono }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.fg }} />
      {status}
    </span>
  );
};

const MethodBadge = ({ method }) => {
  const colors = { GET: "#58a6ff", POST: "#3fb950", PUT: "#d29922", DELETE: "#f85149" };
  return (
    <span style={{ display: "inline-block", padding: "2px 7px", borderRadius: 4, border: `1px solid ${colors[method]}44`, color: colors[method], fontFamily: T.mono, fontSize: 11, fontWeight: 700, minWidth: 50, textAlign: "center" }}>
      {method}
    </span>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: T.surface, border: `1px solid ${T.borderLight}`, borderRadius: 12, padding: "20px", boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.02)", ...style }}>
    {children}
  </div>
);

// ── Main AdminDashboard ───────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");
  const [data, setData] = useState([]);
  const [overviewData, setOverviewData] = useState({ users: [], contacts: [] });
  const [stats, setStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [revealedKeys, setRevealedKeys] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [activeUsers, setActiveUsers] = useState(0);

  const [logs] = useState(() => Array.from({ length: 40 }, (_, i) => genLogEntry(i)));
  const [liveRps, setLiveRps] = useState(12.4);

  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/auth", { state: { from: "/dev-dashboard" } });
      else if (user.email !== "lucifer@convosecai.com") navigate("/learning");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user) fetchTabData(tab);
  }, [tab, user]);

  useEffect(() => {
    const t = setInterval(() => setLiveRps(v => +(v + (Math.random() - 0.5)).toFixed(1)), 3000);
    // Simulate active users drift
    const a = setInterval(() => setActiveUsers(Math.floor(Math.random() * 5) + 1), 5000);
    return () => { clearInterval(t); clearInterval(a); };
  }, []);

  async function fetchTabData(targetTab) {
    setIsLoading(true);
    try {
      if (targetTab === "overview") {
        let statsObj = { users: 0, courses: 0, contacts: 0 };

        try {
          const res = await api("/api/admin/stats");
          statsObj = { ...res.stats };
          setOverviewData({ users: res.recentUsers || [], contacts: res.recentContacts || [] });
        } catch (e) {
          setOverviewData({ users: [], contacts: [] });
        }
        setStats(statsObj);
      } else if (targetTab === "users") {
        const res = await api("/api/admin/users");
        setData(res.users || []);
      } else if (targetTab === "courses") {
        const res = await api("/api/courses");
        setData(res.courses || []);
      } else if (targetTab === "messages") {
        const res = await api("/api/admin/contacts");
        setData(res.contacts || []);
      }
    } catch (err) {
      console.error(err);
      setData([]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleAction = (type, item = null) => {
    setEditingItem(item);
    setTab(type); // Switch to the tab if needed, or just open modal
    setIsModalOpen(true);
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm("Permanently delete this item?")) return;
    try {
      const endpoint = type === 'courses' ? `/api/courses/${id}` : `/api/admin/${type}/${id}`;
      await api(endpoint, { method: "DELETE" });
      fetchTabData(tab);
    } catch (err) { alert(err.message); }
  };

  const menuItems = [
    { id: "overview", label: "Overview", icon: LayoutDashboard, group: "Management" },
    { id: "users", label: "User Directory", icon: Users },
    { id: "courses", label: "Curriculum", icon: BookOpen },
    { id: "messages", label: "Messages", icon: Mail },
    { id: "logs", label: "Request Logs", icon: Terminal, group: "System Ops" },
    { id: "env", label: "Environment", icon: Settings },
    { id: "status", label: "Service Health", icon: Activity },
  ];

  const tabLabel = menuItems.find(m => m.id === tab)?.label || "Dashboard";

  return (
    <div style={{ background: T.bg, minHeight: "100vh", color: T.text, fontFamily: T.sans, fontSize: 13 }}>
      <SEO title="Admin Console | ConvoSec AI" />
      <style>{`
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 3px; }
        .nav-item { display: flex; align-items: center; gap: 10px; padding: 8px 12px; border-radius: 6px; cursor: pointer; color: ${T.muted}; transition: 0.2s; border: 1px solid transparent; width: 100%; background: transparent; text-align: left; }
        .nav-item:hover { background: ${T.surfaceHover}; color: ${T.text}; }
        .nav-item.active { background: ${T.surfaceHover}; color: ${T.text}; border-color: transparent; border-left: 3px solid ${T.accent}; border-radius: 0 6px 6px 0; font-weight: 600; }
        .row-hover:hover { background: ${T.surfaceHover} !important; }
        .btn { padding: 6px 12px; border-radius: 6px; border: 1px solid ${T.border}; background: ${T.surface}; color: ${T.text}; cursor: pointer; font-size: 12px; display: flex; align-items: center; gap: 6px; }
        .btn-primary { background: ${T.accentDim}; border-color: ${T.accent}; }
        .btn:hover { border-color: ${T.muted}; }
      `}</style>

      {/* ── Sidebar ── */}
      <aside style={{ width: 260, position: "fixed", top: 0, left: 0, bottom: 0, background: "#ffffff", borderRight: `1px solid ${T.border}`, padding: "20px", display: "flex", flexDirection: "column", boxShadow: "4px 0 20px rgba(0,0,0,0.02)" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 30, padding: "0 10px", textDecoration: "none" }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", border: `1px solid ${T.borderLight}`, background: "#fff" }}>
            <img src="/logo.png" alt="ConvoSec AI" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: T.text, letterSpacing: "-0.02em" }}>ConvoSec AI</div>
            <div style={{ fontSize: 10, color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>Command Center</div>
          </div>
        </Link>

        <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          {menuItems.map(item => (
            <div key={item.id}>
              {item.group && <div style={{ fontSize: 10, color: T.faint, padding: "16px 12px 8px", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 700 }}>{item.group}</div>}
              <button className={`nav-item ${tab === item.id ? 'active' : ''}`} onClick={() => setTab(item.id)}>
                <item.icon size={16} /> {item.label}
              </button>
            </div>
          ))}
        </nav>

        <div style={{ marginTop: "auto", padding: "12px", background: T.bg, border: `1px solid ${T.border}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.purpleBg, color: T.purple, border: `1px solid ${T.purple}33`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{user?.email[0].toUpperCase()}</div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div style={{ fontWeight: 700, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{user?.email.split('@')[0]}</div>
            <div style={{ fontSize: 10, color: T.muted, fontWeight: 500 }}>System Root</div>
          </div>
          <button onClick={logout} style={{ background: "none", border: "none", color: T.faint, cursor: "pointer" }} title="Log out"><LogOut size={16} /></button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main style={{ marginLeft: 260, padding: "30px 40px" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: 20, fontWeight: 600, marginBottom: 4 }}>{tabLabel}</h1>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: T.muted }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Activity size={12} color={T.green} /> {activeUsers} operators online</span>
              <span>•</span>
              <span style={{ fontFamily: T.mono }}>{liveRps} req/s</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <Search size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: T.faint }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={`Search ${tab}...`}
                style={{ background: T.bg, border: `1px solid ${T.border}`, borderRadius: 8, padding: "8px 12px 8px 32px", color: T.text, fontSize: 13, width: 220, outline: "none" }}
              />
            </div>
            <div style={{ height: 24, width: 1, background: T.border }} />
            <button className="btn" title="System Alerts"><Bell size={14} /></button>
            {tab === "users" && <button className="btn btn-primary" onClick={() => handleAction('users')}><Plus size={14} /> Provision User</button>}
            {tab === "courses" && <button className="btn btn-primary" onClick={() => handleAction('courses')}><Plus size={14} /> New Course</button>}
          </div>
        </header>

        {tab === "overview" && <OverviewTab stats={stats} data={overviewData} isLoading={isLoading} setTab={setTab} />}
        {tab === "users" && <UsersTab data={data} isLoading={isLoading} onDelete={handleDelete} onEdit={(u) => handleAction('users', u)} query={searchQuery} />}
        {tab === "courses" && <CoursesTab data={data} isLoading={isLoading} onDelete={handleDelete} onEdit={(c) => handleAction('courses', c)} query={searchQuery} />}
        {tab === "messages" && <MessagesTab data={data} isLoading={isLoading} onDelete={handleDelete} query={searchQuery} />}
        {tab === "logs" && <LogsTab logs={logs} query={searchQuery} />}
        {tab === "env" && <EnvTab revealedKeys={revealedKeys} setRevealedKeys={setRevealedKeys} />}
        {tab === "status" && <StatusTab />}
      </main>

      {/* ── Modal ── */}
      {isModalOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <Card style={{ width: "100%", maxWidth: tab === "courses" ? 800 : 450, position: "relative", padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "20px 24px", borderBottom: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", background: T.surfaceHover }}>
              <div style={{ fontWeight: 700 }}>{editingItem ? 'Update' : 'Create new'} {tab.slice(0, -1)}</div>
              <button onClick={() => setIsModalOpen(false)} style={{ background: "none", border: "none", color: T.muted, cursor: "pointer" }}><X size={20} /></button>
            </div>
            <div style={{ padding: 24, maxHeight: "80vh", overflowY: "auto" }}>
              {tab === "users" && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div><label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 6 }}>FULL NAME</label><input style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text }} placeholder="Lucifer Gupta" defaultValue={editingItem?.name} /></div>
                  <div><label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 6 }}>EMAIL ADDRESS</label><input style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text }} placeholder="name@convosecai.com" defaultValue={editingItem?.email} /></div>
                  <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: 8 }} onClick={() => setIsModalOpen(false)}><Save size={14} /> Save Operator</button>
                </div>
              )}
              {tab === "courses" && <CourseForm initialData={editingItem} onCancel={() => setIsModalOpen(false)} onSubmit={() => { setIsModalOpen(false); fetchTabData('courses'); }} />}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

// ── Content Sub-Components ─────────────────────────────────────────────────────

function OverviewTab({ stats, data, isLoading, setTab }) {
  const metrics = [
    { id: 'users', label: "Total Users", value: stats?.users ?? 0, icon: Users, color: T.accent },
    { id: 'courses', label: "Curriculum", value: stats?.courses ?? 0, icon: BookOpen, color: T.green },
    { id: 'messages', label: "Messages", value: stats?.contacts ?? 0, icon: Mail, color: T.yellow },
    { id: 'status', label: "API Uptime", value: "99.98%", icon: Activity, color: T.teal },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {metrics.map((m, i) => (
          <Card key={i} style={{ cursor: 'pointer' }} onClick={() => m.id !== 'status' && setTab(m.id)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontSize: 11, color: T.muted, textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>{m.label}</div>
                <div style={{ fontSize: 24, fontWeight: 700, fontFamily: T.mono }}>{isLoading ? "…" : m.value}</div>
              </div>
              <m.icon size={20} color={m.color} opacity={0.8} />
            </div>
            <div style={{ marginTop: 12 }}><Sparkline data={Array.from({ length: 10 }, () => Math.random() * 20)} color={m.color} /></div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        <Card>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ fontWeight: 600 }}>Recent Activity</div>
            <button onClick={() => setTab('users')} style={{ background: 'none', border: 'none', color: T.accent, fontSize: 12, cursor: 'pointer' }}>View All Operators <ArrowRight size={12} /></button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", color: T.muted, fontSize: 11 }}>
                <th style={{ padding: "8px 0" }}>User / Entity</th>
                <th>Status</th>
                <th style={{ textAlign: "right" }}>Joined</th>
              </tr>
            </thead>
            <tbody>
              {(data?.users || []).map((u, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${T.borderLight}` }}>
                  <td style={{ padding: "12px 0" }}>
                    <div style={{ fontWeight: 600 }}>{u.name || 'Anonymous'}</div>
                    <div style={{ fontSize: 11, color: T.muted }}>{u.email}</div>
                  </td>
                  <td><StatusBadge status="healthy" /></td>
                  <td style={{ textAlign: "right", fontFamily: T.mono, color: T.muted }}>{new Date(u.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {(data?.users || []).length === 0 && <tr><td colSpan={3} style={{ padding: 24, textAlign: 'center', color: T.faint }}>No recent system entry detected</td></tr>}
            </tbody>
          </table>
        </Card>

        <Card>
          <div style={{ fontWeight: 600, marginBottom: 16 }}>Infrastructure</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {DEPS.map((dep, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 32, height: 32, background: T.bg, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center" }}>{dep.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500 }}>{dep.name}</div>
                  <div style={{ fontSize: 10, color: T.muted }}>{dep.region}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, fontFamily: T.mono, color: dep.latency > 100 ? T.red : T.green }}>{dep.latency}ms</div>
                  <div style={{ width: 40, height: 2, background: T.border, marginTop: 4 }}>
                    <div style={{ width: `${Math.min(dep.latency / 2, 100)}%`, height: "100%", background: dep.latency > 100 ? T.red : T.green }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

function UsersTab({ data, isLoading, onDelete, onEdit, query }) {
  const filtered = data.filter(u =>
    !query ||
    u.name?.toLowerCase().includes(query.toLowerCase()) ||
    u.email?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Card style={{ padding: 0 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", color: T.muted, fontSize: 11, textTransform: "uppercase", background: T.borderLight }}>
            <th style={{ padding: "12px 20px" }}>Operator</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined</th>
            <th style={{ textAlign: "right", paddingRight: 20 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? <tr><td colSpan={5} style={{ padding: 40, textAlign: "center", color: T.muted }}>Fetching from PostgreSQL...</td></tr> :
            filtered.map((u, i) => (
              <tr key={i} className="row-hover" style={{ borderBottom: `1px solid ${T.borderLight}` }}>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 6, background: T.border, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{u.name ? u.name[0] : '?'}</div>
                    <span style={{ fontWeight: 600 }}>{u.name || "Anonymous User"}</span>
                  </div>
                </td>
                <td style={{ color: T.muted }}>{u.email}</td>
                <td><span style={{ fontSize: 11, fontFamily: T.mono, background: T.bg, padding: "2px 6px", borderRadius: 4 }}>{u.role || 'student'}</span></td>
                <td style={{ fontFamily: T.mono, color: T.muted }}>{new Date(u.created_at).toLocaleDateString()}</td>
                <td style={{ textAlign: "right", paddingRight: 20 }}>
                  <button className="btn" style={{ display: "inline-flex", marginRight: 8 }} onClick={() => onEdit(u)}><Edit size={12} /></button>
                  <button className="btn" style={{ display: "inline-flex", color: T.red }} onClick={() => onDelete('users', u.id)}><Trash2 size={12} /></button>
                </td>
              </tr>
            ))}
          {filtered.length === 0 && !isLoading && <tr><td colSpan={5} style={{ padding: 40, textAlign: "center", color: T.muted }}>No records match your search query</td></tr>}
        </tbody>
      </table>
    </Card>
  );
}

function CoursesTab({ data, isLoading, onDelete, onEdit, query }) {
  const filtered = data.filter(c =>
    !query ||
    c.title?.toLowerCase().includes(query.toLowerCase()) ||
    c.category?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
      {isLoading ? <div style={{ color: T.muted, gridColumn: "1/-1", textAlign: "center", padding: 40 }}>Loading curriculum engine...</div> :
        filtered.map((c, i) => (
          <Card key={i} style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ height: 120, background: T.border, position: "relative" }}>
              <img src={c.image} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} alt="" />
              <div style={{ position: "absolute", top: 10, right: 10, display: "flex", gap: 5 }}>
                <span style={{ background: T.greenBg, color: T.green, padding: "2px 8px", borderRadius: 4, fontSize: 10, fontWeight: 700 }}>LIVE</span>
                <span style={{ background: T.bg, padding: "2px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>₹{c.price}</span>
              </div>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.title}</div>
              <div style={{ fontSize: 11, color: T.muted, marginBottom: 16 }}>{c.category} • {c.difficulty}</div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" style={{ flex: 1, justifyContent: "center" }} onClick={() => onEdit(c)}><Edit size={12} /> Edit</button>
                <button className="btn" style={{ color: T.red }} onClick={() => onDelete('courses', c.id)}><Trash2 size={12} /></button>
              </div>
            </div>
          </Card>
        ))}
      {filtered.length === 0 && !isLoading && <div style={{ color: T.muted, gridColumn: "1/-1", textAlign: "center", padding: 40 }}>No courses match your criteria.</div>}
    </div>
  );
}

function LogsTab({ logs, query }) {
  const filtered = logs.filter(l =>
    !query ||
    l.path.toLowerCase().includes(query.toLowerCase()) ||
    String(l.status).includes(query) ||
    l.ip.includes(query)
  );

  return (
    <Card style={{ padding: 0 }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
        <thead>
          <tr style={{ textAlign: "left", color: T.muted, background: T.borderLight }}>
            <th style={{ padding: "12px 20px" }}>Method</th>
            <th>Path</th>
            <th>Status</th>
            <th>Latency</th>
            <th style={{ textAlign: "right", paddingRight: 20 }}>IP</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((log, i) => (
            <tr key={i} className="row-hover" style={{ borderBottom: `1px solid ${T.borderLight}` }}>
              <td style={{ padding: "10px 20px" }}><MethodBadge method={log.method} /></td>
              <td style={{ fontFamily: T.mono, color: T.accent }}>{log.path}</td>
              <td style={{ fontWeight: 700, color: log.status < 400 ? T.green : T.red }}>{log.status}</td>
              <td><LatencyBar value={log.latency} /></td>
              <td style={{ textAlign: "right", paddingRight: 20, color: T.muted, fontFamily: T.mono }}>{log.ip}</td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={5} style={{ padding: 40, textAlign: "center", color: T.muted }}>No logs found for this filter.</td></tr>}
        </tbody>
      </table>
    </Card>
  );
}

function MessagesTab({ data, isLoading, onDelete, query }) {
  const filtered = data.filter(m =>
    !query ||
    m.name?.toLowerCase().includes(query.toLowerCase()) ||
    m.email?.toLowerCase().includes(query.toLowerCase()) ||
    m.message?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {isLoading ? <div style={{ color: T.muted, textAlign: "center", padding: 40 }}>Fetching communications hub...</div> :
        filtered.map((msg, i) => (
          <Card key={i}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: 6, background: T.border, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{msg.name ? msg.name[0] : '?'}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{msg.name || "Inquiry"}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{msg.email}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button className="btn" onClick={() => window.location.href = `mailto:${msg.email}`}><ArrowRight size={12} /> Reply</button>
                <button className="btn" style={{ color: T.red }} onClick={() => onDelete('contacts', msg.id)}><Trash2 size={12} /></button>
              </div>
            </div>
            <div style={{ background: T.bg, padding: 12, borderRadius: 6, fontSize: 12, color: T.text, lineHeight: 1.5 }}>{msg.message}</div>
          </Card>
        ))}
      {filtered.length === 0 && !isLoading && <div style={{ color: T.muted, textAlign: "center", padding: 40 }}>No messages match your search.</div>}
    </div>
  );
}

function EnvTab({ revealedKeys, setRevealedKeys }) {
  const envs = [
    { k: "VITE_API_URL", v: import.meta.env.VITE_API_URL, s: false },
    { k: "VITE_NEWS_API_KEY", v: import.meta.env.VITE_NEWS_API_KEY, s: true },
    { k: "VITE_GROQ_API_KEY", v: import.meta.env.VITE_GROQ_API_KEY, s: true },
    { k: "NODE_ENV", v: "development", s: false },
  ];
  return (
    <Card style={{ padding: 0 }}>
      {envs.map((env, i) => {
        const isRevealed = revealedKeys.has(env.k);
        return (
          <div key={i} style={{ padding: "16px 20px", borderBottom: i < envs.length - 1 ? `1px solid ${T.borderLight}` : 'none', display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 220, fontFamily: T.mono, color: T.accent }}>{env.k}</div>
            <div style={{ flex: 1, fontFamily: T.mono, color: env.s && !isRevealed ? T.faint : T.text }}>{env.s && !isRevealed ? "••••••••••••••••••••" : env.v}</div>
            {env.s && <button className="btn" onClick={() => setRevealedKeys(prev => {
              const next = new Set(prev);
              if (next.has(env.k)) next.delete(env.k); else next.add(env.k);
              return next;
            })}>{isRevealed ? "Hide" : "Reveal"}</button>}
          </div>
        );
      })}
    </Card>
  );
}

function StatusTab() {
  const incidents = [
    { time: "12m ago", msg: "Database query latency spike", status: "resolved" },
    { time: "2h ago", msg: "Express API rate limit adjustments", status: "resolved" },
  ];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 20 }}>
        {DEPS.map((dep, i) => (
          <Card key={i} style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 24 }}>{dep.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{dep.name}</div>
              <div style={{ fontSize: 11, color: T.muted }}>{dep.region}</div>
            </div>
            <StatusBadge status={dep.status} />
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ fontWeight: 600, marginBottom: 16 }}>Incident History</div>
        {incidents.map((inc, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "12px 0", borderTop: i > 0 ? `1px solid ${T.borderLight}` : 'none' }}>
            <div style={{ fontSize: 11, color: T.muted, width: 60 }}>{inc.time}</div>
            <div style={{ flex: 1 }}>{inc.msg}</div>
            <StatusBadge status={inc.status} />
          </div>
        ))}
      </Card>
    </div>
  );
}

function CourseForm({ initialData, onCancel, onSubmit }) {
  const [form, setForm] = useState(initialData || { 
    title: '', 
    slug: '',
    price: 0, 
    category: 'Cybersecurity', 
    difficulty: 'Beginner', 
    duration: '20 Hours',
    description: 'A comprehensive guide to mastering this domain.',
    instructor_name: 'Lucifer Gupta',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80' 
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Auto-generate slug if missing
      const submission = { ...form };
      if (!submission.slug) submission.slug = submission.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      
      const method = initialData ? "PUT" : "POST";
      const url = initialData ? `/api/courses/${initialData.id}` : "/api/courses";
      await api(url, { method, body: JSON.stringify(submission) });
      onSubmit();
    } catch (err) { alert(err.message); }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4 }}>COURSE TITLE</label>
          <input required style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text }} 
            value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4 }}>URL SLUG (AUTO-GEN)</label>
          <input style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text, fontFamily: T.mono }} 
            value={form.slug} placeholder="e.g. intro-to-hacking" onChange={e => setForm({...form, slug: e.target.value})} />
        </div>
      </div>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        <div>
          <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4 }}>PRICE (INR)</label>
          <input type="number" required style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text }} 
            value={form.price} onChange={e => setForm({...form, price: Number(e.target.value)})} />
        </div>
        <div>
          <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4 }}>CATEGORY</label>
          <select style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text }} 
            value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
            <option>Cybersecurity</option>
            <option>AI & Machine Learning</option>
            <option>Deep Learning</option>
            <option>Generative AI</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4 }}>DURATION</label>
          <input style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text }} 
            value={form.duration} onChange={e => setForm({...form, duration: e.target.value})} />
        </div>
      </div>

      <div>
        <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4 }}>DESCRIPTION</label>
        <textarea style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text, minHeight: 60 }} 
          value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <div>
          <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4 }}>INSTRUCTOR</label>
          <input style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text }} 
            value={form.instructor_name} onChange={e => setForm({...form, instructor_name: e.target.value})} />
        </div>
        <div>
          <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4 }}>DIFFICULTY</label>
          <select style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text }} 
            value={form.difficulty} onChange={e => setForm({...form, difficulty: e.target.value})}>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>
      </div>

      <div>
        <label style={{ fontSize: 11, color: T.muted, display: "block", marginBottom: 4 }}>COVER IMAGE URL</label>
        <input style={{ width: "100%", background: T.bg, border: `1px solid ${T.border}`, padding: 10, borderRadius: 6, color: T.text }} 
          value={form.image} onChange={e => setForm({...form, image: e.target.value})} />
      </div>

      <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
        <button type="button" onClick={onCancel} className="btn" style={{ flex: 1, justifyContent: "center" }}>Cancel</button>
        <button type="submit" className="btn btn-primary" style={{ flex: 2, justifyContent: "center" }}><Save size={14} /> {initialData ? 'Update Course' : 'Create Course'}</button>
      </div>
    </form>
  );
}

