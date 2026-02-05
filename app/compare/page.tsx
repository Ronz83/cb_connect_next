import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { Search, MapPin, Briefcase, ArrowRight, Star, Zap } from 'lucide-react';
import Link from 'next/link';
import { getSchemaForIndustry } from '@/data/industry-schemas';

export const dynamic = 'force-dynamic';

export default async function ComparePage({ searchParams }: { searchParams: { industry?: string, location?: string } }) {
    const supabase = await createClient();
    const industry = searchParams.industry || '';
    const location = searchParams.location || '';

    // Detect if we have a standard schema for this search
    const activeSchema = industry ? getSchemaForIndustry(industry) : null;

    let query = supabase.from('businesses').select('*');

    if (industry) {
        // Search across industry, name, and description for better results (e.g. searching "Roofing" finds "Top Tier Roofing")
        query = query.or(`industry.ilike.%${industry}%,name.ilike.%${industry}%,description.ilike.%${industry}%`);
    }
    if (location) {
        query = query.ilike('address', `%${location}%`);
    }

    const { data: businesses, error } = await query;

    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-[#0A0A0A] border-b border-[#222]">
                <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]" />
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <div className="w-[800px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-5xl mx-auto px-6 py-24 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
                        Compare & Save
                    </h1>
                    <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                        Connect with top-rated local businesses. Get instant quotes, compare services, and make the best choice for your needs.
                    </p>

                    {/* Search Bar */}
                    <form className="bg-white/5 backdrop-blur-xl border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2 max-w-3xl mx-auto shadow-2xl">
                        <div className="flex-1 flex items-center px-4 bg-black/20 rounded-xl border border-transparent focus-within:border-orange-500/50 transition-colors">
                            <Briefcase className="text-gray-500" size={20} />
                            <input
                                name="industry"
                                defaultValue={industry}
                                placeholder="Service (e.g. Plumbing, Web Design)"
                                className="w-full bg-transparent border-none p-3 text-white placeholder-gray-500 focus:ring-0 outline-none"
                            />
                        </div>
                        <div className="flex-1 flex items-center px-4 bg-black/20 rounded-xl border border-transparent focus-within:border-orange-500/50 transition-colors">
                            <MapPin className="text-gray-500" size={20} />
                            <input
                                name="location"
                                defaultValue={location}
                                placeholder="Location (City or Zip)"
                                className="w-full bg-transparent border-none p-3 text-white placeholder-gray-500 focus:ring-0 outline-none"
                            />
                        </div>
                        <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20 flex items-center justify-center gap-2">
                            <Search size={20} />
                            <span>Search</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Active Schema CTA */}
            {activeSchema && businesses && businesses.length > 1 && (
                <div className="max-w-5xl mx-auto px-6 -mt-12 mb-12 relative z-10">
                    <div className="bg-gradient-to-r from-orange-600 to-orange-800 rounded-2xl p-6 md:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 border border-orange-500/30">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-white/20 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                                    <Zap size={12} fill="currentColor" /> INSTANT COMPARE
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Get {businesses.length} {activeSchema.label} Quotes in 1 Click
                            </h2>
                            <p className="text-orange-100">
                                Don't fill out {businesses.length} separate forms. Answer standard questions once and compare estimates instantly.
                            </p>
                        </div>
                        <Link
                            href={`/compare/${activeSchema.id}?location=${location}`}
                            className="bg-white text-orange-600 font-bold px-8 py-4 rounded-xl shadow-xl hover:bg-gray-100 transition-colors whitespace-nowrap flex items-center gap-2"
                        >
                            Start Multi-Quote <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            )}

            {/* Results Section */}
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Top Businesses</h2>
                        <p className="text-gray-400 text-sm mt-1">
                            {businesses?.length || 0} results found {industry && `for "${industry}"`} {location && `in "${location}"`}
                        </p>
                    </div>
                </div>

                {businesses && businesses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {businesses.map((business: any) => (
                            <div key={business.id} className="bg-[#111] border border-[#222] rounded-2xl p-6 hover:border-orange-500/30 transition-all group flex flex-col h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl font-bold text-gray-700">
                                        {/* Fallback Logo */}
                                        {business.logo ? <img src={business.logo} alt={business.name} className="w-full h-full object-cover rounded-xl" /> : business.name[0]}
                                    </div>
                                    <div className="flex items-center gap-1 bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded text-xs font-bold">
                                        <Star size={12} fill="currentColor" /> 5.0
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors">{business.name}</h3>
                                <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                                    <span className="capitalize">{business.industry}</span>
                                    <span>•</span>
                                    <span>{business.address}</span>
                                </div>

                                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                                    {business.description || "No description provided."}
                                </p>

                                <div className="flex gap-3 mt-auto">
                                    <Link
                                        href={`/business/${business.id}`}
                                        className="flex-1 bg-white/5 hover:bg-white/10 text-white py-2.5 rounded-xl text-sm font-medium transition-colors text-center border border-white/10"
                                    >
                                        View Profile
                                    </Link>
                                    <Link
                                        href={`/business/${business.id}#quote`}
                                        className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-xl text-sm font-medium transition-colors text-center shadow-lg shadow-orange-500/10"
                                    >
                                        Get Quote
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-[#0A0A0A] rounded-3xl border border-[#222]">
                        <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-500">
                            <Search size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No results found</h3>
                        <p className="text-gray-500">Try adjusting your filters or search for broad terms like "Tech" or "Service".</p>
                    </div>
                )}
            </div>
        </div>
    );
}
