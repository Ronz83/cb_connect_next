
import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();
    const headers = { 'Content-Type': 'application/json' };

    const results: any = {
        tables: {},
        seeds: {},
        status: 'ok'
    };

    // 1. Check Candidates Table
    const { count: candidatesCount, error: candidateError } = await supabase.from('candidates').select('*', { count: 'exact', head: true });
    results.tables.candidates = candidateError ? { status: 'missing', error: candidateError.message } : { status: 'ok', count: candidatesCount };

    // 2. Check Applications Table
    const { count: appCount, error: appError } = await supabase.from('applications').select('*', { count: 'exact', head: true });
    results.tables.applications = appError ? { status: 'missing', error: appError.message } : { status: 'ok', count: appCount };

    // 3. Check Plans Table (Monetization)
    const { count: plansCount, error: plansError } = await supabase.from('plans').select('*', { count: 'exact', head: true });
    results.tables.plans = plansError ? { status: 'missing', error: plansError.message } : { status: 'ok', count: plansCount };

    // Check specific plans seeding (should be ~17)
    if (!plansError) {
        if ((plansCount || 0) < 5) {
            results.seeds.plans = { status: 'warning', message: `Only found ${plansCount} plans. Expected ~17.` };
        } else {
            results.seeds.plans = { status: 'ok', count: plansCount };
        }
    }

    // 4. Check Subscriptions Table
    const { count: subCount, error: subError } = await supabase.from('subscriptions').select('*', { count: 'exact', head: true });
    results.tables.subscriptions = subError ? { status: 'missing', error: subError.message } : { status: 'ok', count: subCount };

    // 5. Check Business details schema (heuristic)
    // We check if we can query the 'sector' field which requires the jsonb update to be useful, 
    // although the column 'details' existed before. We'll just check if we can fetch one.
    const { data: businessData, error: businessError } = await supabase.from('businesses').select('details').limit(1);
    results.tables.businesses = businessError ? { status: 'error', error: businessError.message } : { status: 'ok' };

    // Determine overall status
    if (candidateError || appError || plansError || subError) {
        results.status = 'error';
    } else if (results.seeds.plans?.status === 'warning') {
        results.status = 'warning';
    }

    return NextResponse.json(results);
}
