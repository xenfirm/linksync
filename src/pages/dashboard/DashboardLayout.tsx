import { NavLink, Outlet } from 'react-router-dom'
import { User, Link2, Users, ExternalLink } from 'lucide-react'
import Navbar from '../../components/Navbar'
import { useProfile } from '../../hooks/useProfile'

const navItems = [
  { to: '/dashboard', label: 'Profile', icon: <User size={16} />, end: true },
  { to: '/dashboard/links', label: 'Links', icon: <Link2 size={16} />, end: false },
  { to: '/dashboard/leads', label: 'Leads', icon: <Users size={16} />, end: false },
]

export default function DashboardLayout() {
  const { profile } = useProfile()

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh' }}>
      <Navbar variant="dashboard" />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '2rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: '2rem',
          alignItems: 'start',
        }}
      >
        {/* Sidebar */}
        <aside>
          {/* Profile preview card */}
          {profile && (
            <div
              className="glass-card"
              style={{ borderRadius: '14px', padding: '1.25rem', marginBottom: '1rem', textAlign: 'center' }}
            >
              {profile.profile_image ? (
                <img
                  src={profile.profile_image}
                  alt={profile.name}
                  style={{ width: '52px', height: '52px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 0.6rem' }}
                />
              ) : (
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 0.6rem',
                    fontWeight: 700,
                    color: 'white',
                    fontSize: '1.1rem',
                  }}
                >
                  {profile.name?.charAt(0).toUpperCase()}
                </div>
              )}
              <p style={{ fontWeight: 700, color: '#f1f0ff', fontSize: '0.875rem' }}>{profile.name}</p>
              <p style={{ color: '#9b99c4', fontSize: '0.75rem' }}>@{profile.username}</p>
              <a
                href={`/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                  marginTop: '0.75rem',
                  background: 'rgba(124,58,237,0.1)',
                  border: '1px solid rgba(124,58,237,0.3)',
                  color: '#a78bfa',
                  textDecoration: 'none',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.35rem 0.75rem',
                  borderRadius: '100px',
                }}
              >
                <ExternalLink size={11} /> View Page
              </a>
            </div>
          )}

          {/* Nav */}
          <nav
            className="glass-card"
            style={{ borderRadius: '14px', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          >
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.65rem 0.875rem',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#f1f0ff' : '#9b99c4',
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(236,72,153,0.1))'
                    : 'transparent',
                  borderLeft: isActive ? '2px solid #7c3aed' : '2px solid transparent',
                  transition: 'all 0.2s',
                })}
              >
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
