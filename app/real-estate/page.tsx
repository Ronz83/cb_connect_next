'use client';

import React, { useState } from 'react';
import { useCountry } from '@/components/providers/CountryProvider';
import { FloatingFilterSidebar } from '@/components/search/FloatingFilterSidebar';
import { Home, Bed, Bath, Move, MapPin } from 'lucide-react';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { MOCK_PROPERTIES } from '@/data/mock-data';

import { PageHero } from '@/components/PageHero';

export default function RealEstatePage() {
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const { selectedCountry } = useCountry();
    const [filters, setFilters] = useState({
        priceRange: { min: '', max: '' },
        verifiedOnly: false,
        selectedCategories: [] as string[],
        sortBy: 'relevance'
    });

    const filteredProperties = MOCK_PROPERTIES.filter(property => {
        // Country
        if (selectedCountry && !property.location.includes(selectedCountry.name)) return false;

        // Price
        const price = parseInt(property.price.replace(/[^0-9]/g, '')) || 0;
        if (filters.priceRange.min && price < parseInt(filters.priceRange.min)) return false;
        if (filters.priceRange.max && price > parseInt(filters.priceRange.max)) return false;

        // Category
        if (filters.selectedCategories.length > 0) {
            const propType = property.title.toLowerCase();
            const matchesCategory = filters.selectedCategories.some(cat => propType.includes(cat));
            if (!matchesCategory) return false;
        }

        return true;
    });

    // Sort
    const sortedProperties = [...filteredProperties].sort((a, b) => {
        if (filters.sortBy === 'price_asc') {
            return (parseInt(a.price.replace(/[^0-9]/g, '')) || 0) - (parseInt(b.price.replace(/[^0-9]/g, '')) || 0);
        }
        if (filters.sortBy === 'price_desc') {
            return (parseInt(b.price.replace(/[^0-9]/g, '')) || 0) - (parseInt(a.price.replace(/[^0-9]/g, '')) || 0);
        }
        return 0;
    });

    return (
        <div className="min-h-screen bg-background text-foreground font-sans pb-20">
            <ThemeHeader transparent={true} />

            <PageHero
                title="Real Estate"
                subtitle="Discover properties for sale and rent across the Caribbean."
                backgroundImage="/assets/bg/coolbackgrounds-gradient-aqua.png"
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
                            { id: 'residential', label: 'Residential', count: 45 },
                            { id: 'commercial', label: 'Commercial', count: 12 },
                            { id: 'land', label: 'Land', count: 23 },
                            { id: 'luxury', label: 'Luxury', count: 8 },
                        ]}
                    />

                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold">Latest Properties</h2>
                        </div>

                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {sortedProperties.map((property) => (
                                <ThemeListingCard
                                    key={property.id}
                                    listing={property}
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
