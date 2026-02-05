import { createClient } from '@/utils/supabase/server';
import { FileText, MousePointerClick, Users } from 'lucide-react';

export default async function BusinessDashboard() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch user's business association
    const { data: profile } = await supabase
        .from('profiles')
        .select('*, businesses(*)')
        .eq('id', user?.id)
        .single();

    const business = profile?.businesses;

    return (
        <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold mb-2">Welcome, {profile?.full_name || 'Business Partner'}</h1>
            <p className="text-gray-400 mb-8">Manage your presence on CB Connect.</p>

            {/* Quick Stats Placeholder */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="p-6 rounded-2xl bg-[#111] border border-[#222]">
                    <div className="flex items-center gap-3 mb-2 text-orange-500">
                        <FileText size={20} />
                        <span className="text-sm font-medium text-gray-400">Quote Requests</span>
                    </div>
                    <div className="text-3xl font-bold">0</div>
                </div>

                <div className="p-6 rounded-2xl bg-[#111] border border-[#222]">
                    <div className="flex items-center gap-3 mb-2 text-blue-500">
                        <MousePointerClick size={20} />
                        <span className="text-sm font-medium text-gray-400">Profile Views</span>
                    </div>
                    <div className="text-3xl font-bold">0</div>
                </div>
            </div>

            {!business && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-6 rounded-xl text-yellow-200">
                    <h3 className="font-bold text-lg mb-2">No Business Linked</h3>
                    <p>It looks like your account hasn't been linked to a business listing yet. Please contact support.</p>
                </div>
            )}

            {business && (
                <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                    <h3 className="font-bold text-xl mb-4">Your Listing</h3>
                    <div className="flex items-center gap-4">
                        {business.logo_url && (
                            <img src={business.logo_url} alt="Logo" className="w-16 h-16 rounded-xl object-cover" />
                        )}
                        <div>
                            <div className="font-bold text-lg">{business.name}</div>
                            <div className="text-gray-400">{business.address}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
