'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Globe, CheckCircle, Heart, Eye, ArrowRightLeft, MoreHorizontal, Star } from 'lucide-react';
import { themes } from '@/lib/themes';

interface ListingProps {
    id: string | number;
    title: string;
    image: string;
    logo?: string;
    category?: { name: string; icon: any; color: string };
    location?: string;
    rating?: number;
    reviewCount?: number;
    verified?: boolean;
    infoFields?: { icon: any; label: string }[];
    type?: string;
    status?: string; // 'Open', 'Closed', 'Hiring'
    price?: string;
}

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';

export const ThemeListingCard: React.FC<{ listing: ListingProps; theme?: 'light' | 'dark'; layout?: 'grid' | 'list'; variant?: 'premium' | 'basic' }> = ({ listing, theme = 'dark', layout = 'grid', variant = 'basic' }) => {
    const { theme: globalTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const activeTheme = mounted ? (resolvedTheme || globalTheme) : theme;
    const isDark = activeTheme === 'dark';
    const isList = layout === 'list';
    const isPremium = variant === 'premium';

    // Premium Logic: Golden border/glow, slightly larger
    const wrapperClasses = isPremium
        ? "group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-2 bg-card border-2 border-yellow-500/50 shadow-xl shadow-yellow-500/10 hover:shadow-yellow-500/20 h-full"
        : "group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-card border border-border hover:shadow-xl hover:border-primary/50 h-full";

    const cardContent = (
        <div className={wrapperClasses}>

            {/* Premium Badge */}
            {isPremium && (
                <div className="absolute top-0 right-0 z-20 bg-yellow-500 text-black text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Premium
                </div>
            )}

            {/* Header / Cover Image */}
            <div className="h-48 relative overflow-hidden bg-muted">
                <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {listing.status && (
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${listing.status === 'Open' ? 'bg-green-500 text-white' :
                            listing.status === 'Closed' ? 'bg-destructive text-white' : 'bg-blue-500 text-white'
                            }`}>
                            {listing.status}
                        </span>
                    )}
                </div>

                {/* Tools (Bookmark, QuickView) */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                    <button className="p-2 rounded-full bg-background/50 backdrop-blur-md text-foreground hover:bg-primary hover:text-primary-foreground transition-colors" onClick={(e) => e.preventDefault()}>
                        <Heart className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-background/50 backdrop-blur-md text-foreground hover:bg-blue-500 hover:text-white transition-colors" onClick={(e) => e.preventDefault()}>
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                {/* Logo / Avatar (Overlaying bottom) */}
                {listing.logo && (
                    <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-full border-4 border-card overflow-hidden bg-card z-10 shadow-lg">
                        <img src={listing.logo} alt="Logo" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Content Content */}
            <div className="pt-10 pb-4 px-6 relative flex-grow">
                {/* Title Row */}
                <div className="mb-3">
                    <h3 className="text-lg font-bold truncate pr-2 flex items-center gap-2 text-foreground">
                        {listing.title}
                        {listing.verified && (
                            <CheckCircle className="w-4 h-4 text-blue-400 fill-current" />
                        )}
                    </h3>
                    {listing.price && (
                        <div className="text-sm font-semibold text-green-500 mt-1">{listing.price}</div>
                    )}
                </div>

                {/* Info Fields */}
                <div className="space-y-2 mb-4">
                    {listing.location && (
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="truncate">{listing.location}</span>
                        </div>
                    )}
                    {listing.infoFields?.map((field, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                            {field.icon}
                            <span className="truncate">{field.label}</span>
                        </div>
                    ))}
                </div>

            </div>

            {/* Footer Section */}
            <div className="px-6 py-3 border-t flex items-center justify-between border-border bg-muted/50 mt-auto">

                {/* Category */}
                {listing.category && (
                    <div className="flex items-center gap-2">
                        <div
                            className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white"
                            style={{ backgroundColor: listing.category.color }}
                        >
                            {listing.category.icon}
                        </div>
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                            {listing.category.name}
                        </span>
                    </div>
                )}

                {/* Rating */}
                {listing.rating && (
                    <div className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md">
                        <div className="flex text-accent">
                            <Star className="w-3 h-3 fill-current" />
                        </div>
                        <span className="text-xs font-bold text-foreground">{listing.rating}</span>
                        {listing.reviewCount && (
                            <span className="text-[10px] text-muted-foreground">({listing.reviewCount})</span>
                        )}
                    </div>
                )}
            </div>

        </div>
    );


    // Determine the details URL based on category/type
    const getDetailUrl = () => {
        if (!listing.category?.name) return `/business/${listing.id}`;

        const cat = listing.category.name.toLowerCase();
        if (cat.includes('suv') || cat.includes('car') || cat.includes('truck') || cat.includes('auto') || cat.includes('sports')) {
            return `/autos/${listing.id}`;
        }
        if (cat.includes('villa') || cat.includes('estate') || cat.includes('condo') || cat.includes('land') || cat.includes('commercial') || cat.includes('property')) {
            return `/real-estate/${listing.id}`;
        }
        if (cat.includes('technology') || cat.includes('marketing') || cat.includes('hospitality') || cat.includes('construction') || cat.includes('job')) {
            return `/jobs/${listing.id}`;
        }
        return `/business/${listing.id}`;
    };

    const detailUrl = getDetailUrl();

    if (isList) {
        return (
            <Link href={detailUrl} className="block w-full">
                <div className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-card border border-border hover:shadow-2xl flex flex-col md:flex-row h-auto md:h-52 hover:border-primary/50">

                    {/* List View: Image Section (Left) */}
                    <div className="w-full md:w-64 relative overflow-hidden bg-muted shrink-0 h-48 md:h-full">
                        <img
                            src={listing.image}
                            alt={listing.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
                        <div className="absolute top-4 left-4 flex gap-2">
                            {listing.status && (
                                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${listing.status === 'Open' ? 'bg-green-500 text-white' :
                                    listing.status === 'Closed' ? 'bg-destructive text-white' : 'bg-blue-500 text-white'
                                    }`}>
                                    {listing.status}
                                </span>
                            )}
                        </div>
                        {listing.logo && (
                            <div className="absolute -bottom-4 right-4 w-12 h-12 rounded-full border-4 border-card overflow-hidden bg-card z-10 shadow-lg md:hidden">
                                <img src={listing.logo} alt="Logo" className="w-full h-full object-cover" />
                            </div>
                        )}
                    </div>

                    {/* List View: Content Section (Right) */}
                    <div className="flex-1 flex flex-col justify-between p-4 md:p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-xl font-bold truncate flex items-center gap-2 text-foreground">
                                    {listing.title}
                                    {listing.verified && (
                                        <CheckCircle className="w-4 h-4 text-blue-400 fill-current" />
                                    )}
                                </h3>
                                <div className="flex items-center gap-2 mt-1">
                                    {listing.category && (
                                        <span style={{ color: listing.category.color }} className="text-xs font-bold uppercase tracking-wider">{listing.category.name}</span>
                                    )}
                                    <span className="text-muted-foreground text-[10px]">•</span>
                                    {listing.location && (
                                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                                            <MapPin className="w-3 h-3" /> {listing.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                            {listing.price && (
                                <div className="text-lg font-bold text-green-500 hidden md:block">{listing.price}</div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 my-4">
                            {listing.infoFields?.slice(0, 4).map((field, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                                    {field.icon}
                                    <span className="truncate">{field.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                            <div className="flex items-center gap-2">
                                {listing.logo && (
                                    <div className="w-8 h-8 rounded-full overflow-hidden bg-card hidden md:block">
                                        <img src={listing.logo} alt="Logo" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                {listing.rating && (
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 text-accent fill-current" />
                                        <span className="text-sm font-bold text-foreground">{listing.rating}</span>
                                        <span className="text-xs text-muted-foreground">({listing.reviewCount ?? 0} reviews)</span>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-2">
                                <button className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors" onClick={(e) => e.preventDefault()}><Heart className="w-4 h-4" /></button>
                                <button className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors" onClick={(e) => e.preventDefault()}><ArrowRightLeft className="w-4 h-4" /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

    return (
        <Link href={detailUrl} className="block h-full">
            {cardContent}
        </Link>
    );
};
