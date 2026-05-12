import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { 
  ArrowRight, CheckCircle2, MessageCircle, Users, Link2, 
  Clock, Zap, Shield, Star, Mail, Send, Check, 
  HelpCircle, ChevronDown, ChevronUp, PlayCircle,
  TrendingUp, Layout, Smartphone, X
} from 'lucide-react'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

/* ─── Phone Mockup ─── */
function PhoneMockup() {
  return (
    <div style={{ position: 'relative', width: '280px', margin: '0 auto', flexShrink: 0 }}>
      {/* Soft background glow */}
      <div style={{ position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)', width: '320px', height: '320px', background: 'radial-gradient(circle, rgba(129,51,194,0.1) 0%, transparent 70%)', filter: 'blur(40px)', zIndex: 0 }} />

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
              Anjali Sharma <CheckCircle2 size={14} fill="#8133C2" color="white" />
            </div>
            <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '0.25rem', lineHeight: 1.4 }}>Helping creators grow their<br />brand & revenue online ✨</div>
          </div>

          {/* WhatsApp CTA - Highlighted */}
          <button style={{ width: '100%', padding: '0.75rem', borderRadius: '12px', border: 'none', background: '#22c55e', color: 'white', fontWeight: 800, fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', boxShadow: '0 4px 12px rgba(34,197,94,0.2)' }}>
            <MessageCircle size={16} fill="white" /> Chat on WhatsApp
          </button>

          {/* Featured Link */}
          <div style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: '12px', border: '2px solid #8133C2', background: 'rgba(129,51,194,0.05)', color: '#8133C2', fontSize: '0.8rem', fontWeight: 800, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            Book My 1:1 Consultation 📅
          </div>

          {/* Links */}
          {[
            { icon: '🛒', label: 'My Store' },
            { icon: '📺', label: 'Watch My YouTube' },
          ].map(l => (
            <div key={l.label} style={{ width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', border: '1px solid #f1f5f9', background: '#fff', color: '#0f172a', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
              <span style={{ fontSize: '0.8rem' }}>{l.icon}</span>{l.label}
            </div>
          ))}

          {/* Lead Form */}
          <div style={{ marginTop: '1.25rem', padding: '1rem', background: '#fafafa', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>Leave an inquiry</div>
            <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '0.5rem 0.75rem', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.7rem', marginBottom: '0.5rem', outline: 'none' }} />
            <button style={{ width: '100%', background: '#8133C2', color: 'white', border: 'none', borderRadius: '8px', padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}>Submit</button>
          </div>
        </div>
      </div>

      {/* Lead notification badge */}
      <div style={{ position: 'absolute', top: '10%', right: '-45%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '0.75rem 1rem', boxShadow: '0 12px 32px rgba(0,0,0,0.1)', zIndex: 3, minWidth: '180px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" style={{ width: '32px', height: '32px', borderRadius: '50%' }} alt="Lead" />
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0f172a' }}>New Inquiry!</span>
              <Zap size={10} fill="#BFCF1A" color="#BFCF1A" />
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 500 }}>Rohit Kumar</div>
          </div>
        </div>
      </div>

      {/* Stats badge */}
      <div style={{ position: 'absolute', bottom: '15%', left: '-40%', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '1rem', boxShadow: '0 12px 32px rgba(0,0,0,0.1)', zIndex: 3, textAlign: 'left', minWidth: '160px' }}>
        <div style={{ fontSize: '0.7rem', color: '#64748b', fontWeight: 600, marginBottom: '0.25rem' }}>Conversion Rate</div>
        <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', lineHeight: 1 }}>24.8%</div>
        <div style={{ fontSize: '0.65rem', color: '#22c55e', fontWeight: 700, marginTop: '0.25rem' }}>↑ 12% <span style={{ color: '#94a3b8', fontWeight: 500 }}>vs Linktree</span></div>
      </div>
    </div>
  )
}

/* ─── Accordion Item ─── */
function FAQItem({ question, answer }: { question: string, answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid #f1f5f9', padding: '1.5rem 0' }}>
      <button 
        onClick={() => setOpen(!open)}
        style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '1rem' }}
      >
        <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a' }}>{question}</span>
        {open ? <ChevronUp size={20} color="#94a3b8" /> : <ChevronDown size={20} color="#94a3b8" />}
      </button>
      {open && (
        <div style={{ marginTop: '1rem', color: '#64748b', lineHeight: 1.6, fontSize: '0.95rem' }}>
          {answer}
        </div>
      )}
    </div>
  )
}

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
          background: 'radial-gradient(circle at 90% 10%, rgba(129,51,194,0.04) 0%, transparent 40%), radial-gradient(circle at 10% 90%, rgba(191,207,26,0.04) 0%, transparent 40%)',
          padding: 'calc(64px + clamp(2rem, 8vw, 4rem)) 1.25rem clamp(3rem, 10vw, 6rem)',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 'clamp(2rem, 5vw, 4rem)' }}>
          {/* Left */}
          <div style={{ flex: '1 1 500px', minWidth: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', padding: '0.6rem 1.25rem', background: 'rgba(129,51,194,0.08)', borderRadius: '100px', color: '#8133C2', fontWeight: 800, fontSize: '0.85rem', marginBottom: '1.5rem', border: '1px solid rgba(129,51,194,0.15)' }}>
                <Zap size={14} fill="#8133C2" /> Trusted by 12,000+ Indian creators
              </div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#0f172a', lineHeight: 1.05, letterSpacing: '-0.04em', marginBottom: '1.5rem' }}>
                Turn your Instagram bio into <span style={{ color: '#8133C2' }}>WhatsApp leads</span> and sales.
              </h1>
              <p style={{ color: '#64748b', fontSize: 'clamp(1.1rem, 2.5vw, 1.25rem)', lineHeight: 1.6, marginBottom: '2.5rem', maxWidth: '600px' }}>
                LinkSync helps creators, freelancers, and small businesses turn profile visits into real conversations, bookings, and payments from one branded bio page.
              </p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                <Link
                  to="/auth?mode=signup"
                  className="btn-primary"
                  style={{ padding: '1.1rem 2.5rem', fontSize: '1.05rem', borderRadius: '14px', boxShadow: '0 10px 25px rgba(129,51,194,0.2)' }}
                >
                  Start free
                </Link>
                <Link
                  to="/import-linktree"
                  className="btn-outline"
                  style={{ padding: '1.1rem 2rem', fontSize: '1.05rem', borderRadius: '14px', background: '#fff' }}
                >
                  Import my Linktree
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '2rem', opacity: 0.7 }}>
                 <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>2.4M+</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Monthly Clicks</div>
                 </div>
                 <div style={{ width: '1px', height: '30px', background: '#e2e8f0' }} />
                 <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#0f172a' }}>450k+</div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Leads Generated</div>
                 </div>
              </div>
          </div>

          {/* Right — mockup */}
          <div style={{ flex: '1 1 500px', display: 'flex', justifyContent: 'center', position: 'relative' }}>
             <img 
               src="/images/dashboard.png" 
               alt="LinkSync Dashboard"
               style={{ width: '100%', maxWidth: '600px', borderRadius: '24px', boxShadow: '0 30px 60px rgba(0,0,0,0.12)', border: '8px solid white' }}
             />
             <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: 'white', padding: '1rem 1.5rem', borderRadius: '16px', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <TrendingUp size={18} />
                </div>
                <span style={{ fontWeight: 800, color: '#0f172a', fontSize: '0.9rem' }}>+42% Lead Lift</span>
             </div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
              Your bio should do more than list links.
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#64748b', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Most bio tools simply send visitors away. That means fewer inquiries, weaker branding, and missed conversions from the traffic you already worked hard to earn.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                'Visitors click and leave without contacting you.',
                'Your page looks generic instead of branded.',
                'You cannot easily guide people to WhatsApp, bookings, or offers.',
                'You miss what is working because the data is too basic.'
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   <X size={20} color="#e11d48" style={{ flexShrink: 0 }} />
                   <span style={{ fontWeight: 600, color: '#374151' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ flex: '1 1 400px', background: '#fff', padding: '3rem', borderRadius: '32px', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.02)', textAlign: 'center' }}>
             <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: '#fff1f2', color: '#e11d48', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <Smartphone size={32} />
             </div>
             <h3 style={{ fontWeight: 800, fontSize: '1.5rem', color: '#0f172a', marginBottom: '1rem' }}>The "Link in Bio" Trap</h3>
             <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>Generic pages don't capture intent. They just bounce visitors to other platforms where you lose control.</p>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1.5rem', letterSpacing: '-0.04em' }}>
            LinkSync turns one bio link into a <span style={{ color: '#8133C2' }}>conversion funnel</span>.
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#64748b', marginBottom: '5rem', lineHeight: 1.6, maxWidth: '800px', margin: '0 auto 5rem' }}>
            Instead of a plain list of links, LinkSync gives you a focused page that helps people take action. Capture leads, start WhatsApp chats, and highlight offers.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
            {[
              { num: '1', title: 'Create your Page', desc: 'Create your LinkSync page in minutes with a clean, branded layout.' },
              { num: '2', title: 'Add your Best Links', desc: 'Add your links, WhatsApp button, and your featured high-value offer.' },
              { num: '3', title: 'Start Getting Leads', desc: 'Share one bio link and start getting more inquiries and conversations.' },
            ].map((s, i) => (
              <div key={s.num} style={{ textAlign: 'left', padding: '2.5rem', background: '#fff', borderRadius: '24px', border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#8133C2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, marginBottom: '1.5rem' }}>
                  {s.num}
                </div>
                <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '1rem', color: '#0f172a' }}>{s.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT DEMO ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '5rem', alignItems: 'center' }}>
          <div style={{ flex: '1 1 400px', order: 2 }}>
             <img 
               src="/images/dashboard.png" 
               alt="LinkSync Dashboard"
               style={{ width: '100%', borderRadius: '32px', boxShadow: '0 40px 80px rgba(0,0,0,0.15)', border: '1px solid #e2e8f0' }}
             />
          </div>
          <div style={{ flex: '1 1 400px', order: 1 }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1.5rem', letterSpacing: '-0.03em' }}>
              Built for performance, not just looks.
            </h2>
            <p style={{ fontSize: '1.15rem', color: '#64748b', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              Our dashboard gives you the tools to optimize your conversion funnel in seconds. No complex charts—just the numbers that matter to your business.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
              {[
                { icon: <Smartphone size={18} />, label: 'Mobile-first' },
                { icon: <TrendingUp size={18} />, label: 'Lead Tracking' },
                { icon: <Layout size={18} />, label: 'Smart Layouts' },
                { icon: <Zap size={18} />, label: 'Instant Updates' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', color: '#0f172a', fontWeight: 700 }}>
                  <span style={{ color: '#8133C2' }}>{item.icon}</span> {item.label}
                </div>
              ))}
            </div>
            <Link to="/auth?mode=signup" className="btn-primary" style={{ padding: '1.25rem 4rem', fontSize: '1.1rem', borderRadius: '16px' }}>
              Build my page
            </Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fafafa' }} id="features">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}>
              Everything you need to convert profile visits
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <MessageCircle size={28} />, title: 'Get more leads', copy: 'Turn profile visitors into WhatsApp chats, booking requests, and direct inquiries instead of losing them to random clicks.' },
              { icon: <Zap size={28} />, title: 'Sell with less friction', copy: 'Highlight one offer, one product, one booking link, or one payment destination so people know exactly what to do next.' },
              { icon: <Layout size={28} />, title: 'Look more professional', copy: 'Use a clean branded page that matches your business or creator identity instead of a generic template.' },
              { icon: <TrendingUp size={28} />, title: 'Track what gets clicks', copy: 'See which buttons, offers, and pages bring results so you can improve what you promote.' },
            ].map(b => (
              <div key={b.title} style={{ padding: '2.5rem', background: '#fff', borderRadius: '24px', border: '1px solid #f1f5f9' }}>
                <div style={{ color: '#8133C2', marginBottom: '1.5rem' }}>{b.icon}</div>
                <h3 style={{ fontWeight: 800, fontSize: '1.25rem', marginBottom: '1rem', color: '#0f172a' }}>{b.title}</h3>
                <p style={{ color: '#64748b', lineHeight: 1.6 }}>{b.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE & AFTER ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
             <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}>
              From “just links” to real actions
            </h2>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center', justifyContent: 'center' }}>
            {/* Before */}
            <div style={{ flex: '0 1 340px', opacity: 0.6 }}>
               <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#64748b', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>Typical bio tool</div>
               <div style={{ border: '1px solid #e2e8f0', borderRadius: '32px', padding: '2rem 1.5rem', background: '#f8fafc' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#e2e8f0', margin: '0 auto 2rem' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[1,2,3,4,5].map(i => <div key={i} style={{ height: '44px', background: '#e2e8f0', borderRadius: '10px' }} />)}
                  </div>
               </div>
               <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#94a3b8', fontSize: '0.95rem' }}>A stack of links with no clear next step.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
               <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(129,51,194,0.05)', color: '#8133C2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ArrowRight size={24} />
               </div>
            </div>

            {/* After */}
            <div style={{ flex: '0 1 340px' }}>
               <div style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#8133C2', fontWeight: 800, fontSize: '0.9rem', textTransform: 'uppercase' }}>LinkSync</div>
               <div style={{ border: '2px solid #8133C2', borderRadius: '32px', padding: '2rem 1.5rem', background: '#fff', boxShadow: '0 20px 40px rgba(129,51,194,0.15)' }}>
                  <div style={{ height: '44px', background: '#8133C2', borderRadius: '10px', marginBottom: '0.75rem' }} />
                  <div style={{ height: '44px', border: '1.5px solid #8133C2', background: 'rgba(129,51,194,0.05)', borderRadius: '100px', marginBottom: '1.5rem' }} />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {[1,2].map(i => <div key={i} style={{ height: '44px', background: '#f1f5f9', borderRadius: '10px' }} />)}
                  </div>
               </div>
               <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#374151', fontWeight: 600 }}>A focused page with your best offer and clear CTAs.</p>
            </div>
          </div>

          <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
             {[
               'Better for lead generation',
               'Better for local businesses',
               'Better for creators selling services',
               'Better for WhatsApp-first conversions'
             ].map(item => (
               <div key={item} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', background: '#f8fafc', padding: '1.25rem', borderRadius: '16px' }}>
                 <CheckCircle2 size={18} color="#22c55e" style={{ flexShrink: 0 }} />
                 <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>{item}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fafafa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}>
              Used by growth-focused creators
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {[
              {
                name: 'Neha Kapoor',
                role: 'Independent Artist',
                text: 'Switching to LinkSync increased my DM inquiries by 40%. The WhatsApp button is a game-changer for my commissions.',
                metrics: '40% more inquiries'
              },
              {
                name: 'Rahul Mehta',
                role: 'Fitness Coach',
                text: 'I used to lose people between Instagram and my booking site. Now, they go straight to WhatsApp and I close sales instantly.',
                metrics: 'Closed 12 new clients in 1 week'
              },
              {
                name: 'Priya Das',
                role: 'D2C Brand Owner',
                text: 'The branded page looks so professional compared to Linktree. Our conversion rate on product links has doubled.',
                metrics: '2x higher CTR'
              },
            ].map((t, i) => (
              <div key={i} style={{ background: '#fff', padding: '2.5rem', borderRadius: '24px', border: '1px solid #f1f5f9', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.25rem' }}>
                   {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="#ffb800" color="#ffb800" />)}
                </div>
                <p style={{ fontSize: '1.1rem', color: '#334155', lineHeight: 1.6, marginBottom: '2rem', fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9' }} />
                  <div>
                    <h4 style={{ fontWeight: 800, color: '#0f172a', fontSize: '1rem' }}>{t.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>{t.role}</p>
                  </div>
                </div>
                <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9', color: '#16a34a', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                   <TrendingUp size={16} /> {t.metrics}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fff' }} id="pricing">
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.04em' }}>
              Simple pricing for creators
            </h2>
            <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '1rem' }}>Start free and upgrade when you are ready to grow.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* FREE */}
            <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: '32px', padding: '3.5rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Free</div>
              <div style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>Best for testing your first bio page</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '2.5rem' }}>₹0<span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#94a3b8' }}>/month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {['Create your page', 'Add your key links', 'Publish fast', 'Basic customization'].map(f => (
                  <li key={f} style={{ fontSize: '1rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="#8133C2" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="btn-outline" style={{ marginTop: 'auto', padding: '1rem', borderRadius: '12px' }}>
                Start free
              </Link>
            </div>

            {/* CREATOR */}
            <div style={{ background: '#fff', border: '2px solid #8133C2', borderRadius: '32px', padding: '3.5rem 2.5rem', position: 'relative', boxShadow: '0 20px 40px rgba(129,51,194,0.1)', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)', background: '#8133C2', color: 'white', fontSize: '0.85rem', fontWeight: 800, padding: '0.5rem 1.5rem', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                BEST VALUE
              </div>
              <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Creator</div>
              <div style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>For more leads and better branding</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '2.5rem' }}>₹99<span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#94a3b8' }}>/month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {['Everything in Free', 'Better customization', 'Featured CTA blocks', 'Click insights', 'Higher conversion setup'].map(f => (
                  <li key={f} style={{ fontSize: '1rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="#8133C2" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="btn-primary" style={{ marginTop: 'auto', padding: '1rem', borderRadius: '12px' }}>
                Start free today
              </Link>
            </div>

            {/* PRO */}
            <div style={{ background: '#fff', border: '1.5px solid #f1f5f9', borderRadius: '32px', padding: '3.5rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem', fontSize: '1.5rem' }}>Pro</div>
              <div style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '2rem' }}>For businesses and serious creators</div>
              <div style={{ fontSize: '3rem', fontWeight: 900, color: '#0f172a', marginBottom: '2.5rem' }}>₹299<span style={{ fontSize: '1.15rem', fontWeight: 600, color: '#94a3b8' }}>/month</span></div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
                {['Everything in Creator', 'Advanced blocks', 'Better tracking', 'Priority support', 'More flexibility'].map(f => (
                  <li key={f} style={{ fontSize: '1rem', color: '#374151', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 size={18} color="#8133C2" /> {f}
                  </li>
                ))}
              </ul>
              <Link to="/auth?mode=signup" className="btn-outline" style={{ marginTop: 'auto', padding: '1rem', borderRadius: '12px' }}>
                Start free today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '8rem 1.25rem', background: '#fafafa' }} id="faq">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', letterSpacing: '-0.03em' }}>
              Common Questions
            </h2>
          </div>
          <div style={{ background: '#fff', borderRadius: '32px', padding: '3rem', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
            <FAQItem 
              question="Is LinkSync really free?" 
              answer="Yes! Our Free plan includes unlimited links and a WhatsApp button forever. We only charge for advanced features like deep analytics, custom branding, and automated lead emails. No credit card is required to start."
            />
            <FAQItem 
              question="How is this different from Linktree?" 
              answer="Unlike Linktree which just lists links, LinkSync is built as a conversion funnel. We prioritize high-action buttons like WhatsApp and Lead Forms to ensure you don't just get 'clicks', but real business inquiries."
            />
            <FAQItem 
              question="Do I need any technical skills?" 
              answer="Not at all. If you can use Instagram, you can use LinkSync. Most users set up their entire page in under 3 minutes. You can even import your existing Linktree page in one click."
            />
            <FAQItem 
              question="Will it work with my Instagram/TikTok bio?" 
              answer="Yes, LinkSync is perfectly optimized for all social media in-app browsers. It loads faster than a standard website, ensuring you don't lose visitors due to slow loading times."
            />
            <FAQItem 
              question="How do I get my leads?" 
              answer="Leads are delivered instantly to your WhatsApp or email. You also get a centralized dashboard to view, manage, and export all your inquiries anytime."
            />
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '8rem 1.25rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 90% 90%, rgba(129,51,194,0.06) 0%, transparent 50%)', zIndex: 0 }} />
        <div style={{ maxWidth: '1000px', margin: '0 auto', background: '#fff', borderRadius: '40px', padding: '5rem 3rem', border: '1px solid #f1f5f9', boxShadow: '0 20px 60px rgba(0,0,0,0.05)', position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: 'clamp(2rem, 5vw, 3rem)', color: '#0f172a', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.04em' }}>
            Stop sending profile visitors to a <span style={{ color: '#8133C2' }}>dead-end link page</span>.
          </h2>
          <p style={{ color: '#64748b', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 3rem', lineHeight: 1.6 }}>
            Turn your bio into a page that gets more chats, more clicks, and more conversions.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
            <Link
              to="/auth?mode=signup"
              className="btn-primary"
              style={{ padding: '1.25rem 3rem', fontSize: '1.1rem', borderRadius: '16px', boxShadow: '0 12px 32px rgba(129,51,194,0.3)' }}
            >
              Start free
            </Link>
            <Link
              to="/import-linktree"
              className="btn-outline"
              style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', borderRadius: '16px', background: '#fff' }}
            >
              Import my Linktree
            </Link>
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
              { 
                title: 'Product', 
                links: [
                  { label: 'Features', href: '#features' },
                  { label: 'Templates', href: '#' },
                  { label: 'Integrations', href: '#' },
                  { label: 'Pricing', href: '#pricing' }
                ] 
              },
              { 
                title: 'Company', 
                links: [
                  { label: 'About Us', href: '#' },
                  { label: 'Blog', href: '#' },
                  { label: 'Careers', href: '#' },
                  { label: 'Contact', href: 'mailto:support@linksync.in' }
                ] 
              },
              { 
                title: 'Resources', 
                links: [
                  { label: 'Help Center', href: '#faq' },
                  { label: 'Guides', href: '#' },
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' }
                ] 
              },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '1.75rem', fontSize: '1.1rem' }}>{col.title}</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {col.links.map(l => (
                    <li key={l.label}>
                      {l.href.startsWith('/') || l.href.startsWith('#') ? (
                        <a 
                          href={l.href} 
                          style={{ color: '#64748b', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.color = '#8133C2'}
                          onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
                        >
                          {l.label}
                        </a>
                      ) : (
                        <a 
                          href={l.href} 
                          style={{ color: '#64748b', textDecoration: 'none', fontSize: '1rem', transition: 'color 0.2s' }}
                          onMouseOver={(e) => e.currentTarget.style.color = '#8133C2'}
                          onMouseOut={(e) => e.currentTarget.style.color = '#64748b'}
                        >
                          {l.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
