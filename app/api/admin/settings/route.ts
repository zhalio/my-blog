import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase/client'
import { getAuthTokenFromRequest, validateAdminRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const client = getAdminClient()
    const { data, error } = await client
      .from('site_settings')
      .select('*')
      .eq('id', 1)
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 is code for 0 rows
       throw error
    }

    // Default if not found (though migration should ensure it exists)
    const settings = data || {
      site_title: 'My Blog',
      site_keywords: [],
      social_links: []
    }

    return NextResponse.json({ settings })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const token = getAuthTokenFromRequest(request)
  const ok = await validateAdminRequest(token)
  if (!ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    // Ensure ID is 1
    const payload = { ...body, id: 1, updated_at: new Date().toISOString() }

    const client = getAdminClient()
    const { data, error } = await client
      .from('site_settings')
      .upsert(payload)
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({ settings: data })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
