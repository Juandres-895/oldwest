'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/requireUser'
import { locationSchema, type LocationInput } from '@/lib/validation/locationSchema'
import { revalidateAllLocationPages } from '@/lib/cache/revalidateLocations'
import type { Database } from '@/lib/supabase/database.types'

export async function createLocation(
  input: LocationInput,
  logoUrl: string | null
) {
  await requireUser()
  const values = locationSchema.parse(input)
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('locations')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data: location, error } = await supabase
    .from('locations')
    .insert({
      ...values,
      logo_url: logoUrl,
      display_order: (existing?.display_order ?? 0) + 1,
    })
    .select()
    .single()

  if (error) throw error

  const { data: menuItems } = await supabase.from('menu_items').select('id, display_order')

  if (menuItems && menuItems.length > 0) {
    await supabase.from('location_menu_items').insert(
      menuItems.map((item) => ({
        location_id: location.id,
        menu_item_id: item.id,
        display_order: item.display_order,
      }))
    )
  }

  revalidatePath('/admin/sedes')
  redirect(`/admin/sedes/${location.id}`)
}

export async function updateLocation(
  id: string,
  input: LocationInput,
  logoUrl: string | null | undefined
) {
  await requireUser()
  const values = locationSchema.parse(input)
  const supabase = await createClient()

  const { data: current } = await supabase
    .from('locations')
    .select('slug')
    .eq('id', id)
    .single()

  const updatePayload: Database['public']['Tables']['locations']['Update'] = {
    ...values,
  }
  if (logoUrl !== undefined) updatePayload.logo_url = logoUrl

  const { error } = await supabase
    .from('locations')
    .update(updatePayload)
    .eq('id', id)
  if (error) throw error

  revalidatePath('/admin/sedes')
  revalidatePath(`/admin/sedes/${id}`)
  if (current?.slug) revalidatePath(`/${current.slug}`)
  if (values.slug !== current?.slug) revalidatePath(`/${values.slug}`)
}

export async function deleteLocation(id: string) {
  await requireUser()
  const supabase = await createClient()

  const { data: location } = await supabase
    .from('locations')
    .select('slug')
    .eq('id', id)
    .single()

  const { error } = await supabase.from('locations').delete().eq('id', id)
  if (error) throw error

  revalidatePath('/admin/sedes')
  if (location?.slug) revalidatePath(`/${location.slug}`)
}

export async function updateLocationMenuItem(
  id: string,
  values: {
    is_available?: boolean
    price_override_cop?: number | null
    is_sold_out_today?: boolean
  }
) {
  await requireUser()
  const supabase = await createClient()

  const { data: row, error } = await supabase
    .from('location_menu_items')
    .update(values)
    .eq('id', id)
    .select('location_id, locations(slug)')
    .single()

  if (error) throw error

  const slug = (row as unknown as { locations: { slug: string } | null })
    ?.locations?.slug
  if (slug) revalidatePath(`/${slug}`)
}

export async function reorderLocationMenuItems(orderedIds: string[]) {
  await requireUser()
  const supabase = await createClient()

  await Promise.all(
    orderedIds.map((id, index) =>
      supabase
        .from('location_menu_items')
        .update({ display_order: index })
        .eq('id', id)
    )
  )

  await revalidateAllLocationPages()
}
