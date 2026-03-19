// ============================================================
// Auth Store — Estado de autenticación con persistencia
// ============================================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login as apiLogin, logout as apiLogout, getMe } from '@/services/auth.service'
import { useToastStore } from './useToastStore'

interface AuthState {
  isAuthenticated: boolean
  username: string | null
  isLoading: boolean

  // Actions
  login: (username: string, password: string) => Promise<boolean>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      username: null,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true })
        const toast = useToastStore.getState()

        try {
          await apiLogin(username, password)
          set({ isAuthenticated: true, username, isLoading: false })
          toast.addToast(`¡Bienvenido, ${username}!`, 'success')
          return true
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Error de conexión'
          toast.addToast(message, 'error')
          set({ isAuthenticated: false, username: null, isLoading: false })
          return false
        }
      },

      logout: async () => {
        set({ isLoading: true })
        const toast = useToastStore.getState()

        try {
          await apiLogout()
          set({ isAuthenticated: false, username: null, isLoading: false })
          toast.addToast('Sesión cerrada', 'info')
        } catch {
          // Aunque falle el request, limpiamos estado local
          set({ isAuthenticated: false, username: null, isLoading: false })
        }
      },

      checkAuth: async () => {
        // Solo verificar si ya tenemos estado de auth
        const { isAuthenticated } = get()
        if (!isAuthenticated) return

        try {
          const user = await getMe()
          set({ isAuthenticated: true, username: user.username })
        } catch {
          // Token inválido o expirado
          set({ isAuthenticated: false, username: null })
        }
      },
    }),
    {
      name: 'auth-storage', // localStorage key
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        username: state.username,
      }),
    }
  )
)
