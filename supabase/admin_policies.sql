-- Admin Policies for Businesses Table

-- Insert Policy
CREATE POLICY "Enable insert for authenticated users only" 
ON businesses 
FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Update Policy
CREATE POLICY "Enable update for authenticated users only" 
ON businesses 
FOR UPDATE 
TO authenticated 
USING (true)
WITH CHECK (true);

-- Delete Policy
CREATE POLICY "Enable delete for authenticated users only" 
ON businesses 
FOR DELETE 
TO authenticated 
USING (true);
