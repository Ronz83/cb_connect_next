'use client';

import React, { useEffect } from 'react';
import { Home, Info, Mail, Sparkles, X, ArrowRight, LayoutDashboard } from 'lucide-react';
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
                        onClick={() => {
                            window.location.href = '/admin'; // Force full nav
                        }}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 group bg-orange-500/10 hover:bg-orange-500/20"
                        style={{ color: t.text }}
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-500 text-white shadow-lg shadow-orange-500/20">
                            <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium text-orange-500">Admin Dashboard</div>
                            <div className="text-xs opacity-60">Manage businesses and imports</div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-orange-500" />
                    </button>

                    <button
                        onClick={() => {
                            window.location.href = '/search';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 group"
                        style={{ color: t.text }}
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Home className="w-5 h-5" />
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium">Find a Pro</div>
                            <div className="text-xs opacity-60">Search the Directory</div>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                    </button>

                    <button
                        onClick={() => {
                            window.location.href = '/compare';
                        }}
                        className="w-full flex items-center gap-3 px-4 py-4 rounded-xl transition-all duration-200 group"
                        style={{ color: t.text }}
                    >
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <Sparkles className="w-5 h-5" />
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium">Compare</div>
                            <div className="text-xs opacity-60">Get Quotes & Find Pros</div>
                        </div>
                        <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-1" />
                    </button>

                    {/* NEW VERTICALS */}
                    <div className="px-4 py-2 text-xs font-semibold uppercase tracking-wider opacity-50 mt-2" style={{ color: t.text }}>Marketplace</div>

                    <button
                        onClick={() => window.location.href = '/autos'}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:hover:bg-white/5"
                        style={{ color: t.text }}
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium text-sm">Autos</div>
                        </div>
                    </button>

                    <button
                        onClick={() => window.location.href = '/real-estate'}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:hover:bg-white/5"
                        style={{ color: t.text }}
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-green-500/10 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium text-sm">Real Estate</div>
                        </div>
                    </button>

                    <button
                        onClick={() => window.location.href = '/jobs'}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group hover:bg-gray-50 dark:hover:bg-white/5"
                        style={{ color: t.text }}
                    >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-pink-500/10 text-pink-500">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                        </div>
                        <div className="text-left flex-1">
                            <div className="font-medium text-sm">Jobs</div>
                        </div>
                    </button>

                    <button
                        onClick={() => {
                            onClose();
                            window.alert("About Page coming soon!");
                        }}
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
                        onClick={() => {
                            onClose();
                            window.alert("Contact Support: support@cbconnect.demo");
                        }}
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
                        <button
                            onClick={() => window.alert('Upgrade Flow Initiated')}
                            className="w-full py-2 rounded-lg bg-white/10 text-xs font-medium hover:bg-white/20 transition-colors"
                            style={{ color: t.text }}
                        >
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
