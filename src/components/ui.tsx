// ─── Shared UI Components — LinkSync Brand Kit ────────────────────────────────
// Purple #8133C2 · Yellow-lime #BFCF1A · Lavender #EDE6FB · Cream #FAF9F4

import { type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── ToggleSwitch (iOS-style, purple → lime thumb) ─────────────────────────────
export function ToggleSwitch({
  checked,
  onChange,
  id,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  id?: string
}) {
  return (
    <label className="toggle-switch" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle-slider" />
    </label>
  )
}

// ── PlanBadge ─────────────────────────────────────────────────────────────────
export function PlanBadge({
  plan,
  isAdmin,
  isTrial,
}: {
  plan?: string
  isAdmin?: boolean
  isTrial?: boolean
}) {
  if (isAdmin) return <span className="plan-badge admin">Admin</span>
  if (isTrial) return <span className="plan-badge trial">Trial</span>
  if (plan === 'pro') return <span className="plan-badge pro">Pro ✦</span>
  if (plan === 'basic') return <span className="plan-badge basic">Basic</span>
  return <span className="plan-badge free">Free</span>
}

// ── StatsCard ─────────────────────────────────────────────────────────────────
export function StatsCard({
  label,
  value,
  icon,
  accent = false,
  locked = false,
  trend,
}: {
  label: string
  value: string | number | ReactNode
  icon: ReactNode
  accent?: boolean
  locked?: boolean
  trend?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: accent
          ? 'linear-gradient(135deg, rgba(191,207,26,0.15), rgba(191,207,26,0.05))'
          : 'rgba(129,51,194,0.08)',
        border: accent
          ? '1px solid rgba(191,207,26,0.3)'
          : '1px solid rgba(129,51,194,0.18)',
        borderRadius: '18px',
        padding: '1.1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle corner glow */}
      <div
        style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '60px',
          height: '60px',
          background: accent
            ? 'radial-gradient(circle, rgba(191,207,26,0.2), transparent 70%)'
            : 'radial-gradient(circle, rgba(129,51,194,0.2), transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 600,
            color: '#7c5a9e',
            textTransform: 'uppercase',
            letterSpacing: '0.07em',
          }}
        >
          {label}
        </span>
        <span style={{ color: accent ? '#BFCF1A' : '#8133C2', opacity: 0.8 }}>{icon}</span>
      </div>

      <div
        style={{
          fontSize: '1.75rem',
          fontWeight: 800,
          color: locked ? 'transparent' : accent ? '#BFCF1A' : '#f5f0ff',
          fontFamily: "'Poppins', sans-serif",
          filter: locked ? 'blur(8px)' : 'none',
          userSelect: locked ? 'none' : 'auto',
          lineHeight: 1,
        }}
      >
        {value}
      </div>

      {trend && (
        <span style={{ fontSize: '0.7rem', color: '#BFCF1A', fontWeight: 600 }}>{trend}</span>
      )}
      {locked && (
        <span
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            left: '0.875rem',
            fontSize: '0.65rem',
            color: '#BFCF1A',
            fontWeight: 700,
          }}
        >
          🔒 Pro
        </span>
      )}
    </motion.div>
  )
}

// ── EmptyState ────────────────────────────────────────────────────────────────
export function EmptyState({
  emoji,
  title,
  subtitle,
  action,
}: {
  emoji: string
  title: string
  subtitle: string
  action?: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        textAlign: 'center',
        padding: '3.5rem 2rem',
        background: 'rgba(129,51,194,0.05)',
        border: '1px dashed rgba(129,51,194,0.25)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
      }}
    >
      <div style={{ fontSize: '3rem', lineHeight: 1 }}>{emoji}</div>
      <h3
        style={{
          fontWeight: 700,
          color: '#f5f0ff',
          fontSize: '1rem',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: '#7c5a9e',
          fontSize: '0.83rem',
          lineHeight: 1.6,
          maxWidth: '280px',
        }}
      >
        {subtitle}
      </p>
      {action && <div style={{ marginTop: '0.75rem' }}>{action}</div>}
    </motion.div>
  )
}

