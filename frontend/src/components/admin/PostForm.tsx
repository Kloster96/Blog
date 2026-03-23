'use client'

// ============================================================
// Post Form Component — Create / Edit posts
// ============================================================

import { useState } from 'react'
import { createPost, updatePost } from '@/services/post.service'
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
  { value: 'draft', label: 'Draft' },
  { value: 'published', label: 'Published' },
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
      toast.addToast('Title is required', 'error')
      return
    }
    if (!formData.content.trim()) {
      toast.addToast('Content is required', 'error')
      return
    }

    setIsSubmitting(true)
    try {
      if (post) {
        await updatePost(post.id, formData)
        toast.addToast('Post updated', 'success')
      } else {
        await createPost(formData)
        toast.addToast('Post created', 'success')
      }
      onSuccess()
    } catch {
      toast.addToast('Error saving post', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {/* Title */}
      <Input
        label="Title"
        value={formData.title}
        onChange={(e) => updateField('title', e.target.value)}
        placeholder="Your post title"
        required
      />

      {/* Content (Markdown Editor) */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-400">
          Content
        </label>
        <MarkdownEditor
          value={formData.content}
          onChange={(value) => updateField('content', value)}
          placeholder="# Your title\n\nWrite your content in Markdown..."
        />
      </div>

      {/* Cover Image */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-400">
          Cover Image
        </label>
        <ImageUploader
          value={formData.coverImage}
          onChange={(url) => updateField('coverImage', url)}
        />
      </div>

      {/* Tags */}
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-400">
          Tags
        </label>
        <TagInput
          value={formData.tags}
          onChange={(tags) => updateField('tags', tags)}
          placeholder="Add tags..."
        />
      </div>

      {/* Status */}
      <Select
        label="Status"
        options={statusOptions}
        value={formData.status}
        onChange={(e) => updateField('status', e.target.value as 'draft' | 'published')}
      />

      {/* Submit */}
      <div className="flex justify-end gap-3 border-t border-white/[0.06] pt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onSuccess}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isSubmitting ? 'Saving...' : post ? 'Update' : 'Create Post'}
        </Button>
      </div>
    </form>
  )
}
