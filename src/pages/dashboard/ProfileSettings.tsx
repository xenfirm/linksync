import { useState, useEffect, useRef } from 'react'
import { Camera, Save, Loader2, CheckCircle2, AlertCircle, User, ExternalLink } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../hooks/useAuth'

export default function ProfileSettings() {
  const { user } = useAuth()
  const { profile, loading, updateProfile, createProfile } = useProfile()
  const isNew = !profile

  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)
  const [initialized, setInitialized] = useState(false)

  // Populate form fields when profile loads (only once)
  useEffect(() => {
    if (profile && !initialized) {
      setName(profile.name || '')
      setUsername(profile.username || '')
      setBio(profile.bio || '')
      setWhatsapp(profile.whatsapp_number || '')
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
      profile_image: profileImage,
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

    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 size={28} style={{ color: '#0ea5e9', animation: 'spin 1s linear infinite' }} />
      </div>
    )

  return (
    <div style={{ maxWidth: '640px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '1.6rem',
            color: '#f8fafc',
            marginBottom: '0.35rem',
          }}
        >
          {isNew ? 'Create Your Profile' : 'Profile Settings'}
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
          {isNew
            ? 'Set up your public bio page to start collecting leads.'
            : 'Update your public profile information.'}
        </p>
      </div>

      <form onSubmit={handleSave}>
        {/* Avatar */}
        <div
          className="glass-card"
          style={{ borderRadius: '16px', padding: '1.5rem', marginBottom: '1.25rem' }}
        >
          <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#9b99c4', marginBottom: '1rem' }}>
            Profile Photo
          </label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div style={{ position: 'relative' }}>
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #2a2a45' }}
                />
              ) : (
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
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
                  background: 'rgba(42,42,69,0.8)',
                  border: '1px solid #2a2a45',
                  color: '#f1f0ff',
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
              <p style={{ color: '#9b99c4', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                JPG, PNG or WebP. Max 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div
          className="glass-card"
          style={{ borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          {/* Username */}
          <div>
            <label htmlFor="field-username" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#9b99c4', marginBottom: '0.4rem' }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <span
                style={{
                  position: 'absolute',
                  left: '0.875rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9b99c4',
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
              <p style={{ color: '#94a3b8', fontSize: '0.75rem', marginTop: '0.3rem' }}>
                Your page: <span style={{ color: '#0ea5e9' }}>/{username}</span>
                <a
                  href={`/${username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#0ea5e9', marginLeft: '0.3rem' }}
                >
                  <ExternalLink size={12} style={{ display: 'inline', verticalAlign: 'middle' }} />
                </a>
              </p>
            )}
          </div>

          {/* Name */}
          <div>
            <label htmlFor="field-name" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#9b99c4', marginBottom: '0.4rem' }}>
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
            <label htmlFor="field-bio" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#9b99c4', marginBottom: '0.4rem' }}>
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
            <label htmlFor="field-whatsapp" style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#9b99c4', marginBottom: '0.4rem' }}>
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
            <p style={{ color: '#9b99c4', fontSize: '0.75rem', marginTop: '0.3rem' }}>
              Include country code (e.g. +1 for US, +91 for India)
            </p>
          </div>
        </div>

        {/* Alerts */}
        {error && (
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              marginTop: '1rem',
              color: '#f87171',
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
              gap: '0.5rem',
              alignItems: 'center',
              background: 'rgba(34,197,94,0.1)',
              border: '1px solid rgba(34,197,94,0.3)',
              borderRadius: '10px',
              padding: '0.75rem 1rem',
              marginTop: '1rem',
              color: '#4ade80',
              fontSize: '0.875rem',
            }}
          >
            <CheckCircle2 size={16} />
            Profile saved successfully!
          </div>
        )}

        <button
          id="btn-save-profile"
          type="submit"
          disabled={saving}
          className="btn-gradient"
          style={{
            marginTop: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.8rem 2rem',
            borderRadius: '10px',
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
