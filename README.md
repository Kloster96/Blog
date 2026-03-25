# Tech Blog — Fullstack CMS

A professional tech blog with admin panel, built with **Next.js 14 App Router** and **Express + MongoDB**. Following Clean Architecture principles.

## 🔗 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [https://blog-pciwe9gpx-kloster96s-projects.vercel.app](https://blog-pciwe9gpx-kloster96s-projects.vercel.app) |
| **Backend API** | [https://blog-ggjx.onrender.com](https://blog-ggjx.onrender.com) |
| **Health Check** | [https://blog-ggjx.onrender.com/health](https://blog-ggjx.onrender.com/health) |

## 📸 Screenshots

- **Home**: Dark premium design with glassmorphism navbar
- **Admin Login**: Centered card with dark inputs
- **Dashboard**: CRUD table with status badges
- **Editor**: Markdown editor with Write/Preview toggle
- **Image Upload**: Drag-and-drop to Cloudinary

## 🏗️ Architecture

```
blog/
├── backend/              # REST API — Express + MongoDB
│   └── src/
│       ├── config/       # Env vars, DB connection
│       ├── types/        # DTOs and TypeScript interfaces
│       ├── models/       # Mongoose schemas
│       ├── services/     # Business logic
│       ├── controllers/  # HTTP handlers
│       ├── middleware/   # Auth, error handling
│       └── routes/       # Route definitions
├── frontend/             # Next.js 14 App Router
│   └── src/
│       ├── models/       # TypeScript interfaces
│       ├── adapters/     # API data mappers
│       ├── services/     # HTTP calls
│       ├── store/        # Zustand (auth + toasts)
│       ├── interceptors/ # JWT interceptor
│       ├── components/
│       │   ├── ui/       # Isolated components
│       │   ├── blog/     # Blog components
│       │   ├── admin/    # Admin components
│       │   └── layout/   # Layout wrappers
│       └── app/          # Pages (App Router)
└── README.md
```

## 🚀 Local Setup

### Prerequisites

- Node.js 20+
- MongoDB (local or Atlas)
- Cloudinary account (free)

### Backend

```bash
cd backend

# Install dependencies
npm install

# Copy and configure environment variables
cp .env.example .env
# Edit .env with your credentials

# Create uploads folder
mkdir uploads

# Populate database (first time only)
npm run seed

# Start development server
npm run dev
# API available at http://localhost:4000
```

### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Start development server
npm run dev
# Available at http://localhost:3000
```

## 🔐 Environment Variables

### Backend (.env)

| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 4000) |
| `NODE_ENV` | Environment (development/production) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT (min 32 chars) |
| `JWT_EXPIRES_IN` | JWT expiration (e.g., 365d) |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |
| `FRONTEND_URL` | Frontend URL (for CORS) |

### Frontend (.env.local)

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API URL |

## 👤 Default Credentials

After running `npm run seed`:

- **Username**: `admin`
- **Password**: `admin123`

## 🔐 Security

- JWT stored in **httpOnly Cookie** (not localStorage)
- `SameSite=Strict` — prevents CSRF
- Passwords hashed with **bcrypt** (12 rounds)
- Helmet + CORS configured

## 📡 API Endpoints

### Auth

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/auth/login | No | Login (sets cookie) |
| POST | /api/auth/logout | No | Logout (clears cookie) |
| GET | /api/auth/me | JWT | Current user data |

### Posts (Public)

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/posts | No | List published (paginated) |
| GET | /api/posts/:slug | No | Post detail |

### Posts (Admin)

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | /api/admin/posts | JWT | All posts (including drafts) |
| POST | /api/posts | JWT | Create post |
| PUT | /api/posts/:id | JWT | Update post |
| DELETE | /api/posts/:id | JWT | Delete post |

### Upload

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | /api/upload | JWT | Upload image (multipart) |

## 📝 Features

- [x] Full CRUD for posts (draft + published)
- [x] Automatic slug generation (kebab-case with collision handling)
- [x] Image upload to Cloudinary
- [x] Markdown editor with Write/Preview toggle
- [x] SSG + ISR for public pages (Next.js)
- [x] JWT-protected admin panel
- [x] Global state with Zustand
- [x] Toast notification system
- [x] TypeScript strict mode
- [x] Clean Architecture (Backend)
- [x] Premium dark mode UI (Vercel/Linear inspired)
- [x] Glassmorphism navbar
- [x] Responsive design

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS, Lucide Icons |
| State | Zustand |
| Backend | Express.js, Node.js |
| Database | MongoDB Atlas, Mongoose |
| Auth | JWT (httpOnly cookies) |
| Images | Cloudinary, Multer |
| Deploy | Vercel (frontend), Render (backend) |

## 📄 License

ISC
