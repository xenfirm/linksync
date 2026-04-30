import { Link } from 'react-router-dom'
import {
  Zap, ArrowRight, MessageCircle, Users, Link2,
  Star, CheckCircle2, ChevronRight, XCircle, AlertCircle,
  Smartphone, Target, MousePointerClick, CreditCard, Award
} from 'lucide-react'
import Logo from '../components/Logo'
import Navbar from '../components/Navbar'

// Mock Bio Page Preview Component
function MockBioPage() {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
        borderRadius: '20px',
        padding: '2rem 1.5rem',
        border: '1px solid #334155',
        maxWidth: '320px',
        margin: '0 auto',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)',
      }}
    >
      {/* Mock profile */}
      <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
            margin: '0 auto 0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'white',
          }}
        >
          JS
        </div>
        <div style={{ fontWeight: 700, color: '#f8fafc', fontSize: '1rem' }}>Jane Smith</div>
        <div style={{ color: '#94a3b8', fontSize: '0.8rem', marginTop: '0.25rem' }}>
          Digital Marketing Expert 🚀
        </div>
      </div>

      {/* WhatsApp button */}
      <button
        style={{
          width: '100%',
          padding: '0.65rem',
          borderRadius: '10px',
          border: 'none',
          background: '#22c55e',
          color: 'white',
          fontWeight: 600,
          fontSize: '0.85rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          marginBottom: '0.6rem',
        }}
      >
        <MessageCircle size={15} fill="white" /> Chat on WhatsApp
      </button>

      {/* Links */}
      {['My Portfolio', 'Services', 'Book a Call'].map((link) => (
        <button
          key={link}
          style={{
            width: '100%',
            padding: '0.55rem',
            borderRadius: '10px',
            border: '1px solid #334155',
            background: 'rgba(51, 65, 85, 0.4)',
            color: '#f8fafc',
            fontWeight: 500,
            fontSize: '0.82rem',
            cursor: 'pointer',
            marginBottom: '0.5rem',
          }}
        >
          {link}
        </button>
      ))}

      {/* Lead form */}
      <div
        style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(14, 165, 233, 0.08)',
          borderRadius: '12px',
          border: '1px solid rgba(14, 165, 233, 0.2)',
        }}
      >
        <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#0ea5e9', marginBottom: '0.6rem' }}>
          Get in Touch
        </div>
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '0.4rem 0.6rem',
            marginBottom: '0.4rem',
            fontSize: '0.75rem',
            color: '#94a3b8',
          }}
        >
          Your Name
        </div>
        <div
          style={{
            background: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid #334155',
            borderRadius: '8px',
            padding: '0.4rem 0.6rem',
            marginBottom: '0.6rem',
            fontSize: '0.75rem',
            color: '#94a3b8',
          }}
        >
          Phone Number
        </div>
        <div
          style={{
            background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
            borderRadius: '8px',
            padding: '0.45rem',
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: 'white',
          }}
        >
          Submit →
        </div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  return (
    <div style={{ background: '#0f172a', minHeight: '100vh', color: '#f8fafc' }}>
      <Navbar variant="landing" />

      {/* 🔥 HERO SECTION */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '7rem 1.5rem 5rem',
          textAlign: 'center',
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(14, 165, 233, 0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '850px', margin: '0 auto' }}>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              background: 'rgba(14, 165, 233, 0.1)',
              border: '1px solid rgba(14, 165, 233, 0.3)',
              borderRadius: '100px',
              padding: '0.35rem 1rem',
              marginBottom: '2rem',
              fontSize: '0.85rem',
              color: '#0ea5e9',
              fontWeight: 600,
            }}
          >
            <Zap size={14} fill="#0ea5e9" /> The #1 Bio Link for Business Growth
          </div>

          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2.5rem, 7vw, 4.2rem)',
              lineHeight: 1.1,
              color: '#f8fafc',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
            }}
          >
            Turn Your Instagram Bio Into a{' '}
            <span className="gradient-text">Lead Machine</span>
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
              color: '#94a3b8',
              maxWidth: '650px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.6,
            }}
          >
            Capture real customer leads, start WhatsApp conversations instantly, and stop losing potential clients — all from one simple bio link.
          </p>

          <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/auth?mode=signup"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
                fontSize: '1.1rem',
                padding: '1rem 2.25rem',
                borderRadius: '14px',
                boxShadow: '0 10px 40px rgba(14, 165, 233, 0.4)',
                transition: 'all 0.2s',
              }}
            >
              Get Your Free Page <ArrowRight size={20} />
            </Link>
            <a
              href="#demo"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(51, 65, 85, 0.5)',
                color: '#f8fafc',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.1rem',
                padding: '1rem 2.25rem',
                borderRadius: '14px',
                border: '1px solid #334155',
                backdropFilter: 'blur(10px)',
              }}
            >
              View Live Demo
            </a>
          </div>

          <div style={{ marginTop: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', color: '#94a3b8', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', gap: '0.1rem' }}>
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#fbbf24" color="#fbbf24" />)}
            </div>
            <span>Used by creators, freelancers, and local businesses to convert profile visits into customers.</span>
          </div>

          <p style={{ color: '#0ea5e9', fontSize: '0.85rem', fontWeight: 600, marginTop: '1.5rem' }}>
            👉 “No coding. No setup. Works instantly.”
          </p>
        </div>
      </section>

      {/* 💡 PROBLEM SECTION */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              marginBottom: '1rem',
              color: '#f8fafc',
            }}
          >
            Most bio links don’t bring you customers
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>You’re getting profile visits… but no messages, no calls, no conversions.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { icon: <MousePointerClick size={24} color="#f87171" />, title: 'People click and leave', desc: 'They visit your link but have no reason to stay or engage.' },
            { icon: <AlertCircle size={24} color="#f87171" />, title: 'No way to capture details', desc: 'You have no idea who visited or how to reach back out to them.' },
            { icon: <XCircle size={24} color="#f87171" />, title: 'No follow-up system', desc: 'Potential clients vanish forever because there is no bridge to a conversation.' }
          ].map((item, i) => (
            <div key={i} className="glass-card" style={{ padding: '2rem', borderRadius: '20px', border: '1px solid rgba(239,68,68,0.1)' }}>
              <div style={{ marginBottom: '1rem' }}>{item.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem', color: '#fca5a5' }}>{item.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <div style={{ display: 'inline-block', padding: '0.75rem 2rem', background: 'rgba(239,68,68,0.1)', borderRadius: '100px', color: '#f87171', fontWeight: 700 }}>
            👉 You’re losing leads every day
          </div>
        </div>
      </section>

      {/* 💥 SOLUTION SECTION */}
      <section style={{ padding: '6rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(14, 165, 233, 0.05), transparent)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 5vw, 3rem)',
                  marginBottom: '1.5rem',
                  lineHeight: 1.2,
                }}
              >
                LinkSync turns <span className="gradient-text">clicks into conversations</span>
              </h2>
              <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '2rem', lineHeight: 1.7 }}>
                With LinkSync, your bio page doesn’t just show links — it captures leads and drives action.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: <Target size={18} />, text: 'Collect customer details instantly' },
                  { icon: <MessageCircle size={18} />, text: 'Start WhatsApp chats in one tap' },
                  { icon: <Link2 size={18} />, text: 'Add all your important links' },
                  { icon: <Smartphone size={18} />, text: 'Simple, fast, mobile-first design' }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                      {item.icon}
                    </div>
                    <span style={{ fontWeight: 600, color: '#f8fafc' }}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: '-20px', background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)', filter: 'blur(40px)' }} />
              <MockBioPage />
            </div>
          </div>
        </div>
      </section>

      {/* 🎯 HOW IT WORKS */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
            marginBottom: '4rem',
          }}
        >
          Get started in 3 steps
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {[
            { step: '01', title: 'Create your page in 2 minutes', desc: 'Sign up and set up your profile without any technical knowledge.' },
            { step: '02', title: 'Share your LinkSync bio link', desc: 'Add your new link to Instagram, TikTok, or your email signature.' },
            { step: '03', title: 'Get leads directly to WhatsApp', desc: 'Watch your leads appear in your dashboard and start chatting instantly.' }
          ].map((s, i) => (
            <div key={i} className="glass-card" style={{ padding: '2.5rem 2rem', borderRadius: '24px', textAlign: 'left', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: '-10px', right: '-10px', fontSize: '6rem', fontWeight: 900, color: 'rgba(14, 165, 233, 0.05)', lineHeight: 1 }}>{s.step}</div>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #0ea5e9, #f97316)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, marginBottom: '1.5rem' }}>{s.step}</div>
              <h3 style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: '0.75rem', color: '#f8fafc' }}>{s.title}</h3>
              <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: 1.6 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 💸 PRICING SECTION */}
      <section style={{ padding: '6rem 1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              marginBottom: '1rem',
            }}
          >
            Pricing optimized for your growth
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Choose the plan that fits your business stage.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* FREE */}
          <div className="glass-card" style={{ padding: '3rem 2rem', borderRadius: '24px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ padding: '0.4rem 1rem', background: 'rgba(148, 163, 184, 0.1)', color: '#94a3b8', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>HOOK PLAN</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '1rem', color: '#f8fafc' }}>Free</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem', color: '#f8fafc' }}>₹0<span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/forever</span></div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> 1 bio page</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Max 3 links</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Basic design</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> LinkSync watermark</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}><XCircle size={18} /> No lead capture</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}><XCircle size={18} /> No WhatsApp CTA</li>
            </ul>
            <Link to="/auth?mode=signup" style={{ display: 'block', textAlign: 'center', padding: '1rem', borderRadius: '14px', border: '1px solid #334155', color: '#f8fafc', textDecoration: 'none', fontWeight: 700, transition: 'all 0.2s' }}>Get Started Free</Link>
          </div>

          {/* BASIC */}
          <div className="glass-card" style={{ padding: '3rem 2rem', borderRadius: '24px', border: '1px solid #334155', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ padding: '0.4rem 1rem', background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>ENTRY PAID</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '1rem', color: '#f8fafc' }}>Basic</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem', color: '#f8fafc' }}>₹99<span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/month</span></div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> 1 bio page</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Up to 10 links</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Remove branding</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Basic customization</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> WhatsApp button ✅</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#475569', fontSize: '0.95rem' }}><XCircle size={18} /> No lead storage</li>
            </ul>
            <Link to="/auth?mode=signup" style={{ display: 'block', textAlign: 'center', padding: '1rem', borderRadius: '14px', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid #0ea5e9', color: '#0ea5e9', textDecoration: 'none', fontWeight: 700 }}>Choose Basic</Link>
          </div>

          {/* PRO */}
          <div className="glass-card" style={{ padding: '3rem 2rem', borderRadius: '24px', border: '2px solid #f97316', display: 'flex', flexDirection: 'column', position: 'relative', background: 'rgba(249, 115, 22, 0.03)' }}>
            <div style={{ position: 'absolute', top: '0', left: '50%', transform: 'translate(-50%, -50%)', background: 'linear-gradient(135deg, #0ea5e9, #f97316)', padding: '0.5rem 1.25rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, color: 'white', whiteSpace: 'nowrap', boxShadow: '0 4px 15px rgba(249, 115, 22, 0.3)' }}>MOST POPULAR</div>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ padding: '0.4rem 1rem', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700 }}>REVENUE PLAN</span>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '1rem', color: '#f8fafc' }}>Pro</h3>
              <div style={{ fontSize: '2.5rem', fontWeight: 900, marginTop: '0.5rem', color: '#f8fafc' }}>₹299<span style={{ fontSize: '1rem', color: '#94a3b8', fontWeight: 500 }}>/month</span></div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2.5rem 0', display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Unlimited links</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Lead capture form ✅</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Leads dashboard ✅</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> WhatsApp integration ✅</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Priority support</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#f8fafc', fontSize: '0.95rem' }}><CheckCircle2 size={18} color="#22c55e" /> Better UI options</li>
            </ul>
            <Link to="/auth?mode=signup" className="btn-gradient" style={{ display: 'block', textAlign: 'center', padding: '1rem', borderRadius: '14px', color: 'white', textDecoration: 'none', fontWeight: 800, boxShadow: '0 8px 25px rgba(249, 115, 22, 0.4)' }}>Go Pro Now</Link>
          </div>
        </div>
      </section>

      {/* 🚀 FINAL CTA */}
      <section style={{ padding: '8rem 1.5rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(2rem, 6vw, 3.2rem)',
              marginBottom: '1.5rem',
              lineHeight: 1.1,
            }}
          >
            Start turning <span className="gradient-text">clicks into customers</span> today
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', marginBottom: '3rem' }}>
            It takes less than 2 minutes to set up your page.
          </p>
          <Link
            to="/auth?mode=signup"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              background: 'linear-gradient(135deg, #0ea5e9, #f97316)',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 800,
              fontSize: '1.25rem',
              padding: '1.25rem 3.5rem',
              borderRadius: '16px',
              boxShadow: '0 15px 50px rgba(14, 165, 233, 0.4)',
            }}
          >
            👉 Create Your LinkSync Page
          </Link>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '1.5rem' }}>
            No credit card required for the free plan.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid #334155',
          padding: '4rem 1.5rem 2rem',
          textAlign: 'center',
          color: '#94a3b8',
          fontSize: '0.9rem',
        }}
      >
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Logo size={28} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '2rem' }}>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
          <a href="#" style={{ color: '#94a3b8', textDecoration: 'none' }}>Support</a>
        </div>
        <p>© {new Date().getFullYear()} LinkSync. All rights reserved.</p>
      </footer>
    </div>
  )
}
