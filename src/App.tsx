import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import PublicBioPage from './pages/PublicBioPage'
import DashboardLayout from './pages/dashboard/DashboardLayout'
import ProfileSettings from './pages/dashboard/ProfileSettings'
import LinksManager from './pages/dashboard/LinksManager'
import LeadsPage from './pages/dashboard/LeadsPage'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

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
          </Route>

          {/* Public bio pages — must be LAST to avoid catching /dashboard, /auth */}
          <Route path="/:username" element={<PublicBioPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
