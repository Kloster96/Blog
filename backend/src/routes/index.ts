// ============================================================
// Routes Index — Monta todos los routers
// ============================================================

import { Router } from 'express'
import authRoutes from './auth.routes'
import postRoutes from './post.routes'
import adminRoutes from './admin.routes'
import uploadRoutes from './upload.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/posts', postRoutes)
router.use('/admin', adminRoutes)  // /api/admin/posts
router.use('/upload', uploadRoutes)

export default router
