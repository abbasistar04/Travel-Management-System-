import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

const MOCK_TOURS = [
  { id: '101', tourName: 'Classic Umrah - 15 Days', theme: 'Religious / Spiritual', duration: '14 Nights', inclusions: 'Hotel + Visa + Trans', pricingAed: '4,500pp', status: 'Best Seller' },
  { id: '102', tourName: 'Dubai Desert Safari Luxury', theme: 'Adventure / Leisure', duration: '6 Hours', inclusions: 'Food + Transfer + Show', pricingAed: '250pp', status: 'Trending' },
]

export function OverseasTravelTourismPage() {
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
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">Curate Experience</h3>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={() => setShowCreatePanel(false)} />
                   <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={() => setShowCreatePanel(false)}>Launch Experience</Button>
                </div>
             </div>
             <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
                <Input label="Tour Excellence Name" placeholder="e.g. Majestic Turkey Explorer" />
                <div className="grid grid-cols-2 gap-4">
                   <Select label="Package Theme">
                      <option>Leisure / Holiday</option>
                      <option>Religious (Hajj/Umrah)</option>
                      <option>Business Delegation</option>
                      <option>Adventure Sport</option>
                   </Select>
                   <Input label="Total Duration" placeholder="e.g. 5 Days / 4 Nights" />
                </div>
                <Input label="Main Inclusions" placeholder="Flight, 5* Hotel, Daily Breakfast..." />
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Starting Rate (AED)" type="number" placeholder="2500" />
                   <Select label="Market Status">
                      <option>Draft</option>
                      <option>Active / Selling</option>
                      <option>Hot Deal</option>
                   </Select>
                </div>
                <div className="p-5 bg-zinc-900 rounded-3xl text-zinc-400 text-xs italic">
                   "Experience curation is the heart of travel. Ensure Every touchpoint is luxurious and seamless."
                </div>
             </div>
          </div>
        </>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Tourism & Experience Port</h2>
          <p className="text-sm text-zinc-400">Design and manage international holiday packages, excursions, and custom tours</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/services')}>Main Services</Button>
           <Button variant="primary" size="lg" onClick={() => setShowCreatePanel(true)}>Create Experience</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Find Experience" placeholder="Tour name or theme..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[200px]">
          <Select label="Travel Theme" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Categories</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Release Date</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">Fresh Releases</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Global Experience Catalogue</h3>
          <span className="text-[10px] font-black text-[#c60000] uppercase tracking-widest">Curated Selections</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['ID','Experience Label','Theme Category','Duration','Highlights','Price Point','Market Pose','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_TOURS.map((row) => (
                <tr key={row.id}>
                  <td className="text-zinc-400 font-mono text-xs">{row.id}</td>
                  <td>
                    <span className="font-bold text-zinc-900 uppercase tracking-tight text-sm truncate max-w-[200px] inline-block">{row.tourName}</span>
                  </td>
                  <td>
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{row.theme}</span>
                  </td>
                  <td className="text-zinc-500 font-medium text-xs">{row.duration}</td>
                  <td className="text-zinc-600 text-xs italic truncate max-w-[150px]">{row.inclusions}</td>
                  <td className="font-black text-zinc-900">{row.pricingAed}</td>
                  <td>
                    <span className="badge badge-amber">{row.status}</span>
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
