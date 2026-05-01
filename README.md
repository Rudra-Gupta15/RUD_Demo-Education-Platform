# ConvoSec AI Education Platform

A full-stack, production-ready EdTech platform for AI and cybersecurity education. Features a polished dark-theme Vite/React frontend with Tailwind CSS, Framer Motion animations, and an Express/SQLite backend with JWT authentication and full CRUD REST APIs.

---

## ✨ Feature Highlights

| Feature | Details |
|---|---|
| **Landing Page** | Hero with animated cosmic background, CountUp stats, star-rated testimonials, feature cards |
| **Courses** | AI & Cybersecurity categories, difficulty filters, detail pages with numbered syllabus |
| **Online Learning** | Live + recorded sessions, animated progress bars, personalized dashboard |
| **Blog / Articles** | Category filters, paragraph-formatted article pages with author meta |
| **Projects Showcase** | Real-world builds like the AI-driven Financial Suggestions Application |
| **About** | Immersive hero section, team cards, mission stats, value cards |
| **Contact** | Info panel + form that saves to SQLite via REST API |
| **Auth** | JWT signup/login, token persisted to localStorage, navbar logout |
| **404** | Animated space-themed error page with glitch effect |

---

## 🧱 Tech Stack

**Frontend**
- React 18 + Vite 6
- Tailwind CSS 3
- Framer Motion 11
- React Router 6
- Lucide React (icons)

**Backend**
- Node.js + Express 4
- SQLite via `sqlite` + `sqlite3`
- JWT via `jsonwebtoken` + `bcryptjs`
- Zod (validation) + Helmet + Morgan + Rate limiting

**Deployment**
- Frontend → Vercel
- Backend → Render

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd "c:\Study\Projects\RUD-Demo Education Platform"
npm run install:all
```

### 2. Configure Environment

```bash
# Backend
cp backend/.env.example backend/.env
# Edit backend/.env — set JWT_SECRET to a random 32-char string

# Frontend
cp frontend/.env.example frontend/.env
# VITE_API_URL defaults to http://localhost:5000 (no change needed for local dev)
```

### 3. Run Development Servers

```bash
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **Health check**: http://localhost:5000/health

The backend auto-creates `backend/data/convosec.sqlite` and seeds demo courses, blogs, projects, and learning sessions on first run.

---

## 🌐 API Reference

### Auth
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | — | Create account, returns JWT |
| POST | `/api/auth/login` | — | Login, returns JWT |
| GET | `/api/auth/me` | ✓ | Fetch current user profile |

### Courses
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/courses` | — | List all (supports `?category=&difficulty=`) |
| GET | `/api/courses/:slug` | — | Single course with syllabus |
| POST | `/api/courses` | ✓ | Create course |
| PUT | `/api/courses/:id` | ✓ | Update course |
| DELETE | `/api/courses/:id` | ✓ | Delete course |

### Blogs
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/blogs` | — | List all (supports `?category=`) |
| GET | `/api/blogs/:slug` | — | Single article |
| POST | `/api/blogs` | ✓ | Create article |
| PUT | `/api/blogs/:id` | ✓ | Update article |
| DELETE | `/api/blogs/:id` | ✓ | Delete article |

### Other
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/projects` | — | All projects |
| POST | `/api/projects` | ✓ | Create project |
| GET | `/api/learning` | — | Learning sessions |
| POST | `/api/contact` | — | Save contact message |

---

## 📦 Environment Variables

### `backend/.env`
```env
PORT=5000
JWT_SECRET=change-me-to-a-random-32-char-secret
CLIENT_ORIGIN=http://localhost:5173
DATABASE_URL=./data/convosec.sqlite
NODE_ENV=development
```

### `frontend/.env`
```env
VITE_API_URL=http://localhost:5000
```

---

## 🚢 Production Deployment

### Vercel (Frontend)
1. Push `frontend/` to a GitHub repo
2. Import on Vercel → set **Framework: Vite**
3. Add env var: `VITE_API_URL=https://your-backend.onrender.com`

### Render (Backend)
1. Create a **Web Service** pointing to `backend/`
2. Build command: `npm install`
3. Start command: `npm start`
4. Add env vars: `JWT_SECRET`, `CLIENT_ORIGIN`, `NODE_ENV=production`

---

## 🗂️ Folder Structure

```
ConvoSec AI/
├── frontend/
│   ├── src/
│   │   ├── api/          # Fetch client
│   │   ├── components/   # Navbar, Footer, CosmicBackground, Reveal, Skeleton
│   │   ├── hooks/        # useApi data fetching hook
│   │   ├── pages/        # All 11 pages
│   │   ├── state/        # AuthContext (JWT)
│   │   ├── App.jsx       # Router + AnimatePresence
│   │   ├── main.jsx      # Entry point
│   │   └── styles.css    # Global CSS + component layer
│   ├── index.html        # SEO meta tags + inline SVG favicon
│   └── tailwind.config.js
└── backend/
    └── src/
        ├── db/           # SQLite init + seed data
        ├── middleware/   # JWT auth + error handler
        ├── routes/       # auth, courses, blogs, projects, learning, contact
        ├── utils/        # Row parsers (JSON fields)
        ├── config.js     # dotenv config
        └── server.js     # Express app
```

---

## 🔐 Auth Flow

1. User submits signup/login form → `POST /api/auth/signup` or `/login`
2. Backend hashes password with bcrypt (12 rounds), issues a 7-day JWT
3. Token stored in `localStorage` as `convosec_token`
4. `AuthContext` re-validates token via `GET /api/auth/me` on page load
5. Navbar shows user name + logout button when authenticated

---

*Built with ❤️ by Rudra Gupta.*
