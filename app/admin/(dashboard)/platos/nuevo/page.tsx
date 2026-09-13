import { getAllCategories, getAllLocations } from '@/lib/data/admin'
import { NewMenuItemClient } from './NewMenuItemClient'

export default async function NuevoPlatoPage() {
  const [categories, locations] = await Promise.all([
    getAllCategories(),
    getAllLocations(),
  ])

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-bone">Nuevo plato</h1>
        <p className="mt-1 font-body text-sm text-bone-muted">
          Se agrega al catálogo maestro. Ajusta qué sedes lo ofrecen abajo.
        </p>
      </div>
      <NewMenuItemClient categories={categories} locations={locations} />
    </div>
  )
}
