// ─── LinkSync Theme System ───────────────────────────────────────────────────
// Each theme defines all visual properties for the public bio page.
// Add new themes here — the system picks them up automatically.

export type ThemeId =
  | 'minimal-clean'
  | 'dark-neon'
  | 'business-conversion'
  | 'creator-gradient'

export interface Theme {
  id: ThemeId
  name: string
  description: string
  isPremium: boolean
  preview: {
    /** CSS color / gradient for the preview card thumbnail */
    bg: string
    accent: string
    buttonBg: string
    buttonText: string
  }

  // ── Page wrapper ──────────────────────────────────────────────────────────
  page: {
    background: string
    fontFamily: string
    color: string
  }

  // ── Profile card ──────────────────────────────────────────────────────────
  card: {
    background: string
    border: string
    borderRadius: string
    padding: string
    boxShadow: string
    nameColor: string
    usernameColor: string
    bioColor: string
    avatarBorder: string
    avatarBackground: string
  }

  // ── Link buttons ──────────────────────────────────────────────────────────
  button: {
    background: string
    border: string
    borderRadius: string
    color: string
    fontWeight: string
    hoverBackground: string
    hoverBorder: string
    hoverColor: string
    hoverTransform: string
    boxShadow: string
    hoverBoxShadow: string
    transition: string
    padding: string
  }

  // ── WhatsApp CTA ──────────────────────────────────────────────────────────
  whatsapp: {
    background: string
    color: string
    borderRadius: string
    boxShadow: string
    hoverBackground: string
  }

  // ── Lead form ─────────────────────────────────────────────────────────────
  leadForm: {
    background: string
    border: string
    borderRadius: string
    boxShadow: string
    titleColor: string
    subtitleColor: string
    inputBackground: string
    inputBorder: string
    inputColor: string
    inputPlaceholderColor: string
    inputBorderRadius: string
    submitBackground: string
    submitColor: string
    submitBorderRadius: string
    submitHoverBackground: string
  }

  // ── Decorative glows / overlays (optional) ────────────────────────────────
  glow?: {
    color: string
    size: string
  }

  // ── Layout overrides ──────────────────────────────────────────────────────
  layout: {
    /** If true, WhatsApp CTA renders prominently at the TOP, above links */
    whatsappAboveFold: boolean
    /** If true, the lead form renders before the link list */
    leadFormFirst: boolean
    maxWidth: string
    gap: string
  }

  // ── Animations ────────────────────────────────────────────────────────────
  animation: {
    /** CSS class name injected into the page for keyframe animations */
    pageEntrance: string
    buttonHover: string
  }
}

// ─── 1. Minimal Clean ────────────────────────────────────────────────────────
const minimalClean: Theme = {
  id: 'minimal-clean',
  name: 'Minimal Clean',
  description: 'White, airy, and professional. Premium simplicity.',
  isPremium: false,
  preview: {
    bg: '#ffffff',
    accent: '#8133C2',
    buttonBg: '#f8fafc',
    buttonText: '#0f172a',
  },
  page: {
    background: 'linear-gradient(160deg, #f5f0ff 0%, #f0f9ff 50%, #f5f0ff 100%)',
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    color: '#0f172a',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '24px',
    padding: '2.5rem 1.75rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
    nameColor: '#0f172a',
    usernameColor: '#8133C2',
    bioColor: '#64748b',
    avatarBorder: '3px solid #f5f0ff',
    avatarBackground: 'linear-gradient(135deg, #8133C2, #BFCF1A)',
  },
  button: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '14px',
    color: '#0f172a',
    fontWeight: '600',
    hoverBackground: '#f5f0ff',
    hoverBorder: '1px solid #8133C2',
    hoverColor: '#8133C2',
    hoverTransform: 'translateY(-1px)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    hoverBoxShadow: '0 6px 20px rgba(129,51,194,0.12)',
    transition: 'all 0.2s ease',
    padding: '0.9rem 1.25rem',
  },
  whatsapp: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(34,197,94,0.35)',
    hoverBackground: 'linear-gradient(135deg, #16a34a, #15803d)',
  },
  leadForm: {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '20px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
    titleColor: '#0f172a',
    subtitleColor: '#64748b',
    inputBackground: '#f8fafc',
    inputBorder: '1px solid #e2e8f0',
    inputColor: '#0f172a',
    inputPlaceholderColor: '#94a3b8',
    inputBorderRadius: '10px',
    submitBackground: 'linear-gradient(135deg, #8133C2, #BFCF1A)',
    submitColor: '#ffffff',
    submitBorderRadius: '12px',
    submitHoverBackground: 'linear-gradient(135deg, #e03d00, #8133C2)',
  },
  glow: { color: 'rgba(129,51,194,0.12)', size: '600px' },
  layout: {
    whatsappAboveFold: false,
    leadFormFirst: false,
    maxWidth: '420px',
    gap: '0.6rem',
  },
  animation: { pageEntrance: 'fadeUp', buttonHover: 'liftSoft' },
}

