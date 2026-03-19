// ============================================================
// Upload DTOs
// ============================================================

export interface UploadResponse {
  url: string
}

export interface UploadErrorResponse {
  error: string
  message?: string
}
