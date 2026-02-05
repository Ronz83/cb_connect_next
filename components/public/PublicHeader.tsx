'use client';

import React, { useState } from 'react';
import { Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NavigationMenu } from '@/components/NavigationMenu';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { AuthButton } from '@/components/auth/AuthButton';
import { themes, ThemeType } from '@/lib/themes';
import Link from 'next/link';

export function PublicHeader({ theme = 'dark', setTheme }: { theme?: ThemeType, setTheme?: (t: ThemeType) => void }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [pageTheme, setPageTheme] = useState<ThemeType>(theme);

    // Use provided setTheme if available, otherwise local
    const handleSetTheme = (t: ThemeType) => {
        setPageTheme(t);
        if (setTheme) setTheme(t);
    };

    const t = themes[pageTheme];

    return (
        <>
            <NavigationMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onNavigateHome={() => window.location.href = '/'}
                theme={pageTheme}
            />

            <header
                className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300"
                style={{
                    background: t.headerBg,
                    borderColor: t.border
                }}
            >
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <CBConnectLogo size="small" animated />
                    </Link>

                    <div className="flex items-center gap-3">
                        {/* We only show AuthButton if we have context? For now, we can omit or keep consistent. */}
                        <AuthButton theme={pageTheme} />

                        {/* Theme Toggle - Optional if we control theme externally, 
                             but for now providing local control if global context missing */}
                        <div className="hidden md:block">
                            {/* Simple inline toggle if needed, or re-use component */}
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
                            style={{
                                background: pageTheme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                border: `1px solid ${pageTheme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`
                            }}
                        >
                            <Menu className="w-5 h-5" style={{ color: t.text }} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Spacer for fixed header */}
            <div className="h-16" />
        </>
    );
}
