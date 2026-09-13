import Link from 'next/link'
import { getAllLocations } from '@/lib/data/admin'
import { buttonVariants } from '@/components/ui/buttonStyles'
import clsx from 'clsx'

export default async function SedesPage() {
  const locations = await getAllLocations()

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl text-bone">Sedes</h1>
          <p className="mt-1 font-body text-sm text-bone-muted">
            Cada sede tiene su propio menú, disponibilidad y código QR.
          </p>
        </div>
        <Link href="/admin/sedes/nueva" className={buttonVariants('primary')}>
          + Nueva sede
        </Link>
      </div>

      <div className="flex flex-col gap-3">
        {locations.map((location) => (
          <Link
            key={location.id}
            href={`/admin/sedes/${location.id}`}
            className="flex items-center justify-between rounded-xl border border-brass/20 bg-surface p-4 transition-colors hover:border-brass/40"
          >
            <div>
              <p className="font-heading text-lg text-bone">{location.name}</p>
              <p className="font-ui text-xs text-bone-muted">
                /{location.slug} {location.city && `· ${location.city}`}
              </p>
            </div>
            <span
              className={clsx(
                'rounded-full px-2 py-1 font-ui text-xs font-medium',
                location.is_active
                  ? 'bg-sage/20 text-sage-light'
                  : 'bg-oxblood/20 text-oxblood-light'
              )}
            >
              {location.is_active ? 'Activa' : 'Inactiva'}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
