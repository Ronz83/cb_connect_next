-- Link the most recently created user to the first available business
-- This fixes the "No Business Linked" error on the dashboard

UPDATE public.profiles 
SET 
  business_id = (SELECT id FROM public.businesses LIMIT 1),
  role = 'business' 
WHERE 
  id = (SELECT id FROM auth.users ORDER BY created_at DESC LIMIT 1);

-- Verify the result
SELECT * FROM public.profiles WHERE id = (SELECT id FROM auth.users ORDER BY created_at DESC LIMIT 1);
