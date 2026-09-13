import clsx from 'clsx'

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost'

export function buttonVariants(
  variant: ButtonVariant = 'primary',
  className?: string
) {
  return clsx(
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-ui text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50',
    variant === 'primary' &&
      'bg-brass text-background hover:bg-brass-light',
    variant === 'secondary' &&
      'border border-brass/30 text-bone hover:bg-surface-2',
    variant === 'danger' && 'bg-oxblood text-bone hover:bg-oxblood-light',
    variant === 'ghost' && 'text-bone-muted hover:text-bone',
    className
  )
}
