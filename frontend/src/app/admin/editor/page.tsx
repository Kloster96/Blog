'use client'

// ============================================================
// Post Editor Page — Create new post
// ============================================================

import { PostForm } from '@/components/admin/PostForm'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">New Post</h1>
        <p className="mt-1 text-sm text-zinc-500">
          Write your article in Markdown
        </p>
      </div>

      <PostForm
        onSuccess={() => router.push('/admin/dashboard')}
      />
    </div>
  )
}
