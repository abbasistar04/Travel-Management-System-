import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import uploadIcon from '../../../assets/upload-icon.svg'
import airplaneIcon from '../../../assets/Airplane-icon.svg'
import analyticsIcon from '../../../assets/Analytics-icon.svg'
import fullScreenIcon from '../../../assets/full-screen-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

const MOCK_PASSENGERS = [
  { name: 'Muneera Mughal', email: 'muneeramughal@email.com', phone: '+92 300 1234567', createdDate: '03 Oct 2024' },
  { name: 'Faysal Ahmed', email: 'faysalahmed@email.com', phone: '+92 321 9876543', createdDate: '05 Oct 2024' },
  { name: 'Noman Khan', email: 'nomankhan@email.com', phone: '+92 333 4567890', createdDate: '07 Oct 2024' },
  { name: 'Sara Ali', email: 'saraali@email.com', phone: '+92 302 1122334', createdDate: '09 Oct 2024' },
]

function Switch({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#c60000]/20 ${checked ? 'bg-[#c60000]' : 'bg-zinc-300'}`}
    >
      <span className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-all duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  )
}

export function PassengerPage() {
  const [toggles, setToggles] = useState(MOCK_PASSENGERS.map(() => true))
  const [showAddPassengerPanel, setShowAddPassengerPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)

  useEffect(() => {
    if (showAddPassengerPanel) {
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setPanelSlidIn(false)
    }
  }, [showAddPassengerPanel])

  const setToggle = (index, value) => {
    setToggles((prev) => {
      const next = [...prev]; next[index] = value; return next
    })
  }

  return (
    <div className="flex-1 overflow-auto p-5 sm:p-7 bg-[#f4f5f7] relative page-enter">
      {/* ── Side Panel ── */}
      {showAddPassengerPanel && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm transition-opacity" onClick={() => setShowAddPassengerPanel(false)} aria-hidden />
          <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${panelSlidIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="flex items-center justify-between p-5 border-b border-zinc-100 shrink-0 bg-[#fef2f2]">
              <h3 className="text-lg font-bold text-zinc-900">Add / Edit Passenger</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" icon={() => <img src={fullScreenIcon} className="w-4 h-4" />} />
                <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={() => setShowAddPassengerPanel(false)} />
                <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={() => setShowAddPassengerPanel(false)}>Save</Button>
              </div>
            </div>
            
            <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
              {/* Upload */}
              <div className="rounded-2xl border-2 border-dashed border-zinc-200 p-8 flex flex-col items-center justify-center gap-3 hover:border-[#c60000]/30 hover:bg-red-50/30 transition-all cursor-pointer group">
                <img src={uploadIcon} alt="" className="w-10 h-10 opacity-40 group-hover:opacity-100 transition-opacity" />
                <p className="text-sm font-medium text-zinc-500 group-hover:text-[#c60000]">Drag & drop or click to upload photo</p>
              </div>

              {/* Form Groups */}
              <div className="grid grid-cols-2 gap-4">
                <Input label="First Name" placeholder="Enter first name" />
                <Input label="Last Name" placeholder="Enter last name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Email" type="email" placeholder="email@example.com" />
                <Input label="Phone" type="tel" placeholder="+92 ..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Date of Birth" type="date" />
                <Select label="Traveller Type"><option>Select...</option></Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Passport No." placeholder="P-..." />
                <Select label="Nationality"><option>Select...</option></Select>
              </div>

              <div className="h-px bg-zinc-100 my-2" />

              <h4 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#c60000] rounded-full" />
                Address Details
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <Input label="ZIP / Postal Code" placeholder="..." />
                <Select label="Country"><option>Select country</option></Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Select label="State / Province"><option>Select state</option></Select>
                <Select label="City"><option>Select city</option></Select>
              </div>
              <Input label="Proper Address" placeholder="Street, Building, Unit..." />

              {/* History Preview */}
              <div className="mt-4 p-5 rounded-2xl border border-zinc-100 bg-[#fafafa]">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-wider">Travel History</h4>
                  <img src={analyticsIcon} alt="" className="w-5 h-5 opacity-40" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-start p-3 bg-white rounded-xl border border-zinc-100 shadow-sm">
                    <div>
                      <p className="text-sm font-bold text-[#c60000]">Umrah Ramadan</p>
                      <p className="text-xs text-zinc-400 mt-1">2025-03-10 to 2025-03-25</p>
                    </div>
                    <span className="badge badge-green">Success</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Passenger CRM</h2>
          <p className="text-sm text-zinc-400">Manage your passenger records and history</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => setShowAddPassengerPanel(true)}>
          Add New Passenger
        </Button>
      </div>

      {/* ── Filter Row ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-48 px-4 py-3 flex items-center gap-2">
          <Input label="" placeholder="Search PNR..." className="border-0 shadow-none !mb-0" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill flex-1 min-w-0 basis-60 px-4 py-3 flex items-center gap-2">
          <Input label="" placeholder="Passenger Name..." className="border-0 shadow-none !mb-0" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="" className="!mb-0" selectClassName="!border-0 !ring-0 !py-3"><option>All Types</option></Select>
        </div>
        <div className="filter-pill px-4 py-3 flex items-center justify-between gap-3 min-w-[140px] cursor-pointer">
          <span className="text-sm text-zinc-600 font-medium">Any Date</span>
          <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40" />
        </div>
      </div>

      {/* ── Table Case ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900">Passenger List</h3>
          <span className="text-xs font-bold text-[#c60000] tracking-widest uppercase">Verified Records</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['#','Name','Email','Phone','Created Date','Active','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_PASSENGERS.map((p, i) => (
                <tr key={i}>
                  <td className="text-zinc-400 text-xs font-medium">{i + 1}</td>
                  <td className="font-bold text-zinc-900">{p.name}</td>
                  <td className="text-zinc-600">{p.email}</td>
                  <td className="text-zinc-600">{p.phone}</td>
                  <td className="text-zinc-500 text-xs">{p.createdDate}</td>
                  <td>
                    <Switch checked={toggles[i]} onChange={(v) => setToggle(i, v)} />
                  </td>
                  <td>
                    <div className="flex items-center gap-1">
                      <TableRowActionButtons row={p} onEdit={() => setShowAddPassengerPanel(true)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-5 py-3 border-t border-zinc-100 flex items-center justify-between text-sm text-zinc-500">
          <span>Page <span className="font-semibold text-zinc-900">1</span> of 5</span>
          <div className="flex items-center gap-1">
            <button className="pg-btn">&lt;</button>
            <button className="pg-btn active">1</button>
            <button className="pg-btn">2</button>
            <button className="pg-btn">3</button>
            <button className="pg-btn">&gt;</button>
          </div>
        </div>
      </div>

      {/* ── Bottom Link ── */}
      <div className="mt-8 flex justify-end">
        <Link to="/dashboard/air-travel-services" className="page-enter">
          <Button variant="outline" size="md">
            View Air Travel Services
            <img src={airplaneIcon} alt="" className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
