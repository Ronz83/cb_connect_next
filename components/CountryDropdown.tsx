'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import { countries } from '@/data/countries';
import { themes } from '@/lib/themes';

interface CountryDropdownProps {
    selectedCountry: any;
    onSelectCountry: (country: any) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    theme: 'dark' | 'light';
    countries?: any[];
}

export const CountryDropdown: React.FC<CountryDropdownProps> = ({ selectedCountry, onSelectCountry, isOpen, setIsOpen, theme, countries = [] }) => {
    // If countries prop provided, use it, otherwise fall back to imported (though we want to deprecate imported)
    const dataToUse = countries.length > 0 ? countries : [];
    const memberStates = dataToUse.filter(c => !c.associate);
    const associateMembers = dataToUse.filter(c => c.associate);
    const t = themes[theme];

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all duration-300 group"
                style={{
                    background: isOpen ? t.bgCardHover : t.bgCard,
                    border: isOpen ? `1px solid rgba(255,107,53,0.4)` : `1px solid ${t.border}`,
                    boxShadow: isOpen ? '0 8px 32px rgba(255,107,53,0.15)' : `0 4px 20px rgba(0,0,0,${theme === 'dark' ? '0.2' : '0.08'})`
                }}
            >
                {selectedCountry ? (
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">{selectedCountry.flag}</span>
                        <span style={{ color: t.text }} className="font-normal tracking-tight">{selectedCountry.name}</span>
                    </div>
                ) : (
                    <span style={{ color: t.textPlaceholder }}>Select a country...</span>
                )}
                <ChevronDown
                    className={`w-5 h-5 text-orange-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div
                    className="absolute top-full left-0 right-0 mt-2 rounded-xl overflow-hidden z-50"
                    style={{
                        background: t.bgDropdown,
                        boxShadow: `0 10px 40px rgba(0,0,0,${theme === 'dark' ? '0.5' : '0.15'})`,
                        border: `1px solid ${t.border}`,
                        maxHeight: '400px',
                        overflowY: 'auto',
                        animation: 'scale-in 0.2s ease-out',
                    }}
                >
                    {/* Member States */}
                    <div className="px-3 py-2 sticky top-0" style={{ background: t.bgSolid }}>
                        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: t.textMuted }}>Member States</span>
                    </div>
                    {memberStates.map(country => (
                        <button
                            key={country.code}
                            onClick={() => {
                                onSelectCountry(country);
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:pl-6"
                            style={{
                                background: selectedCountry?.code === country.code
                                    ? 'rgba(255,107,53,0.1)'
                                    : 'transparent',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.08)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = selectedCountry?.code === country.code ? 'rgba(255,107,53,0.1)' : 'transparent'}
                        >
                            <span className="text-xl transition-transform duration-200 hover:scale-110">{country.flag}</span>
                            <span className="text-sm" style={{ color: t.text }}>{country.name}</span>
                            {selectedCountry?.code === country.code && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-orange-500" style={{ boxShadow: '0 0 8px rgba(255,107,53,0.6)' }} />
                            )}
                        </button>
                    ))}

                    {/* Associate Members */}
                    <div className="px-3 py-2 sticky top-0" style={{ background: t.bgSolid, borderTop: `1px solid ${t.border}` }}>
                        <span className="text-xs font-medium uppercase tracking-wider" style={{ color: t.textMuted }}>Associate Members</span>
                    </div>
                    {associateMembers.map(country => (
                        <button
                            key={country.code}
                            onClick={() => {
                                onSelectCountry(country);
                                setIsOpen(false);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-3 transition-all duration-200 hover:pl-6"
                            style={{
                                background: selectedCountry?.code === country.code
                                    ? 'rgba(255,107,53,0.1)'
                                    : 'transparent',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,53,0.08)'}
                            onMouseLeave={(e) => e.currentTarget.style.background = selectedCountry?.code === country.code ? 'rgba(255,107,53,0.1)' : 'transparent'}
                        >
                            <span className="text-xl transition-transform duration-200 hover:scale-110">{country.flag}</span>
                            <span className="text-sm" style={{ color: t.text }}>{country.name}</span>
                            {selectedCountry?.code === country.code && (
                                <div className="ml-auto w-2 h-2 rounded-full bg-orange-500" style={{ boxShadow: '0 0 8px rgba(255,107,53,0.6)' }} />
                            )}
                        </button>
                    ))}
                </div>
            )}
            <style>{`
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
};
