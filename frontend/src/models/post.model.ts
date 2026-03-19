// ============================================================
// Post Model Types
// ============================================================

export interface Post {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string | null
  status: PostStatus
  tags: string[]
  authorUsername: string
  publishedAt: Date | null
  createdAt: Date
}

export type PostStatus = 'draft' | 'published'

export interface PostFormData {
  title: string
  content: string
  coverImage: string
  tags: string[]
  status: PostStatus
}

export interface PostListResponse {
  posts: Post[]
  total: number
  page: number
  totalPages: number
}

export interface ApiPostResponse {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string | null
  status: PostStatus
  tags: string[]
  author: { username: string }
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}
