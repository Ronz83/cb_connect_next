-- Seed Data for 'details' and 'cover_image' columns
-- Run this AFTER running add_details_column.sql

-- 1. Auto (Land Cruiser) -> Assuming ID 1 or name match.
-- We'll use names to update specific records if they exist, or just insert dummy if not.
-- For safety, let's update by ID if we know them from previous see, or generic update.

-- Upodate Joe's Plumbing (Service)
UPDATE businesses 
SET 
  cover_image = 'https://images.unsplash.com/photo-1581578014828-00f9b3d40436?q=80&w=2940&auto=format&fit=crop',
  details = '{
    "features": ["24/7 Service", "Licensed & Insured", "Free Estimates"]
  }'::jsonb
WHERE name = 'Joe''s Plumbing';

-- Update Top Tier Roofing (Construction)
UPDATE businesses
SET
  cover_image = 'https://images.unsplash.com/photo-1632759196229-eb872c0cc653?q=80&w=2940&auto=format&fit=crop',
  details = '{
    "features": ["Warranty Included", "Certified Installers"]
  }'::jsonb
WHERE name = 'Top Tier Roofing';

-- Insert a Mock CAR for verification if not exists
INSERT INTO businesses (name, industry, address, description, website_url, logo, cover_image, details)
VALUES (
  '2024 Toyota Land Cruiser',
  'Automotive',
  'Kingston, JM',
  'The all-new Land Cruiser 300. Twin Turbo V6 Diesel.',
  'https://toyota.demo',
  'https://placehold.co/100x100/black/white?text=TOYOTA',
  'https://images.unsplash.com/photo-1594502184342-2e12f877aa71?q=80&w=2940&auto=format&fit=crop',
  '{
    "specs": {
      "engine": "3.3L V6 Twin Turbo Diesel",
      "transmission": "10-speed Automatic",
      "drivetrain": "4WD",
      "color": "White Pearl",
      "year": "2024",
      "condition": "New"
    },
    "features": ["4WD", "Diesel Engine", "Leather Seats", "Sunroof"]
  }'::jsonb
);

-- Insert a Mock PROPERTY
INSERT INTO businesses (name, industry, address, description, website_url, logo, cover_image, details)
VALUES (
  'Ocean View Villa',
  'Real Estate',
  'Montego Bay, JM',
  'Luxury 5 bedroom villa with private beach access.',
  'https://realtor.demo',
  'https://placehold.co/100x100/green/white?text=VILLA',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop',
  '{
    "propertyDetails": {
      "yearBuilt": "2018",
      "lotSize": "0.75 Acres",
      "sqFt": "6,500",
      "hoaFees": "$500/mo",
      "type": "Single Family"
    },
    "features": ["Pool", "Beach Access", "Gated", "Staff Quarters"],
    "gallery": [
       "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop",
       "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop"
    ]
  }'::jsonb
);

-- Insert a Mock JOB
INSERT INTO businesses (name, industry, address, description, website_url, logo, cover_image, details)
VALUES (
  'Senior React Developer',
  'Jobs',
  'Bridgetown, BB',
  'We are seeking a talented Senior React Developer to join our team.',
  'https://techjobs.demo',
  'https://placehold.co/100x100/purple/white?text=DEV',
  'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop',
  '{
    "jobDetails": {
      "salary": "$80,000 - $120,000 / yr",
      "type": "Full-time",
      "department": "Engineering",
      "posted": "2 days ago",
      "remote": true
    },
    "features": ["Remote Work", "Health Insurance", "Stock Options"]
  }'::jsonb
);
