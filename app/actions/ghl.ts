'use server';

import { ghlClient } from '@/lib/ghl/client';
import { createClient } from '@/utils/supabase/server';

/**
 * Syncs a Directory User/Business to HighLevel as a Contact.
 * This should be called after Profile Update or Registration.
 */
export async function syncToGHL(userId: string) {
    const supabase = await createClient();

    // 1. Fetch Profile & Business Data
    const { data: profile } = await supabase
        .from('profiles')
        .select('*, businesses(*)')
        .eq('id', userId)
        .single();

    if (!profile) return { error: 'Profile not found' };

    const contactData = {
        firstName: profile.full_name?.split(' ')[0] || '',
        lastName: profile.full_name?.split(' ').slice(1).join(' ') || '',
        email: profile.email,
        phone: profile.phone,
        tags: ['directory-user', profile.role],
        customFields: [
            // Example Custom Field IDs (You would replace these with real GHL Field IDs)
            { id: process.env.GHL_FIELD_BUSINESS_NAME || 'business_name_field_id', value: profile.businesses?.name },
            { id: process.env.GHL_FIELD_PLAN || 'plan_field_id', value: 'free-tier' } // dynamic based on subscription
        ]
    };

    try {
        // 2. Search for existing contact by email to Update vs Create
        // Note: We need a Location ID. Assuming one from Env for now.
        const locationId = process.env.GHL_LOCATION_ID || 'utkMhULqPkUAjG5Kbkvf'; // fallback from debug file

        const searchRes = await ghlClient.getContacts(locationId, profile.email);
        const existingContact = searchRes.contacts && searchRes.contacts.length > 0 ? searchRes.contacts[0] : null;

        if (existingContact) {
            await ghlClient.updateContact(existingContact.id, contactData);
            return { success: true, action: 'updated', ghlId: existingContact.id };
        } else {
            const newContact = await ghlClient.createContact(locationId, contactData);
            return { success: true, action: 'created', ghlId: newContact.contact?.id };
        }

    } catch (error: any) {
        console.error('GHL Sync Error:', error);
        return { error: error.message };
    }
}
