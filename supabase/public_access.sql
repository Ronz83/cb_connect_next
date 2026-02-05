-- PUBLIC ACCESS FIX
-- Run this in Supabase Dashboard > SQL Editor

-- Allow ANYONE (including unauthenticated users) to view businesses and their params
-- This is required for the public search and compare pages.

CREATE POLICY "Public can view businesses" ON businesses
  FOR SELECT USING (true);

CREATE POLICY "Public can view quote parameters" ON quote_parameters
  FOR SELECT USING (true);
