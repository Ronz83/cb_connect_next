import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST() {
    // Start with a clean slate? No, just upsert.
    // Use SERVICE_ROLE_KEY to bypass RLS
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1. Joe's Plumbing
    let { data: b1 } = await supabase.from('businesses').select('id').eq('name', "Joe's Plumbing").single();
    if (!b1) {
        const { data: newB1 } = await supabase.from('businesses').insert({
            name: "Joe's Plumbing", industry: 'Trades', city: 'Bridgetown', country_code: 'BB', description: '24/7 Emergency Plumbing.'
        }).select().single();
        b1 = newB1;
    }
    if (b1) {
        await supabase.from('quote_parameters').delete().eq('business_id', b1.id);
        await supabase.from('quote_parameters').insert([
            { business_id: b1.id, label: 'Problem Type', field_type: 'select', options: ['Leak Repair', 'Clog Removal', 'Heater Install'], is_required: true, display_order: 1, logic_config: { prices: { "Leak Repair": 150, "Clog Removal": 100, "Heater Install": 800 } } },
            { business_id: b1.id, label: 'Emergency Service?', field_type: 'checkbox', options: [], is_required: false, display_order: 2, logic_config: { price: 100 } }
        ]);
    }

    // 2. Top Tier Roofing
    let { data: b2 } = await supabase.from('businesses').select('id').eq('name', "Top Tier Roofing").single();
    if (!b2) {
        const { data: newB2 } = await supabase.from('businesses').insert({
            name: "Top Tier Roofing", industry: 'Construction', city: 'Kingston', country_code: 'JM', description: 'Premium roofing solutions.'
        }).select().single();
        b2 = newB2;
    }
    if (b2) {
        await supabase.from('quote_parameters').delete().eq('business_id', b2.id);
        await supabase.from('quote_parameters').insert([
            { business_id: b2.id, label: 'Roof Material', field_type: 'select', options: ['Asphalt Shingles', 'Metal', 'Clay Tile'], is_required: true, display_order: 1, logic_config: { prices: { "Asphalt Shingles": 500, "Metal": 2500, "Clay Tile": 4000 } } },
            { business_id: b2.id, label: 'Roof Area (Sq Ft)', field_type: 'number', options: [], is_required: true, display_order: 2, logic_config: { multiplier: 4 } }
        ]);
    }

    // 3. Caribbean Catering
    let { data: b3 } = await supabase.from('businesses').select('id').eq('name', "Caribbean Catering").single();
    if (!b3) {
        const { data: newB3 } = await supabase.from('businesses').insert({
            name: "Caribbean Catering", industry: 'Hospitality', city: 'Nassau', country_code: 'BS', description: 'Authentic island cuisine.'
        }).select().single();
        b3 = newB3;
    }
    if (b3) {
        await supabase.from('quote_parameters').delete().eq('business_id', b3.id);
        await supabase.from('quote_parameters').insert([
            { business_id: b3.id, label: 'Event Type', field_type: 'select', options: ['Wedding', 'Corporate', 'Birthday'], is_required: true, display_order: 1, logic_config: { prices: { "Wedding": 1000, "Corporate": 500, "Birthday": 200 } } },
            { business_id: b3.id, label: 'Number of Guests', field_type: 'number', options: [], is_required: true, display_order: 2, logic_config: { multiplier: 45 } }
        ]);
    }

    // 4. Novelty Web Solutions (Ensure it exists too)
    let { data: b4 } = await supabase.from('businesses').select('id').eq('name', "Novelty Web Solutions").single();
    if (!b4) {
        const { data: newB4 } = await supabase.from('businesses').insert({
            name: 'Novelty Web Solutions', industry: 'Technology', description: 'Premium web design services.'
        }).select().single();
        b4 = newB4;
    }
    if (b4) {
        // We assume this might already be seeded, but let's be safe and ensure params exist if empty
        const { count } = await supabase.from('quote_parameters').select('*', { count: 'exact', head: true }).eq('business_id', b4.id);
        if (count === 0) {
            await supabase.from('quote_parameters').insert([
                { business_id: b4.id, label: 'Service Package', field_type: 'select', options: ['Landing Page', 'Small Business Website', 'E-commerce Platform'], is_required: true, display_order: 1, logic_config: { prices: { "Landing Page": 500, "Small Business Website": 1500, "E-commerce Platform": 3500 } } },
                { business_id: b4.id, label: 'Estimated Number of Pages', field_type: 'number', options: [], is_required: true, display_order: 2, logic_config: { multiplier: 150 } }
            ]);
        }
    }

    return NextResponse.json({ success: true, message: "Demo data seeded!" });
}
