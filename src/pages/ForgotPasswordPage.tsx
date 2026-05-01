import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, AlertCircle, CheckCircle2, ChevronLeft } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import Logo from '../components/Logo'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const { resetPassword } = useAuth()

  const getErrorMessage = (errorMsg: string) => {
    const msg = errorMsg.toLowerCase()
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
      const { error } = await resetPassword(email)
      if (error) setError(getErrorMessage(error.message))
      else setSuccessMsg('Password reset link sent! Check your inbox.')
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
        <Link 
          to="/auth"
          style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: 'none', border: 'none', color: '#6d28d9', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', marginBottom: '1rem', padding: 0, textDecoration: 'none' }}
        >
          <ChevronLeft size={16} /> Back to Sign In
        </Link>

        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.4rem', textAlign: 'center' }}>
          Reset Password
        </h1>
        <p style={{ color: '#64748b', textAlign: 'center', fontSize: '0.9rem', marginBottom: '2rem' }}>
          Enter your email to receive a reset link
        </p>

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
            <label htmlFor="reset-email" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                id="reset-email" type="email" className="input-dark"
                placeholder="you@example.com" value={email}
                onChange={e => setEmail(e.target.value)} required
                style={{ paddingLeft: '2.5rem' }}
              />
            </div>
          </div>

          <button
            id="btn-reset-submit" type="submit" disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '0.9rem', borderRadius: '12px', fontSize: '0.95rem', justifyContent: 'center', marginTop: '0.25rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
          >
            {loading ? 'Please wait…' : (
              <>{successMsg ? 'Send Again' : 'Send Reset Link'} <ArrowRight size={16} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
