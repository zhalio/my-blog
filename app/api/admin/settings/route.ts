import { NextRequest, NextResponse } from 'next/server'
import { getAdminClient, hasValidServiceRoleKey, validateAnonKey, validateServiceRoleKey } from '@/lib/supabase/client'
import { getAuthTokenFromRequest, validateAdminRequest } from '@/lib/auth'

function keyReasonText(reason?: string, keyName?: string, keyRef?: string | null, urlRef?: string | null) {
  const prefix = keyName ? `${keyName}: ` : ''
  switch (reason) {
    case 'missing_key':
      return `${prefix}缺少配置`
    case 'invalid_jwt':
      return `${prefix}不是合法 JWT`
    case 'invalid_role':
      return `${prefix}角色不匹配`
    case 'expired':
      return `${prefix}已过期`
    case 'project_ref_mismatch':
      return `${prefix}项目不匹配（key.ref=${keyRef}, url.ref=${urlRef}）`
    default:
      return `${prefix}格式看似正确但被 Supabase 拒绝（常见于复制不完整/密钥已轮换失效）`
  }
}

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

function keyFingerprint(value?: string) {
  const normalized = normalizeEnvValue(value)
  if (!normalized) return 'missing'
  const len = normalized.length
  const head = normalized.slice(0, 8)
  const tail = normalized.slice(-8)
  return `len=${len}, head=${head}, tail=${tail}`
}

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
    const message = (error?.message || '').toLowerCase()
    if (message.includes('invalid api key')) {
      const anon = validateAnonKey()
      const service = validateServiceRoleKey()
      return NextResponse.json(
        {
          error: 'Supabase API Key 无效',
          details: [
            keyReasonText(anon.reason, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', anon.keyRef, anon.urlRef),
            keyReasonText(service.reason, 'SUPABASE_SERVICE_ROLE_KEY', service.keyRef, service.urlRef),
            `NEXT_PUBLIC_SUPABASE_ANON_KEY 指纹: ${keyFingerprint(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)}`,
            `SUPABASE_SERVICE_ROLE_KEY 指纹: ${keyFingerprint(process.env.SUPABASE_SERVICE_ROLE_KEY)}`,
          ],
        },
        { status: 500 }
      )
    }
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
        const validation = validateServiceRoleKey()
        if (!hasServiceRole) {
          const reasonMap: Record<string, string> = {
            missing_key: '缺少 SUPABASE_SERVICE_ROLE_KEY',
            invalid_jwt: 'SUPABASE_SERVICE_ROLE_KEY 不是合法 JWT',
            invalid_role: 'SUPABASE_SERVICE_ROLE_KEY 不是 service_role key',
            expired: 'SUPABASE_SERVICE_ROLE_KEY 已过期',
            project_ref_mismatch: `service_role key 项目不匹配（key.ref=${validation.keyRef}, url.ref=${validation.urlRef}）`,
          }

          return NextResponse.json(
            {
              error: 'site_settings 缺少默认行（id=1），且 SUPABASE_SERVICE_ROLE_KEY 无法用于自动初始化',
              details: reasonMap[validation.reason || ''] || '未知 service_role 校验失败原因',
            },
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
            const anon = validateAnonKey()
            const service = validateServiceRoleKey()
            return NextResponse.json(
              {
                error: 'Supabase API Key 无效',
                details: [
                  keyReasonText(anon.reason, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', anon.keyRef, anon.urlRef),
                  keyReasonText(service.reason, 'SUPABASE_SERVICE_ROLE_KEY', service.keyRef, service.urlRef),
                  `NEXT_PUBLIC_SUPABASE_ANON_KEY 指纹: ${keyFingerprint(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)}`,
                  `SUPABASE_SERVICE_ROLE_KEY 指纹: ${keyFingerprint(process.env.SUPABASE_SERVICE_ROLE_KEY)}`,
                ],
              },
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
      const anon = validateAnonKey()
      const service = validateServiceRoleKey()
      return NextResponse.json(
        {
          error: 'Supabase API Key 无效',
          details: [
            keyReasonText(anon.reason, 'NEXT_PUBLIC_SUPABASE_ANON_KEY', anon.keyRef, anon.urlRef),
            keyReasonText(service.reason, 'SUPABASE_SERVICE_ROLE_KEY', service.keyRef, service.urlRef),
            `NEXT_PUBLIC_SUPABASE_ANON_KEY 指纹: ${keyFingerprint(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)}`,
            `SUPABASE_SERVICE_ROLE_KEY 指纹: ${keyFingerprint(process.env.SUPABASE_SERVICE_ROLE_KEY)}`,
          ],
        },
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
