'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

export const ThemeToggle: React.FC = () => {
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="w-10 h-10" />; // Placeholder to avoid layout shift
    }

    const isDark = theme === 'dark' || resolvedTheme === 'dark';

    return (
        <button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 border border-border bg-secondary/50 text-foreground"
            aria-label="Toggle Theme"
        >
            {isDark ? (
                <Sun className="w-5 h-5 text-orange-400" />
            ) : (
                <Moon className="w-5 h-5 text-blue-600" />
            )}
        </button>
    );
};
