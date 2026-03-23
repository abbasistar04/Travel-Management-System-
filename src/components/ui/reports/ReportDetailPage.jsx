import { useLocation, useNavigate } from 'react-router-dom'

const BRAND_RED = '#c60000'

const SLUG_TO_TITLE = {
  'sales-record': 'Sales record',
  'income-expense': 'Income and expense',
  'commission': 'Commission',
  'salaries-record': 'Salaries record',
  'salaries-plus-record': 'Salaries + record',
  'agency-report': 'Agency report',
  'net-profit': 'Net profit',
  'hrm-reports': 'HRM reports',
  'attendance-report': 'Attendance Report',
}

function formatSlug(slug) {
  if (!slug) return 'Report'
  const mapped = SLUG_TO_TITLE[slug]
  if (mapped) return mapped
  return slug.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}

export function ReportDetailPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const title = location.state?.title ?? formatSlug(location.pathname.split('/').pop())

  return (
    <div className="flex-1 overflow-auto p-6 bg-white min-h-0">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h1 className="text-xl font-bold" style={{ color: BRAND_RED }}>
            {title}
          </h1>
          <button
            type="button"
            onClick={() => navigate('/dashboard/reports')}
            className="rounded-md px-4 py-2.5 text-sm font-semibold text-white"
            style={{ backgroundColor: BRAND_RED }}
          >
            Back to Reports
          </button>
        </div>
        <div className="rounded-lg border border-slate-200 bg-slate-50/50 p-8 text-slate-600">
          <p className="text-sm">Report content for &quot;{title}&quot; can be added here.</p>
        </div>
      </div>
    </div>
  )
}
