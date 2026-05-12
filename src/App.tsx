import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'

// Eagerly loaded
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'

// Lazy loaded
const PublicBioPage = lazy(() => import('./pages/PublicBioPage'))
const DashboardLayout = lazy(() => import('./pages/dashboard/DashboardLayout'))
const HomeScreen = lazy(() => import('./pages/dashboard/HomeScreen'))
const LinksManager = lazy(() => import('./pages/dashboard/LinksManager'))
const LeadsPage = lazy(() => import('./pages/dashboard/LeadsPage'))
const AnalyticsPage = lazy(() => import('./pages/dashboard/AnalyticsPage'))
const ProfileScreen = lazy(() => import('./pages/dashboard/ProfileScreen'))
const AppearancePage = lazy(() => import('./pages/dashboard/AppearancePage'))
const ReferralPage = lazy(() => import('./pages/dashboard/ReferralPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const RefundPage = lazy(() => import('./pages/RefundPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ImportLinktreePage = lazy(() => import('./pages/ImportLinktreePage'))

const LoadingFallback = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0e0520' }}>
    <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '3px solid rgba(129,51,194,0.1)', borderTopColor: '#8133C2', animation: 'spin 0.8s linear infinite' }} />
    <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/refund" element={<RefundPage />} />
            <Route path="/import-linktree" element={<ImportLinktreePage />} />

            {/* Dashboard (protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              {/* Home tab (index) */}
              <Route index element={<HomeScreen />} />
              {/* Bottom nav tabs */}
              <Route path="links" element={<LinksManager />} />
              <Route path="leads" element={<LeadsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="profile" element={<ProfileScreen />} />
              {/* Legacy / extra routes */}
              <Route path="appearance" element={<AppearancePage />} />
              <Route path="referral" element={<ReferralPage />} />
            </Route>

            {/* Public bio pages — must be LAST */}
            <Route path="/:username" element={<PublicBioPage />} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
