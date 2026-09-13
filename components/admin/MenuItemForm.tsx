'use client'

import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  menuItemSchema,
  type MenuItemInput,
} from '@/lib/validation/menuItemSchema'
import { Field, inputClassName } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import type { Database } from '@/lib/supabase/database.types'

type Category = Database['public']['Tables']['categories']['Row']

const TAG_FIELDS = [
  { key: 'is_chef_recommended', label: 'Recomendado del chef' },
  { key: 'is_new', label: 'Nuevo' },
  { key: 'is_spicy', label: 'Picante' },
  { key: 'is_vegetarian', label: 'Vegetariano' },
  { key: 'is_gluten_free', label: 'Sin gluten' },
] as const

export function MenuItemForm({
  categories,
  defaultValues,
  currentImageUrl,
  onSubmit,
  submitLabel,
}: {
  categories: Category[]
  defaultValues: MenuItemInput
  currentImageUrl?: string | null
  onSubmit: (values: MenuItemInput, imageFile: File | null) => Promise<void>
  submitLabel: string
}) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    currentImageUrl ?? null
  )

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MenuItemInput>({
    resolver: zodResolver(menuItemSchema),
    defaultValues,
  })

  const { fields } = useFieldArray({ control, name: 'locations' })

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null
    setImageFile(file)
    if (file) setPreviewUrl(URL.createObjectURL(file))
  }

  async function submit(values: MenuItemInput) {
    await onSubmit(values, imageFile)
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nombre (ES)" error={errors.name_es?.message}>
          <input className={inputClassName} {...register('name_es')} />
        </Field>
        <Field label="Name (EN)" error={errors.name_en?.message}>
          <input className={inputClassName} {...register('name_en')} />
        </Field>

        <Field label="Descripción (ES)" error={errors.description_es?.message}>
          <textarea
            rows={2}
            className={inputClassName}
            {...register('description_es')}
          />
        </Field>
        <Field label="Description (EN)" error={errors.description_en?.message}>
          <textarea
            rows={2}
            className={inputClassName}
            {...register('description_en')}
          />
        </Field>

        <Field label="Categoría" error={errors.category_id?.message}>
          <select className={inputClassName} {...register('category_id')}>
            <option value="">Selecciona…</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name_es}
              </option>
            ))}
          </select>
        </Field>

        <Field
          label="Precio base (COP)"
          error={errors.base_price_cop?.message}
        >
          <input
            type="number"
            min={0}
            step={1000}
            className={inputClassName}
            {...register('base_price_cop', { valueAsNumber: true })}
          />
        </Field>
      </div>

      <div>
        <span className="font-ui text-sm font-medium text-bone">Foto</span>
        <div className="mt-2 flex items-center gap-4">
          {previewUrl && (
            // eslint-disable-next-line @next/next/no-img-element -- blob: preview URLs aren't compatible with next/image's optimizer
            <img
              src={previewUrl}
              alt=""
              className="h-20 w-20 rounded-lg bg-surface-2 object-cover"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="font-ui text-sm text-bone-muted"
          />
        </div>
      </div>

      <div>
        <span className="font-ui text-sm font-medium text-bone">
          Etiquetas
        </span>
        <div className="mt-2 flex flex-wrap gap-4">
          {TAG_FIELDS.map((tag) => (
            <label
              key={tag.key}
              className="flex items-center gap-2 font-ui text-sm text-bone-muted"
            >
              <input type="checkbox" {...register(tag.key)} />
              {tag.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <span className="font-ui text-sm font-medium text-bone">
          Disponibilidad por sede
        </span>
        <div className="mt-2 flex flex-col gap-2">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col gap-2 rounded-xl border border-brass/20 bg-surface p-3 sm:flex-row sm:items-center"
            >
              <span className="font-body text-sm text-bone sm:w-32">
                {field.location_name}
              </span>
              <label className="flex items-center gap-2 font-ui text-xs text-bone-muted">
                <input
                  type="checkbox"
                  {...register(`locations.${index}.is_available`)}
                />
                Disponible
              </label>
              <input
                type="number"
                min={0}
                step={1000}
                placeholder="Precio especial (opcional)"
                className={inputClassName + ' sm:ml-auto sm:w-48'}
                {...register(`locations.${index}.price_override_cop`, {
                  setValueAs: (v) => (v === '' ? null : Number(v)),
                })}
              />
            </div>
          ))}
        </div>
      </div>

      <Button type="submit" isLoading={isSubmitting} className="self-start">
        {submitLabel}
      </Button>
    </form>
  )
}
