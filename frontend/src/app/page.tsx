// ============================================================
// Home Page — Hero Section + SSG + ISR + Tag Filtering
// ============================================================

import Link from 'next/link'
import { Suspense } from 'react'
import { X } from 'lucide-react'
import { PostGrid } from '@/components/blog/PostGrid'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export const revalidate = 60

interface PageProps {
  searchParams: { tag?: string }
}

export default async function HomePage({ searchParams }: PageProps) {
  const tag = searchParams.tag

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
              {tag ? `Filtered by: ${tag}` : 'Latest posts'}
            </span>
          </div>

          {/* Title */}
          <h1 className="mb-4 text-5xl font-bold tracking-tight text-zinc-100 sm:text-6xl">
            Tech{' '}
            <span className="font-light text-zinc-500">Blog</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg leading-relaxed text-zinc-500">
            Articles about web development, TypeScript, and software
            architecture. Clean code, real patterns,{' '}
            <span className="text-zinc-400">no shortcuts.</span>
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto mt-16 max-w-5xl border-t border-white/[0.06]" />
      </section>

      {/* Tag filter indicator */}
      {tag && (
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2">
            <span className="text-sm text-zinc-300">
              Showing posts tagged: <span className="font-medium text-white">{tag}</span>
            </span>
            <Link
              href="/"
              className="rounded-full p-1 text-zinc-500 transition-colors hover:bg-white/[0.08] hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      )}

      {/* Posts Grid */}
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <Suspense
          fallback={
            <div className="flex justify-center py-20">
              <LoadingSpinner size="lg" />
            </div>
          }
        >
          <PostGrid tag={tag} />
        </Suspense>
      </section>
    </main>
  )
}
