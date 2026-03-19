// ============================================================
// Post Model Types
// ============================================================

import { Document, Types } from 'mongoose'

export type PostStatus = 'draft' | 'published'

export interface IPost {
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string | null
  status: PostStatus
  tags: string[]
  author: Types.ObjectId
  publishedAt?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface IPostDocument extends IPost, Document {
  _id: Types.ObjectId
}
