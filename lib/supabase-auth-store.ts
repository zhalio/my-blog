import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabaseAuth, getSession, getCurrentUser } from '@/lib/supabase-auth'

interface SupabaseAuthState {
  user: any | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signInWithGithub: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useSupabaseAuthStore = create<SupabaseAuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: true,

      signInWithEmail: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          const { data } = await supabaseAuth.auth.signInWithPassword({ email, password })
          const user = await getCurrentUser()
          set({
            user,
            accessToken: data.session?.access_token || null,
            isAuthenticated: !!user,
            isLoading: false,
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signInWithGithub: async () => {
        set({ isLoading: true })
        try {
          await supabaseAuth.auth.signInWithOAuth({
            provider: 'github',
            options: {
              redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/admin/posts`,
            },
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signInWithGoogle: async () => {
        set({ isLoading: true })
        try {
          await supabaseAuth.auth.signInWithOAuth({
            provider: 'google',
            options: {
              redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/admin/posts`,
            },
          })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      signUp: async (email: string, password: string) => {
        set({ isLoading: true })
        try {
          await supabaseAuth.auth.signUp({
            email,
            password,
          })
          // 注册后可能需要确认邮箱
          set({ isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      logout: async () => {
        set({ isLoading: true })
        try {
          await supabaseAuth.auth.signOut()
          set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
        } catch (error) {
          set({ isLoading: false })
          throw error
        }
      },

      checkAuth: async () => {
        set({ isLoading: true })
        try {
          const session = await getSession()
          if (session?.user) {
            set({
              user: session.user,
              accessToken: session.access_token || null,
              isAuthenticated: true,
              isLoading: false,
            })
          } else {
            set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
          }
        } catch (error) {
          set({ user: null, accessToken: null, isAuthenticated: false, isLoading: false })
        }
      },
    }),
    {
      name: 'supabase-auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
