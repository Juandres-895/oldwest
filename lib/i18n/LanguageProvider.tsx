'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { dictionary, LANGUAGE_COOKIE, type Language } from './dictionary'

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: keyof (typeof dictionary)['es']) => string
  pick: (es: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({
  initialLanguage,
  children,
}: {
  initialLanguage: Language
  children: React.ReactNode
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    document.cookie = `${LANGUAGE_COOKIE}=${next}; path=/; max-age=31536000; SameSite=Lax`
  }, [])

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      t: (key) => dictionary[language][key],
      pick: (es, en) => (language === 'es' ? es : en) || es,
    }),
    [language, setLanguage]
  )

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  }
  return context
}
