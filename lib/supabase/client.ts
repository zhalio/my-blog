import { createClient } from '@supabase/supabase-js'
import type { Database as SupabaseDB } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

let supabaseClient: any = null

function parseJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    const payload = parts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/')
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4)
    const json = Buffer.from(padded, 'base64').toString('utf8')
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function hasValidServiceRoleKey() {
  if (!serviceRoleKey) return false
  const payload = parseJwtPayload(serviceRoleKey)
  return payload?.role === 'service_role'
}

function getSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  }

  if (!supabaseClient) {
    supabaseClient = createClient<SupabaseDB>(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
      },
    })
  }

  return supabaseClient
}

// Lazy-loaded singleton for better build-time compatibility
export const supabase: any = new Proxy({}, {
  get(target: any, prop: string | symbol) {
    try {
      return getSupabaseClient()[prop]
    } catch (error) {
      console.error('Supabase client error:', error)
      return undefined
    }
  },
})

// 用于服务端的客户端（如果需要）
export const createServerClient = () => {
  return getSupabaseClient()
}

// 用于服务端的管理员客户端（使用用户 Token 认证）
export const getAdminClient = (token?: string) => {
  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }
  
  // 如果提供了 token，则创建一个带有 Authorization 头的客户端
  if (token) {
    return createClient<SupabaseDB>(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      auth: {
        persistSession: false,
      },
    })
  }
  
  // 否则回退到使用 service_role_key（如果存在且有效）或 anon_key
  if (hasValidServiceRoleKey()) {
    return createClient<SupabaseDB>(supabaseUrl, serviceRoleKey, {
      auth: {
        persistSession: false,
      },
    })
  }
  
  return getSupabaseClient()
}

export type Database = {
  public: {
    Tables: {
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          content: any // TipTap JSON content
          excerpt: string | null
          cover_image: string | null
          author: string
          locale: string
          published: boolean
          tags: string[]
          created_at: string
          updated_at: string
          published_at: string | null
          view_count: number
          reading_time: number | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: any
          excerpt?: string | null
          cover_image?: string | null
          author?: string
          locale?: string
          published?: boolean
          tags?: string[]
          created_at?: string
          updated_at?: string
          published_at?: string | null
          view_count?: number
          reading_time?: number | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: any
          excerpt?: string | null
          cover_image?: string | null
          author?: string
          locale?: string
          published?: boolean
          tags?: string[]
          created_at?: string
          updated_at?: string
          published_at?: string | null
          view_count?: number
          reading_time?: number | null
        }
      }
      pages: {
        Row: {
          id: string
          title: string
          slug: string
          content: any // TipTap JSON content
          locale: string
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          content: any
          locale?: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          content?: any
          locale?: string
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
