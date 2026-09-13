import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

// Cliente sin cookies para lecturas públicas y anónimas (RLS: select using true).
// Seguro de usar en cualquier contexto, incluido build time (generateStaticParams),
// a diferencia del cliente de server.ts que depende de next/headers cookies().
export function createStaticClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
