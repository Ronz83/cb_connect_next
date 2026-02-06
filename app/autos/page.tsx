import React from 'react';
import { Car, Fuel, Gauge, MapPin, Calendar, Palette } from 'lucide-react';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';
import { MOCK_CARS } from '@/data/mock-data';

import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';

import { PageHero } from '@/components/PageHero';

export default function AutosPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-20">
            <ThemeHeader transparent={true} />

            <PageHero
                title="Caribbean Autos"
                subtitle="Find new & used cars for sale or rent across the islands."
                backgroundImage="/assets/bg/coolbackgrounds-gradient-cool.png"
            >
                <div className="max-w-2xl mx-auto backdrop-blur-md bg-white/10 p-4 rounded-2xl border border-white/20 shadow-2xl">
                    <ThemeHeroSearch />
                </div>
            </PageHero>

            <div className="pt-12 pb-12 px-4 max-w-7xl mx-auto">
                {/* ... content */}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 delay-200">
                    {MOCK_CARS.map((car) => (
                        <ThemeListingCard
                            key={car.id}
                            listing={car}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
