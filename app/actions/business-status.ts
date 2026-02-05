'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateBusinessStatus(ids: number[], status: 'active' | 'archived') {
    const supabase = await createClient();

    try {
        const { error } = await supabase
            .from('businesses')
            .update({ status }) // This assumes the column 'status' exists or will exist
            .in('id', ids);

        if (error) {
            console.error('Error updating status:', error);
            return { success: false, error: error.message };
        }

        revalidatePath('/admin/businesses');
        return { success: true };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
}
