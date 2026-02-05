import React from 'react';
import { notFound } from 'next/navigation'; // Correct import for Next.js App Router
import { INDUSTRY_SCHEMAS } from '@/data/industry-schemas';
import { UnifiedQuoteForm } from '@/components/public/UnifiedQuoteForm';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function MultiQuotePage({ params, searchParams }: { params: { schemaId: string }, searchParams: { location?: string } }) {
    const { schemaId } = params;
    const location = searchParams.location || '';
    const schema = INDUSTRY_SCHEMAS[schemaId];

    if (!schema) {
        notFound();
    }

    // Fetch businesses that match this industry (loose match) to show user who they are comparing
    const supabase = await createClient();
    let query = supabase.from('businesses').select('*').ilike('industry', `%${schemaId}%`);

    if (location) {
        query = query.ilike('address', `%${location}%`);
    }

    const { data: businesses } = await query;

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-3xl mx-auto px-6 py-12">
                <Link href={`/compare?industry=${schemaId}&location=${location}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Results
                </Link>

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Get Instant {schema.label} Quotes</h1>
                    <p className="text-gray-400">
                        Comparing <span className="text-orange-500 font-bold">{businesses?.length || 0} top-rated pros</span> {location && `in ${location}`}.
                    </p>
                </div>

                <div className="bg-[#111] border border-[#222] rounded-2xl p-8 shadow-2xl">
                    <UnifiedQuoteForm schema={schema} businesses={businesses || []} />
                </div>
            </div>
        </div>
    );
}
