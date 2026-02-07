'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Plus, User, Search, MapPin, ChevronDown, Check } from 'lucide-react';
import { MOCK_COUNTRIES } from '@/data/mock-data';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { NavigationMenu } from '@/components/NavigationMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';
import Image from 'next/image';

interface ThemeHeaderProps {
    transparent?: boolean;
    theme?: 'light' | 'dark';
    setTheme?: (theme: 'light' | 'dark') => void;
}

import { useTheme } from 'next-themes';
import { AuthButton } from '@/components/auth/AuthButton';
import { useCountry } from '@/components/providers/CountryProvider';

export const ThemeHeader: React.FC<ThemeHeaderProps> = ({ transparent = false, theme: propTheme = 'dark', setTheme }) => {
    const { theme: globalTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // safely determine active theme
    const activeTheme = mounted && resolvedTheme ? (resolvedTheme as 'light' | 'dark') : propTheme;

    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { selectedCountry, setSelectedCountry } = useCountry();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Determine styles based on scroll and transparency prop
    const isSolid = isScrolled || !transparent;

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-sm`}>
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

                    {/* LEFT: Logo & Location (Desktop) */}
                    <div className="flex items-center gap-8">
                        {/* Point to main directory home */}
                        <a href="https://dir.caricombusiness.com/" className="flex items-center gap-2">
                            {/* Replaced CB with Image Logo */}
                            <div className={`font-bold text-xl tracking-tight flex items-center gap-2 text-foreground`}>
                                <Image
                                    src="/assets/cb-logo.png"
                                    alt="Caricom Business Logo"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 object-contain rounded-xl"
                                    priority
                                />
                                <span className="hidden md:inline">Directory</span>
                            </div>
                        </a>

                        {/* Country Selector */}
                        <div className="relative group hidden md:block">
                            <button className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 transition-all">
                                <img
                                    src={selectedCountry?.flag || "https://flagcdn.com/w40/bb.png"}
                                    alt="Flag"
                                    className="w-5 h-3.5 object-cover rounded-sm shadow-sm"
                                />
                                <span className="text-sm font-medium text-foreground">{selectedCountry?.code || "BB"}</span>
                                <ChevronDown size={14} className="text-muted-foreground" />
                            </button>

                            {/* Dropdown */}
                            <div className="absolute top-full left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-left z-50 max-h-80 overflow-y-auto custom-scrollbar">
                                <div className="p-2 sticky top-0 bg-card border-b border-border z-10">
                                    <input
                                        type="text"
                                        placeholder="Search country..."
                                        className="w-full px-3 py-1.5 text-sm bg-secondary rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
                                <div className="p-1">
                                    {MOCK_COUNTRIES.map((country) => (
                                        <button
                                            key={country.code}
                                            onClick={() => setSelectedCountry(country)}
                                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left ${selectedCountry?.code === country.code ? 'bg-primary/10 text-primary' : 'text-foreground'}`}
                                        >
                                            <img src={country.flag} alt={country.name} className="w-6 h-4 object-cover rounded-[2px] shadow-sm" />
                                            <span className="text-sm font-medium truncate">{country.name}</span>
                                            {selectedCountry?.code === country.code && <Check size={14} className="ml-auto" />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Desktop Search Bar (Optional, shows on scroll or specific pages) */}
                        <div className={`hidden md:flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 ${isSolid ? 'bg-secondary' : 'opacity-0 pointer-events-none'}`}>
                            <Search size={16} className="text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="bg-transparent outline-none text-sm w-48 text-foreground placeholder-muted-foreground"
                            />
                            <div className="h-4 w-[1px] bg-border" />
                            <MapPin size={16} className="text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Location"
                                className="bg-transparent outline-none text-sm w-24 text-foreground placeholder-muted-foreground"
                            />
                        </div>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-3">
                        <ThemeToggle />

                        <Link href="/pricing" className="hidden md:flex items-center gap-2 px-4 py-2.5 font-bold text-sm transition-all text-foreground hover:text-primary">
                            Pricing
                        </Link>

                        {/* Integrated Auth State */}
                        <div className="hidden md:block">
                            <AuthButton theme={activeTheme} />
                        </div>

                        <Link href="/add-listing" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
                            <Plus size={16} />
                            <span>Add Listing</span>
                        </Link>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className={`p-2.5 rounded-full transition-all ${isSolid ? 'bg-secondary text-foreground' : 'bg-background/20 backdrop-blur-md text-foreground border border-border/20'}`}
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Reuse existing NavigationMenu Drawer */}
            <NavigationMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onNavigateHome={() => window.location.href = '/search'}
                theme={activeTheme}
            />
        </>
    );
};
