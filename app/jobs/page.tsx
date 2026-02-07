'use client';

import React, { useState } from 'react';
import { useCountry } from '@/components/providers/CountryProvider';
import Link from 'next/link';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { Briefcase, Search, Zap, CheckCircle, Users, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { FloatingFilterSidebar } from '@/components/search/FloatingFilterSidebar';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';
import { MOCK_JOBS } from '@/data/mock-data';

export default function JobsMarketingPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { selectedCountry } = useCountry();
    const [filters, setFilters] = useState({
        priceRange: { min: '', max: '' },
        verifiedOnly: false,
        selectedCategories: [] as string[],
        sortBy: 'relevance'
    });

    const filteredJobs = MOCK_JOBS.filter(job => {
        if (selectedCountry && !job.location.includes(selectedCountry.name)) return false;

        // Category
        if (filters.selectedCategories.length > 0) {
            const jobType = job.title.toLowerCase(); // simplified matching
            const matchesCategory = filters.selectedCategories.some(cat => jobType.includes(cat));
            if (!matchesCategory) return false;
        }

        return true;
    });

    // Sort (Jobs usually don't have price, so maybe just standard sort or ignore price sort)
    const sortedJobs = [...filteredJobs];
    // If we had a salary field we could sort by that, but MOCK_JOBS might range string.
    // For now, just pass through.

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-20">
            <ThemeHeader transparent={true} />

            <PageHero
                title="Caribbean Jobs"
                subtitle="Find your dream job or the perfect candidate today."
                backgroundImage="/assets/bg/coolbackgrounds-gradient-clean.png"
            >
                <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-4 rounded-2xl border border-white/20 shadow-2xl">
                    <ThemeHeroSearch />
                </div>
            </PageHero>

            <div className="pt-12 pb-12 px-4 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-bottom-8 delay-200">
                    {/* Sidebar */}
                    <FloatingFilterSidebar
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        onFilterChange={setFilters}
                        categories={[
                            { id: 'tech', label: 'Technology', count: 45 },
                            { id: 'hospitality', label: 'Hospitality', count: 120 },
                            { id: 'finance', label: 'Finance', count: 23 },
                            { id: 'construction', label: 'Construction', count: 18 },
                        ]}
                    />

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Latest Opportunities</h2>
                        </div>

                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {sortedJobs.map((job) => (
                                <ThemeListingCard
                                    key={job.id}
                                    listing={job}
                                    layout={viewMode}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why CB Jobs?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We don't just list jobs; we build careers and empower businesses with smarter hiring tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI-Powered Matching</h3>
                            <p className="text-muted-foreground">
                                Our algorithms analyze skills, experience, and culture fit to instantly surface the best candidates for every role.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
                            <p className="text-muted-foreground">
                                Save time with pre-vetted candidate profiles. We verify skills and past employment so you can hire with confidence.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Talent Pools</h3>
                            <p className="text-muted-foreground">
                                Build your own database of potential hires continuously, so you're ready when a vacancy opens up.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-r from-[#002D56] to-primary p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workforce?</h2>
                            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                                Join thousands of Caribbean companies building their future with CB Connect.
                            </p>
                            <Link href="/login/business" className="inline-flex items-center px-8 py-4 bg-white text-[#002D56] font-bold rounded-xl hover:bg-gray-100 transition-colors">
                                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                        {/* Decorative Pattern */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
