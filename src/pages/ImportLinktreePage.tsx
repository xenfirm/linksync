import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { 
  Link2, ArrowRight, Loader2, CheckCircle2, AlertCircle, 
  ChevronRight, Smartphone, MessageCircle, Zap, 
  Edit3, Trash2, Save, ExternalLink, Sparkles, Plus, Check
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'
import { useLinks } from '../hooks/useLinks'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import Logo from '../components/Logo'

type Step = 'input' | 'progress' | 'review' | 'upgrades' | 'success'

interface ImportedLink {
  id: string
  title: string
  url: string
  active: boolean
}

interface ImportedData {
  name: string
  bio: string
  avatar: string
  links: ImportedLink[]
}

export default function ImportLinktreePage() {
  const [step, setStep] = useState<Step>('input')
  const [url, setUrl] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [checklist, setChecklist] = useState({
    profile: false,
    links: false,
    images: false,
    formatting: false
  })
  
  const [importedData, setImportedData] = useState<ImportedData | null>(null)
  const [saving, setSaving] = useState(false)
  
  const { user } = useAuth()
  const { updateProfile, profile } = useProfile()
  const { addLink } = useLinks()
  const navigate = useNavigate()

  // Handle URL Submission
  const handleStartImport = (e: React.FormEvent) => {
    e.preventDefault()
    if (!url.includes('linktr.ee/')) {
      setError('Please enter a valid Linktree URL (e.g., linktr.ee/yourname)')
      return
    }
    setError(null)
    setStep('progress')
  }

  // Handle Real Import
  useEffect(() => {
    if (step === 'progress') {
      const runImport = async () => {
        try {
          setProgress(20)
          setChecklist(prev => ({ ...prev, profile: true }))
          
          const { data, error: funcError } = await supabase.functions.invoke('import-linktree', {
            body: { url }
          })

          if (funcError) throw funcError
          if (data.error) throw new Error(data.error)

          setProgress(60)
          setChecklist(prev => ({ ...prev, links: true, images: true }))
          
          setImportedData(data)
          setProgress(100)
          setChecklist(prev => ({ ...prev, formatting: true }))
          
          setTimeout(() => setStep('review'), 1000)
        } catch (err: any) {
          console.error('Import error:', err)
          setError(err.message || 'Failed to import. Make sure the profile is public.')
          setStep('input')
        }
      }

      runImport()
    }
  }, [step, url])

  // Handle Publishing
  const handlePublish = async () => {
    if (!user) {
      // If guest, save to session and go to auth
      sessionStorage.setItem('pending_import', JSON.stringify(importedData))
      navigate('/auth?mode=signup&returnTo=/import-linktree')
      return
    }

    setSaving(true)
    try {
      // 1. Update Profile
      if (importedData) {
        await updateProfile({
          name: importedData.name,
          bio: importedData.bio,
          // avatar is tricky with URL, usually we'd download/upload or just use URL
        })

        // 2. Add Links
        for (const link of importedData.links) {
          if (link.active) {
            await addLink(link.title, link.url)
          }
        }
        setStep('success')
      }
    } catch (err) {
      console.error('Publish error:', err)
    }
    setSaving(false)
  }

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar variant="landing" />
      
      <main style={{ flex: 1, padding: 'calc(64px + 2rem) 1.25rem 4rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '100%', maxWidth: step === 'review' || step === 'upgrades' ? '1000px' : '480px' }}>
          
          {/* STEP 1: INPUT */}
          {step === 'input' && (
            <div style={{ background: '#fff', borderRadius: '32px', padding: '3rem 2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '20px', background: '#fff7f2', color: '#ff4d00', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem' }}>
                <Sparkles size={32} fill="#ff4d00" />
              </div>
              <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '2rem', color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
                Import from Linktree
              </h1>
              <p style={{ color: '#64748b', fontSize: '1.05rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Paste your Linktree URL to migrate your links and profile to LinkSync in seconds.
              </p>

              <form onSubmit={handleStartImport} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <div style={{ position: 'relative' }}>
                    <Link2 size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      placeholder="linktr.ee/yourname" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      required
                      style={{ width: '100%', padding: '1rem 1rem 1rem 3rem', borderRadius: '14px', border: '2px solid #f1f5f9', fontSize: '1.05rem', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'Inter, sans-serif' }}
                      onFocus={(e) => e.target.style.borderColor = '#ff4d00'}
                      onBlur={(e) => e.target.style.borderColor = '#f1f5f9'}
                    />
                  </div>
                  {error && <p style={{ color: '#e11d48', fontSize: '0.85rem', marginTop: '0.6rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.4rem', justifyContent: 'center' }}><AlertCircle size={14} /> {error}</p>}
                </div>

                <button 
                  type="submit" 
                  className="btn-primary" 
                  style={{ padding: '1rem', borderRadius: '14px', fontSize: '1.1rem', fontWeight: 800, justifyContent: 'center', gap: '0.75rem', boxShadow: '0 8px 24px rgba(255,77,0,0.2)' }}
                >
                  Import my Linktree <ArrowRight size={20} />
                </button>
              </form>

              <div style={{ marginTop: '2.5rem', paddingTop: '2.5rem', borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'center', gap: '2rem' }}>
                 <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Check size={14} /> Fast Migration
                 </div>
                 <div style={{ fontSize: '0.85rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Check size={14} /> Mobile-ready
                 </div>
              </div>
            </div>
          )}

          {/* STEP 2: PROGRESS */}
          {step === 'progress' && (
            <div style={{ background: '#fff', borderRadius: '32px', padding: '4rem 2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
               <div style={{ position: 'relative', width: '100px', height: '100px', margin: '0 auto 3rem' }}>
                  <svg style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                    <circle 
                      cx="50" cy="50" r="45" fill="none" stroke="#ff4d00" strokeWidth="8" 
                      strokeDasharray="282.7" 
                      strokeDashoffset={282.7 - (282.7 * progress) / 100} 
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.3s ease' }}
                    />
                  </svg>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.25rem', color: '#0f172a' }}>
                    {Math.round(progress)}%
                  </div>
               </div>

               <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.75rem', color: '#0f172a', marginBottom: '1rem' }}>
                 Analyzing your profile...
               </h2>
               
               <div style={{ maxWidth: '280px', margin: '2rem auto 0', display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left' }}>
                  {[
                    { key: 'profile', label: 'Fetching profile data' },
                    { key: 'links', label: 'Extracting public links' },
                    { key: 'images', label: 'Optimizing media assets' },
                    { key: 'formatting', label: 'Mapping to LinkSync' },
                  ].map(item => (
                    <div key={item.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', opacity: checklist[item.key as keyof typeof checklist] ? 1 : 0.4, transition: 'opacity 0.2s' }}>
                      {checklist[item.key as keyof typeof checklist] ? <CheckCircle2 size={18} color="#22c55e" /> : <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />}
                      <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#374151' }}>{item.label}</span>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* STEP 3: REVIEW & EDIT */}
          {step === 'review' && importedData && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2.5rem', alignItems: 'flex-start' }}>
              {/* Left: Editor */}
              <div style={{ flex: '1 1 500px', background: '#fff', borderRadius: '32px', padding: '2.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                   <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '1.75rem', color: '#0f172a' }}>Review & Edit</h2>
                   <div style={{ background: '#f0fdf4', color: '#16a34a', padding: '0.5rem 1rem', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <Check size={14} /> Data Fetched
                   </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                   {/* Name & Bio */}
                   <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                      <img src={importedData.avatar} style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px solid #f1f5f9' }} alt="Avatar" />
                      <div style={{ flex: 1 }}>
                        <input 
                          type="text" 
                          value={importedData.name} 
                          onChange={(e) => setImportedData({...importedData, name: e.target.value})}
                          style={{ width: '100%', border: 'none', borderBottom: '1px solid #e2e8f0', padding: '0.5rem 0', fontSize: '1.1rem', fontWeight: 800, outline: 'none', color: '#0f172a' }}
                        />
                        <textarea 
                          value={importedData.bio} 
                          onChange={(e) => setImportedData({...importedData, bio: e.target.value})}
                          style={{ width: '100%', border: 'none', borderBottom: '1px solid #e2e8f0', padding: '0.75rem 0', fontSize: '0.9rem', color: '#64748b', outline: 'none', resize: 'none' }}
                          rows={2}
                        />
                      </div>
                   </div>

                   {/* Links List */}
                   <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#374151', textTransform: 'uppercase', marginBottom: '1rem', letterSpacing: '0.05em' }}>Your Links</h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                         {importedData.links.map((link, idx) => (
                           <div key={link.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: '#f8fafc', borderRadius: '16px', border: '1px solid #f1f5f9' }}>
                              <div style={{ flex: 1 }}>
                                <input 
                                  value={link.title} 
                                  onChange={(e) => {
                                    const newLinks = [...importedData.links]
                                    newLinks[idx].title = e.target.value
                                    setImportedData({...importedData, links: newLinks})
                                  }}
                                  style={{ background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', width: '100%', outline: 'none' }}
                                />
                                <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginTop: '0.25rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.url}</div>
                              </div>
                              <button 
                                onClick={() => {
                                  const newLinks = [...importedData.links]
                                  newLinks[idx].active = !newLinks[idx].active
                                  setImportedData({...importedData, links: newLinks})
                                }}
                                style={{ background: link.active ? '#ff4d00' : '#e2e8f0', border: 'none', width: '36px', height: '20px', borderRadius: '20px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}
                              >
                                <div style={{ position: 'absolute', top: '2px', left: link.active ? '18px' : '2px', width: '16px', height: '16px', borderRadius: '50%', background: '#fff', transition: 'left 0.2s' }} />
                              </button>
                           </div>
                         ))}
                      </div>
                      <button style={{ marginTop: '1rem', width: '100%', padding: '0.875rem', background: '#fff', border: '1.5px dashed #e2e8f0', borderRadius: '16px', color: '#64748b', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                        <Plus size={16} /> Add Another Link
                      </button>
                   </div>

                   <button 
                    onClick={() => setStep('upgrades')}
                    className="btn-primary" 
                    style={{ padding: '1.1rem', borderRadius: '16px', fontSize: '1.1rem', fontWeight: 800, justifyContent: 'center', gap: '0.75rem', marginTop: '1rem' }}
                  >
                    Looks good, next <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Right: Live Preview */}
              <div style={{ flex: '0 0 320px', position: 'sticky', top: '100px' }} className="hide-mobile">
                <div style={{ textAlign: 'center', marginBottom: '1.5rem', fontWeight: 800, color: '#94a3b8', fontSize: '0.85rem', textTransform: 'uppercase' }}>Live Preview</div>
                <div style={{ background: '#000', borderRadius: '44px', padding: '10px', boxShadow: '0 40px 80px rgba(0,0,0,0.1)' }}>
                  <div style={{ background: '#fff', borderRadius: '34px', minHeight: '560px', padding: '2.5rem 1.25rem', textAlign: 'center' }}>
                     <img src={importedData.avatar} style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #f1f5f9', marginBottom: '1rem' }} alt="Preview Avatar" />
                     <h3 style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0f172a', marginBottom: '0.5rem' }}>{importedData.name}</h3>
                     <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '2rem', lineHeight: 1.4 }}>{importedData.bio}</p>
                     
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        {importedData.links.filter(l => l.active).map(l => (
                          <div key={l.id} style={{ padding: '0.875rem', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                            {l.title}
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: UPGRADES */}
          {step === 'upgrades' && importedData && (
            <div style={{ background: '#fff', borderRadius: '32px', padding: '3.5rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0' }}>
               <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                 <div style={{ display: 'inline-flex', padding: '0.5rem 1rem', background: '#fff7f2', color: '#ff4d00', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 800, marginBottom: '1.5rem', gap: '0.4rem' }}>
                    <Zap size={14} fill="#ff4d00" /> One last step
                 </div>
                 <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '2.25rem', color: '#0f172a', letterSpacing: '-0.04em' }}>
                   Boost your conversion path
                 </h2>
                 <p style={{ color: '#64748b', fontSize: '1.1rem', marginTop: '0.75rem' }}>Add these conversion-focused blocks to your new LinkSync page.</p>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                  {/* Upgrade 1: WhatsApp */}
                  <div style={{ padding: '2rem', border: '2px solid #ff4d00', background: '#fff7f2', borderRadius: '24px', position: 'relative' }}>
                     <div style={{ position: 'absolute', top: '-12px', right: '20px', background: '#ff4d00', color: 'white', fontSize: '0.7rem', fontWeight: 900, padding: '4px 10px', borderRadius: '6px' }}>RECOMMENDED</div>
                     <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <MessageCircle size={22} fill="white" />
                     </div>
                     <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>WhatsApp CTA</h3>
                     <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>Let visitors chat with you directly. Best for services, coaches, and local brands.</p>
                     <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Check size={16} color="#16a34a" /> <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#374151' }}>Added to your page</span>
                     </div>
                  </div>

                  {/* Upgrade 2: Featured Offer */}
                  <div style={{ padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '24px' }}>
                     <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', color: '#ff4d00', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                        <Sparkles size={22} />
                     </div>
                     <h3 style={{ fontWeight: 800, fontSize: '1.25rem', color: '#0f172a', marginBottom: '0.75rem' }}>Featured Offer Block</h3>
                     <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1.5rem' }}>Highlight your top service or product at the very top of your list.</p>
                     <button style={{ background: '#fff', border: '1.5px solid #ff4d00', color: '#ff4d00', padding: '0.6rem 1rem', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 800, cursor: 'pointer' }}>Enable Block</button>
                  </div>
               </div>

               <div style={{ textAlign: 'center' }}>
                  <button 
                    onClick={handlePublish}
                    disabled={saving}
                    className="btn-primary" 
                    style={{ padding: '1.25rem 4rem', borderRadius: '16px', fontSize: '1.25rem', fontWeight: 900, justifyContent: 'center', gap: '0.75rem', boxShadow: '0 12px 32px rgba(255,77,0,0.3)', width: '100%', maxWidth: '400px' }}
                  >
                    {saving ? <Loader2 size={24} style={{ animation: 'spin 1s linear infinite' }} /> : <Sparkles size={24} fill="white" />}
                    {saving ? 'Publishing...' : 'Publish my LinkSync page'}
                  </button>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '1.5rem', fontWeight: 500 }}>
                    {!user ? 'You will be asked to create an account in the next step.' : 'Your page will be live instantly.'}
                  </p>
               </div>
            </div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 'success' && (
            <div style={{ background: '#fff', borderRadius: '32px', padding: '4rem 2rem', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #e2e8f0', textAlign: 'center' }}>
               <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#f0fdf4', color: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2.5rem' }}>
                  <Check size={40} strokeWidth={3} />
               </div>
               <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 900, fontSize: '2.25rem', color: '#0f172a', marginBottom: '1rem', letterSpacing: '-0.04em' }}>
                 Your page is live! 🚀
               </h1>
               <p style={{ color: '#64748b', fontSize: '1.15rem', marginBottom: '3rem', lineHeight: 1.6, maxWidth: '400px', margin: '0 auto 3rem' }}>
                 Congratulations! Your Linktree links have been migrated and optimized for conversion.
               </p>

               <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '1.5rem', marginBottom: '3rem' }}>
                  <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>Your Live URL</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ff4d00', marginBottom: '1.5rem' }}>
                    {window.location.origin}/{profile?.username || 'yourname'}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                     <Link to={`/${profile?.username}`} target="_blank" className="btn-outline" style={{ flex: 1, padding: '0.875rem', borderRadius: '12px', fontSize: '0.95rem', background: '#fff' }}>
                        View Page <ExternalLink size={16} />
                     </Link>
                     <button className="btn-primary" style={{ flex: 1, padding: '0.875rem', borderRadius: '12px', fontSize: '0.95rem' }}>
                        Copy Link
                     </button>
                  </div>
               </div>

               <Link to="/dashboard" style={{ color: '#ff4d00', fontWeight: 800, textDecoration: 'none', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
                  Go to Dashboard <ChevronRight size={18} />
               </Link>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
