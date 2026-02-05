'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Globe, Clock, Share2, Heart, Flag, CheckCircle, Star, Calendar, Mail, ArrowRight, Mic, Check } from 'lucide-react';
import { ThemeHeader } from './ThemeHeader';
import { checkApplicationStatus, submitApplication } from '@/app/actions/applications';
import { useRouter } from 'next/navigation';

function ApplyButton({ jobId }: { jobId: string }) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ hasApplied: boolean, status?: string }>({ hasApplied: false });
    const router = useRouter();

    useEffect(() => {
        checkApplicationStatus(jobId).then(setStatus);
    }, [jobId]);

    const handleApply = async () => {
        setLoading(true);
        const result = await submitApplication(jobId);
        setLoading(false);

        if (result.success) {
            setStatus({ hasApplied: true, status: 'pending' });
            alert('Application submitted successfully!');
        } else {
            if (result.code === 'NO_PROFILE') {
                if (confirm('You need a Candidate Profile to apply. Create one now?')) {
                    router.push('/candidates/register');
                }
            } else {
                alert(result.message);
            }
        }
    };

    if (status.hasApplied) {
        return (
            <button disabled className="px-6 py-3 rounded-xl bg-green-600 text-white font-bold shadow-lg flex items-center gap-2 cursor-default opacity-90">
                <CheckCircle size={18} />
                Applied
            </button>
        );
    }

    return (
        <button
            onClick={handleApply}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white font-bold shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {loading ? 'Submitting...' : 'Apply with Profile'}
        </button>
    );
}

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
    hours?: string;
    features?: string[];
    requirements?: string[]; // Job Requirements
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
        sector?: string; // New field
        posted?: string;
        remote?: boolean;
    };
}

