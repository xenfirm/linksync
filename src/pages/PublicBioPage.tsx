import { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { MessageCircle, ExternalLink, Loader2, AlertCircle, Send } from 'lucide-react'
import { supabase } from '../lib/supabase'
import type { Profile, Link as LinkType } from '../lib/types'
import { getTheme, type Theme, type ThemeId } from '../themes'

// ── Keyframe injection ────────────────────────────────────────────────────────
const injectKeyframes = () => `
  @keyframes fadeUpIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes neonPulse {
    0%, 100% { box-shadow: 0 0 20px rgba(168,85,247,0.25); }
    50%       { box-shadow: 0 0 35px rgba(168,85,247,0.5); }
  }
  @keyframes spinLoader {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
`

// ── Themed Link Button ────────────────────────────────────────────────────────
function ThemedLinkButton({
  link,
  theme,
  onClick,
  delay = 0,
}: {
  link: LinkType
  theme: Theme
  onClick: () => void
  delay?: number
}) {
  const [hovered, setHovered] = useState(false)

  const style: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: theme.button.padding,
    borderRadius: theme.button.borderRadius,
    background: hovered ? theme.button.hoverBackground : theme.button.background,
    border: hovered ? theme.button.hoverBorder : theme.button.border,
    color: hovered ? theme.button.hoverColor : theme.button.color,
    textDecoration: 'none',
    fontWeight: theme.button.fontWeight as React.CSSProperties['fontWeight'],
    fontSize: '0.925rem',
    transition: theme.button.transition,
    boxShadow: hovered ? theme.button.hoverBoxShadow : theme.button.boxShadow,
    transform: hovered ? theme.button.hoverTransform : 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
    gap: '1rem',
    animation: `fadeUpIn 0.4s ease both`,
    animationDelay: `${delay}ms`,
  }

  return (
    <a
      href={link.url}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {link.title}
      </span>
      <ExternalLink size={15} style={{ flexShrink: 0, opacity: 0.5 }} />
    </a>
  )
}

