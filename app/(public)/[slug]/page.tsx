import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import {
  getAllActiveLocationSlugs,
  getLocationBySlug,
  getMenuForLocation,
} from '@/lib/data/menu'
import { HeroSection } from '@/components/menu/HeroSection'
import { MenuBook } from '@/components/menu/MenuBook'
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

  if (categories.length === 0) {
    return (
      <main className="min-h-screen bg-background pb-16">
        <HeroSection location={location} />
      </main>
    )
  }

  return <MenuBook location={location} categories={categories} />
}
