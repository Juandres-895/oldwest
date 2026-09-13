'use client'

import { MenuItemForm } from '@/components/admin/MenuItemForm'
import { createMenuItem } from '@/app/admin/(dashboard)/platos/actions'
import { uploadMenuImage } from '@/lib/supabase/uploadMenuImage'
import type { MenuItemInput } from '@/lib/validation/menuItemSchema'
import type { Database } from '@/lib/supabase/database.types'

type Category = Database['public']['Tables']['categories']['Row']
type Location = Database['public']['Tables']['locations']['Row']

export function NewMenuItemClient({
  categories,
  locations,
}: {
  categories: Category[]
  locations: Location[]
}) {
  const defaultValues: MenuItemInput = {
    category_id: '',
    name_es: '',
    name_en: '',
    description_es: '',
    description_en: '',
    base_price_cop: 0,
    is_chef_recommended: false,
    is_new: false,
    is_spicy: false,
    is_vegetarian: false,
    is_gluten_free: false,
    locations: locations.map((loc) => ({
      location_id: loc.id,
      location_name: loc.name,
      is_available: true,
      price_override_cop: null,
    })),
  }

  async function handleSubmit(values: MenuItemInput, imageFile: File | null) {
    const imageUrl = imageFile
      ? await uploadMenuImage(imageFile, crypto.randomUUID())
      : null
    await createMenuItem(values, imageUrl)
  }

  return (
    <MenuItemForm
      categories={categories}
      defaultValues={defaultValues}
      onSubmit={handleSubmit}
      submitLabel="Crear plato"
    />
  )
}
