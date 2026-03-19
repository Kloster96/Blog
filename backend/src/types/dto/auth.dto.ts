// ============================================================
// Auth DTOs
// ============================================================

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  message: string
  user?: {
    username: string
    role: string
  }
}

export interface LogoutResponse {
  message: string
}

export interface MeResponse {
  username: string
  role: string
}
