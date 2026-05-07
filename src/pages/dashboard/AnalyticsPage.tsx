import { useState, useEffect } from 'react'
import { BarChart2, Loader2, TrendingUp, Link2, MessageCircle } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { supabase } from '../../lib/supabase'
import { usePayments } from '../../hooks/usePayments'

export default function AnalyticsPage() {
  const { profile, isPro } = useProfile()
  const { handleUpgrade, error: paymentError } = usePayments()
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ 
    leads: 0, 
    clicks: 0, 
    recentClicks: 0, 
    linkClicks: 0, 
    whatsappClicks: 0 
  })

  useEffect(() => {
    if (profile) {
      fetchStats()
    }
  }, [profile])

  const fetchStats = async () => {
    if (!profile) return
    setLoading(true)
    
    const sevenDaysAgo = new Date()
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

    const [leadsData, clicksData, recentClicksData, linkClicksData, whatsappClicksData] = await Promise.all([
      supabase.from('leads').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id),
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id),
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id).gte('created_at', sevenDaysAgo.toISOString()),
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id).eq('type', 'link'),
      supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('profile_id', profile.id).eq('type', 'whatsapp'),
    ])

    setStats({ 
      leads: leadsData.count || 0, 
      clicks: clicksData.count || 0,
      recentClicks: recentClicksData.count || 0,
      linkClicks: linkClicksData.count || 0,
      whatsappClicks: whatsappClicksData.count || 0
    })
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
        <Loader2 size={28} style={{ color: '#ff4d00', animation: 'spin 1s linear infinite' }} />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '800px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.6rem', color: '#0f172a', marginBottom: '0.35rem' }}>
          Analytics Dashboard
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Track your page performance and conversion metrics.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {/* Total Clicks */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Views</span>
            <TrendingUp size={16} color="#ff4d00" />
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats.clicks}</span>
          {stats.recentClicks > 0 && isPro && (
            <span style={{ color: '#22c55e', fontSize: '0.75rem', fontWeight: 700, marginTop: '0.5rem' }}>
              +{stats.recentClicks} in the last 7 days
            </span>
          )}
        </div>

        {/* Total Leads */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Total Leads</span>
            <BarChart2 size={16} color="#ff4d00" />
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a' }}>{stats.leads}</span>
        </div>

        {/* Conversion Rate */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
          {!isPro && (
            <div style={{ position: 'absolute', top: '12px', right: '12px', background: '#fff7f2', color: '#ff4d00', fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '4px' }}>
              PRO
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase' }}>Conversion Rate</span>
          </div>
          <span style={{ fontSize: '2rem', fontWeight: 800, color: '#0f172a', filter: !isPro ? 'blur(6px)' : 'none' }}>
            {stats.clicks > 0 ? Math.round((stats.leads / stats.clicks) * 100) : 0}%
          </span>
          {!isPro && (
            <p style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '0.5rem' }}>Unlock with Pro</p>
          )}
        </div>
      </div>

      {/* Visual Charts Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {/* Traffic Breakdown */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>Traffic Sources</h3>
            {!isPro && <span style={{ fontSize: '0.75rem', color: '#ff4d00', fontWeight: 700, background: '#fff7f2', padding: '2px 8px', borderRadius: '4px' }}>PRO</span>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', filter: !isPro ? 'blur(4px)' : 'none', pointerEvents: !isPro ? 'none' : 'auto' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Link2 size={16} color="#ff4d00" />
                  <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>Direct Link Clicks</span>
                </div>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{stats.linkClicks}</span>
              </div>
              <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ width: `${stats.clicks > 0 ? (stats.linkClicks / stats.clicks) * 100 : 0}%`, height: '100%', background: '#ff4d00', borderRadius: '100px' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <MessageCircle size={16} color="#22c55e" />
                  <span style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 500 }}>WhatsApp Redirects</span>
                </div>
                <span style={{ fontWeight: 800, color: '#0f172a' }}>{stats.whatsappClicks}</span>
              </div>
              <div style={{ height: '10px', background: '#f1f5f9', borderRadius: '100px', overflow: 'hidden' }}>
                <div style={{ width: `${stats.clicks > 0 ? (stats.whatsappClicks / stats.clicks) * 100 : 0}%`, height: '100%', background: '#22c55e', borderRadius: '100px' }} />
              </div>
            </div>
          </div>

          {!isPro && (
            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <button 
                onClick={() => handleUpgrade(profile?.user_id || '', profile?.name || '', 'pro')}
                style={{ background: '#ff4d00', color: 'white', border: 'none', padding: '0.75rem 1.5rem', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}
              >
                Unlock Full Analytics
              </button>
            </div>
          )}
        </div>

        {/* Engagement Insights */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
          <div style={{ width: '50px', height: '50px', background: '#f5f3ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', color: '#ff4d00' }}>
            <TrendingUp size={24} />
          </div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>Performance Insight</h3>
          <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>
            {stats.clicks === 0 
              ? "Start sharing your bio link to see performance insights here!" 
              : stats.leads === 0 
              ? "You have visitors! Try adding more engaging links to convert them into leads." 
              : `Your page is converting at ${Math.round((stats.leads / stats.clicks) * 100)}%. Great job!`}
          </p>
        </div>
      </div>
    </div>
  )
}
