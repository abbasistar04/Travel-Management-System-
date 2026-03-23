import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import searchIcon from '../../../assets/search-icon.svg'
import calendarIcon from '../../../assets/calendar-icon.svg'
import userIcon from '../../../assets/user-icon.svg'
import editIcon from '../../../assets/edit-icon.svg'
import copyIcon from '../../../assets/copy-icon.svg'
import downloadIcon from '../../../assets/download-icon.svg'
import trashIcon from '../../../assets/trash-icon.svg'
const BRAND_RED = '#c60000'
const FILTER_BG = '#F3FAFF'
const FILTER_BORDER = '#CBE9FF'
const STATUS_GREEN = '#12B669'

const selectBg = {
  backgroundColor: FILTER_BG,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
}

const formFieldStyle = 'rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0'
const formFieldBorder = { borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }
const formLabelClass = 'text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block'

const MOCK_SALARY_SHEET = [
  { employeeName: 'Ali Hamaa', id: '001', department: 'Sales', designation: 'Sales executive', salary: '60,000 PKR', commission: '10%', bonus: '2,000 PKR', month: 'July', date: '01-07-2022', status: 'Success Invoice' },
  { employeeName: 'Ali Hamaa', id: '001', department: 'Sales', designation: 'Sales executive', salary: '60,000 PKR', commission: '10%', bonus: '2,000 PKR', month: 'July', date: '01-07-2022', status: 'Success Invoice' },
  { employeeName: 'Ali Hamaa', id: '001', department: 'Sales', designation: 'Sales executive', salary: '60,000 PKR', commission: '10%', bonus: '2,000 PKR', month: 'July', date: '01-07-2022', status: 'Success Invoice' },
  { employeeName: 'Ali Hamaa', id: '001', department: 'Sales', designation: 'Sales executive', salary: '60,000 PKR', commission: '10%', bonus: '2,000 PKR', month: 'July', date: '01-07-2022', status: 'Success Invoice' },
]

const PERMISSION_ROWS = [
  { module: 'Employee', view: true, add: true, edit: true, delete: false, export: true },
  { module: 'Attendance', view: true, add: true, edit: false, delete: false, export: false },
  { module: 'Salary', view: true, add: false, edit: false, delete: false, export: true },
  { module: 'Leave Request', view: true, add: true, edit: true, delete: false, export: false },
  { module: 'Reports', view: true, add: false, edit: false, delete: false, export: true },
]

function CrossIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ef4444" strokeWidth={2} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

const PERMISSION_CHECK_BLUE = '#0082E3'

function PermissionCheck() {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded border-2 shrink-0" style={{ backgroundColor: PERMISSION_CHECK_BLUE, borderColor: PERMISSION_CHECK_BLUE }} aria-hidden>
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l4 4L19 7" />
      </svg>
    </span>
  )
}

const PERMISSION_DENY_RED = '#F85C5C'

function PermissionDeny() {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded border-2 shrink-0" style={{ backgroundColor: PERMISSION_DENY_RED, borderColor: PERMISSION_DENY_RED }} aria-hidden>
      <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>
  )
}

