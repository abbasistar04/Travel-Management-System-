import { useState, useRef } from 'react'
import calendarIcon from '../../../assets/calendar-icon.svg'
import downloadIcon from '../../../assets/download-icon.svg'
import searchIcon from '../../../assets/search-icon.svg'
import editIcon from '../../../assets/edit-icon.svg'
import copyIcon from '../../../assets/copy-icon.svg'
import trashIcon from '../../../assets/trash-icon.svg'

const BRAND_RED = '#c60000'
const FILTER_BG = '#F3FAFF'
const FILTER_BORDER = '#CBE9FF'

const selectArrowSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%231f2937'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`

const MOCK_SALES_REPORT = [
  { no: '01', clientName: 'Ali Khan', service: 'Visa', saleProfit: '10,000 PKR', commission: '10%', totalPrice: '30,000 PKR', guest: '5 Persons', paidAmount: '15,000 PKR', paymentStatus: 'Pending Invoice', bookingStatus: 'Cancelled' },
  { no: '02', clientName: 'M.Ahmad', service: 'Tour', saleProfit: '15,000 PKR', commission: '10%', totalPrice: '40,000 PKR', guest: '5 Persons', paidAmount: '15,000 PKR', paymentStatus: 'Success Invoice', bookingStatus: 'Cancelled' },
]

function PaymentStatusBadge({ status }) {
  const isSuccess = status.toLowerCase().includes('success')
  const dotColor = isSuccess ? '#22c55e' : '#ef4444'
  return (
    <span className="inline-flex items-center gap-2">
      <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: dotColor }} aria-hidden />
      {status}
    </span>
  )
}

