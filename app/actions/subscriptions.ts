'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function getPlans() {
    const supabase = await createClient();

    const { data: plans, error } = await supabase
        .from('plans')
        .select('*')
        .eq('is_active', true)
        .order('price', { ascending: true });

    if (error) {
        console.error('Error fetching plans:', error);
        return [];
    }

    return plans || [];
}

export async function subscribeToPlan(planId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return { success: false, message: 'Please log in to subscribe.' };
    }

    // 1. Check if user already has an active subscription of this type
    // (For MVP we might just allow one sub per user, or one per type)
    // Let's assume one active subscription per user for simplicity in this iteration, 
    // OR we can just insert a new one.

    // For now, let's just create the subscription record.
    const { error } = await supabase.from('subscriptions').insert({
        user_id: user.id,
        plan_id: planId,
        status: 'active',
        current_period_start: new Date().toISOString(),
        // Mock end date 30 days from now
        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    });

    if (error) {
        console.error('Subscription error:', error);
        return { success: false, message: 'Failed to process subscription.' };
    }

    revalidatePath('/dashboard');
    revalidatePath('/pricing');
    return { success: true, message: 'Successfully subscribed!' };
}
