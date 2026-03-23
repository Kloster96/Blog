'use client'

// ============================================================
// Post Table Component
// ============================================================

import { useState } from 'react'
import { Edit, Trash2, Globe, FileText } from 'lucide-react'
import type { Post } from '@/models'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { formatDate } from '@/lib/utils'

interface PostTableProps {
  posts: Post[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleStatus: (post: Post) => void
}

export function PostTable({
  posts,
  onEdit,
  onDelete,
  onToggleStatus,
}: PostTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null)

  if (posts.length === 0) {
    return (
      <div className="rounded-2xl border border-white/[0.06] bg-zinc-900/50 py-16 text-center">
        <p className="text-zinc-400">No posts yet.</p>
        <p className="mt-1 text-sm text-zinc-600">
          Create your first post from the editor.
        </p>
      </div>
    )
  }

  const postToDelete = posts.find((p) => p.id === deleteId)

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-white/[0.06] bg-zinc-900/50">
        <table className="min-w-full divide-y divide-white/[0.06]">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-zinc-500">
                Date
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-zinc-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-white/[0.02] transition-colors"
              >
                {/* Title */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-medium text-zinc-100">{post.title}</div>
                  <div className="text-xs text-zinc-600">{post.slug}</div>
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge variant={post.status}>
                    {post.status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </td>

                {/* Tags */}
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {post.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="default">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="text-xs text-zinc-600">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Date */}
                <td className="whitespace-nowrap px-6 py-4 text-sm text-zinc-500">
                  {formatDate(post.createdAt)}
                </td>

                {/* Actions */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {/* Toggle status */}
                    <button
                      onClick={() => onToggleStatus(post)}
                      className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-zinc-300"
                      title={post.status === 'published' ? 'Set to draft' : 'Publish'}
                    >
                      {post.status === 'published' ? (
                        <FileText className="h-4 w-4" />
                      ) : (
                        <Globe className="h-4 w-4" />
                      )}
                    </button>

                    {/* Edit */}
                    <button
                      onClick={() => onEdit(post.id)}
                      className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-white"
                      title="Edit"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="rounded-lg p-2 text-zinc-500 transition-colors hover:bg-white/[0.04] hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        isOpen={deleteId !== null}
        onClose={() => setDeleteId(null)}
        title="Delete Post"
      >
        <p className="mb-6 text-sm text-zinc-400">
          Are you sure you want to delete &quot;{postToDelete?.title}&quot;? This
          action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (deleteId) onDelete(deleteId)
              setDeleteId(null)
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  )
}
