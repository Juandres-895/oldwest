import Link from 'next/link'
import { getAllMenuItemsWithCategory } from '@/lib/data/admin'
import { formatPriceCop } from '@/lib/utils/formatPrice'
import { buttonVariants } from '@/components/ui/buttonStyles'

export default async function PlatosPage() {
  const items = await getAllMenuItemsWithCategory()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-bone">Platos</h1>
          <p className="mt-1 font-body text-sm text-bone-muted">
            Catálogo maestro compartido por las 3 sedes.
          </p>
        </div>
        <Link href="/admin/platos/nuevo" className={buttonVariants('primary')}>
          + Nuevo plato
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/admin/platos/${item.id}`}
            className="flex items-center justify-between gap-4 rounded-xl border border-brass/20 bg-surface p-4 transition-colors hover:border-brass/40"
          >
            <div className="min-w-0">
              <p className="truncate font-body text-base text-bone">
                {item.name_es}
              </p>
              <p className="font-ui text-xs text-bone-muted">
                {item.categories?.name_es ?? 'Sin categoría'}
                {!item.image_url && ' · sin foto'}
              </p>
            </div>
            <span className="shrink-0 font-ui text-sm font-semibold text-brass-light">
              {formatPriceCop(item.base_price_cop)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
