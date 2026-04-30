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

  const [leadName, setLeadName] = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [formLoading, setFormLoading] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  useEffect(() => { fetchProfile() }, [username])

  const fetchProfile = async () => {
    setLoading(true)
    const { data: profileData, error } = await supabase.from('profiles').select('*').eq('username', username).single()
    if (error || !profileData) { setNotFound(true); setLoading(false); return }
    setProfile(profileData)
    const { data: linksData } = await supabase.from('links').select('*').eq('profile_id', profileData.id).order('order_index', { ascending: true })
    setLinks(linksData || [])
    setLoading(false)
  }

  const handleWhatsApp = async () => {
    if (!profile) return
    const number = profile.whatsapp_number.replace(/\D/g, '')
    const msg = encodeURIComponent('Hi, I found you on LinkSync and I am interested in your services!')
    window.open(`https://wa.me/${number}?text=${msg}`, '_blank')
    await supabase.from('leads').insert({ profile_id: profile.id, name: 'WhatsApp visitor', phone: 'N/A', source: 'whatsapp' })
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return
    setFormLoading(true); setFormError(null)
    const { error } = await supabase.from('leads').insert({ profile_id: profile.id, name: leadName.trim(), phone: leadPhone.trim(), source: 'form' })
    if (error) setFormError('Something went wrong. Please try again.')
    else { setFormSuccess(true); setLeadName(''); setLeadPhone('') }
    setFormLoading(false)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#faf5ff' }}>
        <Loader2 size={32} style={{ color: '#6d28d9', animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  if (notFound) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#faf5ff', padding: '2rem', gap: '1rem' }}>
        <AlertCircle size={48} style={{ color: '#94a3b8' }} />
        <h1 style={{ fontWeight: 800, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Profile not found</h1>
        <p style={{ color: '#64748b' }}>@{username} doesn't exist on LinkSync</p>
        <a href="/" style={{ marginTop: '0.5rem', background: '#6d28d9', color: 'white', textDecoration: 'none', padding: '0.75rem 1.75rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem' }}>
          Create your own LinkSync
        </a>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #faf5ff 0%, #f0f9ff 50%, #faf5ff 100%)', padding: '2.5rem 1rem 5rem', display: 'flex', justifyContent: 'center' }}>
      {/* Subtle top glow */}
      <div style={{ position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '250px', background: 'radial-gradient(ellipse, rgba(109,40,217,0.12) 0%, transparent 70%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ width: '100%', maxWidth: '420px', position: 'relative', zIndex: 1 }}>
        {/* Profile Card */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2.5rem 1.75rem', textAlign: 'center', marginBottom: '1rem', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
          {profile?.profile_image ? (
            <img src={profile.profile_image} alt={profile.name}
              style={{ width: '88px', height: '88px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ede9fe', margin: '0 auto 1rem', display: 'block' }} />
          ) : (
            <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: 'linear-gradient(135deg, #6d28d9, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '2.25rem', fontWeight: 900, color: 'white', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {profile?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.35rem', color: '#0f172a', marginBottom: '0.3rem' }}>
            {profile?.name}
          </h1>
          <p style={{ color: '#6d28d9', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>@{profile?.username}</p>
          {profile?.bio && <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.65 }}>{profile.bio}</p>}
        </div>

        {/* WhatsApp Button */}
        {profile?.whatsapp_number && (
          <button
            id="btn-whatsapp"
            onClick={handleWhatsApp}
            style={{ width: '100%', padding: '0.9rem', borderRadius: '14px', border: 'none', background: '#25d366', color: 'white', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem', boxShadow: '0 6px 20px rgba(37,211,102,0.3)', transition: 'transform 0.2s', fontFamily: 'Inter, sans-serif' }}
          >
            <MessageCircle size={20} fill="white" /> Chat on WhatsApp
          </button>
        )}

        {/* Links */}
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', padding: '0.9rem 1.25rem', borderRadius: '14px', background: '#fff', border: '1px solid #e2e8f0', color: '#0f172a', textDecoration: 'none', fontWeight: 600, fontSize: '0.925rem', marginBottom: '0.6rem', transition: 'all 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', boxSizing: 'border-box' }}
          >
            {link.title}
            <ExternalLink size={15} style={{ color: '#94a3b8', flexShrink: 0 }} />
          </a>
        ))}

        {/* Lead Form */}
        <div style={{ marginTop: '1.25rem', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '1.75rem', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1rem', color: '#0f172a', marginBottom: '0.25rem' }}>
            Get in Touch
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.825rem', marginBottom: '1.25rem' }}>
            Leave your details and {profile?.name?.split(' ')[0]} will reach out to you.
          </p>

          {formSuccess ? (
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '1rem', textAlign: 'center', color: '#16a34a', fontSize: '0.9rem', fontWeight: 600 }}>
              ✓ Thanks! We'll be in touch soon.
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input id="lead-name" type="text" className="input-dark" placeholder="Your Name *" value={leadName} onChange={e => setLeadName(e.target.value)} required />
              <input id="lead-phone" type="tel" className="input-dark" placeholder="Phone Number *" value={leadPhone} onChange={e => setLeadPhone(e.target.value)} required />
              {formError && <p style={{ color: '#e11d48', fontSize: '0.8rem' }}>{formError}</p>}
              <button
                id="btn-lead-submit"
                type="submit"
                disabled={formLoading}
                className="btn-primary"
                style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', fontSize: '0.9rem', justifyContent: 'center', opacity: formLoading ? 0.7 : 1, cursor: formLoading ? 'not-allowed' : 'pointer' }}
              >
                {formLoading ? <Loader2 size={16} className="animate-spin" /> : <><Send size={15} /> Get in Touch</>}
              </button>
            </form>
          )}
        </div>

        {/* Powered by */}
        <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem', marginTop: '2rem' }}>
          Powered by{' '}<a href="/" style={{ color: '#6d28d9', textDecoration: 'none', fontWeight: 600 }}>LinkSync</a>
        </p>
      </div>
    </div>
  )
}
