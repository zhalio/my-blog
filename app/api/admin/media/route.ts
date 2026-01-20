import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { getAuthTokenFromRequest, validateAdminRequest } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const token = getAuthTokenFromRequest(request)
  const ok = await validateAdminRequest(token)
  if (!ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { data, error } = await supabase
      .storage
      .from('images')
      .list('uploads', {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' },
      })

    if (error) {
      throw error
    }

    // Transform data to include public URL
    const files = data.map(file => {
      const { data: { publicUrl } } = supabase
        .storage
        .from('images')
        .getPublicUrl(`uploads/${file.name}`)

      return {
        name: file.name,
        id: file.id,
        updated_at: file.updated_at,
        created_at: file.created_at,
        last_accessed_at: file.last_accessed_at,
        metadata: file.metadata,
        url: publicUrl
      }
    })

    return NextResponse.json({ files })

  } catch (error) {
    console.error('Error listing images:', error)
    return NextResponse.json({ error: 'Failed to list images' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const token = getAuthTokenFromRequest(request)
  const ok = await validateAdminRequest(token)
  if (!ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`
    const filePath = `uploads/${fileName}`

    const { error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      throw error
    }

    const { data: { publicUrl } } = supabase
      .storage
      .from('images')
      .getPublicUrl(filePath)

    return NextResponse.json({ url: publicUrl })

  } catch (error) {
    console.error('Error uploading image:', error)
    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const token = getAuthTokenFromRequest(request)
  const ok = await validateAdminRequest(token)
  if (!ok) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get('filename')

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 })
    }

    const { error } = await supabase.storage
      .from('images')
      .remove([`uploads/${filename}`])

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })

  } catch (error) {
    console.error('Error deleting image:', error)
    return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 })
  }
}
