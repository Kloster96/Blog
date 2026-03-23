'use client'

// ============================================================
// Post Editor Page — Edit existing post
// ============================================================

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { PostForm } from '@/components/admin/PostForm'
import { getAdminPosts } from '@/services/post.service'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Post } from '@/models'

interface PageProps {
  params: { id: string }
}

export default function EditPostPage({ params }: PageProps) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchPost() {
      try {
        const posts = await getAdminPosts()
        const found = posts.find((p) => p.id === params.id)
        setPost(found ?? null)
      } catch {
        setPost(null)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [params.id])

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="p-8">
        <p className="text-red-400">Post not found</p>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Editing &quot;{post.title}&quot;
        </p>
      </div>

      <PostForm
        post={post}
        onSuccess={() => router.push('/admin/dashboard')}
      />
    </div>
  )
}
