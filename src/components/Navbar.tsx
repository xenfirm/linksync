import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Logo from './Logo'

interface NavbarProps {
  variant?: 'landing' | 'dashboard'
}

export default function Navbar({ variant = 'landing' }: NavbarProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
    setMobileOpen(false)
  }

  // Dashboard: minimal dark top bar (no hamburger needed — bottom nav handles navigation)
  if (variant === 'dashboard') {
    return (
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(14,5,32,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(129,51,194,0.2)',
          padding: '0 1rem',
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Logo size={26} />
        </Link>
      </div>
    )
  }

  // Landing navbar
  return (
    <>
      <nav
        style={{
          background: 'rgba(14,5,32,0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(129,51,194,0.18)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1.25rem',
            height: '64px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <Logo size={30} />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {[
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'FAQ', href: '#faq' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, transition: 'color 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f1f5f9')}
                onMouseLeave={e => (e.currentTarget.style.color = '#94a3b8')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop actions */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {!user ? (
              <>
                <Link to="/auth" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 1rem' }}>
                  Login
                </Link>
                <Link to="/auth?mode=signup" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}>
                  Start free
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn-primary" style={{ padding: '0.55rem 1.25rem', fontSize: '0.875rem' }}>
                <LayoutDashboard size={16} /> Dashboard
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: '0.5rem' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          className="hide-desktop"
          style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(12px)' }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{ position: 'absolute', top: 0, right: 0, width: '280px', height: '100%', background: '#160b2e', borderLeft: '1px solid rgba(129,51,194,0.2)', padding: '5rem 1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}
            onClick={e => e.stopPropagation()}
          >
            {[{ label: 'Features', href: '#features' }, { label: 'Pricing', href: '#pricing' }, { label: 'FAQ', href: '#faq' }].map(link => (
              <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '1rem', fontWeight: 500, padding: '0.875rem 0', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'block' }}>
                {link.label}
              </a>
            ))}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {!user ? (
                <>
                  <Link to="/auth" onClick={() => setMobileOpen(false)} style={{ textAlign: 'center', padding: '0.875rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#94a3b8', textDecoration: 'none', fontWeight: 600 }}>Login</Link>
                  <Link to="/auth?mode=signup" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ justifyContent: 'center', padding: '0.875rem', borderRadius: '12px' }}>Start free</Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ justifyContent: 'center', padding: '0.875rem', borderRadius: '12px' }}>Dashboard</Link>
                  <button onClick={handleSignOut} style={{ padding: '0.875rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', background: 'none', cursor: 'pointer', fontWeight: 600, color: '#94a3b8', fontSize: '0.9rem' }}>Sign Out</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
