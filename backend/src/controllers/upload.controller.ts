// ============================================================
// Upload Controller
// ============================================================

import { Request, Response, NextFunction } from 'express'
import { v2 as cloudinary } from 'cloudinary'
import { env } from '../config'

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret,
})

/**
 * POST /api/upload
 * Admin: upload image to Cloudinary
 */
export async function uploadImage(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const file = req.file

    if (!file) {
      res.status(400).json({ error: 'Bad Request', message: 'No file received' })
      return
    }

    // Upload buffer to Cloudinary
    const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'blog-covers',
          allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
          transformation: [
            { width: 1200, height: 630, crop: 'fill', gravity: 'auto' },
          ],
        },
        (error, result) => {
          if (error) reject(error)
          else resolve(result as { secure_url: string })
        }
      ).end(file.buffer)
    })

    res.json({ url: result.secure_url })
  } catch (error) {
    next(error)
  }
}
