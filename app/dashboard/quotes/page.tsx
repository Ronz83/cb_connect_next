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
            <div className="p-8 text-center bg-[#111] rounded-2xl border border-[#222]">
                <h2 className="text-xl font-bold text-orange-500">No Business Linked</h2>
                <p className="text-gray-400 mt-2">You must have a registered business to verify quote parameters.</p>
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
                    <h1 className="text-3xl font-bold mb-2">QuoteNow Engine ⚡</h1>
                    <p className="text-gray-400">Define the questions customers must answer to get a quote.</p>
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
                    <div className="bg-[#111] border border-[#222] p-6 rounded-2xl">
                        <h3 className="font-bold text-white mb-4">How it works</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex gap-2">
                                <span className="bg-orange-500/10 text-orange-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                                Add fields for information you need (e.g. "Roof Size").
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-orange-500/10 text-orange-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                                Customers see a "Get Quote" button on your profile.
                            </li>
                            <li className="flex gap-2">
                                <span className="bg-orange-500/10 text-orange-500 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                                Submissions appear here in your dashboard.
                            </li>
                        </ul>
                    </div>

                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                        <h3 className="font-bold text-blue-400 mb-2">Pro Tip</h3>
                        <p className="text-sm text-gray-400">
                            Short forms convert better. Only ask for what is absolutely necessary for an initial estimate.
                        </p>
                    </div>

                    <EmbedCodeGenerator businessId={profile.business_id} />
                </div>
            </div>
        </div>
    );
}
