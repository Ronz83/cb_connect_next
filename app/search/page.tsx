'use client';

import React, { useState, useEffect } from 'react';
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
import { MOCK_LISTINGS, MOCK_COUNTRIES } from '@/data/mock-data';

export default function SearchPage() {
    // const [theme, setTheme] = useState<ThemeType>('dark'); // REMOVED
    const { resolvedTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState<any>(null);
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
        // Simplified filter for mock purposes
        const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            b.location.toLowerCase().includes(searchQuery.toLowerCase());
        // Map industry ID to mock category name for basic filtering if needed, otherwise ignore for now
        return matchesSearch;
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
                    setSelectedCountry(null);
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
                <div className="mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ThemeHeroSearch />
                </div>

                {/* LISTINGS GRID */}
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-2xl font-bold mb-1 text-foreground">Explore Directory</h2>
                            <p className="text-sm text-muted-foreground">Showing {filteredBusinesses.length} results</p>
                        </div>

                        {/* VIEW TOGGLE */}
                        <div className="flex items-center bg-secondary/50 rounded-lg p-1 border border-border">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <List size={18} />
                            </button>
                        </div>
                    </div>

                    <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                        {filteredBusinesses.map((listing) => (
                            <ThemeListingCard
                                key={listing.id}
                                listing={listing}
                                layout={viewMode}
                            />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
