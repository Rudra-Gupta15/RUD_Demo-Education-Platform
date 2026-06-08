# ConvoSec_AI: Next-Generation Cybersecurity & AI Startup

ConvoSec_AI is a cutting-edge startup bridging the gap between Artificial Intelligence and Enterprise Cybersecurity. This repository contains the full-stack, production-ready infrastructure powering our dynamic corporate platform, service offerings, AI agent integrations, and industry insights.

Featuring a highly polished dark-theme frontend powered by Vite/React with Tailwind CSS and Framer Motion, and a robust Node.js/PostgreSQL backend with JWT authentication and full REST APIs.

---

## ✨ Platform Capabilities

| Capability | Details |
|---|---|
| **Dynamic Startup Landing** | High-conversion hero section with animated cosmic background, CountUp metrics, client testimonials, and service cards. |
| **Enterprise Services** | AI & Cybersecurity consulting and integration offerings, service tier filters, and detailed capability breakdowns. |
| **Client Portal** | Secure environment for client onboarding, live session tracking, progress monitoring, and personalized dashboards. |
| **Industry Insights (Blog)** | Category filters and professionally formatted articles featuring thought leadership and security advisories. |
| **Product Showcase** | Real-world AI builds and proprietary internal tools, like our Autonomous Vulnerability Triage system. |
| **Corporate Identity** | Immersive "About Us" section detailing company mission, team structure, and core values. |
| **Sales & Contact** | Lead generation panel saving inquiries directly to PostgreSQL via REST API. |
| **Secure Authentication** | Full JWT signup/login flow, persistent sessions, and RBAC (Role-Based Access Control) for clients and admins. |

---

## 🧱 Technology Stack

**Frontend**
- React 18 + Vite 6
- Tailwind CSS 3
- Framer Motion 11
- React Router 6
- Lucide React (icons)

**Backend**
- Node.js + Express 4
- PostgreSQL (via `pg`)
- JWT Auth (`jsonwebtoken` + `bcryptjs`)
- Zod (validation) + Helmet + Morgan + Rate limiting

**Infrastructure & Deployment**
- Frontend → Vercel
- Backend → Render
- Database → Hosted PostgreSQL

---

## 🚀 Development Quick Start

### 1. Install Dependencies

```bash
cd "c:\Study\Projects\ConvoSec_AI"
npm install
```

### 2. Configure Environment

```bash
# Backend Environment (backend/.env)
PORT=5000
DATABASE_URL=postgresql://<YOUR_POSTGRES_USER>:<YOUR_POSTGRES_PASSWORD>@localhost:5432/ConvoSec
JWT_SECRET=super-secret-key-replace-in-production
CLIENT_ORIGIN=http://localhost:3000
NODE_ENV=development

# Frontend Environment (frontend/.env)
VITE_API_URL=http://localhost:5000
```

### 3. Setup PostgreSQL Database
1. Ensure PostgreSQL is installed locally.
2. Create a new database named `ConvoSec`.
3. The backend script will automatically connect, initialize the schema, and seed required starting data upon startup.

### 4. Run Development Servers

```bash
npm run dev
```

- **Frontend Application**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health

---

## 🌐 Core API Architecture

### Authentication
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | — | Register new client/user, returns JWT |
| POST | `/api/auth/login` | — | Authenticate user, returns JWT |
| GET | `/api/auth/me` | ✓ | Validate session and fetch profile |

### Content Management (Services/Courses)
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/courses` | — | Retrieve all service offerings |
| POST | `/api/courses` | ✓ | Create new service/course offering |

### Insights & Products
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/blogs` | — | Fetch all insights/articles |
| GET | `/api/projects` | — | Fetch product showcases |

### Lead Generation
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/contact` | — | Submit contact/sales inquiry |

---

## 🔐 Security & Auth Flow

1. Client submits registration/login payload → `POST /api/auth/signup` or `/login`
2. Backend securely hashes password using `bcrypt` (12 rounds) and generates a stateless JWT.
3. Token is persisted client-side and attached as a Bearer token to subsequent API requests.
4. `AuthContext` seamlessly manages global session state and route protection.

---

*Engineered by Rudra Gupta. Property of ConvoSec_AI.*
