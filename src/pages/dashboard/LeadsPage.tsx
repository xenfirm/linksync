import { useState } from 'react'
import { Copy, Check, Users, Loader2, Phone, Calendar, MessageCircle, AlertCircle } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { useLeads } from '../../hooks/useLeads'
import { usePayments } from '../../hooks/usePayments'

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      title="Copy phone number"
      style={{
        background: copied ? '#dcfce7' : '#f8fafc',
        border: `1px solid ${copied ? '#bbf7d0' : '#e2e8f0'}`,
        borderRadius: '7px',
        padding: '0.3rem 0.5rem',
        cursor: 'pointer',
        color: copied ? '#16a34a' : '#64748b',
        display: 'flex',
        alignItems: 'center',
        gap: '0.3rem',
        fontSize: '0.75rem',
        fontWeight: 500,
        transition: 'all 0.2s',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  )
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

export default function LeadsPage() {
  const { profile, isPro } = useProfile()
  const { leads, loading } = useLeads(profile?.id, isPro)
  const { handleUpgrade, loading: paymentLoading, error: paymentError } = usePayments()

  if (!profile) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: '#ede9fe',
          border: '1px solid #ddd6fe',
          borderRadius: '14px',
          padding: '1.5rem',
          color: '#6d28d9',
          fontSize: '0.9rem',
          fontWeight: 500,
        }}
      >
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        Please create your profile first to start collecting leads.
      </div>
    )
  }

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '1.6rem',
            color: '#0f172a',
            marginBottom: '0.35rem',
          }}
        >
          Leads
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          All leads collected from your bio page, sorted by newest first.
        </p>
      </div>

      {!isPro ? (
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '4rem 2rem', textAlign: 'center', maxWidth: '500px', margin: '0 auto' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: '#6d28d9' }}>
            <Users size={32} />
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.5rem', color: '#0f172a', marginBottom: '0.5rem' }}>
            Lead Capture is a Pro Feature
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
            Upgrade to Pro to add a lead capture form to your bio page, collect phone numbers, and manage your leads here.
          </p>
          <button 
            onClick={() => handleUpgrade(profile.user_id, profile.name, 'pro')}
            disabled={paymentLoading}
            className="btn-primary" 
            style={{ padding: '0.8rem 2rem', opacity: paymentLoading ? 0.7 : 1 }}
          >
            {paymentLoading ? 'Opening Checkout...' : 'Upgrade to Pro'}
          </button>
          {paymentError && <p style={{ color: '#e11d48', fontSize: '0.85rem', marginTop: '1rem' }}>{paymentError}</p>}
        </div>
      ) : (
        <>
          {/* Stats Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            <Users size={14} /> Total Leads
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2rem', color: '#0f172a' }}>
            {leads.length}
          </div>
        </div>

        <div
          style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            <Phone size={14} /> From Form
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2rem', color: '#0f172a' }}>
            {leads.filter(l => l.source === 'form').length}
          </div>
        </div>

        <div
          style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.25rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#64748b', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            <MessageCircle size={14} /> WhatsApp Clicks
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2rem', color: '#0f172a' }}>
            {leads.filter(l => l.source === 'whatsapp').length}
          </div>
        </div>
      </div>

      {/* Leads List/Table */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 size={28} style={{ color: '#6d28d9', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : leads.length === 0 ? (
        <div
          style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '4rem', textAlign: 'center' }}
        >
          <Users size={36} style={{ color: '#94a3b8', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>No leads yet</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', maxWidth: '340px', margin: '0 auto' }}>
            Share your bio link to start collecting leads. They'll appear here in real time.
          </p>
          {profile.username && (
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '1.5rem',
                padding: '0.65rem 1.5rem',
                fontSize: '0.875rem',
              }}
            >
              View My Bio Page →
            </a>
          )}
        </div>
      ) : (
        /* Responsive List/Table Container */
        <div
          style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden' }}
        >
          {/* Desktop Table Header */}
          <div
            className="hide-mobile"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr auto auto',
              gap: '1rem',
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid #f1f5f9',
              background: '#f8fafc',
            }}
          >
            {['Name', 'Phone', 'Source', 'Date'].map(h => (
              <div key={h} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {h}
              </div>
            ))}
          </div>

          {/* Table Rows (Desktop) / Cards (Mobile) */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {leads.map((lead, i) => (
              <div
                key={lead.id}
                style={{
                  padding: '1rem 1.25rem',
                  borderBottom: i < leads.length - 1 ? '1px solid #f1f5f9' : 'none',
                  transition: 'background 0.15s',
                }}
              >
                {/* Desktop Layout */}
                <div
                  className="hide-mobile"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.2fr auto auto',
                    gap: '1rem',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {lead.name}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ color: '#374151', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {lead.phone}
                    </span>
                    {lead.phone !== 'N/A' && <CopyButton text={lead.phone} />}
                  </div>
                  <div>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.25rem 0.6rem',
                        borderRadius: '100px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: lead.source === 'whatsapp' ? '#dcfce7' : '#ede9fe',
                        color: lead.source === 'whatsapp' ? '#16a34a' : '#6d28d9',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {lead.source === 'whatsapp' ? (
                        <><MessageCircle size={10} /> WhatsApp</>
                      ) : (
                        <><Phone size={10} /> Form</>
                      )}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#64748b', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                    <Calendar size={12} />
                    {formatDate(lead.created_at)}
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="hide-desktop" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', marginBottom: '0.2rem' }}>{lead.name}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.8rem' }}>
                        <Calendar size={12} /> {formatDate(lead.created_at)}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '0.2rem 0.6rem',
                        borderRadius: '100px',
                        fontSize: '0.65rem',
                        fontWeight: 800,
                        background: lead.source === 'whatsapp' ? '#dcfce7' : '#ede9fe',
                        color: lead.source === 'whatsapp' ? '#16a34a' : '#6d28d9',
                        textTransform: 'uppercase',
                      }}
                    >
                      {lead.source}
                    </span>
                  </div>
                  {lead.phone !== 'N/A' && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f8fafc', padding: '0.6rem 0.8rem', borderRadius: '10px' }}>
                      <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#374151' }}>{lead.phone}</span>
                      <CopyButton text={lead.phone} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      </>
      )}
    </div>
  )
}
