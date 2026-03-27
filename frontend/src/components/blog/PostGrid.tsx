// ============================================================
// PostGrid — Premium grid with tag filtering
// ============================================================

import Link from 'next/link'
import { getPosts } from '@/services/post.service'
import { PostCard } from './PostCard'

interface PostGridProps {
  tag?: string
}

export async function PostGrid({ tag }: PostGridProps) {
  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = []

  try {
    const result = await getPosts({ limit: 10, tag })
    posts = result.posts
  } catch {
    posts = []
  }

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.02]">
          <span className="text-xl">📝</span>
        </div>
        {tag ? (
          <>
            <p className="text-zinc-400">No posts found with tag &quot;{tag}&quot;.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm text-zinc-500 underline decoration-zinc-700 hover:text-zinc-300"
            >
              View all posts
            </Link>
          </>
        ) : (
          <>
            <p className="text-zinc-400">No posts published yet.</p>
            <p className="mt-1 text-sm text-zinc-600">Check back soon for new articles.</p>
          </>
        )}
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
