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

  return (
    <>
      <nav
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #f1f5f9',
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
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
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <Logo size={30} />
          </Link>

          {/* Desktop Nav Links (landing only) */}
          {variant === 'landing' && (
            <div
              className="hide-mobile"
              style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}
            >
              {[
                { label: 'Features', href: '#features' },
                { label: 'How It Works', href: '#how-it-works' },
                { label: 'Pricing', href: '#pricing' },
              ].map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{ color: '#374151', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Desktop actions */}
          <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {variant === 'landing' && !user && (
              <>
                <Link
                  to="/auth"
                  style={{ color: '#374151', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500, padding: '0.5rem 1rem' }}
                >
                  Login
                </Link>
                <Link
                  to="/auth?mode=signup"
                  className="btn-primary"
                  style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem', borderRadius: '10px' }}
                >
                  Get Started Free
                </Link>
              </>
            )}
            {variant === 'landing' && user && (
              <Link
                to="/dashboard"
                className="btn-primary"
                style={{ padding: '0.55rem 1.25rem', fontSize: '0.9rem', borderRadius: '10px' }}
              >
                <LayoutDashboard size={16} /> Dashboard
              </Link>
            )}
            {variant === 'dashboard' && (
              <button
                onClick={handleSignOut}
                style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.45rem 0.875rem', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, color: '#374151' }}
              >
                <LogOut size={14} /> Sign Out
              </button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: '0.5rem', borderRadius: '8px' }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div
          className="hide-desktop"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99,
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setMobileOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '280px',
              height: '100%',
              background: '#fff',
              boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
              padding: '5rem 1.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
            onClick={e => e.stopPropagation()}
          >
            {variant === 'landing' && (
              <>
                {[
                  { label: 'Features', href: '#features' },
                  { label: 'How It Works', href: '#how-it-works' },
                  { label: 'Pricing', href: '#pricing' },
                ].map(link => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    style={{ color: '#374151', textDecoration: 'none', fontSize: '1rem', fontWeight: 500, padding: '0.75rem 0', borderBottom: '1px solid #f1f5f9', display: 'block' }}
                  >
                    {link.label}
                  </a>
                ))}
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {!user ? (
                    <>
                      <Link to="/auth" onClick={() => setMobileOpen(false)} style={{ textAlign: 'center', padding: '0.75rem', border: '1.5px solid #e2e8f0', borderRadius: '10px', color: '#374151', textDecoration: 'none', fontWeight: 600 }}>
                        Login
                      </Link>
                      <Link to="/auth?mode=signup" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem', borderRadius: '10px' }}>
                        Get Started Free
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="btn-primary" style={{ justifyContent: 'center', padding: '0.75rem', borderRadius: '10px' }}>
                        Dashboard
                      </Link>
                      <button onClick={handleSignOut} style={{ padding: '0.75rem', border: '1.5px solid #e2e8f0', borderRadius: '10px', background: 'none', cursor: 'pointer', fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
                        Sign Out
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
            {variant === 'dashboard' && (
              <button onClick={handleSignOut} style={{ marginTop: 'auto', padding: '0.75rem', border: '1.5px solid #e2e8f0', borderRadius: '10px', background: 'none', cursor: 'pointer', fontWeight: 600, color: '#374151', fontSize: '0.9rem' }}>
                Sign Out
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}
