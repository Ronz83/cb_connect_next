'use client';

import React from 'react';
import { MapPin, Phone, Globe, Clock, Share2, Heart, Flag, CheckCircle, Star, Calendar, Mail, ArrowRight, Mic } from 'lucide-react';
import { themes } from '@/lib/themes';

interface DetailsProps {
    id: string | number;
    title: string;
    tagline?: string;
    description: string;
    coverImage: string;
    logo?: string;
    gallery?: string[];
    category?: { name: string; icon: any; color: string };
    location?: string;
    rating?: number;
    reviewCount?: number;
    verified?: boolean;
    status?: string;
    price?: string;
    contact?: {
        phone?: string;
        email?: string;
        website?: string;
    };
    socials?: { facebook?: string; instagram?: string; twitter?: string };
    hours?: string; // specific opening hours text
    features?: string[];
    // EXTENDED PROPS
    specs?: {
        engine?: string;
        transmission?: string;
        drivetrain?: string;
        color?: string;
        year?: string;
        condition?: string;
    };
    propertyDetails?: {
        yearBuilt?: string;
        lotSize?: string;
        sqFt?: string;
        hoaFees?: string;
        type?: string;
    };
    jobDetails?: {
        salary?: string;
        type?: string;
        department?: string;
        posted?: string;
        remote?: boolean;
    };
}


import { ThemeHeader } from './ThemeHeader';

