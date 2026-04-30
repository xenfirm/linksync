import { Link, useNavigate } from 'react-router-dom'
import { LogOut, LayoutDashboard, User, Link2, Users } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Logo from './Logo'

interface NavbarProps {
  variant?: 'landing' | 'dashboard'
}

export default function Navbar({ variant = 'landing' }: NavbarProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <nav
      style={{
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(51, 65, 85, 0.6)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Logo - Centered for better branding */}
        <Link 
          to="/" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            textDecoration: 'none',
            position: 'absolute',
            left: '1.5rem'
          }}
        >
          <Logo size={32} />
        </Link>

        {/* Desktop Navigation links could go here in future */}

        {/* Nav Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'absolute', right: '1.5rem' }}>
          {variant === 'landing' && !user && (
            <>
              <Link
                to="/auth"
                style={{
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  transition: 'color 0.2s',
                }}
              >
                Sign In
              </Link>
              <Link
                to="/auth?mode=signup"
                style={{
                  background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '10px',
                  transition: 'opacity 0.2s',
                }}
              >
                Get Started
              </Link>
            </>
          )}

          {user && variant === 'landing' && (
            <Link
              to="/dashboard"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
                color: 'white',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 600,
                padding: '0.5rem 1.25rem',
                borderRadius: '10px',
              }}
            >
              <LayoutDashboard size={15} /> Dashboard
            </Link>
          )}

          {variant === 'dashboard' && (
            <>
              <Link
                to="/dashboard"
                id="nav-profile"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(51, 65, 85, 0.3)',
                }}
              >
                <User size={14} /> Profile
              </Link>
              <Link
                to="/dashboard/links"
                id="nav-links"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(51, 65, 85, 0.3)',
                }}
              >
                <Link2 size={14} /> Links
              </Link>
              <Link
                to="/dashboard/leads"
                id="nav-leads"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  background: 'rgba(51, 65, 85, 0.3)',
                }}
              >
                <Users size={14} /> Leads
              </Link>
              <button
                id="btn-signout"
                onClick={handleSignOut}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  color: '#94a3b8',
                  background: 'none',
                  border: '1px solid rgba(51, 65, 85, 0.8)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
