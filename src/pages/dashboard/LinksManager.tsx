import { useState } from 'react'
import {
  Plus, Trash2, Edit3, Check, X, GripVertical,
  Link2, Loader2, ExternalLink, AlertCircle
} from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { useLinks } from '../../hooks/useLinks'
import { usePayments } from '../../hooks/usePayments'
import type { Link } from '../../lib/types'

function LinkCard({
  link,
  onEdit,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  dragOver,
}: {
  link: Link
  onEdit: (link: Link) => void
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

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, link.id)}
      onDragOver={e => onDragOver(e, link.id)}
      onDrop={onDrop}
      style={{
        background: '#fff',
        border: dragOver ? '1.5px solid #6d28d9' : '1px solid #e2e8f0',
        borderRadius: '12px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'grab',
        transition: 'all 0.2s',
        boxShadow: dragOver ? '0 4px 12px rgba(109,40,217,0.1)' : 'none',
      }}
    >
      <GripVertical size={16} style={{ color: '#94a3b8', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, color: '#0f172a', fontSize: '0.9rem', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {link.title}
        </p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#64748b', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.2rem', textDecoration: 'none' }}
        >
          {link.url} <ExternalLink size={11} />
        </a>
      </div>
      <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
        <button
          onClick={() => onEdit(link)}
          style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '0.4rem',
            cursor: 'pointer',
            color: '#64748b',
            display: 'flex',
          }}
        >
          <Edit3 size={14} />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: '8px',
            padding: '0.4rem',
            cursor: deleting ? 'not-allowed' : 'pointer',
            color: '#e11d48',
            display: 'flex',
          }}
        >
          {deleting ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Trash2 size={14} />}
        </button>
      </div>
    </div>
  )
}

