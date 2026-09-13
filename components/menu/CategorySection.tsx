'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { MenuCategory } from '@/lib/data/menu'
import { MenuItemCard } from './MenuItemCard'

export function CategorySection({ category }: { category: MenuCategory }) {
  const { pick } = useLanguage()

  return (
    <section
      id={category.slug}
      className="scroll-mt-28 fade-in-section py-10 first:pt-6"
    >
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <h2 className="font-heading text-2xl text-brass-light sm:text-3xl">
            {pick(category.nameEs, category.nameEn)}
          </h2>
          <div className="divider-brass flex-1" />
        </div>
        {(category.taglineEs || category.taglineEn) && (
          <p className="mt-1 font-body text-sm italic text-bone-muted">
            {pick(category.taglineEs ?? '', category.taglineEn ?? '')}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {category.items.map((dish) => (
          <MenuItemCard key={dish.id} dish={dish} />
        ))}
      </div>
    </section>
  )
}
