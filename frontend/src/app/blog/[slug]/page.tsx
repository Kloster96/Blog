// ============================================================
// Post Detail Page — Premium article view
// ============================================================

import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/services/post.service'
import { PostContent } from '@/components/blog/PostContent'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

export default async function PostPage({ params }: PageProps) {
  try {
    const post = await getPostBySlug(params.slug)

    return (
      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Volver al inicio
        </Link>

        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative mb-10 aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.06]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
          </div>
        )}

        {/* Header */}
        <header className="mb-10">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
            {post.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-zinc-500">
            <span className="font-medium text-zinc-400">{post.authorUsername}</span>
            <span className="text-zinc-700">·</span>
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </header>

        {/* Divider */}
        <div className="mb-10 border-t border-white/[0.06]" />

        {/* Content */}
        <PostContent content={post.content} />
      </main>
    )
  } catch {
    notFound()
  }
}
