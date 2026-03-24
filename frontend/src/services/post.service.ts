// ============================================================
// Post Service — Llamadas a la API de posts
// ============================================================

import { fetchJSON, API_URL } from './api.service'
import {
  adaptPost,
  adaptPostList,
  adaptPostListResponse,
} from '@/adapters/post.adapter'
import type {
  Post,
  PostFormData,
  PostListResponse,
  ApiPostResponse,
} from '@/models'

// ============================================================
// RUTAS PÚBLICAS
// ============================================================

interface GetPostsParams {
  page?: number
  limit?: number
  tag?: string
}

/**
 * GET /api/posts — lista posts publicados (paginados)
 */
export async function getPosts(
  params: GetPostsParams = {}
): Promise<PostListResponse> {
  const searchParams = new URLSearchParams()
  if (params.page) searchParams.set('page', String(params.page))
  if (params.limit) searchParams.set('limit', String(params.limit))
  if (params.tag) searchParams.set('tag', params.tag)

  const query = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const raw = await fetchJSON<ApiPostResponse[] & { total: number; page: number; totalPages: number }>(
    `${API_URL}/api/posts${query}`
  )

  return adaptPostListResponse(raw)
}

/**
 * GET /api/posts/:slug — detalle de un post
 */
export async function getPostBySlug(slug: string): Promise<Post> {
  const raw = await fetchJSON<ApiPostResponse>(
    `${API_URL}/api/posts/${slug}`
  )
  return adaptPost(raw)
}

// ============================================================
// RUTAS ADMIN (PROTEGIDAS — usan cookie del browser)
// ============================================================

/**
 * GET /api/admin/posts — lista TODOS los posts (incluye drafts)
 */
export async function getAdminPosts(): Promise<Post[]> {
  const raw = await fetchJSON<{ posts: ApiPostResponse[] }>(
    `${API_URL}/api/admin/posts`
  )
  return adaptPostList(raw.posts)
}

/**
 * POST /api/posts — crear post
 */
export async function createPost(data: PostFormData): Promise<Post> {
  const raw = await fetchJSON<ApiPostResponse>(`${API_URL}/api/posts`, {
    method: 'POST',
    body: data as unknown as Record<string, unknown>,
  })
  return adaptPost(raw)
}

/**
 * PUT /api/posts/:id — actualizar post
 */
export async function updatePost(
  id: string,
  data: Partial<PostFormData>
): Promise<Post> {
  const raw = await fetchJSON<ApiPostResponse>(
    `${API_URL}/api/posts/${id}`,
    {
      method: 'PUT',
      body: data as unknown as Record<string, unknown>,
    }
  )
  return adaptPost(raw)
}

/**
 * DELETE /api/posts/:id — eliminar post
 */
export async function deletePost(id: string): Promise<void> {
  await fetchJSON<{ message: string }>(`${API_URL}/api/posts/${id}`, {
    method: 'DELETE',
  })
}
