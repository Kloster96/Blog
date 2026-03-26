// ============================================================
// Upload Middleware (Multer)
// ============================================================

import multer from 'multer'
import { Request } from 'express'

// Allowed types
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Memory storage: no temp folder needed
const storage = multer.memoryStorage()

// File filter: images only
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(
      new Error(
        `File type not allowed: ${file.mimetype}. Only: jpg, png, webp, gif`
      )
    )
  }
}

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
})
