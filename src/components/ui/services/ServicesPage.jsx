import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

const MOCK_SERVICES = [
  { no: 1, name: 'Muhammad Bassari', travellerType: 'Adult', createdDate: '2024-09-12', createdBy: 'Mr Usman', lastTravel: 'Dubai to Pakistan', active: true },
  { no: 2, name: 'Abu Mehdi', travellerType: 'Adult', createdDate: '2024-09-12', createdBy: 'Mr Usman', lastTravel: 'USA to Makkah', active: true },
  { no: 3, name: 'Suleman', travellerType: 'Adult', createdDate: '2024-09-12', createdBy: 'Mr Usman', lastTravel: 'Pakistan to Dubai', active: true },
  { no: 4, name: 'Azeez', travellerType: 'Adult', createdDate: '2024-09-12', createdBy: 'Mr Usman', lastTravel: 'Dubai to Pakistan', active: false },
]

export function ServicesPage() {
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
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">Configure Transport</h3>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={() => setShowCreatePanel(false)} />
                   <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={() => setShowCreatePanel(false)}>Save Service</Button>
                </div>
             </div>
             <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
                <Input label="Registry Date" type="date" defaultValue="2023-08-03" />
                <Select label="Transport Category">
                   <option>Airport Pickup</option>
                   <option>Inter-city Transfer</option>
                   <option>Executive Chauffeur</option>
                </Select>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Vehicle Model" placeholder="e.g. GMC Yukon" />
                   <Input label="Pax Capacity" type="number" defaultValue="4" />
                </div>
                <Input label="Base Price (AED)" placeholder="0.00" />
                <div className="mt-auto p-5 bg-zinc-900 rounded-3xl text-white">
                   <p className="text-[10px] font-black uppercase tracking-widest text-[#c60000] mb-1">PRO TIP</p>
                   <p className="text-xs text-zinc-400 leading-relaxed">Ensure dynamic routing is enabled for real-time tracking of this service across journeys.</p>
                </div>
             </div>
          </div>
        </>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Global Services</h2>
          <p className="text-sm text-zinc-400">Master catalogue of all available travel and logistics offerings</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/accommodation-services')}>Accommodations</Button>
           <Button variant="primary" size="lg" onClick={() => setShowCreatePanel(true)}>Create Service</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Search Catalogue" placeholder="Service title..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[200px]">
          <Select label="Service Owner" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Agents</option></Select>
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Status" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>Active Listings</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Listing Date</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">12 Sep 2024</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Master Inventory</h3>
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Auto-Sync: Enabled</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['ID','Catalogue Name','Pax Type','Registry','Operator','Inventory Route','Status','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_SERVICES.map((row) => (
                <tr key={row.no}>
                  <td className="text-zinc-400 font-mono text-xs">{row.no.toString().padStart(2, '0')}</td>
                  <td className="font-bold text-zinc-900 uppercase tracking-tight text-sm">{row.name}</td>
                  <td>
                    <span className="text-[10px] font-black uppercase text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">{row.travellerType}</span>
                  </td>
                  <td className="text-zinc-500 text-xs font-medium">{row.createdDate}</td>
                  <td className="text-zinc-900 font-semibold text-xs">{row.createdBy}</td>
                  <td className="italic text-zinc-400 text-xs">{row.lastTravel}</td>
                  <td>
                    <span className={`badge ${row.active ? 'badge-green' : 'badge-amber'}`}>{row.active ? 'Available' : 'Paused'}</span>
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
