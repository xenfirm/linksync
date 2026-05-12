import { useState, useCallback } from 'react'
import { Check, Lock, Sparkles, Palette, Zap } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { themeList, freeThemes, getTheme, type ThemeId } from '../../themes'

// ── Toast ────────────────────────────────────────────────────────────────────
function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        left: '50%',
        transform: visible ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(120%)',
        background: 'linear-gradient(135deg, #0f172a, #1e293b)',
        color: '#f1f5f9',
        padding: '0.875rem 1.5rem',
        borderRadius: '14px',
        fontWeight: 700,
        fontSize: '0.875rem',
        boxShadow: '0 16px 40px rgba(0,0,0,0.25)',
        border: '1px solid rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        zIndex: 9999,
        transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontSize: '1rem' }}>🚀</span>
      {message}
    </div>
  )
}

// ── Mini Preview ──────────────────────────────────────────────────────────────
function ThemePreview({ themeId, profileName }: { themeId: ThemeId; profileName?: string }) {
  const t = getTheme(themeId)

  return (
    <div
      style={{
        width: '100%',
        aspectRatio: '9/14',
        borderRadius: '12px',
        overflow: 'hidden',
        background: typeof t.preview.bg === 'string' ? t.preview.bg : t.preview.bg,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem 0.75rem',
        gap: '0.5rem',
        position: 'relative',
      }}
    >
      {/* Avatar */}
      <div
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: t.card.avatarBackground,
          border: `2px solid ${t.preview.accent}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontWeight: 900,
          fontSize: '0.875rem',
          flexShrink: 0,
        }}
      >
        {(profileName || 'U').charAt(0).toUpperCase()}
      </div>

      {/* Name bar */}
      <div
        style={{
          width: '60%',
          height: '6px',
          borderRadius: '3px',
          background: t.preview.accent,
          opacity: 0.9,
        }}
      />
      <div
        style={{
          width: '45%',
          height: '4px',
          borderRadius: '3px',
          background: t.preview.accent,
          opacity: 0.35,
        }}
      />

      {/* Link buttons */}
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: '100%',
            height: '22px',
            borderRadius: '6px',
            background: t.preview.buttonBg,
            border: `1px solid ${t.preview.accent}22`,
            display: 'flex',
            alignItems: 'center',
            paddingLeft: '8px',
          }}
        >
          <div
            style={{
              width: `${50 + i * 8}%`,
              height: '4px',
              borderRadius: '2px',
              background: t.preview.buttonText,
              opacity: 0.5,
            }}
          />
        </div>
      ))}

      {/* WA button */}
      <div
        style={{
          width: '100%',
          height: '22px',
          borderRadius: '6px',
          background: '#22c55e',
          marginTop: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '55%',
            height: '4px',
            borderRadius: '2px',
            background: 'rgba(255,255,255,0.85)',
          }}
        />
      </div>
    </div>
  )
}

// ── Theme Card ────────────────────────────────────────────────────────────────
interface ThemeCardProps {
  theme: ReturnType<typeof getTheme>
  isSelected: boolean
  isPreviewActive: boolean
  canUse: boolean
  onPreview: () => void
  onApply: () => void
  profileName?: string
}

function ThemeCard({
  theme,
  isSelected,
  isPreviewActive,
  canUse,
  onPreview,
  onApply,
  profileName,
}: ThemeCardProps) {
  return (
    <div
      onClick={canUse ? onPreview : undefined}
      style={{
        background: '#ffffff',
        border: isPreviewActive
          ? '2px solid #8133C2'
          : isSelected
          ? '2px solid #22c55e'
          : '2px solid #e2e8f0',
        borderRadius: '20px',
        padding: '1rem',
        cursor: canUse ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        position: 'relative',
        boxShadow: isPreviewActive
          ? '0 0 0 4px rgba(129,51,194,0.1), 0 8px 24px rgba(0,0,0,0.06)'
          : isSelected
          ? '0 0 0 4px rgba(34,197,94,0.1), 0 8px 24px rgba(0,0,0,0.06)'
          : '0 2px 8px rgba(0,0,0,0.04)',
        opacity: !canUse ? 0.75 : 1,
      }}
    >
      {/* Badges */}
      <div style={{ position: 'absolute', top: '0.875rem', right: '0.875rem', display: 'flex', gap: '0.4rem', zIndex: 2 }}>
        {isSelected && (
          <span
            style={{
              background: '#22c55e',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            <Check size={10} /> Active
          </span>
        )}
        {theme.isPremium && (
          <span
            style={{
              background: 'linear-gradient(135deg, #BFCF1A, #d97706)',
              color: '#fff',
              fontSize: '11px',
              fontWeight: 800,
              padding: '2px 8px',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              gap: '3px',
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
            }}
          >
            <Sparkles size={10} /> Pro
          </span>
        )}
      </div>

      {/* Preview area */}
      <div style={{ position: 'relative' }}>
        <ThemePreview themeId={theme.id} profileName={profileName} />

        {/* Lock overlay */}
        {!canUse && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '12px',
              background: 'rgba(15,23,42,0.65)',
              backdropFilter: 'blur(4px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
            }}
          >
            <Lock size={20} color="#BFCF1A" />
            <span style={{ color: '#f1f5f9', fontWeight: 700, fontSize: '0.75rem' }}>Pro Only</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ marginTop: '0.875rem' }}>
        <h3
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '0.925rem',
            color: '#0f172a',
            marginBottom: '0.2rem',
          }}
        >
          {theme.name}
        </h3>
        <p style={{ color: '#64748b', fontSize: '0.78rem', lineHeight: 1.5 }}>{theme.description}</p>
      </div>

      {/* Action */}
      <div style={{ marginTop: '0.875rem' }}>
        {canUse ? (
          isSelected ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                padding: '0.6rem',
                borderRadius: '10px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#16a34a',
                fontWeight: 700,
                fontSize: '0.825rem',
              }}
            >
              <Check size={14} /> Applied
            </div>
          ) : (
            <button
              onClick={(e) => { e.stopPropagation(); onApply() }}
              style={{
                width: '100%',
                padding: '0.6rem',
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                background: isPreviewActive ? '#8133C2' : '#f8fafc',
                color: isPreviewActive ? '#ffffff' : '#374151',
                fontWeight: 700,
                fontSize: '0.825rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {isPreviewActive ? 'Apply Template' : 'Preview'}
            </button>
          )
        ) : (
          <a
            href="/dashboard"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '0.6rem',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #BFCF1A, #d97706)',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.825rem',
              textDecoration: 'none',
            }}
          >
            Upgrade to Pro
          </a>
        )}
      </div>
    </div>
  )
}

// ── Live Preview Panel ────────────────────────────────────────────────────────
function LivePreviewPanel({
  themeId,
  profileName,
  profileBio,
}: {
  themeId: ThemeId
  profileName?: string
  profileBio?: string
}) {
  const t = getTheme(themeId)

  const mockLinks = ['My Website', 'Book a Call', 'My Portfolio']

  const previewStyle: React.CSSProperties = {
    background: typeof t.page.background === 'string' ? t.page.background : '',
    borderRadius: '20px',
    padding: '1.5rem 1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.75rem',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '420px',
    fontFamily: t.page.fontFamily,
  }

  return (
    <div style={previewStyle}>
      {/* Glow */}
      {t.glow && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '300px',
            height: '200px',
            background: `radial-gradient(ellipse, ${t.glow.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />
      )}

      {/* Profile card */}
      <div
        style={{
          width: '100%',
          maxWidth: '260px',
          background: t.card.background,
          border: t.card.border,
          borderRadius: t.card.borderRadius,
          padding: '1.25rem 1rem',
          textAlign: 'center',
          boxShadow: t.card.boxShadow,
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: t.card.avatarBackground,
            border: t.card.avatarBorder,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem',
            color: '#fff',
            fontWeight: 900,
            fontSize: '1.25rem',
          }}
        >
          {(profileName || 'You').charAt(0).toUpperCase()}
        </div>
        <p style={{ fontWeight: 800, fontSize: '0.95rem', color: t.card.nameColor, marginBottom: '0.2rem' }}>
          {profileName || 'Your Name'}
        </p>
        <p style={{ fontSize: '0.75rem', color: t.card.usernameColor, fontWeight: 600, marginBottom: '0.4rem' }}>
          @username
        </p>
        {profileBio && (
          <p style={{ fontSize: '0.72rem', color: t.card.bioColor, lineHeight: 1.5 }}>{profileBio}</p>
        )}
      </div>

      {/* Mock links */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.45rem',
          width: '100%',
          maxWidth: '260px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {mockLinks.map((label) => (
          <div
            key={label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: t.button.padding,
              borderRadius: t.button.borderRadius,
              background: t.button.background,
              border: t.button.border,
              color: t.button.color,
              fontWeight: t.button.fontWeight as React.CSSProperties['fontWeight'],
              fontSize: '0.78rem',
              boxShadow: t.button.boxShadow,
              boxSizing: 'border-box',
            }}
          >
            <span>{label}</span>
            <span style={{ opacity: 0.5, fontSize: '0.65rem' }}>↗</span>
          </div>
        ))}
      </div>

      {/* WA button */}
      <div
        style={{
          width: '100%',
          maxWidth: '260px',
          padding: '0.7rem 1rem',
          borderRadius: t.whatsapp.borderRadius,
          background: t.whatsapp.background,
          color: t.whatsapp.color,
          fontWeight: 700,
          fontSize: '0.8rem',
          textAlign: 'center',
          boxShadow: t.whatsapp.boxShadow,
          position: 'relative',
          zIndex: 1,
        }}
      >
        💬 Chat on WhatsApp
      </div>

      <p
        style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.875rem',
          fontSize: '0.65rem',
          color: t.card.bioColor,
          opacity: 0.5,
        }}
      >
        Live Preview
      </p>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AppearancePage() {
  const { profile, updateProfile, isPro } = useProfile()

  const savedTheme = (profile?.theme || 'minimal-clean') as ThemeId
  const [activePreview, setActivePreview] = useState<ThemeId>(savedTheme)
  const [saving, setSaving] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [toastMsg, setToastMsg] = useState('')

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 3000)
  }

  const handleApply = useCallback(
    async (themeId: ThemeId) => {
      if (themeId === savedTheme) return
      setSaving(true)
      const { error } = await updateProfile({ theme: themeId })
      setSaving(false)
      if (!error) {
        showToast('Template applied successfully! 🚀')
        setActivePreview(themeId)
      } else {
        showToast('Failed to apply template. Please try again.')
      }
    },
    [savedTheme, updateProfile]
  )

  return (
    <div style={{ maxWidth: '900px' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #8133C2, #4f46e5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Palette size={18} color="white" />
          </div>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '1.4rem',
              color: '#0f172a',
            }}
          >
            Appearance
          </h1>
        </div>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginLeft: '0.25rem' }}>
          Choose a template for your public bio page. Changes apply instantly.
        </p>
      </div>

      {/* Pro banner */}
      {!isPro && (
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(129,51,194,0.05), #fef3c7)',
            border: '1px solid rgba(129,51,194,0.15)',
            borderRadius: '16px',
            padding: '1rem 1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem',
            marginBottom: '1.75rem',
          }}
        >
          <Zap size={20} color="#BFCF1A" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontWeight: 700, color: '#8133C2', fontSize: '0.875rem', marginBottom: '0.15rem' }}>
              Unlock Premium Templates
            </p>
            <p style={{ color: '#7c5a9e', fontSize: '0.8rem' }}>
              Upgrade to Pro for Dark Neon and Business Conversion templates.
            </p>
          </div>
          <a
            href="/dashboard"
            style={{
              flexShrink: 0,
              background: 'linear-gradient(135deg, #BFCF1A, #d97706)',
              color: '#fff',
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.8rem',
              whiteSpace: 'nowrap',
            }}
          >
            Upgrade →
          </a>
        </div>
      )}

      {/* Two-column layout: cards + live preview */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) 300px',
          gap: '1.5rem',
          alignItems: 'start',
        }}
        className="appearance-grid"
      >
        {/* ── Template Grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}
          className="theme-cards-grid"
        >
          {themeList.map((theme) => {
            const canUse = freeThemes.includes(theme.id) || isPro
            return (
              <ThemeCard
                key={theme.id}
                theme={theme}
                isSelected={savedTheme === theme.id}
                isPreviewActive={activePreview === theme.id && activePreview !== savedTheme}
                canUse={canUse}
                profileName={profile?.name}
                onPreview={() => setActivePreview(theme.id)}
                onApply={() => handleApply(theme.id)}
              />
            )
          })}
        </div>

        {/* ── Live Preview Panel ── */}
        <div style={{ position: 'sticky', top: '1.5rem' }}>
          <p
            style={{
              fontWeight: 700,
              color: '#0f172a',
              fontSize: '0.875rem',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#22c55e',
                animation: 'pulse 2s infinite',
              }}
            />
            Live Preview
          </p>

          <LivePreviewPanel
            themeId={activePreview}
            profileName={profile?.name}
            profileBio={profile?.bio}
          />

          {activePreview !== savedTheme && (
            <button
              onClick={() => handleApply(activePreview)}
              disabled={saving}
              style={{
                marginTop: '0.875rem',
                width: '100%',
                padding: '0.875rem',
                borderRadius: '14px',
                border: 'none',
                background: saving
                  ? '#e2e8f0'
                  : 'linear-gradient(135deg, #8133C2, #ff6a26)',
                color: saving ? '#94a3b8' : '#fff',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: saving ? 'none' : '0 8px 20px rgba(129,51,194,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {saving ? (
                <>
                  <span className="spin-icon">◌</span> Applying…
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Apply Template
                </>
              )}
            </button>
          )}

          {activePreview === savedTheme && (
            <div
              style={{
                marginTop: '0.875rem',
                padding: '0.75rem',
                borderRadius: '12px',
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                color: '#15803d',
                fontWeight: 700,
                fontSize: '0.825rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
              }}
            >
              <Check size={15} /> Currently Applied
            </div>
          )}
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .appearance-grid {
            grid-template-columns: 1fr !important;
          }
          .theme-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .theme-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-icon {
          display: inline-block;
          animation: spin 1s linear infinite;
        }
      `}</style>

      <Toast message={toastMsg} visible={toastVisible} />
    </div>
  )
}
