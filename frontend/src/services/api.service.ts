// ============================================================
// API Service — Fetch wrapper with JWT in Authorization header
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

interface FetchOptions extends Omit<RequestInit, 'body'> {
  body?: Record<string, unknown> | FormData
}

/**
 * Get JWT token from Zustand persisted storage
 */
function getAuthToken(): string | null {
  try {
    const stored = localStorage.getItem('auth-storage')
    if (!stored) return null
    const parsed = JSON.parse(stored)
    return parsed?.state?.token ?? null
  } catch {
    return null
  }
}

/**
 * Fetch wrapper:
 * - Converts body object → JSON
 * - Handles HTTP errors
 * - Sends JWT in Authorization header
 */
async function fetchJSON<T>(
  url: string,
  options: FetchOptions = {}
): Promise<T> {
  const { body, ...rest } = options

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  // Merge any custom headers
  if (rest.headers) {
    Object.assign(headers, rest.headers as Record<string, string>)
  }

  // Add JWT token if available
  const token = getAuthToken()
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }

  const fetchOptions: RequestInit = {
    ...rest,
    headers,
  }

  // If body is FormData, remove Content-Type (browser sets it)
  if (body instanceof FormData) {
    fetchOptions.body = body
    delete headers['Content-Type']
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
      // Response wasn't JSON
    }

    throw new ApiError(errorMessage, response.status)
  }

  return response.json()
}

export { fetchJSON }
export { API_URL }
