import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { getSchemaForIndustry } from '@/data/industry-schemas';
import { UnifiedQuoteForm } from '@/components/public/UnifiedQuoteForm';
import { Zap } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function EmbedComparePage({ searchParams }: { searchParams: { industry?: string, location?: string, color?: string } }) {
    const supabase = await createClient();
    const industry = searchParams.industry || '';
    const location = searchParams.location || '';

    // Default Schema if none found (e.g. Generic)
    const activeSchema = industry ? getSchemaForIndustry(industry) : null;

    let query = supabase.from('businesses').select('*');

    if (industry) {
        query = query.or(`industry.ilike.%${industry}%,name.ilike.%${industry}%,description.ilike.%${industry}%`);
    }
    if (location) {
        query = query.ilike('address', `%${location}%`);
    }

    const { data: businesses, error } = await query;
    const bizList = businesses || [];

    // If no schema/industry, show a mini search form (TODO). 
    // For now, if no schema, we just show "Please configure widget" or a fallback.

    if (!activeSchema || bizList.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-screen p-6 text-center bg-[#0A0A0A] text-white">
                <Zap className="w-12 h-12 text-gray-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">No matches found</h3>
                <p className="text-gray-400 text-sm">We couldn't find any pros for "{industry}" in "{location}".</p>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full bg-[#0A0A0A] text-white p-4 sm:p-6 overflow-y-auto custom-scrollbar">
            <div className="flex items-center justify-between mb-6 border-b border-[#222] pb-4">
                <div>
                    <h1 className="text-xl font-bold flex items-center gap-2">
                        <Zap className="text-orange-500 fill-orange-500" size={20} />
                        Compare {activeSchema.label} Quotes
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">
                        Finding pros in <span className="text-white font-medium">{location || 'Your Area'}</span>
                    </p>
                </div>
                <div className="text-[10px] text-gray-600 font-mono text-right">
                    Powered by<br />
                    <strong className="text-gray-500">CB Connect</strong>
                </div>
            </div>

            <UnifiedQuoteForm schema={activeSchema} businesses={bizList} />

            <div className="mt-8 text-center border-t border-[#222] pt-4">
                <Link href="/" target="_blank" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
                    See all businesses on CB Connect &rarr;
                </Link>
            </div>
        </div>
    );
}
