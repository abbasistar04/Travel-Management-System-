import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import calendarIcon from '../../../assets/calendar-icon.svg'
import searchIcon from '../../../assets/search-icon.svg'
import userIcon from '../../../assets/user-icon.svg'
import documentIcon from '../../../assets/document-icon.svg'
import plusIcon from '../../../assets/plus-icon.svg'
import editIcon from '../../../assets/edit-icon.svg'
import copyIcon from '../../../assets/copy-icon.svg'
import downloadIcon from '../../../assets/download-icon.svg'
import trashIcon from '../../../assets/trash-icon.svg'

const BRAND_RED = '#c60000'
const FILTER_BG = '#F3FAFF'
const FILTER_BORDER = '#CBE9FF'
const STATUS_ORANGE = '#f59e0b'

const formFieldStyle = 'rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0'
const formFieldBorder = { borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }
const formLabelClass = 'text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block'

const MOCK_SALARY_RECORDS = [
  { no: '01', employee: 'M.Danish', department: 'Sales', basic: '60,000 PKR', allowance: '5,000 PKR', deduction: '2,000 PKR', commision: '10%', bonus: '5,000 PKR', salaryStatus: 'Pending Invoice' },
  { no: '01', employee: 'M.Asif', department: 'Sales', basic: '80,000 PKR', allowance: '5,000 PKR', deduction: '2,000 PKR', commision: '10%', bonus: '5,000 PKR', salaryStatus: 'Pending Invoice' },
  { no: '01', employee: 'Ali Hamza', department: 'Sales', basic: '80,000 PKR', allowance: '5,000 PKR', deduction: '2,000 PKR', commision: '10%', bonus: '5,000 PKR', salaryStatus: 'Pending Invoice' },
]

