-- FIX PERMISSIONS
-- You are being redirected because your user role is 'business', but /admin requires 'super_admin'.

-- OPTION 1: Promote specific email (Replace 'admin@example.com' with your login email)
-- UPDATE profiles 
-- SET role = 'super_admin' 
-- WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@example.com');

-- OPTION 2: Promote EVERYONE (Dev / Local only)
UPDATE profiles SET role = 'super_admin';

-- OPTION 3: Insert a default profile if missing (rare)
-- INSERT INTO profiles (id, role) VALUES ('USER_ID_HERE', 'super_admin');
