import { cookies } from 'next/headers'
import { LanguageProvider } from '@/lib/i18n/LanguageProvider'
import { LANGUAGE_COOKIE, type Language } from '@/lib/i18n/dictionary'

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const cookieLanguage = cookieStore.get(LANGUAGE_COOKIE)?.value
  const initialLanguage: Language = cookieLanguage === 'en' ? 'en' : 'es'

  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      {children}
    </LanguageProvider>
  )
}
