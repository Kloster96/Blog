// ============================================================
// PostGrid — Premium grid layout
// ============================================================

import { getPosts } from '@/services/post.service'
import { PostCard } from './PostCard'

export async function PostGrid() {
  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = []

  try {
    const result = await getPosts({ limit: 10 })
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
        <p className="text-zinc-400">No posts published yet.</p>
        <p className="mt-1 text-sm text-zinc-600">
          Check back soon for new articles.
        </p>
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
