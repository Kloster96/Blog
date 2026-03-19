// ============================================================
// Post DTOs
// ============================================================

export type PostStatus = 'draft' | 'published'

export interface CreatePostRequest {
  title: string
  content: string
  coverImage?: string
  tags?: string[]
  status?: PostStatus
}

export interface UpdatePostRequest {
  title?: string
  content?: string
  coverImage?: string | null
  tags?: string[]
  status?: PostStatus
}

export interface PostAuthorResponse {
  username: string
}

export interface PostResponse {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage: string | null
  status: PostStatus
  tags: string[]
  author: PostAuthorResponse
  publishedAt: string | null
  createdAt: string
  updatedAt: string
}

export interface PostListResponse {
  posts: PostResponse[]
  total: number
  page: number
  totalPages: number
}

export interface PostListQuery {
  page?: number
  limit?: number
  tag?: string
}

export interface DeletePostResponse {
  message: string
}

export interface ErrorResponse {
  error: string
  message?: string
}
