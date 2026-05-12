import { useState, useEffect } from 'react'
import { motion, type Variants } from 'framer-motion'
import {
  ExternalLink, Copy, Check, Plus, Share2,
  TrendingUp, Users, Link2, Eye, MessageCircle, Zap, Gift
} from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { useLinks } from '../../hooks/useLinks'
import { supabase } from '../../lib/supabase'
import { StatsCard, PlanBadge, Toast } from '../../components/ui'
import { useNavigate } from 'react-router-dom'

function AnimatedCounter({ value }: { value: number }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    let start = 0
    const step = (value / 800) * 16
    const timer = setInterval(() => {
      start += step
      if (start >= value) { setDisplay(value); clearInterval(timer) }
      else setDisplay(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [value])
  return <>{display}</>
}

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
const fadeUp: Variants = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

export default function HomeScreen() {
  const { profile, loading, isPro, isTrialActive } = useProfile()
  const { links } = useLinks(profile?.id)
  const navigate = useNavigate()
  const [stats, setStats] = useState({ clicks: 0, leads: 0, recentClicks: 0 })
  const [copied, setCopied] = useState(false)
  const [toastMsg, setToastMsg] = useState('')
  const [toastVisible, setToastVisible] = useState(false)

  useEffect(() => { if (profile?.id) fetchStats() }, [profile?.id])

  const fetchStats = async () => {
    if (!profile?.id) return
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
    const [clicksRes, leadsRes, recentRes] = await Promise.all([
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id),
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id),
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id).gte('created_at', sevenDaysAgo.toISOString()),
    ])
    setStats({ clicks: clicksRes.count || 0, leads: leadsRes.count || 0, recentClicks: recentRes.count || 0 })
  }

  const bioUrl = profile ? `${window.location.origin}/${profile.username}` : ''

  const copyLink = async () => {
    if (!bioUrl) return
    await navigator.clipboard.writeText(bioUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }

  const shareLink = async () => {
    if (navigator.share) {
      try { await navigator.share({ title: `${profile?.name} on LinkSync`, url: bioUrl }) }
      catch { /* cancelled */ }
    } else {
      await copyLink()
      showToast('Link copied! Share it anywhere 🚀')
    }
  }

  const firstName = profile?.name?.split(' ')[0] || 'there'
  const conversionRate = stats.clicks > 0 ? Math.round((stats.leads / stats.clicks) * 100) : 0
  const referralProgress = Math.min((profile?.referral_count || 0), 3)
  const referralUrl = profile?.referral_code ? `${window.location.origin}/auth?ref=${profile.referral_code}` : ''

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="animate-spin" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '3px solid rgba(129,51,194,0.1)', borderTopColor: '#8133C2' }} />
      </div>
    )
  }

  if (!profile) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👋</div>
        <h2 style={{ color: '#f5f0ff', fontWeight: 800, fontFamily: "'Poppins', sans-serif", marginBottom: '0.5rem' }}>Welcome to LinkSync</h2>
        <p style={{ color: '#7c5a9e', marginBottom: '1.5rem', fontSize: '0.9rem' }}>Set up your profile to get started.</p>
        <button onClick={() => navigate('/dashboard/profile')} className="btn-primary" style={{ padding: '0.875rem 2rem', fontSize: '0.9rem' }}>Create Profile →</button>
      </motion.div>
    )
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* ── Welcome Card ── */}
      <motion.div variants={fadeUp}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(129,51,194,0.35), rgba(42,21,85,0.8))',
          border: '1px solid rgba(129,51,194,0.3)',
          borderRadius: '24px',
          padding: '1.5rem',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Decorative glow */}
          <div style={{ position: 'absolute', top: '-40px', right: '-20px', width: '140px', height: '140px', background: 'radial-gradient(circle, rgba(191,207,26,0.18), transparent 70%)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-30px', left: '-10px', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(129,51,194,0.25), transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
            {/* Avatar */}
            {profile.profile_image ? (
              <img src={profile.profile_image} alt={profile.name} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2.5px solid #BFCF1A', flexShrink: 0 }} />
            ) : (
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #8133C2, #BFCF1A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'white', fontSize: '1.4rem', fontFamily: "'Poppins', sans-serif", flexShrink: 0 }}>
                {profile.name?.charAt(0)?.toUpperCase()}
              </div>
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ marginBottom: '0.25rem' }}>
                <PlanBadge plan={profile.plan} isAdmin={profile.is_admin} isTrial={isTrialActive} />
              </div>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: '1.05rem', color: '#f5f0ff', lineHeight: 1.2 }}>
                Welcome back, {firstName}! 👋
              </h1>
              <p style={{ color: '#7c5a9e', fontSize: '0.76rem', marginTop: '0.1rem' }}>@{profile.username}</p>
            </div>
          </div>

          {/* Bio URL bar */}
          <div style={{ background: 'rgba(0,0,0,0.35)', borderRadius: '14px', padding: '0.7rem 1rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid rgba(129,51,194,0.2)' }}>
            <div style={{ flex: 1, minWidth: 0, fontSize: '0.75rem', color: '#BFCF1A', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {bioUrl}
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
              <motion.button whileTap={{ scale: 0.88 }} onClick={copyLink} style={{ background: copied ? 'rgba(191,207,26,0.2)' : 'rgba(129,51,194,0.2)', border: `1px solid ${copied ? 'rgba(191,207,26,0.5)' : 'rgba(129,51,194,0.3)'}`, borderRadius: '9px', padding: '0.4rem', cursor: 'pointer', color: copied ? '#BFCF1A' : '#a78bca', display: 'flex', transition: 'all 0.2s' }}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </motion.button>
              <motion.a whileTap={{ scale: 0.88 }} href={`/${profile.username}`} target="_blank" rel="noopener noreferrer" style={{ background: 'rgba(129,51,194,0.2)', border: '1px solid rgba(129,51,194,0.3)', borderRadius: '9px', padding: '0.4rem', cursor: 'pointer', color: '#a78bca', display: 'flex' }}>
                <ExternalLink size={14} />
              </motion.a>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div variants={fadeUp}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, color: '#5b4378', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '0.6rem' }}>Performance</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
          <StatsCard label="Total Views" value={<AnimatedCounter value={stats.clicks} /> as unknown as number} icon={<Eye size={15} />} trend={stats.recentClicks > 0 ? `+${stats.recentClicks} this week` : undefined} />
          <StatsCard label="Total Leads" value={<AnimatedCounter value={stats.leads} /> as unknown as number} icon={<Users size={15} />} accent />
          <StatsCard label="Conversion" value={`${conversionRate}%`} icon={<TrendingUp size={15} />} locked={!isPro} />
          <StatsCard label="Active Links" value={links.length} icon={<Link2 size={15} />} />
        </div>
      </motion.div>

      {/* ── Quick Actions ── */}
      <motion.div variants={fadeUp}>
        <p style={{ fontSize: '0.68rem', fontWeight: 700, color: '#5b4378', textTransform: 'uppercase', letterSpacing: '0.09em', marginBottom: '0.6rem' }}>Quick Actions</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.65rem' }}>
          {[
            { label: 'Add Link',   icon: <Plus size={20} />,        color: '#8133C2', bg: 'rgba(129,51,194,0.12)', border: 'rgba(129,51,194,0.25)', action: () => navigate('/dashboard/links') },
            { label: 'Share Page', icon: <Share2 size={20} />,      color: '#BFCF1A', bg: 'rgba(191,207,26,0.1)',  border: 'rgba(191,207,26,0.25)',  action: shareLink },
            { label: 'View Page',  icon: <ExternalLink size={20} />, color: '#c084fc', bg: 'rgba(192,132,252,0.1)', border: 'rgba(192,132,252,0.2)', action: () => window.open(`/${profile.username}`, '_blank') },
          ].map((item) => (
            <motion.button key={item.label} whileTap={{ scale: 0.92 }} onClick={item.action}
              style={{ background: item.bg, border: `1px solid ${item.border}`, borderRadius: '16px', padding: '1rem 0.5rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: item.color }}>{item.icon}</span>
              <span style={{ color: '#7c5a9e', fontSize: '0.68rem', fontWeight: 600 }}>{item.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ── Referral Card ── */}
      {profile.referral_code && (
        <motion.div variants={fadeUp}>
          <div style={{ background: 'linear-gradient(135deg, rgba(191,207,26,0.1), rgba(129,51,194,0.15))', border: '1px solid rgba(191,207,26,0.25)', borderRadius: '22px', padding: '1.25rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(191,207,26,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gift size={18} color="#BFCF1A" />
              </div>
              <div>
                <p style={{ fontWeight: 700, color: '#f5f0ff', fontSize: '0.875rem', fontFamily: "'Poppins', sans-serif" }}>Invite 3 friends → Unlock Pro</p>
                <p style={{ color: '#7c5a9e', fontSize: '0.72rem' }}>{referralProgress}/3 friends invited</p>
              </div>
            </div>
            <div style={{ height: '5px', background: 'rgba(129,51,194,0.15)', borderRadius: '100px', marginBottom: '1rem', overflow: 'hidden' }}>
              <motion.div initial={{ width: 0 }} animate={{ width: `${(referralProgress / 3) * 100}%` }} transition={{ duration: 1, ease: 'easeOut' }} style={{ height: '100%', background: 'linear-gradient(90deg, #8133C2, #BFCF1A)', borderRadius: '100px' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => { navigator.clipboard.writeText(referralUrl); showToast('Referral link copied! 🎉') }} style={{ flex: 1, background: 'rgba(129,51,194,0.15)', border: '1px solid rgba(129,51,194,0.3)', borderRadius: '12px', padding: '0.6rem', color: '#c084fc', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <Copy size={13} /> Copy Link
              </motion.button>
              <motion.button whileTap={{ scale: 0.95 }} onClick={() => { const msg = encodeURIComponent(`Join me on LinkSync! ${referralUrl}`); window.open(`https://wa.me/?text=${msg}`, '_blank') }} style={{ flex: 1, background: 'rgba(37,211,102,0.1)', border: '1px solid rgba(37,211,102,0.25)', borderRadius: '12px', padding: '0.6rem', color: '#25d366', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <MessageCircle size={13} /> WhatsApp
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Upgrade CTA ── */}
      {!isPro && (
        <motion.div variants={fadeUp}>
          <div style={{ background: 'linear-gradient(135deg, rgba(129,51,194,0.2), rgba(191,207,26,0.08))', border: '1px solid rgba(129,51,194,0.3)', borderRadius: '18px', padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(191,207,26,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Zap size={20} color="#BFCF1A" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontWeight: 700, color: '#BFCF1A', fontSize: '0.875rem', marginBottom: '0.15rem', fontFamily: "'Poppins', sans-serif" }}>Upgrade to Pro</p>
              <p style={{ color: '#7c5a9e', fontSize: '0.73rem' }}>Lead capture, unlimited links, analytics</p>
            </div>
            <motion.button whileTap={{ scale: 0.92 }} onClick={() => navigate('/dashboard/profile')} style={{ background: 'linear-gradient(135deg, #8133C2, #6b27a8)', color: '#BFCF1A', border: 'none', borderRadius: '10px', padding: '0.5rem 0.875rem', fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', flexShrink: 0, fontFamily: "'Poppins', sans-serif" }}>
              Upgrade →
            </motion.button>
          </div>
        </motion.div>
      )}

      <Toast message={toastMsg} visible={toastVisible} />
    </motion.div>
  )
}
