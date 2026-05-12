export interface Profile {
  id: string
  user_id: string
  username: string
  name: string
  bio: string
  profile_image: string | null
  whatsapp_number: string
  whatsapp_message?: string
  plan: 'free' | 'basic' | 'pro'
  is_admin: boolean
  trial_ends_at?: string
  referral_code?: string
  referred_by?: string
  referral_count?: number
  reward_unlocked?: boolean
  theme?: string
  created_at: string
}

export interface Link {
  id: string
  profile_id: string
  title: string
  url: string
  active: boolean
  order_index: number
}

export interface Lead {
  id: string
  profile_id: string
  name: string
  phone: string
  source: 'form' | 'whatsapp'
  created_at: string
}

export interface User {
  id: string
  email: string
}

export interface Click {
  id: string
  profile_id: string
  type: 'link' | 'whatsapp'
  created_at: string
}