// ─── 2. Dark Neon ─────────────────────────────────────────────────────────────
const darkNeon: Theme = {
  id: 'dark-neon',
  name: 'Dark Neon',
  description: 'Glassmorphism, purple neon glow, animated hover effects.',
  isPremium: true,
  preview: {
    bg: 'linear-gradient(135deg, #0d0d1a, #13002e)',
    accent: '#a855f7',
    buttonBg: 'rgba(168,85,247,0.15)',
    buttonText: '#e2d9f3',
  },
  page: {
    background: 'linear-gradient(135deg, #0d0d1a 0%, #0a001f 40%, #060010 100%)',
    fontFamily: "'Inter', 'Plus Jakarta Sans', sans-serif",
    color: '#e2d9f3',
  },
  card: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(168,85,247,0.25)',
    borderRadius: '24px',
    padding: '2.5rem 1.75rem',
    boxShadow: '0 0 40px rgba(168,85,247,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
    nameColor: '#f3eeff',
    usernameColor: '#a855f7',
    bioColor: '#9ca3af',
    avatarBorder: '3px solid rgba(168,85,247,0.5)',
    avatarBackground: 'linear-gradient(135deg, #7c3aed, #a855f7)',
  },
  button: {
    background: 'rgba(168,85,247,0.1)',
    border: '1px solid rgba(168,85,247,0.3)',
    borderRadius: '14px',
    color: '#e2d9f3',
    fontWeight: '600',
    hoverBackground: 'rgba(168,85,247,0.2)',
    hoverBorder: '1px solid rgba(168,85,247,0.7)',
    hoverColor: '#f3eeff',
    hoverTransform: 'translateY(-2px) scale(1.01)',
    boxShadow: 'none',
    hoverBoxShadow: '0 0 20px rgba(168,85,247,0.3), 0 8px 24px rgba(0,0,0,0.4)',
    transition: 'all 0.25s ease',
    padding: '0.9rem 1.25rem',
  },
  whatsapp: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 0 20px rgba(34,197,94,0.3), 0 10px 25px rgba(0,0,0,0.4)',
    hoverBackground: 'linear-gradient(135deg, #16a34a, #15803d)',
  },
  leadForm: {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(168,85,247,0.25)',
    borderRadius: '20px',
    boxShadow: '0 0 30px rgba(168,85,247,0.06)',
    titleColor: '#f3eeff',
    subtitleColor: '#9ca3af',
    inputBackground: 'rgba(255,255,255,0.06)',
    inputBorder: '1px solid rgba(168,85,247,0.3)',
    inputColor: '#e2d9f3',
    inputPlaceholderColor: '#6b7280',
    inputBorderRadius: '10px',
    submitBackground: 'linear-gradient(135deg, #7c3aed, #a855f7)',
    submitColor: '#ffffff',
    submitBorderRadius: '12px',
    submitHoverBackground: 'linear-gradient(135deg, #6d28d9, #9333ea)',
  },
  glow: { color: 'rgba(168,85,247,0.15)', size: '500px' },
  layout: {
    whatsappAboveFold: false,
    leadFormFirst: false,
    maxWidth: '420px',
    gap: '0.6rem',
  },
  animation: { pageEntrance: 'fadeUp', buttonHover: 'neonGlow' },
}

