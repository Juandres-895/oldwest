'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { BrandMark } from '@/components/menu/BrandMark'

export default function LocationNotFound() {
  const { t } = useLanguage()

  return (
    <main className="texture-wood flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <BrandMark size="sm" />
      <h1 className="mt-4 font-heading text-2xl text-brass-light">
        {t('notFoundTitle')}
      </h1>
      <p className="mt-2 max-w-sm font-body text-bone-muted">
        {t('notFoundBody')}
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full border border-brass/40 px-6 py-2 font-ui text-sm font-medium text-brass-light transition-colors hover:bg-brass/10"
      >
        {t('backHome')}
      </Link>
    </main>
  )
}
