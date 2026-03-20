// ============================================================
// PostCard — Premium card design (Vercel/Linear inspired)
// ============================================================

import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import type { Post } from '@/models'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.12] hover:bg-zinc-900/80"
    >
      {/* Cover Image — uniform aspect ratio */}
      {post.coverImage ? (
        <div className="relative aspect-video w-full overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
        </div>
      ) : (
        <div className="relative aspect-video w-full bg-zinc-800/50" />
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        {/* Tags as pills */}
        {post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-[11px] font-medium text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="mb-2 text-lg font-semibold leading-snug text-zinc-100 transition-colors duration-200 group-hover:text-white">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500 line-clamp-2">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-zinc-600">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(post.createdAt)}</span>
          <span className="text-zinc-700">·</span>
          <span>{post.authorUsername}</span>
        </div>
      </div>

      {/* Subtle top-right glow on hover */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-white/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
    </Link>
  )
}
