-- RLS FIX SCRIPT
-- Run this in your Supabase Dashboard > SQL Editor

-- 1. Enable RLS on businesses (if not already)
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_parameters ENABLE ROW LEVEL SECURITY;

-- 2. Allow Super Admins to Insert/Update/Delete Businesses
CREATE POLICY "Super Admins can manage businesses" ON businesses
  FOR ALL USING (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- 3. Allow Super Admins to manage Quote Parameters
CREATE POLICY "Super Admins can manage quote parameters" ON quote_parameters
  FOR ALL USING (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- 4. IMPORTANT: Make sure YOU are a super_admin
-- Replace 'your_email@example.com' with your actual login email
-- UPDATE profiles SET role = 'super_admin' WHERE email = 'your_email@example.com';
