'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { MenuDish } from '@/lib/data/menu'
import clsx from 'clsx'

type TagBadgesProps = {
  dish: Pick<
    MenuDish,
    'isSpicy' | 'isVegetarian' | 'isGlutenFree' | 'isSoldOutToday'
  >
  className?: string
}

export function TagBadges({ dish, className }: TagBadgesProps) {
  const { t } = useLanguage()

  const tags = [
    dish.isSpicy && { key: 'spicy', label: t('spicy'), tone: 'oxblood' },
    dish.isVegetarian && {
      key: 'vegetarian',
      label: t('vegetarian'),
      tone: 'sage',
    },
    dish.isGlutenFree && {
      key: 'glutenFree',
      label: t('glutenFree'),
      tone: 'sage',
    },
  ].filter(Boolean) as { key: string; label: string; tone: 'oxblood' | 'sage' }[]

  if (tags.length === 0) return null

  return (
    <div className={clsx('flex flex-wrap gap-1.5', className)}>
      {tags.map((tag) => (
        <span
          key={tag.key}
          className={clsx(
            'rounded-full px-2 py-0.5 text-[10px] font-ui font-medium uppercase tracking-wide text-bone',
            tag.tone === 'oxblood' ? 'bg-oxblood' : 'bg-sage'
          )}
        >
          {tag.label}
        </span>
      ))}
    </div>
  )
}
