// ============================================================
// Post Service
// ============================================================
// Implementación completa en Milestone 4

import slugify from 'slugify'
import { Post } from '../models/Post'
import {
  CreatePostRequest,
  UpdatePostRequest,
  PostResponse,
  PostListQuery,
  IPost,
} from '../types'

function generateExcerpt(content: string): string {
  const plainText = content.replace(/[#*`_~\[\]]/g, '').trim()
  if (plainText.length <= 200) return plainText
  return plainText.slice(0, 200).trim() + '...'
}

function postToResponse(post: IPost & { _id: { toString(): string } }): PostResponse {
  return {
    id: post._id.toString(),
    title: post.title,
    slug: post.slug,
    content: post.content,
    excerpt: post.excerpt || generateExcerpt(post.content),
    coverImage: post.coverImage ?? null,
    status: post.status,
    tags: post.tags,
    author: { username: '' }, // Se populates en el controller
    publishedAt: post.publishedAt?.toISOString() ?? null,
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  }
}

export class PostService {
  /**
   * Generar slug único (kebab-case + colisión handling)
   */
  async generateSlug(title: string): Promise<string> {
    let baseSlug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    })

    let slug = baseSlug
    let counter = 1

    while (await Post.exists({ slug })) {
      slug = `${baseSlug}-${counter}`
      counter++
    }

    return slug
  }

  /**
   * Crear post
   */
  async create(
    data: CreatePostRequest,
    authorId: string
  ): Promise<PostResponse> {
    const slug = await this.generateSlug(data.title)

    const post = await Post.create({
      title: data.title,
      slug,
      content: data.content,
      excerpt: generateExcerpt(data.content),
      coverImage: data.coverImage ?? null,
      tags: data.tags ?? [],
      status: data.status ?? 'draft',
      author: authorId,
      publishedAt: data.status === 'published' ? new Date() : null,
    })

    const populated = await post.populate('author', 'username')
    return postToResponse(populated as any)
  }

  /**
   * Actualizar post
   */
  async update(
    id: string,
    data: UpdatePostRequest
  ): Promise<PostResponse> {
    const post = await Post.findById(id)
    if (!post) throw new Error('Post no encontrado')

    // Si cambia a published y no tenía publishedAt
    if (data.status === 'published' && post.status !== 'published') {
      ;(data as any).publishedAt = new Date()
    }
    // Si cambia a draft
    if (data.status === 'draft') {
      ;(data as any).publishedAt = null
    }

    Object.assign(post, data)

    // Regenerar excerpt si cambia content
    if (data.content) {
      post.excerpt = generateExcerpt(data.content)
    }

    await post.save()
    const populated = await post.populate('author', 'username')
    return postToResponse(populated as any)
  }

  /**
   * Eliminar post
   */
  async delete(id: string): Promise<void> {
    const post = await Post.findById(id)
    if (!post) throw new Error('Post no encontrado')
    await post.deleteOne()
  }

  /**
   * Buscar por slug (público: solo published)
   */
  async findBySlug(slug: string): Promise<PostResponse | null> {
    const post = await Post.findOne({ slug }).populate('author', 'username')
    if (!post) return null
    if (post.status !== 'published') return null
    return postToResponse(post as any)
  }

  /**
   * Listar posts públicos con paginación
   */
  async findAll(query: PostListQuery): Promise<{
    posts: PostResponse[]
    total: number
    page: number
    totalPages: number
  }> {
    const page = Math.max(1, query.page ?? 1)
    const limit = Math.min(50, Math.max(1, query.limit ?? 10))
    const skip = (page - 1) * limit

    const filter: any = { status: 'published' }
    if (query.tag) {
      filter.tags = query.tag
    }

    const [posts, total] = await Promise.all([
      Post.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'username'),
      Post.countDocuments(filter),
    ])

    return {
      posts: posts.map((p) => postToResponse(p as any)),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    }
  }

  /**
   * Listar TODOS los posts (admin)
   */
  async findAllAdmin(): Promise<PostResponse[]> {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username')
    return posts.map((p) => postToResponse(p as any))
  }

  /**
   * Buscar por ID
   */
  async findById(post: any): Promise<PostResponse> {
    post = await post.populate('author', 'username')
    return postToResponse(post as any)
  }
}

export const postService = new PostService()
