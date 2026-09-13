'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { locationSchema, type LocationInput } from '@/lib/validation/locationSchema'
import { Field, inputClassName } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { slugify } from '@/lib/utils/slugify'

export function LocationForm({
  defaultValues,
  currentLogoUrl,
  onSubmit,
  submitLabel,
}: {
  defaultValues?: Partial<LocationInput>
  currentLogoUrl?: string | null
  onSubmit: (values: LocationInput, logoFile: File | null) => Promise<void>
  submitLabel: string
}) {
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(currentLogoUrl ?? null)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LocationInput>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      name: '',
      slug: '',
      city: '',
      address: '',
      phone: '',
      is_active: true,
      ...defaultValues,
    },
  })

  const isNew = !defaultValues?.slug

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setLogoFile(file)
    if (file) setPreviewUrl(URL.createObjectURL(file))
  }

  async function submit(values: LocationInput) {
    await onSubmit(values, logoFile)
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex max-w-lg flex-col gap-4">
      <Field label="Nombre de la sede" error={errors.name?.message}>
        <input
          className={inputClassName}
          {...register('name', {
            onChange: (e) => {
              if (isNew) setValue('slug', slugify(e.target.value))
            },
          })}
        />
      </Field>

      <Field
        label="Slug (URL del menú)"
        error={errors.slug?.message}
        hint={`Los comensales verán: tudominio.com/${watch('slug') || 'slug'}`}
      >
        <input className={inputClassName} {...register('slug')} />
      </Field>

      <Field label="Ciudad" error={errors.city?.message}>
        <input className={inputClassName} {...register('city')} />
      </Field>

      <Field label="Dirección" error={errors.address?.message}>
        <input className={inputClassName} {...register('address')} />
      </Field>

      <Field label="Teléfono" error={errors.phone?.message}>
        <input className={inputClassName} {...register('phone')} />
      </Field>

      <div>
        <span className="font-ui text-sm font-medium text-bone">
          Logo propio de la sede
        </span>
        <p className="mt-0.5 font-ui text-xs text-bone-muted">
          Opcional. Si esta sede no tiene uno, se muestra el logo general de
          Old West.
        </p>
        <div className="mt-2 flex items-center gap-4">
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- blob: preview URLs aren't compatible with next/image's optimizer
            <img
              src={previewUrl}
              alt=""
              className="h-16 w-16 rounded-lg bg-surface-2 object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="font-ui text-sm text-bone-muted"
          />
        </div>
      </div>

      <label className="flex items-center gap-2 font-ui text-sm text-bone">
        <input type="checkbox" {...register('is_active')} />
        Sede activa (visible para comensales)
      </label>

      <Button type="submit" isLoading={isSubmitting} className="mt-2 self-start">
        {submitLabel}
      </Button>
    </form>
  )
}
