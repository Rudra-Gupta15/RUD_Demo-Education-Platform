import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Trophy,
  Zap,
  Play,
  Settings,
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight,
  Search,
  Bell,
  Activity,
  ArrowRight,
  Target,
  Cpu,
  Globe
} from "lucide-react";
import { useAuth } from "../state/AuthContext";
import { api } from "../api/client";

// ── Styles ────────────────────────────────────────────────────────────────────
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

  .ud-dash *, .ud-dash *::before, .ud-dash *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .ud-dash {
    font-family: 'Outfit', sans-serif;
    display: flex;
    min-height: 100vh;
    background: #f8fafc;
    color: #0f172a;
  }

  /* ── Sidebar: Modern Outlined ── */
  .ud-sidebar {
    width: 260px;
    flex-shrink: 0;
    background: #ffffff;
    border-right: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 40;
    box-shadow: 10px 0 30px -15px rgba(0,0,0,0.03);
  }

  .ud-logo {
    padding: 32px 24px;
    display: flex;
    align-items: center;
    gap: 12px;
    text-decoration: none;
    transition: opacity 0.2s;
  }
  .ud-logo:hover { opacity: 0.8; }
  .ud-logo-icon {
    width: 38px; height: 38px;
    border-radius: 8px;
    overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    background: #fff;
    border: 1px solid #e2e8f0;
  }
  .ud-logo-name { font-size: 18px; font-weight: 700; letter-spacing: -0.02em; color: #0f172a; }
  .ud-logo-sub { font-size: 10px; color: #64748b; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600; margin-top: 2px; }

  .ud-nav { flex: 1; padding: 0 16px; overflow-y: auto; }
  .ud-nav-section {
    font-size: 11px; letter-spacing: 0.05em; text-transform: uppercase;
    color: #94a3b8; padding: 24px 12px 8px; font-weight: 700;
  }
  .ud-nav-item {
    display: flex; align-items: center; gap: 12px;
    padding: 10px 12px; border-radius: 10px;
    cursor: pointer; transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    margin-bottom: 4px; border: 1px solid transparent; width: 100%;
    background: transparent; text-align: left;
    font-family: 'Inter', sans-serif;
    color: #64748b; font-size: 14px; font-weight: 500;
  }
  .ud-nav-item:hover { background: #f1f5f9; color: #2563eb; border-color: #e2e8f0; }
  .ud-nav-item.active {
    background: #eff6ff;
    color: #2563eb;
    font-weight: 600;
    border-color: #dbeafe;
  }
  .ud-nav-item svg { width: 18px; height: 18px; flex-shrink: 0; }

  .ud-user {
    margin: 16px;
    padding: 16px;
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 16px;
    display: flex; align-items: center; gap: 12px;
  }
  .ud-user-avatar {
    width: 36px; height: 36px; border-radius: 10px;
    background: #2563eb; color: #fff;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; flex-shrink: 0;
  }
  .ud-user-name { font-size: 13px; font-weight: 600; color: #0f172a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .ud-user-role { font-size: 10px; color: #64748b; font-weight: 600; text-transform: uppercase; }
  .ud-logout {
    margin-left: auto; background: #fff; border: 1px solid #e2e8f0;
    cursor: pointer; color: #64748b; width: 30px; height: 30px;
    border-radius: 8px; transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
  }
  .ud-logout:hover { color: #ef4444; border-color: #fca5a5; background: #fef2f2; }

  /* ── Main ── */
  .ud-main { flex: 1; margin-left: 260px; display: flex; flex-direction: column; min-height: 100vh; }

  .ud-topbar {
    padding: 20px 32px;
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: space-between;
    position: sticky; top: 0; z-index: 30;
  }
  .ud-topbar-title { font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.02em; }
  .ud-topbar-actions { display: flex; align-items: center; gap: 16px; }
  
  .ud-live {
    display: flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 600;
    background: #f0fdf4; color: #16a34a;
    padding: 8px 16px; border-radius: 10px;
    border: 1px solid #dcfce7;
  }
  .ud-live-dot { width: 8px; height: 8px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1); animation: pulse 2s infinite; }
  @keyframes pulse { 0% { box-shadow: 0 0 0 0px rgba(34, 197, 94, 0.4); } 70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0px rgba(34, 197, 94, 0); } }

  .ud-content { padding: 32px; flex: 1; max-width: 1300px; }

  /* ── Hero ── */
  .ud-hero {
    background: #0f172a;
    background-image: radial-gradient(circle at top right, #2563eb22, transparent), 
                      url('https://www.transparenttextures.com/patterns/cubes.png');
    border-radius: 20px;
    padding: 48px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
    box-shadow: 0 20px 40px -15px rgba(15, 23, 42, 0.3);
    border: 1px solid rgba(255,255,255,0.05);
  }
  .ud-hero-content { max-width: 500px; }
  .ud-hero-badge {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(37, 99, 235, 0.2); color: #60a5fa;
    padding: 6px 12px; border-radius: 8px;
    font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;
    margin-bottom: 20px; border: 1px solid rgba(37, 99, 235, 0.3);
  }
  .ud-hero-title { font-size: 36px; font-weight: 800; margin-bottom: 12px; letter-spacing: -0.02em; }
  .ud-hero-para { color: #94a3b8; font-size: 16px; font-weight: 500; line-height: 1.6; }
  .ud-hero-btn {
    margin-top: 24px;
    background: #fff; color: #0f172a;
    padding: 14px 28px; border-radius: 10px;
    font-weight: 700; font-size: 15px; border: none; cursor: pointer;
    display: flex; align-items: center; gap: 10px;
    transition: all 0.2s;
  }
  .ud-hero-btn:hover { background: #f8fafc; transform: translateY(-2px); }

  /* ── Metrics ── */
  .ud-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 32px; }
  .ud-metric {
    background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px;
    display: flex; align-items: center; gap: 20px;
    transition: all 0.2s;
  }
  .ud-metric:hover { transform: translateY(-4px); box-shadow: 0 10px 20px -10px rgba(0,0,0,0.05); border-color: #cbd5e1; }
  .ud-metric-icon { 
    width: 52px; height: 52px; border-radius: 12px; 
    display: flex; align-items: center; justify-content: center;
    background: #f1f5f9; color: #475569;
  }
  .ud-metric-val { font-size: 26px; font-weight: 800; color: #0f172a; letter-spacing: -0.01em; }
  .ud-metric-lbl { font-size: 13px; color: #64748b; font-weight: 600; margin-top: 2px; }

  /* ── Course Grid ── */
  .ud-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
  .ud-section-title { font-size: 20px; font-weight: 700; color: #0f172a; letter-spacing: -0.01em; }
  .ud-section-link { font-size: 14px; color: #2563eb; font-weight: 700; text-decoration: none; display: flex; align-items: center; gap: 4px; border: none; background: none; cursor: pointer; }

  .ud-course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .ud-course-card {
    background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;
    transition: all 0.2s; cursor: pointer;
  }
  .ud-course-card:hover { transform: translateY(-6px); box-shadow: 0 20px 25px -5px rgba(0,0,0,0.05); border-color: #cbd5e1; }
  .ud-course-thumb { position: relative; aspect-ratio: 16/9; overflow: hidden; border-bottom: 1px solid #f1f5f9; }
  .ud-course-thumb img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
  .ud-course-card:hover .ud-course-thumb img { transform: scale(1.05); }
  .ud-course-badge {
    position: absolute; top: 12px; left: 12px;
    background: rgba(255,255,255,0.95); backdrop-filter: blur(4px);
    padding: 6px 12px; border-radius: 8px; font-size: 10px; font-weight: 800; color: #0f172a;
    border: 1px solid #f1f5f9; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
  }
  .ud-course-body { padding: 20px; }
  .ud-course-title { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 16px; line-height: 1.4; }
  
  .ud-progress-wrap { margin-top: 16px; }
  .ud-progress-bar { height: 6px; background: #f1f5f9; border-radius: 99px; overflow: hidden; margin-bottom: 8px; border: 1px solid #f1f5f9; }
  .ud-progress-fill { height: 100%; background: #2563eb; border-radius: 99px; }
  .ud-progress-meta { display: flex; justify-content: space-between; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; }

  /* ── Panels & Feed ── */
  .ud-two-col { display: grid; grid-template-columns: 1fr 360px; gap: 24px; margin-top: 48px; }
  .ud-panel { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 24px; }
  .ud-panel-title { font-size: 16px; font-weight: 700; margin-bottom: 20px; color: #0f172a; border-bottom: 1px solid #f8fafc; padding-bottom: 12px; }
  
  .ud-feed { display: flex; flex-direction: column; gap: 16px; }
  .ud-feed-item { display: flex; gap: 16px; align-items: flex-start; padding: 12px; border-radius: 12px; border: 1px solid transparent; transition: all 0.2s; }
  .ud-feed-item:hover { background: #f8fafc; border-color: #f1f5f9; }
  .ud-feed-icon { width: 36px; height: 36px; border-radius: 10px; background: #eff6ff; color: #2563eb; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1px solid #dbeafe; }
  .ud-feed-text { font-size: 13px; font-weight: 500; color: #334155; line-height: 1.5; }
  .ud-feed-time { font-size: 11px; color: #94a3b8; font-weight: 700; text-transform: uppercase; margin-top: 4px; }

  .qr-loading { display: flex; align-items: center; justify-content: center; min-height: 100vh; color: #64748b; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; }
`;

export default function UserDashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth", { state: { from: "/dashboard" } });
    } else if (user?.email === "lucifer@convosecai.com") {
      navigate("/dev-dashboard");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await api("/api/courses/user/enrolled");
        setCourses(res.courses || []);
      } catch (err) {
        console.error("Failed to fetch enrolled courses", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchCourses();
  }, [user]);

  if (loading || !user) return <div className="qr-loading">Initializing Secure Environment…</div>;

  const initials = user.name?.split(" ").map(n => n[0]).join("") || "U";
  const firstName = user.name?.split(" ")[0] || "Student";

  const renderContent = () => {
    switch (activeTab) {
      case "overview": return <OverviewTab firstName={firstName} courses={courses} isLoading={isLoading} navigate={navigate} />;
      case "courses": return <MyCoursesTab courses={courses} isLoading={isLoading} navigate={navigate} />;
      case "roadmap": return <RoadmapTab />;
      case "certs": return <CertificationsTab />;
      case "performance": return <PerformanceTab />;
      case "settings": return <SettingsTab user={user} />;
      default: return <OverviewTab firstName={firstName} courses={courses} isLoading={isLoading} navigate={navigate} />;
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="ud-dash">
        {/* ── Sidebar ── */}
        <aside className="ud-sidebar">
          <Link to="/" className="ud-logo">
            <div className="ud-logo-icon">
              <img src="/logo.png" alt="ConvoSec" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div>
              <div className="ud-logo-name">ConvoSec AI</div>
              <div className="ud-logo-sub">Academy Console</div>
            </div>
          </Link>

          <nav className="ud-nav">
            <div className="ud-nav-section">Main Console</div>
            <button className={`ud-nav-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab("overview")}>
              <LayoutDashboard /> Overview
            </button>
            <button className={`ud-nav-item ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab("courses")}>
              <BookOpen /> My Courses
            </button>
            <button className={`ud-nav-item ${activeTab === 'roadmap' ? 'active' : ''}`} onClick={() => setActiveTab("roadmap")}>
              <Target /> Learning Path
            </button>
            <button className={`ud-nav-item ${activeTab === 'certs' ? 'active' : ''}`} onClick={() => setActiveTab("certs")}>
              <Trophy /> Certifications
            </button>

            <div className="ud-nav-section">Network</div>
            <button className={`ud-nav-item ${activeTab === 'performance' ? 'active' : ''}`} onClick={() => setActiveTab("performance")}>
              <Activity /> Performance
            </button>
            <button className="ud-nav-item"><Globe /> Community</button>
            <button className={`ud-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab("settings")}>
              <Settings /> Preferences
            </button>
          </nav>

          <div className="ud-user">
            <div className="ud-user-avatar">{initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="ud-user-name">{user.name}</div>
              <div className="ud-user-role">Scholar Account</div>
            </div>
            <button className="ud-logout" onClick={() => { logout(); navigate("/auth"); }} title="Terminate Session">
              <LogOut size={14} />
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="ud-main">
          <header className="ud-topbar">
            <div>
              <div className="ud-topbar-title" style={{ textTransform: 'capitalize' }}>{activeTab.replace("-", " ")} Dashboard</div>
            </div>
            <div className="ud-topbar-actions">
              <span className="ud-live"><span className="ud-live-dot" />Secure Connection Active</span>
              <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><Bell size={18} /></button>
            </div>
          </header>

          <div className="ud-content">
            {renderContent()}
          </div>
        </main>
      </div>
    </>
  );
}

// ── Tab Components ────────────────────────────────────────────────────────────

function OverviewTab({ firstName, courses, isLoading, navigate }) {
  return (
    <>
      <div className="ud-hero">
        <div className="ud-hero-content">
          <div className="ud-hero-badge"><Zap size={12} /> Active Trajectory</div>
          <h1 className="ud-hero-title">Welcome back, {firstName}</h1>
          <p className="ud-hero-para">Your progress in "Agentic AI Architecture" is at 45%. You are 3 modules away from your next certification.</p>
          <button className="ud-hero-btn" onClick={() => navigate("/learning")}>
            Resume Learning <ArrowRight size={16} />
          </button>
        </div>
        <div className="ud-hero-gfx" style={{ opacity: 0.2 }}>
          <Cpu size={180} />
        </div>
      </div>

      <div className="ud-metrics">
        <MetricCard icon={Clock} val="12.5h" lbl="Study Time" color="#2563eb" bg="#eff6ff" />
        <MetricCard icon={BookOpen} val={courses.length} lbl="Active Courses" color="#16a34a" bg="#f0fdf4" />
        <MetricCard icon={Trophy} val="2" lbl="Certificates Earned" color="#d97706" bg="#fffbeb" />
      </div>

      <section>
        <div className="ud-section-header">
          <h2 className="ud-section-title">My Curriculum</h2>
          <button className="ud-section-link" onClick={() => navigate("/catalog")}>
            Explore more <ChevronRight size={14} />
          </button>
        </div>

        {isLoading ? (
          <div style={{ textAlign: 'center', padding: 40, color: '#94a3b8' }}>Syncing academic data…</div>
        ) : courses.length === 0 ? (
          <EmptyCourses onBrowse={() => navigate("/catalog")} />
        ) : (
          <div className="ud-course-grid">
            {courses.slice(0, 3).map((course, i) => (
              <CourseCard key={course.id} course={course} progress={30 + (i * 15)} onClick={() => navigate(`/courses/${course.slug}`)} />
            ))}
          </div>
        )}
      </section>

      <div className="ud-two-col">
        <div className="ud-panel">
          <h3 className="ud-panel-title">Academic Feed</h3>
          <div className="ud-feed">
            <FeedItem icon={Trophy} text="Earned 'Prompt Engineering' specialist badge" time="2 hours ago" />
            <FeedItem icon={Zap} text="New lab released: 'Multi-Agent Orchestration'" time="Yesterday" />
            <FeedItem icon={BookOpen} text="Joined course 'Infrastructure Security'" time="3 days ago" />
          </div>
        </div>

        <div className="ud-panel">
          <h3 className="ud-panel-title">System Update</h3>
          <div style={{ background: '#f8fafc', borderRadius: 12, padding: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>V3.1.0 Architecture</div>
            <div style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5 }}>The core kernel has been updated with support for recursive agent reasoning. Check the new labs for details.</div>
          </div>
        </div>
      </div>
    </>
  );
}

function MyCoursesTab({ courses, isLoading, navigate }) {
  return (
    <div>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>My Courses</h1>
        <p style={{ color: '#64748b', fontWeight: 500, marginTop: 4 }}>Manage and continue your enrolled specializations.</p>
      </div>

      {isLoading ? (
        <div style={{ textAlign: 'center', padding: 80, color: '#94a3b8' }}>Accessing database…</div>
      ) : courses.length === 0 ? (
        <EmptyCourses onBrowse={() => navigate("/catalog")} />
      ) : (
        <div className="ud-course-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} progress={20 + (i * 10)} onClick={() => navigate(`/courses/${course.slug}`)} />
          ))}
        </div>
      )}
    </div>
  );
}

function RoadmapTab() {
  return (
    <div className="ud-panel" style={{ padding: 60, textAlign: 'center' }}>
      <Target size={48} color="#2563eb" style={{ margin: '0 auto 20px' }} />
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Personalized Roadmap</h2>
      <p style={{ color: '#64748b', maxWidth: 400, margin: '0 auto' }}>We are generating your optimal learning trajectory based on your performance metrics. Stay tuned.</p>
    </div>
  );
}

function CertificationsTab() {
  return (
    <div className="ud-panel" style={{ padding: 60, textAlign: 'center' }}>
      <Trophy size={48} color="#d97706" style={{ margin: '0 auto 20px' }} />
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Credential Vault</h2>
      <p style={{ color: '#64748b', maxWidth: 400, margin: '0 auto' }}>Complete your active courses to unlock official industry-recognized certifications.</p>
    </div>
  );
}

function PerformanceTab() {
  return (
    <div className="ud-panel" style={{ padding: 60, textAlign: 'center' }}>
      <Activity size={48} color="#16a34a" style={{ margin: '0 auto 20px' }} />
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>Performance Metrics</h2>
      <p style={{ color: '#64748b', maxWidth: 400, margin: '0 auto' }}>Deep analytics on your lab completion speed and conceptual accuracy are being compiled.</p>
    </div>
  );
}

function SettingsTab({ user }) {
  return (
    <div style={{ maxWidth: 600 }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>Preferences</h1>
        <p style={{ color: '#64748b', fontWeight: 500, marginTop: 4 }}>Manage your scholar profile and interface settings.</p>
      </div>
      <div className="ud-panel" style={{ padding: 0 }}>
        <div style={{ padding: 24, borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20 }}>Account Security</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Email Address</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>{user.email}</div>
            </div>
            <button style={{ padding: '6px 12px', borderRadius: 8, border: '1px solid #e2e8f0', background: '#fff', fontSize: 12, fontWeight: 600 }}>Update</button>
          </div>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20 }}>System Interface</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600 }}>Theme Mode</div>
              <div style={{ fontSize: 13, color: '#64748b' }}>Current: High-Fidelity Light</div>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f1f5f9', border: '2px solid #2563eb' }} />
              <div style={{ width: 32, height: 32, borderRadius: 8, background: '#0f172a' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Shared Sub-components ─────────────────────────────────────────────────────

function MetricCard({ icon: Icon, val, lbl, color, bg }) {
  return (
    <div className="ud-metric">
      <div className="ud-metric-icon" style={{ background: bg, color: color }}><Icon size={20} /></div>
      <div>
        <div className="ud-metric-val">{val}</div>
        <div className="ud-metric-lbl">{lbl}</div>
      </div>
    </div>
  );
}

function CourseCard({ course, progress, onClick }) {
  return (
    <div className="ud-course-card" onClick={onClick}>
      <div className="ud-course-thumb">
        <img src={course.image || `https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80`} alt="" />
        <span className="ud-course-badge">{course.category || 'AI Systems'}</span>
      </div>
      <div className="ud-course-body">
        <h3 className="ud-course-title">{course.title}</h3>
        <div className="ud-progress-wrap">
          <div className="ud-progress-bar"><div className="ud-progress-fill" style={{ width: `${progress}%` }} /></div>
          <div className="ud-progress-meta">
            <span>{progress}% Complete</span>
            <span>{course.duration || '8 weeks'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeedItem({ icon: Icon, text, time }) {
  return (
    <div className="ud-feed-item">
      <div className="ud-feed-icon"><Icon size={16} /></div>
      <div>
        <div className="ud-feed-text">{text}</div>
        <div className="ud-feed-time">{time}</div>
      </div>
    </div>
  );
}

function EmptyCourses({ onBrowse }) {
  return (
    <div style={{ background: '#fff', border: '1px dashed #e2e8f0', borderRadius: 16, padding: '80px 24px', textAlign: 'center' }}>
      <div style={{ color: '#94a3b8', marginBottom: 20 }}><BookOpen size={48} strokeWidth={1} style={{ margin: '0 auto' }} /></div>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>No Active Enrollments</h3>
      <p style={{ color: '#64748b', fontSize: 14, maxWidth: 300, margin: '0 auto 24px' }}>Initialize your trajectory by selecting a specialization from our industrial catalog.</p>
      <button onClick={onBrowse} style={{ background: '#0f172a', color: '#fff', padding: '12px 28px', borderRadius: 10, border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: 13 }}>
        Browse Catalog
      </button>
    </div>
  );
}
