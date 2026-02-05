import { createClient } from '@/utils/supabase/server';
import { BusinessProfileForm } from '@/components/dashboard/BusinessProfileForm';
import { redirect } from 'next/navigation';

export default async function BusinessProfilePage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('business_id, role')
        .eq('id', user.id)
        .single();

    if (!profile?.business_id) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-xl font-bold text-orange-500">No Business Linked</h2>
                <p className="text-gray-400 mt-2">Please contact an administrator to link your account to a business listing.</p>
            </div>
        );
    }

    // Fetch Business Data
    const { data: business } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', profile.business_id)
        .single();

    return (
        <div className="animate-in fade-in max-w-4xl">
            <h1 className="text-3xl font-bold mb-6">Edit Business Profile</h1>
            <div className="bg-[#111] border border-[#222] rounded-2xl p-8">
                <BusinessProfileForm initialData={business} />
            </div>
        </div>
    );
}
