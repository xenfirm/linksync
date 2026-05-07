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
const ProfileSettings = lazy(() => import('./pages/dashboard/ProfileSettings'))
const LinksManager = lazy(() => import('./pages/dashboard/LinksManager'))
const LeadsPage = lazy(() => import('./pages/dashboard/LeadsPage'))
const AnalyticsPage = lazy(() => import('./pages/dashboard/AnalyticsPage'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'))
const TermsPage = lazy(() => import('./pages/TermsPage'))
const RefundPage = lazy(() => import('./pages/RefundPage'))
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'))
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'))
const ReferralPage = lazy(() => import('./pages/dashboard/ReferralPage'))
const ImportLinktreePage = lazy(() => import('./pages/ImportLinktreePage'))

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
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
              <Route index element={<ProfileSettings />} />
              <Route path="links" element={<LinksManager />} />
              <Route path="leads" element={<LeadsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="referral" element={<ReferralPage />} />
            </Route>

            {/* Public bio pages — must be LAST to avoid catching /dashboard, /auth */}
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
