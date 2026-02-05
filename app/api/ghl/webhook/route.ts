import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(request: Request) {
    const supabase = await createClient();
    const data = await request.json();

    // Log the webhook for debugging
    console.log('GHL Webhook received:', JSON.stringify(data, null, 2));

    // Validate Secret if you have one
    // if (request.headers.get('Authorization') !== process.env.GHL_WEBHOOK_SECRET) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { type, email, locationId } = data;

        // Handle specific GHL Triggers
        if (type === 'ContactDelete') {
            // Handle cleanup if needed
        }

        // Example: If GHL sends a "Verified" tag update
        if (data.tags && data.tags.includes('verified-business')) {
            // Find user by email and update verified status
            const { data: profile } = await supabase.from('profiles').select('id, business_id').eq('email', email).single();
            if (profile?.business_id) {
                await supabase.from('businesses').update({ is_verified: true }).eq('id', profile.business_id);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Webhook processing error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
