import { useState, useEffect, useRef } from 'react'
import { Camera, Save, Loader2, CheckCircle2, AlertCircle, User, ExternalLink } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'
import { usePayments } from '../../hooks/usePayments'
import CopyButton from '../../components/CopyButton'

export default function ProfileSettings() {
  const { user } = useAuth()
  const { profile, loading, updateProfile, createProfile, isPro } = useProfile()
  const { handleUpgrade, error: paymentError } = usePayments()
  const isNew = !profile

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [whatsappMessage, setWhatsappMessage] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    if (profile && !initialized) {
      setName(profile.name || '')
      setUsername(profile.username || '')
      setBio(profile.bio || '')
      setWhatsapp(profile.whatsapp_number || '')
      setWhatsappMessage(profile.whatsapp_message || '')
      setProfileImage(profile.profile_image || '')
      setInitialized(true)
    }
  }, [profile, initialized])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploading(true)
    setError(null)

    const ext = file.name.split('.').pop()
    const path = `${user.id}/avatar.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(path, file, { upsert: true })

    if (uploadError) {
      setError('Image upload failed: ' + uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from('avatars').getPublicUrl(path)
    setProfileImage(data.publicUrl + '?t=' + Date.now())
    setUploading(false)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccess(false)

    const payload = {
      name: name.trim(),
      username: username.trim().toLowerCase().replace(/[^a-z0-9_-]/g, ''),
      bio: bio.trim(),
      whatsapp_number: whatsapp.trim(),
      whatsapp_message: whatsappMessage.trim(),
      profile_image: profileImage,
      plan: profile?.plan || 'free',
    }
    const { error: err } = isNew
      ? await createProfile(payload)
      : await updateProfile(payload)

    if (err) {
      setError(err)
    } else {
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    }
    setSaving(false)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 size={28} style={{ color: '#6d28d9', animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '1.6rem',
            color: '#0f172a',
            marginBottom: '0.35rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          {isNew ? 'Create Your Profile' : 'Profile Settings'}
          {profile?.is_admin && (
            <span style={{ background: '#0f172a', color: 'white', fontSize: '10px', fontWeight: 800, padding: '4px 10px', borderRadius: '6px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Admin Mode
            </span>
          )}
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          {isNew
            ? 'Set up your public bio page to start collecting leads.'
            : 'Update your public profile information.'}
        </p>
      </div>

      {!isNew && (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Account Plan</h3>
              <p style={{ color: '#64748b', fontSize: '0.8rem' }}>Current Plan: <span style={{ color: '#6d28d9', fontWeight: 700, textTransform: 'capitalize' }}>{profile.plan}</span></p>
            </div>
            {profile.plan === 'free' && (
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <button 
                  type="button"
                  onClick={() => handleUpgrade(profile.user_id, profile.name, 'basic')}
                  style={{ background: '#f8fafc', border: '1px solid #e2e8f0', color: '#0f172a', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Upgrade to Basic (₹99)
                </button>
                <button 
                  type="button"
                  onClick={() => handleUpgrade(profile.user_id, profile.name, 'pro')}
                  style={{ background: '#6d28d9', border: '1px solid #6d28d9', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Upgrade to Pro (₹299)
                </button>
              </div>
            )}
            {profile.plan === 'basic' && (
              <button 
                type="button"
                onClick={() => handleUpgrade(profile.user_id, profile.name, 'pro')}
                style={{ background: '#6d28d9', border: '1px solid #6d28d9', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Upgrade to Pro (₹299)
              </button>
            )}
          </div>
          {paymentError && <p style={{ color: '#e11d48', fontSize: '0.75rem', marginTop: '0.5rem' }}>{paymentError}</p>}
        </div>
      )}
      <form onSubmit={handleSave}>
        {/* Avatar */}
        <div
          style={{ 
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.25rem' 
          }}
        >
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '1rem' }}>
            Profile Photo
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #f1f5f9' }}
                />
              ) : (
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6d28d9, #7c3aed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <User size={28} color="white" />
                </div>
              )}
            </div>
            <div>
              <input
                type="file"
                ref={fileRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  color: '#0f172a',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: uploading ? 'not-allowed' : 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {uploading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Camera size={14} />}
                {uploading ? 'Uploading...' : 'Change Photo'}
              </button>
              <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                JPG, PNG or WebP. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div
          style={{ 
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem' 
          }}
        >
          {/* Username */}
          <div>
            <label htmlFor="field-username" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#94a3b8',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                }}
              >
                @
              </span>
              <input
                id="field-username"
                type="text"
                className="input-dark"
                placeholder="yourusername"
                value={username}
                onChange={e => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, ''))}
                required
                style={{ paddingLeft: '1.75rem' }}
              />
            </div>
            {username && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.4rem' }}>
                <p style={{ color: '#64748b', fontSize: '0.75rem' }}>
                  Your page: <span style={{ color: '#6d28d9' }}>/{username}</span>
                </p>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  <a
                    href={`/${username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      display: 'inline-flex',
                      alignItems: 'center',
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      color: '#0f172a',
                      padding: '0.25rem 0.6rem',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}
                  >
                    <ExternalLink size={11} style={{ marginRight: '0.25rem' }} /> View
                  </a>
                  <CopyButton text={`${window.location.origin}/${username}`} label="Copy Link" />
                </div>
              </div>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="field-name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Display Name
            </label>
            <input
              id="field-name"
              type="text"
              className="input-dark"
              placeholder="Jane Smith"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="field-bio" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Bio
            </label>
            <textarea
              id="field-bio"
              className="input-dark"
              placeholder="Tell visitors what you do..."
              value={bio}
              onChange={e => setBio(e.target.value)}
              rows={3}
              style={{ resize: 'vertical' }}
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label htmlFor="field-whatsapp" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              WhatsApp Number
            </label>
            <input
              id="field-whatsapp"
              type="tel"
              className="input-dark"
              placeholder="+91 9876543210"
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              required
            />
            <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.3rem' }}>
              Include country code (e.g. +1 for US, +91 for India)
            </p>
          </div>

          {/* WhatsApp Message Builder */}
          <div>
            <label htmlFor="field-whatsapp-msg" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Default WhatsApp Message
            </label>
            <textarea
              id="field-whatsapp-msg"
              className="input-dark"
              placeholder="Hi, I saw your profile and I'm interested..."
              value={whatsappMessage}
              onChange={e => setWhatsappMessage(e.target.value)}
              rows={2}
              style={{ resize: 'vertical' }}
            />
            <p style={{ color: '#64748b', fontSize: '0.75rem', marginTop: '0.3rem' }}>
              This message will be pre-filled when visitors click your WhatsApp button.
            </p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              background: '#fff1f2',
              border: '1px solid #fecdd3',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              marginTop: '1rem',
              color: '#e11d48',
              fontSize: '0.875rem',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        {success && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '1rem',
              marginTop: '1rem',
            }}
          >
            <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', color: '#16a34a', fontSize: '0.875rem', fontWeight: 600 }}>
              <CheckCircle2 size={16} />
              Profile saved successfully!
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'white', padding: '0.75rem', borderRadius: '10px', border: '1px solid #dcfce7' }}>
              <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500, flex: 1 }}>{window.location.origin}/{username}</span>
              <CopyButton text={`${window.location.origin}/${username}`} label="Copy Live Link" />
            </div>
          </div>
        )}

        <button
          id="btn-save-profile"
          type="submit"
          disabled={saving}
          className="btn-primary"
          style={{
            marginTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 2rem',
            borderRadius: '12px',
            border: 'none',
            color: 'white',
            fontWeight: 700,
            fontSize: '0.925rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            opacity: saving ? 0.7 : 1,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {saving ? <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} /> : <Save size={16} />}
          {saving ? 'Saving...' : isNew ? 'Create Profile' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
