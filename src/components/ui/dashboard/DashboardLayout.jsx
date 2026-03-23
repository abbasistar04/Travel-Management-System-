import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Outlet, NavLink } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import logoSidebar from '../../../assets/Logo3.svg'
import iconDashboard    from '../../../assets/Main-menu-Dash-board-Page-icon.svg'
import iconCRM          from '../../../assets/Main-menu-CRM-Page-icon.svg'
import iconQuotations   from '../../../assets/Main-menu-Quotations-Page-icon.svg'
import iconBookings     from '../../../assets/Main-menu-Bookings-Page-icon.svg'
import iconAccounting   from '../../../assets/Main-menu-Accounting-icon.svg'
import iconReports      from '../../../assets/Main-menu-Reports-icon.svg'
import iconImportExport from '../../../assets/Main-menu-Import-Export-Page-icon.svg'
import iconDocument     from '../../../assets/Main-menu-Document-icon.svg'
import iconUserRole     from '../../../assets/Main-menu-User-&-Role-icon.svg'
import iconAgency       from '../../../assets/Main-menu-Agency-Page-icon.svg'
import iconSettings     from '../../../assets/Main-menu-Settings-Page-icon.svg'
import iconLogout       from '../../../assets/Main-menu-Logout-icon.svg'
import iconNotification from '../../../assets/Nav-Bar-Notification-Icon.svg'

const ICON_FILTER_WHITE = 'brightness(0) saturate(100%) invert(1)'

const SIDEBAR_ITEMS = [
  { label: 'Dashboard',      path: '/dashboard',                    pathMatch: (p) => p === '/dashboard',                                                                    icon: iconDashboard    },
  { label: 'CRM',            path: '/dashboard/crm',               pathMatch: (p) => p.startsWith('/dashboard/crm') || p.startsWith('/dashboard/services') || p.startsWith('/dashboard/air-travel') || p.startsWith('/dashboard/visa') || p.startsWith('/dashboard/overseas') || p.startsWith('/dashboard/accommodation') || p.startsWith('/dashboard/transport') || p.startsWith('/dashboard/travel'), icon: iconCRM },
  { label: 'Quotations',     path: '/dashboard/quotations',        pathMatch: (p) => p.startsWith('/dashboard/quotations'),                                                  icon: iconQuotations   },
  { label: 'Bookings',       path: '/dashboard/bookings',          pathMatch: (p) => p.startsWith('/dashboard/bookings'),                                                    icon: iconBookings     },
  { label: 'Accounting',     path: '/dashboard/accounting',        pathMatch: (p) => p.startsWith('/dashboard/accounting'),                                                  icon: iconAccounting   },
  { label: 'Reports',        path: '/dashboard/reports',           pathMatch: (p) => p.startsWith('/dashboard/reports'),                                                     icon: iconReports      },
  { label: 'Import / Export',path: '/dashboard/import-export',     pathMatch: (p) => p.startsWith('/dashboard/import-export'),                                               icon: iconImportExport },
  { label: 'Document',       path: '/dashboard/document',          pathMatch: (p) => p.startsWith('/dashboard/document'),                                                    icon: iconDocument     },
  { label: 'User & Role',    path: '/dashboard/user-role',         pathMatch: (p) => p.startsWith('/dashboard/user-role'),                                                   icon: iconUserRole     },
  { label: 'Agency',         path: '/dashboard/agency',            pathMatch: (p) => p.startsWith('/dashboard/agency'),                                                      icon: iconAgency       },
  { label: 'Settings',       path: '/dashboard/settings',          pathMatch: (p) => p.startsWith('/dashboard/settings'),                                                    icon: iconSettings     },
  { label: 'Logout', isLogout: true,                                                                                                                                         icon: iconLogout       },
]

