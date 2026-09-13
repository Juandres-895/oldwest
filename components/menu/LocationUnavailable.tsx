'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Database } from '@/lib/supabase/database.types'
import { BrandMark } from './BrandMark'

type Location = Database['public']['Tables']['locations']['Row']

export function LocationUnavailable({ location }: { location: Location }) {
  const { t } = useLanguage()

  return (
    <main className="texture-wood flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <BrandMark src={location.logo_url} alt={location.name} size="sm" />
      <h1 className="mt-4 font-heading text-3xl text-bone">{location.name}</h1>
      <div className="divider-brass mx-auto mt-6 max-w-[100px]" />
      <p className="mt-6 font-heading text-xl text-brass-light">
        {t('locationUnavailableTitle')}
      </p>
      <p className="mt-2 max-w-sm font-body text-bone-muted">
        {t('locationUnavailableBody')}
      </p>
    </main>
  )
}
