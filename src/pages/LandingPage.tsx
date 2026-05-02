import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, XCircle, MessageCircle, Users, Link2, Clock, Zap, Shield, Star } from 'lucide-react'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

/* ─── Phone Mockup ─── */
function PhoneMockup() {
  return (
    <div style={{ position: 'relative', width: '260px', margin: '0 auto', flexShrink: 0 }}>
      {/* Soft background glow */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(109,40,217,0.12) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

      {/* Phone frame */}
      <div style={{ position: 'relative', zIndex: 1, background: '#1e1b4b', borderRadius: '36px', padding: '10px', border: '6px solid #2d2a6e', boxShadow: '0 40px 80px rgba(0,0,0,0.3)' }}>
        {/* Notch */}
        <div style={{ position: 'absolute', top: '16px', left: '50%', transform: 'translateX(-50%)', width: '50px', height: '14px', background: '#2d2a6e', borderRadius: '8px', zIndex: 2 }} />

        {/* Screen */}
        <div style={{ background: '#f8fafc', borderRadius: '26px', padding: '2rem 1rem 1.25rem', minHeight: '450px', overflow: 'hidden' }}>
          {/* Profile */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg, #6d28d9, #7c3aed)', margin: '0 auto 0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '1.2rem' }}>A</div>
            <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.9rem' }}>Anjali Sharma 🔵</div>
            <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '0.15rem' }}>Helping creators grow their<br />brand & revenue online</div>
          </div>

          {/* WhatsApp */}
          <button style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: 'none', background: '#25d366', color: 'white', fontWeight: 700, fontSize: '0.78rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
            <MessageCircle size={13} fill="white" /> WhatsApp Me
          </button>

          {/* Links */}
          {['My Store', 'Watch My YouTube', 'Book a Call'].map(l => (
            <div key={l} style={{ width: '100%', padding: '0.45rem 0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', background: '#fff', color: '#0f172a', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.65rem' }}>📌</span>{l}
            </div>
          ))}

          {/* Lead form */}
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>Get in touch</div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.35rem 0.5rem', marginBottom: '0.4rem', fontSize: '0.68rem', color: '#94a3b8' }}>Your Name</div>
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '0.35rem 0.5rem', marginBottom: '0.5rem', fontSize: '0.68rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>🇮🇳 +91</span>
            </div>
            <button 
              onClick={() => alert('Demo: In a real page, this would capture the lead and notify you instantly!')}
              style={{ width: '100%', border: 'none', background: '#6d28d9', borderRadius: '6px', padding: '0.4rem', textAlign: 'center', fontSize: '0.7rem', fontWeight: 700, color: 'white', cursor: 'pointer' }}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

      {/* Lead notification badge */}
      <div style={{ position: 'absolute', top: '15%', right: '-40%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.6rem 0.8rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 3, minWidth: '160px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg, #6d28d9, #7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '0.75rem' }}>😊</span>
          </div>
          <div>
            <div style={{ fontSize: '0.65rem', fontWeight: 600, color: '#22c55e' }}>✓ New Lead Captured!</div>
            <div style={{ fontSize: '0.6rem', color: '#374151', fontWeight: 500 }}>Rohit Kumar</div>
            <div style={{ fontSize: '0.58rem', color: '#64748b' }}>+91 98765 43210</div>
          </div>
        </div>
      </div>

      {/* Stats badge */}
      <div style={{ position: 'absolute', bottom: '15%', right: '-35%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '0.75rem 1rem', boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 3, textAlign: 'center' }}>
        <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 500, marginBottom: '0.2rem' }}>Total Leads</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>2,350</div>
        <div style={{ fontSize: '0.6rem', color: '#22c55e', fontWeight: 600, marginTop: '0.2rem' }}>+32.5% this month</div>
      </div>
    </div>
  )
}

/* ─── Main LandingPage ─── */
export default function LandingPage() {
  return (
    <div style={{ background: '#ffffff', color: '#0f172a', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar variant="landing" />

      {/* ── HERO ── */}
      <section
        style={{
          background: 'linear-gradient(135deg, #faf5ff 0%, #f0f9ff 50%, #faf5ff 100%)',
          padding: 'calc(64px + clamp(2rem, 5vw, 4rem)) 1.25rem clamp(3rem, 8vw, 6rem)',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '3rem' }}>
          {/* Left */}
          <div style={{ flex: '1 1 320px', minWidth: 0 }}>
            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ede9fe', border: '1px solid #ddd6fe', borderRadius: '100px', padding: '0.4rem 1rem', marginBottom: '1.5rem', fontSize: '0.82rem', color: '#6d28d9', fontWeight: 600 }}>
              <Zap size={13} fill="#6d28d9" /> Turn followers into customers
            </div>

            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2.2rem, 6vw, 3.5rem)', lineHeight: 1.15, color: '#0f172a', marginBottom: '1.25rem', letterSpacing: '-0.03em' }}>
              Turn Your Instagram Bio<br />
              Into a <span className="gradient-text">Lead Machine</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 2.5vw, 1.15rem)', color: '#64748b', maxWidth: '480px', marginBottom: '2rem', lineHeight: 1.65 }}>
              Capture leads and start WhatsApp conversations instantly.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '2rem' }}>
              <Link
                to="/auth?mode=signup"
                className="btn-primary"
                style={{ padding: '0.875rem 1.75rem', fontSize: '0.95rem', borderRadius: '12px', boxShadow: '0 8px 24px rgba(109,40,217,0.3)' }}
              >
                Create Your Page Free <ArrowRight size={18} />
              </Link>
              <a
                href="#demo"
                className="btn-outline"
                style={{ padding: '0.875rem 1.5rem', fontSize: '0.95rem', borderRadius: '12px' }}
              >
                View Demo
              </a>
            </div>

            {/* Trust bar */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', color: '#64748b', fontSize: '0.82rem' }}>
              {[
                { icon: '💳', label: 'No credit card required' },
                { icon: '⚡', label: 'Setup in 2 minutes' },
                { icon: '👥', label: 'Trusted by 10,000+ creators' },
              ].map(item => (
                <span key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <span>{item.icon}</span> {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right — phone */}
          <div id="demo" style={{ flex: '0 1 340px', display: 'flex', justifyContent: 'center', minWidth: 0, paddingRight: '80px' }}>
            <PhoneMockup />
          </div>
        </div>
      </section>

      {/* ── LOSING CUSTOMERS SECTION ── */}
      <section style={{ padding: '5rem 1.25rem', background: '#fff', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem', color: '#ef4444', letterSpacing: '-0.02em' }}>
            You're losing customers daily
          </h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
            If you only have a basic bio link, you are missing out on potential sales and leads.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'left' }}>
            <div style={{ padding: '2rem', background: '#fef2f2', borderRadius: '16px', border: '1px solid #fee2e2' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>🙈</div>
              <h3 style={{ fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem' }}>Visitors Don't Message</h3>
              <p style={{ color: '#b91c1c', fontSize: '0.9rem', lineHeight: 1.6 }}>People click your link but find it too hard to start a conversation with you.</p>
            </div>
            <div style={{ padding: '2rem', background: '#fef2f2', borderRadius: '16px', border: '1px solid #fee2e2' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>📉</div>
              <h3 style={{ fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem' }}>No Lead Capture</h3>
              <p style={{ color: '#b91c1c', fontSize: '0.9rem', lineHeight: 1.6 }}>Without a form, you have no way to collect phone numbers and follow up.</p>
            </div>
            <div style={{ padding: '2rem', background: '#fef2f2', borderRadius: '16px', border: '1px solid #fee2e2' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>💸</div>
              <h3 style={{ fontWeight: 700, color: '#991b1b', marginBottom: '0.5rem' }}>Lost Opportunities</h3>
              <p style={{ color: '#b91c1c', fontSize: '0.9rem', lineHeight: 1.6 }}>Every uncaptured lead is potential revenue walking out the door.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES BAR ── */}
      <section id="features" style={{ padding: '4rem 1.25rem', borderBottom: '1px solid #f1f5f9' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem' }}>
          {[
            { icon: '👥', color: '#6d28d9', bg: '#ede9fe', title: 'Lead Capture', desc: 'Collect leads with a simple form and grow your audience.' },
            { icon: '💬', color: '#25d366', bg: '#dcfce7', title: 'WhatsApp Integration', desc: 'Start WhatsApp conversations with one tap.' },
            { icon: '🔗', color: '#0ea5e9', bg: '#e0f2fe', title: 'Custom Bio Page', desc: 'Beautiful, fast and mobile friendly bio link pages.' },
            { icon: '⚡', color: '#f59e0b', bg: '#fef3c7', title: 'Instant Setup', desc: 'Create your page in less than 2 minutes. No coding.' },
          ].map(f => (
            <div key={f.title} style={{ padding: '1.5rem', borderRadius: '16px', border: '1px solid #f1f5f9', background: '#fafafa' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.875rem', fontSize: '1.25rem' }}>
                {f.icon}
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem', color: '#0f172a' }}>{f.title}</h3>
              <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ padding: '6rem 1.25rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', background: '#ede9fe', color: '#6d28d9', fontSize: '0.8rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
            HOW IT WORKS
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '4rem', letterSpacing: '-0.02em' }}>
            3 Simple Steps to More Leads
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
            {[
              { num: '1', icon: '✏️', title: 'Create Your Page', desc: 'Add your details, links and customize your bio link page.' },
              { num: '2', icon: '🔗', title: 'Share Your Link', desc: 'Share the link in your bio, stories, posts or anywhere.' },
              { num: '3', icon: '💬', title: 'Get WhatsApp Leads', desc: 'Visitors contact you and you get real leads on WhatsApp.' },
            ].map((s, i) => (
              <div key={s.num} style={{ position: 'relative', padding: '2rem 1.5rem', background: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                {/* Connector dot (desktop) */}
                {i < 2 && (
                  <div style={{ position: 'absolute', top: '2rem', right: '-1.5rem', color: '#e2e8f0', fontSize: '1.2rem', zIndex: 2 }}>···</div>
                )}
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#ede9fe', border: '2px dashed #c4b5fd', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', fontSize: '0.9rem', color: '#6d28d9', fontWeight: 800 }}>
                  {s.num}
                </div>
                <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem', color: '#0f172a' }}>{s.title}</h3>
                <p style={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ padding: '6rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-block', background: '#ede9fe', color: '#6d28d9', fontSize: '0.8rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              PRICING
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              Simple, Transparent Pricing
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', alignItems: 'start' }}>
            {/* FREE */}
            <div style={{ background: '#fff', border: '1.5px solid #e2e8f0', borderRadius: '20px', padding: '2.5rem 2rem' }}>
              <div style={{ fontWeight: 700, color: '#374151', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Free</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Perfect for testing</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '2rem' }}>₹0<span style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}>/month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
                {[
                  '1 Bio Link Page',
                  '3 Links Limit',
                  'LinkSync Branding',
                  'Basic Analytics'
                ].map(f => (
                  <li key={f} style={{ fontSize: '0.9rem', color: '#374151', paddingLeft: '0.5rem' }}>
                    • {f}
                  </li>
                ))}
                {[
                  'WhatsApp Button',
                  'Lead Capture Form'
                ].map(f => (
                  <li key={f} style={{ fontSize: '0.9rem', color: '#94a3b8', opacity: 0.6, paddingLeft: '0.5rem' }}>
                    • {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" style={{ display: 'block', textAlign: 'center', padding: '0.85rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s' }}>
                Create Your Page Free
              </Link>
            </div>

            {/* BASIC */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '2.5rem 2rem' }}>
              <div style={{ fontWeight: 700, color: '#374151', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Basic</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>For active creators</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '2rem' }}>₹99<span style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}>/month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
                {[
                  '10 Links Limit',
                  'WhatsApp Button',
                  'LinkSync Branding',
                  'Basic Analytics',
                  '7-Day Free Trial'
                ].map(f => (
                  <li key={f} style={{ fontSize: '0.9rem', color: '#374151', paddingLeft: '0.5rem' }}>
                    • {f}
                  </li>
                ))}
                {[
                  'Remove Branding',
                  'Lead Capture Form'
                ].map(f => (
                  <li key={f} style={{ fontSize: '0.9rem', color: '#94a3b8', opacity: 0.6, paddingLeft: '0.5rem' }}>
                    • {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" style={{ display: 'block', textAlign: 'center', padding: '0.85rem', borderRadius: '12px', border: '1.5px solid #e2e8f0', color: '#374151', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'all 0.2s' }}>
                Start 7-Day Trial
              </Link>
            </div>

            {/* PRO */}
            <div style={{ background: '#fff', border: '2px solid #6d28d9', borderRadius: '20px', padding: '2.5rem 2rem', position: 'relative', boxShadow: '0 8px 32px rgba(109,40,217,0.15)' }}>
              <div style={{ position: 'absolute', top: '0', right: '1.5rem', transform: 'translateY(-50%)', background: '#6d28d9', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.875rem', borderRadius: '100px' }}>
                MOST POPULAR
              </div>
              <div style={{ fontWeight: 700, color: '#374151', marginBottom: '0.4rem', fontSize: '1.1rem' }}>Pro</div>
              <div style={{ color: '#64748b', fontSize: '0.85rem', marginBottom: '1.5rem' }}>For growing businesses</div>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0f172a', marginBottom: '2rem' }}>₹299<span style={{ fontSize: '1rem', fontWeight: 500, color: '#94a3b8' }}>/month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
                {[
                  'Unlimited Links',
                  'Remove Branding',
                  'Lead Capture Form',
                  'Leads Dashboard',
                  'WhatsApp Integration',
                  'Priority Support',
                  'Full Analytics Dashboard'
                ].map(f => (
                  <li key={f} style={{ fontSize: '0.9rem', color: '#374151', paddingLeft: '0.5rem' }}>
                    • {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="btn-primary" style={{ display: 'block', textAlign: 'center', padding: '0.9rem', borderRadius: '12px', fontSize: '0.95rem', boxShadow: '0 6px 20px rgba(109,40,217,0.3)' }}>
                Start 7-Day Trial
              </Link>
            </div>
          </div>

          {/* Comparison Table */}
          <div style={{ marginTop: '5rem', overflowX: 'auto' }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.5rem', textAlign: 'center', marginBottom: '3rem', color: '#0f172a' }}>
              Detailed Plan Comparison
            </h3>
            <div style={{ minWidth: '800px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '0.85rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Features</th>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', textAlign: 'center' }}>Free</th>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '0.95rem', fontWeight: 800, color: '#0f172a', textAlign: 'center' }}>Basic</th>
                    <th style={{ padding: '1.5rem 2rem', fontSize: '0.95rem', fontWeight: 800, color: '#6d28d9', textAlign: 'center' }}>Pro</th>
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
                      <td style={{ padding: '1.25rem 2rem', fontSize: '0.95rem', fontWeight: 600, color: '#374151' }}>{row.f}</td>
                      <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', color: '#64748b', textAlign: 'center' }}>{row.free}</td>
                      <td style={{ padding: '1.25rem 2rem', fontSize: '0.9rem', color: row.basicColor || '#64748b', textAlign: 'center', fontWeight: row.basicColor ? 700 : 500 }}>{row.basic}</td>
                      <td style={{ padding: '1.25rem 2rem', fontSize: '0.95rem', color: row.proColor || '#6d28d9', textAlign: 'center', fontWeight: 700 }}>{row.pro}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ textAlign: 'center', marginTop: '2rem', color: '#94a3b8', fontSize: '0.85rem' }}>
              All prices are in INR (₹). Subscription can be cancelled anytime.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: '6rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ display: 'inline-block', background: '#ede9fe', color: '#6d28d9', fontSize: '0.8rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '100px', marginBottom: '1rem', letterSpacing: '0.05em' }}>
              FAQ
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', letterSpacing: '-0.02em' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { q: 'Is LinkSync free?', a: 'Yes, we offer a free plan with basic features. Paid plans unlock advanced tools.' },
              { q: 'How long does it take to set up?', a: 'You can create your page in less than 2 minutes.' },
              { q: 'Does it work with WhatsApp?', a: 'Yes, users can directly message you via WhatsApp from your bio page.' },
              { q: 'Can I collect leads?', a: 'Yes, our Pro plan allows you to collect and manage leads easily.' },
              { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription anytime.' },
              { q: 'Do I need coding skills?', a: 'No, LinkSync is designed to be simple and easy to use.' },
            ].map((faq, i) => (
              <div key={i} style={{ padding: '1.5rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '1rem', marginBottom: '0.5rem' }}>{faq.q}</h3>
                <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '5rem 1.25rem', background: 'linear-gradient(135deg, #faf5ff, #f0f9ff)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2.5rem', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: '1 1 300px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '1.75rem' }}>
              🚀
            </div>
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', color: '#0f172a', marginBottom: '0.5rem', lineHeight: 1.25 }}>
                Start Getting Customers<br />From Your Bio Today
              </h2>
              <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
                Join 10,000+ creators and businesses who are<br />
                growing their business with LinkSync.
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.75rem', flex: '0 0 auto' }}>
            <Link
              to="/auth?mode=signup"
              className="btn-primary"
              style={{ padding: '0.9rem 2rem', fontSize: '1rem', borderRadius: '12px', boxShadow: '0 8px 24px rgba(109,40,217,0.3)', whiteSpace: 'nowrap' }}
            >
              Create Your Page Free <ArrowRight size={18} />
            </Link>
            <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
              No credit card required • Setup in 2 minutes
            </span>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid #f1f5f9', padding: '2.5rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <Logo size={28} />
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link to="/privacy" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy Policy</Link>
            <Link to="/terms" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Terms of Service</Link>
            <Link to="/refund" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Refund Policy</Link>
            <a href="mailto:support@linksync.in" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Support</a>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>© 2026 Developed by XenFirm Technologies</p>
        </div>
      </footer>
    </div>
  )
}
