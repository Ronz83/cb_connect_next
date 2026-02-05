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
                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-2 text-accent">
                        <FileText size={20} />
                        <span className="text-sm font-medium text-muted-foreground">Quote Requests</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground">0</div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border shadow-sm">
                    <div className="flex items-center gap-3 mb-2 text-primary">
                        <MousePointerClick size={20} />
                        <span className="text-sm font-medium text-muted-foreground">Profile Views</span>
                    </div>
                    <div className="text-3xl font-bold text-foreground">0</div>
                </div>
            </div>

            {!business && (
                <div className="bg-card border-l-4 border-primary shadow-sm p-6 rounded-r-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div>
                        <h3 className="font-bold text-lg text-foreground mb-1">No Business Linked</h3>
                        <p className="text-muted-foreground">Your account is not yet associated with a business listing. Link your business to unlock dashboard features.</p>
                    </div>
                    <button className="px-5 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
                        Contact Support
                    </button>
                </div>
            )}

            {business && (
                <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                    <h3 className="font-bold text-xl mb-4 text-foreground">Your Listing</h3>
                    <div className="flex items-center gap-4">
                        {business.logo_url && (
                            <img src={business.logo_url} alt="Logo" className="w-16 h-16 rounded-xl object-cover" />
                        )}
                        <div>
                            <div className="font-bold text-lg text-foreground">{business.name}</div>
                            <div className="text-muted-foreground">{business.address}</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
