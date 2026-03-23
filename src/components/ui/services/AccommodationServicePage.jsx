import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

const ACCOMMODATION_ROWS = [
  { id: '01', hotelName: 'Grand Plaza Hotel', location: 'Makkah, KSA', checkIn: 'Feb 09 2024', checkInTime: '03:00 PM', checkOut: 'Feb 15 2024', checkOutTime: '11:00 AM', guests: '2 Adults', priceAed: '2,400', status: 'Active' },
  { id: '02', hotelName: 'Madina Royal Suite', location: 'Madina, KSA', checkIn: 'Feb 16 2024', checkInTime: '02:00 PM', checkOut: 'Feb 20 2024', checkOutTime: '10:00 AM', guests: '4 Adults', priceAed: '3,800', status: 'Active' },
]

export function AccommodationServicePage() {
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
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">Stay Logistics</h3>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={() => setShowCreatePanel(false)} />
                   <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={() => setShowCreatePanel(false)}>Check-in Record</Button>
                </div>
             </div>
             <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
                <Input label="Hotel Property Name" placeholder="e.g. Hilton Suites" />
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Check-In Date" type="date" />
                   <Input label="Arrival Time" type="time" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Check-Out Date" type="date" />
                   <Input label="Departure Time" type="time" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Occupancy" placeholder="e.g. 2 Adults, 1 Child" />
                   <Input label="Total Cost (AED)" type="number" placeholder="1500" />
                </div>
                <Input label="Location / Address" placeholder="Makkah, Ibrahim Al Khalil Road..." />
                <div className="p-5 bg-zinc-50 rounded-2xl border border-dashed border-zinc-200 text-xs text-zinc-400">
                   Property details will be automatically included in the traveler's final itinerary PDF once confirmed.
                </div>
             </div>
          </div>
        </>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Accommodation Port</h2>
          <p className="text-sm text-zinc-400">Manage hotel reservations, room allotments, and check-in schedules</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/transport-services')}>Transport Services</Button>
           <Button variant="primary" size="lg" onClick={() => setShowCreatePanel(true)}>Record Booking</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Find Property" placeholder="Hotel name or city..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Guest Count" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Occupancy</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Check-In Period</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">Next 14 Days</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Confirmed Stays</h3>
          <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest">Property Confirmed</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['ID','Hotel Property','Location','Period (In/Out)','Guests','Net Cost (AED)','Status','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {ACCOMMODATION_ROWS.map((row) => (
                <tr key={row.id}>
                  <td className="text-zinc-400 font-mono text-xs">{row.id}</td>
                  <td>
                    <div className="flex flex-col">
                       <span className="font-bold text-zinc-900 uppercase tracking-tight">{row.hotelName}</span>
                    </div>
                  </td>
                  <td className="text-zinc-500 font-medium text-xs">{row.location}</td>
                  <td>
                    <div className="flex flex-col gap-1">
                       <span className="text-[10px] font-black uppercase text-zinc-400">In: {row.checkIn} — {row.checkInTime}</span>
                       <span className="text-[10px] font-black uppercase text-[#c60000]">Out: {row.checkOut} — {row.checkOutTime}</span>
                    </div>
                  </td>
                  <td className="text-zinc-600 font-bold text-xs">{row.guests}</td>
                  <td className="font-black text-zinc-900">{row.priceAed}</td>
                  <td>
                    <span className="badge badge-green">Confirmed</span>
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
