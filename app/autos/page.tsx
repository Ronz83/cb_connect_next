'use client';

import React, { useState } from 'react';
import { useCountry } from '@/components/providers/CountryProvider';
import { FloatingFilterSidebar } from '@/components/search/FloatingFilterSidebar';
import { Car, Fuel, Gauge, MapPin, Calendar, Palette } from 'lucide-react';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';
import { MOCK_CARS } from '@/data/mock-data';

import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';

import { PageHero } from '@/components/PageHero';

export default function AutosPage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { selectedCountry } = useCountry();
    const [filters, setFilters] = useState({
        priceRange: { min: '', max: '' },
        verifiedOnly: false,
        selectedCategories: [] as string[],
        sortBy: 'relevance'
    });

    const filteredCars = MOCK_CARS.filter(car => {
        // Country Filter
        if (selectedCountry && !car.location.includes(selectedCountry.name)) return false;

        // Price Filter
        const price = parseInt(car.price.replace(/[^0-9]/g, '')) || 0;
        if (filters.priceRange.min && price < parseInt(filters.priceRange.min)) return false;
        if (filters.priceRange.max && price > parseInt(filters.priceRange.max)) return false;

        // Verified Filter (Mock data doesn't have verified flag, assuming true for now or ignore)
        // if (filters.verifiedOnly && !car.isVerified) return false;

        // Category Filter (Mock mapping)
        if (filters.selectedCategories.length > 0) {
            const carType = car.title.toLowerCase();
            const matchesCategory = filters.selectedCategories.some(cat => carType.includes(cat));
            if (!matchesCategory) return false;
        }

        return true;
    });

    // Sort Logic
    const sortedCars = [...filteredCars].sort((a, b) => {
        if (filters.sortBy === 'price_asc') {
            return (parseInt(a.price.replace(/[^0-9]/g, '')) || 0) - (parseInt(b.price.replace(/[^0-9]/g, '')) || 0);
        }
        if (filters.sortBy === 'price_desc') {
            return (parseInt(b.price.replace(/[^0-9]/g, '')) || 0) - (parseInt(a.price.replace(/[^0-9]/g, '')) || 0);
        }
        return 0; // relevance/default
    });

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
                <div className="flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-bottom-8 delay-200">
                    {/* Sidebar */}
                    <FloatingFilterSidebar
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        onFilterChange={setFilters}
                        categories={[
                            { id: 'sedan', label: 'Sedans', count: 12 },
                            { id: 'suv', label: 'SUVs', count: 8 },
                            { id: 'truck', label: 'Trucks', count: 5 },
                            { id: 'luxury', label: 'Luxury', count: 3 },
                        ]}
                    />

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Latest Vehicles</h2>
                            {/* Mobile Filter Trigger is handled by Sidebar component */}
                        </div>

                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {sortedCars.map((car) => (
                                <ThemeListingCard
                                    key={car.id}
                                    listing={car}
                                    layout={viewMode}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
