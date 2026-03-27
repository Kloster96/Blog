// ============================================================
// Auth Service
// ============================================================

import { fetchJSON, API_URL } from './api.service'

interface LoginRequest {
  username: string
  password: string
}

interface LoginResponse {
  message: string
  token: string
  user: {
    username: string
    role: string
  }
}

/**
 * Login — returns JWT token in response body
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
 * Logout — clear local state
 */
export async function logout(): Promise<{ message: string }> {
  return fetchJSON<{ message: string }>(`${API_URL}/api/auth/logout`, {
    method: 'POST',
  })
}
