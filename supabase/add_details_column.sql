-- Add 'details' JSONB column for flexible category-specific data
ALTER TABLE businesses 
ADD COLUMN IF NOT EXISTS details JSONB DEFAULT '{}'::jsonb;

-- Add 'cover_image' for hero banner
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS cover_image TEXT;

-- Comment to explain usage
COMMENT ON COLUMN businesses.details IS 'Stores category-specific attributes like specs for cars, property details for real estate, etc.';
