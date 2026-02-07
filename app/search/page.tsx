'use client';

import React, { useState, useEffect } from 'react';
import { useCountry } from '@/components/providers/CountryProvider';
import { FloatingParticles } from '@/components/FloatingParticles';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { ChatPopup } from '@/components/ChatPopup';
import { useTheme } from 'next-themes';
import { NavigationMenu } from '@/components/NavigationMenu';
import { LayoutGrid, List } from 'lucide-react';

// NEW THEME COMPONENTS
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';
import { FloatingFilterSidebar } from '@/components/search/FloatingFilterSidebar';
import { MOCK_LISTINGS, MOCK_COUNTRIES } from '@/data/mock-data';
import { PageHero } from '@/components/PageHero';



export default function SearchPage() {
    // const [theme, setTheme] = useState<ThemeType>('dark'); // REMOVED
    const { resolvedTheme } = useTheme();
    const { selectedCountry, setSelectedCountry } = useCountry();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndustry, setSelectedIndustry] = useState('all');
    const [chatType, setChatType] = useState<'voice' | 'text' | null>(null);
    const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    // MOCK DATA LOADING (Simulated)
    const [countries, setCountries] = useState<any[]>(MOCK_COUNTRIES);
    const [businesses, setBusinesses] = useState<any[]>(MOCK_LISTINGS);
    const [isLoading, setIsLoading] = useState(false); // No loading state needed for mock data

    // Filter businesses (Mock Logic)
    const filteredBusinesses = businesses.filter((b) => {
        const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.location.toLowerCase().includes(searchQuery.toLowerCase());

        // Country Filter
        const matchesCountry = selectedCountry ? b.location.includes(selectedCountry.name) : true;

        return matchesSearch && matchesCountry;
    });

    const handleVoiceChat = (business: any) => {
        setSelectedBusiness(business);
        setChatType('voice');
    };

    const handleTextChat = (business: any) => {
        setSelectedBusiness(business);
        setChatType('text');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
                <CBConnectLogo animated size="large" />
            </div>
        );
    }

    return (
        <div
            className="min-h-screen relative font-sans bg-background text-foreground transition-colors duration-300"
        >
            <FloatingParticles />

            {/* Navigation Menu */}
            <NavigationMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onNavigateHome={() => {
                    setIsMenuOpen(false);
                    window.location.href = '/';
                }}
                theme={resolvedTheme as any}
            />

            {/* Chat Popup */}
            <ChatPopup
                isOpen={!!chatType}
                onClose={() => setChatType(null)}
                type={chatType}
                business={selectedBusiness}
                theme={resolvedTheme as any}
            />

            {/* Theme Header */}
            <ThemeHeader transparent={false} />

            {/* Main Content */}
            <main className="pt-24 pb-20 px-4 max-w-7xl mx-auto min-h-screen flex flex-col relative z-10">

                {/* HERO SEARCH SECTION */}
                <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500 -mt-24">
                    <PageHero
                        title="Find Your Perfect Match"
                        subtitle="Explore top-rated businesses and verified listings across the Caribbean."
                        backgroundImage="https://images.unsplash.com/photo-1589307357924-4fc3a0279644?q=80&w=2940&auto=format&fit=crop"
                    >
                        <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/10 p-2 rounded-2xl border border-white/20 shadow-2xl">
                            <ThemeHeroSearch />
                        </div>
                    </PageHero>
                </div>

                {/* LISTINGS SECTION */}
                <div className="flex flex-col md:flex-row gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">

                    {/* Sidebar */}
                    <FloatingFilterSidebar
                        viewMode={viewMode}
                        setViewMode={setViewMode}
                        categories={[
                            { id: 'business', label: 'Business', count: 120 },
                            { id: 'automotive', label: 'Automotive', count: 45 },
                            { id: 'real_estate', label: 'Real Estate', count: 32 },
                            { id: 'medical', label: 'Medical', count: 18 },
                            { id: 'services', label: 'Services', count: 64 },
                            { id: 'jobs', label: 'Jobs', count: 12 },
                        ]}
                    />

                    {/* Results Grid */}
                    <div className="flex-1">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold mb-1 text-foreground">Explore Directory</h2>
                                <p className="text-sm text-muted-foreground">Showing {filteredBusinesses.length} results</p>
                            </div>
                        </div>

                        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                            {filteredBusinesses.map((listing) => (
                                <ThemeListingCard
                                    key={listing.id}
                                    listing={listing}
                                    layout={viewMode}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
