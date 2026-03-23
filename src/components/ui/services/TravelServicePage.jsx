import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

const MOCK_SERVICES = [
  { no: '01', vehicle: 'Executive Sedan (BMW 5 Series)', category: 'Airport Transfer', driver: 'Majid Ali', contact: '+971 50 XXXXXX', basePrice: '250 AED', status: 'Active' },
  { no: '02', vehicle: 'GMC Yukon XL', category: 'City Tour', driver: 'Nadeem Khan', contact: '+971 50 XXXXXX', basePrice: '800 AED', status: 'Active' },
]

export function TravelServicePage() {
  const navigate = useNavigate()
  const [showCreatePanel, setShowCreatePanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)

  useEffect(() => {
    if (showCreatePanel) {
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    }
    setPanelSlidIn(false)
  }, [showCreatePanel])

  return (
    <div className="flex-1 overflow-auto p-5 sm:p-7 bg-[#f4f5f7] relative page-enter">
      {/* ── Slide Panel ── */}
      {showCreatePanel && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => setShowCreatePanel(false)} aria-hidden />
          <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${panelSlidIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
             <div className="flex items-center justify-between p-5 border-b border-zinc-100 bg-[#fef2f2] shrink-0">
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">Fleet Deployment</h3>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={() => setShowCreatePanel(false)} />
                   <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={() => setShowCreatePanel(false)}>Deploy Vehicle</Button>
                </div>
             </div>
             <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
                <Input label="Vehicle Model & Year" placeholder="e.g. Mercedes V-Class 2024" />
                <div className="grid grid-cols-2 gap-4">
                   <Select label="Fleet Category">
                      <option>Luxury Sedan</option>
                      <option>SUV / Family</option>
                      <option>Group Van</option>
                      <option>Motorcoach</option>
                   </Select>
                   <Input label="Daily Base Rate (AED)" type="number" placeholder="400" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Assigned Driver" placeholder="Full name..." />
                   <Input label="Driver Mobile" placeholder="+971..." />
                </div>
                <div className="p-4 bg-zinc-900 rounded-3xl">
                   <p className="text-[10px] font-black text-[#c60000] uppercase tracking-widest mb-2">Service Radius</p>
                   <Select className="!bg-zinc-800 !text-white !border-0 text-sm">
                      <option>Intra-city (Dubai/Sharjah)</option>
                      <option>Inter-emirate (AUH/RAK)</option>
                      <option>Nationwide KSA</option>
                   </Select>
                </div>
             </div>
          </div>
        </>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Transport & Fleet Port</h2>
          <p className="text-sm text-zinc-400">Manage vehicle logistics, chauffeur assignments, and intra-city transfer routes</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/overseas-travel-tourism')}>Tourism Port</Button>
           <Button variant="primary" size="lg" onClick={() => setShowCreatePanel(true)}>Add Vehicle</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Search Fleet" placeholder="Driver or vehicle..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[200px]">
          <Select label="Deployment Zone" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Destinations</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Deployment Date</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">Today's Fleet</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Active Transport Inventory</h3>
          <span className="text-[10px] font-black text-[#c60000] uppercase tracking-widest">Fleet Status: Online</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['ID','Vehicle Model','Fleet Class','Assigned Operator','Contact Contact','Base Rate','Status','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_SERVICES.map((row) => (
                <tr key={row.no}>
                  <td className="text-zinc-400 font-mono text-xs">{row.no}</td>
                  <td>
                    <span className="font-bold text-zinc-900 uppercase tracking-tight text-sm">{row.vehicle}</span>
                  </td>
                  <td>
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100">{row.category}</span>
                  </td>
                  <td className="text-zinc-900 font-bold text-xs">{row.driver}</td>
                  <td className="text-zinc-500 font-medium text-xs font-mono">{row.contact}</td>
                  <td className="font-black text-zinc-900">{row.basePrice}</td>
                  <td>
                    <span className="badge badge-green">Ready</span>
                  </td>
                  <td>
                    <TableRowActionButtons row={row} onEdit={() => setShowCreatePanel(true)} onDelete={() => {}} />
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
