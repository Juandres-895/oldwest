'use client'

import { useMemo, useState } from 'react'
import { useDebouncedCallback } from '@/lib/hooks/useDebouncedCallback'
import { SortableList } from './SortableList'
import { inputClassName } from '@/components/ui/Field'
import { formatPriceCop } from '@/lib/utils/formatPrice'
import type { LocationMenuRow } from '@/lib/data/admin'
import {
  updateLocationMenuItem,
  reorderLocationMenuItems,
} from '@/app/admin/(dashboard)/sedes/actions'

export function LocationMenuManager({ rows }: { rows: LocationMenuRow[] }) {
  const grouped = useMemo(() => {
    const byCategory = new Map<
      string,
      { name: string; rows: LocationMenuRow[] }
    >()

    for (const row of rows) {
      const category = row.menu_items?.categories
      if (!category) continue
      if (!byCategory.has(category.id)) {
        byCategory.set(category.id, { name: category.name_es, rows: [] })
      }
      byCategory.get(category.id)!.rows.push(row)
    }

    return Array.from(byCategory.values())
  }, [rows])

  return (
    <div className="flex flex-col gap-8">
      {grouped.map((group) => (
        <div key={group.name}>
          <h3 className="mb-3 font-heading text-lg text-brass-light">
            {group.name}
          </h3>
          <SortableList
            items={group.rows}
            getId={(row) => row.id}
            onReorder={(ids) => reorderLocationMenuItems(ids)}
            renderItem={(row) => <MenuItemRow row={row} />}
          />
        </div>
      ))}
    </div>
  )
}

function MenuItemRow({ row }: { row: LocationMenuRow }) {
  const dish = row.menu_items
  const [isAvailable, setIsAvailable] = useState(row.is_available)
  const [isSoldOut, setIsSoldOut] = useState(row.is_sold_out_today)
  const [priceOverride, setPriceOverride] = useState(
    row.price_override_cop?.toString() ?? ''
  )

  const debouncedPriceUpdate = useDebouncedCallback((value: string) => {
    updateLocationMenuItem(row.id, {
      price_override_cop: value === '' ? null : Number(value),
    })
  }, 600)

  if (!dish) return null

  return (
    <div className="flex flex-col gap-2 rounded-xl border border-brass/20 bg-surface p-3 sm:flex-row sm:items-center">
      <div className="min-w-0 flex-1">
        <p className="truncate font-body text-sm text-bone">{dish.name_es}</p>
        <p className="font-ui text-xs text-bone-muted">
          Base: {formatPriceCop(dish.base_price_cop)}
        </p>
      </div>

      <input
        type="number"
        min={0}
        step={1000}
        placeholder="Precio en esta sede"
        value={priceOverride}
        onChange={(e) => {
          setPriceOverride(e.target.value)
          debouncedPriceUpdate(e.target.value)
        }}
        className={inputClassName + ' w-40'}
      />

      <label className="flex items-center gap-2 font-ui text-xs text-bone-muted">
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => {
            setIsAvailable(e.target.checked)
            updateLocationMenuItem(row.id, { is_available: e.target.checked })
          }}
        />
        Disponible
      </label>

      <label className="flex items-center gap-2 font-ui text-xs text-bone-muted">
        <input
          type="checkbox"
          checked={isSoldOut}
          onChange={(e) => {
            setIsSoldOut(e.target.checked)
            updateLocationMenuItem(row.id, {
              is_sold_out_today: e.target.checked,
            })
          }}
        />
        Agotado hoy
      </label>
    </div>
  )
}
