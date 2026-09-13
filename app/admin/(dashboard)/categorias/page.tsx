import { getAllCategories } from '@/lib/data/admin'
import { CategoryManager } from '@/components/admin/CategoryManager'

export default async function CategoriasPage() {
  const categories = await getAllCategories()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-bone">Categorías</h1>
        <p className="mt-1 font-body text-sm text-bone-muted">
          Arrastra para reordenar cómo aparecen en el menú público.
        </p>
      </div>

      <CategoryManager initialCategories={categories} />
    </div>
  )
}
