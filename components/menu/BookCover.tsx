import { forwardRef } from 'react'
import { BrandMark } from './BrandMark'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Database } from '@/lib/supabase/database.types'

type Location = Database['public']['Tables']['locations']['Row']

export const BookCover = forwardRef<HTMLDivElement, { location: Location }>(
  function BookCover({ location }, ref) {
    const { t } = useLanguage()

    return (
      <div
        ref={ref}
        className="texture-wood flex h-full flex-col items-center justify-center gap-6 border border-brass/25 px-6 text-center shadow-2xl shadow-black/70"
      >
        <BrandMark src={location.logo_url} alt={location.name} priority />
        <div className="divider-brass w-32" />
        <div>
          <p className="font-heading text-3xl text-bone">{location.name}</p>
          {(location.address || location.phone) && (
            <p className="mt-2 font-body text-sm text-bone-muted">
              {[location.address, location.phone].filter(Boolean).join(' · ')}
            </p>
          )}
        </div>
        <p className="mt-2 font-ui text-xs uppercase tracking-[0.2em] text-brass/70">
          {t('openMenu')}
        </p>
      </div>
    )
  }
)
