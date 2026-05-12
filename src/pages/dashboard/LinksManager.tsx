import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Trash2, Edit3, Check, X, GripVertical,
  Link2, Loader2, ExternalLink, AlertCircle
} from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { useLinks } from '../../hooks/useLinks'
import { usePayments } from '../../hooks/usePayments'
import { ToggleSwitch, SectionHeader, EmptyState, GradientButton, Toast } from '../../components/ui'
import type { Link } from '../../lib/types'

// ── Link Card ─────────────────────────────────────────────────────────────────
function LinkCard({
  link,
  onEdit,
  onUpdate,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  dragOver,
}: {
  link: Link
  onEdit: (link: Link) => void
  onUpdate: (id: string, updates: Partial<Link>) => void
  onDelete: (id: string) => void
  onDragStart: (e: React.DragEvent, id: string) => void
  onDragOver: (e: React.DragEvent, id: string) => void
  onDrop: () => void
  dragOver: boolean
}) {
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    await onDelete(link.id)
    setDeleting(false)
  }

  const handleToggle = async (active: boolean) => {
    await onUpdate(link.id, { active })
  }

  const domain = (() => {
    try { return new URL(link.url).hostname.replace('www.', '') }
    catch { return link.url }
  })()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      draggable
      onDragStart={(e) => onDragStart(e as unknown as React.DragEvent, link.id)}
      onDragOver={(e) => onDragOver(e as unknown as React.DragEvent, link.id)}
      onDrop={onDrop}
      style={{
        background: dragOver ? 'rgba(191,207,26,0.06)' : 'rgba(129,51,194,0.06)',
        border: dragOver ? '1.5px solid rgba(191,207,26,0.4)' : '1px solid rgba(129,51,194,0.15)',
        borderRadius: '18px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'grab',
        transition: 'all 0.2s ease',
        boxShadow: dragOver ? '0 0 20px rgba(191,207,26,0.12)' : 'none',
        opacity: link.active ? 1 : 0.5,
      }}
    >
      {/* Drag handle */}
      <GripVertical size={16} style={{ color: '#374151', flexShrink: 0 }} />

      {/* Link icon placeholder */}
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(129,51,194,0.25), rgba(192,132,252,0.1))',
          border: '1px solid rgba(129,51,194,0.25)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Link2 size={16} color="#c084fc" />
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 700, color: '#f1f5f9', fontSize: '0.875rem', marginBottom: '0.15rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {link.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#4b5563', fontSize: '0.72rem' }}>
          <ExternalLink size={10} />
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{domain}</span>
        </div>
      </div>

      {/* Actions */}
      <div 
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        onPointerDown={(e) => e.stopPropagation()}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}
      >
        <ToggleSwitch
          checked={!!link.active}
          onChange={handleToggle}
          id={`toggle-${link.id}`}
        />
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={() => onEdit(link)}
          style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '0.45rem', cursor: 'pointer', color: '#94a3b8', display: 'flex' }}
        >
          <Edit3 size={14} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.88 }}
          onClick={handleDelete}
          disabled={deleting}
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', padding: '0.45rem', cursor: deleting ? 'not-allowed' : 'pointer', color: '#f87171', display: 'flex' }}
        >
          {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </motion.button>
      </div>
    </motion.div>
  )
}

