import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllActiveLocationSlugs,
  getLocationBySlug,
  getMenuForLocation,
} from '@/lib/data/menu'
import { HeroSection } from '@/components/menu/HeroSection'
import { StickyNav } from '@/components/menu/StickyNav'
import { CategorySection } from '@/components/menu/CategorySection'
import { LocationUnavailable } from '@/components/menu/LocationUnavailable'

export const revalidate = 60

type PageParams = { slug: string }

export async function generateStaticParams() {
  const slugs = await getAllActiveLocationSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>
}): Promise<Metadata> {
  const { slug } = await params
  const location = await getLocationBySlug(slug)

  if (!location) return { title: 'Sede no encontrada' }

  return {
    title: location.name,
    description: `Menú digital de ${location.name} — Old West Steak House.`,
  }
}

export default async function LocationMenuPage({
  params,
}: {
  params: Promise<PageParams>
}) {
  const { slug } = await params
  const location = await getLocationBySlug(slug)

  if (!location) notFound()

  if (!location.is_active) {
    return <LocationUnavailable location={location} />
  }

  const menu = await getMenuForLocation(slug)
  const categories = menu?.categories ?? []

  return (
    <main className="min-h-screen bg-background pb-16">
      <HeroSection location={location} />
      {categories.length > 0 && (
        <StickyNav categories={categories} locationName={location.name} />
      )}

      <div className="mx-auto max-w-2xl divide-y divide-brass/10 px-4">
        {categories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </main>
  )
}
