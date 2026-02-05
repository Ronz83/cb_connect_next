-- MANUAL SEED SCRIPT
-- Run this in Supabase Dashboard > SQL Editor to populate demo data directly.

DO $$
DECLARE
  joe_id bigint;
  top_id bigint;
  carib_id bigint;
  web_id bigint;
BEGIN
  --------------------------------------------------------------------------------
  -- 1. Joe's Plumbing
  --------------------------------------------------------------------------------
  SELECT id INTO joe_id FROM businesses WHERE name = 'Joe''s Plumbing' LIMIT 1;
  
  IF joe_id IS NULL THEN
    INSERT INTO businesses (name, industry, address, description, website_url, logo)
    VALUES (
      'Joe''s Plumbing', 
      'Trades', 
      'Bridgetown, BB', 
      'Over 20 years of experience in residential and commercial plumbing. We handle leaks, clogs, heater installations, and 24/7 emergency repairs with a 100% satisfaction guarantee.',
      'https://joesplumbing.demo',
      'https://placehold.co/400x400/orange/white?text=JP'
    )
    RETURNING id INTO joe_id;
    RAISE NOTICE 'Created Joe''s Plumbing: %', joe_id;
  ELSE
    UPDATE businesses SET 
      description = 'Over 20 years of experience in residential and commercial plumbing. We handle leaks, clogs, heater installations, and 24/7 emergency repairs with a 100% satisfaction guarantee.',
      website_url = 'https://joesplumbing.demo',
      logo = 'https://placehold.co/400x400/orange/white?text=JP'
    WHERE id = joe_id;
    RAISE NOTICE 'Updated Joe''s Plumbing: %', joe_id;
  END IF;

  -- Clear existing params to avoid duplicates
  DELETE FROM quote_parameters WHERE business_id = joe_id;
  
  -- Insert Params
  INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
  VALUES 
  (joe_id, 'Problem Type', 'select', ARRAY['Leak Repair', 'Clog Removal', 'Heater Install'], true, 1, '{"prices": {"Leak Repair": 150, "Clog Removal": 100, "Heater Install": 800}}'),
  (joe_id, 'Emergency Service?', 'checkbox', ARRAY[]::text[], false, 2, '{"price": 100}');


  --------------------------------------------------------------------------------
  -- 2. Top Tier Roofing
  --------------------------------------------------------------------------------
  SELECT id INTO top_id FROM businesses WHERE name = 'Top Tier Roofing' LIMIT 1;
  
  IF top_id IS NULL THEN
    INSERT INTO businesses (name, industry, address, description, website_url, logo)
    VALUES (
      'Top Tier Roofing', 
      'Construction', 
      'Kingston, JM', 
      'Jamaica''s #1 roofing specialists. From asphalt shingles to premium clay tiles, we protect your home with quality materials and expert craftsmanship.',
      'https://toptier.demo',
      'https://placehold.co/400x400/333/white?text=TTR'
    )
    RETURNING id INTO top_id;
    RAISE NOTICE 'Created Top Tier Roofing: %', top_id;
  ELSE
    UPDATE businesses SET 
      description = 'Jamaica''s #1 roofing specialists. From asphalt shingles to premium clay tiles, we protect your home with quality materials and expert craftsmanship.',
      website_url = 'https://toptier.demo',
      logo = 'https://placehold.co/400x400/333/white?text=TTR'
    WHERE id = top_id;
    RAISE NOTICE 'Updated Top Tier Roofing: %', top_id;
  END IF;

  DELETE FROM quote_parameters WHERE business_id = top_id;
  
  INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
  VALUES
  (top_id, 'Roof Material', 'select', ARRAY['Asphalt Shingles', 'Metal', 'Clay Tile'], true, 1, '{"prices": {"Asphalt Shingles": 500, "Metal": 2500, "Clay Tile": 4000}}'),
  (top_id, 'Roof Area (Sq Ft)', 'number', ARRAY[]::text[], true, 2, '{"multiplier": 4}');

  -- 2b. Reliable Roofers (Competitor)
  SELECT id INTO top_id FROM businesses WHERE name = 'Reliable Roofers Ltd' LIMIT 1;

  IF top_id IS NULL THEN 
      INSERT INTO businesses (name, industry, address, description, website_url, logo)
      VALUES (
        'Reliable Roofers Ltd', 
        'Construction', 
        'Montego Bay, JM', 
        'Affordable, reliable, and fast. We specialize in quick repairs and budget-friendly roof replacements for residential homes.',
        'https://reliable.demo',
        'https://placehold.co/400x400/blue/white?text=RR'
      )
      RETURNING id INTO top_id;
  ELSE
      UPDATE businesses SET
        description = 'Affordable, reliable, and fast. We specialize in quick repairs and budget-friendly roof replacements for residential homes.',
        website_url = 'https://reliable.demo',
        logo = 'https://placehold.co/400x400/blue/white?text=RR'
      WHERE id = top_id;
  END IF;

  -- Add params for Reliable Roofers (slightly cheaper logic)
  DELETE FROM quote_parameters WHERE business_id = top_id;
  INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
  VALUES
  (top_id, 'Roof Material', 'select', ARRAY['Asphalt Shingles', 'Metal', 'Clay Tile'], true, 1, '{"prices": {"Asphalt Shingles": 400, "Metal": 2200, "Clay Tile": 3800}}'),
  (top_id, 'Roof Area (Sq Ft)', 'number', ARRAY[]::text[], true, 2, '{"multiplier": 3.5}');


  --------------------------------------------------------------------------------
  -- 3. Caribbean Catering
  --------------------------------------------------------------------------------
  SELECT id INTO carib_id FROM businesses WHERE name = 'Caribbean Catering' LIMIT 1;
  
  IF carib_id IS NULL THEN
    INSERT INTO businesses (name, industry, address, description, website_url, logo)
    VALUES (
      'Caribbean Catering', 
      'Hospitality', 
      'Nassau, BS', 
      'Authentic island cuisine for your special events. We bring the taste of the Caribbean to weddings, corporate events, and parties.',
      'https://caribcater.demo',
      'https://placehold.co/400x400/green/white?text=CC'
    )
    RETURNING id INTO carib_id;
  ELSE
    UPDATE businesses SET
      description = 'Authentic island cuisine for your special events. We bring the taste of the Caribbean to weddings, corporate events, and parties.',
      website_url = 'https://caribcater.demo',
      logo = 'https://placehold.co/400x400/green/white?text=CC'
    WHERE id = carib_id;
  END IF;

  DELETE FROM quote_parameters WHERE business_id = carib_id;

  INSERT INTO quote_parameters (business_id, label, field_type, options, is_required, display_order, logic_config)
  VALUES
  (carib_id, 'Event Type', 'select', ARRAY['Wedding', 'Corporate', 'Birthday'], true, 1, '{"prices": {"Wedding": 1000, "Corporate": 500, "Birthday": 200}}'),
  (carib_id, 'Number of Guests', 'number', ARRAY[]::text[], true, 2, '{"multiplier": 45}');

  RAISE NOTICE 'Seeding Complete!';
END $$;
