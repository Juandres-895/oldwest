import imageCompression from 'browser-image-compression'
import { createClient } from './client'

export async function uploadMenuImage(
  file: File,
  folderKey: string
): Promise<string> {
  const compressed = await imageCompression(file, {
    maxWidthOrHeight: 1600,
    maxSizeMB: 0.8,
    fileType: 'image/webp',
    initialQuality: 0.82,
  })

  const supabase = createClient()
  const path = `${folderKey}/${Date.now()}.webp`

  const { error } = await supabase.storage
    .from('menu-images')
    .upload(path, compressed, { contentType: 'image/webp', upsert: true })

  if (error) throw error

  const { data } = supabase.storage.from('menu-images').getPublicUrl(path)
  return data.publicUrl
}
