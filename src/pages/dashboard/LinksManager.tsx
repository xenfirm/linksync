import { useState } from 'react'
import {
  Plus, Trash2, Edit3, Check, X, GripVertical,
  Link2, Loader2, ExternalLink, AlertCircle
} from 'lucide-react'
import { useProfile } from '../../hooks/useProfile'
import { useLinks } from '../../hooks/useLinks'
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
      className="glass-card"
      style={{
        borderRadius: '12px',
        padding: '1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        cursor: 'grab',
        border: dragOver ? '1px solid #0ea5e9' : '1px solid rgba(51,65,85,0.8)',
        transition: 'border-color 0.2s',
      }}
    >
      <GripVertical size={16} style={{ color: '#9b99c4', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontWeight: 600, color: '#f8fafc', fontSize: '0.9rem', marginBottom: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {link.title}
        </p>
        <a
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#94a3b8', fontSize: '0.78rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
        >
          {link.url} <ExternalLink size={11} />
        </a>
      </div>
      <div style={{ display: 'flex', gap: '0.4rem', flexShrink: 0 }}>
        <button
          onClick={() => onEdit(link)}
          style={{
            background: 'rgba(42,42,69,0.8)',
            border: '1px solid #2a2a45',
            borderRadius: '8px',
            padding: '0.4rem',
            cursor: 'pointer',
            color: '#9b99c4',
            display: 'flex',
          }}
        >
          <Edit3 size={14} />
        </button>
        <button
          onClick={handleDelete}
          disabled={deleting}
          style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            padding: '0.4rem',
            cursor: deleting ? 'not-allowed' : 'pointer',
            color: '#f87171',
            display: 'flex',
          }}
        >
          {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
        </button>
      </div>
    </div>
  )
}

export default function LinksManager() {
  const { profile } = useProfile()
  const { links, loading, addLink, updateLink, deleteLink, reorderLinks } = useLinks(profile?.id)

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
          background: 'rgba(14,165,233,0.06)',
          border: '1px solid rgba(14,165,233,0.2)',
          borderRadius: '14px',
          padding: '1.5rem',
          color: '#94a3b8',
          fontSize: '0.9rem',
        }}
      >
        <AlertCircle size={18} style={{ color: '#0ea5e9', flexShrink: 0 }} />
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
        <div>
          <h1
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: '1.6rem',
              color: '#f8fafc',
              marginBottom: '0.35rem',
            }}
          >
            Links Manager
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            Add up to 5 links to your bio page. Drag to reorder.
          </p>
        </div>

        {links.length < 5 && (
          <button
            id="btn-add-link"
            onClick={() => { setShowAddForm(!showAddForm); setFormError(null) }}
            className="btn-gradient"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '10px',
              border: 'none',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
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
          className="glass-card"
          style={{
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.25rem',
            border: '1px solid rgba(14,165,233,0.3)',
          }}
        >
          <h3 style={{ fontWeight: 700, color: '#f8fafc', fontSize: '0.95rem', marginBottom: '1rem' }}>
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
            {formError && <p style={{ color: '#f87171', fontSize: '0.8rem' }}>{formError}</p>}
            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <button
                type="submit"
                disabled={addLoading}
                className="btn-gradient"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: addLoading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {addLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                Save
              </button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); setNewTitle(''); setNewUrl('') }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #2a2a45',
                  background: 'transparent',
                  color: '#9b99c4',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
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
          className="glass-card"
          style={{
            borderRadius: '16px',
            padding: '1.5rem',
            marginBottom: '1.25rem',
            border: '1px solid rgba(124,58,237,0.3)',
          }}
        >
          <h3 style={{ fontWeight: 700, color: '#f1f0ff', fontSize: '0.95rem', marginBottom: '1rem' }}>
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
                className="btn-gradient"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: '8px',
                  border: 'none',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: editLoading ? 'not-allowed' : 'pointer',
                  fontFamily: 'Inter, sans-serif',
                }}
              >
                {editLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                Save Changes
              </button>
              <button
                onClick={() => setEditingLink(null)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.55rem 1rem',
                  borderRadius: '8px',
                  border: '1px solid #2a2a45',
                  background: 'transparent',
                  color: '#9b99c4',
                  fontWeight: 500,
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  fontFamily: 'Inter, sans-serif',
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
          <Loader2 size={24} style={{ color: '#0ea5e9', animation: 'spin 1s linear infinite' }} />
        </div>
      ) : links.length === 0 ? (
        <div
          className="glass-card"
          style={{
            borderRadius: '16px',
            padding: '3rem',
            textAlign: 'center',
          }}
        >
          <Link2 size={32} style={{ color: '#9b99c4', margin: '0 auto 1rem' }} />
          <p style={{ color: '#9b99c4', fontSize: '0.9rem' }}>No links yet. Add your first link above.</p>
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

      {links.length >= 5 && (
        <p style={{ color: '#9b99c4', fontSize: '0.8rem', marginTop: '1rem', textAlign: 'center' }}>
          Maximum 5 links allowed on your bio page.
        </p>
      )}
    </div>
  )
}