export function EmployeeManagementPage() {
  const navigate = useNavigate()
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [showEditPanel, setShowEditPanel] = useState(false)
  const [editPanelSlidIn, setEditPanelSlidIn] = useState(false)
  const [editFormEmployeeName, setEditFormEmployeeName] = useState('')
  const [editFormDesignation, setEditFormDesignation] = useState('')
  const [editFormCommission, setEditFormCommission] = useState('')
  const [editFormDate, setEditFormDate] = useState('')
  const [editFormDepartment, setEditFormDepartment] = useState('')
  const [editFormBasic, setEditFormBasic] = useState('')
  const [editFormBonus, setEditFormBonus] = useState('')
  const [editFormStatus, setEditFormStatus] = useState('')

  useEffect(() => {
    if (showAddPanel) {
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setPanelSlidIn(false)
    }
  }, [showAddPanel])

  useEffect(() => {
    if (showEditPanel) {
      setEditPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setEditPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setEditPanelSlidIn(false)
    }
  }, [showEditPanel])

  const closeAddPanel = () => setShowAddPanel(false)
  const handleAddSave = () => closeAddPanel()

  const openEditPanel = (row) => {
    setEditFormEmployeeName(row.employeeName)
    setEditFormDesignation(row.designation)
    setEditFormCommission(row.commission)
    setEditFormDate(row.date)
    setEditFormDepartment(row.department)
    setEditFormBasic(row.salary)
    setEditFormBonus(row.bonus)
    setEditFormStatus(row.status)
    setShowEditPanel(true)
  }

  const closeEditPanel = () => setShowEditPanel(false)
  const handleEditSave = () => closeEditPanel()

  return (
    <div className="flex-1 overflow-auto flex flex-col max-h-[90vh] overflow-hidden min-h-0 bg-white relative">
      {/* Slide-over: Add Employee */}
      {showAddPanel && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300" onClick={closeAddPanel} aria-hidden />
          <div
            className="fixed top-1/2 left-1/2 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out"
            style={{ maxWidth: 'min(100%, 36rem)', opacity: panelSlidIn ? 1 : 0, transform: panelSlidIn ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)'}}
          >
            <div className="flex items-center p-4 border-b border-b-[#66adff] shrink-0 bg-[#cbebff]">
              <h3 className="text-lg font-bold" style={{ color: BRAND_RED }}>Create/Edit Employee salary record</h3>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-white">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Basic Salary</label>
                  <input type="text" defaultValue="60,000 PKR" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Department</label>
                  <input type="text" defaultValue="Sales" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Allowance</label>
                  <input type="text" defaultValue="5,000 PKR" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Salary Date</label>
                  <div className="flex items-center px-4 pb-3">
                    <input type="text" defaultValue="14/03/2023" className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0" style={{ color: '#000000' }} />
                    <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-600 ml-1" aria-hidden />
                  </div>
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Bonus</label>
                  <input type="text" defaultValue="5,000 PKR" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                  <span className="text-xs text-slate-500 px-4 pb-2 block">Performance based or Eid Bonus</span>
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Commission</label>
                  <input type="text" defaultValue="Per Sale 10%" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button type="button" onClick={handleAddSave} className="inline-flex items-center justify-center font-semibold rounded-[2px] px-8 py-2.5 text-white hover:opacity-90 uppercase tracking-wide" style={{ backgroundColor: BRAND_RED, width: '300px', height: '70px' }}>SAVE</button>
              </div>
            </div>
          </div>
        </>
      )}
      {/* Slide-over: Edit - create/Edit employee salary sheet */}
      {showEditPanel && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300" onClick={closeEditPanel} aria-hidden />
          <div
            className="fixed top-1/2 left-1/2 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out"
            style={{ maxWidth: 'min(100%, 36rem)', opacity: editPanelSlidIn ? 1 : 0, transform: editPanelSlidIn ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)'}}
          >
            <div className="flex items-center p-4 border-b border-b-[#66adff] shrink-0 bg-[#cbebff]">
              <h3 className="text-lg font-bold" style={{ color: BRAND_RED }}>create/Edit employee salary sheet</h3>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-white">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Employee Name</label>
                  <input type="text" value={editFormEmployeeName} onChange={(e) => setEditFormEmployeeName(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Department</label>
                  <input type="text" value={editFormDepartment} onChange={(e) => setEditFormDepartment(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Designation</label>
                  <input type="text" value={editFormDesignation} onChange={(e) => setEditFormDesignation(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Basic Salary</label>
                  <input type="text" value={editFormBasic} onChange={(e) => setEditFormBasic(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Commission</label>
                  <input type="text" value={editFormCommission} onChange={(e) => setEditFormCommission(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Bonus</label>
                  <input type="text" value={editFormBonus} onChange={(e) => setEditFormBonus(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Date</label>
                  <div className="flex items-center px-4 pb-3">
                    <input type="text" value={editFormDate} onChange={(e) => setEditFormDate(e.target.value)} className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0" style={{ color: '#000000' }} />
                    <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-600 ml-1" aria-hidden />
                  </div>
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Status</label>
                  <input type="text" value={editFormStatus} onChange={(e) => setEditFormStatus(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button type="button" onClick={handleEditSave} className="inline-flex items-center justify-center font-semibold rounded-md px-8 py-2.5 text-white hover:opacity-90 uppercase tracking-wide" style={{ backgroundColor: '#0082E3', width: '285px', height: '64px' }}>SAVE</button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Page title and action buttons: Filter, Add Employee +, Export */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold" style={{ color: BRAND_RED }}>
            Employee Management
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_RED, width: 202 }}
            >
              Filter
            </button>
            <button
              type="button"
              onClick={() => setShowAddPanel(true)}
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_RED, width: 202 }}
            >
              Add Employee
            </button>
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_RED, width: 202 }}
            >
              Export
            </button>
          </div>
        </div>

        {/* Filter row: Search, Department, Salary Status, Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <div className="flex items-center px-4 py-3">
              <img src={searchIcon} alt="" className="shrink-0 mr-1" style={{ width: 25, height: 25 }} aria-hidden />
              <input
                type="text"
                placeholder="Search"
                className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0 placeholder:text-black"
                style={{ color: '#000000' }}
              />
            </div>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <select defaultValue="" className="w-full rounded-lg text-slate-700 text-sm font-medium border-none py-2.5 px-4 pb-3 pt-3 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-transparent bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center]" style={selectBg}>
              <option value="" disabled>Department</option>
              <option>All</option>
              <option>Sales</option>
              <option>HR</option>
              <option>IT</option>
            </select>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <select defaultValue="" className="w-full rounded-lg text-slate-700 text-sm font-medium border-none py-2.5 px-4 pb-3 pt-3 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-transparent bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center]" style={selectBg}>
              <option value="" disabled>Salary Status</option>
              <option>All</option>
              <option>Pending Invoice</option>
              <option>Paid</option>
              <option>Success Invoice</option>
            </select>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <select defaultValue="" className="w-full rounded-lg text-slate-700 text-sm font-medium border-none py-2.5 px-4 pb-3 pt-3 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-transparent bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center]" style={selectBg}>
              <option value="" disabled>Role</option>
              <option>All</option>
              <option>Sales executive</option>
              <option>Manager</option>
              <option>Developer</option>
            </select>
          </div>
        </div>

        {/* Employee Salary Sheet table */}
        <div className="overflow-hidden">
          <div
            className="rounded-t-lg px-4 py-3"
            style={{
              backgroundColor: FILTER_BORDER,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: BRAND_RED,
              borderBottom: 'none',
            }}
          >
            <h2 className="text-xl font-bold" style={{ color: BRAND_RED }}>
              Employee Salary Sheet
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="font-semibold" style={{ color: '#000000' }}>
                  <th className="text-left py-3 px-4">Employee Name</th>
                  <th className="text-left py-3 px-4">ID</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Designation</th>
                  <th className="text-left py-3 px-4">Salary</th>
                  <th className="text-left py-3 px-4">Commission</th>
                  <th className="text-left py-3 px-4">Bonus</th>
                  <th className="text-left py-3 px-4">Month</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SALARY_SHEET.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-200 hover:bg-slate-50/50 bg-white">
                    <td className="py-3 px-4" style={{ color: '#000000' }}>
                      <span className="inline-flex items-center gap-2">
                        <span className="w-8 h-8 rounded-full bg-slate-300 shrink-0 flex items-center justify-center overflow-hidden">
                          <img src={userIcon} alt="" className="w-5 h-5 opacity-70" aria-hidden />
                        </span>
                        {row.employeeName}
                      </span>
                    </td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.id}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.department}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.designation}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.salary}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.commission}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.bonus}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.month}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.date}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: STATUS_GREEN }} aria-hidden />
                        <span style={{ color: '#000000' }}>{row.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => openEditPanel(row)} className="p-1.5 rounded hover:opacity-80 transition" aria-label="Edit">
                          <img src={editIcon} alt="" className="w-5 h-5" aria-hidden />
                        </button>
                        <button type="button" className="p-1.5 rounded hover:opacity-80 transition" aria-label="Copy">
                          <img src={copyIcon} alt="" className="w-5 h-5" aria-hidden />
                        </button>
                        <button type="button" className="p-1.5 rounded hover:opacity-80 transition" aria-label="Download">
                          <img src={downloadIcon} alt="" className="w-5 h-5" aria-hidden />
                        </button>
                        <button type="button" className="p-1.5 rounded hover:opacity-80 transition" aria-label="Delete">
                          <img src={trashIcon} alt="" className="w-5 h-5" aria-hidden />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Employee Salary Sheet Permission Tab */}
        <div className="overflow-hidden">
          <div
            className="rounded-t-lg px-4 py-3"
            style={{
              backgroundColor: '#CBE9FF',
              borderTop: `1px solid ${BRAND_RED}`,
              borderLeft: `1px solid ${BRAND_RED}`,
              borderRight: `1px solid ${BRAND_RED}`,
            }}
          >
            <h2 className="text-xl font-bold" style={{ color: BRAND_RED }}>
              Employee Salary Sheet Permission Tab
            </h2>
          </div>

          <div className="overflow-x-auto rounded-b-lg" style={{ border: `1px solid ${BRAND_RED}`, borderTop: 'none' }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="font-semibold bg-slate-100" style={{ color: '#000000' }}>
                  <th className="text-left py-3 px-4">Module</th>
                  <th className="text-left py-3 px-4">View</th>
                  <th className="text-left py-3 px-4">Add</th>
                  <th className="text-left py-3 px-4">Edit</th>
                  <th className="text-left py-3 px-4">Delete</th>
                  <th className="text-left py-3 px-4">Export</th>
                </tr>
              </thead>
              <tbody>
                {PERMISSION_ROWS.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-200 hover:bg-slate-50/50 bg-white">
                    <td className="py-3 px-4 font-semibold" style={{ color: '#000000' }}>{row.module}</td>
                    <td className="py-3 px-4 align-middle">
                      {row.view ? <PermissionCheck /> : <PermissionDeny />}
                    </td>
                    <td className="py-3 px-4 align-middle">
                      {row.add ? <PermissionCheck /> : <PermissionDeny />}
                    </td>
                    <td className="py-3 px-4 align-middle">
                      {row.edit ? <PermissionCheck /> : <PermissionDeny />}
                    </td>
                    <td className="py-3 px-4 align-middle">
                      {row.delete ? <PermissionCheck /> : <PermissionDeny />}
                    </td>
                    <td className="py-3 px-4 align-middle">
                      {row.export ? <PermissionCheck /> : <PermissionDeny />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom section: back (left) and next (right), consistent with all pages */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 pb-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard/employee-salary-record')}
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-white hover:opacity-90 tracking-wide shadow-lg"
            style={{ backgroundColor: BRAND_RED }}
          >
            Employee Salary Record
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/employee-salary-sheet')}
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-white hover:opacity-90 tracking-wide shadow-lg"
            style={{ backgroundColor: BRAND_RED }}
          >
            Employee salary sheet
          </button>
        </div>
      </div>
    </div>
  )
}
