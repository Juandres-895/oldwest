'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import clsx from 'clsx'

const LINKS = [
  { href: '/admin', label: 'Dashboard', exact: true },
  { href: '/admin/platos', label: 'Platos' },
  { href: '/admin/categorias', label: 'Categorías' },
  { href: '/admin/sedes', label: 'Sedes' },
  { href: '/admin/agotados-hoy', label: 'Agotados hoy' },
  { href: '/admin/qr', label: 'Códigos QR' },
]

export function AdminNav({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <header className="border-b border-brass/15 bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg text-brass-light">
            Old West · Admin
          </span>
          {userEmail && (
            <span className="font-ui text-xs text-bone-muted sm:hidden">
              {userEmail}
            </span>
          )}
        </div>

        <nav className="flex flex-1 gap-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LINKS.map((link) => {
            const isActive = link.exact
              ? pathname === link.href
              : pathname.startsWith(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  'shrink-0 whitespace-nowrap font-ui text-sm font-medium transition-colors',
                  isActive
                    ? 'text-brass-light'
                    : 'text-bone-muted hover:text-bone'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-3">
          {userEmail && (
            <span className="hidden font-ui text-xs text-bone-muted sm:inline">
              {userEmail}
            </span>
          )}
          <button
            onClick={handleSignOut}
            className="font-ui text-sm font-medium text-bone-muted transition-colors hover:text-oxblood-light"
          >
            Salir
          </button>
        </div>
      </div>
    </header>
  )
}
