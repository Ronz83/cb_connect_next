-- 1. Get the Business ID for "Novelty Web Solutions"
DO $$
DECLARE
    target_business_id BIGINT;
BEGIN
    SELECT id INTO target_business_id FROM businesses WHERE name = 'Novelty Web Solutions' LIMIT 1;

    -- If business doesn't exist, create it (Just in case)
    IF target_business_id IS NULL THEN
        INSERT INTO businesses (name, industry, city, website, description)
        VALUES ('Novelty Web Solutions', 'Technology', 'New York', 'https://noveltywebsolutions.com', 'Premium web design and development services.')
        RETURNING id INTO target_business_id;
    END IF;

    -- 2. Clear existing parameters for a clean slate
    DELETE FROM quote_parameters WHERE business_id = target_business_id;

    -- 3. Insert Test Parameters

    -- A. Service Level (Dropdown with Price Logic)
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

    -- B. Number of Pages (Number with Multiplier)
    INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
    VALUES (
        target_business_id, 
        'Estimated Number of Pages', 
        'number', 
        ARRAY[]::text[], 
        true, 
        2, 
        '{"multiplier": 150}'::jsonb -- $150 per page
    );

    -- C. Content Writers (Checkbox Add-on)
    INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
    VALUES (
        target_business_id, 
        'Include Standard SEO & Copywriting?', 
        'checkbox', 
        ARRAY[]::text[], 
        false, 
        3, 
        '{"price": 400}'::jsonb -- $400 flat fee
    );

    -- D. Turnaround Time (Select, no price, just info)
    INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
    VALUES (
        target_business_id, 
        'Desired Turnaround', 
        'select', 
        ARRAY['ASAP (Rush Fee applies)', 'Standard (2-3 weeks)', 'Flexible'], 
        true, 
        4, 
        '{"prices": {"ASAP (Rush Fee applies)": 500}}'::jsonb
    );

END $$;
