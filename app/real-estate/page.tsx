import React from 'react';
import { Home, Bed, Bath, Move, MapPin } from 'lucide-react';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { MOCK_PROPERTIES } from '@/data/mock-data';

import { PageHero } from '@/components/PageHero';

export default function RealEstatePage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-20">
            <ThemeHeader transparent={true} />

            <PageHero
                title="Real Estate"
                subtitle="Discover properties for sale and rent across the Caribbean."
                backgroundImage="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop"
            >
                <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-4 rounded-2xl border border-white/20 shadow-2xl">
                    <ThemeHeroSearch />
                </div>
            </PageHero>

            <div className="pt-12 pb-12 px-4 max-w-7xl mx-auto">
                {/* ... content */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 delay-200">
                    {MOCK_PROPERTIES.map((property) => (
                        <ThemeListingCard
                            key={property.id}
                            listing={property}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
