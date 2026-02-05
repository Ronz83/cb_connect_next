-- Add status column if it doesn't exist
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Optional: Update existing rows to be active
UPDATE businesses SET status = 'active' WHERE status IS NULL;
