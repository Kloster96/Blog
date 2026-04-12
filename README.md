# 🚀 Fullstack Developer Portfolio

### Hi, I'm a Fullstack Developer specializing in modern web applications. This is my flagship project — a production-ready blog built with technologies companies actually use.

---

## 🎯 Project Overview

A professional tech blog with a complete admin CMS, deployed to production and handling real traffic.

**Stack**: Next.js 14 • Express • MongoDB • TypeScript • JWT • Tailwind

**Live Demo**: [https://blog-nl4oljti2-kloster96s-projects.vercel.app](task-manager-qe5arg993-kloster96s-projects.vercel.app)

**API**: [https://blog-ggjx.onrender.com](https://blog-ggjx.onrender.com)

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS |
| **Backend** | Express.js, Node.js, JWT, bcrypt |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **State** | Zustand (client), Context API |
| **Images** | Cloudinary + Multer |
| **DevOps** | Vercel, Render, Git |

---

## 📊 Key Features Implemented

- ✅ **Full CRUD** — Create, read, update, delete posts with draft/published states
- ✅ **Authentication** — JWT in httpOnly cookies (not localStorage — security best practice)
- ✅ **Image Upload** — Drag-and-drop to Cloudinary with preview
- ✅ **Markdown Editor** — Write/Preview toggle with live rendering
- ✅ **SEO Optimized** — SSG + ISR with proper metadata
- ✅ **TypeScript** — Strict mode throughout the entire codebase
- ✅ **Clean Architecture** — Separated layers (routes → controllers → services → models)
- ✅ **Error Handling** — Global error middleware, consistent API responses

---

## 🏗️ Architecture

```
blog/
├── backend/                    # REST API — Express + MongoDB
│   └── src/
│       ├── config/             # Environment & DB connection
│       ├── types/              # DTOs & interfaces
│       ├── models/             # Mongoose schemas
│       ├── services/           # Business logic
│       ├── controllers/        # HTTP handlers
│       ├── middleware/         # Auth & error handling
│       └── routes/            # Route definitions
│
├── frontend/                   # Next.js 14 App Router
│   └── src/
│       ├── models/             # TypeScript interfaces
│       ├── adapters/          # API data mappers
│       ├── services/          # API calls
│       ├── store/             # Zustand (auth, toasts)
│       ├── interceptors/      # JWT injection
│       ├── components/        # UI, blog, admin, layout
│       └── app/               # Pages (App Router)
│
└── README.md
```

---

## 🔐 Security Highlights

- JWT stored in **httpOnly cookies** — inaccessible to JavaScript (prevents XSS attacks)
- `SameSite=Strict` — prevents CSRF
- Passwords hashed with **bcrypt** (12 rounds)
- Helmet middleware for security headers
- CORS properly configured for production domains

---

## 🚀 Getting Started (Local)

```bash
# Backend
cd backend
npm install
cp .env.example .env
mkdir uploads
npm run seed      # Populates demo data
npm run dev       # http://localhost:4000

# Frontend (new terminal)
cd frontend
npm install
cp .env.example .env.local
npm run dev       # http://localhost:3000
```

### Default Credentials
- **Username**: `admin`
- **Password**: `admin123`

---

## 📈 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/login` | Authenticate (sets cookie) |
| GET | `/api/posts` | List published posts (paginated) |
| GET | `/api/posts/:slug` | Single post detail |
| GET | `/api/admin/posts` | All posts (admin, requires JWT) |
| POST | `/api/posts` | Create post (requires JWT) |
| PUT | `/api/posts/:id` | Update post (requires JWT) |
| DELETE | `/api/posts/:id` | Delete post (requires JWT) |
| POST | `/api/upload` | Upload image to Cloudinary |

---

## 📝 What I Learned

Building this project taught me:

- **Production deployments** — Vercel + Render, environment variables, CORS in production
- **Security** — Why httpOnly cookies > localStorage for JWT, CSRF protection
- **TypeScript** — Strict typing, interfaces, generics, avoiding `any`
- **Clean Architecture** — Separation of concerns, maintainable codebase
- **State management** — When to use Zustand vs React Context
- **SEO** — SSG/ISR patterns, metadata, semantic HTML

---

## 📫 Contact

- **GitHub**: [github.com/Kloster96](https://github.com/Kloster96)
- **Email**: kloster.dev@gmail.com
- **LinkedIn**: [linkedin.com/in/kloster-dev](https://linkedin.com/in/kloster-dev)

---

*Built with Next.js 14 & Express — 2024*
