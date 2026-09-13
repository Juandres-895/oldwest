'use client'

import { useLanguage } from '@/lib/i18n/LanguageProvider'
import clsx from 'clsx'

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  return (
    <div
      className="relative flex items-center rounded-full border border-brass/30 bg-surface/80 p-0.5 font-ui text-xs font-semibold"
      role="group"
      aria-label="Idioma / Language"
    >
      <span
        className={clsx(
          'absolute top-0.5 bottom-0.5 w-8 rounded-full bg-brass transition-transform duration-200 ease-out',
          language === 'en' ? 'translate-x-8' : 'translate-x-0'
        )}
        aria-hidden
      />
      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={clsx(
          'relative z-10 w-8 rounded-full py-1 text-center transition-colors',
          language === 'es' ? 'text-background' : 'text-bone-muted'
        )}
        aria-pressed={language === 'es'}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={clsx(
          'relative z-10 w-8 rounded-full py-1 text-center transition-colors',
          language === 'en' ? 'text-background' : 'text-bone-muted'
        )}
        aria-pressed={language === 'en'}
      >
        EN
      </button>
    </div>
  )
}
