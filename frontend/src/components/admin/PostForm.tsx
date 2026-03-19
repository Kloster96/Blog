'use client'

// ============================================================
// Post Form Component — Crear / Editar posts
// ============================================================

import { useState } from 'react'
import { createPost, updatePost } from '@/services/post.service'
import { parseTags } from '@/adapters/tags.adapter'
import { useToastStore } from '@/store/useToastStore'
import type { Post, PostFormData } from '@/models'
import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Button } from '@/components/ui/Button'
import { MarkdownEditor } from './MarkdownEditor'
import { ImageUploader } from './ImageUploader'
import { TagInput } from './TagInput'

interface PostFormProps {
  post?: Post
  onSuccess: () => void
}

const statusOptions = [
  { value: 'draft', label: 'Borrador' },
  { value: 'published', label: 'Publicado' },
]

export function PostForm({ post, onSuccess }: PostFormProps) {
  const [formData, setFormData] = useState<PostFormData>({
    title: post?.title ?? '',
    content: post?.content ?? '',
    coverImage: post?.coverImage ?? '',
    tags: post?.tags ?? [],
    status: post?.status ?? 'draft',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToastStore()

  const updateField = <K extends keyof PostFormData>(
    field: K,
    value: PostFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.addToast('El título es requerido', 'error')
      return
    }
    if (!formData.content.trim()) {
      toast.addToast('El contenido es requerido', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      if (post) {
        await updatePost(post.id, formData)
        toast.addToast('Post actualizado', 'success')
      } else {
        await createPost(formData)
        toast.addToast('Post creado', 'success')
      }
      onSuccess()
    } catch {
      toast.addToast('Error al guardar post', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {/* Título */}
      <Input
        label="Título"
        value={formData.title}
        onChange={(e) => updateField('title', e.target.value)}
        placeholder="El título de tu post"
        required
      />

      {/* Contenido (Markdown Editor) */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Contenido
        </label>
        <MarkdownEditor
          value={formData.content}
          onChange={(value) => updateField('content', value)}
          placeholder="# Título\n\nTu contenido en Markdown..."
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Imagen de Cover
        </label>
        <ImageUploader
          value={formData.coverImage}
          onChange={(url) => updateField('coverImage', url)}
        />
      </div>

      {/* Tags */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Tags
        </label>
        <TagInput
          value={formData.tags}
          onChange={(tags) => updateField('tags', tags)}
          placeholder="Agregar tags..."
        />
      </div>

      {/* Status */}
      <Select
        label="Estado"
        options={statusOptions}
        value={formData.status}
        onChange={(e) => updateField('status', e.target.value as 'draft' | 'published')}
      />

      {/* Submit */}
      <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 dark:border-gray-800">
        <Button
          type="button"
          variant="secondary"
          onClick={onSuccess}
          disabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? 'Guardando...' : post ? 'Actualizar' : 'Crear Post'}
        </Button>
      </div>
    </form>
  )
}
