import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();
    const { data: businesses, error } = await supabase.from('businesses').select('*');
    return NextResponse.json({ businesses, error });
}
