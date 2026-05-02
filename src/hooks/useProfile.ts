import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Profile } from '../lib/types'
import { useAuth } from './useAuth'

export function useProfile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }
    fetchProfile()
  }, [user])

  const fetchProfile = async () => {
    if (!user) return
    setLoading(true)
    setError(null)
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      setError(error.message)
    } else {
      setProfile(data)
    }
    setLoading(false)
  }

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user || !profile) return { error: 'No profile found' }
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', profile.id)
    if (!error) fetchProfile()
    return { error: error?.message || null }
  }

  const createProfile = async (profileData: Omit<Profile, 'id' | 'user_id' | 'created_at' | 'is_admin'>) => {
    if (!user) return { error: 'Not authenticated' }
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 7)

    const { error } = await supabase
      .from('profiles')
      .insert({ 
        ...profileData, 
        user_id: user.id,
        trial_ends_at: trialEndsAt.toISOString()
      })
    if (!error) fetchProfile()
    return { error: error?.message || null }
  }

  const isTrialActive = profile?.trial_ends_at 
    ? new Date(profile.trial_ends_at) > new Date() 
    : false

  const isPro = profile?.plan === 'pro' || profile?.is_admin || isTrialActive
  const isBasic = profile?.plan === 'basic' || isPro

  return { profile, loading, error, fetchProfile, updateProfile, createProfile, isPro, isBasic, isTrialActive }
}
