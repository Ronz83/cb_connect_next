
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://beazuqogozbjltunxjhd.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlYXp1cW9nb3piamx0dW54amhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNzExMzEsImV4cCI6MjA4NTY0NzEzMX0.j3A1WbDylwvmX4Kg3fRDQe6FEP8GH6IjcUoUp1JTlWI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkColumns() {
    console.log('Checking for website_url and logo columns in businesses table...');

    const { data, error } = await supabase
        .from('businesses')
        .select('website_url, logo')
        .limit(1);

    if (error) {
        console.error('Error checking columns:', error);
        // If code is 'PGRST100' or similar related to column not found, we know they are missing.
        // specifically "Could not find the 'website_url' column" etc.
        if (error.message.includes('column') && error.message.includes('does not exist')) {
            console.log('MISSING_COLUMNS');
        }
    } else {
        console.log('Columns exist! Data sample:', data);
        console.log('COLUMNS_PRESENT');
    }
}

checkColumns();