export function DashboardLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const handler = () => setIsMobile(mq.matches)
    handler(); mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => { if (isMobile) setSidebarOpen(false) }, [location.pathname, isMobile])

  const handleSidebarClick = (item) => {
    if (item.isLogout) { logout(); navigate('/login', { replace: true }); return }
    if (item.path) navigate(item.path)
    if (isMobile) setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--bg)' }}>
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm md:hidden" onClick={() => setSidebarOpen(false)} aria-hidden />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`shrink-0 flex flex-col z-50 transition-transform duration-300 ease-out md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '15rem', background: 'var(--sidebar-bg)' }}
        aria-hidden={isMobile && !sidebarOpen}
      >
        {/* Logo area */}
        <div className="flex items-center justify-center p-8 border-b" style={{ borderColor: 'var(--sidebar-border)' }}>
          <img src={logoSidebar} alt="Logo" className="w-36 h-36 object-contain transform hover:scale-105 transition-transform duration-500" />
        </div>

        {/* Nav items */}
        <nav className="sidebar-nav-scroll flex-1 overflow-auto p-3 flex flex-col gap-0.5">
          {SIDEBAR_ITEMS.map((item, i) => {
            if (item.isLogout) {
              return (
                <button
                  key={i} type="button"
                  onClick={() => handleSidebarClick(item)}
                  className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 text-sm font-medium transition-all duration-150 text-[#ffe4e6]/70 hover:text-[#fff1f2] hover:bg-[#c60000]/15 mt-2"
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="w-5 h-5 shrink-0 object-contain opacity-80"
                    style={{ filter: ICON_FILTER_WHITE }}
                    aria-hidden
                  />
                  {item.label}
                </button>
              )
            }
            const isActive = item.pathMatch?.(location.pathname) ?? false
            return (
              <NavLink
                key={i} to={item.path}
                onClick={() => isMobile && setSidebarOpen(false)}
                className={`px-3 py-2.5 rounded-xl flex items-center gap-3 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'sidebar-active-pill text-[#fff1f2]'
                    : 'text-[#ffe4e6]/60 hover:text-[#fff1f2] hover:bg-[#c60000]/12'
                }`}
              >
                <img
                  src={item.icon}
                  alt=""
                  className={`w-5 h-5 shrink-0 object-contain ${isActive ? 'opacity-100' : 'opacity-70'}`}
                  style={{ filter: ICON_FILTER_WHITE }}
                  aria-hidden
                />
                {item.label}
              </NavLink>
            )
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t" style={{ borderColor: 'var(--sidebar-border)' }}>
          <p className="text-xs text-[#ffe4e6]/70 text-center">TMS v2.0</p>
        </div>
      </aside>

      {/* ── Main content ── */}
      <main className="flex-1 min-w-0 flex flex-col w-full md:ml-60">
        {/* Header */}
        <header className="sticky top-0 z-10 h-14 shrink-0 bg-white border-b border-zinc-100 flex items-center justify-between gap-2 px-4 sm:px-6 shadow-sm">
          <button
            type="button"
            onClick={() => setSidebarOpen((o) => !o)}
            className="md:hidden p-2 rounded-xl hover:bg-zinc-100 flex items-center justify-center transition"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Breadcrumb */}
          <div className="hidden md:flex items-center gap-2 text-sm text-zinc-500">
            <span className="text-zinc-400">Portal</span>
            <span className="text-zinc-300">/</span>
            <span className="font-semibold text-[#c60000] capitalize">
              {location.pathname.split('/').filter(Boolean).slice(-1)[0]?.replace(/-/g, ' ') || 'Dashboard'}
            </span>
          </div>

          <div className="flex-1 flex justify-end items-center gap-3">
            <button type="button" className="p-2 rounded-xl hover:bg-zinc-100 transition relative" aria-label="Notifications">
              <img src={iconNotification} alt="" className="w-5 h-5" aria-hidden />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#c60000] rounded-full" />
            </button>
            <div className="flex items-center gap-2.5 pl-3 border-l border-zinc-100">
              <div className="w-8 h-8 rounded-full bg-[#c60000] flex items-center justify-center text-white font-bold text-xs shrink-0 shadow-sm">
                KH
              </div>
              <div className="hidden sm:flex flex-col">
                <span className="text-zinc-800 font-semibold text-sm leading-tight">Kail Havertoz</span>
                <span className="text-zinc-400 text-xs">Admin</span>
              </div>
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  )
}
