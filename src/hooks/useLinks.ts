import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Link } from '../lib/types'

export function useLinks(profileId: string | undefined) {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState(false)

  const fetchLinks = useCallback(async () => {
    if (!profileId) return
    setLoading(true)
    const { data } = await supabase
      .from('links')
      .select('*')
      .eq('profile_id', profileId)
      .order('order_index', { ascending: true })
    setLinks(data || [])
    setLoading(false)
  }, [profileId])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const addLink = async (title: string, url: string) => {
    if (!profileId) return { error: 'No profile' }
    const maxOrder = links.length > 0 ? Math.max(...links.map(l => l.order_index)) : -1
    const { error } = await supabase
      .from('links')
      .insert({ profile_id: profileId, title, url, order_index: maxOrder + 1 })
    if (!error) fetchLinks()
    return { error: error?.message || null }
  }

  const updateLink = async (id: string, updates: Partial<Link>) => {
    const { error } = await supabase
      .from('links')
      .update(updates)
      .eq('id', id)
    if (!error) fetchLinks()
    return { error: error?.message || null }
  }

  const deleteLink = async (id: string) => {
    const { error } = await supabase
      .from('links')
      .delete()
      .eq('id', id)
    if (!error) fetchLinks()
    return { error: error?.message || null }
  }

  const reorderLinks = async (reordered: Link[]) => {
    setLinks(reordered)
    const updates = reordered.map((link, index) =>
      supabase.from('links').update({ order_index: index }).eq('id', link.id)
    )
    await Promise.all(updates)
  }

  return { links, loading, fetchLinks, addLink, updateLink, deleteLink, reorderLinks }
}
