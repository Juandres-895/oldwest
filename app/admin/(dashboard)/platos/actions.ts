'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/requireUser'
import { menuItemSchema, type MenuItemInput } from '@/lib/validation/menuItemSchema'
import { slugify } from '@/lib/utils/slugify'
import { revalidateAllLocationPages } from '@/lib/cache/revalidateLocations'
import type { Database } from '@/lib/supabase/database.types'

async function syncLocationAvailability(
  menuItemId: string,
  locations: MenuItemInput['locations']
) {
  const supabase = await createClient()

  await supabase.from('location_menu_items').upsert(
    locations.map((loc) => ({
      location_id: loc.location_id,
      menu_item_id: menuItemId,
      is_available: loc.is_available,
      price_override_cop: loc.price_override_cop,
    })),
    { onConflict: 'location_id,menu_item_id' }
  )
}

export async function createMenuItem(
  input: MenuItemInput,
  imageUrl: string | null
) {
  await requireUser()
  const values = menuItemSchema.parse(input)
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('menu_items')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { locations, ...itemValues } = values

  const { data: item, error } = await supabase
    .from('menu_items')
    .insert({
      ...itemValues,
      slug: `${slugify(values.name_es)}-${Date.now().toString(36)}`,
      image_url: imageUrl,
      display_order: (existing?.display_order ?? 0) + 1,
    })
    .select()
    .single()

  if (error) throw error

  await syncLocationAvailability(item.id, locations)

  revalidatePath('/admin/platos')
  await revalidateAllLocationPages()
  redirect(`/admin/platos/${item.id}`)
}

export async function updateMenuItem(
  id: string,
  input: MenuItemInput,
  imageUrl: string | null | undefined
) {
  await requireUser()
  const values = menuItemSchema.parse(input)
  const supabase = await createClient()
  const { locations, ...itemValues } = values

  const updatePayload: Database['public']['Tables']['menu_items']['Update'] = {
    ...itemValues,
  }
  if (imageUrl !== undefined) updatePayload.image_url = imageUrl

  const { error } = await supabase
    .from('menu_items')
    .update(updatePayload)
    .eq('id', id)

  if (error) throw error

  await syncLocationAvailability(id, locations)

  revalidatePath('/admin/platos')
  revalidatePath(`/admin/platos/${id}`)
  await revalidateAllLocationPages()
}

export async function deleteMenuItem(id: string) {
  await requireUser()
  const supabase = await createClient()

  const { error } = await supabase.from('menu_items').delete().eq('id', id)
  if (error) throw error

  revalidatePath('/admin/platos')
  await revalidateAllLocationPages()
}
