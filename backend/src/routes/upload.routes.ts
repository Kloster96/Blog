// ============================================================
// Upload Routes
// ============================================================

import { Router } from 'express'
import { uploadImage } from '../controllers/upload.controller'
import { upload } from '../middleware/upload.middleware'
import { verifyJWT } from '../middleware/auth.middleware'

const router = Router()

// POST /api/upload — subir imagen (protegido, multipart/form-data)
router.post('/', verifyJWT, upload.single('image'), uploadImage)

export default router
