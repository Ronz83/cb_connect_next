
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; // Using Anon key to test same access level as client, or use SERVICE_ROLE if needed

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkData() {
    console.log('Checking Businesses table...');
    const { data: businesses, error } = await supabase.from('businesses').select('*');

    if (error) {
        console.error('Error fetching businesses:', error);
        return;
    }

    console.log(`Found ${businesses.length} businesses.`);
    if (businesses.length > 0) {
        console.log('Sample Business:', businesses[0]);
    } else {
        console.log('Table is empty.');
    }

    console.log('\nChecking Quote Parameters...');
    const { data: params, error: paramError } = await supabase.from('quote_parameters').select('*');
    if (paramError) {
        console.error('Error fetching params:', paramError);
    } else {
        console.log(`Found ${params.length} parameters.`);
    }
}

checkData();