export function MrUsmanReportsPage() {
  const [searchClient, setSearchClient] = useState('')
  const [service, setService] = useState('')
  const [paymentStatus, setPaymentStatus] = useState('')
  const [chartTab, setChartTab] = useState('revenue')
  const dateInputRef = useRef(null)

  // Chart data: OMR values Jan–Jul (max 6000)
  const chartMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
  const thisYearData = [1200, 2800, 2200, 3800, 4200, 5500, 4800]
  const lastYearData = [1800, 2200, 2600, 2400, 3000, 3200, 3500]
  const chartMax = 6000
  const chartPadding = { top: 12, right: 12, bottom: 28, left: 44 }
  const chartWidth = 800
  const chartHeight = 200
  const innerWidth = chartWidth - chartPadding.left - chartPadding.right
  const innerHeight = chartHeight - chartPadding.top - chartPadding.bottom
  const toX = (i) => chartPadding.left + (i / (thisYearData.length - 1)) * innerWidth
  const toY = (v) => chartPadding.top + innerHeight - (v / chartMax) * innerHeight
  const thisYearPath = thisYearData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ')
  const lastYearPath = lastYearData.map((v, i) => `${i === 0 ? 'M' : 'L'} ${toX(i)} ${toY(v)}`).join(' ')

  return (
    <div className="flex-1 overflow-auto p-6 bg-slate-50 relative">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-900" style={{ color: BRAND_RED }}>
          Mr Usman Reports
        </h2>
        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition px-5 py-2.5 text-white hover:opacity-90"
          style={{ backgroundColor: BRAND_RED }}
        >
          Export Log
          <img src={downloadIcon} alt="" className="w-5 h-5" aria-hidden />
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-end gap-4 mb-6 w-full">
        <div
          className="rounded-lg border flex flex-col flex-1 min-w-0 basis-0"
          style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}
        >
          <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Search by Client</label>
          <div className="flex items-center gap-2 px-4 pb-3">
            <img src={searchIcon} alt="" className="w-5 h-5 shrink-0 text-slate-400" aria-hidden />
            <input
              type="text"
              placeholder="Search by Client"
              value={searchClient}
              onChange={(e) => setSearchClient(e.target.value)}
              className="flex-1 min-w-0 text-slate-700 placeholder-slate-500 text-sm bg-transparent border-none p-0 focus:outline-none focus:ring-0"
            />
          </div>
        </div>
        <div
          className="rounded-lg border flex flex-col flex-1 min-w-0 basis-0"
          style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}
        >
          <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Service</label>
          <select
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="rounded-lg bg-transparent border-none text-slate-700 text-sm font-medium py-2.5 px-4 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center] w-full"
            style={{ backgroundImage: selectArrowSvg }}
          >
            <option value="">Service</option>
            <option value="visa">Visa</option>
            <option value="tour">Tour</option>
          </select>
        </div>
        <div
          className="rounded-lg border flex flex-col flex-1 min-w-0 basis-0"
          style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}
        >
          <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Payment Status</label>
          <select
            value={paymentStatus}
            onChange={(e) => setPaymentStatus(e.target.value)}
            className="rounded-lg bg-transparent border-none text-slate-700 text-sm font-medium py-2.5 px-4 pr-9 focus:outline-none focus:ring-0 cursor-pointer appearance-none bg-no-repeat bg-[length:1rem_1rem] bg-[right_0.75rem_center] w-full"
            style={{ backgroundImage: selectArrowSvg }}
          >
            <option value="">Payment Status</option>
            <option value="pending">Pending Invoice</option>
            <option value="success">Success Invoice</option>
          </select>
        </div>
        <div
          className="rounded-lg border flex flex-col flex-1 min-w-0 basis-0"
          style={{ borderColor: FILTER_BORDER, backgroundColor: FILTER_BG }}
        >
          <label className="text-xs font-medium text-slate-500 pt-3 pb-1 px-4 block">Date</label>
          <div className="flex items-center justify-between gap-2 px-4 pb-3">
            <input
              ref={dateInputRef}
              type="text"
              value="09 May - 12 May"
              readOnly
              placeholder="09 May - 12 May"
              className="flex-1 min-w-0 text-sm font-medium text-slate-700 bg-transparent border-none p-0 focus:outline-none focus:ring-0"
            />
            <img src={calendarIcon} alt="" className="w-5 h-5 shrink-0 opacity-80 pointer-events-none" aria-hidden />
          </div>
        </div>
      </div>

      {/* KPI cards - top row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg p-4 flex flex-col" style={{ backgroundColor: '#CBE9FF' }}>
          <span className="text-sm font-medium text-slate-600 mb-1">Total Bookings</span>
          <div className="flex items-end justify-between gap-2">
            <span className="text-2xl font-bold text-slate-900">18</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +11%
            </span>
          </div>
        </div>
        <div className="rounded-lg p-4 flex flex-col" style={{ backgroundColor: '#E9D5FF' }}>
          <span className="text-sm font-medium text-slate-600 mb-1">Avg Booking Value</span>
          <div className="flex items-end justify-between gap-2">
            <span className="text-2xl font-bold text-slate-900">OMR 1,500</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-red-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              -10%
            </span>
          </div>
        </div>
        <div className="rounded-lg p-4 flex flex-col" style={{ backgroundColor: '#E9D5FF' }}>
          <span className="text-sm font-medium text-slate-600 mb-1">Repeat Rate</span>
          <div className="flex items-end justify-between gap-2">
            <span className="text-2xl font-bold text-slate-900">45%</span>
            <span className="inline-flex items-center gap-1 text-sm font-medium text-green-600">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
              +11%
            </span>
          </div>
        </div>
      </div>

      {/* Chart section + Side KPIs */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Revenue Stream Chart */}
        <div className="flex-1 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-wrap items-center gap-4">
            <div className="flex rounded-lg overflow-hidden border border-slate-200">
              {['revenue', 'bookings', 'operating'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setChartTab(tab)}
                  className={`px-4 py-2 text-sm font-medium transition ${
                    chartTab === tab ? 'bg-slate-100 text-slate-900' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab === 'revenue' ? 'Revenue Stream' : tab === 'bookings' ? 'Total Bookings' : 'Operating Status'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-800" /> This year</span>
              <span className="inline-flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-slate-300" /> Last year</span>
            </div>
          </div>
          <div className="p-6 min-h-[260px]">
            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${chartWidth} ${chartHeight + 20}`} className="w-full min-w-[320px] h-[220px]" preserveAspectRatio="xMidYMid meet">
                {/* Y-axis labels */}
                {[0, 2000, 4000, 6000].map((val) => (
                  <text key={val} x={chartPadding.left - 6} y={toY(val) + 4} textAnchor="end" fill="#64748b" fontSize="10" fontWeight="500">OMR {val === 0 ? '0' : `${val}MR`}</text>
                ))}
                {/* Y-axis grid lines */}
                {[2000, 4000].map((val) => (
                  <line key={val} x1={chartPadding.left} y1={toY(val)} x2={chartWidth - chartPadding.right} y2={toY(val)} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4 2" />
                ))}
                {/* This year - solid line */}
                <path d={thisYearPath} fill="none" stroke="#475569" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                {/* Last year - dashed line */}
                <path d={lastYearPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="6 4" />
                {/* X-axis month labels */}
                {chartMonths.map((m, i) => (
                  <text key={m} x={toX(i)} y={chartHeight - 4} textAnchor="middle" fill="#64748b" fontSize="11">{m}</text>
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Side KPI cards */}
        <div className="w-full lg:w-72 flex flex-col gap-3 shrink-0">
          {[
            { label: 'Total Commission Earned', value: 'OMR 152,00', change: '+1.01%', up: true, bg: '#CBE9FF' },
            { label: 'Total Sale', value: '33.5%', change: '-0.03%', up: false, bg: '#E9D5FF' },
            { label: 'Top Agent Split', value: '90/10', change: '+15.03%', up: true, bg: '#FECACA' },
            { label: 'Salary + Commission of the month', value: '45', change: '+6.08%', up: true, bg: '#E5E7EB' },
          ].map((kpi, i) => (
            <div key={i} className="rounded-lg p-4 flex items-center justify-between gap-2" style={{ backgroundColor: kpi.bg }}>
              <div className="min-w-0">
                <span className="text-xs font-medium text-slate-600 block truncate">{kpi.label}</span>
                <span className="text-lg font-bold text-slate-900">{kpi.value}</span>
                <span className={`text-xs font-medium block ${kpi.up ? 'text-green-600' : 'text-red-600'}`}>{kpi.change}</span>
              </div>
              <div className="shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.7)' }}>
                <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" /></svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sales Report by Customer */}
      <div
        className="rounded-t-lg px-5 py-3"
        style={{ backgroundColor: '#CBE9FF' }}
      >
        <h3 className="text-lg font-semibold" style={{ color: BRAND_RED }}>
          Sales Report by Customer
        </h3>
      </div>
      <div className="rounded-b-xl border border-t-0 border-slate-200 shadow-sm overflow-hidden bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-slate-700">
            <thead className="bg-white border-b border-slate-200 text-slate-600 font-medium">
              <tr>
                <th className="px-4 py-4 whitespace-nowrap">No.</th>
                <th className="px-4 py-4 whitespace-nowrap">Client Name</th>
                <th className="px-4 py-4 whitespace-nowrap">Service/Booking</th>
                <th className="px-4 py-4 whitespace-nowrap">Sale Profit</th>
                <th className="px-4 py-4 whitespace-nowrap">Commission</th>
                <th className="px-4 py-4 whitespace-nowrap">Total price</th>
                <th className="px-4 py-4 whitespace-nowrap">Guest</th>
                <th className="px-4 py-4 whitespace-nowrap">Paid Amount</th>
                <th className="px-4 py-4 whitespace-nowrap">Payment Status</th>
                <th className="px-4 py-4 whitespace-nowrap">Booking Status</th>
                <th className="px-4 py-4 whitespace-nowrap">Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_SALES_REPORT.map((row, i) => (
                <tr key={i} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-4 font-bold">{row.no}</td>
                  <td className="px-4 py-4 font-bold">{row.clientName}</td>
                  <td className="px-4 py-4">{row.service}</td>
                  <td className="px-4 py-4">{row.saleProfit}</td>
                  <td className="px-4 py-4">{row.commission}</td>
                  <td className="px-4 py-4">{row.totalPrice}</td>
                  <td className="px-4 py-4">{row.guest}</td>
                  <td className="px-4 py-4">{row.paidAmount}</td>
                  <td className="px-4 py-4"><PaymentStatusBadge status={row.paymentStatus} /></td>
                  <td className="px-4 py-4">{row.bookingStatus}</td>
                  <td className="px-4 py-4 flex gap-3 items-center">
                    <button type="button" className="w-[30px] h-[30px] min-w-[30px] flex items-center justify-center rounded hover:bg-slate-200" aria-label="Edit">
                      <img src={editIcon} alt="" className="w-4 h-4" aria-hidden />
                    </button>
                    <button type="button" className="w-[30px] h-[30px] min-w-[30px] flex items-center justify-center rounded hover:bg-slate-200" aria-label="Duplicate">
                      <img src={copyIcon} alt="" className="w-4 h-4" aria-hidden />
                    </button>
                    <button type="button" className="w-[30px] h-[30px] min-w-[30px] flex items-center justify-center rounded hover:bg-slate-200" aria-label="Download">
                      <img src={downloadIcon} alt="" className="w-4 h-4" aria-hidden />
                    </button>
                    <button type="button" className="w-[30px] h-[30px] min-w-[30px] flex items-center justify-center rounded hover:bg-slate-200" aria-label="Delete">
                      <img src={trashIcon} alt="" className="w-4 h-4" aria-hidden />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
