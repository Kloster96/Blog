// ============================================================
// Post Adapter — Transforma datos de API a tipos del frontend
// ============================================================

import type { Post, ApiPostResponse, PostListResponse } from '@/models'

/**
 * Adapta respuesta cruda de la API → Post limpio
 */
export function adaptPost(raw: ApiPostResponse): Post {
  return {
    id: raw.id,
    title: raw.title,
    slug: raw.slug,
    content: raw.content,
    excerpt: raw.excerpt || raw.content.slice(0, 150).trim() + '...',
    coverImage: raw.coverImage ?? null,
    status: raw.status,
    tags: raw.tags ?? [],
    authorUsername: raw.author?.username ?? 'Unknown',
    publishedAt: raw.publishedAt ? new Date(raw.publishedAt) : null,
    createdAt: new Date(raw.createdAt),
  }
}

/**
 * Adapta array de respuestas → array de Posts
 */
export function adaptPostList(rawList: ApiPostResponse[]): Post[] {
  return rawList.map(adaptPost)
}

/**
 * Adapta respuesta de lista paginada
 */
export function adaptPostListResponse(
  raw: ApiPostResponse[] & { total?: number; page?: number; totalPages?: number }
): PostListResponse {
  return {
    posts: adaptPostList(raw as unknown as ApiPostResponse[]),
    total: (raw as any).total ?? 0,
    page: (raw as any).page ?? 1,
    totalPages: (raw as any).totalPages ?? 1,
  }
}
