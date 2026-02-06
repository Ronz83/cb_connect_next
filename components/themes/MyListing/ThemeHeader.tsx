'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Plus, User, Search, MapPin } from 'lucide-react';
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
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isSolid ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' : 'bg-transparent'}`}>
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

                    {/* LEFT: Logo & Location (Desktop) */}
                    <div className="flex items-center gap-8">
                        {/* Point to main directory home */}
                        <a href="https://dir.caricombusiness.com/" className="flex items-center gap-2">
                            {/* Replaced CB with Image Logo */}
                            <div className={`font-bold text-xl tracking-tight flex items-center gap-2 ${isSolid ? 'text-foreground' : 'text-white'}`}>
                                <Image
                                    src="/assets/cb-logo.png"
                                    alt="Caricom Business Logo"
                                    width={48}
                                    height={48}
                                    className="w-12 h-12 object-contain"
                                    priority
                                />
                                <span className="hidden md:inline">Directory</span>
                            </div>
                        </a>

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

                        <Link href="/pricing" className={`hidden md:flex items-center gap-2 px-4 py-2.5 font-bold text-sm transition-all ${isSolid ? 'text-foreground hover:text-primary' : 'text-foreground hover:text-primary'}`}>
                            Pricing
                        </Link>

                        {/* Integrated Auth State */}
                        <div className="hidden md:block">
                            <AuthButton theme={activeTheme} />
                        </div>

                        <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5">
                            <Plus size={16} />
                            <span>Add Listing</span>
                        </button>

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
