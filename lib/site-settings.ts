import { supabase } from '@/lib/supabase/client'

// Since we are in server component usually, we can use a direct fetch or cached fetch
// But supabase client is client-side usually if it uses 'createBrowserClient'.
// For server components using 'createClient' from '@supabase/supabase-js' with anon key is fine for public data.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const getSiteSettings = async () => {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .single()
  
  return data || {
    site_title: 'My Blog',
    site_description: 'A dedicated space for sharing knowledge and insights.',
    site_keywords: [],
    favicon_url: '',
    footer_text: '© 2026 My Blog. All rights reserved.',
    social_links: []
  }
}
