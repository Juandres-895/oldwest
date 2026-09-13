// Tipos generados a mano a partir de supabase/migrations/0001_init.sql.
// Si en el futuro se usa la CLI de Supabase, reemplazar con:
//   supabase gen types typescript --project-id <id> > lib/supabase/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      locations: {
        Row: {
          id: string
          slug: string
          name: string
          city: string | null
          address: string | null
          phone: string | null
          logo_url: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name: string
          city?: string | null
          address?: string | null
          phone?: string | null
          logo_url?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['locations']['Insert']>
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          slug: string
          name_es: string
          name_en: string
          tagline_es: string | null
          tagline_en: string | null
          display_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          slug: string
          name_es: string
          name_en: string
          tagline_es?: string | null
          tagline_en?: string | null
          display_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['categories']['Insert']>
        Relationships: []
      }
      menu_items: {
        Row: {
          id: string
          category_id: string
          slug: string
          name_es: string
          name_en: string
          description_es: string | null
          description_en: string | null
          base_price_cop: number
          image_url: string | null
          image_blur_data_url: string | null
          is_chef_recommended: boolean
          is_new: boolean
          is_spicy: boolean
          is_vegetarian: boolean
          is_gluten_free: boolean
          display_order: number
          is_archived: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          slug: string
          name_es: string
          name_en: string
          description_es?: string | null
          description_en?: string | null
          base_price_cop: number
          image_url?: string | null
          image_blur_data_url?: string | null
          is_chef_recommended?: boolean
          is_new?: boolean
          is_spicy?: boolean
          is_vegetarian?: boolean
          is_gluten_free?: boolean
          display_order?: number
          is_archived?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: Partial<Database['public']['Tables']['menu_items']['Insert']>
        Relationships: [
          {
            foreignKeyName: 'menu_items_category_id_fkey'
            columns: ['category_id']
            referencedRelation: 'categories'
            referencedColumns: ['id']
          },
        ]
      }
      location_menu_items: {
        Row: {
          id: string
          location_id: string
          menu_item_id: string
          is_available: boolean
          price_override_cop: number | null
          is_sold_out_today: boolean
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          location_id: string
          menu_item_id: string
          is_available?: boolean
          price_override_cop?: number | null
          is_sold_out_today?: boolean
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: Partial<
          Database['public']['Tables']['location_menu_items']['Insert']
        >
        Relationships: [
          {
            foreignKeyName: 'location_menu_items_location_id_fkey'
            columns: ['location_id']
            referencedRelation: 'locations'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'location_menu_items_menu_item_id_fkey'
            columns: ['menu_item_id']
            referencedRelation: 'menu_items'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}
