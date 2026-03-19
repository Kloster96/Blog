// ============================================================
// Post Model (Mongoose Schema)
// ============================================================
// Implementación completa en Milestone 2

import mongoose from 'mongoose'
import { IPostDocument } from '../types'

const postSchema = new mongoose.Schema<IPostDocument>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    content: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      default: '',
    },
    coverImage: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    tags: {
      type: [String],
      default: [],
      set: (tags: string[]) =>
        tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean),
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    publishedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

// Índices para queries eficientes
postSchema.index({ status: 1, createdAt: -1 })
postSchema.index({ slug: 1 }, { unique: true })
postSchema.index({ tags: 1 })
postSchema.index({ status: 1 })

// Pre-save: actualizar excerpt si cambia content
postSchema.pre('save', function (next) {
  if (this.isModified('content') && !this.excerpt) {
    this.excerpt = this.content.slice(0, 200).trim() + '...'
  }
  next()
})

// toJSON: formato consistente
postSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
    return ret
  },
})

export const Post = mongoose.model<IPostDocument>('Post', postSchema)
