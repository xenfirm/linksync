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
  whatsapp_message text DEFAULT '',
  plan text DEFAULT 'free' CHECK (plan IN ('free', 'basic', 'pro')),
  is_admin boolean DEFAULT false,
  trial_ends_at timestamptz,
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

-- 4. CLICKS TABLE
CREATE TABLE IF NOT EXISTS public.clicks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('link', 'whatsapp')),
  created_at timestamptz DEFAULT now()
);

-- =========================================
-- ROW LEVEL SECURITY
-- =========================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clicks ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES
-- Users can view any profile (needed for public bio pages)
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Users can only insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own profile (or admin)
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (
    auth.uid() = user_id 
    OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
  );

-- Users can only delete their own profile (or admin)
CREATE POLICY "Users can delete own profile"
  ON public.profiles FOR DELETE
  USING (
    auth.uid() = user_id 
    OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
  );


-- LINKS POLICIES
-- Anyone can view links (needed for public bio pages)
CREATE POLICY "Links are publicly viewable"
  ON public.links FOR SELECT
  USING (true);

-- Only profile owner can manage links (or admin)
CREATE POLICY "Users can insert own links"
  ON public.links FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id)
    OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Users can update own links"
  ON public.links FOR UPDATE
  USING (
    auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id)
    OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
  );

CREATE POLICY "Users can delete own links"
  ON public.links FOR DELETE
  USING (
    auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id)
    OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
  );


-- LEADS POLICIES
-- Anyone can insert a lead BUT ONLY if the target profile is Pro or Admin
CREATE POLICY "Anyone can submit a lead for Pro profiles"
  ON public.leads FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = profile_id 
      AND (plan = 'pro' OR is_admin = true OR (trial_ends_at IS NOT NULL AND trial_ends_at > now()))
    )
  );

-- Only profile owner can view their leads AND must be Pro or Admin
CREATE POLICY "Only Pro users can view leads"
  ON public.leads FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = profile_id 
      AND (user_id = auth.uid())
      AND (plan = 'pro' OR is_admin = true)
    )
  );

-- =========================================
-- CLICKS POLICIES
-- =========================================
-- Anyone can insert a click
CREATE POLICY "Anyone can submit a click"
  ON public.clicks FOR INSERT
  WITH CHECK (true);

-- Only profile owner can view their clicks (or admin)
CREATE POLICY "Users can view own clicks"
  ON public.clicks FOR SELECT
  USING (
    auth.uid() = (SELECT user_id FROM public.profiles WHERE id = profile_id)
    OR EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND is_admin = true)
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
CREATE INDEX IF NOT EXISTS idx_clicks_profile_id ON public.clicks(profile_id);
CREATE INDEX IF NOT EXISTS idx_clicks_type ON public.clicks(type);

-- =========================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- =========================================
-- This function creates a profile automatically when a new user signs up in auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (user_id, username, name, trial_ends_at, plan)
  VALUES (
    new.id,
    LOWER(SPLIT_PART(new.email, '@', 1)) || '_' || floor(random() * 1000)::text, -- unique username
    COALESCE(new.raw_user_meta_data->>'full_name', SPLIT_PART(new.email, '@', 1)),
    now() + interval '7 days', -- 7-day trial
    'basic' -- Start on basic with trial features unlocked
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function on signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
