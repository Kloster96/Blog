// ============================================================
// Home Page — Hero Section + SSG + ISR
// ============================================================

import { Suspense } from 'react'
import { PostGrid } from '@/components/blog/PostGrid'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export const revalidate = 60

export default async function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative mx-auto max-w-5xl px-6 pt-32 pb-20">
        {/* Subtle background glow */}
        <div className="pointer-events-none absolute inset-0 -top-40">
          <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-white/[0.02] blur-3xl" />
        </div>

        {/* Hero content */}
        <div className="relative mx-auto max-w-2xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-zinc-400">
              Últimas publicaciones
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-100 sm:text-6xl">
            Blog{' '}
            <span className="font-light text-zinc-500">Técnico</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg leading-relaxed text-zinc-500">
            Artículos sobre desarrollo web, TypeScript y arquitectura
            de software. Código limpio, patrones reales,{' '}
            <span className="text-zinc-400">sin atajos.</span>
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-16 max-w-5xl border-t border-white/[0.06]" />
      </section>

      {/* Posts Grid */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <PostGrid />
        </Suspense>
      </section>
    </main>
  )
}
