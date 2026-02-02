'use client';

import React, { useEffect } from 'react';
import { Home, Info, Mail, Sparkles, X, ArrowRight } from 'lucide-react';
import { CBConnectLogo } from './CBConnectLogo';
import { themes } from '@/lib/themes';

interface NavigationMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onNavigateHome: () => void;
    theme: 'dark' | 'light';
}

export const NavigationMenu: React.FC<NavigationMenuProps> = ({ isOpen, onClose, onNavigateHome, theme }) => {
    const t = themes[theme];

    // Close menu on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Drawer */}
            <div
                className="relative w-80 h-full shadow-2xl flex flex-col transform transition-transform duration-300 ease-out"
                style={{
                    background: theme === 'dark' ? '#0f0f18' : '#ffffff',
                    borderLeft: `1px solid ${t.border}`,
                    animation: 'slide-in-right 0.3s ease-out'
                }}
            >
                {/* Header */}
                <div className="p-6 flex items-center justify-between border-b" style={{ borderColor: t.border }}>
                    <div className="flex items-center gap-2">
                        <CBConnectLogo size="small" />
                        <span className="font-semibold" style={{ color: t.text }}>Menu</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <X className="w-5 h-5" style={{ color: t.textMuted }} />
                    </button>
                </div>

                {/* Links */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    <button
                        onClick={onNavigateHome}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 group"
                        style={{ color: t.text }}
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Home className="w-5 h-5" />
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium">Home</div>
                            <div className="text-xs opacity-60">Return to country selection</div>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:hover:bg-white/5"
                        style={{ color: t.text }}
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <Info className="w-5 h-5" />
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium">About</div>
                            <div className="text-xs opacity-60">Learn more about CBConnect</div>
                        </div>
                    </button>

                    <button
                        onClick={onClose}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:hover:bg-white/5"
                        style={{ color: t.text }}
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium">Contact</div>
                            <div className="text-xs opacity-60">Get in touch with support</div>
                        </div>
                    </button>
                </div>

                {/* Footer */}
                <div className="p-6 border-t" style={{ borderColor: t.border }}>
                    <div className="rounded-xl p-4 mb-4" style={{ background: t.bgPill }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <div className="text-sm font-medium" style={{ color: t.text }}>Premium Access</div>
                                <div className="text-[10px]" style={{ color: t.textMuted }}>Unlock advanced analytics</div>
                            </div>
                        </div>
                        <button className="w-full py-2 rounded-lg bg-white/10 text-xs font-medium hover:bg-white/20 transition-colors" style={{ color: t.text }}>
                            Upgrade Plan
                        </button>
                    </div>
                    <p className="text-xs text-center" style={{ color: t.textMuted }}>
                        v2.1.0 • © 2024 CBConnect
                    </p>
                </div>
            </div>
            <style>{`
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
        </div>
    );
};
