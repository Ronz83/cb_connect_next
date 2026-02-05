'use client';

import React, { useState } from 'react';
import { Search, Briefcase, Car, Home, Store, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

type SearchTab = 'business' | 'autos' | 'real-estate' | 'jobs';

export const ThemeHeroSearch = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<SearchTab>('business');
    const [searchTerm, setSearchTerm] = useState('');
    const [location, setLocation] = useState('');

    const tabs: { id: SearchTab; label: string; icon: any }[] = [
        { id: 'business', label: 'Businesses', icon: Store },
        { id: 'autos', label: 'Autos', icon: Car },
        { id: 'real-estate', label: 'Real Estate', icon: Home },
        { id: 'jobs', label: 'Jobs', icon: Briefcase },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        let path = '/search'; // Default
        const params = new URLSearchParams();

        if (searchTerm) params.append('q', searchTerm);
        if (location) params.append('location', location);

        switch (activeTab) {
            case 'autos': path = '/autos'; break;
            case 'real-estate': path = '/real-estate'; break;
            case 'jobs': path = '/jobs'; break;
            default: path = '/search'; break;
        }

        router.push(`${path}?${params.toString()}`);
    };

    return (
        <div className="w-full max-w-4xl mx-auto relative z-20">
            {/* Tabs */}
            <div className="flex justify-center mb-6">
                <div className="inline-flex bg-secondary/80 backdrop-blur-md p-1 rounded-full border border-border overflow-x-auto shadow-sm">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30'
                                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            <span className="whitespace-nowrap">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Search Box */}
            <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl p-4 shadow-2xl">
                <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">

                    {/* Keyword Input */}
                    <div className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-4 flex items-center gap-3 focus-within:bg-background focus-within:border-primary/50 transition-all">
                        <Search className="text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder={
                                activeTab === 'business' ? "What are you looking for?" :
                                    activeTab === 'autos' ? "Make, Model, or Type..." :
                                        activeTab === 'real-estate' ? "City, Zip, or Address..." :
                                            "Job title or keyword..."
                            }
                            className="bg-transparent text-foreground placeholder-muted-foreground w-full focus:outline-none font-medium"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Location Input */}
                    <div className="flex-1 bg-background/50 border border-border rounded-xl px-4 py-4 flex items-center gap-3 focus-within:bg-background focus-within:border-primary/50 transition-all">
                        <MapPin className="text-muted-foreground w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Location (e.g. Kingston)"
                            className="bg-transparent text-foreground placeholder-muted-foreground w-full focus:outline-none font-medium"
                            value={location}
                            onChange={e => setLocation(e.target.value)}
                        />
                    </div>

                    {/* Search Button */}
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-4 px-10 rounded-xl shadow-lg shadow-orange-500/20 hover:shadow-orange-500/40 transform hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                    >
                        <Search className="w-5 h-5" />
                        <span>Search</span>
                    </button>
                </form>
            </div>
        </div>
    );
};
