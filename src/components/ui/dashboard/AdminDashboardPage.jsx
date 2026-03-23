import iconArrowRise  from '../../../assets/Arrow-Rise-Icon-Black.svg'
import iconArrowFall  from '../../../assets/Arrow-Fall-Icon-Black.svg'
import searchIcon     from '../../../assets/search-icon.svg'
import calendarIcon   from '../../../assets/calendar-icon.svg'
import editIcon       from '../../../assets/edit-icon.svg'
import copyIcon       from '../../../assets/copy-icon.svg'
import downloadIcon   from '../../../assets/download-icon.svg'
import trashIcon      from '../../../assets/trash-icon.svg'
import iconUpDown     from '../../../assets/Icon-up-down.svg'
import iconUpDown2    from '../../../assets/Icon-up-down2.svg'
import iconUpDown3    from '../../../assets/Icon-up-down3.svg'
import iconUpDown4    from '../../../assets/Icon-up-down4.svg'

const ICON_FILTER = 'invert(13%) sepia(88%) saturate(6000%) hue-rotate(355deg) brightness(90%) contrast(110%)'

function KpiCard({ label, value, change, positive }) {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">{label}</p>
      <p className="text-2xl font-bold text-zinc-900">{value}</p>
      <div className="flex items-center gap-1.5">
        <img src={positive ? iconArrowRise : iconArrowFall} alt="" className="w-4 h-4" aria-hidden />
        <span className={`text-xs font-bold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>{change}</span>
        <span className="text-xs text-zinc-400">vs last month</span>
      </div>
    </div>
  )
}

function MiniCard({ label, value, change, positive, bg, icon }) {
  return (
    <div className="relative overflow-hidden rounded-2xl p-4 flex flex-col gap-1" style={{ background: bg, border: '1px solid rgba(255,255,255,0.08)' }}>
      <img src={icon} alt="" className="absolute top-3 right-3 w-12 h-12 opacity-20 object-contain" aria-hidden />
      <p className="text-xs font-semibold text-white/70 uppercase tracking-wide">{label}</p>
      <p className="text-xl font-bold text-white">{value}</p>
      <p className={`text-xs font-semibold ${positive ? 'text-emerald-300' : 'text-red-300'}`}>{change}</p>
    </div>
  )
}

function StatCard({ value, label, change }) {
  const positive = !change.startsWith('-')
  return (
    <div className="card p-5 flex flex-col gap-2 group hover:shadow-md transition-shadow duration-200 relative overflow-hidden">
      <p className="text-lg font-bold text-zinc-900">{value}</p>
      <p className="text-xs font-medium text-zinc-500">{label}</p>
      <p className={`text-xs font-semibold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>{change}</p>
      <div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-full transition-all duration-300 group-hover:h-1.5" style={{ background: 'linear-gradient(90deg, #c60000, #ff6b6b)' }} />
    </div>
  )
}

function Pagination() {
  return (
    <div className="px-5 py-3 border-t border-zinc-100 flex items-center justify-between text-sm text-zinc-500">
      <span>Showing <span className="font-medium text-zinc-700">1–4</span> of 20</span>
      <div className="flex items-center gap-1">
        {['‹', '1', '2', '3', '4', '5', '›'].map((p, i) => (
          <button key={i} type="button" className={`pg-btn ${p === '2' ? 'active' : ''}`}>{p}</button>
        ))}
      </div>
    </div>
  )
}

const ACTION_BTNS = [
  { src: editIcon,     label: 'Edit'     },
  { src: copyIcon,     label: 'Copy'     },
  { src: downloadIcon, label: 'Download' },
  { src: trashIcon,    label: 'Delete'   },
]

function RowActions() {
  return (
    <div className="flex items-center gap-1">
      {ACTION_BTNS.map(({ src, label }) => (
        <button key={label} type="button" className="p-1.5 rounded-lg hover:bg-red-50 transition" aria-label={label}>
          <img src={src} alt="" className="w-4 h-4" style={{ filter: ICON_FILTER }} aria-hidden />
        </button>
      ))}
    </div>
  )
}

