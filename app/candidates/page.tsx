import React from 'react';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { MapPin, Briefcase, User, Search, Filter } from 'lucide-react';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';

export const dynamic = 'force-dynamic';

export default async function CandidatesDirectoryPage() {
    const supabase = await createClient();

    const { data: candidates } = await supabase
        .from('candidates')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <ThemeHeader transparent={false} theme="light" />

            {/* HEADER */}
            <div className="bg-primary/5 py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
                        Find Top <span className="text-primary">Caribbean Talent</span>
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Connect with developers, designers, and professionals ready to work.
                        Browse our curated registry of verified candidates.
                    </p>

                    {/* Search Bar */}
                    <div className="mt-8 max-w-xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                        <div className="relative flex items-center bg-card rounded-xl p-2 shadow-xl border border-border">
                            <Search className="text-muted-foreground ml-3" />
                            <input
                                type="text"
                                placeholder="Search by skill, title, or location..."
                                className="flex-1 bg-transparent border-none outline-none px-4 text-foreground placeholder-muted-foreground h-10"
                            />
                            <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-lg font-bold transition-all">
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* LISTINGS */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold">Featured Candidates ({candidates?.length || 0})</h2>
                    <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-all text-sm font-medium">
                        <Filter size={16} />
                        Filters
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidates && candidates.map((candidate: any) => (
                        <Link href={`/candidates/${candidate.id}`} key={candidate.id} className="group">
                            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center border border-border">
                                            <User className="text-muted-foreground" size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{candidate.full_name}</h3>
                                            <p className="text-sm text-muted-foreground truncate max-w-[150px]">{candidate.headline}</p>
                                        </div>
                                    </div>
                                    {candidate.is_verified && (
                                        <span className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                                            Verified
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3 mb-6 flex-1">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <MapPin size={14} />
                                        {candidate.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Briefcase size={14} />
                                        {candidate.experience_years} Years Experience
                                    </div>

                                    {/* Skills Tags */}
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {candidate.skills?.slice(0, 3).map((skill: string, i: number) => (
                                            <span key={i} className="px-2 py-1 bg-secondary rounded text-xs font-medium text-secondary-foreground border border-border">
                                                {skill}
                                            </span>
                                        ))}
                                        {candidate.skills?.length > 3 && (
                                            <span className="px-2 py-1 bg-secondary rounded text-xs font-medium text-muted-foreground">
                                                +{candidate.skills.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-border mt-auto">
                                    <span className="text-primary font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                                        View Profile <span className="text-lg">→</span>
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {(!candidates || candidates.length === 0) && (
                        <div className="col-span-full text-center py-20 bg-muted/30 rounded-xl border border-dashed border-border">
                            <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-foreground">No candidates found</h3>
                            <p className="text-muted-foreground mt-2">Be the first to join the registry!</p>
                            <Link href="/candidates/register">
                                <button className="mt-6 px-6 py-2 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-all">
                                    Join Registry
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
