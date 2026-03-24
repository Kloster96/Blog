// ============================================================
// Post Controller
// ============================================================
// Implementación completa en Milestone 4

import { Request, Response, NextFunction } from 'express'
import { postService } from '../services/post.service'
import {
  CreatePostRequest,
  UpdatePostRequest,
  PostListQuery,
} from '../types'

/**
 * GET /api/posts
 * Público: lista posts publicados con paginación
 */
export async function getAll(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { page, limit, tag } = req.query as unknown as PostListQuery

    const result = await postService.findAll({
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      tag: tag as string | undefined,
    })

    res.json(result)
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/posts/:slug
 * Público: detalle de un post
 */
export async function getBySlug(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { slug } = req.params
    const post = await postService.findBySlug(String(slug))

    if (!post) {
      res.status(404).json({ error: 'Not Found', message: 'Post no encontrado' })
      return
    }

    res.json(post)
  } catch (error) {
    next(error)
  }
}

/**
 * GET /api/admin/posts
 * Admin: lista TODOS los posts (incluye drafts)
 */
export async function getAllAdmin(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const posts = await postService.findAllAdmin()
    res.json({ posts })
  } catch (error) {
    next(error)
  }
}

/**
 * POST /api/posts
 * Admin: crear post
 */
export async function create(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const data = req.body as CreatePostRequest

    if (!data.title) {
      res.status(400).json({ error: 'Bad Request', message: 'Title es requerido' })
      return
    }
    if (!data.content) {
      res.status(400).json({ error: 'Bad Request', message: 'Content es requerido' })
      return
    }

    const post = await postService.create(data, req.user!.userId)
    res.status(201).json(post)
  } catch (error) {
    next(error)
  }
}

/**
 * PUT /api/posts/:id
 * Admin: actualizar post
 */
export async function update(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params
    const data = req.body as UpdatePostRequest

    const post = await postService.update(String(id), data)
    res.json(post)
  } catch (error) {
    if (error instanceof Error && error.message === 'Post no encontrado') {
      res.status(404).json({ error: 'Not Found', message: 'Post no encontrado' })
      return
    }
    next(error)
  }
}

/**
 * DELETE /api/posts/:id
 * Admin: eliminar post
 */
export async function remove(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { id } = req.params
    await postService.delete(String(id))
    res.json({ message: 'Post eliminado' })
  } catch (error) {
    if (error instanceof Error && error.message === 'Post no encontrado') {
      res.status(404).json({ error: 'Not Found', message: 'Post no encontrado' })
      return
    }
    next(error)
  }
}
