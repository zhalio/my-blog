import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient, hasValidServiceRoleKey } from '@/lib/supabase/client'
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
    // Singleton row update only (id = 1)
    const payload = { ...body, updated_at: new Date().toISOString() }

    const client = getAdminClient(token || undefined)
    const { data, error } = await client
      .from('site_settings')
      .update(payload)
      .eq('id', 1)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        const hasServiceRole = hasValidServiceRoleKey()
        if (!hasServiceRole) {
          return NextResponse.json(
            { error: 'site_settings 缺少默认行（id=1），且 SUPABASE_SERVICE_ROLE_KEY 缺失或无效，无法自动初始化' },
            { status: 500 }
          )
        }

        const adminClient = getAdminClient()
        const { data: repaired, error: repairError } = await adminClient
          .from('site_settings')
          .upsert({ id: 1, ...payload, site_title: body?.site_title || 'My Blog' })
          .select()
          .single()

        if (repairError) {
          if ((repairError?.message || '').toLowerCase().includes('invalid api key')) {
            return NextResponse.json(
              { error: 'Supabase API Key 无效：请在部署环境中检查 SUPABASE_SERVICE_ROLE_KEY 是否填写了 service_role key' },
              { status: 500 }
            )
          }
          throw repairError
        }

        return NextResponse.json({ settings: repaired })
      }
      throw error
    }

    return NextResponse.json({ settings: data })
  } catch (error: any) {
    const code = error?.code as string | undefined
    const message = error?.message || 'Unknown error'
    const lowerMessage = message.toLowerCase()

    if (lowerMessage.includes('invalid api key')) {
      return NextResponse.json(
        { error: 'Supabase API Key 无效：请检查 NEXT_PUBLIC_SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY 配置' },
        { status: 500 }
      )
    }

    if (code === '42703') {
      return NextResponse.json(
        { error: '数据库缺少设置字段（请执行最新 migration）', details: message, code },
        { status: 500 }
      )
    }

    if (code === '42P01') {
      return NextResponse.json(
        { error: '数据库缺少 site_settings 表（请执行初始化 schema/migration）', details: message, code },
        { status: 500 }
      )
    }

    return NextResponse.json({ error: message, code }, { status: 500 })
  }
}
