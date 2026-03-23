import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import calendarIcon from '../../../assets/calendar-icon.svg'
import editIcon from '../../../assets/edit-icon.svg'
import copyIcon from '../../../assets/copy-icon.svg'
import downloadIcon from '../../../assets/download-icon.svg'
import trashIcon from '../../../assets/trash-icon.svg'
import { AssetsCreateEditPanel } from './AssetsCreateEditPanel'

const BRAND_RED = '#c60000'
const FILTER_BG = '#F3FAFF'
const FILTER_BORDER = '#CBE9FF'

const formFieldStyle = 'rounded-lg border flex flex-col min-w-0'
const formFieldBorder = { borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }
const formSelectClass = 'rounded-lg bg-transparent border-none text-slate-700 text-sm font-medium py-2.5 px-4 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center] w-full'
const formSelectBg = { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231f2937'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")` }

const MOCK_LIABILITIES = [
  { id: 1, name: 'Emirates tickets payment', status: 'Paid', type: 'Supplier Due', value: '50,000 PKR', dueDate: '02/03/2022' },
  { id: 2, name: 'Emirates tickets payment', status: 'Paid', type: 'Supplier Due', value: '50,000 PKR', dueDate: '02/03/2022' },
  { id: 3, name: 'Emirates tickets payment', status: 'Paid', type: 'Supplier Due', value: '50,000 PKR', dueDate: '02/03/2022' },
  { id: 4, name: 'Emirates tickets payment', status: 'Paid', type: 'Supplier Due', value: '50,000 PKR', dueDate: '02/03/2022' },
]

export function LiabilitiesPage() {
  const navigate = useNavigate()
  const [showEditPanel, setShowEditPanel] = useState(false)
  const [liabilitiesType, setLiabilitiesType] = useState('')
  const [status, setStatus] = useState('')
  const [dueDate, setDueDate] = useState('2024-09-12')

  return (
    <div className="flex-1 overflow-auto flex flex-col min-h-0 bg-white relative">
      <AssetsCreateEditPanel isOpen={showEditPanel} onClose={() => setShowEditPanel(false)} />
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 min-w-0">
        {/* Page header: title + Add Liabilities button */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: BRAND_RED }}>
            Liabilities
          </h1>
          <button
            type="button"
            onClick={() => setShowEditPanel(true)}
            className="shrink-0 px-5 py-2.5 rounded-lg text-white font-semibold text-sm transition hover:opacity-90"
            style={{ backgroundColor: BRAND_RED }}
          >
            Add Liabilities
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className={`${formFieldStyle} flex items-center justify-center`} style={{ ...formFieldBorder, width: 361, height: 56 }}>
            <select
              value={liabilitiesType}
              onChange={(e) => setLiabilitiesType(e.target.value)}
              className={formSelectClass}
              style={formSelectBg}
            >
              <option value="">Liabilities Type</option>
              <option value="supplier-due">Supplier Due</option>
              <option value="loan">Loan</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className={`${formFieldStyle} flex items-center justify-center`} style={{ ...formFieldBorder, width: 361, height: 56 }}>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={formSelectClass}
              style={formSelectBg}
            >
              <option value="">Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div className={`${formFieldStyle} flex items-center justify-center`} style={{ ...formFieldBorder, width: 361, height: 56 }}>
            <div className="flex items-center justify-between gap-2 px-4 w-full">
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="flex-1 min-w-0 text-sm font-medium text-slate-700 bg-transparent border-none p-0 focus:outline-none focus:ring-0 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full"
              />
              <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 opacity-80 pointer-events-none" aria-hidden />
            </div>
          </div>
        </div>

        {/* Liabilities Log Table section */}
        <section className="min-w-0 overflow-hidden" aria-labelledby="liabilities-log-title">
          <div className="overflow-hidden">
            <div
              className="rounded-t-lg px-4 py-3 border border-b-0 border-slate-200"
              style={{ backgroundColor: FILTER_BORDER }}
            >
              <h2 id="liabilities-log-title" className="text-xl font-bold" style={{ color: BRAND_RED }}>
                Liabilities Log Table
              </h2>
            </div>

            <div className="min-w-0 rounded-b-lg border border-t-0 border-slate-200 shadow-sm overflow-hidden bg-white">
              <div className="overflow-x-auto min-w-0">
                <table className="w-full text-sm text-left text-slate-700 border-collapse" style={{ minWidth: '800px', tableLayout: 'auto' }}>
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-medium">
                    <tr>
                      <th scope="col" className="px-5 py-3 whitespace-nowrap align-middle">Name</th>
                      <th scope="col" className="px-5 py-3 whitespace-nowrap align-middle">Status</th>
                      <th scope="col" className="px-5 py-3 whitespace-nowrap align-middle">Type</th>
                      <th scope="col" className="px-5 py-3 whitespace-nowrap align-middle">Value</th>
                      <th scope="col" className="px-5 py-3 whitespace-nowrap align-middle">Due date</th>
                      <th scope="col" className="px-5 py-3 whitespace-nowrap align-middle">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MOCK_LIABILITIES.map((row) => (
                      <tr key={row.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                        <td className="px-5 py-3 align-middle">{row.name}</td>
                        <td className="px-5 py-3 align-middle">
                          <span className="inline-flex items-center gap-2">
                            <span className="inline-block w-2 h-2 rounded-full shrink-0 bg-green-500" aria-hidden />
                            {row.status}
                          </span>
                        </td>
                        <td className="px-5 py-3 align-middle">{row.type}</td>
                        <td className="px-5 py-3 align-middle">{row.value}</td>
                        <td className="px-5 py-3 align-middle">{row.dueDate}</td>
                        <td className="px-5 py-3 align-middle">
                          <div className="flex gap-2 items-center flex-nowrap">
                            <button type="button" onClick={() => setShowEditPanel(true)} className="p-1.5 rounded hover:bg-slate-200 shrink-0" aria-label="Edit">
                              <img src={editIcon} alt="" className="w-5 h-5" aria-hidden />
                            </button>
                            <button type="button" className="p-1.5 rounded hover:bg-slate-200 shrink-0" aria-label="Copy">
                              <img src={copyIcon} alt="" className="w-5 h-5" aria-hidden />
                            </button>
                            <button type="button" className="p-1.5 rounded hover:bg-slate-200 shrink-0" aria-label="Download">
                              <img src={downloadIcon} alt="" className="w-5 h-5" aria-hidden />
                            </button>
                            <button type="button" className="p-1.5 rounded hover:bg-slate-200 shrink-0" aria-label="Delete">
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
          </div>
        </section>

        {/* Expense button - bottom right */}
        <div className="flex justify-end pt-4 pb-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard/expense')}
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-white hover:opacity-90 tracking-wide shadow-lg"
            style={{ backgroundColor: BRAND_RED }}
          >
            Expense
          </button>
        </div>
      </div>
    </div>
  )
}
