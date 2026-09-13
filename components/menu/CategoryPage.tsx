import { forwardRef } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { MenuCategory } from '@/lib/data/menu'
import { MenuItemCard } from './MenuItemCard'

export const CategoryPage = forwardRef<
  HTMLDivElement,
  { category: MenuCategory; pageLabel: string }
>(function CategoryPage({ category, pageLabel }, ref) {
  const { pick, t } = useLanguage()

  return (
    <div
      ref={ref}
      className="flex h-full flex-col border border-brass/25 bg-surface text-bone shadow-2xl shadow-black/70"
    >
      <div className="flex-1 overflow-y-auto px-5 pb-4 pt-8 sm:px-7">
        <h2 className="font-heading text-2xl text-brass-light sm:text-3xl">
          {pick(category.nameEs, category.nameEn)}
        </h2>
        {(category.taglineEs || category.taglineEn) && (
          <p className="mt-1 font-body text-sm italic text-bone-muted">
            {pick(category.taglineEs ?? '', category.taglineEn ?? '')}
          </p>
        )}
        <div className="divider-brass mt-4 mb-5" />

        {category.items.length === 0 ? (
          <p className="font-body text-sm text-bone-muted">
            {t('emptyCategory')}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {category.items.map((dish) => (
              <MenuItemCard key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-brass/15 px-5 py-2 text-center font-ui text-[11px] tracking-widest text-bone-muted/70 sm:px-7">
        {pageLabel}
      </div>
    </div>
  )
})
