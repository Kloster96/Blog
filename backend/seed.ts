// ============================================================
// Seed Script — Poblar base de datos con datos iniciales
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
    {
      title: 'Bienvenido al Blog',
      slug: 'bienvenido-al-blog',
      content: `# Bienvenido al Blog

Este es tu nuevo blog tecnológico. Acá vas a encontrar artículos sobre:

- **TypeScript** — Tipado estático para JavaScript
- **Node.js** — JavaScript en el servidor
- **Clean Architecture** — Patrones de diseño escalables

\`\`\`typescript
// Tu primer paso en TypeScript
const greeting: string = "¡Hola, TypeScript!"
console.log(greeting)
\`\`\`

¡Gracias por leer!`,
      excerpt: 'Este es tu nuevo blog tecnológico. Acá vas a encontrar artículos sobre TypeScript, Node.js y Clean Architecture.',
      coverImage: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200',
      status: 'published',
      tags: ['general', 'bienvenida'],
      author: admin._id,
      publishedAt: new Date('2024-01-15'),
    },
    {
      title: 'Introducción a TypeScript',
      slug: 'introduccion-a-typescript',
      content: `# Introducción a TypeScript

TypeScript es un superset tipado de JavaScript que compila a JavaScript plano. Desarrollado por Microsoft, agrega:

## Características principales

1. **Tipos estáticos** — Detectá errores en tiempo de desarrollo
2. **Interfaces** — Definí contratos claros para tus datos
3. **Generics** — Código reutilizable y type-safe

## Ejemplo básico

\`\`\`typescript
interface User {
  id: number
  username: string
  email: string
}

function getUser(id: number): Promise<User> {
  return fetch(\`/api/users/\${id}\`)
    .then(res => res.json())
}
\`\`\`

## ¿Por qué TypeScript?

- **Productividad** — Autocompletado y refactoring seguros
- **Menos bugs** — Errores capturados antes de ejecución
- **Mejor documentación** — El código se documenta a sí mismo

En el próximo artículo vamos a ver tipos avanzados y generics.`,
      excerpt: 'TypeScript es un superset tipado de JavaScript. Aprendé por qué vale la pena adoptarlo en tus proyectos.',
      coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200',
      status: 'published',
      tags: ['typescript', 'frontend'],
      author: admin._id,
      publishedAt: new Date('2024-01-20'),
    },
    {
      title: 'Borrador: Próximo artículo',
      slug: 'borrador-proximo-articulo',
      content: `# Borrador: Próximo artículo

Este es un post en estado de **borrador** que no debería aparecer públicamente.

## Temas a cubrir

- Clean Architecture en Node.js
- Patrones de diseño
- Middlewares en Express

\`\`\`typescript
// Ejemplo de middleware
const logger = (req, res, next) => {
  console.log(\`[\${new Date()}] \${req.method} \${req.path}\`)
  next()
}
\`\`\`

[TODO: Completar contenido antes de publicar]`,
      excerpt: '',
      coverImage: null,
      status: 'draft',
      tags: ['backend', 'nodejs'],
      author: admin._id,
    },
  ]

  for (const postData of posts) {
    const post = await Post.create(postData)
    console.log(`✅ Post creado: "${post.title}" [${post.status}]`)
  }

  console.log('\n🎉 Seed completado!')
  console.log('\n📋 Resumen:')
  console.log('   - 1 usuario admin (admin / admin123)')
  console.log('   - 2 posts publicados')
  console.log('   - 1 post en borrador\n')

  await mongoose.disconnect()
  console.log('🔌 Desconectado de MongoDB')
}

seed().catch((error) => {
  console.error('❌ Error en seed:', error)
  process.exit(1)
})
