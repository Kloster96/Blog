// ============================================================
// API Service — Wrapper de fetch con manejo de cookies
// ============================================================

import { API_URL } from '@/lib/constants'

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

interface FetchOptions extends RequestInit {
  // Permite body como objeto (se stringify automáticamente)
  body?: Record<string, unknown> | FormData
}

/**
 * Fetch wrapper que:
 * - Convierte body objeto → JSON automáticamente
 * - Maneja errores HTTP (4xx → ApiError, 5xx → ApiError)
 * - Incluye credenciales (cookies) automáticamente
 */
async function fetchJSON<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, ...rest } = options

  const fetchOptions: RequestInit = {
    ...rest,
    credentials: 'include', // Enviar cookies automáticamente
    headers: {
      'Content-Type': 'application/json',
      ...rest.headers,
    },
  }

  // Si body es FormData, no seteamos Content-Type (el browser lo hace)
  if (body instanceof FormData) {
    fetchOptions.body = body
    delete fetchOptions.headers['Content-Type']
  } else if (body) {
    fetchOptions.body = JSON.stringify(body)
  }

  const response = await fetch(url, fetchOptions)

  if (!response.ok) {
    let errorMessage = response.statusText

    try {
      const errorData = await response.json()
      errorMessage = errorData.message ?? errorData.error ?? errorMessage
    } catch {
      // Response no era JSON
    }

    throw new ApiError(errorMessage, response.status)
  }

  return response.json()
}

export { fetchJSON }
export { API_URL }
