import Link from 'next/link'
import {
  getAllCategories,
  getAllLocations,
  getAllMenuItemsWithCategory,
} from '@/lib/data/admin'
import { buttonVariants } from '@/components/ui/buttonStyles'

export default async function AdminDashboardPage() {
  const [locations, categories, items] = await Promise.all([
    getAllLocations(),
    getAllCategories(),
    getAllMenuItemsWithCategory(),
  ])

  const itemsWithoutPhoto = items.filter((item) => !item.image_url)

  const stats = [
    { label: 'Sedes', value: locations.length, href: '/admin/sedes' },
    { label: 'Categorías', value: categories.length, href: '/admin/categorias' },
    { label: 'Platos', value: items.length, href: '/admin/platos' },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl text-bone">Dashboard</h1>
        <p className="mt-1 font-body text-sm text-bone-muted">
          Vista general del menú de las 3 sedes.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="rounded-xl border border-brass/20 bg-surface p-5 transition-colors hover:border-brass/40"
          >
            <p className="font-ui text-xs uppercase tracking-wide text-bone-muted">
              {stat.label}
            </p>
            <p className="mt-1 font-heading text-3xl text-brass-light">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/admin/platos/nuevo" className={buttonVariants('primary')}>
          + Nuevo plato
        </Link>
        <Link href="/admin/sedes/nueva" className={buttonVariants('secondary')}>
          + Nueva sede
        </Link>
        <Link href="/admin/qr" className={buttonVariants('secondary')}>
          Descargar códigos QR
        </Link>
      </div>

      {itemsWithoutPhoto.length > 0 && (
        <div className="rounded-xl border border-brass/20 bg-surface p-5">
          <p className="font-ui text-sm font-semibold text-brass-light">
            {itemsWithoutPhoto.length} plato(s) sin foto
          </p>
          <ul className="mt-3 flex flex-col gap-1">
            {itemsWithoutPhoto.slice(0, 6).map((item) => (
              <li key={item.id}>
                <Link
                  href={`/admin/platos/${item.id}`}
                  className="font-body text-sm text-bone-muted hover:text-bone hover:underline"
                >
                  {item.name_es}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
