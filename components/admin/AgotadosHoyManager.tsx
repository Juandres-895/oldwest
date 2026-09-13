'use client'

import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { Switch } from '@/components/ui/Switch'
import { updateLocationMenuItem } from '@/app/admin/(dashboard)/sedes/actions'
import type { TodayAvailabilityRow } from '@/lib/data/admin'

export function AgotadosHoyManager({
  rows,
}: {
  rows: TodayAvailabilityRow[]
}) {
  const locations = useMemo(() => {
    const map = new Map<string, string>()
    rows.forEach((row) => {
      if (row.locations) map.set(row.locations.id, row.locations.name)
    })
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }))
  }, [rows])

  const [activeLocationId, setActiveLocationId] = useState(
    locations[0]?.id ?? ''
  )
  const [soldOutState, setSoldOutState] = useState<Record<string, boolean>>(
    () => Object.fromEntries(rows.map((r) => [r.id, r.is_sold_out_today]))
  )

  const visibleRows = rows
    .filter((row) => row.location_id === activeLocationId)
    .sort((a, b) =>
      (a.menu_items?.name_es ?? '').localeCompare(b.menu_items?.name_es ?? '')
    )

  function handleToggle(rowId: string, next: boolean) {
    setSoldOutState((current) => ({ ...current, [rowId]: next }))
    updateLocationMenuItem(rowId, { is_sold_out_today: next })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 overflow-x-auto">
        {locations.map((location) => (
          <button
            key={location.id}
            onClick={() => setActiveLocationId(location.id)}
            className={clsx(
              'shrink-0 rounded-full border px-4 py-2 font-ui text-sm font-medium transition-colors',
              activeLocationId === location.id
                ? 'border-brass bg-brass text-background'
                : 'border-brass/25 text-bone-muted hover:text-bone'
            )}
          >
            {location.name}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2">
        {visibleRows.map((row) => (
          <div
            key={row.id}
            className="flex items-center justify-between rounded-xl border border-brass/20 bg-surface p-4"
          >
            <span className="font-body text-base text-bone">
              {row.menu_items?.name_es}
            </span>
            <Switch
              checked={soldOutState[row.id] ?? false}
              onChange={(next) => handleToggle(row.id, next)}
              label={`Agotado hoy: ${row.menu_items?.name_es}`}
            />
          </div>
        ))}
        {visibleRows.length === 0 && (
          <p className="font-body text-sm text-bone-muted">
            Esta sede no tiene platos disponibles.
          </p>
        )}
      </div>
    </div>
  )
}
