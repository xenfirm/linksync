import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Phone, MessageCircle, Calendar, Copy, Check, Loader2, AlertCircle, Zap } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { useLeads } from '../../hooks/useLeads'
import { usePayments } from '../../hooks/usePayments'
import { StatsCard, SectionHeader, EmptyState, GradientButton } from '../../components/ui'
import type { Lead } from '../../lib/types'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

type Status = 'new' | 'contacted' | 'converted'

function StatusBadge({ status }: { status: Status }) {
  const config: Record<Status, { label: string; bg: string; color: string }> = {
    new: { label: 'New', bg: 'rgba(191,207,26,0.12)', color: '#BFCF1A' },
    contacted: { label: 'Contacted', bg: 'rgba(56,189,248,0.12)', color: '#38bdf8' },
    converted: { label: 'Converted', bg: 'rgba(34,197,94,0.12)', color: '#22c55e' },
  }
  const c = config[status]
  return (
    <span style={{ background: c.bg, color: c.color, fontSize: '0.65rem', fontWeight: 800, padding: '3px 9px', borderRadius: '100px', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
      {c.label}
    </span>
  )
}

function LeadCard({ lead }: { lead: Lead & { status?: Status } }) {
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<Status>(lead.status || 'new')

  const copyPhone = async () => {
    await navigator.clipboard.writeText(lead.phone)
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  const openWhatsApp = () => {
    const number = lead.phone.replace(/\D/g, '')
    window.open(`https://wa.me/${number}`, '_blank')
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '18px',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <p style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.9rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {lead.name}
            </p>
            <StatusBadge status={status} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#4b5563', fontSize: '0.72rem', marginTop: '0.2rem' }}>
            <Calendar size={11} />
            {formatDate(lead.created_at)}
            <span style={{ marginLeft: '0.25rem', background: lead.source === 'whatsapp' ? 'rgba(34,197,94,0.12)' : 'rgba(167,139,250,0.12)', color: lead.source === 'whatsapp' ? '#22c55e' : '#a78bfa', padding: '1px 7px', borderRadius: '100px', fontSize: '0.62rem', fontWeight: 700, textTransform: 'uppercase' }}>
              {lead.source}
            </span>
          </div>
        </div>
      </div>

      {/* Phone */}
      {lead.phone && lead.phone !== 'N/A' && (
        <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '0.7rem 0.875rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Phone size={13} color="#64748b" />
            <span style={{ color: '#e2e8f0', fontSize: '0.85rem', fontWeight: 500 }}>{lead.phone}</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={copyPhone}
            style={{ background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.07)', border: `1px solid ${copied ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '8px', padding: '0.3rem 0.6rem', cursor: 'pointer', color: copied ? '#22c55e' : '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.72rem', fontWeight: 600, transition: 'all 0.2s' }}
          >
            {copied ? <Check size={12} /> : <Copy size={12} />}
            {copied ? 'Copied!' : 'Copy'}
          </motion.button>
        </div>
      )}

      {/* Actions */}
      <div style={{ display: 'flex', gap: '0.6rem' }}>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={openWhatsApp}
          style={{ flex: 1, background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '12px', padding: '0.6rem', color: '#22c55e', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
        >
          <MessageCircle size={14} /> WhatsApp
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setStatus(s => s === 'new' ? 'contacted' : s === 'contacted' ? 'converted' : 'new')}
          style={{ flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '0.6rem', color: '#94a3b8', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}
        >
          <Check size={14} /> Mark {status === 'new' ? 'Contacted' : status === 'contacted' ? 'Converted' : 'New'}
        </motion.button>
      </div>
    </motion.div>
  )
}

// Filter tabs
const FILTERS = ['All', 'New', 'Contacted', 'Converted']

export default function LeadsPage() {
  const { profile, isPro } = useProfile()
  const { leads, loading } = useLeads(profile?.id, isPro)
  const { handleUpgrade, loading: paymentLoading, error: paymentError } = usePayments()
  const [activeFilter, setActiveFilter] = useState('All')

  if (!profile) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '14px', padding: '1.5rem', color: '#f87171', fontSize: '0.9rem' }}>
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        Please create your profile first to start collecting leads.
      </div>
    )
  }

  if (!isPro) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <SectionHeader title="Leads" subtitle="Your mini CRM" />
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '22px', padding: '3rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: 'rgba(191,207,26,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={30} color="#BFCF1A" />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#f1f5f9', fontSize: '1.2rem', marginBottom: '0.4rem' }}>Lead Capture is Pro</h2>
            <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '280px' }}>
              Upgrade to collect phone numbers, manage leads, and send WhatsApp messages directly.
            </p>
          </div>
          <GradientButton onClick={() => handleUpgrade(profile.user_id, profile.name, 'pro')} disabled={paymentLoading} size="lg">
            {paymentLoading ? 'Opening Checkout…' : '✦ Upgrade to Pro'}
          </GradientButton>
          {paymentError && <p style={{ color: '#f87171', fontSize: '0.8rem' }}>{paymentError}</p>}
        </motion.div>
      </div>
    )
  }

  const filteredLeads = activeFilter === 'All' ? leads : leads.filter(l => l.source === activeFilter.toLowerCase())

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SectionHeader title="Leads" subtitle={`${leads.length} total leads`} />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.6rem' }}>
        <StatsCard label="Total" value={leads.length} icon={<Users size={14} />} accent />
        <StatsCard label="Form" value={leads.filter(l => l.source === 'form').length} icon={<Phone size={14} />} />
        <StatsCard label="WhatsApp" value={leads.filter(l => l.source === 'whatsapp').length} icon={<MessageCircle size={14} />} />
      </div>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
        {FILTERS.map(f => (
          <motion.button
            key={f}
            whileTap={{ scale: 0.92 }}
            onClick={() => setActiveFilter(f)}
            style={{
              background: activeFilter === f ? 'rgba(191,207,26,0.12)' : 'rgba(255,255,255,0.04)',
              border: activeFilter === f ? '1px solid rgba(191,207,26,0.3)' : '1px solid rgba(255,255,255,0.07)',
              borderRadius: '100px',
              padding: '0.45rem 1rem',
              color: activeFilter === f ? '#BFCF1A' : '#64748b',
              fontWeight: 700,
              fontSize: '0.78rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {f}
          </motion.button>
        ))}
      </div>

      {/* Leads */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 size={24} className="animate-spin" style={{ color: '#BFCF1A' }} />
        </div>
      ) : leads.length === 0 ? (
        <EmptyState
          emoji="📥"
          title="No leads yet"
          subtitle="Share your bio page to start collecting leads. They'll appear here in real time 🚀"
          action={
            <a href={`/${profile.username}`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.85rem' }}>
              View My Bio Page →
            </a>
          }
        />
      ) : (
        <AnimatePresence>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {filteredLeads.map(lead => (
              <LeadCard key={lead.id} lead={lead as Lead & { status?: Status }} />
            ))}
          </div>
        </AnimatePresence>
      )}
    </div>
  )
}
