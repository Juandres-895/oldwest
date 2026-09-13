'use client'

import { useState, useTransition } from 'react'
import type { Database } from '@/lib/supabase/database.types'
import { SortableList } from './SortableList'
import { Button } from '@/components/ui/Button'
import { inputClassName } from '@/components/ui/Field'
import { slugify } from '@/lib/utils/slugify'
import {
  createCategory,
  updateCategory,
  deleteCategory,
  reorderCategories,
} from '@/app/admin/(dashboard)/categorias/actions'

type Category = Database['public']['Tables']['categories']['Row']

export function CategoryManager({
  initialCategories,
}: {
  initialCategories: Category[]
}) {
  const [categories, setCategories] = useState(initialCategories)
  const [isPending, startTransition] = useTransition()

  function handleReorder(orderedIds: string[]) {
    startTransition(() => reorderCategories(orderedIds))
  }

  function handleCreated(category: Category) {
    setCategories((current) => [...current, category])
  }

  function handleDeleted(id: string) {
    setCategories((current) => current.filter((c) => c.id !== id))
  }

  return (
    <div className="flex flex-col gap-6">
      <SortableList
        items={categories}
        getId={(c) => c.id}
        onReorder={handleReorder}
        renderItem={(category) => (
          <CategoryRow category={category} onDeleted={handleDeleted} />
        )}
      />
      {isPending && (
        <p className="font-ui text-xs text-bone-muted">Guardando orden…</p>
      )}

      <NewCategoryForm onCreated={handleCreated} />
    </div>
  )
}

function CategoryRow({
  category,
  onDeleted,
}: {
  category: Category
  onDeleted: (id: string) => void
}) {
  const [nameEs, setNameEs] = useState(category.name_es)
  const [nameEn, setNameEn] = useState(category.name_en)
  const [taglineEs, setTaglineEs] = useState(category.tagline_es ?? '')
  const [taglineEn, setTaglineEn] = useState(category.tagline_en ?? '')
  const [isActive, setIsActive] = useState(category.is_active)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleSave() {
    setIsSaving(true)
    try {
      await updateCategory(category.id, {
        name_es: nameEs,
        name_en: nameEn,
        tagline_es: taglineEs || null,
        tagline_en: taglineEn || null,
        slug: category.slug,
        is_active: isActive,
      })
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDelete() {
    if (!confirm(`¿Eliminar la categoría "${category.name_es}"?`)) return
    setIsDeleting(true)
    try {
      await deleteCategory(category.id)
      onDeleted(category.id)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-brass/20 bg-surface p-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={nameEs}
          onChange={(e) => setNameEs(e.target.value)}
          placeholder="Nombre (ES)"
          className={inputClassName + ' sm:w-40'}
        />
        <input
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          placeholder="Nombre (EN)"
          className={inputClassName + ' sm:w-40'}
        />
        <label className="flex items-center gap-2 font-ui text-xs text-bone-muted">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Activa
        </label>
        <div className="flex gap-2 sm:ml-auto">
          <Button
            type="button"
            variant="secondary"
            onClick={handleSave}
            isLoading={isSaving}
          >
            Guardar
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Eliminar
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={taglineEs}
          onChange={(e) => setTaglineEs(e.target.value)}
          placeholder="Subtítulo (ES) — opcional"
          className={inputClassName + ' sm:flex-1'}
        />
        <input
          value={taglineEn}
          onChange={(e) => setTaglineEn(e.target.value)}
          placeholder="Subtitle (EN) — optional"
          className={inputClassName + ' sm:flex-1'}
        />
      </div>
    </div>
  )
}

function NewCategoryForm({
  onCreated,
}: {
  onCreated: (category: Category) => void
}) {
  const [nameEs, setNameEs] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [taglineEs, setTaglineEs] = useState('')
  const [taglineEn, setTaglineEn] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  async function handleCreate() {
    if (!nameEs.trim() || !nameEn.trim()) return
    setIsCreating(true)
    try {
      const category = await createCategory({
        name_es: nameEs,
        name_en: nameEn,
        tagline_es: taglineEs || null,
        tagline_en: taglineEn || null,
        slug: slugify(nameEs),
        is_active: true,
      })
      onCreated(category as unknown as Category)
      setNameEs('')
      setNameEn('')
      setTaglineEs('')
      setTaglineEn('')
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-dashed border-brass/30 p-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <input
          value={nameEs}
          onChange={(e) => setNameEs(e.target.value)}
          placeholder="Nueva categoría (ES)"
          className={inputClassName + ' sm:w-40'}
        />
        <input
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          placeholder="New category (EN)"
          className={inputClassName + ' sm:w-40'}
        />
        <Button
          type="button"
          onClick={handleCreate}
          isLoading={isCreating}
          className="sm:ml-auto"
        >
          + Agregar categoría
        </Button>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={taglineEs}
          onChange={(e) => setTaglineEs(e.target.value)}
          placeholder="Subtítulo (ES) — opcional"
          className={inputClassName + ' sm:flex-1'}
        />
        <input
          value={taglineEn}
          onChange={(e) => setTaglineEn(e.target.value)}
          placeholder="Subtitle (EN) — optional"
          className={inputClassName + ' sm:flex-1'}
        />
      </div>
    </div>
  )
}
