-- ─── LinkSync: Theme System Migration ────────────────────────────────────────
-- Run this in your Supabase SQL editor (Dashboard → SQL Editor)
-- Safe to run multiple times (uses IF NOT EXISTS / DEFAULT value)

-- 1. Add theme column to profiles
ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS theme TEXT NOT NULL DEFAULT 'minimal-clean';

-- 2. (Optional future fields — uncomment when ready)
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS accent_color TEXT;
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS background_type TEXT;
-- ALTER TABLE profiles ADD COLUMN IF NOT EXISTS font_style TEXT;

-- 3. Verify
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name IN ('theme');
