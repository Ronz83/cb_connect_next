-- Check table definition (id type) and list rows
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'businesses' AND column_name = 'id';

-- List actual IDs and Names to verify what exists
SELECT id, name, industry FROM businesses;