// ── Add/Edit Modal ─────────────────────────────────────────────────────────────
function LinkModal({
  title,
  linkTitle,
  linkUrl,
  setLinkTitle,
  setLinkUrl,
  onSave,
  onCancel,
  saving,
  error,
}: {
  title: string
  linkTitle: string
  linkUrl: string
  setLinkTitle: (v: string) => void
  setLinkUrl: (v: string) => void
  onSave: () => void
  onCancel: () => void
  saving: boolean
  error: string | null
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      style={{
        background: 'rgba(22,11,46,0.98)',
        border: '1px solid rgba(129,51,194,0.35)',
        borderRadius: '22px',
        padding: '1.5rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 30px rgba(129,51,194,0.1)',
      }}
    >
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#f1f5f9', fontSize: '1rem', marginBottom: '1.25rem' }}>
        {title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <input
          type="text"
          className="input-dark"
          placeholder="Link Title (e.g. My Portfolio)"
          value={linkTitle}
          onChange={(e) => setLinkTitle(e.target.value)}
          autoFocus
        />
        <input
          type="url"
          className="input-dark"
          placeholder="https://yoursite.com"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
        />
        {error && <p style={{ color: '#f87171', fontSize: '0.8rem' }}>{error}</p>}
        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.25rem' }}>
          <GradientButton onClick={onSave} disabled={saving} size="sm">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
            {saving ? 'Saving…' : 'Save'}
          </GradientButton>
          <button
            onClick={onCancel}
            className="btn-outline"
            style={{ flex: 1, padding: '0.5rem 1rem', fontSize: '0.8rem' }}
          >
            <X size={14} /> Cancel
          </button>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────────
export default function LinksManager() {
  const { profile, isPro, isBasic } = useProfile()
  const { links, loading, addLink, updateLink, deleteLink, reorderLinks } = useLinks(profile?.id)
  const { handleUpgrade, loading: paymentLoading } = usePayments()

  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editUrl, setEditUrl] = useState('')
  const [addLoading, setAddLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [toastVisible, setToastVisible] = useState(false)

  // Drag & drop
  const dragId = useRef<string>('')
  const dragOverId = useRef<string>('')
  const [dragOverLinkId, setDragOverLinkId] = useState('')

  const showToast = () => { setToastVisible(true); setTimeout(() => setToastVisible(false), 2000) }

  const handleDragStart = (_e: React.DragEvent, id: string) => { dragId.current = id }
  const handleDragOver = (e: React.DragEvent, id: string) => { e.preventDefault(); dragOverId.current = id; setDragOverLinkId(id) }
  const handleDrop = () => {
    if (!dragId.current || dragId.current === dragOverId.current) return
    const reordered = [...links]
    const fromIdx = reordered.findIndex((l) => l.id === dragId.current)
    const toIdx = reordered.findIndex((l) => l.id === dragOverId.current)
    const [moved] = reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, moved)
    reorderLinks(reordered)
    setDragOverLinkId('')
  }

  const handleAdd = async () => {
    if (!newTitle.trim() || !newUrl.trim()) return
    setAddLoading(true); setFormError(null)
    let url = newUrl.trim()
    if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url
    const { error } = await addLink(newTitle.trim(), url)
    if (error) { setFormError(error) }
    else { setNewTitle(''); setNewUrl(''); setShowAddForm(false); showToast() }
    setAddLoading(false)
  }

  const startEdit = (link: Link) => { setEditingLink(link); setEditTitle(link.title); setEditUrl(link.url); setFormError(null) }

  const handleEditSave = async () => {
    if (!editingLink || !editTitle.trim() || !editUrl.trim()) return
    setEditLoading(true)
    let url = editUrl.trim()
    if (!url.startsWith('http://') && !url.startsWith('https://')) url = 'https://' + url
    await updateLink(editingLink.id, { title: editTitle.trim(), url })
    setEditingLink(null); setEditLoading(false); showToast()
  }

  const limit = isPro ? Infinity : isBasic ? 10 : 3
  const atLimit = links.length >= limit

  if (!profile) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '14px', padding: '1.5rem', color: '#f87171', fontSize: '0.9rem' }}>
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        Please create your profile first before adding links.
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <SectionHeader
        title="Links"
        subtitle={`${links.length}${atLimit ? '' : `/${limit === Infinity ? '∞' : limit}`} links`}
        right={
          !atLimit && (
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => { setShowAddForm(!showAddForm); setFormError(null) }}
              id="btn-add-link"
              style={{
                background: 'rgba(191,207,26,0.12)',
                border: '1px solid rgba(191,207,26,0.3)',
                borderRadius: '12px',
                padding: '0.55rem 1rem',
                color: '#BFCF1A',
                fontWeight: 700,
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
              }}
            >
              <Plus size={15} /> Add Link
            </motion.button>
          )
        }
      />

      {/* Add form */}
      <AnimatePresence>
        {showAddForm && (
          <LinkModal
            title="New Link"
            linkTitle={newTitle}
            linkUrl={newUrl}
            setLinkTitle={setNewTitle}
            setLinkUrl={setNewUrl}
            onSave={handleAdd}
            onCancel={() => { setShowAddForm(false); setNewTitle(''); setNewUrl('') }}
            saving={addLoading}
            error={formError}
          />
        )}
      </AnimatePresence>

      {/* Edit form */}
      <AnimatePresence>
        {editingLink && (
          <LinkModal
            title="Edit Link"
            linkTitle={editTitle}
            linkUrl={editUrl}
            setLinkTitle={setEditTitle}
            setLinkUrl={setEditUrl}
            onSave={handleEditSave}
            onCancel={() => setEditingLink(null)}
            saving={editLoading}
            error={formError}
          />
        )}
      </AnimatePresence>

      {/* Links list */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <Loader2 size={24} className="animate-spin" style={{ color: '#a3e635' }} />
        </div>
      ) : links.length === 0 ? (
        <EmptyState
          emoji="🔗"
          title="No links yet"
          subtitle="Add your first link to start building your bio page."
          action={
            <GradientButton onClick={() => setShowAddForm(true)} size="sm">
              <Plus size={14} /> Add First Link
            </GradientButton>
          }
        />
      ) : (
        <motion.div layout style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          <AnimatePresence>
            {links.map((link) => (
              <LinkCard
                key={link.id}
                link={link}
                onEdit={startEdit}
                onUpdate={updateLink}
                onDelete={deleteLink}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                dragOver={dragOverLinkId === link.id}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Limit reached */}
      {atLimit && !isPro && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: 'rgba(191,207,26,0.06)', border: '1px solid rgba(191,207,26,0.2)', borderRadius: '18px', padding: '1.5rem', textAlign: 'center' }}
        >
          <p style={{ color: '#BFCF1A', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            You've reached your {limit}-link limit
          </p>
          <GradientButton onClick={() => handleUpgrade(profile.user_id, profile.name, 'pro')} disabled={paymentLoading}>
            {paymentLoading ? 'Opening Checkout…' : '✦ Upgrade for Unlimited Links'}
          </GradientButton>
        </motion.div>
      )}

      <Toast message="✓ Saved successfully" visible={toastVisible} />
    </div>
  )
}
