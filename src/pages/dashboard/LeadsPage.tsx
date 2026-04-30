import { useState } from 'react'
import { Copy, Check, Users, Loader2, Phone, Calendar, MessageCircle, AlertCircle } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { useLeads } from '../../hooks/useLeads'

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
        background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(42,42,69,0.8)',
        border: `1px solid ${copied ? 'rgba(34,197,94,0.4)' : '#2a2a45'}`,
        borderRadius: '7px',
        padding: '0.3rem 0.5rem',
        cursor: 'pointer',
        color: copied ? '#4ade80' : '#9b99c4',
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
  const { profile } = useProfile()
  const { leads, loading } = useLeads(profile?.id)

  if (!profile) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(124,58,237,0.06)',
          border: '1px solid rgba(124,58,237,0.2)',
          borderRadius: '14px',
          padding: '1.5rem',
          color: '#9b99c4',
          fontSize: '0.9rem',
        }}
      >
        <AlertCircle size={18} style={{ color: '#a78bfa', flexShrink: 0 }} />
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
            color: '#f1f0ff',
            marginBottom: '0.35rem',
          }}
        >
          Leads
        </h1>
        <p style={{ color: '#9b99c4', fontSize: '0.9rem' }}>
          All leads collected from your bio page, sorted by newest first.
        </p>
      </div>

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
          className="glass-card"
          style={{ borderRadius: '14px', padding: '1.25rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9b99c4', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            <Users size={14} /> Total Leads
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2rem', color: '#f1f0ff' }}>
            {leads.length}
          </div>
        </div>

        <div
          className="glass-card"
          style={{ borderRadius: '14px', padding: '1.25rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9b99c4', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            <Phone size={14} /> From Form
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2rem', color: '#f1f0ff' }}>
            {leads.filter(l => l.source === 'form').length}
          </div>
        </div>

        <div
          className="glass-card"
          style={{ borderRadius: '14px', padding: '1.25rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#9b99c4', fontSize: '0.8rem', fontWeight: 500, marginBottom: '0.5rem' }}>
            <MessageCircle size={14} /> WhatsApp Clicks
          </div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2rem', color: '#f1f0ff' }}>
            {leads.filter(l => l.source === 'whatsapp').length}
          </div>
        </div>
      </div>

      {/* Leads Table */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 size={28} style={{ color: '#7c3aed', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : leads.length === 0 ? (
        <div
          className="glass-card"
          style={{ borderRadius: '16px', padding: '4rem', textAlign: 'center' }}
        >
          <Users size={36} style={{ color: '#9b99c4', margin: '0 auto 1rem' }} />
          <h3 style={{ fontWeight: 700, color: '#f1f0ff', marginBottom: '0.5rem' }}>No leads yet</h3>
          <p style={{ color: '#9b99c4', fontSize: '0.9rem', maxWidth: '340px', margin: '0 auto' }}>
            Share your bio link to start collecting leads. They'll appear here in real time.
          </p>
          {profile.username && (
            <a
              href={`/${profile.username}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                marginTop: '1.5rem',
                background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
                color: 'white',
                textDecoration: 'none',
                padding: '0.65rem 1.5rem',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.875rem',
              }}
            >
              View My Bio Page →
            </a>
          )}
        </div>
      ) : (
        <div
          className="glass-card"
          style={{ borderRadius: '16px', overflow: 'hidden' }}
        >
          {/* Table header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr auto auto',
              gap: '1rem',
              padding: '0.75rem 1.25rem',
              borderBottom: '1px solid #2a2a45',
              background: 'rgba(15,15,26,0.5)',
            }}
          >
            {['Name', 'Phone', 'Source', 'Date'].map(h => (
              <div key={h} style={{ fontSize: '0.75rem', fontWeight: 700, color: '#9b99c4', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {h}
              </div>
            ))}
          </div>

          {/* Table rows */}
          {leads.map((lead, i) => (
            <div
              key={lead.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr auto auto',
                gap: '1rem',
                padding: '0.875rem 1.25rem',
                borderBottom: i < leads.length - 1 ? '1px solid rgba(42,42,69,0.5)' : 'none',
                alignItems: 'center',
                transition: 'background 0.15s',
              }}
            >
              <div style={{ fontWeight: 600, color: '#f1f0ff', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {lead.name}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#9b99c4', fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                    fontWeight: 600,
                    background: lead.source === 'whatsapp'
                      ? 'rgba(37,211,102,0.12)'
                      : 'rgba(124,58,237,0.12)',
                    color: lead.source === 'whatsapp' ? '#25d366' : '#a78bfa',
                    border: `1px solid ${lead.source === 'whatsapp' ? 'rgba(37,211,102,0.25)' : 'rgba(124,58,237,0.25)'}`,
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#9b99c4', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                <Calendar size={12} />
                {formatDate(lead.created_at)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
