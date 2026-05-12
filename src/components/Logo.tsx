interface LogoProps {
  size?: number
  showText?: boolean
  dark?: boolean
  /** 'default' = purple bg icon | 'white' = white text | 'color' = gradient icon no bg */
  variant?: 'default' | 'white' | 'color'
}

export default function Logo({
  size = 32,
  showText = true,
  dark = false,
  variant = 'default',
}: LogoProps) {
  const textColor = dark || variant === 'white' ? '#ffffff' : '#1a0533'

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
      {/* Chain-link icon matching the brand kit */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Rounded square background */}
        <rect
          width="40"
          height="40"
          rx="11"
          fill={variant === 'color' ? 'none' : 'url(#logoBg)'}
        />

        {/* Gradient defs */}
        <defs>
          <linearGradient id="logoBg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#8133C2" />
            <stop offset="100%" stopColor="#5b1d96" />
          </linearGradient>
          <linearGradient id="link1Grad" x1="8" y1="20" x2="24" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c084fc" />
            <stop offset="100%" stopColor="#BFCF1A" />
          </linearGradient>
          <linearGradient id="link2Grad" x1="16" y1="20" x2="32" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#BFCF1A" />
            <stop offset="100%" stopColor="#8133C2" />
          </linearGradient>
        </defs>

        {/* Left chain link — C shape open to right */}
        <path
          d="M18 13C14.5 13 12 15.5 12 19C12 22.5 14.5 25 18 25L20 25"
          stroke={variant === 'color' ? 'url(#link1Grad)' : 'white'}
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Right chain link — C shape open to left */}
        <path
          d="M22 15L24 15C27.5 15 30 17.5 30 21C30 24.5 27.5 27 24 27"
          stroke={variant === 'color' ? 'url(#link2Grad)' : '#BFCF1A'}
          strokeWidth="3.2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Connecting overlap bar */}
        <line
          x1="18"
          y1="20"
          x2="22"
          y2="20"
          stroke={variant === 'color' ? '#BFCF1A' : 'rgba(255,255,255,0.7)'}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>

      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: '1px' }}>
          <span
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: `${size * 0.52}px`,
              color: dark || variant === 'white' ? '#ffffff' : variant === 'color' ? '#1a0533' : '#f5f0ff',
              letterSpacing: '-0.01em',
              lineHeight: 1.1,
            }}
          >
            Link<span style={{ color: '#BFCF1A' }}>Sync</span>
          </span>
        </div>
      )}
    </div>
  )
}
