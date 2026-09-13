import { notFound } from 'next/navigation'
import {
  getAllCategories,
  getAllLocations,
  getMenuItemById,
  getLocationAvailabilityForItem,
} from '@/lib/data/admin'
import { EditMenuItemClient } from './EditMenuItemClient'

export default async function EditPlatoPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const item = await getMenuItemById(id)
  if (!item) notFound()

  const [categories, locations, availability] = await Promise.all([
    getAllCategories(),
    getAllLocations(),
    getLocationAvailabilityForItem(id),
  ])

  const category = categories.find((c) => c.id === item.category_id)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-bone">{item.name_es}</h1>
        {category && (
          <p className="mt-1 font-ui text-xs text-bone-muted">
            {category.name_es}
          </p>
        )}
      </div>
      <EditMenuItemClient
        item={{ ...item, categories: category ?? null }}
        categories={categories}
        locations={locations}
        availability={availability}
      />
    </div>
  )
}
