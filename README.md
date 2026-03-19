# ============================================================
# Blog Fullstack — Clean Architecture
# ============================================================

Blog técnico con panel de administración CMS. Backend en **Express + MongoDB** y Frontend en **Next.js 14 App Router**.

## 🏗️ Arquitectura

```
blog/
├── backend/          # API REST — Express + MongoDB
│   └── src/
│       ├── config/   # Env vars, DB connection
│       ├── types/    # DTOs e interfaces TypeScript
│       ├── models/   # Mongoose schemas
│       ├── services/ # Lógica de negocio
│       ├── controllers/
│       ├── middleware/
│       └── routes/
├── frontend/         # Next.js 14 App Router
│   └── src/
│       ├── models/   # Tipos TypeScript
│       ├── adapters/ # Transformación de datos API
│       ├── services/ # Llamadas HTTP
│       ├── store/    # Zustand (auth + toasts)
│       ├── components/
│       │   ├── ui/   # Componentes aislados
│       │   ├── blog/ # Componentes del blog público
│       │   ├── admin/# Componentes del admin
│       │   └── layout/
│       └── app/      # Pages (App Router)
└── blog.md           # Especificación original
```

## 🚀 Setup

### Prerrequisitos

- Node.js 20+
- MongoDB (local o Atlas)
- Cuenta de Cloudinary (gratuita)

### Backend

```bash
cd backend

# Instalar dependencias
npm install

# Copiar y configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# Crear carpeta para uploads temporales
mkdir uploads

# Poblar base de datos (primer uso)
npm run seed

# Correr en desarrollo
npm run dev
# API disponible en http://localhost:4000
```

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Copiar variables de entorno
cp .env.example .env.local

# Correr en desarrollo
npm run dev
# Disponible en http://localhost:3000
```

### Variables de entorno requeridas

**Backend (.env):**

| Variable | Descripción |
|----------|-------------|
| `PORT` | Puerto del servidor (default: 4000) |
| `MONGO_URI` | Connection string de MongoDB |
| `JWT_SECRET` | Clave secreta para JWT (mínimo 32 caracteres) |
| `CLOUDINARY_CLOUD_NAME` | Cloud name de Cloudinary |
| `CLOUDINARY_API_KEY` | API Key de Cloudinary |
| `CLOUDINARY_API_SECRET` | API Secret de Cloudinary |
| `FRONTEND_URL` | URL del frontend (para CORS) |

**Frontend (.env.local):**

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | URL del backend (default: http://localhost:4000) |

## 👤 Credenciales por defecto

Después de correr `npm run seed`:

- **Username**: `admin`
- **Password**: `admin123`

## 🔐 Seguridad

- JWT almacenado en **httpOnly Cookie** (no en localStorage)
- `SameSite=Strict` — previene CSRF
- Passwords hasheados con **bcrypt** (12 rounds)
- Helmet + CORS configurados

## 📡 API Endpoints

### Auth

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | /api/auth/login | No | Login (setea cookie) |
| POST | /api/auth/logout | No | Logout (limpia cookie) |
| GET | /api/auth/me | JWT | Datos del usuario actual |

### Posts (Público)

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| GET | /api/posts | No | Lista publicados (paginable) |
| GET | /api/posts/:slug | No | Detalle de post |
| GET | /api/admin/posts | JWT | Todos los posts (admin) |
| POST | /api/posts | JWT | Crear post |
| PUT | /api/posts/:id | JWT | Actualizar post |
| DELETE | /api/posts/:id | JWT | Eliminar post |

### Upload

| Método | Ruta | Auth | Descripción |
|--------|------|------|-------------|
| POST | /api/upload | JWT | Subir imagen (multipart) |

## 📝 Features

- [x] CRUD completo de posts (draft + published)
- [x] Slug automático (kebab-case con colisión handling)
- [x] Upload de imágenes a Cloudinary
- [x] Editor Markdown con preview (Write/Preview toggle)
- [x] SSG + ISR para páginas públicas (Next.js)
- [x] Panel admin protegido con JWT
- [x] Estado global con Zustand
- [x] Sistema de toasts
- [x] TypeScript strict mode
- [x] Clean Architecture (Backend)

## 🧪 Testing Manual

1. **Blog público**: Visitá http://localhost:3000
2. **Login admin**: http://localhost:3000/admin/login
   - Usuario: `admin`
   - Contraseña: `admin123`
3. **Dashboard**: Creá, editá, eliminá posts
4. **Editor**: Probá el toggle Write/Preview
5. **Publicar**: Cambiá un draft a published y verificá que aparece en Home

## 📄 Licencia

ISC
