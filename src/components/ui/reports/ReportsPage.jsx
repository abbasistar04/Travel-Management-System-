import { useNavigate } from 'react-router-dom'
import documentIcon from '../../../assets/document-icon.svg'

const BRAND_RED = '#c60000'
const CARD_TEXT = '#CBE9FF'

const REPORT_CARDS = [
  { label: 'Sales record', path: '/dashboard/reports-list' },
  { label: 'Income and expense', path: '/dashboard/accounting' },
  { label: 'Commission', path: '/dashboard/reports/commission', state: { title: 'Commission' } },
  { label: 'Salaries record', path: '/dashboard/reports/salaries-record', state: { title: 'Salaries record' } },
  { label: 'Salaries + record', path: '/dashboard/reports/salaries-plus-record', state: { title: 'Salaries + record' } },
  { label: 'Agency report', path: '/dashboard/reports/agency-report', state: { title: 'Agency report' } },
  { label: 'Net profit', path: '/dashboard/reports/net-profit', state: { title: 'Net profit' } },
  { label: 'HRM reports', path: '/dashboard/reports/hrm-reports', state: { title: 'HRM reports' } },
  { label: 'Attendance Report', path: '/dashboard/attendance-report' },
]

export function ReportsPage() {
  const navigate = useNavigate()

  return (
    <div className="flex-1 overflow-auto p-4 sm:p-6 bg-white min-h-0">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-xl font-bold text-slate-800 mb-6" style={{ color: BRAND_RED }}>
          Reports
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REPORT_CARDS.map((card, i) => (
            <button
              key={i}
              type="button"
              onClick={() => navigate(card.path, { state: card.state ?? undefined })}
              className="w-full rounded-xl flex flex-col items-center justify-center gap-4 p-8 min-h-[200px] sm:min-h-[220px] text-left transition hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400"
              style={{ backgroundColor: BRAND_RED }}
            >
              <img src={documentIcon} alt="" className="w-14 h-14 shrink-0 object-contain" aria-hidden />
              <span className="text-sm font-medium text-center" style={{ color: CARD_TEXT }}>
                {card.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
