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
        <rect width="40" height="40" rx="12" fill="#ff4d00" />
        {/* Interconnected link segments with nodes */}
        <path 
          d="M14 26C11.7909 26 10 24.2091 10 22V18C10 15.7909 11.7909 14 14 14H18" 
          stroke="white" strokeWidth="3.5" strokeLinecap="round" 
        />
        <path 
          d="M26 14C28.2091 14 30 15.7909 30 18V22C30 24.2091 28.2091 26 26 26H22" 
          stroke="white" strokeWidth="3.5" strokeLinecap="round" 
        />
        <line x1="16" y1="23" x2="24" y2="17" stroke="white" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="16" cy="23" r="2.5" fill="white" />
        <circle cx="24" cy="17" r="2.5" fill="white" />
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
