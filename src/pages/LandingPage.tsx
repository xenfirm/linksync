import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, CheckCircle2, MessageCircle, Users, Link2, Clock, Zap, Shield, Star, Mail, Send } from 'lucide-react'
import { FaInstagram, FaYoutube, FaTwitter } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

/* ─── Phone Mockup ─── */
function PhoneMockup() {
  return (
    <div style={{ position: 'relative', width: '280px', margin: '0 auto', flexShrink: 0 }}>
      {/* Soft background glow */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(255,77,0,0.08) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

      {/* Phone frame */}
      <div style={{ position: 'relative', zIndex: 1, background: '#000', borderRadius: '44px', padding: '10px', boxShadow: '0 40px 80px rgba(0,0,0,0.2)' }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: '18px', left: '50%', transform: 'translateX(-50%)', width: '60px', height: '22px', background: '#000', borderRadius: '12px', zIndex: 2 }} />

        {/* Screen */}
        <div style={{ background: '#ffffff', borderRadius: '34px', padding: '2.5rem 1.25rem 1.5rem', minHeight: '480px', overflow: 'hidden', position: 'relative' }}>
          {/* Profile Image */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', margin: '0 auto 0.75rem', border: '2px solid #f1f5f9' }}>
               <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
              Anjali Sharma <CheckCircle2 size={14} fill="#ff4d00" color="white" />
            </div>
            <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '0.25rem', lineHeight: 1.4 }}>Helping creators grow their<br />brand & revenue online ✨</div>
          </div>

          {/* WhatsApp */}
          <button style={{ width: '100%', padding: '0.7rem', borderRadius: '10px', border: 'none', background: '#ff4d00', color: 'white', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <MessageCircle size={15} fill="white" /> WhatsApp Me
          </button>

          {/* Links */}
          {[
            { icon: '🛒', label: 'My Store' },
            { icon: '📺', label: 'Watch My YouTube' },
            { icon: '📅', label: 'Book a Call' }
          ].map(l => (
            <div key={l.label} style={{ width: '100%', padding: '0.65rem 1rem', borderRadius: '10px', border: '1px solid #f1f5f9', background: '#fff', color: '#0f172a', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '0.8rem' }}>{l.icon}</span>{l.label}
            </div>
          ))}

          {/* Newsletter */}
          <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#fafafa', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Join my newsletter</div>
            <div style={{ fontSize: '0.65rem', color: '#64748b', marginBottom: '0.75rem' }}>Get tips to grow on WhatsApp</div>
            <input type="email" placeholder="Enter your email" style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.7rem', marginBottom: '0.5rem', outline: 'none' }} />
            <button style={{ width: '100%', background: '#ff4d00', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>Join Now</button>
          </div>
        </div>
      </div>

      {/* Lead notification badge */}
      <div style={{ position: 'absolute', top: '10%', right: '-45%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '0.75rem 1rem', boxShadow: '0 12px 32px rgba(0,0,0,0.1)', zIndex: 3, minWidth: '180px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0f172a' }}>New Lead Captured!</span>
              <Zap size={10} fill="#ff4d00" color="#ff4d00" />
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 500 }}>Rohit Kumar</div>
            <div style={{ fontSize: '0.6rem', color: '#94a3b8', marginTop: '0.1rem' }}>+91 98765 43210</div>
          </div>
        </div>
      </div>

      {/* Stats badge */}
      <div style={{ position: 'absolute', bottom: '15%', left: '-40%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1rem', boxShadow: '0 12px 32px rgba(0,0,0,0.1)', zIndex: 3, textAlign: 'left', minWidth: '160px' }}>
        <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: '0.25rem' }}>Total Leads</div>
        <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>2,350</div>
        <div style={{ fontSize: '0.65rem', color: '#22c55e', fontWeight: 700, marginTop: '0.25rem' }}>↑ 32.5% <span style={{ color: '#94a3b8', fontWeight: 500 }}>this month</span></div>
        {/* Simple SVG Chart Sparkline */}
        <svg width="120" height="30" style={{ marginTop: '0.75rem' }}>
          <path d="M0 25 Q 20 20, 40 22 T 80 10 T 120 5" fill="none" stroke="#ff4d00" strokeWidth="2" />
          <path d="M0 25 Q 20 20, 40 22 T 80 10 T 120 5 V 30 H 0 Z" fill="rgba(255,77,0,0.05)" />
        </svg>
      </div>

      {/* Arrow decoration */}
      <div style={{ position: 'absolute', top: '25%', left: '-20%', zIndex: 1 }}>
         <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M10 10 Q 30 5, 50 25" stroke="#ff4d00" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <path d="M45 25 L 50 25 L 50 20" stroke="#ff4d00" strokeWidth="2" fill="none" />
         </svg>
      </div>
    </div>
  )
}

/* ─── Main LandingPage ─── */
export default function LandingPage() {
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const ref = searchParams.get('ref')
    if (ref) {
      sessionStorage.setItem('referred_by', ref)
    }
  }, [searchParams])

  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar variant="landing" />

      {/* ── HERO ── */}
      <section
        style={{
          background: 'radial-gradient(circle at 90% 10%, rgba(255,77,0,0.03) 0%, transparent 40%), radial-gradient(circle at 10% 90%, rgba(255,77,0,0.03) 0%, transparent 40%)',
          padding: 'calc(64px + clamp(3rem, 8vw, 6rem)) 1.25rem clamp(4rem, 10vw, 8rem)',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          {/* Left */}
          <div style={{ flex: '1 1 450px', minWidth: 0 }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#fff7f2', border: '1px solid #ffe2d1', borderRadius: '100px', padding: '0.5rem 1.25rem', marginBottom: '2rem', fontSize: '0.85rem', color: '#ff4d00', fontWeight: 700 }}>
              <Zap size={14} fill="#ff4d00" /> Turn followers into customers
            </div>

            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', lineHeight: 1.1, color: '#0f172a', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
              Turn Your Bio Link<br />
              Into a <span style={{ color: '#ff4d00' }}>Lead Machine</span>
            </h1>

            <p style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', color: '#64748b', maxWidth: '540px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Create a beautiful bio link page, capture leads and start WhatsApp conversations instantly.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <Link
                to="/auth?mode=signup"
                className="btn-primary"
                style={{ padding: '1rem 2rem', fontSize: '1.05rem', borderRadius: '12px' }}
              >
                Get Started Free <ArrowRight size={20} />
              </Link>
              <a
                href="#demo"
                className="btn-outline"
                style={{ padding: '1rem 2rem', fontSize: '1.05rem', borderRadius: '12px', background: '#fff' }}
              >
                <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2.5px solid #0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '0', height: '0', borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '6px solid #0f172a', marginLeft: '2px' }} />
                </div>
                View Demo
              </a>
            </div>

            {/* Trust bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', color: '#64748b', fontSize: '0.9rem', fontWeight: 500 }}>
              {[
                { icon: <Mail size={16} />, label: 'No credit card required' },
                { icon: <Clock size={16} />, label: 'Setup in 2 minutes' },
                { icon: <Shield size={16} />, label: 'Trusted by 100k+ users' },
              ].map((item, i) => (
                <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#ff4d00' }}>{item.icon}</span> {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — phone */}
          <div id="demo" style={{ flex: '0 1 400px', display: 'flex', justifyContent: 'center', minWidth: 0, paddingRight: '40px' }}>
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ padding: '6rem 1.25rem', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2rem' }}>
          {[
            { icon: <Users size={24} />, title: 'Lead Capture', desc: 'Collect leads with a simple form and grow your audience.' },
            { icon: <MessageCircle size={24} />, title: 'WhatsApp Integration', desc: 'Start WhatsApp conversations with one tap.' },
            { icon: <Link2 size={24} />, title: 'Custom Bio Page', desc: 'Beautiful, fast and mobile friendly bio link pages.' },
            { icon: <Zap size={24} />, title: 'Instant Setup', desc: 'Create your page in less than 2 minutes. No coding.' },
          ].map(f => (
            <div key={f.title} style={{ padding: '2.5rem 2rem', borderRadius: '24px', border: '1px solid #f1f5f9', background: '#fff', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#fff7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: '#ff4d00' }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0f172a' }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#fff7f2', color: '#ff4d00', fontSize: '0.85rem', fontWeight: 800, padding: '0.4rem 1.25rem', borderRadius: '100px', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
            HOW IT WORKS
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '5rem', letterSpacing: '-0.03em' }}>
            3 Simple Steps to More Leads
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', textAlign: 'center', position: 'relative' }}>
            {[
              { num: '1', icon: <div style={{ fontSize: '2rem' }}>✏️</div>, title: 'Create Your Page', desc: 'Add your details, links and customize your bio link page.' },
              { num: '2', icon: <div style={{ fontSize: '2rem' }}>🔗</div>, title: 'Share Your Link', desc: 'Share the link in your bio, stories, posts or anywhere.' },
              { num: '3', icon: <div style={{ fontSize: '2rem' }}>💬</div>, title: 'Get WhatsApp Leads', desc: 'Visitors contact you and you get real leads on WhatsApp.' },
            ].map((s, i) => (
              <div key={s.num} style={{ position: 'relative', padding: '3rem 2rem', background: '#fff', borderRadius: '32px', border: '1px solid #e2e8f0', zIndex: 1 }}>
                {/* Connector line */}
                {i < 2 && (
                  <div className="hide-mobile" style={{ position: 'absolute', top: '50%', right: '-1.5rem', width: '3rem', borderTop: '2px dashed #e2e8f0', zIndex: -1 }} />
                )}
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ff4d00', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.1rem', fontWeight: 900 }}>
                  {s.num}
                </div>
                <div style={{ marginBottom: '1.25rem' }}>{s.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '0.75rem', color: '#0f172a' }}>{s.title}</h3>
                <p style={{ color: '#64748b', fontSize: '1rem', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ display: 'inline-block', background: '#fff7f2', color: '#ff4d00', fontSize: '0.85rem', fontWeight: 800, padding: '0.4rem 1.25rem', borderRadius: '100px', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>
              PRICING
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}>
              Simple, Transparent Pricing
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {/* FREE */}
            <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: '32px', padding: '3.5rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Free</div>
              <div style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>Perfect for testing</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '2.5rem' }}>₹0<span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#94a3b8' }}>/month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {['1 Bio Link Page', '3 Links Limit', 'LinkSync Branding', 'Basic Analytics'].map(f => (
                  <li key={f} style={{ fontSize: '1rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="#ff4d00" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="btn-outline" style={{ marginTop: 'auto', padding: '1rem', borderRadius: '12px' }}>
                Get Started Free
              </Link>
            </div>

            {/* BASIC */}
            <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: '32px', padding: '3.5rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Basic</div>
              <div style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>Perfect for individuals</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '2.5rem' }}>₹99<span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#94a3b8' }}>/month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {['10 Links Limit', 'Remove Branding', 'WhatsApp Button', 'Lead Capture Form'].map(f => (
                  <li key={f} style={{ fontSize: '1rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="#ff4d00" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="btn-outline" style={{ marginTop: 'auto', padding: '1rem', borderRadius: '12px' }}>
                Start 7-Day Free Trial
              </Link>
            </div>

            {/* PRO */}
            <div style={{ background: '#fff', border: '2px solid #ff4d00', borderRadius: '32px', padding: '3.5rem 2.5rem', position: 'relative', boxShadow: '0 20px 40px rgba(255,77,0,0.1)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)', background: '#ff4d00', color: 'white', fontSize: '0.85rem', fontWeight: 800, padding: '0.5rem 1.5rem', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                MOST POPULAR
              </div>
              <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Pro</div>
              <div style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>For growing businesses</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '2.5rem' }}>₹299<span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#94a3b8' }}>/month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {['Unlimited Links', 'Lead Capture Form', 'Leads Dashboard', 'WhatsApp Integration', 'Priority Support'].map(f => (
                  <li key={f} style={{ fontSize: '1rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="#ff4d00" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="btn-primary" style={{ marginTop: 'auto', padding: '1rem', borderRadius: '12px' }}>
                Start 7-Day Free Trial
              </Link>
            </div>
          </div>

          {/* Detailed Plan Comparison Table */}
          <div style={{ marginTop: '6rem', overflowX: 'auto' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '1.75rem', textAlign: 'center', marginBottom: '3rem', color: '#0f172a', letterSpacing: '-0.02em' }}>
              Detailed Plan Comparison
            </h3>
            <div style={{ minWidth: '800px', background: '#fff', border: '1px solid #f1f5f9', borderRadius: '32px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,0.02)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#fafafa', borderBottom: '1px solid #f1f5f9' }}>
                    <th style={{ padding: '1.75rem 2.5rem', fontSize: '0.85rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Features</th>
                    <th style={{ padding: '1.75rem 2rem', fontSize: '1rem', fontWeight: 900, color: '#0f172a', textAlign: 'center' }}>Free</th>
                    <th style={{ padding: '1.75rem 2rem', fontSize: '1rem', fontWeight: 900, color: '#0f172a', textAlign: 'center' }}>Basic</th>
                    <th style={{ padding: '1.75rem 2rem', fontSize: '1rem', fontWeight: 900, color: '#ff4d00', textAlign: 'center' }}>Pro</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { f: 'Link Limit', free: '3 Links', basic: '10 Links', pro: 'Unlimited' },
                    { f: 'Bio Pages', free: '1 Page', basic: '1 Page', pro: '1 Page' },
                    { f: 'LinkSync Branding', free: 'Visible', basic: 'Visible', pro: 'Removed' },
                    { f: 'WhatsApp Button', free: 'No', basic: 'Yes', pro: 'Yes' },
                    { f: 'Lead Capture Form', free: 'No', basic: 'No', pro: 'Yes' },
                    { f: 'Leads Dashboard', free: 'No', basic: 'No', pro: 'Yes' },
                    { f: 'Analytics', free: 'Basic', basic: 'Basic', pro: 'Full Dashboard' },
                    { f: 'Priority Support', free: 'No', basic: 'No', pro: 'Yes' },
                    { f: 'Free Trial', free: 'No', basic: '7 Days', basicColor: '#22c55e', pro: '7 Days', proColor: '#22c55e' },
                  ].map((row, i) => (
                    <tr key={row.f} style={{ borderBottom: i === 8 ? 'none' : '1px solid #f1f5f9', background: i % 2 === 0 ? 'white' : '#fafafa' }}>
                      <td style={{ padding: '1.5rem 2.5rem', fontSize: '1rem', fontWeight: 600, color: '#374151' }}>{row.f}</td>
                      <td style={{ padding: '1.5rem 2rem', fontSize: '0.95rem', color: '#64748b', textAlign: 'center' }}>{row.free}</td>
                      <td style={{ padding: '1.5rem 2rem', fontSize: '0.95rem', color: row.basicColor || '#64748b', textAlign: 'center', fontWeight: row.basicColor ? 800 : 500 }}>{row.basic}</td>
                      <td style={{ padding: '1.5rem 2rem', fontSize: '1rem', color: row.proColor || '#ff4d00', textAlign: 'center', fontWeight: 800 }}>{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: 'center', marginTop: '2.5rem', color: '#94a3b8', fontSize: '0.9rem', fontWeight: 500 }}>
              All prices are in INR (₹). Subscription can be cancelled anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '8rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 90% 90%, rgba(255,77,0,0.05) 0%, transparent 50%)', zIndex: 0 }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', borderRadius: '40px', padding: '4rem 3rem', border: '1px solid #f1f5f9', boxShadow: '0 20px 60px rgba(0,0,0,0.05)', position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flex: '1 1 400px' }}>
            <div style={{ width: '88px', height: '88px', borderRadius: '50%', background: '#fff7f2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '2.5rem' }}>
              🚀
            </div>
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: '#0f172a', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.03em' }}>
                Start Getting Customers<br />From Your Bio Today
              </h2>
              <p style={{ color: '#64748b', fontSize: '1.1rem', maxWidth: '440px' }}>
                Join 100,000+ users who are growing their business with LinkSync.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <Link
              to="/auth?mode=signup"
              className="btn-primary"
              style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', borderRadius: '16px', boxShadow: '0 12px 32px rgba(255,77,0,0.3)' }}
            >
              Create Your LinkSync Page <ArrowRight size={20} />
            </Link>
            <div style={{ display: 'flex', gap: '1.5rem', color: '#94a3b8', fontSize: '0.85rem', fontWeight: 500 }}>
               <span>✓ No credit card required</span>
               <span>✓ Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #f1f5f9', padding: '6rem 1.25rem 3rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem', marginBottom: '6rem' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <Logo size={32} />
              <p style={{ color: '#64748b', fontSize: '1rem', marginTop: '1.5rem', maxWidth: '280px', lineHeight: 1.6 }}>
                The all-in-one bio link tool to capture leads and grow your business on WhatsApp.
              </p>
            </div>
            
            {[
              { title: 'Product', links: ['Features', 'Templates', 'Integrations', 'Pricing'] },
              { title: 'Company', links: ['About Us', 'Blog', 'Careers', 'Contact'] },
              { title: 'Resources', links: ['Help Center', 'Guides', 'Privacy Policy', 'Terms of Service'] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1.75rem', fontSize: '1.1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {col.links.map(l => (
                    <li key={l}><Link to="#" style={{ color: '#64748b', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.2s' }}>{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}

            <div style={{ gridColumn: 'span 2' }}>
              <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1.75rem', fontSize: '1.1rem' }}>Stay Updated</h4>
              <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '1.5rem' }}>Subscribe to get the latest updates and tips.</p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="email" placeholder="Enter your email" style={{ flex: 1, padding: '0.85rem 1.25rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', outline: 'none', fontSize: '1rem' }} />
                <button style={{ width: '52px', height: '52px', borderRadius: '12px', background: '#ff4d00', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', cursor: 'pointer' }}>
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '2.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>© 2026 LinkSync. All rights reserved. Developed by XenFirm Technologies</p>
            <div style={{ display: 'flex', gap: '2rem' }}>
               <Link to="/privacy" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Privacy</Link>
               <Link to="/terms" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.9rem' }}>Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
