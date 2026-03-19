// ============================================================
// PostGrid Component
// ============================================================

import { getPosts } from '@/services/post.service'
import { PostCard } from './PostCard'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export async function PostGrid() {
  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = []
  let isEmpty = false

  try {
    const result = await getPosts({ limit: 10 })
    posts = result.posts
    isEmpty = posts.length === 0
  } catch {
    isEmpty = true
  }

  if (isEmpty) {
    return (
      <div className="py-16 text-center">
        <p className="text-lg text-gray-500 dark:text-gray-400">
          No hay posts publicados aún.
        </p>
        <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">
          Vuelve pronto para nuevos artículos.
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
