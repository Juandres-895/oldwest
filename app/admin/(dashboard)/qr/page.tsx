import { getAllLocations } from '@/lib/data/admin'
import { LocationQrCard } from '@/components/admin/LocationQrCard'

export default async function QrHubPage() {
  const locations = await getAllLocations()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-bone">Códigos QR</h1>
        <p className="mt-1 font-body text-sm text-bone-muted">
          Cada QR lleva directo al menú de esa sede — sin selector. Imprime el
          SVG en alta calidad para las mesas.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {locations.map((location) => (
          <LocationQrCard
            key={location.id}
            location={location}
            siteUrl={siteUrl}
          />
        ))}
      </div>

      {!process.env.NEXT_PUBLIC_SITE_URL && (
        <p className="rounded-lg border border-oxblood/40 bg-oxblood/10 p-3 font-ui text-xs text-oxblood-light">
          NEXT_PUBLIC_SITE_URL no está configurada — los QR de arriba apuntan a
          localhost. Configúrala en .env.local (y en Vercel al desplegar) antes
          de imprimir los códigos definitivos.
        </p>
      )}
    </div>
  )
}
