'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { MenuDish } from '@/lib/data/menu'
import { PriceTag } from './PriceTag'
import { TagBadges } from './TagBadges'
import clsx from 'clsx'

export function DishDetailSheet({
  dish,
  onClose,
}: {
  dish: MenuDish | null
  onClose: () => void
}) {
  const { pick, t } = useLanguage()

  useEffect(() => {
    if (!dish) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [dish])

  if (!dish) return null

  const name = pick(dish.nameEs, dish.nameEn)
  const description = pick(dish.descriptionEs ?? '', dish.descriptionEn ?? '')

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[88vh] w-full overflow-y-auto rounded-t-2xl bg-surface shadow-2xl shadow-black/50 sm:max-w-md sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          {dish.imageUrl ? (
            <div className="relative aspect-square w-full bg-surface-2">
              <Image
                src={dish.imageUrl}
                alt={name}
                fill
                sizes="(min-width: 640px) 448px, 100vw"
                className="object-cover"
                priority
              />
            </div>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            aria-label={t('close')}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-background/80 text-lg text-bone backdrop-blur-sm"
          >
            ✕
          </button>
          {(dish.isChefRecommended || dish.isNew) && dish.imageUrl && (
            <span
              className={clsx(
                'absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-ui font-semibold uppercase tracking-wide text-bone',
                dish.isChefRecommended ? 'bg-brass text-background' : 'bg-oxblood'
              )}
            >
              {dish.isChefRecommended ? t('chefRecommended') : t('new')}
            </span>
          )}
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-2xl leading-snug text-bone">
              {name}
            </h3>
            <PriceTag
              cop={dish.priceCop}
              className="shrink-0 whitespace-nowrap text-lg"
            />
          </div>

          {dish.isSoldOutToday && (
            <p className="mt-2 inline-block rounded-full bg-background/90 px-3 py-1 text-xs font-ui font-semibold uppercase tracking-wide text-bone-muted">
              {t('soldOutToday')}
            </p>
          )}

          {description && (
            <p className="mt-3 whitespace-pre-line font-body text-base leading-relaxed text-bone-muted">
              {description}
            </p>
          )}

          <TagBadges dish={dish} className="mt-4" />
        </div>
      </div>
    </div>
  )
}
