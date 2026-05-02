import { Component, type ErrorInfo, type ReactNode } from 'react'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: ReactNode
}
interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('LinkSync Error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            background: '#0f0f1a',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            gap: '1.5rem',
            fontFamily: 'Inter, sans-serif',
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AlertTriangle size={28} style={{ color: '#f87171' }} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ color: '#f1f0ff', fontWeight: 700, fontSize: '1.3rem', marginBottom: '0.5rem' }}>
              Something went wrong
            </h1>
            <p style={{ color: '#9b99c4', fontSize: '0.875rem', maxWidth: '400px' }}>
              {this.state.error?.message || 'An unexpected error occurred.'}
            </p>
          </div>
          <button
            onClick={() => window.location.reload()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'linear-gradient(135deg, #ff6a26, #ec4899)',
              color: 'white',
              border: 'none',
              padding: '0.7rem 1.5rem',
              borderRadius: '10px',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
            }}
          >
            <RefreshCw size={16} /> Reload Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
