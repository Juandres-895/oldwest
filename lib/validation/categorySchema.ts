import { z } from 'zod'

export const categorySchema = z.object({
  name_es: z.string().min(1, 'Requerido'),
  name_en: z.string().min(1, 'Requerido'),
  tagline_es: z.string().optional().nullable(),
  tagline_en: z.string().optional().nullable(),
  slug: z.string().min(1, 'Requerido'),
  is_active: z.boolean(),
})

export type CategoryInput = z.infer<typeof categorySchema>
