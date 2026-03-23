import { useState, useEffect, useRef } from 'react'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'
import fullScreenIcon from '../../../assets/full-screen-icon.svg'
import uploadIcon from '../../../assets/upload-icon.svg'

const MOCK_AGENCIES = [
  { no: '01', name: 'Jet Set Travel', status: 'Pending Invoice', admin: 'Maria Khan', createdDate: 'Feb 09 2024' },
  { no: '02', name: 'Sky FLY Agency', status: 'Pending Invoice', admin: 'Ali Raza', createdDate: 'Feb 09 2024' },
  { no: '03', name: 'Nomad Winds', status: 'Success Invoice', admin: 'Samina Faisal', createdDate: 'Feb 09 2024' },
  { no: '04', name: 'Explore More Tour', status: 'Success Invoice', admin: 'Hamad Siddiqui', createdDate: 'Feb 09 2024' },
  { no: '05', name: 'Pak More Horizons', status: 'Success Invoice', admin: 'Usman Dar', createdDate: 'Feb 09 2024' },
]

export function AgencyPage() {
  const [agencyName, setAgencyName] = useState('')
  const [status, setStatus] = useState('')
  const [pretermissions, setPretermissions] = useState('')
  const [date, setDate] = useState('2024-09-12')
  
  const [showEditAgencyPanel, setShowEditAgencyPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [editingAgency, setEditingAgency] = useState(null)

  const [permissions, setPermissions] = useState({
    createAgency: false,
    editAnyAgency: false,
    editOwnAgency: false,
    deleteAgency: true,
    changeAgencyStatus: false,
    assignAdmin: false,
    assignAccountant: true,
    allowSubAgents: false,
    changeStatus2: false,
    editContactInfo: false,
    editWebsite: false,
    uploadLogo: false,
    addEditRegistrationNumber: true,
    editBusinessTags: false,
  })

  useEffect(() => {
    if (showEditAgencyPanel) {
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setPanelSlidIn(false)
    }
  }, [showEditAgencyPanel])

  const togglePermission = (key) => setPermissions(p => ({ ...p, [key]: !p[key] }))

  const openEditPanel = (agency) => {
    setEditingAgency(agency)
    setShowEditAgencyPanel(true)
  }

  return (
    <div className="flex-1 overflow-auto p-5 sm:p-7 bg-[#f4f5f7] relative page-enter">
      {/* ── Slide Panel ── */}
      {showEditAgencyPanel && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={() => setShowEditAgencyPanel(false)} aria-hidden />
          <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${panelSlidIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          >
            <div className="flex items-center justify-between p-5 border-b border-zinc-100 bg-[#fef2f2] shrink-0">
              <h3 className="text-lg font-bold text-zinc-900">
                {editingAgency ? 'Edit Agency' : 'Create New Agency'}
              </h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" icon={() => <img src={fullScreenIcon} className="w-4 h-4" />} />
                <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={() => setShowEditAgencyPanel(false)} />
                <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={() => setShowEditAgencyPanel(false)}>Save Agency</Button>
              </div>
            </div>

            <div className="flex-1 overflow-auto p-6 flex flex-col gap-8">
              {/* Profile */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-6 bg-[#c60000] rounded-full" />
                  <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Agency Profile</h4>
                </div>
                <div className="rounded-2xl border-2 border-dashed border-zinc-200 p-8 flex flex-col items-center justify-center gap-2 hover:bg-red-50/20 transition-all cursor-pointer group mb-6">
                  <img src={uploadIcon} className="w-10 h-10 opacity-30" />
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Logo Upload</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Agency Name" defaultValue={editingAgency?.name} />
                  <Input label="Agency Code" defaultValue="AGY-0592" disabled />
                </div>
                <div className="mt-4">
                  <Select label="Agency Type"><option>Select type...</option></Select>
                </div>
              </section>

              {/* Address */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-6 bg-[#c60000] rounded-full" />
                  <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Address Details</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="ZIP / Postal Code" placeholder="54000" />
                  <Select label="Country"><option>Select country</option></Select>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Select label="State / Province"><option>Select state</option></Select>
                  <Select label="City"><option>Select city</option></Select>
                </div>
                <div className="mt-4">
                  <Input label="Proper Address" placeholder="Street, Plaza, Building..." />
                </div>
              </section>

              {/* Permissions */}
              <section>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-6 bg-[#c60000] rounded-full" />
                  <h4 className="text-sm font-bold text-zinc-900 uppercase tracking-widest">Permissions & Roles</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-zinc-50 rounded-2xl p-5 border border-zinc-100">
                   <div>
                     <p className="text-xs font-bold text-zinc-400 uppercase mb-3">Operations</p>
                     {['Create Agency', 'Edit Agency', 'Delete Agency'].map(k => (
                       <label key={k} className="flex items-center gap-3 py-1.5 cursor-pointer group">
                         <input type="checkbox" className="w-5 h-5 rounded border-zinc-300 accent-[#c60000]" />
                         <span className="text-sm text-zinc-700 group-hover:text-[#c60000] transition-colors">{k}</span>
                       </label>
                     ))}
                   </div>
                   <div>
                     <p className="text-xs font-bold text-zinc-400 uppercase mb-3">Management</p>
                     {['Assign Admin', 'Financial Edits', 'Audit Access'].map(k => (
                       <label key={k} className="flex items-center gap-3 py-1.5 cursor-pointer group">
                         <input type="checkbox" className="w-5 h-5 rounded border-zinc-300 accent-[#c60000]" />
                         <span className="text-sm text-zinc-700 group-hover:text-[#c60000] transition-colors">{k}</span>
                       </label>
                     ))}
                   </div>
                </div>
              </section>
            </div>
          </div>
        </>
      )}

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Agencies Management</h2>
          <p className="text-sm text-zinc-400 mt-1">Configure and manage registered sub-agencies</p>
        </div>
        <Button variant="primary" size="lg" onClick={() => { setEditingAgency(null); setShowEditAgencyPanel(true); }}>
          Create New Agency
        </Button>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-48 px-4 py-1">
          <Input label="Agency Name" placeholder="Search name..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[160px]">
          <Select label="Status" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Statuses</option></Select>
        </div>
        <div className="filter-pill min-w-[160px]">
          <Select label="Type" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Types</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
          <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Created Date</label>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-sm font-medium text-zinc-800">12 Sep 2024</span>
            <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40" />
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-sm tracking-widest">Agency Directory</h3>
          <Button variant="outline" size="sm">Download CSV</Button>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['#','Agency Name','Status','Admin','Created Date','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_AGENCIES.map((agency, i) => (
                <tr key={i}>
                  <td className="text-zinc-400 text-xs font-mono">{agency.no}</td>
                  <td>
                    <div className="font-bold text-zinc-900">{agency.name}</div>
                    <div className="text-[10px] text-zinc-400 tracking-tighter uppercase">Code: AGY-{agency.no}</div>
                  </td>
                  <td>
                    <span className={`badge ${agency.status.includes('Pending') ? 'badge-amber' : 'badge-green'}`}>
                      {agency.status}
                    </span>
                  </td>
                  <td className="font-medium text-zinc-700">{agency.admin}</td>
                  <td className="text-zinc-500 text-xs">{agency.createdDate}</td>
                  <td>
                    <TableRowActionButtons row={agency} onEdit={() => openEditPanel(agency)} onDelete={() => {}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-5 py-3 border-t border-zinc-100 flex items-center justify-between text-sm text-zinc-500">
           <span>Displaying <span className="font-semibold text-zinc-900">5</span> of 24 agencies</span>
           <div className="flex items-center gap-1">
             <button className="pg-btn">‹</button>
             <button className="pg-btn active">1</button>
             <button className="pg-btn">2</button>
             <button className="pg-btn">3</button>
             <button className="pg-btn">›</button>
           </div>
        </div>
      </div>
    </div>
  )
}
