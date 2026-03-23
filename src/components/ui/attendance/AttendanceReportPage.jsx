import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'

const BRAND_RED = '#c60000'
const FILTER_BG = '#F3FAFF'
const FILTER_BORDER = '#CBE9FF'
const STATUS_GREEN = '#12B669'
const STATUS_RED = '#ef4444'
const STATUS_AMBER = '#f59e0b'
const CARD_TOTAL_EMPLOYEE = '#C0E4FF'
const CARD_TOTAL_PRESENT = '#BDBCDB'
const CARD_LATE_ENTRIES = '#D0BCFF'
const CARD_LEAVES_APPROVED = '#C0C1FF'

const formFieldStyle = 'rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0'
const formFieldBorder = { borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }
const formLabelClass = 'text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block'

const MOCK_ATTENDANCE = [
  { date: 'Feb 09 2024', employeeName: 'Ali Raza', department: 'Sales', checkIn: '09:00 AM', checkOut: '5:00 PM', status: 'Present', remarks: '-' },
  { date: 'Feb 09 2024', employeeName: 'Ali Raza', department: 'Sales', checkIn: '09:00 AM', checkOut: '5:00 PM', status: 'Present', remarks: '-' },
  { date: 'Feb 09 2024', employeeName: 'Ali Raza', department: 'Sales', checkIn: '09:00 AM', checkOut: '5:00 PM', status: 'Present', remarks: '-' },
]

function getStatusColor(status) {
  if (status === 'Present') return STATUS_GREEN
  if (status === 'Late') return STATUS_AMBER
  return STATUS_RED
}

