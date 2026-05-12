import { Users, Gift, Share2, Copy, CheckCircle2 } from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { FaWhatsapp } from 'react-icons/fa'
import CopyButton from '../../components/CopyButton'

export default function ReferralPage() {
  const { profile, loading } = useProfile()

  if (loading) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#7c5a9e' }}>Loading referral data...</div>
  }

  if (!profile) return null

  const referralLink = `${window.location.origin}/?ref=${profile.referral_code}`

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.8rem', color: '#f5f0ff', marginBottom: '0.5rem' }}>
          Refer & Earn Pro 🎁
        </h1>
        <p style={{ color: '#7c5a9e', fontSize: '1rem' }}>
          Invite your friends to LinkSync and unlock premium features for free.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {/* Main Card */}
        <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(129,51,194,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8133C2' }}>
              <Users size={24} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#f5f0ff' }}>Spread the Word</h3>
              <p style={{ color: '#7c5a9e', fontSize: '0.85rem' }}>Your unique referral link</p>
            </div>
          </div>

          <div style={{ background: '#fafafa', border: '1.5px dashed #e2e8f0', borderRadius: '16px', padding: '1.25rem', marginBottom: '2rem' }}>
            <code style={{ display: 'block', fontSize: '0.95rem', color: '#f5f0ff', fontWeight: 700, marginBottom: '1rem', wordBreak: 'break-all', textAlign: 'center' }}>
              {referralLink}
            </code>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
               <CopyButton text={referralLink} label="Copy Your Referral Link" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <button
              onClick={() => {
                const text = encodeURIComponent(`Hey! I'm using LinkSync to manage my bio link and capture leads. It's awesome! Check it out here: ${referralLink}`);
                window.open(`https://wa.me/?text=${text}`, '_blank');
              }}
              style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', background: '#25D366', color: 'white', border: 'none', padding: '1rem', borderRadius: '14px', fontSize: '1rem', fontWeight: 700, cursor: 'pointer', transition: 'transform 0.2s' }}
            >
              <FaWhatsapp size={20} /> Share on WhatsApp
            </button>
          </div>
        </div>

        {/* Progress Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ background: 'linear-gradient(135deg, #8133C2 0%, #BFCF1A 100%)', borderRadius: '24px', padding: '2rem', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <p style={{ fontSize: '0.9rem', fontWeight: 600, opacity: 0.9, marginBottom: '0.25rem' }}>Referral Progress</p>
                <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>{profile.referral_count || 0} / 3</h2>
              </div>
              <Gift size={32} />
            </div>
            
            <div style={{ background: 'rgba(255,255,255,0.2)', height: '12px', borderRadius: '10px', overflow: 'hidden', marginBottom: '1rem' }}>
              <div 
                style={{ 
                  width: `${Math.min(((profile.referral_count || 0) / 3) * 100, 100)}%`, 
                  height: '100%', 
                  background: '#fff',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease-out'
                }} 
              />
            </div>
            
            <p style={{ fontSize: '0.9rem', fontWeight: 600 }}>
              {profile.reward_unlocked 
                ? 'Congratulations! Pro features unlocked for life. 🚀' 
                : `${3 - (profile.referral_count || 0)} more signups needed to unlock Pro.`
              }
            </p>
          </div>

          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '1.5rem' }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#f5f0ff', marginBottom: '1rem' }}>How it works:</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Share your link with fellow creators.',
                'They sign up and create a profile.',
                'You get 1 point for every signup.',
                'Get 3 points to unlock Pro for FREE!'
              ].map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: '0.75rem', fontSize: '0.85rem', color: '#7c5a9e', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} style={{ color: '#8133C2', flexShrink: 0, marginTop: '2px' }} />
                  {step}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
