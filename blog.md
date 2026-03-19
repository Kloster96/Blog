# Prompt: Fullstack Tech Blog & CMS (Clean Architecture)

**Contexto:** Actúa como un Arquitecto de Software Senior y Tech Lead. Necesito crear un Blog Fullstack con un panel de administración personalizado. El proyecto utilizará Next.js (App Router) para el Frontend y Node.js/Express para el Backend, siguiendo rigurosamente los principios de Clean Architecture, inyección de dependencias y tipos estrictos en TypeScript (estilo Gentleman Programming).

---
    
## 🏗️ Requisitos del Backend (Node.js + Express + MongoDB)

Genera el código para una API REST profesional, modular y escalable. Utiliza la siguiente estructura de carpetas: `src/models`, `src/controllers`, `src/routes`, `src/services` y `src/middleware`.

1. **Base de Datos:** Configura la conexión a MongoDB usando Mongoose.
2. **Modelos (Schemas):**
   - **`User` (Admin):** `username` (String), `password` (String - hasheada con bcrypt), `role` (String, default: 'admin').
   - **`Post`:** `title` (String), `slug` (String, único), `content` (String, preparado para HTML/Markdown), `coverImage` (String, URL), `status` (String, enum: ['draft', 'published']), `tags` (Array de Strings), `author` (Referencia a User).
3. **Controladores y Rutas:**
   - `POST /api/auth/login`: Endpoint para autenticar al admin y devolver un JWT.
   - `GET /api/posts`: Endpoint público. Debe devolver solo posts con status 'published' y permitir filtrar por `tags` y paginación (query params).
   - `GET /api/posts/:slug`: Endpoint público para ver el detalle de un artículo.
   - `POST /api/posts`, `PUT /api/posts/:id`, `DELETE /api/posts/:id`: Endpoints protegidos por JWT para el CRUD del panel de administración.
   - *Nota:* Incluye la lógica o el middleware (ej. Multer) necesario para recibir imágenes y prepararlas para subirse a un servicio externo (como Cloudinary).
4. **Clean Code:** - Implementa un middleware `auth.middleware.ts` para verificar el JWT en rutas protegidas.
   - Usa un middleware para el manejo global de errores.
   - Define interfaces estrictas de TypeScript para los DTOs (Data Transfer Objects) de entrada y salida.

---

## 🎨 Requisitos del Frontend (Next.js 14+ App Router)

Crea un frontend moderno, rápido (SEO-friendly) y responsive usando Tailwind CSS. Separaremos la vista pública del panel de administración.

1. **Estructura de Carpetas:** Sigue el patrón de Gentleman Programming:
   - `src/components`: Componentes aislados (Button, Input, Modal, Navbar).
   - `src/models`: Interfaces y tipos de TypeScript.
   - `src/adapters`: Funciones para mapear y limpiar los datos de la API antes de que lleguen a los componentes de la UI.
   - `src/services`: Llamadas a la API usando `fetch` nativo de Next.js (aprovechando la caché).
   - `src/store`: Gestión de estado global con **Zustand** (para manejar la sesión del Admin y el token JWT persistido).
   - `src/interceptors`: (Opcional) Para adjuntar automáticamente el JWT en las peticiones al backend.
2. **Vistas / Componentes Clave:**
   - **Public Home (`/`):** Server Component (`page.tsx`) que hace fetch de los artículos publicados y renderiza un `PostGrid`.
   - **Public Post (`/blog/[slug]`):** Server Component para leer el artículo. Usa `next/image` para la `coverImage`.
   - **Admin Login (`/admin/login`):** Formulario conectado al store de Zustand para iniciar sesión.
   - **Admin Dashboard (`/admin/dashboard`):** Ruta protegida (Client-side o Middleware de Next). Tabla con la lista de artículos (Borradores y Publicados) y botones de CRUD.
   - **Post Editor (`/admin/editor`):** Formulario complejo que incluya carga de imagen de portada y un área de texto grande (simulando la integración de un editor WYSIWYG/Markdown).
3. **UX/UI:** Implementa `loading.tsx` para estados de carga, manejo de errores amigable y tostadas (Toasts) para notificar éxito/error en el panel admin.

---

## 🛠️ Archivo de Configuración y Seed

1. Provee un archivo `.env.example` con las variables necesarias para ambos entornos (ej: `MONGO_URI`, `JWT_SECRET`, `PORT`, `NEXT_PUBLIC_API_URL`, credenciales de Cloudinary).
2. Provee un script `seed.ts` para inicializar la base de datos con:
   - 1 Usuario Administrador por defecto (con contraseña encriptada).
   - 3 Posts de ejemplo (2 'published' y 1 'draft') con contenido simulado sobre tecnología.

---

**Resultado esperado:** Código altamente modular, fácil de testear, que separe claramente la lógica de negocio de la UI, listo para ser implementado en OpenCode paso a paso. Sugiere primero la estructura de directorios y luego avanzaremos archivo por archivo.