import { Invoice } from '../Invoice'

export function InvoicePage() {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-50">
      <div className="flex-1 overflow-auto p-6">
        <Invoice />
      </div>
    </div>
  )
}
