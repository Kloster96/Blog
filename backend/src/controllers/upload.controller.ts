// ============================================================
// Upload Controller
// ============================================================
// Implementación completa en Milestone 4

import { Request, Response, NextFunction } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { unlinkSync } from 'fs'
import { env } from '../config'

// Configurar Cloudinary
cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
})

/**
 * POST /api/upload
 * Admin: subir imagen a Cloudinary
 */
export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const file = req.file

    if (!file) {
      res.status(400).json({ error: 'Bad Request', message: 'No se recibió archivo' })
      return
    }

    // Subir a Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder: 'blog-covers',
      allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
      transformation: [
        { width: 1200, height: 630, crop: 'fill', gravity: 'auto' },
      ],
    })

    // Limpiar archivo temporal
    try {
      unlinkSync(file.path)
    } catch {
      console.warn(`⚠️  No se pudo eliminar archivo temporal: ${file.path}`)
    }

    res.json({ url: result.secure_url })
  } catch (error) {
    next(error)
  }
}
