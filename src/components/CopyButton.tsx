import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function CopyButton({ text, label = 'Copy' }: { text: string, label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.3rem',
        background: copied ? '#f0fdf4' : '#f8fafc',
        border: `1px solid ${copied ? '#bbf7d0' : '#e2e8f0'}`,
        color: copied ? '#16a34a' : '#0f172a',
        fontSize: '0.75rem',
        fontWeight: 600,
        padding: '0.35rem 0.875rem',
        borderRadius: '100px',
        cursor: 'pointer',
        transition: 'all 0.2s',
      }}
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'Copied!' : label}
    </button>
  )
}
