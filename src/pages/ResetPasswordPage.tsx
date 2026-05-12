import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Lock, Eye, EyeOff, CheckCircle2, AlertCircle, Save, Loader2 } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Logo from '../components/Logo'
import { supabase } from '../lib/supabase'

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  // Session check states
  const [sessionChecking, setSessionChecking] = useState(true)
  const [hasValidSession, setHasValidSession] = useState(false)

  const { updatePassword } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    let mounted = true;

    // Check if session exists immediately (e.g. hash parsed by supabase client)
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (mounted) {
        if (session) {
          setHasValidSession(true)
          setError(null)
        } else {
          setHasValidSession(false)
          setError("Invalid or expired reset link. Please request a new one.")
        }
        setSessionChecking(false)
      }
    }

    checkSession()

    // Listen specifically for the PASSWORD_RECOVERY event
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        if (mounted) {
          setHasValidSession(true)
          setSessionChecking(false)
          setError(null)
        }
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!hasValidSession) return;
    setError(null)
    setLoading(true)

    try {
      const { error } = await updatePassword(password)
      if (error) setError(error.message)
      else {
        setSuccess(true)
        setTimeout(() => navigate('/auth', { replace: true }), 3000)
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred')
    }
    
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #fff7f2, #f0f9ff)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.25rem' }}>
      {/* Logo */}
      <Link to="/" style={{ textDecoration: 'none', marginBottom: '2rem' }}>
        <Logo size={34} />
      </Link>

      {/* Card */}
      <div style={{ width: '100%', maxWidth: '420px', background: '#fff', borderRadius: '24px', padding: 'clamp(1.75rem, 5vw, 2.5rem)', boxShadow: '0 8px 40px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.4rem', textAlign: 'center' }}>
          Update Password
        </h1>
        <p style={{ color: '#64748b', textAlign: 'center', fontSize: '0.9rem', marginBottom: '2rem' }}>
          {sessionChecking ? 'Verifying your reset link...' : 'Enter your new password below to regain access to your account.'}
        </p>

        {/* Alerts */}
        {error && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: '#fff1f2', border: '1px solid #fecdd3', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#e11d48', fontSize: '0.875rem' }}>
            <AlertCircle size={16} style={{ flexShrink: 0, marginTop: '1px' }} />{error}
          </div>
        )}
        {success && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '1.25rem', color: '#16a34a', fontSize: '0.875rem' }}>
            <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '1px' }} />
            Password updated! Redirecting to login...
          </div>
        )}

        {sessionChecking ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
            <Loader2 size={32} style={{ color: '#8133C2', animation: 'spin 1s linear infinite' }} />
          </div>
        ) : !success && hasValidSession ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="new-password" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  id="new-password" type={showPassword ? 'text' : 'password'} className="input-dark"
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
              id="btn-update-password" type="submit" disabled={loading}
              className="btn-primary"
              style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', fontSize: '0.95rem', justifyContent: 'center', marginTop: '0.25rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Updating...' : <><Save size={16} /> Update Password</>}
            </button>
          </form>
        ) : !success && !hasValidSession ? (
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
             <Link to="/auth?mode=reset" className="btn-primary" style={{ display: 'inline-flex', padding: '0.8rem 1.5rem', borderRadius: '12px', fontSize: '0.9rem' }}>
               Request New Link
             </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}
