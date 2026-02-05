-- Create Roles Enum
CREATE TYPE user_role AS ENUM ('super_admin', 'partner', 'business');

-- Create Profiles Table (Public Profile for each Auth User)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'business',
  business_id BIGINT REFERENCES businesses(id) ON DELETE SET NULL,
  full_name TEXT,
  email TEXT, -- Copied from auth for easier queries
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
-- 1. Users can read their own profile
CREATE POLICY "Users can see own profile" ON profiles 
  FOR SELECT USING (auth.uid() = id);

-- 2. Super Admins can do everything
CREATE POLICY "Super Admins can do everything" ON profiles 
  FOR ALL USING (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'super_admin'
    )
  );

-- Trigger to create profile on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role, full_name)
  VALUES (new.id, new.email, 'business', new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
