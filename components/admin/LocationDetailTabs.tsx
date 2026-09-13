'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import type { Database } from '@/lib/supabase/database.types'
import type { LocationMenuRow } from '@/lib/data/admin'
import { LocationForm } from './LocationForm'
import { LocationMenuManager } from './LocationMenuManager'
import { LocationQrCard } from './LocationQrCard'
import { Button } from '@/components/ui/Button'
import type { LocationInput } from '@/lib/validation/locationSchema'
import { updateLocation, deleteLocation } from '@/app/admin/(dashboard)/sedes/actions'
import { uploadMenuImage } from '@/lib/supabase/uploadMenuImage'

type Location = Database['public']['Tables']['locations']['Row']

const TABS = ['Datos generales', 'Menú de esta sede', 'Código QR'] as const

export function LocationDetailTabs({
  location,
  menuRows,
  siteUrl,
}: {
  location: Location
  menuRows: LocationMenuRow[]
  siteUrl: string
}) {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>(TABS[0])
  const router = useRouter()

  async function handleUpdate(values: LocationInput, logoFile: File | null) {
    const logoUrl = logoFile
      ? await uploadMenuImage(logoFile, `locations/${location.id}`)
      : undefined
    await updateLocation(location.id, values, logoUrl)
    router.refresh()
  }

  async function handleDelete() {
    if (
      !confirm(
        `¿Eliminar "${location.name}"? Esto borra también su disponibilidad de menú. Esta acción no se puede deshacer.`
      )
    )
      return
    await deleteLocation(location.id)
    router.push('/admin/sedes')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4 border-b border-brass/15">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={clsx(
              'border-b-2 pb-2 font-ui text-sm font-medium transition-colors',
              activeTab === tab
                ? 'border-brass text-brass-light'
                : 'border-transparent text-bone-muted hover:text-bone'
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Datos generales' && (
        <div className="flex flex-col gap-6">
          <LocationForm
            defaultValues={{
              name: location.name,
              slug: location.slug,
              city: location.city ?? '',
              address: location.address ?? '',
              phone: location.phone ?? '',
              is_active: location.is_active,
            }}
            currentLogoUrl={location.logo_url}
            onSubmit={handleUpdate}
            submitLabel="Guardar cambios"
          />
          <div className="border-t border-brass/15 pt-4">
            <Button variant="danger" onClick={handleDelete}>
              Eliminar sede
            </Button>
          </div>
        </div>
      )}

      {activeTab === 'Menú de esta sede' && (
        <LocationMenuManager rows={menuRows} />
      )}

      {activeTab === 'Código QR' && (
        <div className="max-w-xs">
          <LocationQrCard location={location} siteUrl={siteUrl} />
        </div>
      )}
    </div>
  )
}
