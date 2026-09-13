import { BrandMark } from './BrandMark'
import type { Database } from '@/lib/supabase/database.types'

type Location = Database['public']['Tables']['locations']['Row']

export function HeroSection({ location }: { location: Location }) {
  return (
    <div className="texture-wood relative overflow-hidden px-4 pb-10 pt-10 text-center">
      <BrandMark src={location.logo_url} alt={location.name} priority />

      <div className="divider-brass mx-auto mt-6 max-w-[140px]" />

      <p className="mt-6 font-heading text-2xl text-bone">{location.name}</p>
      {(location.address || location.phone) && (
        <p className="mt-1 font-body text-sm text-bone-muted">
          {[location.address, location.phone].filter(Boolean).join(' · ')}
        </p>
      )}
    </div>
  )
}
