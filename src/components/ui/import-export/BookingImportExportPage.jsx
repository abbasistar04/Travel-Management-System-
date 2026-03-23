import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'

const MOCK_IMPORT_HISTORY = [
  { fileName: 'Customer_upload_27_july.cvs', status: 'Success', date: '27 July 2023', uploadBy: 'Admin' },
  { fileName: 'Customer_upload_27_july.cvs', status: 'Success', date: '27 July 2023', uploadBy: 'Admin' },
  { fileName: 'Customer_upload_27_july.cvs', status: 'Success', date: '27 July 2023', uploadBy: 'Admin' },
]

export function BookingImportExportPage() {
  const navigate = useNavigate()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  return (
    <div className="flex-1 overflow-auto p-5 sm:p-7 bg-[#f4f5f7] relative page-enter">
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Data Exchange</h2>
          <p className="text-sm text-zinc-400">Bulk import and export travel records and customer data</p>
        </div>
        <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/import-export/service')}>Service Exchange</Button>
      </div>

      {/* ── Action Grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Import Module */}
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-zinc-100 overflow-hidden flex flex-col">
           <div className="p-6 bg-zinc-900 flex items-center justify-between">
              <div>
                 <h3 className="text-white font-bold uppercase tracking-widest text-xs">Import Module</h3>
                 <p className="text-zinc-500 text-[10px] mt-0.5">XLSX, CSV, JSON Supported</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#c60000] flex items-center justify-center text-white shadow-lg shadow-[#c60000]/20">
                 <span className="text-xl font-black">↓</span>
              </div>
           </div>
           <div className="p-8 flex-1 flex flex-col gap-5">
              <div className="flex-1 border-2 border-dashed border-zinc-200 rounded-3xl bg-zinc-50/50 flex flex-col items-center justify-center p-8 text-center hover:border-[#c60000]/30 hover:bg-zinc-50 transition-all cursor-pointer group">
                 <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-[#c60000] text-lg font-black">+</span>
                 </div>
                 <p className="text-sm font-bold text-zinc-900">Choose dataset to upload</p>
                 <p className="text-xs text-zinc-400 mt-1 italic">or drag and drop your spreadsheet here</p>
              </div>
              <div className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100">
                 <span className="text-xs font-bold text-zinc-500 uppercase">Required Schema</span>
                 <Button variant="ghost" size="sm" className="text-[#c60000] font-black underline">Download Sample</Button>
              </div>
              <Button variant="primary" size="lg" className="w-full">Initialize Import</Button>
           </div>
        </div>

        {/* Export Module */}
        <div className="bg-white rounded-3xl shadow-xl shadow-black/5 border border-zinc-100 overflow-hidden flex flex-col">
           <div className="p-6 bg-[#c60000] flex items-center justify-between shadow-lg shadow-[#c60000]/20">
              <div>
                 <h3 className="text-white font-bold uppercase tracking-widest text-xs">Export Module</h3>
                 <p className="text-zinc-100/60 text-[10px] mt-0.5">Generate Secure Reports</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center text-white">
                 <span className="text-xl font-black">↑</span>
              </div>
           </div>
           <div className="p-8 flex-1 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-4">
                 <Input label="Period Start" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                 <Input label="Period End" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
              </div>
              <Select label="Destination Format">
                 <option>CSV (Standard Spreadsheet)</option>
                 <option>Excel (.xlsx Premium)</option>
                 <option>JSON (System Data)</option>
                 <option>PDF (Final Report)</option>
              </Select>
              <div className="mt-auto pt-6 border-t border-zinc-100">
                 <Button variant="primary" size="lg" className="w-full shadow-lg shadow-[#c60000]/20">Generate Archive</Button>
              </div>
           </div>
        </div>
      </div>

      {/* ── Import History ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">Exchange History</h3>
          <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Past 30 Days</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['Source Filename','Execution Status','Timestamp','Operator','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_IMPORT_HISTORY.map((row, i) => (
                <tr key={i}>
                  <td className="font-bold text-zinc-900 uppercase tracking-tight text-sm italic">{row.fileName}</td>
                  <td>
                    <span className="badge badge-green">{row.status}</span>
                  </td>
                  <td className="text-zinc-500 font-medium text-xs whitespace-nowrap">{row.date}</td>
                  <td className="text-zinc-900 font-bold text-xs">{row.uploadBy}</td>
                  <td>
                    <TableRowActionButtons row={row} onDelete={() => {}} />
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
