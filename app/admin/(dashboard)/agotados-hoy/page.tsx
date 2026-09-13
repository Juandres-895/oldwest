import { getAllLocationMenuRowsForToday } from '@/lib/data/admin'
import { AgotadosHoyManager } from '@/components/admin/AgotadosHoyManager'

export default async function AgotadosHoyPage() {
  const rows = await getAllLocationMenuRowsForToday()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="font-heading text-2xl text-bone">Agotados hoy</h1>
        <p className="mt-1 font-body text-sm text-bone-muted">
          Marca lo que se acabó — se refleja al instante en el menú de esa
          sede. Vuelve a desactivarlo para el próximo servicio.
        </p>
      </div>

      <AgotadosHoyManager rows={rows} />
    </div>
  )
}
