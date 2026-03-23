import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Input, Select, TableRowActionButtons } from '..'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import saveIcon from '../../../assets/save-icon.svg'
import uploadIcon from '../../../assets/upload-icon.svg'

const MOCK_USERS = [
  { no: '01', name: 'Maria Khan', email: 'maria.khan@example.com', role: 'Admin', status: 'Active', createdDate: 'Feb 09 2024' },
  { no: '02', name: 'Ali Raza', email: 'ali.raza@example.com', role: 'Accountant', status: 'Active', createdDate: 'Feb 09 2024' },
  { no: '03', name: 'Samina Faisal', email: 'samina.faisal@example.com', role: 'Agent', status: 'Inactive', createdDate: 'Feb 08 2024' },
  { no: '04', name: 'Hamad Siddiqui', email: 'hamad.s@example.com', role: 'Admin', status: 'Active', createdDate: 'Feb 07 2024' },
  { no: '05', name: 'Usman Dar', email: 'usman.dar@example.com', role: 'Agent', status: 'Active', createdDate: 'Feb 06 2024' },
]

const MOCK_LOG = [
  { no: 1, event: 'Login', ipLocation: '192.168.006 London', date: '2025-03-10', time: '09:00 PM' },
  { no: 2, event: 'Create Quote-Mr Imran', ipLocation: '192.168.006 London', date: '2025-03-10', time: '09:00 PM' },
  { no: 3, event: 'Update Service-Umrah p.', ipLocation: '192.168.006 London', date: '2025-03-10', time: '09:00 PM' },
]

