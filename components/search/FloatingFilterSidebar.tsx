'use client';

import React, { useState } from 'react';
import { X, Filter, LayoutGrid, List, Check, ChevronDown } from 'lucide-react';

interface FilterOption {
    id: string;
    label: string;
    count?: number;
}

interface FloatingFilterSidebarProps {
    viewMode: 'grid' | 'list';
    setViewMode: (mode: 'grid' | 'list') => void;
    categories?: FilterOption[];
    onFilterChange?: (filters: any) => void;
    className?: string;
}

export const FloatingFilterSidebar: React.FC<FloatingFilterSidebarProps> = ({
    viewMode,
    setViewMode,
    categories = [],
    onFilterChange,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [priceRange, setPriceRange] = useState({ min: '', max: '' });
    const [verifiedOnly, setVerifiedOnly] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState('relevance');

    const toggleCategory = (id: string) => {
        setSelectedCategories(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const SidebarContent = () => (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between md:hidden pb-4 border-b border-border">
                <h3 className="font-bold text-lg">Filters</h3>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-secondary rounded-full">
                    <X size={20} />
                </button>
            </div>

            {/* View Toggle */}
            <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">View Mode</h4>
                <div className="flex bg-secondary/50 p-1 rounded-lg border border-border">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <LayoutGrid size={16} /> Grid
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
                    >
                        <List size={16} /> List
                    </button>
                </div>
            </div>

            {/* Sort By */}
            <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Sort By</h4>
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full bg-card border border-border rounded-lg px-4 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm font-medium"
                    >
                        <option value="relevance">Relevance</option>
                        <option value="newest">Newest Added</option>
                        <option value="rating">Highest Rated</option>
                        <option value="price_asc">Price: Low to High</option>
                        <option value="price_desc">Price: High to Low</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 text-muted-foreground w-4 h-4 pointer-events-none" />
                </div>
            </div>

            <div className="h-px bg-border" />

            {/* Verified Switch */}
            <div className="flex items-center justify-between group cursor-pointer" onClick={() => setVerifiedOnly(!verifiedOnly)}>
                <span className="font-medium text-foreground">Verified Only</span>
                <div className={`w-10 h-6 rounded-full transition-colors relative ${verifiedOnly ? 'bg-primary' : 'bg-secondary'}`}>
                    <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${verifiedOnly ? 'translate-x-4' : 'translate-x-0'}`} />
                </div>
            </div>

            <div className="h-px bg-border" />

            {/* Price Range */}
            <div className="space-y-3">
                <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Price Range</h4>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Min"
                        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Max"
                        className="w-full bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
                    />
                </div>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
                <>
                    <div className="h-px bg-border" />
                    <div className="space-y-3">
                        <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Categories</h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {categories.map(cat => (
                                <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(cat.id) ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground group-hover:border-primary'}`}>
                                        {selectedCategories.includes(cat.id) && <Check size={12} />}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedCategories.includes(cat.id)}
                                        onChange={() => toggleCategory(cat.id)}
                                    />
                                    <span className={`text-sm ${selectedCategories.includes(cat.id) ? 'text-foreground font-medium' : 'text-muted-foreground'}`}>{cat.label}</span>
                                    {cat.count !== undefined && <span className="ml-auto text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{cat.count}</span>}
                                </label>
                            ))}
                        </div>
                    </div>
                </>
            )}

            {/* Actions */}
            <div className="pt-4">
                <button
                    className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg font-bold shadow-lg hover:shadow-primary/20 transition-all hover:-translate-y-0.5"
                    onClick={() => {
                        // Apply filters logic here
                        if (onFilterChange) onFilterChange({ priceRange, verifiedOnly, selectedCategories, sortBy });
                        setIsOpen(false);
                    }}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* Mobile Trigger Button (Floating) */}
            <div className="md:hidden fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-5 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
                >
                    <Filter size={18} /> Filters
                </button>
            </div>

            {/* Desktop Sticky Sidebar */}
            <aside className={`hidden md:block w-72 shrink-0 sticky top-28 h-[calc(100vh-8rem)] overflow-y-auto pr-4 pb-10 custom-scrollbar ${className}`}>
                <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-lg">
                    <SidebarContent />
                </div>
            </aside>

            {/* Mobile Slide-over Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
                    <div className="absolute right-0 top-0 bottom-0 w-80 bg-background border-l border-border p-6 shadow-2xl animate-in slide-in-from-right duration-300">
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    );
};
