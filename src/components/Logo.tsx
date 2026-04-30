interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
  dark?: boolean
}

export default function Logo({ size = 32, showText = true, dark = false }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      {/* Star/asterisk icon matching the reference image */}
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#6d28d9" />
        {/* Asterisk / snowflake shape */}
        <g stroke="white" strokeWidth="3" strokeLinecap="round">
          <line x1="20" y1="8" x2="20" y2="32" />
          <line x1="8" y1="20" x2="32" y2="20" />
          <line x1="11.5" y1="11.5" x2="28.5" y2="28.5" />
          <line x1="28.5" y1="11.5" x2="11.5" y2="28.5" />
        </g>
      </svg>
      {showText && (
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: `${size * 0.55}px`,
            color: dark ? '#ffffff' : '#0f172a',
            letterSpacing: '-0.02em',
          }}
        >
          LinkSync
        </span>
      )}
    </div>
  )
}
