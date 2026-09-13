'use client'

import { useCallback, useMemo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { MenuCategory, MenuDish } from '@/lib/data/menu'
import type { Database } from '@/lib/supabase/database.types'
import { BookCover } from './BookCover'
import { CategoryPage } from './CategoryPage'
import { LanguageToggle } from './LanguageToggle'

type Location = Database['public']['Tables']['locations']['Row']

const HTMLFlipBook = dynamic(() => import('react-pageflip'), { ssr: false })

// react-pageflip's ref exposes `.pageFlip()` with the underlying PageFlip
// instance (flipNext/flipPrev/flip/turnToPage) — no shipped types for the
// component instance itself.
type FlipBookRef = { pageFlip: () => PageFlipInstance }
type PageFlipInstance = {
  flipNext: () => void
  flipPrev: () => void
  turnToPage: (page: number) => void
  getCurrentPageIndex: () => number
}

// Conservative item count per physical page — keeps every page's content
// within the fixed page height without ever needing inner scroll, which
// would otherwise fight the book's own swipe-to-flip touch handling.
const ITEMS_PER_PAGE = 3

type BookPage = {
  category: MenuCategory
  items: MenuDish[]
  partIndex: number
  partCount: number
}

function chunk<T>(items: T[], size: number): T[][] {
  if (items.length === 0) return [[]]
  const chunks: T[][] = []
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size))
  }
  return chunks
}

export function MenuBook({
  location,
  categories,
}: {
  location: Location
  categories: MenuCategory[]
}) {
  const { pick, t } = useLanguage()
  const bookRef = useRef<FlipBookRef | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [showToc, setShowToc] = useState(false)

  const bookPages = useMemo<BookPage[]>(() => {
    const pages: BookPage[] = []
    for (const category of categories) {
      const chunks = chunk(category.items, ITEMS_PER_PAGE)
      chunks.forEach((items, partIndex) => {
        pages.push({ category, items, partIndex, partCount: chunks.length })
      })
    }
    return pages
  }, [categories])

  const categoryFirstPage = useMemo(() => {
    const firstPageByCategoryId = new Map<string, number>()
    bookPages.forEach((page, index) => {
      if (page.partIndex === 0 && !firstPageByCategoryId.has(page.category.id)) {
        firstPageByCategoryId.set(page.category.id, index + 1) // +1 for cover
      }
    })
    return firstPageByCategoryId
  }, [bookPages])

  const totalPages = bookPages.length + 1 // + cover
  const currentBookPageIndex = currentPage - 1 // -1 while on the cover
  const currentBookPage =
    currentBookPageIndex >= 0 ? bookPages[currentBookPageIndex] : null

  const goToPage = useCallback((page: number) => {
    bookRef.current?.pageFlip().turnToPage(page)
    setShowToc(false)
  }, [])

  const pages = useMemo(
    () =>
      bookPages.map((page, index) => (
        <CategoryPage
          key={`${page.category.id}-${page.partIndex}`}
          category={page.category}
          items={page.items}
          partIndex={page.partIndex}
          partCount={page.partCount}
          pageLabel={`${index + 1} ${t('pageOf')} ${bookPages.length}`}
        />
      )),
    [bookPages, t]
  )

  return (
    <div className="flex h-[100dvh] flex-col bg-background">
      <div className="flex items-center justify-between gap-3 border-b border-brass/15 bg-background/95 px-4 py-3 backdrop-blur-sm">
        <button
          type="button"
          onClick={() => setShowToc(true)}
          className="flex items-center gap-2 rounded-full border border-brass/30 px-3 py-1.5 font-ui text-xs font-medium text-bone-muted transition-colors hover:text-bone"
        >
          <span aria-hidden>☰</span>
          {t('tableOfContents')}
        </button>

        <p className="min-w-0 flex-1 truncate text-center font-heading text-base text-brass-light">
          {currentBookPage
            ? pick(currentBookPage.category.nameEs, currentBookPage.category.nameEn)
            : location.name}
        </p>

        <LanguageToggle />
      </div>

      <div className="relative flex flex-1 items-center justify-center overflow-hidden bg-[radial-gradient(ellipse_at_center,_rgba(0,0,0,0)_0%,_rgba(0,0,0,0.35)_100%)] px-1 py-2 sm:px-6 sm:py-4">
        <button
          type="button"
          aria-label="Previous"
          onClick={() => bookRef.current?.pageFlip().flipPrev()}
          disabled={currentPage <= 0}
          className="absolute left-1 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-brass/30 bg-surface/90 text-xl text-brass-light shadow-lg disabled:opacity-30 sm:left-4"
        >
          ‹
        </button>

        <HTMLFlipBook
          ref={bookRef}
          width={340}
          height={600}
          size="stretch"
          minWidth={280}
          maxWidth={480}
          minHeight={500}
          maxHeight={820}
          maxShadowOpacity={0.5}
          showCover
          usePortrait
          mobileScrollSupport={false}
          className="menu-flipbook"
          style={{}}
          startPage={0}
          drawShadow
          flippingTime={700}
          startZIndex={0}
          autoSize
          swipeDistance={30}
          showPageCorners
          disableFlipByClick={false}
          useMouseEvents
          clickEventForward
          onFlip={(e: { data: number }) => setCurrentPage(e.data)}
        >
          <BookCover location={location} />
          {pages}
        </HTMLFlipBook>

        <button
          type="button"
          aria-label="Next"
          onClick={() => bookRef.current?.pageFlip().flipNext()}
          disabled={currentPage >= totalPages - 1}
          className="absolute right-1 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-brass/30 bg-surface/90 text-xl text-brass-light shadow-lg disabled:opacity-30 sm:right-4"
        >
          ›
        </button>
      </div>

      {showToc && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-background/80 backdrop-blur-sm sm:items-center"
          onClick={() => setShowToc(false)}
        >
          <div
            className="max-h-[80vh] w-full max-w-sm overflow-y-auto rounded-t-2xl bg-surface p-5 shadow-2xl sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-xl text-bone">
                {t('menuCategories')}
              </h2>
              <button
                type="button"
                onClick={() => setShowToc(false)}
                aria-label={t('close')}
                className="text-bone-muted"
              >
                ✕
              </button>
            </div>
            <button
              type="button"
              onClick={() => goToPage(0)}
              className="mb-1 w-full rounded-lg px-3 py-2 text-left font-ui text-sm text-brass-light hover:bg-surface-2"
            >
              {t('backToCover')}
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  goToPage(categoryFirstPage.get(category.id) ?? 1)
                }
                className="w-full rounded-lg px-3 py-2 text-left font-body text-sm text-bone hover:bg-surface-2"
              >
                {pick(category.nameEs, category.nameEn)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
