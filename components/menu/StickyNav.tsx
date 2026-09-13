'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { MenuCategory } from '@/lib/data/menu'
import { LanguageToggle } from './LanguageToggle'
import clsx from 'clsx'

export function StickyNav({
  categories,
  locationName,
}: {
  categories: MenuCategory[]
  locationName: string
}) {
  const { pick } = useLanguage()
  const [activeSlug, setActiveSlug] = useState(categories[0]?.slug)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sections = categories
      .map((c) => document.getElementById(c.slug))
      .filter((el): el is HTMLElement => Boolean(el))

    if (sections.length === 0) return

    // Below the sticky nav (~112px tall) — a section becomes "active" once
    // its top crosses above this line.
    const ACTIVATION_LINE = 130

    function updateActive() {
      const nearBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2
      if (nearBottom) {
        setActiveSlug(sections[sections.length - 1].id)
        return
      }

      let current = sections[0].id
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= ACTIVATION_LINE) {
          current = section.id
        } else {
          break
        }
      }
      setActiveSlug(current)
    }

    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        updateActive()
        ticking = false
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    updateActive()
    return () => window.removeEventListener('scroll', onScroll)
  }, [categories])

  useEffect(() => {
    if (!activeSlug || !navRef.current) return
    const activeButton = navRef.current.querySelector<HTMLElement>(
      `[data-slug="${activeSlug}"]`
    )
    activeButton?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeSlug])

  return (
    <div className="sticky top-0 z-40 border-b border-brass/15 bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-2xl items-center gap-3 px-4 py-3">
        <div
          ref={navRef}
          className="flex flex-1 gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {categories.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              data-slug={category.slug}
              className={clsx(
                'shrink-0 whitespace-nowrap border-b-2 pb-1 font-ui text-sm font-medium tracking-wide transition-colors',
                activeSlug === category.slug
                  ? 'border-brass text-brass-light'
                  : 'border-transparent text-bone-muted hover:text-bone'
              )}
            >
              {pick(category.nameEs, category.nameEn)}
            </a>
          ))}
        </div>
        <LanguageToggle />
      </div>
      <span className="sr-only">{locationName}</span>
    </div>
  )
}
