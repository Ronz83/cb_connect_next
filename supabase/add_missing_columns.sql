-- FIX MISSING COLUMNS
-- Run this in Supabase Dashboard > SQL Editor

-- 1. Add website_url column if missing
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS website_url TEXT;

-- 2. Add logo column if missing
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS logo TEXT;

-- 3. Verify it worked
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'businesses';
