import { useState, useEffect } from 'react'
import calendarIcon from '../../../assets/calendar-icon.svg'
import crossIcon from '../../../assets/cross-icon.svg'
import editIcon from '../../../assets/edit-icon.svg'
import downloadIcon from '../../../assets/download-icon.svg'
import trashIcon from '../../../assets/trash-icon.svg'

const BRAND_RED = '#c60000'
const FILTER_BG = '#F3FAFF'
const FILTER_BORDER = '#CBE9FF'

const formFieldStyle = 'rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0'
const formFieldBorder = { borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }
const formLabelClass = 'text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block'
const formInputClass = 'w-full text-slate-700 placeholder-slate-500 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0'
const formSelectClass = 'rounded-lg bg-transparent border-none text-slate-700 text-sm font-medium py-2.5 px-4 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center] w-full'
const formSelectBg = { backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231f2937'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")` }

const MOCK_SERVICES = [
  { no: 1, service: 'USA Visa', type: 'Visa', price: '150,000 PKR', currency: 'OMR', status: 'Present', createdDate: '09/08/2022' },
  { no: 2, service: '5 star Hostel', type: '5 star hotel', price: '150,000 PKR', currency: 'OMR', status: 'Present', createdDate: '09/08/2022' },
  { no: 3, service: '5 star hotel', type: '5 star hotel', price: '150,000 PKR', currency: 'OMR', status: 'Present', createdDate: '09/08/2022' },
]

export function ServicesPage() {
  const [showPanel, setShowPanel] = useState(false)
  const [panelSlidIn, setPanelSlidIn] = useState(false)
  const [editingRow, setEditingRow] = useState(null)
  const [formService, setFormService] = useState('')
  const [formType, setFormType] = useState('Visa/Tour')
  const [formPrice, setFormPrice] = useState('')
  const [formCurrency, setFormCurrency] = useState('OMR')
  const [formStatus, setFormStatus] = useState('Present')
  const [formDate, setFormDate] = useState('2024-09-12')

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
      setFormService(row.service)
      setFormType(row.type || 'Visa/Tour')
      setFormPrice(row.price)
      setFormCurrency(row.currency)
      setFormStatus(row.status)
      setFormDate(row.createdDate)
    } else {
      setEditingRow(null)
      setFormService('')
      setFormType('Visa/Tour')
      setFormPrice('')
      setFormCurrency('OMR')
      setFormStatus('Present')
      setFormDate('2024-09-12')
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
      {/* Slide-over panel from right */}
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
                {editingRow ? 'Edit Service' : 'Create Service'}
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
                  <label className={formLabelClass}>Service</label>
                  <input
                    type="text"
                    value={formService}
                    onChange={(e) => setFormService(e.target.value)}
                    placeholder="Service name"
                    className={formInputClass}
                  />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Type</label>
                  <input
                    type="text"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value)}
                    placeholder="Visa/Tour"
                    className={formInputClass}
                  />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Price</label>
                  <input
                    type="text"
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    placeholder="e.g. 150,000 PKR"
                    className={formInputClass}
                  />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Status</label>
                  <input
                    type="text"
                    value="Present"
                    readOnly
                    className={formInputClass}
                  />
                </div>
                <div className={formFieldStyle} style={formFieldBorder}>
                  <label className={formLabelClass}>Created Date</label>
                  <input
                    type="text"
                    value="9 hours"
                    readOnly
                    className={formInputClass}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex items-center justify-center font-semibold rounded-[2px] px-8 py-2.5 text-white hover:opacity-90 uppercase tracking-wide"
                  style={{ backgroundColor: BRAND_RED, width: '300px', height: '70px' }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* Page title and action buttons */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-xl font-bold" style={{ color: BRAND_RED }}>
            Service
          </h1>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openPanel(null)}
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_RED }}
            >
              Create Services
            </button>
            <button
              type="button"
              onClick={() => openPanel(null)}
              className="rounded-md px-4 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: BRAND_RED }}
            >
              Create Edit
            </button>
          </div>
        </div>

        {/* Filter row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">PNR Code</label>
            <input
              type="text"
              defaultValue="#0923"
              className="w-full text-slate-700 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0"
            />
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Passenger Name</label>
            <input
              type="text"
              defaultValue="Mr. Ali"
              className="w-full text-slate-700 text-sm bg-transparent border-none px-4 pb-3 focus:outline-none focus:ring-0"
            />
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Traveller Type</label>
            <select
              className="rounded-lg bg-transparent border-none text-slate-700 text-sm font-medium py-2.5 px-4 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center] w-full"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231f2937'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")` }}
            >
              <option>Select</option>
            </select>
          </div>
          <div className="rounded-lg border flex flex-col max-h-[90vh] overflow-hidden min-w-0" style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}>
            <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Date</label>
            <div className="flex items-center px-4 pb-3">
              <input
                type="text"
                defaultValue="2024-09-12"
                className="w-full text-slate-700 text-sm bg-transparent border-none focus:outline-none focus:ring-0"
              />
              <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-600" aria-hidden />
            </div>
          </div>
        </div>

        {/* Service table section title */}
        <h2 className="text-xl font-bold" style={{ color: BRAND_RED }}>
          Service
        </h2>

        {/* Table */}
        <div className="rounded-lg border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600 font-semibold">
                  <th className="text-left py-3 px-4">NO</th>
                  <th className="text-left py-3 px-4">Service</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Currency</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Created Date</th>
                  <th className="text-left py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_SERVICES.map((row) => (
                  <tr key={row.no} className="border-t border-slate-200 hover:bg-slate-50/50">
                    <td className="py-3 px-4 text-slate-700">{row.no}</td>
                    <td className="py-3 px-4 text-slate-700">{row.service}</td>
                    <td className="py-3 px-4 text-slate-700">{row.type}</td>
                    <td className="py-3 px-4 text-slate-700">{row.price}</td>
                    <td className="py-3 px-4 text-slate-700">{row.currency}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" aria-hidden />
                        <span className="text-slate-700">{row.status}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700">{row.createdDate}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openPanel(row)}
                          className="p-1.5 rounded hover:bg-slate-200 transition"
                          aria-label="Edit"
                        >
                          <img src={editIcon} alt="" className="w-5 h-5" aria-hidden />
                        </button>
                        <button type="button" className="p-1.5 rounded hover:bg-slate-200 transition" aria-label="Download">
                          <img src={downloadIcon} alt="" className="w-5 h-5" aria-hidden />
                        </button>
                        <button type="button" className="p-1.5 rounded hover:bg-slate-200 transition" aria-label="Delete">
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
    </div>
  )
}
