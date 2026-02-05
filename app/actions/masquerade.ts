'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function masqueradeAsBusiness(businessId: number) {
    // In a real app, verify the user is a super_admin here via Supabase!
    // For now we assume the caller checks or the session is checked.

    // Set a cookie that lasts for the session or a short duration
    const cookieStore = await cookies();
    cookieStore.set('masquerade_business_id', businessId.toString(), {
        path: '/',
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 3600 // 1 hour
    });

    revalidatePath('/', 'layout'); // clear cache
}

export async function exitMasquerade() {
    const cookieStore = await cookies();
    cookieStore.delete('masquerade_business_id');
    revalidatePath('/', 'layout');
}
