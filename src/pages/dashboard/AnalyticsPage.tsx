import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, Link2, MessageCircle, Users, Loader2, Lock } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { supabase } from '../../lib/supabase'
import { usePayments } from '../../hooks/usePayments'
import { StatsCard, SectionHeader, GradientButton } from '../../components/ui'

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
}

// ── Sparkline ─────────────────────────────────────────────────────────────────
function Sparkline({ data, color = '#a3e635' }: { data: number[]; color?: string }) {
  if (!data.length) return null
  const max = Math.max(...data, 1)
  const min = Math.min(...data)
  const width = 260; const height = 56
  const points = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((v - min) / (max - min || 1)) * (height - 10) - 5
    return `${x},${y}`
  }).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: '60px' }}>
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <polygon points={`0,${height} ${points} ${width},${height}`} fill="url(#sparkGrad)" />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Progress Bar ──────────────────────────────────────────────────────────────
function ProgressBar({ label, value, total, color, icon }: { label: string; value: number; total: number; color: string; icon: React.ReactNode }) {
  const pct = total > 0 ? (value / total) * 100 : 0
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.82rem' }}>
          {icon} {label}
        </div>
        <span style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '0.9rem' }}>{value}</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '100px', overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
          style={{ height: '100%', background: color, borderRadius: '100px' }}
        />
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const { profile, isPro } = useProfile()
  const { handleUpgrade } = usePayments()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ leads: 0, clicks: 0, recentClicks: 0, linkClicks: 0, whatsappClicks: 0 })

  useEffect(() => { if (profile) fetchStats() }, [profile])

  const fetchStats = async () => {
    if (!profile) return
    setLoading(true)
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const [leadsData, clicksData, recentData, linkData, waData] = await Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id),
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id),
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id).gte('created_at', sevenDaysAgo.toISOString()),
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id).eq('type', 'link'),
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id).eq('type', 'whatsapp'),
    ])
    setStats({ leads: leadsData.count || 0, clicks: clicksData.count || 0, recentClicks: recentData.count || 0, linkClicks: linkData.count || 0, whatsappClicks: waData.count || 0 })
    setLoading(false)
  }

  const convRate = stats.clicks > 0 ? Math.round((stats.leads / stats.clicks) * 100) : 0

  // Mock sparkline data
  const mockTrend = [2, 5, 3, 8, 6, 12, stats.recentClicks || 4]

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 size={24} className="animate-spin" style={{ color: '#a3e635' }} />
      </div>
    )
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <motion.div variants={fadeUp}>
        <SectionHeader title="Analytics" subtitle="Track your growth" />
      </motion.div>

      {/* Stats Grid */}
      <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
        <StatsCard label="Total Views" value={stats.clicks} icon={<TrendingUp size={14} />} trend={stats.recentClicks > 0 ? `+${stats.recentClicks} this week` : undefined} />
        <StatsCard label="Total Leads" value={stats.leads} icon={<Users size={14} />} accent />
        <StatsCard label="Conversion" value={`${convRate}%`} icon={<TrendingUp size={14} />} locked={!isPro} />
        <StatsCard label="Link Clicks" value={stats.linkClicks} icon={<Link2 size={14} />} />
      </motion.div>

      {/* Sparkline chart */}
      <motion.div
        variants={fadeUp}
        style={{ background: 'rgba(129,51,194,0.08)', border: '1px solid rgba(129,51,194,0.15)', borderRadius: '20px', padding: '1.25rem' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <p style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '0.875rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Views This Week</p>
            <p style={{ color: '#64748b', fontSize: '0.72rem' }}>Last 7 days</p>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 900, color: '#BFCF1A', fontFamily: "'Poppins', sans-serif" }}>{stats.recentClicks}</span>
        </div>
        <Sparkline data={mockTrend} color="#8133C2" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.25rem' }}>
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
            <span key={d} style={{ color: '#374151', fontSize: '0.6rem', fontWeight: 500 }}>{d}</span>
          ))}
        </div>
      </motion.div>

      {/* Traffic Sources */}
      <motion.div
        variants={fadeUp}
        style={{ background: 'rgba(129,51,194,0.08)', border: '1px solid rgba(129,51,194,0.15)', borderRadius: '20px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <p style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '0.875rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Traffic Sources</p>
          {!isPro && <span style={{ background: 'rgba(191,207,26,0.12)', color: '#BFCF1A', fontSize: '0.62rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' }}>Pro</span>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', filter: !isPro ? 'blur(5px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
          <ProgressBar label="Link Clicks" value={stats.linkClicks} total={stats.clicks} color="#a78bfa" icon={<Link2 size={13} />} />
          <ProgressBar label="WhatsApp" value={stats.whatsappClicks} total={stats.clicks} color="#22c55e" icon={<MessageCircle size={13} />} />
        </div>
        {!isPro && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: 'rgba(15,15,19,0.3)', backdropFilter: 'blur(2px)' }}>
            <Lock size={20} color="#BFCF1A" />
            <GradientButton onClick={() => handleUpgrade(profile?.user_id || '', profile?.name || '', 'pro')} size="sm">
              Unlock Full Analytics
            </GradientButton>
          </div>
        )}
      </motion.div>

      {/* Insight Card */}
      <motion.div
        variants={fadeUp}
        style={{ background: 'linear-gradient(135deg, rgba(129,51,194,0.15), rgba(191,207,26,0.08))', border: '1px solid rgba(129,51,194,0.25)', borderRadius: '18px', padding: '1.25rem' }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.875rem' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(167,139,250,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <TrendingUp size={18} color="#a78bfa" />
          </div>
          <div>
            <p style={{ fontWeight: 800, color: '#f1f5f9', fontSize: '0.875rem', marginBottom: '0.3rem', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>Performance Insight</p>
            <p style={{ color: '#64748b', fontSize: '0.8rem', lineHeight: 1.55 }}>
              {stats.clicks === 0
                ? "Start sharing your bio link to see insights here!"
                : stats.leads === 0
                ? "You have visitors! Add a lead form to convert them."
                : `Great! You're converting at ${convRate}% — keep sharing your page!`}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