export default function LinksManager() {
  const { profile } = useProfile()
  const { links, loading, addLink, updateLink, deleteLink, reorderLinks } = useLinks(profile?.id)
  const { upgradeToPro, loading: paymentLoading, error: paymentError } = usePayments()

  const hasProAccess = profile?.plan === 'pro' || profile?.is_admin;
  const hasBasicAccess = profile?.plan === 'basic' || hasProAccess;

  const [editingLink, setEditingLink] = useState<Link | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editUrl, setEditUrl] = useState('')
  const [addLoading, setAddLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  // Drag & drop
  const dragId = { current: '' }
  const dragOverId = { current: '' }
  const [dragOverLinkId, setDragOverLinkId] = useState<string>('')

  const handleDragStart = (_e: React.DragEvent, id: string) => {
    dragId.current = id
  }
  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault()
    dragOverId.current = id
    setDragOverLinkId(id)
  }
  const handleDrop = () => {
    if (!dragId.current || dragId.current === dragOverId.current) return
    const reordered = [...links]
    const fromIdx = reordered.findIndex(l => l.id === dragId.current)
    const toIdx = reordered.findIndex(l => l.id === dragOverId.current)
    const [moved] = reordered.splice(fromIdx, 1)
    reordered.splice(toIdx, 0, moved)
    reorderLinks(reordered)
    setDragOverLinkId('')
  }

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTitle.trim() || !newUrl.trim()) return
    setAddLoading(true)
    setFormError(null)
    let url = newUrl.trim()
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }
    const { error } = await addLink(newTitle.trim(), url)
    if (error) {
      setFormError(error)
    } else {
      setNewTitle('')
      setNewUrl('')
      setShowAddForm(false)
    }
    setAddLoading(false)
  }

  const startEdit = (link: Link) => {
    setEditingLink(link)
    setEditTitle(link.title)
    setEditUrl(link.url)
    setFormError(null)
  }

  const handleEditSave = async () => {
    if (!editingLink || !editTitle.trim() || !editUrl.trim()) return
    setEditLoading(true)
    let url = editUrl.trim()
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url
    }
    await updateLink(editingLink.id, { title: editTitle.trim(), url })
    setEditingLink(null)
    setEditLoading(false)
  }

  if (!profile) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: '#ede9fe',
          border: '1px solid #ddd6fe',
          borderRadius: '14px',
          padding: '1.5rem',
          color: '#6d28d9',
          fontSize: '0.9rem',
          fontWeight: 500,
        }}
      >
        <AlertCircle size={18} style={{ flexShrink: 0 }} />
        Please create your profile first before adding links.
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '640px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: '2rem',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '1.6rem',
              color: '#0f172a',
              marginBottom: '0.35rem',
            }}
          >
            Links Manager
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>
            Add links to your bio page. Drag to reorder.
          </p>
        </div>

        {links.length < (hasProAccess ? Infinity : hasBasicAccess ? 10 : 3) && (
          <button
            id="btn-add-link"
            onClick={() => { setShowAddForm(!showAddForm); setFormError(null) }}
            className="btn-primary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '10px',
              fontSize: '0.875rem',
              flexShrink: 0,
            }}
          >
            <Plus size={16} /> Add Link
          </button>
        )}
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form
          onSubmit={handleAdd}
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.25rem',
            border: '1px solid #6d28d9',
            boxShadow: '0 4px 12px rgba(109,40,217,0.1)',
          }}
        >
          <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', marginBottom: '1rem' }}>
            New Link
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              id="new-link-title"
              type="text"
              className="input-dark"
              placeholder="Link Title (e.g. My Portfolio)"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              required
              autoFocus
            />
            <input
              id="new-link-url"
              type="url"
              className="input-dark"
              placeholder="URL (e.g. https://yoursite.com)"
              value={newUrl}
              onChange={e => setNewUrl(e.target.value)}
              required
            />
            {formError && <p style={{ color: '#e11d48', fontSize: '0.8rem' }}>{formError}</p>}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                type="submit"
                disabled={addLoading}
                className="btn-primary"
                style={{
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.85rem',
                }}
              >
                {addLoading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={14} />}
                Save
              </button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); setNewTitle(''); setNewUrl('') }}
                className="btn-outline"
                style={{
                  padding: '0.55rem 1rem',
                  fontSize: '0.85rem',
                }}
              >
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Edit Modal */}
      {editingLink && (
        <div
          style={{
            background: '#fff',
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.25rem',
            border: '1px solid #6d28d9',
            boxShadow: '0 4px 12px rgba(109,40,217,0.1)',
          }}
        >
          <h3 style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', marginBottom: '1rem' }}>
            Edit Link
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input
              id="edit-link-title"
              type="text"
              className="input-dark"
              value={editTitle}
              onChange={e => setEditTitle(e.target.value)}
              autoFocus
            />
            <input
              id="edit-link-url"
              type="text"
              className="input-dark"
              value={editUrl}
              onChange={e => setEditUrl(e.target.value)}
            />
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                onClick={handleEditSave}
                disabled={editLoading}
                className="btn-primary"
                style={{
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.85rem',
                }}
              >
                {editLoading ? <Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> : <Check size={14} />}
                Save Changes
              </button>
              <button
                onClick={() => setEditingLink(null)}
                className="btn-outline"
                style={{
                  padding: '0.55rem 1rem',
                  fontSize: '0.85rem',
                }}
              >
                <X size={14} /> Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Links List */}
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
          <Loader2 size={24} style={{ color: '#6d28d9', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : links.length === 0 ? (
        <div
          style={{
            background: '#fff',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
          }}
        >
          <Link2 size={32} style={{ color: '#94a3b8', margin: '0 auto 1rem' }} />
          <p style={{ color: '#64748b', fontSize: '0.9rem' }}>No links yet. Add your first link above.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {links.map(link => (
            <LinkCard
              key={link.id}
              link={link}
              onEdit={startEdit}
              onDelete={deleteLink}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              dragOver={dragOverLinkId === link.id}
            />
          ))}
        </div>
      )}

      {links.length >= (hasProAccess ? Infinity : hasBasicAccess ? 10 : 3) && !hasProAccess && (
        <div style={{ marginTop: '1.5rem', background: '#faf5ff', border: '1px solid #ddd6fe', borderRadius: '16px', padding: '1.5rem', textAlign: 'center' }}>
          <p style={{ color: '#6d28d9', fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.5rem' }}>
            You've reached your link limit ({hasBasicAccess ? 10 : 3} links)
          </p>
          <button 
            onClick={() => upgradeToPro(profile.user_id, profile.name)}
            disabled={paymentLoading}
            className="btn-primary" 
            style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem', opacity: paymentLoading ? 0.7 : 1 }}
          >
            {paymentLoading ? 'Opening Checkout...' : 'Upgrade to Pro for Unlimited Links'}
          </button>
          {paymentError && <p style={{ color: '#e11d48', fontSize: '0.8rem', marginTop: '0.75rem' }}>{paymentError}</p>}
        </div>
      )}
    </div>
  )
}
