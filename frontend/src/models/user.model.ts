// ============================================================
// User Model Types
// ============================================================

export interface User {
  username: string
  role: string
}

export interface AuthState {
  isAuthenticated: boolean
  username: string | null
}
