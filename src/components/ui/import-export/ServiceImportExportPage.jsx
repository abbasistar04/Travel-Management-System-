import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import calendarIcon from '../../../assets/calendar-icon.svg'
import { PassengerCreateEditPanel } from './PassengerCreateEditPanel'

const BRAND_RED = '#c60000'
const FIELD_BG = '#f1f5f9'
const LABEL_COLOR = '#64748b'
const PLACEHOLDER_COLOR = '#475569'

const fieldClass = 'w-full rounded-lg border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#c60000]/30 focus:border-[#c60000]'
const labelClass = 'block text-sm font-medium mb-1.5'
const chevronDown = (
  <svg className="w-5 h-5 shrink-0 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
)

export function ServiceImportExportPage() {
  const navigate = useNavigate()
  const [showPanel, setShowPanel] = useState(false)
  const [serviceTypeImport, setServiceTypeImport] = useState('Flight , Hotels')
  const [dateRangeStart, setDateRangeStart] = useState('03/08/2023')
  const [dateRangeEnd, setDateRangeEnd] = useState('03/04/2023')
  const [serviceTypeExport, setServiceTypeExport] = useState('Name,Price,Duration')
  const [exportFormat, setExportFormat] = useState('CVS')

  return (
    <div className="flex-1 overflow-auto flex flex-col min-h-0 bg-white relative">
      <PassengerCreateEditPanel isOpen={showPanel} onClose={() => setShowPanel(false)} />
      <div className="p-4 sm:p-6 space-y-6 min-w-0">
        {/* Page header: title left, Add service + Export service right */}
        <div className="flex flex-row items-center justify-between gap-4 w-full min-h-[36px] flex-wrap">
          <h1 className="text-2xl font-bold truncate min-w-0" style={{ color: BRAND_RED }}>
            Service Import/Export
          </h1>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setShowPanel(true)}
              className="px-4 py-2 rounded-lg text-white font-medium text-sm transition hover:opacity-90"
              style={{ backgroundColor: BRAND_RED }}
            >
              Add service
            </button>
            <button
              type="button"
              onClick={() => setShowPanel(true)}
              className="px-4 py-2 rounded-lg text-white font-medium text-sm transition hover:opacity-90"
              style={{ backgroundColor: BRAND_RED }}
            >
              Export service
            </button>
          </div>
        </div>

        {/* Two columns: Service Import (left) | Service Export (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Service Import */}
          <div className="flex flex-col gap-5">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg text-white font-semibold text-base transition hover:opacity-90"
              style={{ backgroundColor: BRAND_RED, width: 478, height: 100, padding: '32px 20px' }}
            >
              Service Import
              <span className="shrink-0 text-xl font-bold leading-none" aria-hidden>↓</span>
            </button>
            <div
              className={`${fieldClass} flex flex-col gap-1.5`}
              style={{ backgroundColor: FIELD_BG }}
            >
              <span className="text-sm font-medium" style={{ color: LABEL_COLOR }}>Choose file</span>
              <div className="flex items-center justify-between min-h-[28px]">
                <span className="flex-1 min-w-0 text-slate-600">Choose file/no choose file</span>
                <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-500" aria-hidden />
              </div>
            </div>
            <div
              className={`${fieldClass} flex flex-col gap-1.5`}
              style={{ backgroundColor: FIELD_BG }}
            >
              <span className="text-sm font-medium" style={{ color: LABEL_COLOR }}>Service type</span>
              <input
                type="text"
                value={serviceTypeImport}
                onChange={(e) => setServiceTypeImport(e.target.value)}
                className="w-full bg-transparent border-none px-0 py-0 text-sm focus:outline-none focus:ring-0 min-h-[28px]"
                style={{ color: '#0f172a' }}
              />
            </div>
            <div
              className={`${fieldClass} flex items-center justify-between cursor-pointer`}
              style={{ backgroundColor: FIELD_BG, color: PLACEHOLDER_COLOR }}
              role="button"
              tabIndex={0}
            >
              <span className="min-w-0">Select</span>
              {chevronDown}
            </div>
            <button
              type="button"
              className="w-full flex items-center justify-center px-6 py-3.5 rounded-lg text-white font-semibold text-base transition hover:opacity-90"
              style={{ backgroundColor: BRAND_RED }}
            >
              Import Booking
            </button>
          </div>

          {/* Right: Service Export */}
          <div className="flex flex-col gap-5">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg text-white font-semibold text-base transition hover:opacity-90"
              style={{ backgroundColor: BRAND_RED, width: 478, height: 100, padding: '32px 20px' }}
            >
              Service Export
              <span className="shrink-0 text-xl font-bold leading-none" aria-hidden>↑</span>
            </button>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`${fieldClass} flex flex-col gap-1.5`}
                style={{ backgroundColor: FIELD_BG }}
              >
                <span className="text-sm font-medium" style={{ color: LABEL_COLOR }}>Date Range</span>
                <div className="flex items-center justify-between min-h-[28px]">
                  <input
                    type="text"
                    value={dateRangeStart}
                    onChange={(e) => setDateRangeStart(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-slate-700"
                  />
                  <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-500" aria-hidden />
                </div>
              </div>
              <div
                className={`${fieldClass} flex flex-col gap-1.5`}
                style={{ backgroundColor: FIELD_BG }}
              >
                <span className="text-sm font-medium" style={{ color: LABEL_COLOR }}>Date Range</span>
                <div className="flex items-center justify-between min-h-[28px]">
                  <input
                    type="text"
                    value={dateRangeEnd}
                    onChange={(e) => setDateRangeEnd(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent border-none focus:outline-none focus:ring-0 text-sm text-slate-700"
                  />
                  <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 text-slate-500" aria-hidden />
                </div>
              </div>
            </div>
            <div
              className={`${fieldClass} flex flex-col gap-1.5 cursor-pointer`}
              style={{ backgroundColor: FIELD_BG }}
              role="button"
              tabIndex={0}
            >
              <span className="text-sm font-medium" style={{ color: LABEL_COLOR }}>Service type</span>
              <span className="text-slate-700 flex items-center justify-between min-h-[28px]">
                {serviceTypeExport}
                {chevronDown}
              </span>
            </div>
            <div
              className={`${fieldClass} flex flex-col gap-1.5 cursor-pointer`}
              style={{ backgroundColor: FIELD_BG }}
              role="button"
              tabIndex={0}
            >
              <span className="text-sm font-medium" style={{ color: LABEL_COLOR }}>Export format</span>
              <span className="text-slate-700 flex items-center justify-between min-h-[28px]">
                {exportFormat}
                {chevronDown}
              </span>
            </div>
            {/* No Export Booking button - export is via "Export service" in header */}
          </div>
        </div>

        {/* Passenger import/export button - bottom right */}
        <div className="flex justify-end pt-4 pb-6">
          <button
            type="button"
            onClick={() => navigate('/dashboard/import-export/passenger')}
            className="inline-flex items-center justify-center font-semibold rounded-lg px-6 py-3 text-white hover:opacity-90 tracking-wide shadow-sm"
            style={{ backgroundColor: BRAND_RED }}
          >
            Passenger import/export
          </button>
        </div>
      </div>
    </div>
  )
}
