'use client'

import { QRCodeSVG } from 'qrcode.react'
import type { Database } from '@/lib/supabase/database.types'
import { buttonVariants } from '@/components/ui/buttonStyles'

type Location = Database['public']['Tables']['locations']['Row']

export function LocationQrCard({
  location,
  siteUrl,
}: {
  location: Location
  siteUrl: string
}) {
  const targetUrl = `${siteUrl}/${location.slug}`

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-brass/20 bg-surface p-6 text-center">
      <div className="rounded-lg bg-bone p-4">
        <QRCodeSVG
          value={targetUrl}
          size={180}
          level="H"
          fgColor="#1c120d"
          bgColor="#f3ecdd"
        />
      </div>
      <div>
        <p className="font-heading text-lg text-bone">{location.name}</p>
        <p className="break-all font-ui text-xs text-bone-muted">
          {targetUrl}
        </p>
      </div>
      <div className="flex gap-2">
        <a
          href={`/admin/qr/download?locationId=${location.id}&format=svg`}
          className={buttonVariants('secondary')}
        >
          Descargar SVG
        </a>
        <a
          href={`/admin/qr/download?locationId=${location.id}&format=png`}
          className={buttonVariants('secondary')}
        >
          Descargar PNG
        </a>
      </div>
    </div>
  )
}
