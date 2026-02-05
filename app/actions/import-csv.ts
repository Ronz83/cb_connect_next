'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export type ImportResult = {
    success: number;
    failed: number;
    errors: string[];
};

export async function importCSVData(businesses: any[]): Promise<ImportResult> {
    const supabase = await createClient();
    const results: ImportResult = {
        success: 0,
        failed: 0,
        errors: []
    };

    // We process in batches to be safe, though Supabase can handle bulk inserts
    // For better error reporting per-row, we'll do individual or small batches. 
    // Given the user wants "cleaner lists", we assume the volume isn't massive (e.g. < 1000).

    for (const biz of businesses) {
        try {
            // Validate required fields
            if (!biz.name) {
                results.failed++;
                results.errors.push(`Row missing Name: ${JSON.stringify(biz)}`);
                continue;
            }

            const { error } = await supabase
                .from('businesses')
                .insert({
                    name: biz.name,
                    industry: biz.industry || 'Other', // Using 'industry' as the Category
                    contact_email: biz.contact_email || null,
                    phone: biz.phone || null,
                    website_url: biz.website || null,
                    address: biz.city ? `${biz.address || ''}, ${biz.city}` : (biz.address || null),
                    // city column does not exist
                    country_code: biz.country || null, // Expecting 2-letter code
                    description: biz.description || 'Imported via CSV',
                    status: 'pending' // Default status
                });

            if (error) {
                console.error(`Import Error for ${biz.name}:`, error);
                results.failed++;
                results.errors.push(`${biz.name}: ${error.message}`);
            } else {
                results.success++;
            }

        } catch (err: any) {
            console.error("Server Exception:", err);
            results.failed++;
            results.errors.push(err.message);
        }
    }

    revalidatePath('/admin/businesses');
    return results;
}
