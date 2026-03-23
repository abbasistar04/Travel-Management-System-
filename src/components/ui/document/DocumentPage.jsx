import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import { AssetsCreateEditPanel } from './AssetsCreateEditPanel'

const MOCK_DOCUMENTS = [
  { id: 1, documentName: 'All passport PDF', status: 'Success', type: 'Passport', passengerName: 'Ali khan', linkedBooking: 'Bk-2054', uploadDate: '02/03/2022' },
  { id: 2, documentName: 'All passport PDF', status: 'Success', type: 'Passport', passengerName: 'Ali khan', linkedBooking: 'Bk-2054', uploadDate: '02/03/2022' },
  { id: 3, documentName: 'All passport PDF', status: 'Success', type: 'Passport', passengerName: 'Ali khan', linkedBooking: 'Bk-2054', uploadDate: '02/03/2022' },
  { id: 4, documentName: 'All passport PDF', status: 'Success', type: 'Passport', passengerName: 'Ali khan', linkedBooking: 'Bk-2054', uploadDate: '02/03/2022' },
]

export function DocumentPage() {
  const navigate = useNavigate()
  const [showUploadPanel, setShowUploadPanel] = useState(false)

  return (
    <div className="flex-1 overflow-auto p-5 sm:p-7 bg-[#f4f5f7] relative page-enter">
      <AssetsCreateEditPanel isOpen={showUploadPanel} onClose={() => setShowUploadPanel(false)} title="Document Upload" />
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Legal Documents</h2>
          <p className="text-sm text-zinc-400">Secure repository for traveler identifications and visas</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/assets')}>Manage Assets</Button>
           <Button variant="primary" size="lg" onClick={() => setShowUploadPanel(true)}>Upload Repository</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Search Filename" placeholder="Passport..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[200px]">
          <Select label="Library Category" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Documents</option></Select>
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Filter Status" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>Successful</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Archived Date</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">12 Sep 2024</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Document Registry</h3>
          <span className="text-[10px] font-black text-[#c60000] uppercase tracking-widest">Synced with Cloud</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['Document Name','Status','Type','Passenger','Booking','Date','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_DOCUMENTS.map((row) => (
                <tr key={row.id}>
                  <td className="font-bold text-zinc-900 uppercase tracking-tight text-sm">{row.documentName}</td>
                  <td>
                    <span className="badge badge-green">{row.status}</span>
                  </td>
                  <td>
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{row.type}</span>
                  </td>
                  <td className="text-zinc-600 font-semibold">{row.passengerName}</td>
                  <td className="font-mono text-zinc-900 bg-zinc-50 px-2 py-0.5 rounded border border-zinc-100 text-xs inline-block mt-2 ml-2">{row.linkedBooking}</td>
                  <td className="text-zinc-500 text-xs">{row.uploadDate}</td>
                  <td>
                    <TableRowActionButtons row={row} onEdit={() => setShowUploadPanel(true)} onDelete={() => {}} />
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
