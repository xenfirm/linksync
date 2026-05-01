import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight, AlertCircle, CheckCircle2, ChevronLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Logo from '../components/Logo'

export default function AuthPage() {
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState<'signin' | 'signup'>(
    searchParams.get('mode') === 'signup' ? 'signup' : 'signin'
  )
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const { signIn, signUp, user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/dashboard', { replace: true })
  }, [user, navigate])

  const getErrorMessage = (errorMsg: string) => {
    const msg = errorMsg.toLowerCase()
    if (msg.includes('invalid login')) return 'Incorrect email or password. Please try again.'
    if (msg.includes('already registered')) return 'An account with this email already exists.'
    if (msg.includes('password should be at least')) return 'Your password must be at least 6 characters long.'
    if (msg.includes('user not found')) return 'No account found with this email address.'
    if (msg.includes('rate limit')) return 'Too many attempts. Please try again later.'
    return errorMsg
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccessMsg(null)
    setLoading(true)

    try {
      if (mode === 'signup') {
        const { error } = await signUp(email, password)
        if (error) setError(getErrorMessage(error.message))
        else {
          setSuccessMsg('Account created! Check your email to confirm, then sign in.')
          setMode('signin')
        }
      } else if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) setError(getErrorMessage(error.message))
        else navigate('/dashboard', { replace: true })
      }
    } catch (err: any) {
      setError(getErrorMessage(err.message || 'An unexpected error occurred'))
    }
    
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #faf5ff, #f0f9ff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', marginBottom: '2rem' }}>
        <Logo size={34} />
      </Link>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: '420px', background: '#fff', borderRadius: '24px', padding: 'clamp(1.75rem, 5vw, 2.5rem)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.4rem', textAlign: 'center' }}>
          {mode === 'signup' ? 'Create your account' : 'Welcome back'}
        </h1>
        <p style={{ color: '#64748b', textAlign: 'center', fontSize: '0.9rem', marginBottom: '2rem' }}>
          {mode === 'signup' ? 'Start capturing leads from your bio link' : 'Sign in to access your dashboard'}
        </p>

        {/* Toggle */}
        <div style={{ display: 'flex', background: '#f8fafc', borderRadius: '12px', padding: '4px', marginBottom: '1.75rem', border: '1px solid #e2e8f0' }}>
          {(['signin', 'signup'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setError(null); setSuccessMsg(null); }}
              style={{
                flex: 1, padding: '0.55rem', borderRadius: '10px', border: 'none', cursor: 'pointer',
                fontSize: '0.875rem', fontWeight: 600, transition: 'all 0.2s',
                background: mode === m ? '#6d28d9' : 'transparent',
                color: mode === m ? 'white' : '#64748b',
                boxShadow: mode === m ? '0 2px 8px rgba(109,40,217,0.25)' : 'none',
              }}
            >
              {m === 'signin' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        {/* Alerts */}
        {error && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#e11d48', fontSize: '0.875rem' }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />{error}
          </div>
        )}
        {successMsg && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#16a34a', fontSize: '0.875rem' }}>
            <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '1px' }} />{successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Email */}
          <div>
            <label htmlFor="auth-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                id="auth-email" type="email" className="input-dark"
                placeholder="you@example.com" value={email}
                onChange={e => setEmail(e.target.value)} required
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <label htmlFor="auth-password" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151' }}>
                Password
              </label>
              {mode === 'signin' && (
                <Link 
                  to="/forgot-password"
                  style={{ color: '#6d28d9', fontSize: '0.75rem', fontWeight: 600, textDecoration: 'none' }}
                >
                  Forgot Password?
                </Link>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                id="auth-password" type={showPassword ? 'text' : 'password'} className="input-dark"
                placeholder="Minimum 6 characters" value={password}
                onChange={e => setPassword(e.target.value)} required minLength={6}
                style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.875rem', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8', padding: 0 }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            id="btn-auth-submit" type="submit" disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', fontSize: '0.95rem', justifyContent: 'center', marginTop: '0.25rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Please wait…' : (
              <>{mode === 'signup' ? 'Create Account' : 'Sign In'} <ArrowRight size={16} /></>
            )}
          </button>
        </form>
      </div>

      <p style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.8rem', marginTop: '1.5rem' }}>
        By continuing, you agree to our <Link to="/terms" style={{ color: '#6d28d9', textDecoration: 'none' }}>Terms</Link> and{' '}
        <Link to="/privacy" style={{ color: '#6d28d9', textDecoration: 'none' }}>Privacy Policy</Link>
      </p>
    </div>
  )
}
