import Image from 'next/image'
import clsx from 'clsx'

export function BrandMark({
  src,
  alt = 'Old West Steak House',
  size = 'md',
  priority,
}: {
  src?: string | null
  alt?: string
  size?: 'sm' | 'md'
  priority?: boolean
}) {
  return (
    <div
      className={clsx(
        'mx-auto overflow-hidden rounded-2xl border-2 border-brass/50 shadow-lg shadow-black/40',
        size === 'md' ? 'w-44 sm:w-52' : 'w-24'
      )}
    >
      <Image
        src={
          src ||
          'https://vlrzbxxfysnddznrgrwy.supabase.co/storage/v1/object/public/menu-images/brand/logo.jpg'
        }
        alt={alt}
        width={400}
        height={400}
        priority={priority}
        className="aspect-square w-full object-cover"
      />
    </div>
  )
}
