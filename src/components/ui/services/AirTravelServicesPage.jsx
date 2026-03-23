import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

const MOCK_SERVICES = [
  { id: '01', airline: 'Emirates', from: 'DXB', to: 'LHR', departureDate: 'Feb 09 2024', class: 'Economy', paxNames: 'John Smith', baggage: '30KG / 250 AED', visa: 'Required' },
  { id: '02', airline: 'Etihad Airways', from: 'AUH', to: 'JFK', departureDate: 'Feb 12 2024', class: 'Business', paxNames: 'Jane Doe', baggage: '40KG / 450 AED', visa: 'Required' },
]

export function AirTravelServicesPage() {
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
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">Ticket Protocol</h3>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={() => setShowCreatePanel(false)} />
                   <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={() => setShowCreatePanel(false)}>Issue Entry</Button>
                </div>
             </div>
             <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
                <Input label="Flight Date" type="date" defaultValue="2024-09-12" />
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Carrier" placeholder="e.g. Emirates" />
                   <Select label="Cabin Class">
                      <option>Economy</option>
                      <option>Business</option>
                      <option>First Class</option>
                   </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Departure (IATA)" placeholder="DXB" />
                   <Input label="Arrival (IATA)" placeholder="LHR" />
                </div>
                <Input label="Pax Identity" placeholder="Passenger full name..." />
                <div className="p-5 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200">
                   <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Baggage & Extras</p>
                   <Input label="Allowance/Price" placeholder="30KG / 150 AED" className="!bg-white" />
                </div>
             </div>
          </div>
        </>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Air Travel Port</h2>
          <p className="text-sm text-zinc-400">Flight booking records and airline service configurations</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/visa-services')}>Visa Portal</Button>
           <Button variant="primary" size="lg" onClick={() => setShowCreatePanel(true)}>Create Sectors</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Carrier / Flight" placeholder="Airline code..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Cabin" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Classes</option></Select>
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Visa Rule" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Rules</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Travel Date</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">Next 7 Days</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Active Flight Sectors</h3>
          <span className="text-[10px] font-black text-[#c60000] uppercase tracking-widest">GDS Live Feed</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['Carrier','Route','Departure','Cabin','Passenger','Baggage/Base','Visa','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_SERVICES.map((row) => (
                <tr key={row.id}>
                  <td className="font-bold text-zinc-900 uppercase tracking-tight text-sm italic">{row.airline}</td>
                  <td>
                    <div className="flex items-center gap-2">
                       <span className="font-black text-zinc-900">{row.from}</span>
                       <span className="text-zinc-300">→</span>
                       <span className="font-black text-zinc-900">{row.to}</span>
                    </div>
                  </td>
                  <td className="text-zinc-500 text-xs font-medium">{row.departureDate}</td>
                  <td>
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest border border-zinc-200 px-2 py-0.5 rounded">{row.class}</span>
                  </td>
                  <td className="text-zinc-900 font-bold text-xs">{row.paxNames}</td>
                  <td className="text-zinc-500 text-xs italic">{row.baggage}</td>
                  <td>
                    <span className="badge badge-amber">{row.visa}</span>
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
