// ============================================================
// Auth Service — Llamadas a la API de autenticación
// ============================================================

import { fetchJSON, API_URL } from './api.service'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  message: string
  user?: {
    username: string
    role: string
  }
}

interface MeResponse {
  username: string
  role: string
}

/**
 * Login — el backend setea la cookie httpOnly automáticamente
 */
export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  return fetchJSON<LoginResponse>(`${API_URL}/api/auth/login`, {
    method: 'POST',
    body: { username, password },
  })
}

/**
 * Logout — el backend limpia la cookie automáticamente
 */
export async function logout(): Promise<{ message: string }> {
  return fetchJSON<{ message: string }>(`${API_URL}/api/auth/logout`, {
    method: 'POST',
  })
}

/**
 * Validar sesión actual — verifica si la cookie JWT es válida
 */
export async function getMe(): Promise<MeResponse> {
  return fetchJSON<MeResponse>(`${API_URL}/api/auth/me`)
}
