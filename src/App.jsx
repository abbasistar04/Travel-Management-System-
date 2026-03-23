import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import { LoginPage } from './pages/Login'
import { CreateAccountPage } from './pages/CreateAccount'
import { SetProfilePage } from './pages/SetProfile'
import { AdminDashboardPage, DashboardLayout, AgencyPage, ItemsPage, AirTravelServicesPage, VisaServicesPage, OverseasTravelTourismPage, ServicesPage, TravelServicePage, AccommodationServicePage, InvoicePage, QuotationsPage, UserListPage, ActivityLogPage, MrUsmanReportsPage, ReportsPage, ReportsListPage, ReportDetailPage, AccountingPage, BookingsListPage, AttendanceReportPage, HRMAttendancePage, EmployeeSalaryRecordPage, EmployeeSalarySheetPage, EmployeeManagementPage, DocumentPage, AssetsPage, LiabilitiesPage, ExpensePage, CustomerImportExportPage, BookingImportExportPage, ServiceImportExportPage, PassengerImportExportPage } from './pages/Dashboard'
import { PassengerPage } from './components/ui/crm'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()
  if (!isLoggedIn) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
          <Route path="/set-profile" element={<SetProfilePage />} />
          <Route path="/dashboard" element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="crm" element={<PassengerPage />} />
            <Route path="agency" element={<AgencyPage />} />
            <Route path="items" element={<ItemsPage />} />
            <Route path="services" element={<ServicesPage />} />
            <Route path="travel-service/:id" element={<TravelServicePage />} />
            <Route path="transport-services" element={<TravelServicePage />} />
            <Route path="air-travel-services" element={<AirTravelServicesPage />} />
            <Route path="visa-services" element={<VisaServicesPage />} />
            <Route path="overseas-travel-tourism" element={<OverseasTravelTourismPage />} />
            <Route path="accommodation-services" element={<AccommodationServicePage />} />
            <Route path="invoice" element={<InvoicePage />} />
            <Route path="quotations" element={<QuotationsPage />} />
            <Route path="bookings" element={<BookingsListPage />} />
            <Route path="user-role" element={<UserListPage />} />
            <Route path="activity-log" element={<ActivityLogPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="reports/:reportSlug" element={<ReportDetailPage />} />
            <Route path="reports-list" element={<ReportsListPage />} />
            <Route path="accounting" element={<AccountingPage />} />
            <Route path="attendance-report" element={<AttendanceReportPage />} />
            <Route path="hrm-attendance" element={<HRMAttendancePage />} />
            <Route path="employee-salary-record" element={<EmployeeSalaryRecordPage />} />
            <Route path="employee-salary-sheet" element={<EmployeeSalarySheetPage />} />
            <Route path="employee-management" element={<EmployeeManagementPage />} />
            <Route path="document" element={<DocumentPage />} />
            <Route path="assets" element={<AssetsPage />} />
            <Route path="liabilities" element={<LiabilitiesPage />} />
            <Route path="expense" element={<ExpensePage />} />
            <Route path="import-export" element={<CustomerImportExportPage />} />
            <Route path="import-export/booking" element={<BookingImportExportPage />} />
            <Route path="import-export/service" element={<ServiceImportExportPage />} />
            <Route path="import-export/passenger" element={<PassengerImportExportPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