export function UserListPage() {
  const navigate = useNavigate()
  const [showAddUserPanel, setShowAddUserPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  
  const [panelFirstName, setPanelFirstName] = useState('Muhammad')
  const [panelLastName, setPanelLastName] = useState('Usman')
  const [panelRole, setPanelRole] = useState('sales-person')
  const [panelEmail, setPanelEmail] = useState('info@travelxpress.pk')

  useEffect(() => {
    if (showAddUserPanel) {
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setPanelSlidIn(false)
    }
  }, [showAddUserPanel])

  const openPanel = (user = null) => {
    setEditingUser(user)
    if (user) {
       const parts = user.name.split(' ')
       setPanelFirstName(parts[0])
       setPanelLastName(parts[1] || '')
       setPanelRole(user.role.toLowerCase())
       setPanelEmail(user.email)
    } else {
       setPanelFirstName('')
       setPanelLastName('')
       setPanelRole('agent')
       setPanelEmail('')
    }
    setShowAddUserPanel(true)
  }

  const closePanel = () => setShowAddUserPanel(false)

  return (
    <div className="flex-1 overflow-auto p-5 sm:p-7 bg-[#f4f5f7] relative page-enter">
      {/* ── Slide Panel ── */}
      {showAddUserPanel && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" onClick={closePanel} aria-hidden />
          <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${panelSlidIn ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
             <div className="flex items-center justify-between p-5 border-b border-zinc-100 bg-[#fef2f2] shrink-0">
                <h3 className="text-lg font-bold text-zinc-900">{editingUser ? 'Update Profile' : 'Register New User'}</h3>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={() => <img src={crossIcon} className="w-4 h-4" />} onClick={closePanel} />
                  <Button variant="primary" size="sm" icon={() => <img src={saveIcon} className="w-4 h-4 invert" />} onClick={closePanel}>Commit Changes</Button>
                </div>
             </div>
             <div className="flex-1 overflow-auto p-6 flex flex-col gap-6">
                <div>
                   <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Profile Identity</h4>
                   <div className="flex items-center gap-4">
                      <div className="w-20 h-20 rounded-3xl bg-zinc-50 border-2 border-dashed border-zinc-200 flex flex-col items-center justify-center cursor-pointer hover:bg-zinc-100 transition-colors">
                         <img src={uploadIcon} className="w-6 h-6 opacity-30" />
                         <span className="text-[10px] font-bold text-zinc-400 mt-1">Upload</span>
                      </div>
                      <div className="flex-1 space-y-3">
                         <Input label="First Name" value={panelFirstName} onChange={e => setPanelFirstName(e.target.value)} />
                         <Input label="Last Name" value={panelLastName} onChange={e => setPanelLastName(e.target.value)} />
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <Select label="System Role" value={panelRole} onChange={e => setPanelRole(e.target.value)}>
                      <option value="admin">Administrator</option>
                      <option value="accountant">Accountant</option>
                      <option value="agent">Booking Agent</option>
                   </Select>
                   <Input label="Email Access" value={panelEmail} onChange={e => setPanelEmail(e.target.value)} />
                </div>

                <div>
                   <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-3">Security Log</h4>
                   <div className="bg-zinc-50 border border-zinc-100 rounded-2xl overflow-hidden">
                      <table className="text-[11px]">
                         <thead>
                            <tr className="bg-zinc-100/50">
                               <th className="py-2 px-3 text-zinc-400 font-black uppercase">Event</th>
                               <th className="py-2 px-3 text-zinc-400 font-black uppercase">IP / Location</th>
                               <th className="py-2 px-3 text-zinc-400 font-black uppercase">Time</th>
                            </tr>
                         </thead>
                         <tbody>
                            {MOCK_LOG.map((l, i) => (
                               <tr key={i} className="border-t border-zinc-100">
                                  <td className="py-2 px-3 font-bold text-zinc-700">{l.event}</td>
                                  <td className="py-2 px-3 text-zinc-500">{l.ipLocation}</td>
                                  <td className="py-2 px-3 text-zinc-400 font-mono">{l.time}</td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>
          </div>
        </>
      )}

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-7">
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">User Management</h2>
          <p className="text-sm text-zinc-400">Control access levels and system permissions</p>
        </div>
        <div className="flex gap-2">
           <Button variant="outline" size="lg" onClick={() => navigate('/dashboard/activity-log')}>Security Log</Button>
           <Button variant="primary" size="lg" onClick={() => openPanel()}>Add New User</Button>
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-52 px-4 py-1">
          <Input label="Search Identity" placeholder="Name or email..." className="border-0 shadow-none" inputClassName="!p-0 !border-0 !shadow-none !ring-0" />
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Role Level" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>All Roles</option></Select>
        </div>
        <div className="filter-pill min-w-[150px]">
          <Select label="Access Status" className="!mb-0" selectClassName="!border-0 !ring-0 !py-1"><option>Active Only</option></Select>
        </div>
        <div className="filter-pill flex flex-col px-4 py-1 grow-0 min-w-[150px] cursor-pointer">
           <label className="text-xs font-semibold text-zinc-500 uppercase tracking-tight">Joined After</label>
           <div className="flex items-center justify-between py-1.5 pt-0.5">
             <span className="text-sm font-medium text-zinc-800">01 Jan 2024</span>
             <img src={calendarIcon} alt="" className="w-4 h-4 opacity-40 shrink-0" />
           </div>
        </div>
      </div>

      {/* ── User Grid ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100 bg-[#fef2f2] flex items-center justify-between">
          <h3 className="font-bold text-zinc-900 uppercase text-xs tracking-widest">System Users</h3>
          <span className="text-[10px] font-black text-[#c60000] uppercase tracking-widest">5 ACTIVE ACCOUNTS</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['ID','Identity','Role','Access','Joined','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {MOCK_USERS.map((user, i) => (
                <tr key={i}>
                  <td className="text-zinc-400 font-mono text-xs">{user.no}</td>
                  <td>
                    <div className="flex flex-col">
                       <span className="font-bold text-zinc-900 uppercase tracking-tight">{user.name}</span>
                       <span className="text-[10px] font-semibold text-zinc-400">{user.email}</span>
                    </div>
                  </td>
                  <td>
                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-wider bg-zinc-100 px-2 py-0.5 rounded-full">{user.role}</span>
                  </td>
                  <td>
                    <span className={`badge ${user.status === 'Active' ? 'badge-green' : 'badge-amber'}`}>{user.status}</span>
                  </td>
                  <td className="text-zinc-500 text-xs font-medium">{user.createdDate}</td>
                  <td>
                    <TableRowActionButtons row={user} onEdit={() => openPanel(user)} onDelete={() => {}} />
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
