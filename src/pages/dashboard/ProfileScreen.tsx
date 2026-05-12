import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera, Save, Loader2, CheckCircle2, AlertCircle, User,
  ExternalLink, LogOut, Palette, ChevronRight, CreditCard, Gift, Copy, Check
} from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { useAuth } from '../../hooks/useAuth'
import { usePayments } from '../../hooks/usePayments'
import { supabase } from '../../lib/supabase'
import { ToggleSwitch, PlanBadge, GradientButton, SettingsRow, Toast } from '../../components/ui'
import { themeList, freeThemes, getTheme, type ThemeId } from '../../themes'
import { useNavigate } from 'react-router-dom'

// ── Inline Theme Picker ───────────────────────────────────────────────────────
function ThemePickerSection({ savedTheme, isPro, onApply }: { savedTheme: ThemeId; isPro: boolean; onApply: (id: ThemeId) => void }) {
  const [preview, setPreview] = useState<ThemeId>(savedTheme)

  return (
    <div>
      <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>Template</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
        {themeList.map(theme => {
          const canUse = freeThemes.includes(theme.id) || isPro
          const isSelected = savedTheme === theme.id
          const isPreviewing = preview === theme.id && !isSelected
          const t = getTheme(theme.id)
          return (
            <motion.div
              key={theme.id}
              whileTap={canUse ? { scale: 0.96 } : {}}
              onClick={() => canUse && setPreview(theme.id)}
              style={{
                background: typeof t.preview.bg === 'string' ? t.preview.bg : '#0f0f13',
                border: isSelected
                  ? '2px solid #a3e635'
                  : isPreviewing
                  ? '2px solid rgba(163,230,53,0.5)'
                  : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '0.875rem',
                cursor: canUse ? 'pointer' : 'default',
                position: 'relative',
                opacity: !canUse ? 0.6 : 1,
              }}
            >
              {isSelected && (
                <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: '#a3e635', color: '#0f0f13', fontSize: '0.55rem', fontWeight: 900, padding: '2px 6px', borderRadius: '100px', textTransform: 'uppercase' }}>
                  Active
                </span>
              )}
              {!canUse && (
                <span style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'rgba(251,191,36,0.15)', color: '#fbbf24', fontSize: '0.55rem', fontWeight: 900, padding: '2px 6px', borderRadius: '100px', textTransform: 'uppercase' }}>
                  Pro
                </span>
              )}
              {/* Mini avatar */}
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: t.card.avatarBackground, border: `1.5px solid ${t.preview.accent}`, marginBottom: '0.6rem' }} />
              {/* Fake bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                {[65, 50, 45].map((w, i) => (
                  <div key={i} style={{ height: '6px', borderRadius: '3px', background: t.preview.buttonBg, width: `${w}%`, opacity: 0.8 }} />
                ))}
              </div>
              <p style={{ color: t.preview.buttonText, fontSize: '0.65rem', fontWeight: 700, marginTop: '0.6rem', opacity: 0.8 }}>{theme.name}</p>
            </motion.div>
          )
        })}
      </div>
      {preview !== savedTheme && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '0.75rem' }}>
          <GradientButton onClick={() => onApply(preview)} size="sm">
            Apply "{getTheme(preview).name}" Template
          </GradientButton>
        </motion.div>
      )}
    </div>
  )
}

// ── Main Profile Page ─────────────────────────────────────────────────────────
export default function ProfileScreen() {
  const { user, signOut } = useAuth()
  const { profile, loading, updateProfile, createProfile, isPro, isTrialActive } = useProfile()
  const { handleUpgrade, error: paymentError } = usePayments()
  const navigate = useNavigate()
  const isNew = !profile

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [whatsappMsg, setWhatsappMsg] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [initialized, setInitialized] = useState(false)
  const [activeSection, setActiveSection] = useState<'profile' | 'appearance' | 'billing'>('profile')
  const [toastMsg, setToastMsg] = useState('')
  const [toastVisible, setToastVisible] = useState(false)
  const [copiedRef, setCopiedRef] = useState(false)

  useEffect(() => {
    if (profile && !initialized) {
      setName(profile.name || '')
      setUsername(profile.username || '')
      setBio(profile.bio || '')
      setWhatsapp(profile.whatsapp_number || '')
      setWhatsappMsg(profile.whatsapp_message || '')
      setProfileImage(profile.profile_image || '')
      setInitialized(true)
    }
  }, [profile, initialized])

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploading(true)
    const ext = file.name.split('.').pop()
    const path = `${user.id}/avatar.${ext}`
    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true })
    if (uploadError) { setError('Upload failed: ' + uploadError.message); setUploading(false); return }
    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    setProfileImage(data.publicUrl + '?t=' + Date.now())
    setUploading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true); setError(null); setSuccess(false)
    const payload = {
      name: name.trim(),
      username: username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, ''),
      bio: bio.trim(),
      whatsapp_number: whatsapp.trim(),
      whatsapp_message: whatsappMsg.trim(),
      profile_image: profileImage,
      plan: profile?.plan || 'free',
    }
    const { error: err } = isNew ? await createProfile(payload) : await updateProfile(payload)
    if (err) { setError(err) }
    else { setSuccess(true); showToast('Profile saved! ✓') ; setTimeout(() => setSuccess(false), 3000) }
    setSaving(false)
  }

  const handleApplyTheme = async (themeId: ThemeId) => {
    const { error } = await updateProfile({ theme: themeId })
    if (!error) showToast(`Template "${getTheme(themeId).name}" applied 🚀`)
  }

  const referralUrl = profile?.referral_code ? `${window.location.origin}/auth?ref=${profile.referral_code}` : ''

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}><Loader2 size={24} className="animate-spin" style={{ color: '#a3e635' }} /></div>
  }

  const TABS = [
    { id: 'profile', label: 'Profile' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'billing', label: 'Billing' },
  ] as const

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

      {/* ── Profile Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ background: 'linear-gradient(135deg, rgba(129,51,194,0.25), rgba(42,21,85,0.7))', border: '1px solid rgba(129,51,194,0.3)', borderRadius: '22px', padding: '1.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', width: '200px', height: '120px', background: 'radial-gradient(ellipse, rgba(167,139,250,0.15), transparent 70%)', pointerEvents: 'none' }} />
        
        {/* Avatar with upload */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: '1rem' }}>
          {profileImage ? (
            <img src={profileImage} alt="" style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid rgba(163,230,53,0.5)' }} />
          ) : (
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #a78bfa)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '1.75rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {name?.charAt(0)?.toUpperCase() || <User size={28} />}
            </div>
          )}
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            style={{ position: 'absolute', bottom: 0, right: 0, width: '28px', height: '28px', borderRadius: '50%', background: '#a3e635', border: '2px solid #0f0f13', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
          >
            {uploading ? <Loader2 size={12} className="animate-spin" color="#0f0f13" /> : <Camera size={12} color="#0f0f13" />}
          </motion.button>
          <input type="file" ref={fileRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />
        </div>

        {profile && (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '0.3rem' }}>
              <PlanBadge plan={profile.plan} isAdmin={profile.is_admin} isTrial={isTrialActive} />
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, color: '#f1f5f9', fontSize: '1.1rem', marginBottom: '0.15rem' }}>{profile.name || 'Your Name'}</h2>
            <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '0.875rem' }}>@{profile.username}</p>
            <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
              <a href={`/${profile.username}`} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', textDecoration: 'none', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.875rem', borderRadius: '100px' }}>
                <ExternalLink size={12} /> View Page
              </a>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/${profile.username}`); showToast('Link copied! 🔗') }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', background: 'rgba(163,230,53,0.1)', border: '1px solid rgba(163,230,53,0.25)', color: '#a3e635', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.875rem', borderRadius: '100px', cursor: 'pointer' }}>
                <Copy size={12} /> Copy Link
              </motion.button>
            </div>
          </>
        )}
      </motion.div>

      {/* ── Section Tabs ── */}
      <div style={{ display: 'flex', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', padding: '4px', gap: '4px' }}>
        {TABS.map(tab => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.94 }}
            onClick={() => setActiveSection(tab.id)}
            style={{ flex: 1, padding: '0.55rem', borderRadius: '10px', background: activeSection === tab.id ? 'rgba(163,230,53,0.12)' : 'transparent', border: activeSection === tab.id ? '1px solid rgba(163,230,53,0.25)' : '1px solid transparent', color: activeSection === tab.id ? '#BFCF1A' : '#7c5a9e', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Poppins', sans-serif" }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* ── PROFILE TAB ── */}
      <AnimatePresence mode="wait">
        {activeSection === 'profile' && (
          <motion.form
            key="profile"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onSubmit={handleSave}
            style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}
          >
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#f1f5f9', fontSize: '0.9rem' }}>
              {isNew ? 'Create Your Profile' : 'Edit Profile'}
            </h3>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#4b5563', fontSize: '0.9rem' }}>@</span>
                <input id="field-username" type="text" className="input-dark" placeholder="yourusername" value={username} onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))} required style={{ paddingLeft: '1.75rem' }} />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Display Name</label>
              <input id="field-name" type="text" className="input-dark" placeholder="Jane Smith" value={name} onChange={e => setName(e.target.value)} required />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bio</label>
              <textarea id="field-bio" className="input-dark" placeholder="Tell visitors what you do..." value={bio} onChange={e => setBio(e.target.value)} rows={3} style={{ resize: 'vertical' }} />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>WhatsApp Number</label>
              <input id="field-whatsapp" type="tel" className="input-dark" placeholder="+91 9876543210" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} required />
              <p style={{ color: '#374151', fontSize: '0.72rem', marginTop: '0.3rem' }}>Include country code (+91 for India)</p>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#64748b', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Default WhatsApp Message</label>
              <textarea id="field-whatsapp-msg" className="input-dark" placeholder="Hi, I saw your profile and I'm interested..." value={whatsappMsg} onChange={e => setWhatsappMsg(e.target.value)} rows={2} style={{ resize: 'vertical' }} />
            </div>

            {error && (
              <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '0.75rem 1rem', color: '#f87171', fontSize: '0.85rem' }}>
                <AlertCircle size={15} style={{ flexShrink: 0, marginTop: '1px' }} /> {error}
              </div>
            )}
            {success && (
              <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: '10px', padding: '0.75rem 1rem', color: '#22c55e', fontSize: '0.85rem' }}>
                <CheckCircle2 size={15} style={{ flexShrink: 0 }} /> Profile saved successfully!
              </div>
            )}

            <GradientButton type="submit" disabled={saving}>
              {saving ? <><Loader2 size={15} className="animate-spin" /> Saving…</> : <><Save size={15} /> {isNew ? 'Create Profile' : 'Save Changes'}</>}
            </GradientButton>
          </motion.form>
        )}

        {/* ── APPEARANCE TAB ── */}
        {activeSection === 'appearance' && (
          <motion.div key="appearance" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {profile && (
              <ThemePickerSection
                savedTheme={(profile.theme || 'minimal-clean') as ThemeId}
                isPro={isPro}
                onApply={handleApplyTheme}
              />
            )}

            {/* Public Page Settings */}
            <div>
              <p style={{ fontSize: '0.72rem', fontWeight: 700, color: '#4b5563', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                Public Page
              </p>
              <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '0 1rem' }}>
                <SettingsRow label="WhatsApp CTA Button" description="Show Chat on WhatsApp button" right={<ToggleSwitch checked id="toggle-wa" onChange={() => {}} />} />
                <SettingsRow label="Lead Capture Form" description="Collect visitor phone numbers" right={<ToggleSwitch checked={isPro} id="toggle-lead" onChange={() => {}} />} />
                <SettingsRow label="Profile Image" description="Display your avatar" right={<ToggleSwitch checked id="toggle-avatar" onChange={() => {}} />} />
              </div>
            </div>
          </motion.div>
        )}

        {/* ── BILLING TAB ── */}
        {activeSection === 'billing' && (
          <motion.div key="billing" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Current Plan */}
            <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '18px', padding: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(163,230,53,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CreditCard size={18} color="#a3e635" />
                </div>
                <div>
                  <p style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '0.875rem' }}>Current Plan</p>
                  <div style={{ marginTop: '0.2rem' }}>
                    <PlanBadge plan={profile?.plan} isAdmin={profile?.is_admin} isTrial={isTrialActive} />
                  </div>
                </div>
              </div>
              {profile?.plan === 'free' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <button onClick={() => handleUpgrade(profile.user_id, profile.name, 'basic')} className="btn-outline" style={{ padding: '0.7rem', fontSize: '0.85rem' }}>
                    Upgrade to Basic — ₹99/mo
                  </button>
                  <GradientButton onClick={() => handleUpgrade(profile!.user_id, profile!.name, 'pro')}>
                    ✦ Upgrade to Pro — ₹299/mo
                  </GradientButton>
                </div>
              )}
              {profile?.plan === 'basic' && (
                <GradientButton onClick={() => handleUpgrade(profile.user_id, profile.name, 'pro')}>
                  ✦ Upgrade to Pro — ₹299/mo
                </GradientButton>
              )}
              {paymentError && <p style={{ color: '#f87171', fontSize: '0.8rem', marginTop: '0.5rem' }}>{paymentError}</p>}
            </div>

            {/* Referral */}
            {profile?.referral_code && (
              <div style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.2)', borderRadius: '18px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                  <Gift size={18} color="#a78bfa" />
                  <div>
                    <p style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '0.875rem' }}>Referral Program</p>
                    <p style={{ color: '#64748b', fontSize: '0.75rem' }}>Invite 3 friends → Unlock Pro</p>
                  </div>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <span style={{ flex: 1, fontSize: '0.75rem', color: '#a78bfa', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {`${window.location.origin}/auth?ref=${profile.referral_code}`}
                  </span>
                  <motion.button whileTap={{ scale: 0.88 }} onClick={() => { navigator.clipboard.writeText(`${window.location.origin}/auth?ref=${profile.referral_code}`); setCopiedRef(true); setTimeout(() => setCopiedRef(false), 1800) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copiedRef ? '#22c55e' : '#94a3b8', display: 'flex' }}>
                    {copiedRef ? <Check size={15} /> : <Copy size={15} />}
                  </motion.button>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min((profile.referral_count || 0) / 3 * 100, 100)}%` }} transition={{ duration: 1 }} style={{ height: '100%', background: 'linear-gradient(90deg, #7c3aed, #a78bfa)', borderRadius: '100px' }} />
                </div>
                <p style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.4rem' }}>{profile.referral_count || 0}/3 friends referred</p>
              </div>
            )}

            {/* Sign Out */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={signOut}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.875rem', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.18)', borderRadius: '14px', color: '#f87171', fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}
            >
              <LogOut size={16} /> Sign Out
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  )
}
