// Since we are in server component usually, we can use a direct fetch or cached fetch
// But supabase client is client-side usually if it uses 'createBrowserClient'.
// For server components using 'createClient' from '@supabase/supabase-js' with anon key is fine for public data.

import { createClient } from '@supabase/supabase-js'

function normalizeEnvValue(value?: string) {
  if (!value) return undefined
  let normalized = value.trim()
  normalized = normalized.replace(/[\u200B-\u200D\uFEFF]/g, '')
  if (
    (normalized.startsWith('"') && normalized.endsWith('"')) ||
    (normalized.startsWith("'") && normalized.endsWith("'"))
  ) {
    normalized = normalized.slice(1, -1).trim()
  }
  normalized = normalized.replace(/\s+/g, '')
  return normalized || undefined
}

const supabaseUrl = normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_URL)
const supabaseAnonKey = normalizeEnvValue(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
const supabaseServiceKey = normalizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY)

function getServerReadKey() {
  return supabaseServiceKey || supabaseAnonKey
}

export const getSiteSettings = async () => {
  try {
    const serverReadKey = getServerReadKey()
    if (!supabaseUrl || !serverReadKey) {
      throw new Error('Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL and (SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY)')
    }
    
    const supabase = createClient(supabaseUrl, serverReadKey)
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }
    
    return data || {
      site_title: 'My Blog',
      site_description: 'A dedicated space for sharing knowledge and insights.',
      site_keywords: [],
      favicon_url: '',
      footer_text: '© 2026 My Blog. All rights reserved.',
      social_links: [],
      feature_flags: {
        enable_footer: true,
      }
    }
  } catch (error) {
    console.error('Error fetching site settings (this is expected during build if Supabase env vars are not set):', error);
    return {
      site_title: 'My Blog',
      site_description: 'A dedicated space for sharing knowledge and insights.',
      site_keywords: [],
      favicon_url: '',
      footer_text: '© 2026 My Blog. All rights reserved.',
      social_links: [],
      feature_flags: {
        enable_footer: true,
      }
    }
  }
}
