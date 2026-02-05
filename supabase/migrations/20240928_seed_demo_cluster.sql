-- DATA CLUSTER: 3 New Businesses with QuoteNow Params

-- 1. Joe's Plumbing (Service-based, simple multipliers)
DO $$
DECLARE
    biz_id BIGINT;
BEGIN
    INSERT INTO businesses (name, industry, city, country_code, description)
    VALUES ('Joe''s Plumbing', 'Trades', 'Bridgetown', 'BB', '24/7 Emergency Plumbing Services.')
    ON CONFLICT DO NOTHING; -- Assuming name unique constraint or just ignore duplication for demo
    
    SELECT id INTO biz_id FROM businesses WHERE name = 'Joe''s Plumbing';
    
    DELETE FROM quote_parameters WHERE business_id = biz_id;

    INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
    VALUES 
    (biz_id, 'Problem Type', 'select', ARRAY['Leak Repair', 'Clog Removal', 'Heater Install'], true, 1, '{"prices": {"Leak Repair": 150, "Clog Removal": 100, "Heater Install": 800}}'::jsonb),
    (biz_id, 'Emergency Service?', 'checkbox', ARRAY[]::text[], false, 2, '{"price": 100}'::jsonb);
END $$;

-- 2. Top Tier Roofing (Material-based, larger numbers)
DO $$
DECLARE
    biz_id BIGINT;
BEGIN
    INSERT INTO businesses (name, industry, city, country_code, description)
    VALUES ('Top Tier Roofing', 'Construction', 'Kingston', 'JM', 'Premium roofing solutions for residential homes.')
    ON CONFLICT DO NOTHING;
    
    SELECT id INTO biz_id FROM businesses WHERE name = 'Top Tier Roofing';

    DELETE FROM quote_parameters WHERE business_id = biz_id;

    INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
    VALUES 
    (biz_id, 'Roof Material', 'select', ARRAY['Asphalt Shingles', 'Metal', 'Clay Tile'], true, 1, '{"prices": {"Asphalt Shingles": 500, "Metal": 2500, "Clay Tile": 4000}}'::jsonb),
    (biz_id, 'Roof Area (Sq Ft)', 'number', ARRAY[]::text[], true, 2, '{"multiplier": 4}'::jsonb);
END $$;

-- 3. Caribbean Catering (Per-head logic)
DO $$
DECLARE
    biz_id BIGINT;
BEGIN
    INSERT INTO businesses (name, industry, city, country_code, description)
    VALUES ('Caribbean Catering', 'Hospitality', 'Nassau', 'BS', 'Authentic island cuisine for weddings and events.')
    ON CONFLICT DO NOTHING;
    
    SELECT id INTO biz_id FROM businesses WHERE name = 'Caribbean Catering';

    DELETE FROM quote_parameters WHERE business_id = biz_id;

    INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
    VALUES 
    (biz_id, 'Event Type', 'select', ARRAY['Wedding', 'Corporate', 'Birthday'], true, 1, '{"prices": {"Wedding": 1000, "Corporate": 500, "Birthday": 200}}'::jsonb),
    (biz_id, 'Number of Guests', 'number', ARRAY[]::text[], true, 2, '{"multiplier": 45}'::jsonb); -- $45 per head
END $$;
