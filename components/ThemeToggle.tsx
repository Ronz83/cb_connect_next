'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
    theme: 'dark' | 'light';
    setTheme: (theme: 'dark' | 'light') => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
            style={{
                background: theme === 'dark'
                    ? 'rgba(255,255,255,0.05)'
                    : 'rgba(0,0,0,0.05)',
                border: `1px solid ${theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            }}
        >
            {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-orange-400" />
            ) : (
                <Moon className="w-5 h-5 text-orange-500" />
            )}
        </button>
    );
};
