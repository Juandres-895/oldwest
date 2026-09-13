'use client'

import { formatPriceCop } from '@/lib/utils/formatPrice'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import clsx from 'clsx'

export function PriceTag({
  cop,
  className,
}: {
  cop: number
  className?: string
}) {
  const { t } = useLanguage()

  return (
    <span className={clsx('font-ui font-semibold text-brass-light', className)}>
      {cop > 0 ? formatPriceCop(cop) : t('priceOnRequest')}
    </span>
  )
}
