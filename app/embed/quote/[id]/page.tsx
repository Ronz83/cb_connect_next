import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { QuoteForm } from '@/components/public/QuoteForm';

// This is the "Clean" version for iframes. No header, no footer, just the form.
export default async function EmbedQuotePage({ params }: { params: { id: string } }) {
    const businessId = parseInt(params.id);
    if (isNaN(businessId)) return notFound();

    const supabase = await createClient();

    // Fetch Business Details
    const { data: business } = await supabase
        .from('businesses')
        .select('name, logo_url') // Minimal data
        .eq('id', businessId)
        .single();

    if (!business) return notFound();

    const { data: parameters } = await supabase
        .from('quote_parameters')
        .select('*')
        .eq('business_id', businessId)
        .order('display_order', { ascending: true });

    return (
        <div className="min-h-screen bg-transparent flex flex-col justify-center">
            {/* We might want a transparent background or white? 
                Let's stick to the dark theme but allow it to fit in containers. 
            */}
            <div className="p-4">
                <div className="bg-[#111] border border-[#222] rounded-2xl p-6 shadow-2xl">
                    <div className="flex items-center gap-4 mb-6 border-b border-[#222] pb-4">
                        {business.logo_url && (
                            <img src={business.logo_url} alt={business.name} className="w-10 h-10 rounded-lg object-cover" />
                        )}
                        <div>
                            <h1 className="font-bold text-lg text-white">{business.name}</h1>
                            <div className="text-xs text-orange-500 font-medium">Instant Quote</div>
                        </div>
                    </div>

                    <QuoteForm
                        businessId={businessId}
                        businessName={business.name}
                        parameters={parameters || []}
                    />

                    <div className="text-center mt-4 text-[#333] text-[10px]">
                        Powered by CB Connect
                    </div>
                </div>
            </div>
        </div>
    );
}
