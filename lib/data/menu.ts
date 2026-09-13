import { createStaticClient } from '@/lib/supabase/static'
import type { Database } from '@/lib/supabase/database.types'

type LocationRow = Database['public']['Tables']['locations']['Row']
type CategoryRow = Database['public']['Tables']['categories']['Row']
type MenuItemRow = Database['public']['Tables']['menu_items']['Row']
type LocationMenuItemRow =
  Database['public']['Tables']['location_menu_items']['Row']

export type MenuDish = {
  id: string
  slug: string
  nameEs: string
  nameEn: string
  descriptionEs: string | null
  descriptionEn: string | null
  priceCop: number
  imageUrl: string | null
  isChefRecommended: boolean
  isNew: boolean
  isSpicy: boolean
  isVegetarian: boolean
  isGlutenFree: boolean
  isSoldOutToday: boolean
}

export type MenuCategory = {
  id: string
  slug: string
  nameEs: string
  nameEn: string
  taglineEs: string | null
  taglineEn: string | null
  items: MenuDish[]
}

export type LocationMenu = {
  location: LocationRow
  categories: MenuCategory[]
}

export async function getAllActiveLocationSlugs(): Promise<string[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from('locations')
    .select('slug')
    .eq('is_active', true)

  return (data ?? []).map((row) => row.slug)
}

export async function getAllActiveLocations(): Promise<LocationRow[]> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from('locations')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  return data ?? []
}

export async function getLocationBySlug(
  slug: string
): Promise<LocationRow | null> {
  const supabase = createStaticClient()
  const { data } = await supabase
    .from('locations')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  return data
}

type LocationMenuItemWithDish = LocationMenuItemRow & {
  menu_items: (MenuItemRow & { categories: CategoryRow | null }) | null
}

export async function getMenuForLocation(
  locationSlug: string
): Promise<LocationMenu | null> {
  const supabase = createStaticClient()

  const location = await getLocationBySlug(locationSlug)
  if (!location) return null

  const { data, error } = await supabase
    .from('location_menu_items')
    .select(
      '*, menu_items(*, categories(*))'
    )
    .eq('location_id', location.id)
    .eq('is_available', true)
    .order('display_order', { ascending: true })

  if (error) throw error

  const rows = (data ?? []) as unknown as LocationMenuItemWithDish[]

  const categoriesById = new Map<string, MenuCategory>()

  for (const row of rows) {
    const dish = row.menu_items
    const category = dish?.categories
    if (!dish || !category) continue
    if (dish.is_archived || !category.is_active) continue

    if (!categoriesById.has(category.id)) {
      categoriesById.set(category.id, {
        id: category.id,
        slug: category.slug,
        nameEs: category.name_es,
        nameEn: category.name_en,
        taglineEs: category.tagline_es,
        taglineEn: category.tagline_en,
        items: [],
      })
    }

    categoriesById.get(category.id)!.items.push({
      id: dish.id,
      slug: dish.slug,
      nameEs: dish.name_es,
      nameEn: dish.name_en,
      descriptionEs: dish.description_es,
      descriptionEn: dish.description_en,
      priceCop: row.price_override_cop ?? dish.base_price_cop,
      imageUrl: dish.image_url,
      isChefRecommended: dish.is_chef_recommended,
      isNew: dish.is_new,
      isSpicy: dish.is_spicy,
      isVegetarian: dish.is_vegetarian,
      isGlutenFree: dish.is_gluten_free,
      isSoldOutToday: row.is_sold_out_today,
    })
  }

  const { data: categoryOrder } = await supabase
    .from('categories')
    .select('id, display_order')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  const orderedCategories = (categoryOrder ?? [])
    .map((c) => categoriesById.get(c.id))
    .filter((c): c is MenuCategory => Boolean(c && c.items.length > 0))

  return { location, categories: orderedCategories }
}
