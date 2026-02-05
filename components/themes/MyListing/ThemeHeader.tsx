'use client';

import React, { useState, useEffect } from 'react';
import { Menu, Plus, User, Search, MapPin } from 'lucide-react';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { NavigationMenu } from '@/components/NavigationMenu';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';

interface ThemeHeaderProps {
    transparent?: boolean;
    theme?: 'light' | 'dark';
    setTheme?: (theme: 'light' | 'dark') => void;
}

export const ThemeHeader: React.FC<ThemeHeaderProps> = ({ transparent = false, theme = 'dark', setTheme }) => {
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
    const bgClass = isSolid
        ? (theme === 'dark' ? 'bg-[#0f0f18]/90 backdrop-blur-md border-b border-white/5' : 'bg-white/95 backdrop-blur-md border-b border-gray-100')
        : 'bg-transparent';

    const textClass = isSolid
        ? (theme === 'dark' ? 'text-white' : 'text-gray-900')
        : 'text-white';

    const buttonBgClass = isSolid
        ? (theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-gray-100 hover:bg-gray-200')
        : 'bg-black/30 backdrop-blur-sm hover:bg-black/50 border border-white/10';

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${bgClass}`}>
                <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">

                    {/* LEFT: Logo & Location (Desktop) */}
                    <div className="flex items-center gap-8">
                        <Link href="/search" className="flex items-center gap-2">
                            {/* Reuse Logo but ensure it adapts to color */}
                            <div className={`font-bold text-xl tracking-tight flex items-center gap-2 ${textClass}`}>
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white shadow-lg">
                                    <span className="font-bold">CB</span>
                                </div>
                                <span className="hidden md:inline">Connect</span>
                            </div>
                        </Link>

                        {/* Desktop Search Bar (Optional, shows on scroll or specific pages) */}
                        <div className={`hidden md:flex items-center gap-3 px-4 py-2 rounded-full transition-all duration-300 ${isSolid ? (theme === 'dark' ? 'bg-white/5' : 'bg-gray-100') : 'opacity-0 pointer-events-none'}`}>
                            <Search size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className={`bg-transparent outline-none text-sm w-48 ${theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'}`}
                            />
                            <div className={`h-4 w-[1px] ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'}`} />
                            <MapPin size={16} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                            <input
                                type="text"
                                placeholder="Location"
                                className={`bg-transparent outline-none text-sm w-24 ${theme === 'dark' ? 'text-white placeholder-gray-500' : 'text-gray-900 placeholder-gray-500'}`}
                            />
                        </div>
                    </div>

                    {/* RIGHT: Actions */}
                    <div className="flex items-center gap-3">

                        <Link href="/login">
                            <button className={`hidden md:flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm transition-all ${buttonBgClass} ${textClass}`}>
                                <User size={16} />
                                <span>Sign In</span>
                            </button>
                        </Link>

                        <button className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm shadow-lg shadow-orange-600/20 transition-all hover:-translate-y-0.5">
                            <Plus size={16} />
                            <span>Add Listing</span>
                        </button>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className={`p-2.5 rounded-full transition-all ${buttonBgClass} ${textClass}`}
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
                theme={theme}
            />
        </>
    );
};
