'use client'

import { LocationForm } from '@/components/admin/LocationForm'
import { createLocation } from '@/app/admin/(dashboard)/sedes/actions'
import { uploadMenuImage } from '@/lib/supabase/uploadMenuImage'
import type { LocationInput } from '@/lib/validation/locationSchema'

export default function NuevaSedePage() {
  async function handleSubmit(values: LocationInput, logoFile: File | null) {
    const logoUrl = logoFile
      ? await uploadMenuImage(logoFile, `locations/${crypto.randomUUID()}`)
      : null
    await createLocation(values, logoUrl)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-bone">Nueva sede</h1>
        <p className="mt-1 font-body text-sm text-bone-muted">
          Se creará con todos los platos del catálogo activados por defecto —
          luego puedes ajustar la disponibilidad de cada uno.
        </p>
      </div>
      <LocationForm onSubmit={handleSubmit} submitLabel="Crear sede" />
    </div>
  )
}
