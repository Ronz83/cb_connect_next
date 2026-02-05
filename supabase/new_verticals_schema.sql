-- NEW VERTICALS SCHEMA
-- Creates tables for Cars, Real Estate, and Jobs

-- 1. Car Listings
CREATE TABLE IF NOT EXISTS public.car_listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    make TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    type TEXT CHECK (type IN ('Sale', 'Rent')) NOT NULL,
    condition TEXT CHECK (condition IN ('New', 'Used')) DEFAULT 'Used',
    mileage INTEGER, -- Can be null for rentals
    image_url TEXT,
    description TEXT,
    country_code TEXT NOT NULL, -- Link to country
    seller_id UUID REFERENCES auth.users(id), -- If specific user
    business_id BIGINT REFERENCES businesses(id), -- If a dealership
    is_featured BOOLEAN DEFAULT false
);

-- 2. Real Estate Listings
CREATE TABLE IF NOT EXISTS public.real_estate_listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    type TEXT CHECK (type IN ('Sale', 'Rent', 'Lease')) NOT NULL,
    property_type TEXT CHECK (property_type IN ('House', 'Apartment', 'Commercial', 'Land')) NOT NULL,
    price INTEGER NOT NULL,
    currency TEXT DEFAULT 'USD',
    bedrooms INTEGER,
    bathrooms NUMERIC,
    sq_ft INTEGER,
    address TEXT,
    city TEXT,
    country_code TEXT NOT NULL,
    image_url TEXT,
    description TEXT,
    features TEXT[], -- Array of features like 'Pool', 'Garden'
    agent_id UUID REFERENCES auth.users(id),
    business_id BIGINT REFERENCES businesses(id),
    is_featured BOOLEAN DEFAULT false
);

-- 3. Job Listings
CREATE TABLE IF NOT EXISTS public.job_listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    title TEXT NOT NULL,
    employer_name TEXT NOT NULL, -- Can be manual or linked
    business_id BIGINT REFERENCES businesses(id), -- If linked to directory profile
    type TEXT CHECK (type IN ('Full-time', 'Part-time', 'Contract', 'Remote')) DEFAULT 'Full-time',
    location TEXT NOT NULL,
    country_code TEXT NOT NULL,
    salary_range TEXT, -- e.g. "$50k - $70k"
    description TEXT NOT NULL,
    requirements TEXT[],
    apply_url TEXT, -- External link
    posted_by UUID REFERENCES auth.users(id)
);

-- ENABLE RLS
ALTER TABLE car_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_listings ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES
CREATE POLICY "Public can view cars" ON car_listings FOR SELECT USING (true);
CREATE POLICY "Public can view real estate" ON real_estate_listings FOR SELECT USING (true);
CREATE POLICY "Public can view jobs" ON job_listings FOR SELECT USING (true);

-- ADMIN WRITE POLICIES (Super Admins only for now)
-- (Users can be added later via dedicated policies)
CREATE POLICY "Super Admins can manage cars" ON car_listings 
FOR ALL USING (exists (select 1 from profiles where id = auth.uid() and role = 'super_admin'));

CREATE POLICY "Super Admins can manage real estate" ON real_estate_listings 
FOR ALL USING (exists (select 1 from profiles where id = auth.uid() and role = 'super_admin'));

CREATE POLICY "Super Admins can manage jobs" ON job_listings 
FOR ALL USING (exists (select 1 from profiles where id = auth.uid() and role = 'super_admin'));