// ─── 3. Business Conversion ───────────────────────────────────────────────────
const businessConversion: Theme = {
  id: 'business-conversion',
  name: 'Business Conversion',
  description: 'WhatsApp CTA above fold. Lead form up top. Designed to convert.',
  isPremium: true,
  preview: {
    bg: 'linear-gradient(135deg, #0f172a, #1e293b)',
    accent: '#8133C2',
    buttonBg: '#8133C2',
    buttonText: '#ffffff',
  },
  page: {
    background: 'linear-gradient(160deg, #0f172a 0%, #1e293b 60%, #0f172a 100%)',
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    color: '#f1f5f9',
  },
  card: {
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '20px',
    padding: '2rem 1.5rem',
    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
    nameColor: '#f1f5f9',
    usernameColor: '#BFCF1A',
    bioColor: '#94a3b8',
    avatarBorder: '3px solid rgba(129,51,194,0.4)',
    avatarBackground: 'linear-gradient(135deg, #8133C2, #BFCF1A)',
  },
  button: {
    background: 'rgba(129,51,194,0.1)',
    border: '1px solid rgba(129,51,194,0.4)',
    borderRadius: '12px',
    color: '#f1f5f9',
    fontWeight: '700',
    hoverBackground: '#8133C2',
    hoverBorder: '1px solid #8133C2',
    hoverColor: '#ffffff',
    hoverTransform: 'translateY(-1px)',
    boxShadow: 'none',
    hoverBoxShadow: '0 8px 20px rgba(129,51,194,0.35)',
    transition: 'all 0.2s ease',
    padding: '0.9rem 1.25rem',
  },
  whatsapp: {
    background: 'linear-gradient(135deg, #22c55e, #16a34a)',
    color: '#ffffff',
    borderRadius: '14px',
    boxShadow: '0 8px 24px rgba(34,197,94,0.4)',
    hoverBackground: 'linear-gradient(135deg, #16a34a, #15803d)',
  },
  leadForm: {
    background: 'rgba(129,51,194,0.08)',
    border: '1px solid rgba(129,51,194,0.3)',
    borderRadius: '18px',
    boxShadow: '0 4px 20px rgba(129,51,194,0.1)',
    titleColor: '#f1f5f9',
    subtitleColor: '#94a3b8',
    inputBackground: 'rgba(255,255,255,0.08)',
    inputBorder: '1px solid rgba(255,255,255,0.15)',
    inputColor: '#f1f5f9',
    inputPlaceholderColor: '#64748b',
    inputBorderRadius: '10px',
    submitBackground: 'linear-gradient(135deg, #8133C2, #BFCF1A)',
    submitColor: '#ffffff',
    submitBorderRadius: '10px',
    submitHoverBackground: 'linear-gradient(135deg, #e03d00, #8133C2)',
  },
  glow: { color: 'rgba(129,51,194,0.10)', size: '500px' },
  layout: {
    whatsappAboveFold: true,
    leadFormFirst: true,
    maxWidth: '440px',
    gap: '0.65rem',
  },
  animation: { pageEntrance: 'fadeUp', buttonHover: 'liftSoft' },
}

