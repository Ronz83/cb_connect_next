-- Add Logic fields to Quote Parameters
ALTER TABLE quote_parameters 
ADD COLUMN IF NOT EXISTS logic_config JSONB DEFAULT '{}'; 
-- logic_config structure:
-- For Number: { "multiplier": 10, "base": 5 } -> (Input * 10) + 5
-- For Select: { "values": { "Option A": 100, "Option B": 200 } }

-- Add currency setting to business
ALTER TABLE businesses
ADD COLUMN IF NOT EXISTS currency TEXT DEFAULT 'USD';
