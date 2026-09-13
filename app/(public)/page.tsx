import Image from 'next/image'
import Link from 'next/link'
import { getAllActiveLocations } from '@/lib/data/menu'
import { BrandMark } from '@/components/menu/BrandMark'

export const revalidate = 60

export default async function LocationsHubPage() {
  const locations = await getAllActiveLocations()

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-hidden bg-background px-6 pb-16 pt-14 text-center">
      <Image
        src="/brand/admin-login-bg.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="scale-105 object-cover object-center blur-lg"
      />
      <div className="absolute inset-0 bg-background/80" />

      <div className="relative flex w-full flex-col items-center">
        <BrandMark priority />

        <div className="divider-brass mx-auto mt-6 max-w-[140px]" />

        <p className="mt-8 font-body text-bone-muted">
          Elige tu sede para ver el menú
        </p>

        <div className="mt-6 flex w-full max-w-md flex-col gap-3">
          {locations.map((location) => (
            <Link
              key={location.id}
              href={`/${location.slug}`}
              className="group flex items-center justify-between rounded-xl border border-brass/20 bg-surface px-6 py-4 text-left transition-colors hover:border-brass/50 hover:bg-surface-2"
            >
              <span className="flex items-center gap-3">
                {location.logo_url && (
                  <Image
                    src={location.logo_url}
                    alt=""
                    width={44}
                    height={44}
                    className="aspect-square rounded-full border border-brass/40 object-cover"
                  />
                )}
                <span>
                  <span className="block font-heading text-xl text-bone">
                    {location.name}
                  </span>
                  {location.city && (
                    <span className="block font-body text-sm text-bone-muted">
                      {location.city}
                    </span>
                  )}
                </span>
              </span>
              <span className="font-ui text-brass-light transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
