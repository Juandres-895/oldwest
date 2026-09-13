'use client'

import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export function SortableList<T>({
  items,
  getId,
  onReorder,
  renderItem,
}: {
  items: T[]
  getId: (item: T) => string
  onReorder: (orderedIds: string[]) => void
  renderItem: (item: T) => React.ReactNode
}) {
  const [localItems, setLocalItems] = useState(items)
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return

    setLocalItems((current) => {
      const oldIndex = current.findIndex((item) => getId(item) === active.id)
      const newIndex = current.findIndex((item) => getId(item) === over.id)
      const reordered = arrayMove(current, oldIndex, newIndex)
      onReorder(reordered.map(getId))
      return reordered
    })
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={localItems.map(getId)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-2">
          {localItems.map((item) => (
            <SortableRow key={getId(item)} id={getId(item)}>
              {renderItem(item)}
            </SortableRow>
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}

function SortableRow({
  id,
  children,
}: {
  id: string
  children: React.ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="flex items-center gap-2"
    >
      <button
        type="button"
        className="cursor-grab touch-none px-1 text-bone-muted active:cursor-grabbing"
        aria-label="Reordenar"
        {...attributes}
        {...listeners}
      >
        ⠿
      </button>
      <div className="flex-1">{children}</div>
    </div>
  )
}