export const ThemeDetailsPage: React.FC<{ listing: DetailsProps; theme?: 'light' | 'dark' }> = ({ listing, theme = 'light' }) => {
    // Note: 'theme' prop is kept for compatibility but styles primarily use semantic classes now.

    // Helper to determine type if not explicitly set (based on props presence)
    const isCar = !!listing.specs;
    const isProperty = !!listing.propertyDetails;
    const isJob = !!listing.jobDetails;

    // Derived Labels
    const typeLabel = isCar ? "Vehicle Specs" : isProperty ? "Property Facts" : isJob ? "Job Overview" : "Details";

    return (
        <div className="min-h-screen font-sans bg-background text-foreground transition-colors duration-300">
            <ThemeHeader transparent={true} theme={theme} />

            {/* HER0 / COVER SECTION */}
            <div className="relative h-[60vh] md:h-[500px] w-full bg-gray-900 overflow-hidden">
                <img
                    src={listing.coverImage}
                    alt={listing.title}
                    className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/30 opacity-90" />
            </div>

            {/* MAIN CONTENT CONTAINER */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-32 relative z-10 pb-20">

                {/* HEADER CARD */}
                <div className="rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 shadow-2xl backdrop-blur-sm bg-card/90 border border-border">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl border-4 border-card bg-muted overflow-hidden shadow-lg relative">
                            {listing.logo ? (
                                <img src={listing.logo} alt="Logo" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-muted-foreground">
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
                                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide text-white shadow-sm" style={{ backgroundColor: listing.category.color }}>
                                            {listing.category.name}
                                        </span>
                                    )}
                                    {listing.status && (
                                        <span className={`text-xs font-bold uppercase tracking-wide ${listing.status === 'Open' ? 'text-green-500' : 'text-red-500'
                                            }`}>
                                            ● {listing.status}
                                        </span>
                                    )}
                                </div>

                                <h1 className="text-3xl md:text-4xl font-extrabold mb-2 leading-tight text-foreground">{listing.title}</h1>

                                {listing.tagline && (
                                    <p className="text-lg mb-4 text-muted-foreground">{listing.tagline}</p>
                                )}

                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    {listing.location && (
                                        <span className="flex items-center gap-1.5"><MapPin size={16} /> {listing.location}</span>
                                    )}
                                    {listing.rating && (
                                        <span className="flex items-center gap-1.5 text-yellow-500">
                                            <Star size={16} fill="currentColor" />
                                            <span className="font-bold text-foreground">{listing.rating}</span>
                                            <span className="text-muted-foreground">({listing.reviewCount} reviews)</span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex gap-3 mt-4 md:mt-0">
                                <button className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-foreground border border-border">
                                    <Share2 size={20} />
                                </button>
                                <button className="p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors text-foreground border border-border">
                                    <Heart size={20} />
                                </button>

                                {isJob ? (
                                    <ApplyButton jobId={listing.id.toString()} />
                                ) : (
                                    <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition-colors text-white font-bold shadow-lg shadow-blue-500/20">
                                        {isCar ? "Test Drive" : isProperty ? "Request Tour" : "Contact Now"}
                                    </button>
                                )}
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
                            <div className="p-8 rounded-xl border border-border bg-card shadow-sm">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                                    <span className="w-1 h-6 bg-green-500 rounded-full" />
                                    {typeLabel}
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {isCar && listing.specs && (
                                        <>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Engine</div>
                                                <div className="font-medium text-foreground">{listing.specs.engine}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Trans.</div>
                                                <div className="font-medium text-foreground">{listing.specs.transmission}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Drivetrain</div>
                                                <div className="font-medium text-foreground">{listing.specs.drivetrain}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Color</div>
                                                <div className="font-medium text-foreground">{listing.specs.color}</div>
                                            </div>
                                        </>
                                    )}
                                    {isProperty && listing.propertyDetails && (
                                        <>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Type</div>
                                                <div className="font-medium text-foreground">{listing.propertyDetails.type}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Year Built</div>
                                                <div className="font-medium text-foreground">{listing.propertyDetails.yearBuilt}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Lot Size</div>
                                                <div className="font-medium text-foreground">{listing.propertyDetails.lotSize}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">HOA</div>
                                                <div className="font-medium text-foreground">{listing.propertyDetails.hoaFees}</div>
                                            </div>
                                        </>
                                    )}
                                    {isJob && listing.jobDetails && (
                                        <>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Salary</div>
                                                <div className="font-medium text-green-500">{listing.jobDetails.salary}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Type</div>
                                                <div className="font-medium text-foreground">{listing.jobDetails.type}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Sector</div>
                                                <div className="font-medium text-foreground">{listing.jobDetails.sector || listing.jobDetails.department}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Remote</div>
                                                <div className="font-medium text-foreground">{listing.jobDetails.remote ? "Yes" : "No"}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}


                        {/* Description */}
                        <div className="p-8 rounded-xl border border-border bg-card shadow-sm">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                                <span className="w-1 h-6 bg-blue-500 rounded-full" />
                                {isJob ? "Job Description" : "About"}
                            </h3>
                            <div className="prose dark:prose-invert max-w-none text-muted-foreground leading-relaxed mb-8">
                                <p>{listing.description}</p>
                            </div>

                            {/* Requirements List (for Jobs) */}
                            {isJob && listing.requirements && (
                                <div className="mt-6">
                                    <h4 className="font-bold text-foreground mb-4">Requirements</h4>
                                    <ul className="space-y-3">
                                        {listing.requirements.map((req, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <CheckCircle size={18} className="text-green-500 mt-1 flex-shrink-0" />
                                                <span className="text-muted-foreground">{req}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Features */}
                        {listing.features && (
                            <div className="p-8 rounded-xl border border-border bg-card shadow-sm">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                                    <span className="w-1 h-6 bg-purple-500 rounded-full" />
                                    {isJob ? "Benefits & Perks" : isCar ? "Key Features" : "Amenities"}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {listing.features.map((feature, i) => (
                                        <div key={i} className="flex items-center gap-3 text-muted-foreground">
                                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                                            {feature}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gallery */}
                        {listing.gallery && (
                            <div className="p-8 rounded-xl border border-border bg-card shadow-sm">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                                    <span className="w-1 h-6 bg-orange-500 rounded-full" />
                                    Gallery
                                </h3>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {listing.gallery.map((img, i) => (
                                        <div key={i} className="aspect-square rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-90 transition-opacity">
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
                        <div className="p-6 rounded-xl border relative overflow-hidden group bg-gradient-to-br from-primary/5 to-card border-primary/10 dark:from-primary/20 dark:to-card dark:border-primary/30">
                            {/* Animated Background Effect */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-700" />

                            <div className="relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/30">
                                        <Mic size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">AI Assistant</h3>
                                        <div className="flex items-center gap-2">
                                            <span className="relative flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                            </span>
                                            <span className="text-xs text-green-500 font-medium uppercase tracking-wider">Online</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm mb-6 text-muted-foreground">
                                    Have questions about {listing.title}? Ask our AI assistant for instant answers about availability, pricing, and more.
                                </p>

                                <button className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-lg hover:shadow-primary/25 flex items-center justify-center gap-2 group-hover:scale-[1.02]">
                                    <Mic size={18} />
                                    Start Conversation
                                </button>
                            </div>
                        </div>

                        {/* ACTION WIDGET */}
                        {(isCar || isProperty) && (
                            <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                                <h3 className="text-lg font-bold mb-4 text-foreground">
                                    {isCar ? "Schedule Test Drive" : "Request a Tour"}
                                </h3>
                                <div className="space-y-3">
                                    <input type="text" placeholder="Name" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-blue-500" />
                                    <input type="email" placeholder="Email" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-blue-500" />
                                    <input type="tel" placeholder="Phone" className="w-full bg-secondary border border-border rounded-lg px-4 py-3 text-foreground focus:outline-none focus:border-blue-500" />
                                    <button className="w-full py-3 rounded-lg bg-foreground text-background font-bold hover:bg-foreground/80 transition-colors">
                                        {isCar ? "Book Test Drive" : "Schedule Viewing"}
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Contact Card */}
                        <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                            <h3 className="text-lg font-bold mb-4 text-foreground">Contact Info</h3>
                            <div className="space-y-4">
                                {listing.contact?.phone && (
                                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                            <Phone size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase font-bold">Phone</div>
                                            <div className="font-medium text-foreground">{listing.contact.phone}</div>
                                        </div>
                                    </div>
                                )}
                                {listing.contact?.email && (
                                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase font-bold">Email</div>
                                            <div className="font-medium truncate max-w-[200px] text-foreground">{listing.contact.email}</div>
                                        </div>
                                    </div>
                                )}
                                {listing.contact?.website && (
                                    <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                            <Globe size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground uppercase font-bold">Website</div>
                                            <div className="font-medium truncate max-w-[200px] text-foreground">{listing.contact.website}</div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Opening Hours */}
                        {listing.hours && (
                            <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-foreground">
                                    <Clock size={16} className="text-muted-foreground" />
                                    Opening Hours
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-border">
                                        <span className="text-muted-foreground">Monday - Friday</span>
                                        <span className="font-medium text-green-500">{listing.hours}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-2 border-b border-dashed border-border">
                                        <span className="text-muted-foreground">Saturday</span>
                                        <span className="font-medium text-foreground">10:00 AM - 4:00 PM</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm py-2">
                                        <span className="text-muted-foreground">Sunday</span>
                                        <span className="font-medium text-red-500">Closed</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Map Placeholder */}
                        <div className="rounded-xl overflow-hidden border border-border h-64 relative bg-secondary group cursor-pointer">
                            <img
                                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2948&auto=format&fit=crop"
                                alt="Map Location"
                                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <button className="px-4 py-2 bg-background text-foreground font-bold rounded-lg shadow-xl hover:scale-105 transition-transform">
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
