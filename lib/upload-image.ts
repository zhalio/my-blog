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

    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/admin/media', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Upload failed:', errorData.error);
      return null;
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Failed to upload image:', error);
    return null;
  }
}
