import { z } from 'zod'

export const menuItemLocationSchema = z.object({
  location_id: z.string(),
  location_name: z.string(),
  is_available: z.boolean(),
  price_override_cop: z.union([z.number(), z.null()]),
})

export const menuItemSchema = z.object({
  category_id: z.string().min(1, 'Selecciona una categoría'),
  name_es: z.string().min(1, 'Requerido'),
  name_en: z.string().min(1, 'Requerido'),
  description_es: z.string().optional(),
  description_en: z.string().optional(),
  base_price_cop: z.number().min(0, 'Debe ser 0 o mayor'),
  is_chef_recommended: z.boolean(),
  is_new: z.boolean(),
  is_spicy: z.boolean(),
  is_vegetarian: z.boolean(),
  is_gluten_free: z.boolean(),
  locations: z.array(menuItemLocationSchema),
})

export type MenuItemInput = z.infer<typeof menuItemSchema>
export type MenuItemLocationInput = z.infer<typeof menuItemLocationSchema>
