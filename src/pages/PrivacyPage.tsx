import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

export default function PrivacyPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Navbar variant="landing" />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2.5rem', marginBottom: '2rem', color: '#0f172a' }}>
          Privacy Policy
        </h1>
        <div style={{ color: '#374151', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>1. Introduction</h2>
            <p>This Privacy Policy explains how LinkSync collects, uses, and protects user data in compliance with Indian regulations.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>2. Data We Collect</h2>
            <p><strong>From Users:</strong> Name, Email, Account details.</p>
            <p><strong>From Visitors (Leads):</strong> Name, Phone number.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>3. Purpose of Data Collection</h2>
            <p>We use data to: Provide our services, enable lead capture, and improve platform performance.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>4. Legal Basis (India Context)</h2>
            <p>We process data based on user consent and legitimate business use. Users must ensure they have consent from their leads.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>5. Data Sharing</h2>
            <p>We do NOT sell personal data. We may share data with infrastructure providers (hosting, DB) and legal authorities if required.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>6. Data Storage & Security</h2>
            <p>Data is stored securely using services like Supabase. We implement reasonable security practices under the IT Act, 2000.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>7. User Rights</h2>
            <p>You can access your data, request corrections, or request deletion.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>8. Retention</h2>
            <p>We retain data only as long as necessary for service operation and legal compliance.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>9. Third-Party Services</h2>
            <p>We may integrate with WhatsApp and Payment providers. Their policies apply separately.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>10. Cookies</h2>
            <p>We may use cookies to improve performance and track usage.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>11. Changes to Policy</h2>
            <p>We may update this policy. Continued use means acceptance.</p>
          </section>

          <section style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>12. Grievance Officer</h2>
            <p>As per Indian IT rules:</p>
            <p><strong>Email:</strong> support@linksync.in</p>
            <p>Response time: within 30 days</p>
          </section>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #f1f5f9', padding: '2.5rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <Logo size={28} />
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <Link to="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Home</Link>
            <Link to="/terms" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Terms</Link>
            <Link to="/refund" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Refund Policy</Link>
            <a href="mailto:support@linksync.in" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Support</a>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>© 2026 Developed by XenFirm Technologies</p>
        </div>
      </footer>
    </div>
  )
}
