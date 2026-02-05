'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function submitQuote(businessId: number, formData: any) {
    const supabase = await createClient();

    // 1. Basic Validation
    if (!formData.customer_email && !formData.customer_phone) {
        return { success: false, error: 'Please provide at least an email or phone number.' };
    }

    // 2. Prepare payload
    // We separate the standard contact info from the dynamic form data
    const payload = {
        business_id: businessId,
        customer_name: formData.customer_name,
        customer_email: formData.customer_email,
        customer_phone: formData.customer_phone,
        form_data: formData.answers, // The dynamic questions { "Roof Size": "1200" }
        status: 'new'
    };

    // 3. Insert
    const { error } = await supabase.from('quotes').insert(payload);

    if (error) {
        console.error('Submit Quote Error:', error);
        return { success: false, error: 'Failed to submit quote. Please try again.' };
    }

    // 4. Notifications (Optional: Email the business owner here?)

    return { success: true };
}
