'use client'

// ============================================================
// Admin Dashboard — Post list (CRUD)
// ============================================================

import { useEffect, useState } from 'react'
import { getAdminPosts, deletePost, updatePost } from '@/services/post.service'
import { PostTable } from '@/components/admin/PostTable'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import type { Post } from '@/models'
import { useToastStore } from '@/store/useToastStore'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const toast = useToastStore()
  const router = useRouter()

  async function fetchPosts() {
    try {
      const data = await getAdminPosts()
      setPosts(data)
    } catch {
      toast.addToast('Error loading posts', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  async function handleDelete(id: string) {
    try {
      await deletePost(id)
      setPosts((prev) => prev.filter((p) => p.id !== id))
      toast.addToast('Post deleted', 'success')
    } catch {
      toast.addToast('Error deleting post', 'error')
    }
  }

  async function handleToggleStatus(post: Post) {
    const newStatus = post.status === 'published' ? 'draft' : 'published'
    try {
      const updated = await updatePost(post.id, { status: newStatus })
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, status: updated.status } : p))
      )
      toast.addToast(
        newStatus === 'published' ? 'Post published' : 'Post set to draft',
        'success'
      )
    } catch {
      toast.addToast('Error updating post', 'error')
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm text-zinc-500">
            {posts.length} post{posts.length !== 1 ? 's' : ''} total
          </p>
        </div>
      </div>

      {/* Table */}
      <PostTable
        posts={posts}
        onEdit={(id) => router.push(`/admin/editor/${id}`)}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
      />
    </div>
  )
}
