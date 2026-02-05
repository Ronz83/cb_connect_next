import React from 'react';
import { Home, Bed, Bath, Move, MapPin } from 'lucide-react';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { MOCK_PROPERTIES } from '@/data/mock-data';

export default function RealEstatePage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-20">
            <ThemeHeader transparent={true} />
            <div className="pt-32 pb-12 px-4 max-w-7xl mx-auto">
                <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ThemeHeroSearch />
                </div>

                <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-bottom-6 delay-100">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Real Estate</h1>
                        <p className="text-muted-foreground">Discover properties for sale and rent across the Caribbean.</p>
                    </div>
                </div>

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
