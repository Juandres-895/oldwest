'use server'

import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/supabase/requireUser'
import { categorySchema, type CategoryInput } from '@/lib/validation/categorySchema'
import { revalidateAllLocationPages } from '@/lib/cache/revalidateLocations'
import { revalidatePath } from 'next/cache'

export async function createCategory(input: CategoryInput) {
  await requireUser()
  const values = categorySchema.parse(input)
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('categories')
    .select('display_order')
    .order('display_order', { ascending: false })
    .limit(1)
    .maybeSingle()

  const { data, error } = await supabase
    .from('categories')
    .insert({
      ...values,
      display_order: (existing?.display_order ?? 0) + 1,
    })
    .select()
    .single()

  if (error) throw error

  revalidatePath('/admin/categorias')
  await revalidateAllLocationPages()

  return data
}

export async function updateCategory(id: string, input: CategoryInput) {
  await requireUser()
  const values = categorySchema.parse(input)
  const supabase = await createClient()

  const { error } = await supabase
    .from('categories')
    .update(values)
    .eq('id', id)

  if (error) throw error

  revalidatePath('/admin/categorias')
  await revalidateAllLocationPages()
}

export async function deleteCategory(id: string) {
  await requireUser()
  const supabase = await createClient()

  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) throw error

  revalidatePath('/admin/categorias')
  await revalidateAllLocationPages()
}

export async function reorderCategories(orderedIds: string[]) {
  await requireUser()
  const supabase = await createClient()

  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from('categories').update({ display_order: index }).eq('id', id)
    )
  )

  revalidatePath('/admin/categorias')
  await revalidateAllLocationPages()
}
