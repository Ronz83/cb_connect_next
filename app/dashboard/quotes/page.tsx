import { createClient } from '@/utils/supabase/server';
import { QuoteParameterBuilder } from '@/components/dashboard/QuoteParameterBuilder';
import { EmbedCodeGenerator } from '@/components/dashboard/EmbedCodeGenerator';
import { getQuoteParameters } from '@/app/actions/quote-parameters';
import { redirect } from 'next/navigation';

export default async function QuoteNowPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('business_id')
        .eq('id', user.id)
        .single();

    if (!profile?.business_id) {
        return (
            <div className="animate-in fade-in max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 text-foreground">QuoteNow Engine ⚡</h1>
                <p className="text-muted-foreground mb-8">Define the questions customers must answer to get a quote.</p>

                <div className="bg-card border-l-4 border-primary shadow-sm p-8 rounded-r-xl flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">No Business Linked</h2>
                    <p className="text-muted-foreground max-w-md mb-6">You must have a registered business to configure the Quote Engine.</p>
                    <button className="px-6 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors">
                        Register Business
                    </button>
                </div>
            </div>
        );
    }

    // Fetch existing parameters
    let parameters: any[] = [];
    try {
        parameters = await getQuoteParameters(profile.business_id);
    } catch (e) {
        console.error(e);
        // If table doesn't exist yet or RLS fails
    }

    return (
        <div className="animate-in fade-in max-w-5xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2 text-foreground">QuoteNow Engine ⚡</h1>
                    <p className="text-muted-foreground">Define the questions customers must answer to get a quote.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <QuoteParameterBuilder
                        businessId={profile.business_id}
                        initialParameters={parameters}
                    />
                </div>

                <div className="space-y-6">
                    <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
                        <h3 className="font-bold text-foreground mb-4">How it works</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                            <li className="flex gap-2">
                                <span className="bg-accent/10 text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ring-1 ring-accent/20">1</span>
                                Add fields for information you need (e.g. "Roof Size").
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-accent/10 text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ring-1 ring-accent/20">2</span>
                                Customers see a "Get Quote" button on your profile.
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-accent/10 text-accent-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold ring-1 ring-accent/20">3</span>
                                Submissions appear here in your dashboard.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 p-6 rounded-2xl">
                        <h3 className="font-bold text-primary mb-2">Pro Tip</h3>
                        <p className="text-sm text-muted-foreground">
                            Short forms convert better. Only ask for what is absolutely necessary for an initial estimate.
                        </p>
                    </div>

                    <EmbedCodeGenerator businessId={profile.business_id} />
                </div>
            </div>
        </div>
    );
}
