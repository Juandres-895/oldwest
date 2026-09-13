'use client'

import { createContext, useContext, useMemo, useState } from 'react'
import type { MenuDish } from '@/lib/data/menu'
import { DishDetailSheet } from './DishDetailSheet'

type DishDetailContextValue = {
  openDish: (dish: MenuDish) => void
}

const DishDetailContext = createContext<DishDetailContextValue | null>(null)

export function DishDetailProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<MenuDish | null>(null)

  const value = useMemo<DishDetailContextValue>(
    () => ({ openDish: (dish) => setSelected(dish) }),
    []
  )

  return (
    <DishDetailContext.Provider value={value}>
      {children}
      <DishDetailSheet dish={selected} onClose={() => setSelected(null)} />
    </DishDetailContext.Provider>
  )
}

export function useDishDetail() {
  const context = useContext(DishDetailContext)
  if (!context) {
    throw new Error('useDishDetail debe usarse dentro de <DishDetailProvider>')
  }
  return context
}