// ─── 4. Creator Gradient ──────────────────────────────────────────────────────
const creatorGradient: Theme = {
  id: 'creator-gradient',
  name: 'Creator Gradient',
  description: 'Vibrant gradients, colorful cards, expressive creator style.',
  isPremium: false,
  preview: {
    bg: 'linear-gradient(135deg, #f43f5e, #8b5cf6, #06b6d4)',
    accent: '#f43f5e',
    buttonBg: 'rgba(255,255,255,0.85)',
    buttonText: '#1e1b4b',
  },
  page: {
    background: 'linear-gradient(135deg, #fdf2f8 0%, #ede9fe 40%, #e0f2fe 100%)',
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    color: '#1e1b4b',
  },
  card: {
    background: 'rgba(255,255,255,0.85)',
    border: '1px solid rgba(255,255,255,0.6)',
    borderRadius: '28px',
    padding: '2.5rem 1.75rem',
    boxShadow: '0 8px 40px rgba(139,92,246,0.15)',
    nameColor: '#1e1b4b',
    usernameColor: '#8b5cf6',
    bioColor: '#6b7280',
    avatarBorder: '4px solid rgba(255,255,255,0.9)',
    avatarBackground: 'linear-gradient(135deg, #f43f5e, #8b5cf6, #06b6d4)',
  },
  button: {
    background: 'rgba(255,255,255,0.85)',
    border: '1px solid rgba(139,92,246,0.2)',
    borderRadius: '18px',
    color: '#1e1b4b',
    fontWeight: '700',
    hoverBackground: 'linear-gradient(135deg, #f43f5e, #8b5cf6)',
    hoverBorder: '1px solid transparent',
    hoverColor: '#ffffff',
    hoverTransform: 'translateY(-2px) scale(1.01)',
    boxShadow: '0 4px 12px rgba(139,92,246,0.1)',
    hoverBoxShadow: '0 12px 28px rgba(139,92,246,0.3)',
    transition: 'all 0.25s ease',
    padding: '0.9rem 1.25rem',
  },
  whatsapp: {
    background: 'linear-gradient(135deg, #22c55e, #06b6d4)',
    color: '#ffffff',
    borderRadius: '18px',
    boxShadow: '0 8px 24px rgba(6,182,212,0.3)',
    hoverBackground: 'linear-gradient(135deg, #16a34a, #0891b2)',
  },
  leadForm: {
    background: 'rgba(255,255,255,0.85)',
    border: '1px solid rgba(139,92,246,0.2)',
    borderRadius: '24px',
    boxShadow: '0 8px 32px rgba(139,92,246,0.12)',
    titleColor: '#1e1b4b',
    subtitleColor: '#6b7280',
    inputBackground: '#f9f7ff',
    inputBorder: '1px solid rgba(139,92,246,0.25)',
    inputColor: '#1e1b4b',
    inputPlaceholderColor: '#9ca3af',
    inputBorderRadius: '12px',
    submitBackground: 'linear-gradient(135deg, #f43f5e, #8b5cf6)',
    submitColor: '#ffffff',
    submitBorderRadius: '14px',
    submitHoverBackground: 'linear-gradient(135deg, #e11d48, #7c3aed)',
  },
  glow: { color: 'rgba(139,92,246,0.15)', size: '600px' },
  layout: {
    whatsappAboveFold: false,
    leadFormFirst: false,
    maxWidth: '420px',
    gap: '0.65rem',
  },
  animation: { pageEntrance: 'fadeUp', buttonHover: 'liftSoft' },
}

// ─── Theme Registry ───────────────────────────────────────────────────────────
export const themes: Record<ThemeId, Theme> = {
  'minimal-clean': minimalClean,
  'dark-neon': darkNeon,
  'business-conversion': businessConversion,
  'creator-gradient': creatorGradient,
}

export const themeList: Theme[] = Object.values(themes)

export const freeThemes: ThemeId[] = ['minimal-clean', 'creator-gradient']
export const premiumThemes: ThemeId[] = ['dark-neon', 'business-conversion']

export const DEFAULT_THEME: ThemeId = 'minimal-clean'

export function getTheme(id?: string | null): Theme {
  if (id && id in themes) return themes[id as ThemeId]
  return themes[DEFAULT_THEME]
}

export function canUseTheme(themeId: ThemeId, isPro: boolean): boolean {
  return freeThemes.includes(themeId) || isPro
}
