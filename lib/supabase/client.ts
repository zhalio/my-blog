import { createClient } from '@supabase/supabase-js'
import type { Database as SupabaseDB } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient<SupabaseDB>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
  },
})

// 用于服务端的客户端（如果需要）
export const createServerClient = () => {
  return createClient<SupabaseDB>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
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
