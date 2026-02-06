'use client';

import React, { useState } from 'react';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { Briefcase, Car, Home, Stethoscope, Wrench, Globe, CheckCircle2, Search, ArrowRight, Plus } from 'lucide-react';
import { PageHero } from '@/components/PageHero';

// Define the verticals
const VERTICALS = [
    { id: 'business', label: 'Business', icon: <Briefcase className="w-8 h-8" />, color: 'bg-blue-500', subCategories: ['Restaurant', 'Retail', 'Consulting', 'Technology'] },
    { id: 'auto', label: 'Automotive', icon: <Car className="w-8 h-8" />, color: 'bg-orange-500', subCategories: ['Dealership', 'Rental', 'Repair Shop', 'Parts Store'] },
    { id: 'real_estate', label: 'Real Estate', icon: <Home className="w-8 h-8" />, color: 'bg-emerald-500', subCategories: ['Agency', 'Broker', 'Property Management', 'Developer'] },
    { id: 'medical', label: 'Medical', icon: <Stethoscope className="w-8 h-8" />, color: 'bg-red-500', subCategories: ['Clinic', 'Hospital', 'Dentist', 'Specialist'] },
    { id: 'services', label: 'Services', icon: <Wrench className="w-8 h-8" />, color: 'bg-purple-500', subCategories: ['Plumbing', 'Electrician', 'Cleaning', 'Legal'] },
    { id: 'jobs', label: 'Jobs', icon: <Globe className="w-8 h-8" />, color: 'bg-pink-500', subCategories: ['Full Time', 'Part Time', 'Remote', 'Contract'] },
];

export default function AddListingPage() {
    const [selectedVertical, setSelectedVertical] = useState<string | null>(null);
    const [subCategory, setSubCategory] = useState('');
    const [customSubCategory, setCustomSubCategory] = useState('');

    const currentVertical = VERTICALS.find(v => v.id === selectedVertical);

    const handleContinue = () => {
        // Placeholder for future submission logic
        console.log('Continuing with:', {
            vertical: selectedVertical,
            subCategory: subCategory === 'custom' ? customSubCategory : subCategory
        });
        alert(`Starting listing for: ${selectedVertical} > ${subCategory === 'custom' ? customSubCategory : subCategory}`);
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <ThemeHeader transparent={true} />

            <PageHero
                title="What would you like to list?"
                subtitle="Select a category to begin your journey with CB Connect."
                backgroundImage="/assets/bg/coolbackgrounds-gradient-ocean.png"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white font-medium text-sm">
                    <Plus className="w-4 h-4" /> Start Your Application
                </div>
            </PageHero>

            <main className="pb-20 px-6 -mt-20 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header Removed (Moved to Hero) */}

                    {/* Vertical Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 animate-fade-in-up delay-100">
                        {VERTICALS.map((v) => {
                            const isSelected = selectedVertical === v.id;
                            return (
                                <button
                                    key={v.id}
                                    onClick={() => {
                                        setSelectedVertical(v.id);
                                        setSubCategory('');
                                        setCustomSubCategory('');
                                    }}
                                    className={`relative group p-6 rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg ${isSelected
                                        ? 'border-primary bg-primary/5 ring-1 ring-primary'
                                        : 'border-border bg-card hover:border-primary/50'
                                        }`}
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 text-white shadow-md transition-transform group-hover:scale-110 ${v.color}`}>
                                        {v.icon}
                                    </div>
                                    <h3 className="text-lg font-bold mb-1">{v.label}</h3>
                                    <p className="text-xs text-muted-foreground">Creates a {v.label.toLowerCase()} profile</p>

                                    {isSelected && (
                                        <div className="absolute top-4 right-4 text-primary animate-in zoom-in spin-in-90 duration-300">
                                            <CheckCircle2 className="w-6 h-6 fill-primary/20" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Sub-Category Selection */}
                    {currentVertical && (
                        <div className="bg-secondary/30 rounded-3xl p-8 border border-border animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${currentVertical.color}`}>
                                    {currentVertical.icon}
                                </span>
                                Refine your {currentVertical.label} Listing
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="block font-medium text-muted-foreground">Select a Sub-Category</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        {currentVertical.subCategories.map(sub => (
                                            <button
                                                key={sub}
                                                onClick={() => setSubCategory(sub)}
                                                className={`px-4 py-3 rounded-xl border text-sm font-medium transition-all ${subCategory === sub
                                                    ? 'bg-foreground text-background border-foreground'
                                                    : 'bg-background border-border hover:border-foreground/50'
                                                    }`}
                                            >
                                                {sub}
                                            </button>
                                        ))}
                                        {/* Custom Option */}
                                        <button
                                            onClick={() => setSubCategory('custom')}
                                            className={`px-4 py-3 rounded-xl border-2 border-dashed text-sm font-medium transition-all flex items-center justify-center gap-2 ${subCategory === 'custom'
                                                ? 'border-primary text-primary bg-primary/10'
                                                : 'border-muted-foreground/30 text-muted-foreground hover:border-primary hover:text-primary'
                                                }`}
                                        >
                                            <Plus className="w-4 h-4" /> Other
                                        </button>
                                    </div>
                                </div>

                                {subCategory === 'custom' && (
                                    <div className="space-y-4 animate-in fade-in">
                                        <label className="block font-medium text-foreground">Enter Specific Category</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={customSubCategory}
                                                onChange={(e) => setCustomSubCategory(e.target.value)}
                                                placeholder="e.g. specialized service..."
                                                className="w-full px-5 py-3 rounded-xl bg-background border border-border outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                                autoFocus
                                            />
                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                                                <Search className="w-4 h-4" />
                                            </div>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Creating a custom sub-category helps users find your specific niche.
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Continue Button */}
                            <div className="mt-8 flex justify-end pt-8 border-t border-border/50">
                                <button
                                    onClick={handleContinue}
                                    disabled={!subCategory || (subCategory === 'custom' && !customSubCategory)}
                                    className="px-8 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg shadow-lg hover:shadow-xl hover:bg-primary/90 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none flex items-center gap-2"
                                >
                                    Continue
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
