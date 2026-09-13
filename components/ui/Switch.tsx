'use client'

import clsx from 'clsx'

export function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={clsx(
        'relative h-7 w-12 shrink-0 rounded-full transition-colors',
        checked ? 'bg-oxblood' : 'bg-surface-2'
      )}
    >
      <span
        className={clsx(
          'absolute top-1 left-1 h-5 w-5 rounded-full bg-bone transition-transform',
          checked && 'translate-x-5'
        )}
      />
    </button>
  )
}
