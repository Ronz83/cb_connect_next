'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function importGHLContacts(contacts: any[]) {
    const supabase = await createClient();
    const results = {
        success: 0,
        failed: 0,
        errors: [] as string[]
    };

    for (const contact of contacts) {
        try {
            // Mapping Logic
            const businessData = {
                name: contact.companyName || `${contact.firstName || ''} ${contact.lastName || ''}`.trim() || 'Unknown Business',
                contact_email: contact.email || null,
                phone: contact.phone || null,
                // Extract Custom Field for URL (ID: Un6gAIqyim364AumAIHm)
                website: contact.customFields?.find((cf: any) => cf.id === 'Un6gAIqyim364AumAIHm')?.value || contact.website || null,
                address: contact.address1 || null,
                city: contact.city || null,
                country: contact.country || null,
                // Default values or placeholders
                description: `Imported from Go High Level (Source ID: ${contact.id})`,
                status: 'pending', // Pending verification
            };

            // Upsert based on email to prevent duplicates if possible, 
            // but unique constraint might be on ID. For now, we just Insert.
            // If you want robust deduplication, we'd query first. 
            // Letting Supabase handle ID generation.

            const { error } = await supabase
                .from('businesses')
                .insert(businessData);

            if (error) {
                console.error(`Failed to import ${businessData.name}:`, error);
                results.failed++;
                results.errors.push(`${businessData.name}: ${error.message}`);
            } else {
                results.success++;
            }

        } catch (err: any) {
            console.error("Import Exception:", err);
            results.failed++;
            results.errors.push(err.message);
        }
    }

    revalidatePath('/admin/businesses');
    return results;
}
