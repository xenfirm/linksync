import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { MessageCircle, ExternalLink, Loader2, AlertCircle, Send } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Profile, Link as LinkType } from '../lib/types'

export default function PublicBioPage() {
  const { username } = useParams<{ username: string }>()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [links, setLinks] = useState<LinkType[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Lead form
  const [leadName, setLeadName] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => {
    fetchProfile()
  }, [username])

  const fetchProfile = async () => {
    setLoading(true)
    const { data: profileData, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single()

    if (error || !profileData) {
      setNotFound(true)
      setLoading(false)
      return
    }

    setProfile(profileData)

    // Fetch links
    const { data: linksData } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', profileData.id)
      .order('order_index', { ascending: true })

    setLinks(linksData || [])
    setLoading(false)
  }

  const handleWhatsApp = async () => {
    if (!profile) return
    const number = profile.whatsapp_number.replace(/\D/g, '')
    const msg = encodeURIComponent('Hi, I am interested in your services')
    window.open(`https://wa.me/${number}?text=${msg}`, '_blank')

    // Log WhatsApp click as lead if we have contact info
    await supabase.from('leads').insert({
      profile_id: profile.id,
      name: 'WhatsApp visitor',
      phone: 'N/A',
      source: 'whatsapp',
    })
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return
    setFormLoading(true)
    setFormError(null)

    const { error } = await supabase.from('leads').insert({
      profile_id: profile.id,
      name: leadName.trim(),
      phone: leadPhone.trim(),
      source: 'form',
    })

    if (error) {
      setFormError('Something went wrong. Please try again.')
    } else {
      setFormSuccess(true)
      setLeadName('')
      setLeadPhone('')
    }
    setFormLoading(false)
  }

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0f1a',
        }}
      >
        <Loader2 size={32} style={{ color: '#7c3aed', animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  if (notFound) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f0f1a',
          gap: '1rem',
        }}
      >
        <AlertCircle size={40} style={{ color: '#9b99c4' }} />
        <h1 style={{ fontWeight: 700, color: '#f1f0ff' }}>Profile not found</h1>
        <p style={{ color: '#9b99c4' }}>@{username} doesn't exist on LinkSync</p>
        <a
          href="/"
          style={{
            marginTop: '0.5rem',
            background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
            color: 'white',
            textDecoration: 'none',
            padding: '0.65rem 1.5rem',
            borderRadius: '10px',
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
        >
          Create your own LinkSync
        </a>
      </div>
    )
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #130820 0%, #0f0f1a 50%, #0f0f1a 100%)',
        padding: '2rem 1rem 4rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '500px',
          height: '300px',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.2) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        {/* Profile Card */}
        <div
          className="glass-card"
          style={{
            borderRadius: '24px',
            padding: '2.5rem 2rem',
            textAlign: 'center',
            marginBottom: '1rem',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
          }}
        >
          {/* Profile Image */}
          {profile?.profile_image ? (
            <img
              src={profile.profile_image}
              alt={profile.name}
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid transparent',
                background: 'linear-gradient(#0f0f1a, #0f0f1a) padding-box, linear-gradient(135deg, #7c3aed, #ec4899) border-box',
                margin: '0 auto 1rem',
                display: 'block',
              }}
            />
          ) : (
            <div
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '2rem',
                fontWeight: 800,
                color: 'white',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {profile?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '1.35rem',
              color: '#f1f0ff',
              marginBottom: '0.4rem',
            }}
          >
            {profile?.name}
          </h1>
          <p style={{ color: '#a78bfa', fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            @{profile?.username}
          </p>
          {profile?.bio && (
            <p style={{ color: '#9b99c4', fontSize: '0.9rem', lineHeight: 1.7 }}>{profile.bio}</p>
          )}
        </div>

        {/* WhatsApp Button */}
        {profile?.whatsapp_number && (
          <button
            id="btn-whatsapp"
            onClick={handleWhatsApp}
            style={{
              width: '100%',
              padding: '0.9rem',
              borderRadius: '14px',
              border: 'none',
              background: '#25d366',
              color: 'white',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginBottom: '0.75rem',
              boxShadow: '0 8px 25px rgba(37,211,102,0.3)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <MessageCircle size={20} fill="white" />
            Chat on WhatsApp
          </button>
        )}

        {/* Custom Links */}
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '0.875rem 1.25rem',
              borderRadius: '14px',
              background: 'rgba(30, 30, 53, 0.7)',
              border: '1px solid #2a2a45',
              color: '#f1f0ff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.925rem',
              marginBottom: '0.6rem',
              transition: 'background 0.2s, border-color 0.2s, transform 0.2s',
              boxSizing: 'border-box',
            }}
          >
            {link.title}
            <ExternalLink size={15} style={{ color: '#9b99c4', flexShrink: 0 }} />
          </a>
        ))}

        {/* Lead Form */}
        <div
          style={{
            marginTop: '1.25rem',
            background: 'rgba(124,58,237,0.06)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '20px',
            padding: '1.75rem',
          }}
        >
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#f1f0ff',
              marginBottom: '0.25rem',
            }}
          >
            Get in Touch
          </h2>
          <p style={{ color: '#9b99c4', fontSize: '0.825rem', marginBottom: '1.25rem' }}>
            Leave your details and {profile?.name?.split(' ')[0]} will reach out to you.
          </p>

          {formSuccess ? (
            <div
              style={{
                background: 'rgba(34,197,94,0.1)',
                border: '1px solid rgba(34,197,94,0.3)',
                borderRadius: '12px',
                padding: '1rem',
                textAlign: 'center',
                color: '#4ade80',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}
            >
              ✓ Thanks! We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                id="lead-name"
                type="text"
                className="input-dark"
                placeholder="Your Name *"
                value={leadName}
                onChange={e => setLeadName(e.target.value)}
                required
              />
              <input
                id="lead-phone"
                type="tel"
                className="input-dark"
                placeholder="Phone Number *"
                value={leadPhone}
                onChange={e => setLeadPhone(e.target.value)}
                required
              />
              {formError && (
                <p style={{ color: '#f87171', fontSize: '0.8rem' }}>{formError}</p>
              )}
              <button
                id="btn-lead-submit"
                type="submit"
                disabled={formLoading}
                className="btn-gradient"
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '10px',
                  border: 'none',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: formLoading ? 'not-allowed' : 'pointer',
                  opacity: formLoading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {formLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    <Send size={15} /> Get in Touch
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Powered by */}
        <p style={{ textAlign: 'center', color: '#9b99c4', fontSize: '0.75rem', marginTop: '2rem' }}>
          Powered by{' '}
          <a
            href="/"
            style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}
          >
            LinkSync
          </a>
        </p>
      </div>
    </div>
  )
}
