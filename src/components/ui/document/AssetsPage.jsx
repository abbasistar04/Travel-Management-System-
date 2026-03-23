import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import { AssetsCreateEditPanel } from './AssetsCreateEditPanel'

const MOCK_ASSETS = [
  { id: 1, assetsName: 'Office chair set', status: 'In used', type: 'Furniture', value: '50,000 PKR', purchaseDate: '02/03/2022' },
  { id: 2, assetsName: 'Office chair set', status: 'In used', type: 'Furniture', value: '50,000 PKR', purchaseDate: '02/03/2022' },
  { id: 3, assetsName: 'Office chair set', status: 'In used', type: 'Furniture', value: '50,000 PKR', purchaseDate: '02/03/2022' },
  { id: 4, assetsName: 'Office chair set', status: 'In used', type: 'Furniture', value: '50,000 PKR', purchaseDate: '02/03/2022' },
]

export function AssetsPage() {
  const navigate = useNavigate()
  const [showEditPanel, setShowEditPanel] = useState(false)

  return (
    <div className="flex-1 overflow-auto p-5 sm:p-7 bg-[#f4f5f7] relative page-enter">
      <AssetsCreateEditPanel isOpen={showEditPanel} onClose={() => setShowEditPanel(false)} title="Inventory Management" />
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Fixed Assets</h2>
          <p className="text-sm text-zinc-400">Inventory and physical asset tracking for the agency</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/liabilities')}>Liabilities</Button>
           <Button variant="primary" size="lg" onClick={() => setShowEditPanel(true)}>Register Asset</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Find Inventory" placeholder="Item name..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[200px]">
          <Select label="Asset Category" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Inventory</option></Select>
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Usage Status" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>Active / In Use</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Acquired Date</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">12 Sep 2024</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Asset Registry</h3>
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Annual Audit Required</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['Identifier','Asset Label','Status','Category','Market Value','Acquired On','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_ASSETS.map((row) => (
                <tr key={row.id}>
                  <td className="text-zinc-400 font-mono text-xs">{row.id}</td>
                  <td className="font-bold text-zinc-900 uppercase tracking-tight text-sm">{row.assetsName}</td>
                  <td>
                    <span className="badge badge-green">{row.status}</span>
                  </td>
                  <td>
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{row.type}</span>
                  </td>
                  <td className="font-black text-zinc-900">{row.value}</td>
                  <td className="text-zinc-500 text-xs">{row.purchaseDate}</td>
                  <td>
                    <TableRowActionButtons row={row} onEdit={() => setShowEditPanel(true)} onDelete={() => {}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
