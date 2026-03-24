// ============================================================
// JWT Interceptor — Adjunta automáticamente el JWT a las peticiones
// ============================================================
// El JWT se envía automáticamente via cookie httpOnly por el browser.
// Este interceptor asegura que TODAS las llamadas incluyan credentials.
//
// Uso:
//   const data = await interceptorGet('/api/posts')
//   const result = await interceptorPost('/api/posts', { title, content })

import { API_URL } from '@/lib/constants'
import { useToastStore } from '@/store/useToastStore'

// ============================================================
// Wrapper genérico de fetch con credentials + error handling
// ============================================================

interface RequestInit extends globalThis.RequestInit {}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const toast = useToastStore.getState()

  // Construir URL completa
  const url = endpoint.startsWith('http') ? endpoint : `${API_URL}${endpoint}`

  // Opciones por defecto: siempre enviar cookies
  const config: RequestInit = {
    ...options,
    credentials: 'include', // Adjunta cookie httpOnly automáticamente
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }

  // Si el body es FormData, no seteamos Content-Type
  if (config.body instanceof FormData) {
    if (config.headers) {
      delete (config.headers as Record<string, string>)['Content-Type']
    }
  }

  try {
    const response = await fetch(url, config)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      const message =
        errorData.message ?? errorData.error ?? response.statusText

      // Si es 401, la sesión expiró
      if (response.status === 401) {
        toast.addToast('Sesión expirada. Ingresá de nuevo.', 'error')
      } else {
        toast.addToast(message, 'error')
      }

      throw new Error(message)
    }

    return await response.json()
  } catch (error) {
    if (error instanceof Error) {
      toast.addToast(error.message, 'error')
    }
    throw error
  }
}

// ============================================================
// Métodos HTTP
// ============================================================

export async function interceptorGet<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: 'GET' })
}

export async function interceptorPost<T>(
  endpoint: string,
  body?: Record<string, unknown> | FormData
): Promise<T> {
  const options: RequestInit = { method: 'POST' }
  if (body) {
    options.body = body instanceof FormData ? body : JSON.stringify(body)
  }
  return request<T>(endpoint, options)
}

export async function interceptorPut<T>(
  endpoint: string,
  body?: Record<string, unknown>
): Promise<T> {
  return request<T>(endpoint, {
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  })
}

export async function interceptorDelete<T>(endpoint: string): Promise<T> {
  return request<T>(endpoint, { method: 'DELETE' })
}

// ============================================================
// Export para uso como interceptor genérico
// ============================================================

export const jwtInterceptor = {
  get: interceptorGet,
  post: interceptorPost,
  put: interceptorPut,
  delete: interceptorDelete,
}
