import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

export default function TermsPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '64px' }}>
      <Navbar variant="landing" />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem', color: '#0f172a' }}>
          Terms of Service
        </h1>
        <div style={{ color: '#374151', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>1. Introduction</h2>
            <p>These Terms of Service (“Terms”) govern your use of LinkSync (“we”, “our”, “us”). By using our platform, you agree to these Terms in accordance with applicable Indian laws.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>2. Service Description</h2>
            <p>LinkSync provides tools to create bio pages, collect leads, and enable communication via platforms like WhatsApp. We act as a technology provider only and do not control user interactions.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>3. Eligibility</h2>
            <p>You must be at least 18 years old and comply with all applicable Indian laws.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>4. User Responsibilities</h2>
            <p>You agree to provide accurate information, not to misuse collected leads, and to obtain proper consent before collecting personal data under Indian IT laws.</p>
          </section>

          <section style={{ background: '#fff1f2', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fecdd3' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>5. Prohibited Use</h2>
            <p>You must NOT use LinkSync for: spam, fraud, collecting sensitive data (OTP, passwords), or any illegal/harmful activities.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>6. Data Responsibility</h2>
            <p>You are solely responsible for how you use collected leads and compliance with data protection laws in India. We are not responsible for misuse of data collected via your pages.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>7. Payments & Billing</h2>
            <p>Subscription plans are billed monthly. Payments are non-refundable unless required by law. We may change pricing with prior notice.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>8. Service Availability</h2>
            <p>We strive to keep LinkSync available but do not guarantee uninterrupted or error-free operation.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by Indian law, LinkSync shall not be liable for loss of business, profits, or data loss.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>10. Indemnity</h2>
            <p>You agree to indemnify LinkSync from misuse of the platform, violation of laws, or claims arising from your content.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>11. Termination</h2>
            <p>We may suspend or terminate accounts for violation of terms or suspicious activity.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>12. Governing Law</h2>
            <p>These Terms are governed by the laws of India. Disputes shall be subject to jurisdiction of courts in Chennai.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>13. Contact</h2>
            <p><strong>Email:</strong> support@linksync.in</p>
          </section>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #f1f5f9', padding: '2.5rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <Logo size={28} />
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <Link to="/privacy" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Privacy</Link>
            <Link to="/refund" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Refund Policy</Link>
            <a href="mailto:support@linksync.in" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Support</a>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>© 2026 Developed by XenFirm Technologies</p>
        </div>
      </footer>
    </div>
  )
}
