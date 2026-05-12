-- Add active column to links table
ALTER TABLE links ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT true;
