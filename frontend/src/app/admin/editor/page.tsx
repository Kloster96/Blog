'use client'

// ============================================================
// Post Editor Page — Crear nuevo post
// ============================================================
// Implementación completa en Milestone 9

import { PostForm } from '@/components/admin/PostForm'
import { useRouter } from 'next/navigation'

export default function NewPostPage() {
  const router = useRouter()

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Nuevo Post</h1>
        <p className="mt-1 text-sm text-gray-500">
          Escribí tu artículo en Markdown
        </p>
      </div>

      <PostForm
        onSuccess={() => router.push('/admin/dashboard')}
      />
    </div>
  )
}
