import { supabase } from '@/lib/supabase/client';

export async function uploadImage(file: File): Promise<string | null> {
  try {
    // 1. Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('File is not an image');
      return null;
    }

    // 2. Validate file size (e.g., max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('File size too large (max 5MB)');
      return null;
    }

    // 3. Generate unique path
    // Using timestamp + random string + clean filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    // 4. Upload to Supabase Storage ('images' bucket)
    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error('Supabase storage upload error:', error);
      throw error;
    }

    // 5. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return publicUrl;
  } catch (error) {
    console.error('Failed to upload image:', error);
    return null;
  }
}
