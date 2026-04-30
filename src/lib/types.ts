export interface Profile {
  id: string
  user_id: string
  username: string
  name: string
  bio: string
  profile_image: string | null
  whatsapp_number: string
  created_at: string
}

export interface Link {
  id: string
  profile_id: string
  title: string
  url: string
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
