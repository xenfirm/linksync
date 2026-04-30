-- =========================================
-- LinkSync - Supabase Database Schema
-- Run this in your Supabase SQL Editor
-- =========================================

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username text NOT NULL UNIQUE,
  name text NOT NULL,
  bio text DEFAULT '',
  profile_image text DEFAULT '',
  whatsapp_number text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

-- 2. LINKS TABLE
CREATE TABLE IF NOT EXISTS public.links (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text NOT NULL,
  order_index integer DEFAULT 0
);

-- 3. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name text NOT NULL,
  phone text NOT NULL,
  source text NOT NULL CHECK (source IN ('form', 'whatsapp')),
  created_at timestamptz DEFAULT now()
);

-- =========================================
-- ROW LEVEL SECURITY
-- =========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can view any profile (needed for public bio pages)
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Users can only insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can only delete their own profile
CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  USING (auth.uid() = user_id);


-- LINKS POLICIES
-- Anyone can view links (needed for public bio pages)
CREATE POLICY "Links are publicly viewable"
  ON public.links FOR SELECT
  USING (true);

-- Only profile owner can manage links
CREATE POLICY "Users can insert own links"
  ON public.links FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id)
  );

CREATE POLICY "Users can update own links"
  ON public.links FOR UPDATE
  USING (
    auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id)
  );

CREATE POLICY "Users can delete own links"
  ON public.links FOR DELETE
  USING (
    auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id)
  );


-- LEADS POLICIES
-- Anyone can insert a lead (needed for public form submission)
CREATE POLICY "Anyone can submit a lead"
  ON public.leads FOR INSERT
  WITH CHECK (true);

-- Only profile owner can view their leads
CREATE POLICY "Users can view own leads"
  ON public.leads FOR SELECT
  USING (
    auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id)
  );

-- =========================================
-- STORAGE BUCKET FOR AVATARS
-- =========================================
-- Run this in Supabase Storage section or via SQL:

INSERT INTO storage.buckets (id, name, public)
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload to avatars bucket
CREATE POLICY "Authenticated users can upload avatars"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Avatars are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =========================================
-- INDEXES FOR PERFORMANCE
-- =========================================
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_links_profile_id ON public.links(profile_id);
CREATE INDEX IF NOT EXISTS idx_leads_profile_id ON public.leads(profile_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
