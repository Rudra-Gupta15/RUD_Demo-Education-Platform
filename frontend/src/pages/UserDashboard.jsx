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
  Search
} from "lucide-react";
import { useAuth } from "../state/AuthContext";
import { api } from "../api/client";

export default function UserDashboard() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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
        const res = await api("/api/courses");
        setCourses(res.courses || []);
      } catch (err) {
        console.error("Failed to fetch courses", err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchCourses();
  }, [user]);

  if (loading || !user) return <div className="qr-loading">Initializing…</div>;

  const initials = user.name?.split(" ").map(n => n[0]).join("") || "U";

  return (
    <div className="ud-container">
      {/* ── Sidebar ── */}
      <aside className="ud-sidebar">
        <div className="ud-logo">
          <ShieldCheck size={20} className="text-blue-500" />
          <span>Academy <span className="ud-dim">OS</span></span>
        </div>
        
        <nav className="ud-nav">
          <div className="ud-nav-label">Main Console</div>
          <button className="ud-nav-item active"><LayoutDashboard size={16} /> Overview</button>
          <button className="ud-nav-item" onClick={() => navigate("/catalog")}><BookOpen size={16} /> My Courses</button>
          <button className="ud-nav-item"><Zap size={16} /> Roadmap</button>
          <button className="ud-nav-item"><Trophy size={16} /> Credentials</button>
          
          <div className="ud-nav-label mt-8">Systems</div>
          <button className="ud-nav-item"><Settings size={16} /> Preferences</button>
          <button className="ud-nav-item ud-logout" onClick={() => { logout(); navigate("/auth"); }}>
            <LogOut size={16} /> Terminal Exit
          </button>
        </nav>

        <div className="ud-sidebar-user">
          <div className="ud-avatar">{initials}</div>
          <div className="ud-user-info">
            <div className="ud-user-name">{user.name}</div>
            <div className="ud-user-role">Student #0492</div>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="ud-main">
        <header className="ud-header">
          <div className="ud-search">
            <Search size={14} className="text-slate-400" />
            <input type="text" placeholder="Search knowledge base..." />
          </div>
          <div className="ud-actions">
            <div className="ud-status">
              <div className="ud-status-dot" />
              <span>Network Stable</span>
            </div>
          </div>
        </header>

        <div className="ud-content">
          <div className="ud-hero">
            <div className="ud-hero-text">
              <span className="ud-badge">Session Active</span>
              <h1>Welcome back, <span className="text-blue-500">{user.name.split(" ")[0]}</span></h1>
              <p>Continue your trajectory in Agentic AI Systems. Your last session was 2 hours ago.</p>
            </div>
            <button className="ud-hero-btn" onClick={() => navigate("/learning")}>
              Resume Last Lab <ChevronRight size={16} />
            </button>
          </div>

          <div className="ud-grid">
            <div className="ud-card ud-stats-card">
              <div className="ud-stats-grid">
                <div className="ud-stat">
                  <div className="ud-stat-val">34%</div>
                  <div className="ud-stat-lbl">Average Progress</div>
                </div>
                <div className="ud-stat">
                  <div className="ud-stat-val">12</div>
                  <div className="ud-stat-lbl">Labs Completed</div>
                </div>
                <div className="ud-stat">
                  <div className="ud-stat-val">4.8k</div>
                  <div className="ud-stat-lbl">Knowledge Points</div>
                </div>
              </div>
            </div>

            <div className="ud-card ud-activity-card">
              <div className="ud-card-header">
                <h3>Live Network Feed</h3>
                <Activity size={14} className="text-blue-500" />
              </div>
              <div className="ud-feed">
                <div className="ud-feed-item">
                  <div className="ud-feed-dot" />
                  <span>Completed module "Prompt Injection Defense"</span>
                  <span className="ud-feed-time">2h ago</span>
                </div>
                <div className="ud-feed-item">
                  <div className="ud-feed-dot" />
                  <span>Enrolled in "Generative AI Production"</span>
                  <span className="ud-feed-time">1d ago</span>
                </div>
              </div>
            </div>
          </div>

          <section className="ud-section">
            <div className="ud-section-header">
              <h2>My Learning Trajectory</h2>
              <Link to="/catalog" className="ud-link">View full catalog</Link>
            </div>

            {isLoading ? <div className="qr-loading">Scanning database…</div> : (
              <div className="ud-course-grid">
                {courses.slice(0, 3).map((course) => (
                  <div key={course.id} className="ud-course-card" onClick={() => navigate(`/courses/${course.slug}`)}>
                    <div className="ud-course-thumb">
                      <img src={course.image} alt="" />
                      <div className="ud-course-overlay">
                        <Play size={24} className="text-white fill-white" />
                      </div>
                    </div>
                    <div className="ud-course-info">
                      <div className="ud-course-title">{course.title}</div>
                      <div className="ud-course-progress">
                        <div className="ud-prog-bar">
                          <div className="ud-prog-fill" style={{ width: "20%" }} />
                        </div>
                        <span>20% Complete</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>

      <style>{`
        .ud-container {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 100vh;
          background: #f8fafc;
          font-family: 'Inter', sans-serif;
          color: #0f172a;
        }

        .ud-sidebar {
          background: #0f172a;
          color: #f8fafc;
          padding: 32px 20px;
          display: flex;
          flex-direction: column;
        }

        .ud-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          font-size: 18px;
          letter-spacing: -0.02em;
          margin-bottom: 48px;
          padding-left: 10px;
        }
        .ud-dim { color: #64748b; font-weight: 400; }

        .ud-nav-label {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #475569;
          margin-bottom: 12px;
          padding-left: 10px;
        }

        .ud-nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          color: #94a3b8;
          transition: all 0.2s;
          margin-bottom: 4px;
          border: none;
          background: none;
          cursor: pointer;
          text-align: left;
        }
        .ud-nav-item:hover { background: rgba(255,255,255,0.05); color: #fff; }
        .ud-nav-item.active { background: #3b82f6; color: #fff; }
        .ud-logout:hover { color: #f87171; background: rgba(239, 68, 68, 0.1); }

        .ud-sidebar-user {
          margin-top: auto;
          background: rgba(255,255,255,0.03);
          border-radius: 16px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .ud-avatar {
          width: 36px;
          height: 36px;
          background: #3b82f6;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
        }
        .ud-user-name { font-size: 13px; font-weight: 700; }
        .ud-user-role { font-size: 11px; color: #64748b; font-weight: 600; }

        .ud-main { display: flex; flex-direction: column; overflow-y: auto; max-height: 100vh; }

        .ud-header {
          height: 72px;
          border-bottom: 1px solid #e2e8f0;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 40px;
          position: sticky; top: 0; z-index: 10;
        }

        .ud-search {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #f1f5f9;
          padding: 8px 16px;
          border-radius: 10px;
          width: 320px;
        }
        .ud-search input {
          background: none; border: none; outline: none; font-size: 13px; font-weight: 500; width: 100%;
        }

        .ud-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .ud-status-dot { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 10px #22c55e; }

        .ud-content { padding: 40px; max-width: 1200px; }

        .ud-hero {
          background: #1e293b;
          background-image: radial-gradient(circle at top right, #3b82f622, transparent);
          border-radius: 24px;
          padding: 48px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 32px;
          position: relative;
          overflow: hidden;
        }
        .ud-hero-text h1 { font-size: 32px; font-weight: 800; margin-bottom: 12px; }
        .ud-hero-text p { color: #94a3b8; font-size: 15px; font-weight: 500; max-width: 400px; }
        .ud-badge {
          display: inline-block;
          background: rgba(59, 130, 246, 0.2);
          color: #60a5fa;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 20px;
        }
        .ud-hero-btn {
          background: #fff; color: #000; border: none; padding: 14px 24px; border-radius: 12px;
          font-weight: 800; font-size: 14px; cursor: pointer; display: flex; align-items: center; gap: 8px;
          transition: transform 0.2s;
        }
        .ud-hero-btn:hover { transform: translateX(4px); }

        .ud-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-bottom: 48px; }

        .ud-card { background: #fff; border-radius: 20px; padding: 24px; border: 1px solid #e2e8f0; }

        .ud-stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); height: 100%; align-items: center; }
        .ud-stat { text-align: center; border-right: 1px solid #f1f5f9; }
        .ud-stat:last-child { border-right: none; }
        .ud-stat-val { font-size: 28px; font-weight: 800; color: #0f172a; margin-bottom: 4px; }
        .ud-stat-lbl { font-size: 12px; color: #64748b; font-weight: 600; }

        .ud-card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
        .ud-card-header h3 { font-size: 14px; font-weight: 800; color: #475569; text-transform: uppercase; letter-spacing: 0.05em; }

        .ud-feed-item { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 600; margin-bottom: 12px; color: #334155; }
        .ud-feed-dot { width: 6px; height: 6px; border-radius: 50%; background: #3b82f6; }
        .ud-feed-time { margin-left: auto; font-size: 11px; color: #94a3b8; }

        .ud-section-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
        .ud-section-header h2 { font-size: 20px; font-weight: 800; color: #0f172a; }
        .ud-link { font-size: 13px; font-weight: 700; color: #3b82f6; text-decoration: none; }

        .ud-course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .ud-course-card { cursor: pointer; transition: transform 0.2s; }
        .ud-course-card:hover { transform: translateY(-4px); }
        .ud-course-thumb { position: relative; border-radius: 16px; overflow: hidden; aspect-ratio: 16/10; background: #e2e8f0; margin-bottom: 16px; }
        .ud-course-thumb img { width: 100%; height: 100%; object-fit: cover; }
        .ud-course-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.3); opacity: 0; display: flex; align-items: center; justify-content: center; transition: opacity 0.2s; }
        .ud-course-card:hover .ud-course-overlay { opacity: 1; }

        .ud-course-title { font-size: 15px; font-weight: 700; color: #0f172a; margin-bottom: 12px; line-clamp: 1; }
        .ud-course-progress { display: flex; align-items: center; gap: 12px; }
        .ud-prog-bar { flex: 1; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
        .ud-prog-fill { height: 100%; background: #3b82f6; border-radius: 3px; }
        .ud-course-progress span { font-size: 11px; font-weight: 700; color: #64748b; white-space: nowrap; }

        @media (max-width: 1024px) {
          .ud-container { grid-template-columns: 1fr; }
          .ud-sidebar { display: none; }
          .ud-grid { grid-template-columns: 1fr; }
          .ud-course-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>
    </div>
  );
}

function Activity({ size, className }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
