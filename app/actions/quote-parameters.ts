'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getQuoteParameters(businessId: number) {
    const supabase = await createClient();
    const { data: parameters, error } = await supabase
        .from('quote_parameters')
        .select('*')
        .eq('business_id', businessId)
        .order('display_order', { ascending: true });

    if (error) throw new Error(error.message);
    return parameters;
}

export async function upsertQuoteParameter(businessId: number, parameter: any) {
    const supabase = await createClient();

    // Security check via RLS, but explicit profile check is good practice
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    // Prepare data
    const payload = {
        business_id: businessId,
        label: parameter.label,
        field_type: parameter.field_type,
        options: parameter.options ? parameter.options.split(',').map((o: string) => o.split(':')[0].trim()) : [],
        // Parse prices from options string if present (e.g. "Tile: 500")
        logic_config: {
            ...parameter.logic_config,
            prices: parameter.options && parameter.field_type === 'select' ?
                parameter.options.split(',').reduce((acc: any, curr: string) => {
                    const parts = curr.split(':');
                    if (parts.length > 1) {
                        acc[parts[0].trim()] = parseFloat(parts[1].trim());
                    }
                    return acc;
                }, {})
                : {}
        },
        is_required: parameter.is_required || false,
        display_order: parameter.display_order || 0,

    };

    let query = supabase.from('quote_parameters');

    if (parameter.id) {
        // Update
        const { error } = await query.update(payload).eq('id', parameter.id);
        if (error) return { success: false, error: error.message };
    } else {
        // Insert
        const { error } = await query.insert(payload);
        if (error) return { success: false, error: error.message };
    }

    revalidatePath('/dashboard/quotes');
    return { success: true };
}

export async function deleteQuoteParameter(id: number) {
    const supabase = await createClient();
    const { error } = await supabase.from('quote_parameters').delete().eq('id', id);

    if (error) return { success: false, error: error.message };

    revalidatePath('/dashboard/quotes');
    return { success: true };
}
