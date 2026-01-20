'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  token: string | null
  isAuthenticated: boolean
  login: (password: string) => void
  logout: () => void
  setToken: (token: string) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      isAuthenticated: false,
      
      login: (password: string) => {
        // 在真实应用中，这应该调用后端进行验证
        set({
          token: password,
          isAuthenticated: true,
        })
      },
      
      logout: () => {
        set({
          token: null,
          isAuthenticated: false,
        })
      },
      
      setToken: (token: string) => {
        set({
          token,
          isAuthenticated: !!token,
        })
      },
    }),
    {
      name: 'auth-storage',
    }
  )
)

/**
 * 获取请求头
 */
export function getAuthHeaders(token: string | null = null) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return headers
}
