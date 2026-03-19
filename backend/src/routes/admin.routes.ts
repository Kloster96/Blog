// ============================================================
// Admin Post Routes
// ============================================================

import { Router } from 'express'
import { getAllAdmin } from '../controllers/post.controller'
import { verifyJWT } from '../middleware/auth.middleware'

const router = Router()

// GET /api/admin/posts — todos los posts (incluye drafts) — protegido
router.get('/', verifyJWT, getAllAdmin)

export default router
