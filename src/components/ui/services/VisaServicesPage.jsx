import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'

const MOCK_VISA_SERVICES = [
  { id: '01', destination: 'United Kingdom', visaType: 'Tourist / Visit', processingTime: '15 Standard Days', requiredDocuments: 'Passport + 6M Stmt', fee: '850 AED', notes: 'Biometric at VFS Dubai', status: 'Active' },
  { id: '02', destination: 'Schengen (Italy)', visaType: 'Business / Conf', processingTime: '21 Standard Days', requiredDocuments: 'NOC + Invitation', fee: '1,200 AED', notes: 'Appointment required', status: 'Active' },
]

export function VisaServicesPage() {
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
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-tight">Visa Logistics</h3>
                <div className="flex items-center gap-2">
                   <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={() => setShowCreatePanel(false)} />
                   <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={() => setShowCreatePanel(false)}>Deploy Protocol</Button>
                </div>
             </div>
             <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Country / Zone" placeholder="e.g. Canada" />
                   <Select label="Entry Class">
                      <option>Tourist</option>
                      <option>Business</option>
                      <option>Student</option>
                      <option>Work Permit</option>
                   </Select>
                </div>
                <Input label="Processing SLA" placeholder="e.g. 10-15 Working Days" />
                <Input label="Mandatory Docs" placeholder="Passport copy, Bank record, NoC..." />
                <div className="grid grid-cols-2 gap-4">
                   <Input label="Agency Fee (AED)" type="number" placeholder="800" />
                   <Select label="Embassy Level">
                      <option>VFS Global</option>
                      <option>Consulate Direct</option>
                      <option>e-Visa Portal</option>
                   </Select>
                </div>
                <div className="p-4 bg-zinc-900 rounded-3xl border border-zinc-800">
                   <textarea placeholder="Confidential embassy notes or internal instructions..." className="w-full bg-transparent border-0 text-xs text-zinc-400 focus:ring-0 min-h-[100px] resize-none" />
                </div>
             </div>
          </div>
        </>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Visa Processing Port</h2>
          <p className="text-sm text-zinc-400">Manage global consulate requirements and traveler permit statuses</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/overseas-travel-tourism')}>Overseas Tourism</Button>
           <Button variant="primary" size="lg" onClick={() => setShowCreatePanel(true)}>Create Permit</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Destination / PNR" placeholder="Search zone..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[200px]">
          <Select label="Permit Category" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Visa Types</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Submission Deadline</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">Next 48 Hours</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Global Permit registry</h3>
          <span className="text-[10px] font-black text-[#c60000] uppercase tracking-widest">Embassy Sync: Active</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['ID','Destination','Visa Type','Process SLA','Requirements','Fee (AED)','Consulate Notes','Access','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_VISA_SERVICES.map((row) => (
                <tr key={row.id}>
                  <td className="text-zinc-400 font-mono text-xs">{row.id}</td>
                  <td className="font-bold text-zinc-900 uppercase tracking-tight text-sm">{row.destination}</td>
                  <td className="text-zinc-500 text-xs font-semibold whitespace-nowrap">{row.visaType}</td>
                  <td className="text-zinc-400 text-xs">{row.processingTime}</td>
                  <td className="text-zinc-600 text-xs truncate max-w-[150px]">{row.requiredDocuments}</td>
                  <td className="font-black text-zinc-900">{row.fee}</td>
                  <td className="italic text-zinc-400 text-xs truncate max-w-[150px]">{row.notes}</td>
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
