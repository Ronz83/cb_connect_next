-- CARICOM COUNTRIES SEED
-- Run this to populate the 'countries' table with all 15 Member States and 5 Associate Members.

-- Clear existing countries to ensure clean state (Optional, comment out if preserving)
TRUNCATE countries CASCADE;

INSERT INTO countries (name, code, flag, associate) VALUES
-- Full Members
('Antigua and Barbuda', 'AG', '🇦🇬', false),
('Bahamas', 'BS', '🇧🇸', false),
('Barbados', 'BB', '🇧🇧', false),
('Belize', 'BZ', '🇧🇿', false),
('Dominica', 'DM', '🇩🇲', false),
('Grenada', 'GD', '🇬🇩', false),
('Guyana', 'GY', '🇬🇾', false),
('Haiti', 'HT', '🇭🇹', false),
('Jamaica', 'JM', '🇯🇲', false),
('Montserrat', 'MS', '🇲🇸', false),
('Saint Kitts and Nevis', 'KN', '🇰🇳', false),
('Saint Lucia', 'LC', '🇱🇨', false),
('Saint Vincent and the Grenadines', 'VC', '🇻🇨', false),
('Suriname', 'SR', '🇸🇷', false),
('Trinidad and Tobago', 'TT', '🇹🇹', false),

-- Associate Members
('Anguilla', 'AI', '🇦🇮', true),
('Bermuda', 'BM', '🇧🇲', true),
('British Virgin Islands', 'VG', '🇻🇬', true),
('Cayman Islands', 'KY', '🇰🇾', true),
('Turks and Caicos Islands', 'TC', '🇹🇨', true);
