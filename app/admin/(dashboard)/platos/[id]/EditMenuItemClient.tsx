'use client'

import { useRouter } from 'next/navigation'
import { MenuItemForm } from '@/components/admin/MenuItemForm'
import { Button } from '@/components/ui/Button'
import {
  updateMenuItem,
  deleteMenuItem,
} from '@/app/admin/(dashboard)/platos/actions'
import { uploadMenuImage } from '@/lib/supabase/uploadMenuImage'
import type { MenuItemInput } from '@/lib/validation/menuItemSchema'
import type { Database } from '@/lib/supabase/database.types'
import type { MenuItemWithCategory } from '@/lib/data/admin'

type Category = Database['public']['Tables']['categories']['Row']
type Location = Database['public']['Tables']['locations']['Row']
type LocationMenuItem =
  Database['public']['Tables']['location_menu_items']['Row']

export function EditMenuItemClient({
  item,
  categories,
  locations,
  availability,
}: {
  item: MenuItemWithCategory
  categories: Category[]
  locations: Location[]
  availability: LocationMenuItem[]
}) {
  const router = useRouter()

  const defaultValues: MenuItemInput = {
    category_id: item.category_id,
    name_es: item.name_es,
    name_en: item.name_en,
    description_es: item.description_es ?? '',
    description_en: item.description_en ?? '',
    base_price_cop: item.base_price_cop,
    is_chef_recommended: item.is_chef_recommended,
    is_new: item.is_new,
    is_spicy: item.is_spicy,
    is_vegetarian: item.is_vegetarian,
    is_gluten_free: item.is_gluten_free,
    locations: locations.map((loc) => {
      const existing = availability.find((a) => a.location_id === loc.id)
      return {
        location_id: loc.id,
        location_name: loc.name,
        is_available: existing?.is_available ?? false,
        price_override_cop: existing?.price_override_cop ?? null,
      }
    }),
  }

  async function handleSubmit(values: MenuItemInput, imageFile: File | null) {
    const imageUrl = imageFile
      ? await uploadMenuImage(imageFile, item.id)
      : undefined
    await updateMenuItem(item.id, values, imageUrl)
    router.refresh()
  }

  async function handleDelete() {
    if (!confirm(`¿Eliminar "${item.name_es}" de todas las sedes?`)) return
    await deleteMenuItem(item.id)
    router.push('/admin/platos')
  }

  return (
    <div className="flex flex-col gap-6">
      <MenuItemForm
        categories={categories}
        defaultValues={defaultValues}
        currentImageUrl={item.image_url}
        onSubmit={handleSubmit}
        submitLabel="Guardar cambios"
      />
      <div className="border-t border-brass/15 pt-4">
        <Button variant="danger" onClick={handleDelete}>
          Eliminar plato
        </Button>
      </div>
    </div>
  )
}