export function EmployeeSalaryRecordPage() {
  const navigate = useNavigate()
  const [showPanel, setShowPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [formEmployeeName, setFormEmployeeName] = useState('')
  const [formDesignation, setFormDesignation] = useState('')
  const [formCommission, setFormCommission] = useState('')
  const [formDate, setFormDate] = useState('')
  const [formDepartment, setFormDepartment] = useState('')
  const [formBasic, setFormBasic] = useState('')
  const [formBonus, setFormBonus] = useState('')
  const [formStatus, setFormStatus] = useState('')

  useEffect(() => {
    if (showPanel) {
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setPanelSlidIn(false)
    }
  }, [showPanel])

  const openPanel = (row = null) => {
    if (row) {
      setEditingRow(row)
      setFormEmployeeName(row.employee)
      setFormDesignation('Sale Exclutive')
      setFormCommission(row.commision)
      setFormDate('03/02/2022')
      setFormDepartment(row.department)
      setFormBasic(row.basic)
      setFormBonus(row.bonus)
      setFormStatus(row.salaryStatus)
    } else {
      setEditingRow(null)
      setFormEmployeeName('Ali Hamza')
      setFormDesignation('Sale Exclutive')
      setFormCommission('10%')
      setFormDate('03/02/2022')
      setFormDepartment('Sale')
      setFormBasic('60,000 PKR')
      setFormBonus('3,000 PKR')
      setFormStatus('Success')
    }
    setShowPanel(true)
  }

  const closePanel = () => {
    setShowPanel(false)
    setEditingRow(null)
  }

  const handleSave = () => {
    closePanel()
  }

  return (
    <div className="flex-1 overflow-auto flex flex-col max-h-[90vh] overflow-hidden min-h-0 bg-white relative">
      {/* Slide-over panel: Create / Edit Employee Salary Record */}
      {showPanel && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300"
            onClick={closePanel}
            aria-hidden
          />
          <div
            className="fixed top-1/2 left-1/2 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out"
            style={{
              maxWidth: 'min(100%, 36rem)',
              opacity: panelSlidIn ? 1 : 0, transform: panelSlidIn ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)'
            }}
          >
            <div className="flex items-center p-4 border-b border-b-[#66adff] shrink-0 bg-[#cbebff]">
              <h3 className="text-lg font-bold" style={{ color: BRAND_RED }}>
                create/Edit employee salary sheet
              </h3>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-white">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Employee Name</label>
                  <input type="text" value={formEmployeeName} onChange={(e) => setFormEmployeeName(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Department</label>
                  <input type="text" value={formDepartment} onChange={(e) => setFormDepartment(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Desicnation</label>
                  <input type="text" value={formDesignation} onChange={(e) => setFormDesignation(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Basic Salary</label>
                  <input type="text" value={formBasic} onChange={(e) => setFormBasic(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Commision</label>
                  <input type="text" value={formCommission} onChange={(e) => setFormCommission(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Bonus</label>
                  <input type="text" value={formBonus} onChange={(e) => setFormBonus(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Date</label>
                  <div className="flex items-center px-4 pb-3">
                    <input type="text" value={formDate} onChange={(e) => setFormDate(e.target.value)} className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0" style={{ color: '#000000' }} />
                    <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-600 ml-1" aria-hidden />
                  </div>
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Status</label>
                  <input type="text" value={formStatus} onChange={(e) => setFormStatus(e.target.value)} className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center font-semibold rounded-md px-8 py-2.5 text-white hover:opacity-90 uppercase tracking-wide"
                  style={{ backgroundColor: '#0082E3', width: '285px', height: '64px' }}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Page title and action buttons - icons on RIGHT of text */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold" style={{ color: BRAND_RED }}>
            Employee Salary Record
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openPanel()}
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white inline-flex items-center gap-2"
              style={{ backgroundColor: BRAND_RED }}
            >
              Create
              <img src={userIcon} alt="" className="w-5 h-5" aria-hidden />
            </button>
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white inline-flex items-center gap-2"
              style={{ backgroundColor: BRAND_RED }}
            >
              Download
              <img src={documentIcon} alt="" className="w-5 h-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => openPanel()}
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white inline-flex items-center gap-2"
              style={{ backgroundColor: BRAND_RED }}
            >
              Add New
              <img src={plusIcon} alt="" className="w-5 h-5" aria-hidden />
            </button>
          </div>
        </div>

        {/* Filter row: Search, Department, Salary Status, Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Search</label>
            <div className="flex items-center px-4 pb-3">
              <input
                type="text"
                placeholder="Search Employee"
                className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0 placeholder:text-black"
                style={{ color: '#000000' }}
              />
              <img src={searchIcon} alt="" className="w-5 h-5 shrink-0 ml-1 text-slate-600" aria-hidden />
            </div>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Department</label>
            <select
              className="w-full m-0 rounded-lg text-slate-700 text-sm font-medium border-none py-2.5 px-4 pb-3 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-transparent bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center]"
              style={{ backgroundColor: FILTER_BG, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")` }}
            >
              <option>Text</option>
              <option>Sales</option>
              <option>HR</option>
              <option>IT</option>
            </select>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Salary Status</label>
            <select
              className="w-full m-0 rounded-lg text-slate-700 text-sm font-medium border-none py-2.5 px-4 pb-3 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-transparent bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center]"
              style={{ backgroundColor: FILTER_BG, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")` }}
            >
              <option>Text</option>
              <option>Pending Invoice</option>
              <option>Paid</option>
            </select>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0 relative" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Date</label>
            <div className="flex items-center px-4 pb-3">
              <input
                type="text"
                defaultValue="2024-09-12"
                className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0"
                style={{ color: '#000000' }}
              />
              <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-800 ml-1" aria-hidden />
            </div>
          </div>
        </div>

        {/* Table section - title "Employee Salary Record" */}
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
              Employee Salary Record
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-600 font-semibold">
                  <th className="text-left py-3 px-4">No.</th>
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Basic</th>
                  <th className="text-left py-3 px-4">Allaowance</th>
                  <th className="text-left py-3 px-4">Deduction</th>
                  <th className="text-left py-3 px-4">Commision</th>
                  <th className="text-left py-3 px-4">Bonus</th>
                  <th className="text-left py-3 px-4">Salary Status</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SALARY_RECORDS.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-200 hover:bg-slate-50/50 bg-white">
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.no}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.employee}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.department}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.basic}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.allowance}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.deduction}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.commision}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.bonus}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full shrink-0"
                          style={{ backgroundColor: STATUS_ORANGE }}
                          aria-hidden
                        />
                        <span style={{ color: '#000000' }}>{row.salaryStatus}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => openPanel(row)} className="p-1.5 rounded hover:opacity-80 transition" aria-label="Edit">
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

        {/* Bottom section: back (left) and next (right), consistent with all pages */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 pb-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard/attendance-report')}
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-white hover:opacity-90 tracking-wide shadow-lg"
            style={{ backgroundColor: BRAND_RED }}
          >
            Attendance report
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard/employee-management')}
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-white hover:opacity-90 tracking-wide shadow-lg"
            style={{ backgroundColor: BRAND_RED }}
          >
            Employee Management
          </button>
        </div>
      </div>
    </div>
  )
}