export function AttendanceReportPage() {
  const navigate = useNavigate()
  const [showPanel, setShowPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [formDate, setFormDate] = useState('')
  const [formType, setFormType] = useState('')
  const [formDescription, setFormDescription] = useState('')
  const [formAmount, setFormAmount] = useState('')
  const [formRefNo, setFormRefNo] = useState('')

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
      setFormDate(row.date)
      setFormType(row.department)
      setFormDescription(row.employeeName)
      setFormAmount('')
      setFormRefNo(row.remarks ?? '')
    } else {
      setEditingRow(null)
      setFormDate('03/08/2023')
      setFormType('Payment')
      setFormDescription('Dubai tour')
      setFormAmount('1,000,000 PKR')
      setFormRefNo('0122')
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
      {/* Slide-over panel from right - same as BookingsListPage */}
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
            <div className="flex items-center justify-between p-4 border-b border-b-[#66adff] shrink-0 bg-[#cbebff]">
              <h3 className="text-lg font-bold" style={{ color: BRAND_RED }}>
                {editingRow ? 'Edit Attendance' : 'Create Attendance'}
              </h3>
              <button
                type="button"
                onClick={closePanel}
                className="p-1.5 rounded hover:bg-white/60 transition"
                aria-label="Close"
              >
                <img src={crossIcon} alt="" className="w-5 h-5" aria-hidden />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-6 bg-white">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Date</label>
                  <div className="flex items-center px-4 pb-3">
                    <input type="text" value={formDate} onChange={(e) => setFormDate(e.target.value)} className="flex-1 placeholder-slate-500 text-sm bg-transparent border-none focus:outline-none focus:ring-0 min-w-0" placeholder="e.g. 03/08/2023" style={{ color: '#000000' }} />
                    <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-600 ml-1" aria-hidden />
                  </div>
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Type</label>
                  <input type="text" value={formType} onChange={(e) => setFormType(e.target.value)} placeholder="e.g. Payment" className="w-full text-sm font-medium bg-transparent border-none py-2.5 px-4 focus:outline-none focus:ring-0" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Description</label>
                  <input type="text" value={formDescription} onChange={(e) => setFormDescription(e.target.value)} className="w-full placeholder-slate-500 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0" placeholder="e.g. Dubai tour" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Amount</label>
                  <input type="text" value={formAmount} onChange={(e) => setFormAmount(e.target.value)} className="w-full placeholder-slate-500 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0" placeholder="e.g. 1,000,000 PKR" style={{ color: '#000000' }} />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Ref no,</label>
                  <input type="text" value={formRefNo} onChange={(e) => setFormRefNo(e.target.value)} className="w-full placeholder-slate-500 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0" placeholder="e.g. 0122" style={{ color: '#000000' }} />
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center font-semibold rounded-[2px] px-8 py-2.5 text-white hover:opacity-90 uppercase tracking-wide"
                  style={{ backgroundColor: BRAND_RED, width: '300px', height: '70px' }}
                >
                  SAVE
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Page title and Create Attendance button */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold" style={{ color: BRAND_RED }}>
            Attendance Reports
          </h1>
          <button
            type="button"
            onClick={() => openPanel()}
            className="rounded-md px-4 py-2.5 text-sm font-semibold text-white"
            style={{ backgroundColor: BRAND_RED }}
          >
            Create Attendance
          </button>
        </div>

        {/* Filter row: PNR Code, Passenger Name, Traveller Type, Date */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">PNR Code:</label>
            <input
              type="text"
              defaultValue="#0923"
              className="w-full text-slate-800 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0"
            />
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Passenger Name</label>
            <input
              type="text"
              defaultValue="Mr. Ali"
              className="w-full text-slate-800 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0"
            />
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0 items-center justify-center min-h-[66px] py-3 px-4" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <select
              className="w-full m-0 rounded-lg text-slate-700 text-sm font-medium border-none py-2.5 px-4 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center]"
              style={{ backgroundColor: FILTER_BG, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23475569'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")` }}
            >
              <option>Traveller Type</option>
              <option>Adult</option>
              <option>Child</option>
              <option>Infant</option>
            </select>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Date</label>
            <div className="flex items-center px-4 pb-3">
              <input
                type="text"
                defaultValue="2024-09-12"
                placeholder="2024-09-12"
                className="w-full text-slate-800 text-sm bg-transparent border-none focus:outline-none focus:ring-0 placeholder-slate-500"
              />
              <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-800" aria-hidden />
            </div>
          </div>
        </div>

        {/* Summary metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border border-slate-200 p-4 flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ backgroundColor: CARD_TOTAL_EMPLOYEE }}>
            <span className="text-xs font-medium text-slate-600">Total Employee</span>
            <span className="text-2xl font-bold text-slate-800 mt-1">120</span>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ backgroundColor: CARD_TOTAL_PRESENT }}>
            <span className="text-xs font-medium text-slate-600">Total Present</span>
            <span className="text-2xl font-bold text-slate-800 mt-1">23</span>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ backgroundColor: CARD_LATE_ENTRIES }}>
            <span className="text-xs font-medium text-slate-600">Late Entries</span>
            <span className="text-2xl font-bold text-slate-800 mt-1">2</span>
          </div>
          <div className="rounded-lg border border-slate-200 p-4 flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ backgroundColor: CARD_LEAVES_APPROVED }}>
            <span className="text-xs font-medium text-slate-600">Leaves Approved</span>
            <span className="text-2xl font-bold text-slate-800 mt-1">5</span>
          </div>
        </div>

        {/* Attendance Report table section */}
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
              Attendance Report
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-600 font-semibold">
                  <th className="text-left py-3 px-4">Dates</th>
                  <th className="text-left py-3 px-4">Employee Name</th>
                  <th className="text-left py-3 px-4">Department</th>
                  <th className="text-left py-3 px-4">Check in</th>
                  <th className="text-left py-3 px-4">Check out</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ATTENDANCE.map((row, idx) => (
                  <tr key={idx} className="border-t border-slate-200 hover:bg-slate-50/50 bg-white">
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.date}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.employeeName}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.department}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.checkIn}</td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.checkOut}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5">
                        <span
                          className="w-4 h-4 rounded-full shrink-0"
                          style={{ backgroundColor: getStatusColor(row.status) }}
                          aria-hidden
                        />
                        <span style={{ color: '#000000' }}>{row.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4" style={{ color: '#000000' }}>{row.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom-right: next section (consistent with all pages) */}
        <div className="flex justify-end pt-4 pb-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard/employee-salary-record')}
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-white hover:opacity-90 tracking-wide shadow-lg"
            style={{ backgroundColor: BRAND_RED }}
          >
            Employee salary record
          </button>
        </div>
      </div>
    </div>
  )
}
