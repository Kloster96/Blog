// ============================================================
// PostCard Component
// ============================================================

import Link from 'next/link'
import Image from 'next/image'
import { Calendar } from 'lucide-react'
import type { Post } from '@/models'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-lg dark:border-gray-800 dark:bg-gray-800"
    >
      {/* Cover Image */}
      {post.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-1.5">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="mb-2 text-xl font-bold leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="mb-4 flex-1 text-sm text-gray-600 line-clamp-3 dark:text-gray-400">
          {post.excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3.5 w-3.5" />
          <span>{formatDate(post.createdAt)}</span>
          <span>•</span>
          <span>{post.authorUsername}</span>
        </div>
      </div>
    </Link>
  )
}
