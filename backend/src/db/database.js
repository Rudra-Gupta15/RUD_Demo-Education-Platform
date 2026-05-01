import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { config } from "../config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../../", config.databaseUrl);

let db;

export async function getDb() {
  if (db) return db;

  fs.mkdirSync(path.dirname(dbPath), { recursive: true });
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });
  await db.exec("PRAGMA foreign_keys = ON");
  return db;
}

export async function initializeDatabase() {
  const database = await getDb();

  await database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'student',
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS courses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      price INTEGER NOT NULL,
      duration TEXT NOT NULL,
      description TEXT NOT NULL,
      syllabus TEXT NOT NULL,
      instructor_name TEXT NOT NULL,
      instructor_bio TEXT NOT NULL,
      featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      excerpt TEXT NOT NULL,
      content TEXT NOT NULL,
      author TEXT NOT NULL,
      read_time TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      tech_stack TEXT NOT NULL,
      demo_link TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS learning_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      type TEXT NOT NULL,
      track TEXT NOT NULL,
      starts_at TEXT,
      video_url TEXT,
      progress INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await seedIfEmpty(database);
}

async function seedIfEmpty(database) {
  const courseCount = await database.get("SELECT COUNT(*) as count FROM courses");
  if (courseCount.count > 0) return;

  const courses = [
    {
      slug: "agentic-ai-systems",
      title: "Agentic AI Systems",
      category: "AI",
      difficulty: "Advanced",
      price: 249,
      duration: "8 weeks",
      description:
        "Build autonomous AI workflows with tool use, retrieval, memory, evaluation, and deployment patterns.",
      syllabus: [
        "LLM architecture refresher",
        "Agent planning and tool calling",
        "RAG systems and vector search",
        "Evaluation, safety, and observability",
        "Production deployment capstone"
      ],
      instructor_name: "Rudra.V Rajpure",
      instructor_bio: "Applied AI researcher focused on reliable agentic systems for enterprise teams.",
      featured: 1
    },
    {
      slug: "ethical-hacking-lab",
      title: "Ethical Hacking Lab",
      category: "Cybersecurity",
      difficulty: "Intermediate",
      price: 199,
      duration: "6 weeks",
      description:
        "Practice reconnaissance, exploitation, privilege escalation, and reporting in legal lab environments.",
      syllabus: [
        "Linux and networking foundations",
        "Web application testing",
        "Active directory attack paths",
        "Privilege escalation",
        "Professional pentest reporting"
      ],
      instructor_name: "Kabir Sen",
      instructor_bio: "Security engineer and red-team mentor with SOC and consulting experience.",
      featured: 1
    },
    {
      slug: "machine-learning-foundations",
      title: "Machine Learning Foundations",
      category: "AI",
      difficulty: "Beginner",
      price: 129,
      duration: "5 weeks",
      description:
        "Learn supervised learning, model evaluation, feature engineering, and practical Python workflows.",
      syllabus: [
        "Python data tooling",
        "Regression and classification",
        "Feature engineering",
        "Model validation",
        "Portfolio mini-project"
      ],
      instructor_name: "Mira Shah",
      instructor_bio: "ML engineer who helps learners turn mathematical ideas into useful products.",
      featured: 0
    },
    {
      slug: "soc-analyst-blue-team",
      title: "SOC Analyst Blue Team",
      category: "Cybersecurity",
      difficulty: "Beginner",
      price: 149,
      duration: "7 weeks",
      description:
        "Learn alert triage, SIEM searches, detection logic, incident response, and threat intelligence.",
      syllabus: [
        "Security operations foundations",
        "SIEM query workflows",
        "Detection engineering basics",
        "Incident response playbooks",
        "Threat hunting project"
      ],
      instructor_name: "Nolan Mehta",
      instructor_bio: "Blue-team lead specializing in enterprise detection and response programs.",
      featured: 0
    }
  ];

  for (const course of courses) {
    await database.run(
      `INSERT INTO courses
      (slug, title, category, difficulty, price, duration, description, syllabus, instructor_name, instructor_bio, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      course.slug,
      course.title,
      course.category,
      course.difficulty,
      course.price,
      course.duration,
      course.description,
      JSON.stringify(course.syllabus),
      course.instructor_name,
      course.instructor_bio,
      course.featured
    );
  }

  const blogs = [
    {
      slug: "agent-evaluations-that-matter",
      title: "Agent Evaluations That Actually Matter",
      category: "AI",
      excerpt: "A practical framework for testing AI agents before they reach users.",
      content:
        "Production AI agents need task-based evaluations, regression tests, trace review, and clear failure budgets. Start with the workflows that create real user value, then measure tool accuracy, retrieval quality, latency, cost, and safe refusal behavior.",
      author: "Quorion Research",
      read_time: "6 min"
    },
    {
      slug: "soc-triage-playbooks",
      title: "Building SOC Triage Playbooks",
      category: "Cybersecurity",
      excerpt: "Turn noisy alerts into structured, teachable response flows.",
      content:
        "A strong SOC playbook defines signal sources, enrichment steps, decision points, escalation criteria, and post-incident learning. The best playbooks are specific enough to guide a new analyst and flexible enough for unusual cases.",
      author: "Security Lab",
      read_time: "5 min"
    },
    {
      slug: "secure-ai-product-teams",
      title: "How Secure AI Product Teams Work",
      category: "Tech",
      excerpt: "Why AI and cybersecurity skills now belong in the same curriculum.",
      content:
        "AI teams increasingly need threat modeling, data governance, prompt injection defenses, and monitoring. Security teams need automation literacy and model behavior awareness. The overlap is where modern technical education is heading.",
      author: "Editorial Desk",
      read_time: "4 min"
    }
  ];

  for (const blog of blogs) {
    await database.run(
      `INSERT INTO blogs (slug, title, category, excerpt, content, author, read_time)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      blog.slug,
      blog.title,
      blog.category,
      blog.excerpt,
      blog.content,
      blog.author,
      blog.read_time
    );
  }

  const projects = [
    {
      title: "Autonomous Vulnerability Triage",
      description:
        "An AI-assisted security workflow that clusters scanner findings, enriches CVEs, and drafts remediation tickets.",
      tech_stack: ["Node.js", "LLM APIs", "SQLite", "SIEM"],
      demo_link: "https://example.com/vuln-triage"
    },
    {
      title: "Threat Intel Copilot",
      description:
        "A retrieval system for mapping threat reports to ATT&CK tactics and internal detection coverage.",
      tech_stack: ["React", "RAG", "Vector DB", "Python"],
      demo_link: "https://example.com/threat-copilot"
    },
    {
      title: "ML Phishing Classifier",
      description:
        "A supervised learning project that flags suspicious email metadata and explains risk factors.",
      tech_stack: ["Python", "Scikit-learn", "FastAPI", "React"],
      demo_link: "https://example.com/phishing-ml"
    }
  ];

  for (const project of projects) {
    await database.run(
      `INSERT INTO projects (title, description, tech_stack, demo_link) VALUES (?, ?, ?, ?)`,
      project.title,
      project.description,
      JSON.stringify(project.tech_stack),
      project.demo_link
    );
  }

  const sessions = [
    {
      title: "Live Cohort: LLM App Architecture",
      type: "Live",
      track: "AI",
      starts_at: "2026-05-05T14:00:00.000Z",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      progress: 0
    },
    {
      title: "Recorded Lab: Web Security Recon",
      type: "Recorded",
      track: "Cybersecurity",
      starts_at: null,
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      progress: 64
    },
    {
      title: "Dashboard Sprint: Build Your AI Portfolio",
      type: "Live",
      track: "Projects",
      starts_at: "2026-05-12T16:30:00.000Z",
      video_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      progress: 18
    }
  ];

  for (const session of sessions) {
    await database.run(
      `INSERT INTO learning_sessions (title, type, track, starts_at, video_url, progress)
      VALUES (?, ?, ?, ?, ?, ?)`,
      session.title,
      session.type,
      session.track,
      session.starts_at,
      session.video_url,
      session.progress
    );
  }
}