// ── SectionHeader ─────────────────────────────────────────────────────────────
export function SectionHeader({
  title,
  subtitle,
  right,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1.25rem',
        gap: '1rem',
      }}
    >
      <div>
        <h1
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: '1.25rem',
            color: '#f5f0ff',
            marginBottom: subtitle ? '0.15rem' : 0,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: '#7c5a9e', fontSize: '0.8rem' }}>{subtitle}</p>
        )}
      </div>
      {right && <div style={{ flexShrink: 0 }}>{right}</div>}
    </div>
  )
}

// ── GradientButton ────────────────────────────────────────────────────────────
export function GradientButton({
  children,
  onClick,
  disabled = false,
  size = 'md',
  variant = 'purple',
  id,
  type = 'button',
}: {
  children: ReactNode
  onClick?: () => void
  disabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  variant?: 'purple' | 'lime' | 'whatsapp'
  id?: string
  type?: 'button' | 'submit'
}) {
  const styles = {
    purple: {
      bg: 'linear-gradient(135deg, #8133C2, #6b27a8)',
      color: '#ffffff',
      shadow: '0 6px 20px rgba(129,51,194,0.4)',
    },
    lime: {
      bg: 'linear-gradient(135deg, #BFCF1A, #a8b615)',
      color: '#1a0533',
      shadow: '0 6px 20px rgba(191,207,26,0.3)',
    },
    whatsapp: {
      bg: 'linear-gradient(135deg, #25d366, #128c7e)',
      color: '#ffffff',
      shadow: '0 6px 20px rgba(37,211,102,0.3)',
    },
  }

  const s = styles[variant]
  const padding =
    size === 'sm' ? '0.5rem 1.1rem' : size === 'lg' ? '1rem 2rem' : '0.8rem 1.5rem'
  const fontSize =
    size === 'sm' ? '0.8rem' : size === 'lg' ? '1rem' : '0.875rem'

  return (
    <motion.button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.96 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      style={{
        background: disabled ? 'rgba(129,51,194,0.2)' : s.bg,
        color: disabled ? '#7c5a9e' : s.color,
        border: 'none',
        borderRadius: '12px',
        fontWeight: 700,
        fontSize,
        padding,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : s.shadow,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontFamily: "'Poppins', sans-serif",
        transition: 'background 0.2s',
        opacity: disabled ? 0.6 : 1,
        width: '100%',
      }}
    >
      {children}
    </motion.button>
  )
}

// ── SettingsRow ───────────────────────────────────────────────────────────────
export function SettingsRow({
  label,
  description,
  right,
}: {
  label: string
  description?: string
  right: ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1rem 0',
        borderBottom: '1px solid rgba(129,51,194,0.12)',
        gap: '1.5rem',
      }}
    >
      <div style={{ flex: 1, minWidth: 0 }}>
        <p
          style={{
            fontWeight: 600,
            color: '#e9d5ff',
            fontSize: '0.875rem',
            marginBottom: description ? '0.15rem' : 0,
          }}
        >
          {label}
        </p>
        {description && (
          <p style={{ color: '#7c5a9e', fontSize: '0.75rem', lineHeight: 1.4 }}>
            {description}
          </p>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{right}</div>
    </div>
  )
}

// ── Toast ─────────────────────────────────────────────────────────────────────
export function Toast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          style={{
            position: 'fixed',
            bottom: '6.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(22,11,46,0.97)',
            color: '#f5f0ff',
            padding: '0.875rem 1.5rem',
            borderRadius: '14px',
            fontWeight: 600,
            fontSize: '0.875rem',
            boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
            border: '1px solid rgba(191,207,26,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            zIndex: 9999,
            whiteSpace: 'nowrap',
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
