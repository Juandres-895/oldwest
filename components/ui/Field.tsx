import clsx from 'clsx'

export function Field({
  label,
  error,
  hint,
  children,
  className,
}: {
  label: string
  error?: string
  hint?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <label className={clsx('flex flex-col gap-1.5', className)}>
      <span className="font-ui text-sm font-medium text-bone">{label}</span>
      {children}
      {hint && !error && (
        <span className="font-ui text-xs text-bone-muted">{hint}</span>
      )}
      {error && (
        <span className="font-ui text-xs text-oxblood-light">{error}</span>
      )}
    </label>
  )
}

export const inputClassName =
  'rounded-lg border border-brass/25 bg-surface px-3 py-2 font-ui text-sm text-bone placeholder:text-bone-muted/60 focus:border-brass focus:outline-none focus:ring-1 focus:ring-brass'
