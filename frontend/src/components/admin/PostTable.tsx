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
      <div className="rounded-lg border border-gray-200 bg-white py-16 text-center dark:border-gray-800 dark:bg-gray-800">
        <p className="text-gray-500 dark:text-gray-400">No hay posts todavía.</p>
        <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
          Creá tu primer post desde el editor.
        </p>
      </div>
    )
  }

  const postToDelete = posts.find((p) => p.id === deleteId)

  return (
    <>
      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-800">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Título
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Estado
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Tags
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Fecha
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-gray-800">
            {posts.map((post) => (
              <tr
                key={post.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/50"
              >
                {/* Title */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="font-medium">{post.title}</div>
                  <div className="text-sm text-gray-500">{post.slug}</div>
                </td>

                {/* Status */}
                <td className="whitespace-nowrap px-6 py-4">
                  <Badge variant={post.status}>
                    {post.status === 'published' ? 'Publicado' : 'Borrador'}
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
                      <span className="text-xs text-gray-400">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </td>

                {/* Date */}
                <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(post.createdAt)}
                </td>

                {/* Actions */}
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {/* Toggle status */}
                    <button
                      onClick={() => onToggleStatus(post)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-700 dark:hover:text-gray-300"
                      title={
                        post.status === 'published'
                          ? 'Convertir a borrador'
                          : 'Publicar'
                      }
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
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-brand-600 dark:hover:bg-gray-700 dark:hover:text-brand-400"
                      title="Editar"
                    >
                      <Edit className="h-4 w-4" />
                    </button>

                    {/* Delete */}
                    <button
                      onClick={() => setDeleteId(post.id)}
                      className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-600 dark:hover:bg-gray-700 dark:hover:text-red-400"
                      title="Eliminar"
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
        title="Eliminar Post"
      >
        <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
          ¿Estás seguro de eliminar el post &quot;{postToDelete?.title}&quot;? Esta
          acción no se puede deshacer.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={() => setDeleteId(null)}>
            Cancelar
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              if (deleteId) onDelete(deleteId)
              setDeleteId(null)
            }}
          >
            Eliminar
          </Button>
        </div>
      </Modal>
    </>
  )
}