export const ThemeDetailsPage: React.FC<{ listing: DetailsProps; theme?: 'light' | 'dark' }> = ({ listing, theme = 'dark' }) => {
    const t = themes[theme];
    const isDark = theme === 'dark';

    // Helper to determine type if not explicitly set (based on props presence)
    const isCar = !!listing.specs;
    const isProperty = !!listing.propertyDetails;
    const isJob = !!listing.jobDetails;

    // Derived Labels
    const typeLabel = isCar ? "Vehicle Specs" : isProperty ? "Property Facts" : isJob ? "Job Overview" : "Details";

    return (
        <div className={`min-h-screen font-sans ${isDark ? 'bg-[#050505] text-white' : 'bg-gray-50 text-gray-900'}`}>
            <ThemeHeader transparent={true} theme={theme} />

            {/* HER0 / COVER SECTION */}
            <div className="relative h-[60vh] md:h-[500px] w-full bg-gray-900 overflow-hidden">
                <img
                    src={listing.coverImage}
                    alt={listing.title}
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/30 opacity-90" />

                {/* Top Actions (Back, Share, etc. - usually handled by global nav, but added here for completeness context) */}
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative z-10 pb-20">

                {/* HEADER CARD */}
                <div className={`rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-2xl backdrop-blur-sm ${isDark ? 'bg-[#151515]/90 border border-[#222]' : 'bg-white border border-gray-200'}`}>

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className={`w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 ${isDark ? 'border-[#222] bg-[#111]' : 'border-white bg-gray-100'} overflow-hidden shadow-lg relative`}>
                            {listing.logo ? (
                                <img src={listing.logo} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-500">
                                    {listing.title.charAt(0)}
                                </div>
                            )}
                            {listing.verified && (
                                <div className="absolute bottom-1 right-1 bg-blue-500 text-white rounded-full p-1" title="Verified Listing">
                                    <CheckCircle size={14} fill="currentColor" className="text-white" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Title & Key Info */}
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    {listing.category && (
                                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white" style={{ backgroundColor: listing.category.color }}>
                                            {listing.category.name}
                                        </span>
                                    )}
                                    {listing.status && (
                                        <span className={`text-xs font-bold uppercase tracking-wide ${listing.status === 'Open' ? 'text-green-400' : 'text-red-400'
                                            }`}>
                                            ● {listing.status}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight">{listing.title}</h1>

                                {listing.tagline && (
                                    <p className={`text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{listing.tagline}</p>
                                )}

                                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                    {listing.location && (
                                        <span className="flex items-center gap-1.5"><MapPin size={16} /> {listing.location}</span>
                                    )}
                                    {listing.rating && (
                                        <span className="flex items-center gap-1.5 text-yellow-500">
                                            <Star size={16} fill="currentColor" />
                                            <span className="font-bold text-white">{listing.rating}</span>
                                            <span className="text-gray-500">({listing.reviewCount} reviews)</span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex gap-3 mt-4 md:mt-0">
                                <button className="p-3 rounded-xl bg-[#222] hover:bg-[#333] transition-colors text-white border border-[#333]">
                                    <Share2 size={20} />
                                </button>
                                <button className="p-3 rounded-xl bg-[#222] hover:bg-[#333] transition-colors text-white border border-[#333]">
                                    <Heart size={20} />
                                </button>
                                <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white font-bold shadow-lg shadow-blue-900/20">
                                    {isJob ? "Apply Now" : isCar ? "Test Drive" : isProperty ? "Request Tour" : "Contact Now"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TWO COLUMN LAYOUT */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                    {/* LEFT COLUMN (Main Info) */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* DYNAMIC SPECS / FACTS GRID */}
                        {(isCar || isProperty || isJob) && (
                            <div className={`p-8 rounded-xl border ${isDark ? 'bg-[#151515] border-[#222]' : 'bg-white border-gray-200'}`}>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-green-500 rounded-full" />
                                    {typeLabel}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {isCar && listing.specs && (
                                        <>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Engine</div>
                                                <div className="font-medium">{listing.specs.engine}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Trans.</div>
                                                <div className="font-medium">{listing.specs.transmission}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Drivetrain</div>
                                                <div className="font-medium">{listing.specs.drivetrain}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Color</div>
                                                <div className="font-medium">{listing.specs.color}</div>
                                            </div>
                                        </>
                                    )}
                                    {isProperty && listing.propertyDetails && (
                                        <>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Type</div>
                                                <div className="font-medium">{listing.propertyDetails.type}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Year Built</div>
                                                <div className="font-medium">{listing.propertyDetails.yearBuilt}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Lot Size</div>
                                                <div className="font-medium">{listing.propertyDetails.lotSize}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">HOA</div>
                                                <div className="font-medium">{listing.propertyDetails.hoaFees}</div>
                                            </div>
                                        </>
                                    )}
                                    {isJob && listing.jobDetails && (
                                        <>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Salary</div>
                                                <div className="font-medium text-green-400">{listing.jobDetails.salary}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Type</div>
                                                <div className="font-medium">{listing.jobDetails.type}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Dept.</div>
                                                <div className="font-medium">{listing.jobDetails.department}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Remote</div>
                                                <div className="font-medium">{listing.jobDetails.remote ? "Yes" : "No"}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}


                        {/* Description */}
                        <div className={`p-8 rounded-xl border ${isDark ? 'bg-[#151515] border-[#222]' : 'bg-white border-gray-200'}`}>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-blue-500 rounded-full" />
                                {isJob ? "Job Description" : "About"}
                            </h3>
                            <div className={`prose ${isDark ? 'prose-invert' : ''} max-w-none text-gray-400 leading-relaxed`}>
                                <p>{listing.description}</p>
                            </div>
                        </div>

                        {/* Features */}
                        {listing.features && (
                            <div className={`p-8 rounded-xl border ${isDark ? 'bg-[#151515] border-[#222]' : 'bg-white border-gray-200'}`}>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-purple-500 rounded-full" />
                                    {isJob ? "Benefits & Perks" : isCar ? "Key Features" : "Amenities"}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {listing.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-gray-400">
                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gallery */}
                        {listing.gallery && (
                            <div className={`p-8 rounded-xl border ${isDark ? 'bg-[#151515] border-[#222]' : 'bg-white border-gray-200'}`}>
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-orange-500 rounded-full" />
                                    Gallery
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {listing.gallery.map((img, i) => (
                                        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-gray-800 cursor-pointer hover:opacity-90 transition-opacity">
                                            <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>

                    {/* RIGHT COLUMN (Sidebar) */}
                    <div className="space-y-6">

                        {/* Voice AI Widget */}
                        <div className={`p-6 rounded-xl border relative overflow-hidden group ${isDark ? 'bg-gradient-to-br from-indigo-900/40 to-[#151515] border-indigo-500/30' : 'bg-gradient-to-br from-indigo-50 to-white border-indigo-100'}`}>
                            {/* Animated Background Effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-indigo-500/20 transition-all duration-700" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                                        <Mic size={20} />
                                    </div>
                                    <div>
                                        <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>AI Assistant</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            <span className="text-xs text-green-400 font-medium uppercase tracking-wider">Online</span>
                                        </div>
                                    </div>
                                </div>

                                <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                                    Have questions about {listing.title}? Ask our AI assistant for instant answers about availability, pricing, and more.
                                </p>

                                <button className="w-full py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                                    <Mic size={18} />
                                    Start Conversation
                                </button>
                            </div>
                        </div>

                        {/* ACTION WIDGET (Test Drive / Tour / Apply) */}
                        {(isCar || isProperty) && (
                            <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#151515] border-[#222]' : 'bg-white border-gray-200'}`}>
                                <h3 className="text-lg font-bold mb-4">
                                    {isCar ? "Schedule Test Drive" : "Request a Tour"}
                                </h3>
                                <div className="space-y-3">
                                    <input type="text" placeholder="Name" className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                                    <input type="email" placeholder="Email" className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                                    <input type="tel" placeholder="Phone" className="w-full bg-[#111] border border-[#333] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500" />
                                    <button className="w-full py-3 rounded-lg bg-white text-black font-bold hover:bg-gray-200 transition-colors">
                                        {isCar ? "Book Test Drive" : "Schedule Viewing"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Contact Card */}
                        <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#151515] border-[#222]' : 'bg-white border-gray-200'}`}>
                            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
                            <div className="space-y-4">
                                {listing.contact?.phone && (
                                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase font-bold">Phone</div>
                                            <div className="font-medium">{listing.contact.phone}</div>
                                        </div>
                                    </div>
                                )}
                                {listing.contact?.email && (
                                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase font-bold">Email</div>
                                            <div className="font-medium truncate max-w-[200px]">{listing.contact.email}</div>
                                        </div>
                                    </div>
                                )}
                                {listing.contact?.website && (
                                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                            <Globe size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-500 uppercase font-bold">Website</div>
                                            <div className="font-medium truncate max-w-[200px]">{listing.contact.website}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Opening Hours */}
                        {listing.hours && (
                            <div className={`p-6 rounded-xl border ${isDark ? 'bg-[#151515] border-[#222]' : 'bg-white border-gray-200'}`}>
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    <Clock size={16} className="text-gray-400" />
                                    Opening Hours
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-gray-800">
                                        <span className="text-gray-400">Monday - Friday</span>
                                        <span className="font-medium text-green-400">{listing.hours}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-gray-800">
                                        <span className="text-gray-400">Saturday</span>
                                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-2">
                                        <span className="text-gray-400">Sunday</span>
                                        <span className="font-medium text-red-400">Closed</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Map Placeholder */}
                        <div className={`rounded-xl overflow-hidden border ${isDark ? 'border-[#222]' : 'border-gray-200'} h-64 relative bg-gray-800 group cursor-pointer`}>
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop"
                                alt="Map Location"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="px-4 py-2 bg-white text-black font-bold rounded-lg shadow-xl hover:scale-105 transition-transform">
                                    View on Map
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
};
