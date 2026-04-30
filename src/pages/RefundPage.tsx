import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

export default function RefundPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', paddingTop: '64px' }}>
      <Navbar variant="landing" />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 1.25rem' }}>
        <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2.5rem', marginBottom: '1rem', color: '#0f172a' }}>
          Refund & Cancellation Policy
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '3rem' }}>Last updated: {currentDate}</p>

        <div style={{ color: '#374151', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>Subscriptions</h2>
            <p>LinkSync operates on a subscription-based model. By subscribing to our service, you agree to the terms outlined in this policy.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>Cancellation</h2>
            <p>You can cancel your subscription at any time through your dashboard. Your access to premium features will remain active until the end of your current billing cycle, after which your account will be downgraded to the free plan.</p>
          </section>

          <section style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>Refunds</h2>
            <p>We do not provide refunds for payments already made, except where required by law. All charges are final once processed.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>Changes</h2>
            <p>We may update this policy at any time to reflect changes in our services or legal requirements. Continued use of the platform after updates constitutes acceptance of the new policy.</p>
          </section>

          <section>
            <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>Contact</h2>
            <p>If you have any questions about our refund or cancellation policy, please contact us at:</p>
            <p style={{ fontWeight: 600, color: '#6d28d9', marginTop: '0.5rem' }}>📧 support@linksync.in</p>
          </section>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #f1f5f9', padding: '2.5rem 1.25rem', background: '#fff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <Logo size={28} />
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            <a href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Home</a>
            <a href="mailto:support@linksync.in" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.85rem' }}>Support</a>
          </div>
          <p style={{ color: '#94a3b8', fontSize: '0.8rem' }}>© 2026 Developed by XenFirm Technologies</p>
        </div>
      </footer>
    </div>
  )
}
