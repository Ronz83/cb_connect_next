'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateUserRole(userId: string, role: 'super_admin' | 'partner' | 'business') {
    const supabase = await createClient();

    // Security Check: Only Super Admins can do this
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const { data: currentUserProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (currentUserProfile?.role !== 'super_admin') {
        return { success: false, error: 'Unauthorized: Super Admin access required' };
    }

    const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);

    if (error) return { success: false, error: error.message };

    revalidatePath('/admin/users');
    return { success: true };
}

export async function assignBusinessToUser(userId: string, businessId: number | null) {
    const supabase = await createClient();

    // Security Check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    const { data: currentUserProfile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

    if (currentUserProfile?.role !== 'super_admin') {
        return { success: false, error: 'Unauthorized' };
    }

    const { error } = await supabase
        .from('profiles')
        .update({ business_id: businessId })
        .eq('id', userId);

    if (error) return { success: false, error: error.message };

    revalidatePath('/admin/users');
    return { success: true };
}
