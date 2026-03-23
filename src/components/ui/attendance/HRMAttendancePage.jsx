import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import calendarIcon from '../../../assets/calendar-icon.svg'
import searchIcon from '../../../assets/search-icon.svg'
import plusIcon from '../../../assets/plus-icon.svg'

const BRAND_RED = '#dc2626'
const FILTER_BG = '#F3FAFF'
const FILTER_BORDER = '#CBE9FF'
const STATUS_GREEN = '#12B669'
const STATUS_RED = '#ef4444'
const STATUS_AMBER = '#f59e0b'

const selectBg = {
  backgroundColor: FILTER_BG,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`,
}

const formFieldStyle = 'rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0'
const formFieldBorder = { borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }
const formLabelClass = 'text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block'

const MOCK_HRM_ATTENDANCE = [
  { employee: 'Ali Khan', date: '03-02-2022', status: 'Present', checkIn: '8:03 AM', checkOut: '4:45 PM', workHours: '8 Hours' },
  { employee: 'Ali Khan', date: '03-02-2022', status: 'Present', checkIn: '8:03 AM', checkOut: '4:45 PM', workHours: '8 Hours' },
  { employee: 'Ali Khan', date: '03-02-2022', status: 'Present', checkIn: '8:03 AM', checkOut: '4:45 PM', workHours: '8 Hours' },
  { employee: 'Ali Khan', date: '03-02-2022', status: 'Present', checkIn: '8:03 AM', checkOut: '4:45 PM', workHours: '8 Hours' },
]

function getStatusColor(status) {
  if (status === 'Present') return STATUS_GREEN
  if (status === 'Late') return STATUS_AMBER
  return STATUS_RED
}

export function HRMAttendancePage() {
  const navigate = useNavigate()
  const [showAddPanel, setShowAddPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)

  useEffect(() => {
    if (showAddPanel) {
      setPanelSlidIn(false)
      const t = requestAnimationFrame(() => requestAnimationFrame(() => setPanelSlidIn(true)))
      return () => cancelAnimationFrame(t)
    } else {
      setPanelSlidIn(false)
    }
  }, [showAddPanel])

  const closeAddPanel = () => setShowAddPanel(false)
  const handleAddSave = () => closeAddPanel()

  return (
    <div className="flex-1 overflow-auto flex flex-col max-h-[90vh] overflow-hidden min-h-0 bg-white relative">
      {/* Slide-over: Create/Edit HRM Attendance */}
      {showAddPanel && (
        <>
          <div className="fixed inset-0 bg-black/40 z-40 transition-opacity duration-300" onClick={closeAddPanel} aria-hidden />
          <div
            className="fixed top-1/2 left-1/2 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ease-out"
            style={{ maxWidth: 'min(100%, 36rem)', opacity: panelSlidIn ? 1 : 0, transform: panelSlidIn ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.95)'}}
          >
            <div className="flex items-center justify-center p-4 border-b border-b-[#66adff] shrink-0 bg-[#cbebff]">
              <h3 className="text-lg font-bold" style={{ color: BRAND_RED }}>Create/Edit HRM Attendance</h3>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-white">
              <div className="grid grid-cols-2 gap-4">
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass} style={{ color: '#64748b' }}>Employee Name</label>
                  <input type="text" defaultValue="Ali Khan" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#334155' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass} style={{ color: '#64748b' }}>Date</label>
                  <div className="flex items-center px-4 pb-3">
                    <input type="text" defaultValue="02/04/2022" className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0" style={{ color: '#334155' }} />
                    <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-500 ml-1" aria-hidden />
                  </div>
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass} style={{ color: '#64748b' }}>Status</label>
                  <input type="text" defaultValue="present" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#334155' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass} style={{ color: '#64748b' }}>Check In</label>
                  <input type="text" defaultValue="8:00am" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#334155' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass} style={{ color: '#64748b' }}>Work Hours</label>
                  <input type="text" defaultValue="9 Hours" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#334155' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass} style={{ color: '#64748b' }}>Check Out</label>
                  <input type="text" defaultValue="4:00 PM" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 pb-3 focus:outline-none focus:ring-0" style={{ color: '#334155' }} />
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <button type="button" onClick={handleAddSave} className="inline-flex items-center justify-center font-semibold rounded-md text-white hover:opacity-90 uppercase tracking-wide" style={{ backgroundColor: BRAND_RED, width: 300, height: 56 }}>SAVE</button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Page title and action buttons: Filter, Add Employee +, Export */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold" style={{ color: BRAND_RED }}>
            HRM Attendance
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_RED }}
            >
              Filter
            </button>
            <button
              type="button"
              onClick={() => setShowAddPanel(true)}
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white inline-flex items-center gap-2"
              style={{ backgroundColor: BRAND_RED }}
            >
              Add Employee
              <img src={plusIcon} alt="" className="w-5 h-5" aria-hidden />
            </button>
            <button
              type="button"
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_RED }}
            >
              Export
            </button>
          </div>
        </div>

        {/* Filter row: Search Employee, Department, Salary Status, Date From, Payment Method */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Search Employee</label>
            <div className="flex items-center px-4 pb-3">
              <input
                type="text"
                placeholder="Search Employee"
                className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0 placeholder:text-black"
                style={{ color: '#000000' }}
              />
              <img src={searchIcon} alt="" className="shrink-0 ml-1" style={{ width: 25, height: 25 }} aria-hidden />
            </div>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Department</label>
            <select defaultValue="" className="w-full rounded-lg text-slate-700 text-sm font-medium border-none py-2.5 px-4 pb-3 pt-3 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-transparent bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center]" style={selectBg}>
              <option value="" disabled>Department</option>
              <option>All</option>
              <option>Sales</option>
              <option>HR</option>
              <option>IT</option>
              <option>Engineering</option>
            </select>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Salary Status</label>
            <select defaultValue="" className="w-full rounded-lg text-slate-700 text-sm font-medium border-none py-2.5 px-4 pb-3 pt-3 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-transparent bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center]" style={selectBg}>
              <option value="" disabled>Salary Status</option>
              <option>All</option>
              <option>Pending</option>
              <option>Paid</option>
            </select>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Date From</label>
            <div className="flex items-center px-4 pb-3">
              <input
                type="text"
                defaultValue="2024-09-12"
                className="flex-1 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0"
                style={{ color: '#000000' }}
              />
              <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 ml-1 text-slate-800" aria-hidden />
            </div>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Payment Method</label>
            <select defaultValue="" className="w-full rounded-lg text-slate-700 text-sm font-medium border-none py-2.5 px-4 pb-3 pt-3 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-transparent bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center]" style={selectBg}>
              <option value="" disabled>Payment Method</option>
              <option>All</option>
              <option>Bank Transfer</option>
              <option>Cash</option>
              <option>Cheque</option>
            </select>
          </div>
        </div>

        {/* HRM Attendance Sheet table */}
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
              HRM Attendance Sheet
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="font-semibold" style={{ color: '#000000' }}>
                  <th className="text-left py-3 px-4">Employee</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Check in</th>
                  <th className="text-left py-3 px-4">Check out</th>
                  <th className="text-left py-3 px-4">Work Hours</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_HRM_ATTENDANCE.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-200 hover:bg-slate-50/50 bg-white">
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.employee}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.date}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: getStatusColor(row.status) }}
                          aria-hidden
                        />
                        <span style={{ color: '#000000' }}>{row.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.checkIn}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.checkOut}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.workHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom-right: back to parent section (consistent with all pages) */}
        <div className="flex justify-end pt-4 pb-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard/employee-salary-sheet')}
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-white hover:opacity-90 tracking-wide shadow-lg"
            style={{ backgroundColor: BRAND_RED }}
          >
            Employee Salary Sheet
          </button>
        </div>
      </div>
    </div>
  )
}
