-- SAFE VERSION: Removed 'website' column which caused errors.

DO $$
DECLARE
    target_business_id BIGINT;
BEGIN
    -- 1. Find or Create the Business
    -- We removed 'website' and 'city' from INSERT just in case they don't exist.
    -- We assume 'name' and 'industry' are safe.
    
    SELECT id INTO target_business_id FROM businesses WHERE name = 'Novelty Web Solutions' LIMIT 1;

    IF target_business_id IS NULL THEN
        INSERT INTO businesses (name, industry, description)
        VALUES ('Novelty Web Solutions', 'Technology', 'Premium web design services.')
        RETURNING id INTO target_business_id;
    END IF;

    -- 2. Insert Parameters (Only if they don't exist yet)
    
    -- A. Service Package
    IF NOT EXISTS (SELECT 1 FROM quote_parameters WHERE business_id = target_business_id AND label = 'Service Package') THEN
        INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
        VALUES (
            target_business_id, 
            'Service Package', 
            'select', 
            ARRAY['Landing Page', 'Small Business Website', 'E-commerce Platform'], 
            true, 
            1, 
            '{"prices": {"Landing Page": 500, "Small Business Website": 1500, "E-commerce Platform": 3500}}'::jsonb
        );
    END IF;

    -- B. Number of Pages
    IF NOT EXISTS (SELECT 1 FROM quote_parameters WHERE business_id = target_business_id AND label = 'Estimated Number of Pages') THEN
        INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
        VALUES (
            target_business_id, 
            'Estimated Number of Pages', 
            'number', 
            ARRAY[]::text[], 
            true, 
            2, 
            '{"multiplier": 150}'::jsonb
        );
    END IF;

    -- C. Content Writers / SEO
    IF NOT EXISTS (SELECT 1 FROM quote_parameters WHERE business_id = target_business_id AND label = 'Include Standard SEO & Copywriting?') THEN
        INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
        VALUES (
            target_business_id, 
            'Include Standard SEO & Copywriting?', 
            'checkbox', 
            ARRAY[]::text[], 
            false, 
            3, 
            '{"price": 400}'::jsonb
        );
    END IF;

END $$;
