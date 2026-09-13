import { z } from 'zod'

export const locationSchema = z.object({
  name: z.string().min(1, 'Requerido'),
  slug: z
    .string()
    .min(1, 'Requerido')
    .regex(/^[a-z0-9-]+$/, 'Solo minúsculas, números y guiones'),
  city: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  is_active: z.boolean(),
})

export type LocationInput = z.infer<typeof locationSchema>
