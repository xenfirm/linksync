interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
}

export default function Logo({ size = 32, showText = true, className = '' }: LogoProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }} className={className}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer Ring Left (Blue) */}
        <path
          d="M45 25C31.1929 25 20 36.1929 20 50C20 63.8071 31.1929 75 45 75C51.6848 75 57.7477 72.3739 62.2474 68.0935"
          stroke="#0ea5e9"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Outer Ring Right (Orange) */}
        <path
          d="M55 75C68.8071 75 80 63.8071 80 50C80 36.1929 68.8071 25 55 25C48.3152 25 42.2523 27.6261 37.7526 31.9065"
          stroke="#f97316"
          strokeWidth="10"
          strokeLinecap="round"
        />
        {/* Connector nodes */}
        <circle cx="35" cy="50" r="8" fill="#0ea5e9" />
        <circle cx="65" cy="50" r="8" fill="#f97316" />
        <path d="M35 50H65" stroke="url(#logo-grad)" strokeWidth="6" strokeLinecap="round" />
        <defs>
          <linearGradient id="logo-grad" x1="35" y1="50" x2="65" y2="50" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#f97316" />
          </linearGradient>
        </defs>
      </svg>
      {showText && (
        <span
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: `${size * 0.6}px`,
            color: '#f8fafc',
            letterSpacing: '-0.02em',
          }}
        >
          Link<span style={{ color: '#f97316' }}>Sync</span>
        </span>
      )}
    </div>
  )
}
