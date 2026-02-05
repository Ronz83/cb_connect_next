'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { syncToGHL } from '@/app/actions/ghl';

export async function updateBusinessProfile(businessId: number, formData: any) {
    const supabase = await createClient();

    // Security: Ensure the user actually owns this business
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const { data: profile } = await supabase
        .from('profiles')
        .select('business_id, role')
        .eq('id', user.id)
        .single();

    // Allow update if they are the owner OR a super admin
    const isOwner = profile?.business_id === businessId;
    const isAdmin = profile?.role === 'super_admin';

    if (!isOwner && !isAdmin) {
        return { success: false, error: 'Unauthorized: You do not manage this business.' };
    }

    const { error } = await supabase
        .from('businesses')
        .update({
            name: formData.name,
            description: formData.description,
            address: formData.address,
            phone: formData.phone,
            contact_email: formData.contact_email,
            website: formData.website,
            logo_url: formData.logo_url,
            // services: formData.services // Require array handling logic in UI
        })
        .eq('id', businessId);

    if (error) return { success: false, error: error.message };

    // Trigger GHL Sync
    try {
        await syncToGHL(user.id);
    } catch (err) {
        console.error("GHL Sync Failed", err);
        // Don't fail the request if sync fails, just log it
    }

    revalidatePath('/dashboard/profile');
    revalidatePath(`/business/${businessId}`); // Revalidate public page
    return { success: true };
}