// ── Themed WhatsApp Button ────────────────────────────────────────────────────
function ThemedWhatsAppButton({
  theme,
  onClick,
  inline = false,
}: {
  theme: Theme
  onClick: () => void
  inline?: boolean
}) {
  const [hovered, setHovered] = useState(false)

  const baseStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: theme.whatsapp.borderRadius,
    border: 'none',
    background: hovered ? theme.whatsapp.hoverBackground : theme.whatsapp.background,
    color: theme.whatsapp.color,
    fontWeight: 700,
    fontSize: '1.05rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    boxShadow: theme.whatsapp.boxShadow,
    transition: 'all 0.2s ease',
    transform: hovered ? 'translateY(-1px)' : 'none',
    fontFamily: theme.page.fontFamily,
    width: '100%',
  }

  if (inline) {
    return (
      <button
        id="btn-whatsapp-inline"
        onClick={onClick}
        style={{ ...baseStyle, marginBottom: '0.5rem' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MessageCircle size={22} fill="white" /> Chat on WhatsApp
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        left: 0,
        right: 0,
        padding: '0 1rem',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 50,
        pointerEvents: 'none',
      }}
    >
      <button
        id="btn-whatsapp"
        onClick={onClick}
        style={{ ...baseStyle, maxWidth: '420px', pointerEvents: 'auto' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <MessageCircle size={22} fill="white" /> Chat on WhatsApp
      </button>
    </div>
  )
}

// ── Themed Lead Form ──────────────────────────────────────────────────────────
function ThemedLeadForm({
  theme,
  profileFirstName,
  isPro,
  onSubmit,
  formLoading,
  formSuccess,
  formError,
  leadName,
  leadPhone,
  setLeadName,
  setLeadPhone,
}: {
  theme: Theme
  profileFirstName: string
  isPro: boolean
  onSubmit: (e: React.FormEvent) => void
  formLoading: boolean
  formSuccess: boolean
  formError: string | null
  leadName: string
  leadPhone: string
  setLeadName: (v: string) => void
  setLeadPhone: (v: string) => void
}) {
  if (!isPro) return null

  return (
    <div
      style={{
        marginBottom: '1.25rem',
        background: theme.leadForm.background,
        border: theme.leadForm.border,
        borderRadius: theme.leadForm.borderRadius,
        padding: '1.75rem',
        boxShadow: theme.leadForm.boxShadow,
        animation: 'fadeUpIn 0.4s ease both',
        animationDelay: '100ms',
      }}
    >
      <h2
        style={{
          fontFamily: theme.page.fontFamily,
          fontWeight: 700,
          fontSize: '1rem',
          color: theme.leadForm.titleColor,
          marginBottom: '0.25rem',
        }}
      >
        Get in Touch
      </h2>
      <p style={{ color: theme.leadForm.subtitleColor, fontSize: '0.825rem', marginBottom: '1.25rem' }}>
        Leave your details and {profileFirstName} will reach out to you.
      </p>

      {formSuccess ? (
        <div
          style={{
            background: '#f0fdf4',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            padding: '1rem',
            textAlign: 'center',
            color: '#16a34a',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
        >
          ✓ Thanks! Redirecting you to WhatsApp…
        </div>
      ) : (
        <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <input
            id="lead-name"
            type="text"
            placeholder="Your Name *"
            value={leadName}
            onChange={(e) => setLeadName(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              borderRadius: theme.leadForm.inputBorderRadius,
              background: theme.leadForm.inputBackground,
              border: theme.leadForm.inputBorder,
              color: theme.leadForm.inputColor,
              fontSize: '0.875rem',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: theme.page.fontFamily,
            }}
          />
          <input
            id="lead-phone"
            type="tel"
            placeholder="Phone Number *"
            value={leadPhone}
            onChange={(e) => setLeadPhone(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              borderRadius: theme.leadForm.inputBorderRadius,
              background: theme.leadForm.inputBackground,
              border: theme.leadForm.inputBorder,
              color: theme.leadForm.inputColor,
              fontSize: '0.875rem',
              outline: 'none',
              boxSizing: 'border-box',
              fontFamily: theme.page.fontFamily,
            }}
          />
          {formError && <p style={{ color: '#e11d48', fontSize: '0.8rem' }}>{formError}</p>}
          <button
            id="btn-lead-submit"
            type="submit"
            disabled={formLoading}
            style={{
              width: '100%',
              padding: '0.875rem',
              borderRadius: theme.leadForm.submitBorderRadius,
              border: 'none',
              background: theme.leadForm.submitBackground,
              color: theme.leadForm.submitColor,
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: formLoading ? 'not-allowed' : 'pointer',
              opacity: formLoading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontFamily: theme.page.fontFamily,
              transition: 'all 0.2s ease',
            }}
          >
            {formLoading ? (
              <Loader2 size={16} style={{ animation: 'spinLoader 1s linear infinite' }} />
            ) : (
              <>
                <Send size={15} /> Get in Touch
              </>
            )}
          </button>
        </form>
      )}
    </div>
  )
}

// ── Main Public Bio Page ──────────────────────────────────────────────────────
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

    const { data: linksData } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', profileData.id)
      .order('order_index', { ascending: true })

    setLinks(linksData || [])
    setLoading(false)
  }

  const handleWhatsApp = async () => {
    if (!profile?.whatsapp_number) return
    const number = profile.whatsapp_number.replace(/\D/g, '')
    const msg = encodeURIComponent(
      profile.whatsapp_message || 'Hi, I found you on LinkSync and I am interested in your services!'
    )
    supabase.from('clicks').insert({ profile_id: profile.id, type: 'whatsapp' }).then()
    window.open(`https://wa.me/${number}?text=${msg}`, '_blank')
  }

  const handleLinkClick = (linkId: string) => {
    if (profile) {
      supabase.from('clicks').insert({ profile_id: profile.id, type: 'link' }).then()
    }
  }

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return
    setFormLoading(true)
    setFormError(null)

    const leadPayload = { profile_id: profile.id, name: leadName.trim(), phone: leadPhone.trim() }
    const { error } = await supabase.from('leads').insert({ ...leadPayload, source: 'form' })

    if (error) {
      setFormError('Something went wrong. Please try again.')
    } else {
      setFormSuccess(true)

      if (isPro) {
        supabase.functions.invoke('send-lead-email', { body: leadPayload }).then().catch(console.error)
      }

      if (profile.whatsapp_number) {
        const number = profile.whatsapp_number.replace(/\D/g, '')
        const msg = encodeURIComponent(
          `Hi, I'm ${leadName.trim()}. I just submitted the form on your LinkSync page and would like to know more!`
        )
        setTimeout(() => window.open(`https://wa.me/${number}?text=${msg}`, '_blank'), 1500)
      }

      setLeadName('')
      setLeadPhone('')
    }
    setFormLoading(false)
  }

  // ── Loading / not-found states ─────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff7f2' }}>
        <Loader2 size={32} style={{ color: '#8133C2', animation: 'spinLoader 1s linear infinite' }} />
        <style>{`@keyframes spinLoader { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
      </div>
    )
  }

  if (notFound) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff7f2', padding: '2rem', gap: '1rem' }}>
        <AlertCircle size={48} style={{ color: '#94a3b8' }} />
        <h1 style={{ fontWeight: 800, color: '#0f172a', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Profile not found</h1>
        <p style={{ color: '#64748b' }}>@{username} doesn't exist on LinkSync</p>
        <a href="/" style={{ marginTop: '0.5rem', background: '#8133C2', color: 'white', textDecoration: 'none', padding: '0.75rem 1.75rem', borderRadius: '12px', fontWeight: 700, fontSize: '0.95rem' }}>
          Create your own LinkSync
        </a>
      </div>
    )
  }

  // ── Plan checks ────────────────────────────────────────────────────────────
  const isTrialActive = profile?.trial_ends_at
    ? new Date(profile.trial_ends_at) > new Date()
    : false

  const isPro = profile?.plan === 'pro' || profile?.is_admin || isTrialActive
  const isBasic = profile?.plan === 'basic' || isPro

  // ── Theme resolution ───────────────────────────────────────────────────────
  const theme = getTheme(profile?.theme as ThemeId | undefined)
  const profileFirstName = profile?.name?.split(' ')[0] || ''

  // ── Render ─────────────────────────────────────────────────────────────────
  const leadFormEl = (
    <ThemedLeadForm
      theme={theme}
      profileFirstName={profileFirstName}
      isPro={isPro}
      onSubmit={handleLeadSubmit}
      formLoading={formLoading}
      formSuccess={formSuccess}
      formError={formError}
      leadName={leadName}
      leadPhone={leadPhone}
      setLeadName={setLeadName}
      setLeadPhone={setLeadPhone}
    />
  )

  const whatsappInline = isBasic && profile?.whatsapp_number && theme.layout.whatsappAboveFold && (
    <ThemedWhatsAppButton theme={theme} onClick={handleWhatsApp} inline />
  )

  const whatsappSticky = isBasic && profile?.whatsapp_number && !theme.layout.whatsappAboveFold && (
    <ThemedWhatsAppButton theme={theme} onClick={handleWhatsApp} />
  )

  return (
    <div
      style={{
        minHeight: '100vh',
        background: theme.page.background,
        padding: '2.5rem 1rem 7rem',
        display: 'flex',
        justifyContent: 'center',
        fontFamily: theme.page.fontFamily,
        color: theme.page.color,
      }}
    >
      {/* Glow overlay */}
      {theme.glow && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: theme.glow.size,
            height: '280px',
            background: `radial-gradient(ellipse, ${theme.glow.color} 0%, transparent 70%)`,
            filter: 'blur(60px)',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />
      )}

      <div style={{ width: '100%', maxWidth: theme.layout.maxWidth, position: 'relative', zIndex: 1 }}>
        {/* WhatsApp above fold (Business Conversion layout) */}
        {whatsappInline}

        {/* Lead form first (Business Conversion layout) */}
        {theme.layout.leadFormFirst && leadFormEl}

        {/* Profile Card */}
        <div
          style={{
            background: theme.card.background,
            border: theme.card.border,
            borderRadius: theme.card.borderRadius,
            padding: theme.card.padding,
            textAlign: 'center',
            marginBottom: '1rem',
            boxShadow: theme.card.boxShadow,
            animation: 'fadeUpIn 0.4s ease both',
          }}
        >
          {profile?.profile_image ? (
            <img
              src={profile.profile_image}
              alt={profile.name}
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                objectFit: 'cover',
                border: theme.card.avatarBorder,
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
                background: theme.card.avatarBackground,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontSize: '2.25rem',
                fontWeight: 900,
                color: 'white',
              }}
            >
              {profile?.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
          )}

          <h1
            style={{
              fontWeight: 800,
              fontSize: '1.35rem',
              color: theme.card.nameColor,
              marginBottom: '0.3rem',
            }}
          >
            {profile?.name}
          </h1>
          <p style={{ color: theme.card.usernameColor, fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
            @{profile?.username}
          </p>
          {profile?.bio && (
            <p style={{ color: theme.card.bioColor, fontSize: '0.9rem', lineHeight: 1.65 }}>
              {profile.bio}
            </p>
          )}
        </div>

        {/* Lead form (standard position) */}
        {!theme.layout.leadFormFirst && leadFormEl}

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: theme.layout.gap }}>
          {links.map((link, i) => (
            <ThemedLinkButton
              key={link.id}
              link={link}
              theme={theme}
              onClick={() => handleLinkClick(link.id)}
              delay={i * 60}
            />
          ))}
        </div>

        {/* Powered by */}
        {!isPro && (
          <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem', marginTop: '2.5rem' }}>
            Powered by{' '}
            <a href="/" style={{ color: '#8133C2', textDecoration: 'none', fontWeight: 600 }}>
              LinkSync
            </a>
          </p>
        )}
      </div>

      {/* Sticky WhatsApp (standard position) */}
      {whatsappSticky}

      {/* Global keyframes */}
      <style>{injectKeyframes()}</style>
    </div>
  )
}
