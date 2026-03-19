// ============================================================
// User Adapter — Transforma datos de API a tipos del frontend
// ============================================================

import type { User } from '@/models'

/**
 * Adapta respuesta cruda de la API → User
 */
export function adaptUser(raw: { username: string; role?: string }): User {
  return {
    username: raw.username,
    role: raw.role ?? 'admin',
  }
}
