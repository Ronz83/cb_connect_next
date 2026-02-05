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
            <div className="animate-in fade-in max-w-4xl">
                <h1 className="text-3xl font-bold mb-6">Edit Business Profile</h1>
                <div className="bg-card border-l-4 border-primary shadow-sm p-8 rounded-r-xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">No Business Linked</h2>
                    <p className="text-muted-foreground max-w-md mb-6">You need to have an active business listing associated with your account to edit profile details.</p>
                    <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors">
                        Contact Support
                    </button>
                </div>
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
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                <BusinessProfileForm initialData={business} />
            </div>
        </div>
    );
}
