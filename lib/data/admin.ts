import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/lib/supabase/database.types'

type LocationRow = Database['public']['Tables']['locations']['Row']
type CategoryRow = Database['public']['Tables']['categories']['Row']
type MenuItemRow = Database['public']['Tables']['menu_items']['Row']
type LocationMenuItemRow =
  Database['public']['Tables']['location_menu_items']['Row']

export async function getAllCategories(): Promise<CategoryRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export async function getAllLocations(): Promise<LocationRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .order('display_order', { ascending: true })

  if (error) throw error
  return data ?? []
}

export type MenuItemWithCategory = MenuItemRow & {
  categories: Pick<CategoryRow, 'id' | 'name_es' | 'slug'> | null
}

export async function getAllMenuItemsWithCategory(): Promise<
  MenuItemWithCategory[]
> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select('*, categories(id, name_es, slug)')
    .eq('is_archived', false)
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []) as unknown as MenuItemWithCategory[]
}

export async function getMenuItemById(
  id: string
): Promise<MenuItemRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('menu_items')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data
}

export async function getLocationAvailabilityForItem(
  menuItemId: string
): Promise<LocationMenuItemRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('location_menu_items')
    .select('*')
    .eq('menu_item_id', menuItemId)

  if (error) throw error
  return data ?? []
}

export async function getLocationById(
  id: string
): Promise<LocationRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('locations')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data
}

export type LocationMenuRow = LocationMenuItemRow & {
  menu_items: (MenuItemRow & { categories: CategoryRow | null }) | null
}

export async function getLocationMenuRows(
  locationId: string
): Promise<LocationMenuRow[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('location_menu_items')
    .select('*, menu_items(*, categories(*))')
    .eq('location_id', locationId)
    .order('display_order', { ascending: true })

  if (error) throw error
  return (data ?? []) as unknown as LocationMenuRow[]
}

export type TodayAvailabilityRow = LocationMenuItemRow & {
  menu_items: Pick<MenuItemRow, 'id' | 'name_es' | 'is_archived'> | null
  locations: Pick<LocationRow, 'id' | 'name' | 'slug'> | null
}

export async function getAllLocationMenuRowsForToday(): Promise<
  TodayAvailabilityRow[]
> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('location_menu_items')
    .select(
      '*, menu_items(id, name_es, is_archived), locations(id, name, slug)'
    )
    .eq('is_available', true)

  if (error) throw error
  return ((data ?? []) as unknown as TodayAvailabilityRow[]).filter(
    (row) => row.menu_items && !row.menu_items.is_archived
  )
}

export async function getCategoryById(
  id: string
): Promise<CategoryRow | null> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .maybeSingle()

  if (error) throw error
  return data
}
