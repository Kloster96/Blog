// ============================================================
// Post Detail Page — SSG + ISR
// ============================================================
// Implementación completa en Milestone 8

import { notFound } from 'next/navigation'
import { getPostBySlug } from '@/services/post.service'
import { PostContent } from '@/components/blog/PostContent'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import Image from 'next/image'

export const revalidate = 60

interface PageProps {
  params: { slug: string }
}

export default async function PostPage({ params }: PageProps) {
  try {
    const post = await getPostBySlug(params.slug)

    return (
      <article className="mx-auto max-w-3xl px-4 py-12">
        {/* Cover Image */}
        {post.coverImage && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Header */}
        <header className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span>Por {post.authorUsername}</span>
            <span>•</span>
            <span>{formatDate(post.createdAt)}</span>
            {post.tags.length > 0 && (
              <>
                <span>•</span>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="default">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>

        {/* Content */}
        <PostContent content={post.content} />
      </article>
    )
  } catch {
    notFound()
  }
}
