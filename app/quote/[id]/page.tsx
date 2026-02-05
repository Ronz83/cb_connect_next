import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { QuoteForm } from '@/components/public/QuoteForm';
import { getQuoteParameters } from '@/app/actions/quote-parameters';
import { CBConnectLogo } from '@/components/CBConnectLogo';

export default async function PublicQuotePage({ params }: { params: { id: string } }) {
    const businessId = parseInt(params.id);
    if (isNaN(businessId)) return notFound();

    const supabase = await createClient();

    // Fetch Business Details
    const { data: business } = await supabase
        .from('businesses')
        .select('name, logo_url, description')
        .eq('id', businessId)
        .single();

    if (!business) return notFound();

    // Fetch Quote Parameters
    // We use the same server action or direct query. 
    // Since getQuoteParameters is protected? No, let's check. 
    // Ah, wait. `getQuoteParameters` server action calls `createClient()` which usually defaults to user session. 
    // But we need PUBLIC access here.
    // The RLS policy "Public read parameters" allows this, BUT standard `createClient` might not pass cookies if called from a server component for an anon user? 
    // Actually `createClient` in server.ts handles cookies. If no user, it's anon.
    // RLS policy: "Public read parameters" ON quote_parameters FOR SELECT USING (true); -> This should work for anon.

    // However, `getQuoteParameters` might throw error or be designed for dashboard. 
    // Let's just fetch directly here to be safe and efficient.

    const { data: parameters } = await supabase
        .from('quote_parameters')
        .select('*')
        .eq('business_id', businessId)
        .order('display_order', { ascending: true });

    return (
        <div className="min-h-screen bg-[#050505] text-white flex flex-col">
            <header className="p-6 border-b border-[#222] bg-[#0A0A0A]">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <CBConnectLogo />
                    <div className="text-sm text-gray-500">Secure Quote Request</div>
                </div>
            </header>

            <main className="flex-1 p-6 md:p-12">
                <div className="max-w-xl mx-auto">
                    <div className="text-center mb-10">
                        {business.logo_url && (
                            <img src={business.logo_url} alt={business.name} className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover border-2 border-[#222]" />
                        )}
                        <h1 className="text-3xl font-bold mb-2">Get a Quote from {business.name}</h1>
                        <p className="text-gray-400">{business.description?.substring(0, 100)}...</p>
                    </div>

                    <div className="bg-[#111] border border-[#222] rounded-2xl p-6 md:p-8 shadow-2xl shadow-orange-500/5">
                        <QuoteForm
                            businessId={businessId}
                            businessName={business.name}
                            parameters={parameters || []}
                        />
                    </div>

                    <div className="text-center mt-8 text-gray-500 text-xs">
                        Powered by <span className="text-orange-500 font-bold">CB Connect</span> & QuoteNow Engine
                    </div>
                </div>
            </main>
        </div>
    );
}
