
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing Supabase URL or Service Role Key');
    process.exit(1);
}

// Create client with Service Role to bypass RLS
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
    console.log('Seeding Demo Data...');

    // 1. Joe's Plumbing
    let { data: b1 } = await supabase.from('businesses').select('id').eq('name', "Joe's Plumbing").single();
    if (!b1) {
        console.log("Creating Joe's Plumbing...");
        const { data: newB1, error } = await supabase.from('businesses').insert({
            name: "Joe's Plumbing", industry: 'Trades', city: 'Bridgetown', country_code: 'BB', description: '24/7 Emergency Plumbing.'
        }).select().single();
        if (error) console.error("Error creating Joe's:", error);
        b1 = newB1;
    }
    if (b1) {
        console.log("Adding Params for Joe's...");
        await supabase.from('quote_parameters').delete().eq('business_id', b1.id);
        await supabase.from('quote_parameters').insert([
            { business_id: b1.id, label: 'Problem Type', field_type: 'select', options: ['Leak Repair', 'Clog Removal', 'Heater Install'], is_required: true, display_order: 1, logic_config: { prices: { "Leak Repair": 150, "Clog Removal": 100, "Heater Install": 800 } } },
            { business_id: b1.id, label: 'Emergency Service?', field_type: 'checkbox', options: [], is_required: false, display_order: 2, logic_config: { price: 100 } }
        ]);
    }

    // 2. Top Tier Roofing
    let { data: b2 } = await supabase.from('businesses').select('id').eq('name', "Top Tier Roofing").single();
    if (!b2) {
        console.log("Creating Top Tier Roofing...");
        const { data: newB2, error } = await supabase.from('businesses').insert({
            name: "Top Tier Roofing", industry: 'Construction', city: 'Kingston', country_code: 'JM', description: 'Premium roofing solutions.'
        }).select().single();
        if (error) console.error("Error creating Top Tier:", error);
        b2 = newB2;
    }
    if (b2) {
        console.log("Adding Params for Top Tier...");
        await supabase.from('quote_parameters').delete().eq('business_id', b2.id);
        await supabase.from('quote_parameters').insert([
            { business_id: b2.id, label: 'Roof Material', field_type: 'select', options: ['Asphalt Shingles', 'Metal', 'Clay Tile'], is_required: true, display_order: 1, logic_config: { prices: { "Asphalt Shingles": 500, "Metal": 2500, "Clay Tile": 4000 } } },
            { business_id: b2.id, label: 'Roof Area (Sq Ft)', field_type: 'number', options: [], is_required: true, display_order: 2, logic_config: { multiplier: 4 } }
        ]);
    }

    console.log('Seeding Complete!');
}

seed();
