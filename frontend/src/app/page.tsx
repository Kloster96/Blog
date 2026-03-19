// ============================================================
// Home Page — Server Component con SSG + ISR
// ============================================================
// Implementación completa en Milestone 8

import { Suspense } from 'react'
import { PostGrid } from '@/components/blog/PostGrid'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { getPosts } from '@/services/post.service'

// ISR: re-generar cada 60 segundos
export const revalidate = 60

export default async function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">
          Blog Técnico
        </h1>
        <p className="text-lg text-muted-foreground">
          Artículos sobre desarrollo web, TypeScript y arquitectura
        </p>
      </div>

      <Suspense fallback={<LoadingSpinner />}>
        <PostGrid />
      </Suspense>
    </section>
  )
}
