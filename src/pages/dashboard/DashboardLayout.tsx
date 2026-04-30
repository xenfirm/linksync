import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { User, Link2, Users, ExternalLink, Menu, X } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { useProfile } from '../../hooks/useProfile'

const navItems = [
  { to: '/dashboard', label: 'Profile', icon: <User size={16} />, end: true },
  { to: '/dashboard/links', label: 'Links', icon: <Link2 size={16} />, end: false },
  { to: '/dashboard/leads', label: 'Leads', icon: <Users size={16} />, end: false },
]

export default function DashboardLayout() {
  const { profile } = useProfile()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const Sidebar = ({ mobile = false }: { mobile?: boolean }) => (
    <aside style={{ width: mobile ? '100%' : '220px', flexShrink: 0 }}>
      {/* Profile card */}
      {profile && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem', marginBottom: '0.75rem', textAlign: 'center' }}>
          {profile.profile_image ? (
            <img src={profile.profile_image} alt={profile.name}
              style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.6rem', display: 'block' }} />
          ) : (
            <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'linear-gradient(135deg, #6d28d9, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.6rem', fontWeight: 800, color: 'white', fontSize: '1.2rem' }}>
              {profile.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <p style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>{profile.name}</p>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>@{profile.username}</p>
          <a href={`/${profile.username}`} target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.75rem', background: '#ede9fe', border: '1px solid #ddd6fe', color: '#6d28d9', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, padding: '0.35rem 0.875rem', borderRadius: '100px' }}>
            <ExternalLink size={11} /> View Page
          </a>
        </div>
      )}

      {/* Nav */}
      <nav style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={() => setSidebarOpen(false)}
            style={({ isActive }) => ({
              display: 'flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.7rem 0.875rem', borderRadius: '10px', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: isActive ? 700 : 500,
              color: isActive ? '#6d28d9' : '#374151',
              background: isActive ? '#ede9fe' : 'transparent',
              transition: 'all 0.15s',
            })}
          >
            {item.icon} {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingTop: '64px' }}>
      <Navbar variant="dashboard" />

      {/* Mobile sidebar toggle */}
      <div style={{ display: 'none' }} className="hide-desktop" />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '0.875rem 1.25rem',
          background: '#fff',
          borderBottom: '1px solid #e2e8f0',
        }}
        className="hide-desktop"
      >
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{ background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
        <span style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.875rem' }}>Dashboard</span>
      </div>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div style={{ padding: '1rem 1.25rem', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }} className="hide-desktop">
          <Sidebar mobile />
        </div>
      )}

      {/* Desktop layout */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.25rem', display: 'flex', gap: '2rem', alignItems: 'start' }}>
        {/* Desktop sidebar */}
        <div className="hide-mobile" style={{ width: '220px', flexShrink: 0 }}>
          <Sidebar />
        </div>

        {/* Main content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
