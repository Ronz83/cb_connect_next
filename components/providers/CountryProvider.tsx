'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_COUNTRIES } from '@/data/mock-data';

interface Country {
    code: string;
    name: string;
    flag: string;
}

interface CountryContextType {
    selectedCountry: Country;
    setSelectedCountry: (country: Country) => void;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export const CountryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    // Default to a fallback (e.g., Jamaica or Barbados) if nothing saved
    const [selectedCountry, setSelectedCountryState] = useState<Country>(MOCK_COUNTRIES[0]);

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem('cb_selected_country');
            if (saved) {
                const parsed = JSON.parse(saved);
                // Validate it still exists in our list
                const found = MOCK_COUNTRIES.find(c => c.code === parsed.code);
                if (found) {
                    setSelectedCountryState(found);
                }
            }
        } catch (e) {
            console.error("Failed to load country preference", e);
        }
    }, []);

    const setSelectedCountry = (country: Country) => {
        setSelectedCountryState(country);
        try {
            localStorage.setItem('cb_selected_country', JSON.stringify(country));
        } catch (e) {
            console.error("Failed to save country preference", e);
        }
    };

    return (
        <CountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
            {children}
        </CountryContext.Provider>
    );
};

export const useCountry = () => {
    const context = useContext(CountryContext);
    if (!context) {
        throw new Error('useCountry must be used within a CountryProvider');
    }
    return context;
};
