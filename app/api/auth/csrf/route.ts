import { NextResponse } from 'next/server'
import { generateNewCSRFToken } from '@/lib/csrf'

export async function GET() {
  try {
    const csrfToken = generateNewCSRFToken()
    return NextResponse.json({ csrfToken })
  } catch (error) {
    console.error('CSRF token generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate CSRF token' },
      { status: 500 }
    )
  }
}
