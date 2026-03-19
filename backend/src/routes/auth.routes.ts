// ============================================================
// Auth Routes
// ============================================================

import { Router } from 'express'
import { login, logout, me } from '../controllers/auth.controller'
import { verifyJWT } from '../middleware/auth.middleware'

const router = Router()

// POST /api/auth/login — público
router.post('/login', login)

// POST /api/auth/logout — público
router.post('/logout', logout)

// GET /api/auth/me — protegido
router.get('/me', verifyJWT, me)

export default router
