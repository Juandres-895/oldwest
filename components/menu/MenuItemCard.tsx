'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { MenuDish } from '@/lib/data/menu'
import { PriceTag } from './PriceTag'
import { TagBadges } from './TagBadges'
import { useDishDetail } from './DishDetailContext'
import clsx from 'clsx'

export function MenuItemCard({ dish }: { dish: MenuDish }) {
  const { pick, t } = useLanguage()
  const { openDish } = useDishDetail()
  const name = pick(dish.nameEs, dish.nameEn)
  const description = pick(dish.descriptionEs ?? '', dish.descriptionEn ?? '')

  return (
    <article
      onClick={() => openDish(dish)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') openDish(dish)
      }}
      className={clsx(
        'group flex gap-4 rounded-xl border border-brass/15 bg-surface p-3 text-left transition-colors active:bg-surface-2',
        dish.isSoldOutToday && 'opacity-60'
      )}
    >
      {dish.imageUrl && (
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-surface-2 sm:h-28 sm:w-28">
          <Image
            src={dish.imageUrl}
            alt={name}
            fill
            sizes="(min-width: 640px) 112px, 96px"
            className={clsx(
              'object-cover transition-transform duration-500',
              !dish.isSoldOutToday && 'group-hover:scale-105'
            )}
          />
          {(dish.isChefRecommended || dish.isNew) && (
            <span
              className={clsx(
                'absolute left-1 top-1 rounded px-1.5 py-0.5 text-[9px] font-ui font-semibold uppercase tracking-wide text-bone',
                dish.isChefRecommended ? 'bg-brass text-background' : 'bg-oxblood'
              )}
            >
              {dish.isChefRecommended ? t('chefRecommended') : t('new')}
            </span>
          )}
          {dish.isSoldOutToday && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/70">
              <span className="rounded-full bg-background/90 px-2 py-1 text-[10px] font-ui font-semibold uppercase tracking-wide text-bone-muted">
                {t('soldOutToday')}
              </span>
            </div>
          )}
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="min-w-0 break-words font-heading text-lg leading-snug text-bone">
              {name}
            </h3>
            <PriceTag
              cop={dish.priceCop}
              className="shrink-0 whitespace-nowrap text-base"
            />
          </div>
          {description && (
            <p className="mt-1 line-clamp-2 font-body text-sm text-bone-muted">
              {description}
            </p>
          )}
        </div>
        <TagBadges dish={dish} className="mt-2" />
      </div>
    </article>
  )
}
