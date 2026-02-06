import React from 'react';
import { Briefcase, MapPin, DollarSign, Clock } from 'lucide-react';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { MOCK_JOBS } from '@/data/mock-data';

export default function JobsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-20">
            <ThemeHeader transparent={true} />
            <div className="pt-32 pb-12 px-4 max-w-7xl mx-auto">
                <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ThemeHeroSearch />
                </div>

                <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-6 delay-100">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Career Opportunities</h1>
                        <p className="text-muted-foreground">Find your next role in the Caribbean tech and business ecosystem.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 delay-200">
                    {MOCK_JOBS.map((job) => (
                        <ThemeListingCard
                            key={job.id}
                            listing={job}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
