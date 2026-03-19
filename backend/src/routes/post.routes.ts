// ============================================================
// Post Routes
// ============================================================

import { Router } from 'express'
import {
  getAll,
  getBySlug,
  getAllAdmin,
  create,
  update,
  remove,
} from '../controllers/post.controller'
import { verifyJWT } from '../middleware/auth.middleware'

const router = Router()

// RUTAS PÚBLICAS
// GET /api/posts — lista posts publicados (paginados)
router.get('/', getAll)

// GET /api/posts/:slug — detalle de post (público)
router.get('/:slug', getBySlug)

// RUTAS ADMIN (PROTEGIDAS)
// POST /api/posts — crear post
router.post('/', verifyJWT, create)

// PUT /api/posts/:id — actualizar post
router.put('/:id', verifyJWT, update)

// DELETE /api/posts/:id — eliminar post
router.delete('/:id', verifyJWT, remove)

export default router
