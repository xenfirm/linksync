import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Lead } from '../lib/types'

export function useLeads(profileId: string | undefined) {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)

  const fetchLeads = useCallback(async () => {
    if (!profileId) return
    setLoading(true)
    const { data } = await supabase
      .from('leads')
      .select('*')
      .eq('profile_id', profileId)
      .order('created_at', { ascending: false })
    setLeads(data || [])
    setLoading(false)
  }, [profileId])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const addLead = async (name: string, phone: string, source: 'form' | 'whatsapp') => {
    if (!profileId) return { error: 'No profile' }
    const { error } = await supabase
      .from('leads')
      .insert({ profile_id: profileId, name, phone, source })
    return { error: error?.message || null }
  }

  return { leads, loading, fetchLeads, addLead }
}
