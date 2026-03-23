import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'

const MOCK_ACTIVITY_LOG = [
  { no: 1, event: 'User Login Success', ipLocation: '192.168.1.1 Karachi', date: '2025-03-10', time: '09:00 PM' },
  { no: 2, event: 'Created Quote (#AB23)', ipLocation: '192.168.1.1 Karachi', date: '2025-03-10', time: '09:12 PM' },
  { no: 3, event: 'Modified Service Listing', ipLocation: '192.168.1.1 Karachi', date: '2025-03-10', time: '09:45 PM' },
  { no: 4, event: 'Financial Audit Export', ipLocation: '192.168.1.1 Karachi', date: '2025-03-10', time: '10:05 PM' },
]

export function ActivityLogPage() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 overflow-auto p-5 sm:p-7 bg-[#f4f5f7] relative page-enter">
      
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Security Audit Logs</h2>
          <p className="text-sm text-zinc-400">Chronological history of all system events and user actions</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/user-list')}>Back to Users</Button>
           <Button variant="primary" size="lg" icon={() => <div className="w-2 h-2 rounded-full bg-white animate-pulse" />}>Real-time Feed</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Find Activity" placeholder="Event keyword..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[200px]">
          <Select label="Filter by Event" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All System Events</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Session Date</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">Today, 10 Mar</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── Subtitle Bar ── */}
      <div className="mb-4 bg-zinc-900 rounded-2xl p-4 px-6 flex items-center justify-between shadow-xl shadow-black/10">
         <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-[#c60000] rounded-full" />
            <h3 className="text-lg font-bold text-white tracking-tight">
               Overseas Travel Agency — <span className="text-[#c60000]">Security Stream</span>
            </h3>
         </div>
         <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Encrypted Logs</span>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr className="bg-zinc-50/50">
                {['Sequence','Event Description','Source IP / Locale','Stamp Date','Execution Time'].map(h => <th key={h} className="!py-4">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_ACTIVITY_LOG.map((row) => (
                <tr key={row.no} className="group hover:bg-zinc-50/80 transition-colors">
                  <td className="text-zinc-400 font-mono text-xs">{row.no.toString().padStart(3, '0')}</td>
                  <td>
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#c60000] opacity-0 group-hover:opacity-100 transition-opacity" />
                       <span className="font-bold text-zinc-900 group-hover:translate-x-1 transition-transform inline-block uppercase text-xs tracking-tight">{row.event}</span>
                    </div>
                  </td>
                  <td className="text-zinc-600 font-medium font-mono text-xs italic">{row.ipLocation}</td>
                  <td className="text-zinc-500 font-bold">{row.date}</td>
                  <td className="text-zinc-900 font-black tracking-tighter">{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-zinc-100 bg-zinc-50/30 flex justify-end">
           <Button variant="ghost" size="sm">Download Full Audit CSV</Button>
        </div>
      </div>
    </div>
  )
}
