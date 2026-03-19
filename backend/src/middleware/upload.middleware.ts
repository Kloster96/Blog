// ============================================================
// Upload Middleware (Multer)
// ============================================================
// Implementación completa en Milestone 4

import multer from 'multer'
import path from 'path'
import { Request } from 'express'

// Tipos permitidos
const ALLOWED_MIME_TYPES = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

// Storage: guardar en carpeta temporal del sistema
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, process.env.UPLOAD_TMP_DIR ?? './uploads')
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const ext = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
  },
})

// File filter: solo imágenes
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
        `Tipo de archivo no permitido: ${file.mimetype}. Solo se permiten: jpg, png, webp, gif`
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
