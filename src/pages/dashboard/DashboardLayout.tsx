import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Link2, Users, Home, BarChart2, User } from 'lucide-react'
import Navbar from '../../components/Navbar'

// ── Bottom Nav Item ────────────────────────────────────────────────────────────
function NavItem({
  to,
  icon,
  label,
  end = false,
}: {
  to: string
  icon: React.ReactNode
  label: string
  end?: boolean
}) {
  return (
    <NavLink to={to} end={end} style={{ textDecoration: 'none', flex: 1 }}>
      {({ isActive }) => (
        <motion.div
          whileTap={{ scale: 0.85 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.28rem',
            padding: '0.5rem 0.25rem',
            borderRadius: '16px',
            position: 'relative',
            background: isActive ? 'rgba(129,51,194,0.15)' : 'transparent',
            transition: 'background 0.2s ease',
          }}
        >
          {/* Active pill indicator on top */}
          {isActive && (
            <motion.div
              layoutId="nav-indicator"
              style={{
                position: 'absolute',
                top: '-2px',
                width: '24px',
                height: '3px',
                borderRadius: '100px',
                background: '#BFCF1A',
                boxShadow: '0 0 10px rgba(191,207,26,0.8)',
              }}
            />
          )}

          <span
            style={{
              color: isActive ? '#BFCF1A' : '#5b4378',
              transition: 'color 0.2s',
              display: 'flex',
            }}
          >
            {icon}
          </span>

          <span
            style={{
              fontSize: '0.58rem',
              fontWeight: isActive ? 700 : 500,
              color: isActive ? '#BFCF1A' : '#5b4378',
              transition: 'color 0.2s',
              letterSpacing: '0.01em',
              lineHeight: 1,
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            {label}
          </span>
        </motion.div>
      )}
    </NavLink>
  )
}

// ── Page Transition ───────────────────────────────────────────────────────────
function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.22, ease: 'easeOut' }}
        style={{ height: '100%' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// ── Dashboard Layout ──────────────────────────────────────────────────────────
export default function DashboardLayout() {
  return (
    <div className="app-shell">
      <div className="app-page-content">
        <Navbar variant="dashboard" />

        {/* Page Content */}
        <div style={{ padding: '1.25rem 1rem 1rem' }}>
          <PageTransition>
            <Outlet />
          </PageTransition>
        </div>

        {/* Floating Bottom Nav */}
        <nav className="bottom-nav" aria-label="Main navigation">
          <div className="bottom-nav-inner">
            <NavItem to="/dashboard/links"     icon={<Link2    size={20} />} label="Links"     />
            <NavItem to="/dashboard/leads"     icon={<Users    size={20} />} label="Leads"     />
            <NavItem to="/dashboard"     end   icon={<Home     size={20} />} label="Home"      />
            <NavItem to="/dashboard/analytics" icon={<BarChart2 size={20} />} label="Analytics" />
            <NavItem to="/dashboard/profile"   icon={<User     size={20} />} label="Profile"   />
          </div>
        </nav>
      </div>
    </div>
  )
}
