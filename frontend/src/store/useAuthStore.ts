// ============================================================
// Auth Store — Token-based authentication with Zustand
// ============================================================

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login as apiLogin, logout as apiLogout } from '@/services/auth.service'
import { useToastStore } from './useToastStore'

interface AuthState {
  isAuthenticated: boolean
  username: string | null
  token: string | null
  isLoading: boolean

  // Actions
  login: (username: string, password: string) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      username: null,
      token: null,
      isLoading: false,

      login: async (username: string, password: string) => {
        set({ isLoading: true })
        const toast = useToastStore.getState()

        try {
          const response = await apiLogin(username, password)
          set({
            isAuthenticated: true,
            username: response.user.username,
            token: response.token,
            isLoading: false,
          })
          toast.addToast(`Welcome, ${response.user.username}!`, 'success')
          return true
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Connection error'
          toast.addToast(message, 'error')
          set({ isAuthenticated: false, username: null, token: null, isLoading: false })
          return false
        }
      },

      logout: () => {
        set({ isAuthenticated: false, username: null, token: null, isLoading: false })
        useToastStore.getState().addToast('Logged out', 'info')
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        username: state.username,
        token: state.token,
      }),
    }
  )
)
