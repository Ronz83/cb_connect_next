'use server';

import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function submitApplication(jobId: string, coverLetter?: string) {
    const supabase = await createClient();

    // 1. Get User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return { success: false, message: 'You must be logged in to apply.' };
    }

    // 2. Check Candidate Status
    const { data: candidate } = await supabase
        .from('candidates')
        .select('id')
        .eq('id', user.id)
        .single();

    if (!candidate) {
        return { success: false, message: 'You must create a Candidate Profile before applying.', code: 'NO_PROFILE' };
    }

    // 3. Check if already applied
    const { data: existing } = await supabase
        .from('applications')
        .select('id')
        .eq('job_id', jobId)
        .eq('candidate_id', user.id)
        .single();

    if (existing) {
        return { success: false, message: 'You have already applied for this position.' };
    }

    // 4. Submit Application
    // Note: jobId in applications table references public.businesses(id) based on the SQL provided.
    // Ensure the ID passed matches the implementation.
    const { error } = await supabase.from('applications').insert({
        job_id: jobId,
        candidate_id: user.id,
        cover_letter: coverLetter || '',
        status: 'pending'
    });

    if (error) {
        console.error('Application error:', error);
        return { success: false, message: 'Failed to submit application: ' + error.message };
    }

    revalidatePath('/dashboard');
    return { success: true, message: 'Application submitted successfully!' };
}

export async function checkApplicationStatus(jobId: string) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { hasApplied: false };

    const { data } = await supabase
        .from('applications')
        .select('id, status')
        .eq('job_id', jobId)
        .eq('candidate_id', user.id)
        .single();

    return { hasApplied: !!data, status: data?.status };
}
