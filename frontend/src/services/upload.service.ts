// ============================================================
// Upload Service — Subir imágenes al backend (Cloudinary)
// ============================================================

import { fetchJSON, API_URL } from './api.service'

interface UploadResponse {
  url: string
}

/**
 * POST /api/upload — sube imagen (usa FormData, cookie se envía automáticamente)
 */
export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('image', file)

  const response = await fetchJSON<UploadResponse>(
    `${API_URL}/api/upload`,
    {
      method: 'POST',
      body: formData,
    }
  )

  return response.url
}
