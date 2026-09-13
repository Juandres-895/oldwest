import clsx from 'clsx'
import { DishDetailProvider } from '@/components/menu/DishDetailContext'

type PageParams = { slug: string }

export default async function LocationLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<PageParams>
}) {
  const { slug } = await params

  return (
    <div className={clsx(slug === 'bellavista' && 'theme-bellavista')}>
      <DishDetailProvider>{children}</DishDetailProvider>
    </div>
  )
}
