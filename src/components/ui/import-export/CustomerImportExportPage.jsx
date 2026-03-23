import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import editIcon from '../../../assets/edit-icon.svg'
import { PassengerCreateEditPanel } from './PassengerCreateEditPanel'
import copyIcon from '../../../assets/copy-icon.svg'
import downloadIcon from '../../../assets/download-icon.svg'
import trashIcon from '../../../assets/trash-icon.svg'

const BRAND_RED = '#c60000'
const TABLE_HEADER_BG = '#E8F4FC'
const STATUS_GREEN = '#12B669'

const MOCK_IMPORT_LOG = [
  { fileName: 'Customer_upload_27_july.cvs', status: 'Success', date: '27 july 2023', uploadBy: 'Admin' },
  { fileName: 'Customer_upload_27_july.cvs', status: 'Success', date: '27 july 2023', uploadBy: 'Admin' },
  { fileName: 'Customer_upload_27_july.cvs', status: 'Success', date: '27 july 2023', uploadBy: 'Admin' },
  { fileName: 'Customer_upload_27_july.cvs', status: 'Success', date: '27 july 2023', uploadBy: 'Admin' },
]

export function CustomerImportExportPage() {
  const navigate = useNavigate()
  const [showPanel, setShowPanel] = useState(false)
  const [editingRow, setEditingRow] = useState(null)

  return (
    <div className="flex-1 overflow-auto flex flex-col min-h-0 bg-white relative">
      <PassengerCreateEditPanel
        isOpen={showPanel}
        onClose={() => { setShowPanel(false); setEditingRow(null) }}
        initialData={editingRow}
      />
      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 min-w-0">
        {/* Header: title left, Export Button right - single row */}
        <div className="flex flex-row items-center justify-between gap-4 w-full min-h-[36px]">
          <h1 className="text-2xl font-bold truncate min-w-0" style={{ color: BRAND_RED }}>
            Customer Import/Export
          </h1>
          <button
            type="button"
            onClick={() => setShowPanel(true)}
            className="shrink-0 px-4 py-2 rounded-lg text-white font-medium text-sm transition hover:opacity-90"
            style={{ backgroundColor: BRAND_RED }}
          >
            Export Button
          </button>
        </div>

        {/* Main action buttons: large, side-by-side, text then arrow */}
        <div className="flex flex-row items-center gap-6 flex-wrap">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-white font-semibold text-base transition hover:opacity-90 min-h-[44px]"
            style={{ backgroundColor: BRAND_RED }}
          >
            Customer Import
            <span className="shrink-0 text-xl font-bold leading-none" aria-hidden>↓</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-white font-semibold text-base transition hover:opacity-90 min-h-[44px]"
            style={{ backgroundColor: BRAND_RED }}
          >
            Customer Export
            <span className="shrink-0 text-xl font-bold leading-none" aria-hidden>↑</span>
          </button>
        </div>

        {/* Import Log Table section */}
        <section className="min-w-0 overflow-hidden" aria-labelledby="import-log-title">
          <div className="overflow-hidden rounded-t-lg rounded-b-lg border border-slate-200 shadow-sm">
            {/* Table title bar - faint light-blue background strip */}
            <div
              id="import-log-title"
              className="px-4 py-3 border-b border-slate-200"
              style={{ backgroundColor: TABLE_HEADER_BG }}
            >
              <h2 className="text-xl font-bold" style={{ color: BRAND_RED }}>
                Import Log Table
              </h2>
            </div>

            <div className="overflow-x-auto bg-white">
              <table className="w-full text-sm text-left border-collapse" style={{ minWidth: '600px' }}>
                <thead>
                  <tr className="font-semibold text-slate-700 bg-slate-50 border-b border-slate-200">
                    <th className="text-left py-3 px-4">File Name</th>
                    <th className="text-left py-3 px-4">Status</th>
                    <th className="text-left py-3 px-4">Date</th>
                    <th className="text-left py-3 px-4">Upload By</th>
                    <th className="text-left py-3 px-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_IMPORT_LOG.map((row, idx) => (
                    <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50/50 bg-white last:border-b-0">
                      <td className="py-3 px-4 text-slate-900">{row.fileName}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                          <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: STATUS_GREEN }} aria-hidden />
                          <span className="text-slate-900">{row.status}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-900">{row.date}</td>
                      <td className="py-3 px-4 text-slate-900">{row.uploadBy}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button type="button" onClick={() => { setEditingRow(row); setShowPanel(true) }} className="p-1.5 rounded hover:opacity-80 transition" aria-label="Edit">
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
        </section>

        {/* Booking import/export button - bottom right */}
        <div className="flex justify-end pt-4 pb-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard/import-export/booking')}
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-white hover:opacity-90 tracking-wide shadow-sm"
            style={{ backgroundColor: BRAND_RED }}
          >
            Booking import/export
          </button>
        </div>
      </div>
    </div>
  )
}