export function AdminDashboardPage() {
  return (
    <div className="flex-1 overflow-auto p-4 sm:p-6 min-h-screen page-enter">

      {/* ── Page header ── */}
      <div className="mb-7 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 tracking-tight">Admin Dashboard</h1>
          <p className="text-sm text-zinc-400 mt-0.5">Quick insights for agency & performance monitoring</p>
        </div>
        <button type="button" className="inline-flex items-center gap-2 bg-[#c60000] hover:bg-[#a00000] text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-all active:scale-95">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Refresh
        </button>
      </div>

      {/* ── KPI cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <KpiCard label="Total Bookings"    value="2,150"     change="+11%"  positive />
        <KpiCard label="Avg Booking Value" value="OMR 1,500" change="-10%"  positive={false} />
        <KpiCard label="Repeat Rate"       value="45%"       change="+11%"  positive />
      </div>

      {/* ── Filter bar ── */}
      <div className="flex flex-wrap items-end gap-3 mb-6">
        <div className="filter-pill flex-1 min-w-0 basis-60 px-4 py-3 flex items-center gap-2">
          <img src={searchIcon} alt="" className="w-4 h-4 shrink-0 opacity-40" aria-hidden />
          <input type="text" placeholder="Search user, agency, action…" className="flex-1 min-w-0 text-sm bg-transparent border-none focus:outline-none text-zinc-700 placeholder-zinc-400" />
        </div>
        <div className="filter-pill min-w-[130px]">
          <select className="w-full bg-transparent border-none text-sm text-zinc-700 px-4 py-3 focus:outline-none cursor-pointer appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c60000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem 1rem', paddingRight: '2.5rem' }}>
            <option>All Actions</option>
          </select>
        </div>
        <div className="filter-pill min-w-[120px]">
          <select className="w-full bg-transparent border-none text-sm text-zinc-700 px-4 py-3 focus:outline-none cursor-pointer appearance-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23c60000'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 0.75rem center', backgroundSize: '1rem 1rem', paddingRight: '2.5rem' }}>
            <option>All Roles</option>
          </select>
        </div>
        <div className="filter-pill flex items-center gap-2 px-4 py-3 min-w-[170px] cursor-pointer">
          <span className="text-sm text-zinc-600 font-medium">09 May – 12 May</span>
          <img src={calendarIcon} alt="" className="w-4 h-4 shrink-0 opacity-50 ml-auto" aria-hidden />
        </div>
      </div>

      {/* ── Revenue + Mini cards ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
        {/* Revenue chart */}
        <div className="lg:col-span-2 card p-5">
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap">
            <div className="flex gap-4">
              {['Revenue Stream', 'Total Bookings', 'Operating Status'].map((t, i) => (
                <button key={i} type="button" className={`text-sm font-semibold pb-1 transition-all ${i === 0 ? 'text-[#c60000] border-b-2 border-[#c60000]' : 'text-zinc-400 hover:text-zinc-600'}`}>{t}</button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#c60000]" />This year</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-zinc-300" />Last year</span>
            </div>
          </div>
          <div className="h-52 flex flex-col">
            <div className="flex-1 flex items-stretch min-h-0">
              <div className="flex flex-col justify-between text-xs text-zinc-400 pr-3 py-1">
                <span>6000</span><span>4000</span><span>2000</span><span>0</span>
              </div>
              <div className="flex-1 min-w-0 relative">
                <svg viewBox="0 0 280 160" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="red-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#c60000" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#c60000" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path fill="url(#red-fill)" d="M 0 120 L 47 128 L 93 88 L 140 48 L 187 28 L 233 52 L 280 40 L 280 160 L 0 160 Z" />
                  <path fill="none" stroke="#c60000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" d="M 0 120 L 47 128 L 93 88 L 140 48 L 187 28 L 233 52 L 280 40" />
                  <path fill="none" stroke="#d4d4d8" strokeWidth="1.5" strokeDasharray="4 4" d="M 0 136 L 47 100 L 93 68 L 140 88 L 187 96 L 233 72 L 280 84" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between text-xs text-zinc-400 mt-1 pl-10">
              {['Jan','Feb','Mar','Apr','May','Jun','Jul'].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>
        </div>

        {/* Mini stat cards */}
        <div className="flex flex-col gap-3">
          <MiniCard label="Total Commission"    value="OMR 152,000" change="+1.01%" positive bg="linear-gradient(135deg,#c60000,#7a0000)" icon={iconUpDown}  />
          <MiniCard label="Commission % Revenue" value="33.5%"      change="-0.03%" positive={false} bg="linear-gradient(135deg,#3f3f46,#27272a)" icon={iconUpDown2} />
          <MiniCard label="Top Agent Split"      value="90/10"      change="+15.03%" positive bg="linear-gradient(135deg,#7c3aed,#4c1d95)" icon={iconUpDown3} />
          <MiniCard label="Avg Submissions/Agent" value="45"        change="+6.08%" positive bg="linear-gradient(135deg,#0ea5e9,#0369a1)" icon={iconUpDown4} />
        </div>
      </div>

      {/* ── Stats grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 mb-6">
        {[
          { value: 'OMR 228,065', label: 'Total Gross',          change: '-1.10%' },
          { value: '266,910',     label: 'Bookings',             change: '+0.10%' },
          { value: '19.71%',      label: 'Margin',               change: '+1.00%' },
          { value: 'OMR 75',      label: 'CAC',                  change: '-1.20%' },
          { value: '92%',         label: 'TAT',                  change: '-0.21%' },
          { value: '98.7%',       label: 'Booking Accuracy',     change: '-0.10%' },
          { value: '28%',         label: 'Net Profit Margin',    change: '-2.00%' },
          { value: '1.47%',       label: 'Success Rate',         change: '+0.00%' },
          { value: 'OMR 500',     label: 'Avg Revenue per Trip', change: '+0.00%' },
        ].map((s, i) => <StatCard key={i} {...s} />)}
      </div>

      {/* ── Account Detail table ── */}
      <div className="card overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="font-bold text-zinc-900">Account Detail</h3>
          <span className="text-xs font-semibold text-[#c60000] bg-red-50 px-2.5 py-1 rounded-full">Live</span>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['#','Entry','Trips','COGS','Gross Profit','Commission','Net Worth','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {['Muneera Mughal','Faysal Ahmed','Noman','Sara'].map((name, i) => (
                <tr key={i}>
                  <td className="text-zinc-400 text-xs">{i + 1}</td>
                  <td className="font-medium">{name}</td>
                  <td>120</td>
                  <td>OMR 39k</td>
                  <td className="text-emerald-600 font-medium">OMR 120k</td>
                  <td>OMR 120k</td>
                  <td className="font-semibold">OMR 250k</td>
                  <td><RowActions /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>

      {/* ── Agency Activity Logs ── */}
      <div className="card overflow-hidden mb-5">
        <div className="px-5 py-4 border-b border-zinc-100 flex items-center justify-between">
          <h3 className="font-bold text-zinc-900">Agency Activity Logs</h3>
          <button type="button" className="text-xs font-semibold text-[#c60000] hover:underline">Refresh</button>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['#','Timestamp','Action','User','Agency','IP','Device','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { action:'Login agency',    user:'Faysal Ahmed', agency:'Warana Agency', ip:'192.168.1.1', device:'Macbook' },
                { action:'Add/edit agency', user:'Faysal Ahmed', agency:'Warana Agency', ip:'192.168.1.1', device:'Macbook' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="text-zinc-400 text-xs">{i + 1}</td>
                  <td className="text-zinc-500 text-xs">03 Oct 2024 10:30</td>
                  <td><span className="badge badge-red">{row.action}</span></td>
                  <td className="font-medium">{row.user}</td>
                  <td>{row.agency}</td>
                  <td className="font-mono text-xs text-zinc-500">{row.ip}</td>
                  <td>{row.device}</td>
                  <td><RowActions /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>

      {/* ── Agency Performance Report ── */}
      <div className="card overflow-hidden">
        <div className="px-5 py-4 border-b border-zinc-100">
          <h3 className="font-bold text-zinc-900">Agency Performance Report</h3>
        </div>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                {['#','Agency / Agent','Bookings','Accuracy','Avg TAT','Revenue','Share','NPS','Conversion','Actions'].map(h => <th key={h}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {[
                { agency:'Numan Agency / Noman', booking:'120', accuracy:'98%', tat:'2.1d', revenue:'OMR 45,000', share:'22%', nps:'85', conv:'33%' },
                { agency:'Fay Agencies',          booking:'95',  accuracy:'97%', tat:'2.3d', revenue:'OMR 38,000', share:'18%', nps:'82', conv:'31%' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="text-zinc-400 text-xs">{i + 1}</td>
                  <td className="font-semibold">{row.agency}</td>
                  <td>{row.booking}</td>
                  <td><span className="badge badge-green">{row.accuracy}</span></td>
                  <td>{row.tat}</td>
                  <td className="font-medium">{row.revenue}</td>
                  <td>{row.share}</td>
                  <td><span className="badge badge-amber">{row.nps}</span></td>
                  <td>{row.conv}</td>
                  <td><RowActions /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination />
      </div>
    </div>
  )
}
