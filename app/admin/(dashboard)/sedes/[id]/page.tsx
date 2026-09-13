import { notFound } from 'next/navigation'
import { getLocationById, getLocationMenuRows } from '@/lib/data/admin'
import { LocationDetailTabs } from '@/components/admin/LocationDetailTabs'

export default async function SedeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const location = await getLocationById(id)
  if (!location) notFound()

  const menuRows = await getLocationMenuRows(id)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-bone">{location.name}</h1>
        <p className="mt-1 font-ui text-xs text-bone-muted">
          /{location.slug}
        </p>
      </div>

      <LocationDetailTabs
        location={location}
        menuRows={menuRows}
        siteUrl={siteUrl}
      />
    </div>
  )
}
