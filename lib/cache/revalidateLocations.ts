import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function revalidateAllLocationPages() {
  const supabase = await createClient()
  const { data } = await supabase.from('locations').select('slug')

  for (const { slug } of data ?? []) {
    revalidatePath(`/${slug}`)
  }
}

export async function revalidateLocationPage(slug: string) {
  revalidatePath(`/${slug}`)
}
