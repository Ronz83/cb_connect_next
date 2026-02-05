'use client';

import React, { useEffect, useState } from 'react';
import { User, MapPin, Briefcase, FileText, Linkedin, Globe, CheckCircle, Mail, Calendar, Share2, Award, Download } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';

interface Candidate {
    id: string;
    full_name: string;
    headline: string;
    bio: string;
    location: string;
    skills: string[];
    experience_years: number;
    linkedin_url?: string;
    portfolio_url?: string;
    resume_url?: string;
    is_verified?: boolean;
    created_at: string;
}

export default function CandidateProfilePage({ params }: { params: { id: string } }) {
    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCandidate() {
            setLoading(true);
            const { data, error } = await supabase
                .from('candidates')
                .select('*')
                .eq('id', params.id)
                .single();

            if (error) {
                console.error('Error fetching candidate:', error);
            } else {
                setCandidate(data);
            }
            setLoading(false);
        }

        fetchCandidate();
    }, [params.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!candidate) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center text-foreground">
                <h1 className="text-2xl font-bold mb-4">Candidate Not Found</h1>
                <p className="text-muted-foreground">The profile you are looking for does not exist or is private.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <ThemeHeader transparent={false} theme="light" />

            {/* HEADER / COVER AREA */}
            <div className="h-48 md:h-64 bg-gradient-to-r from-[#002D56] to-primary relative">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative -mt-20 pb-20">

                {/* PROFILE CARD */}
                <div className="bg-card border border-border rounded-xl shadow-lg p-6 md:p-8 flex flex-col md:flex-row gap-6 relative">

                    {/* Avatar */}
                    <div className="flex-shrink-0 relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-card bg-muted flex items-center justify-center overflow-hidden shadow-md">
                            <User size={64} className="text-muted-foreground" />
                        </div>
                        {candidate.is_verified && (
                            <div className="absolute bottom-2 right-2 bg-primary text-primary-foreground p-1.5 rounded-full border-2 border-card" title="Verified Candidate">
                                <CheckCircle size={16} fill="currentColor" strokeWidth={3} className="text-white" />
                            </div>
                        )}
                    </div>

                    {/* ... (Main Info remains mostly same but verify) ... */}
                    <div className="flex-1 pt-2 md:pt-10">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                            <div>
                                <h1 className="text-3xl font-extrabold text-foreground mb-1">{candidate.full_name}</h1>
                                <p className="text-xl text-primary font-medium mb-3">{candidate.headline}</p>

                                {/* ... (Stats match themes) ... */}
                                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <MapPin size={16} /> {candidate.location}
                                    </span>
                                    {candidate.experience_years > 0 && (
                                        <span className="flex items-center gap-1.5">
                                            <Briefcase size={16} /> {candidate.experience_years} Year{candidate.experience_years !== 1 ? 's' : ''} Exp.
                                        </span>
                                    )}
                                    <span className="flex items-center gap-1.5">
                                        <Calendar size={16} /> Joined {new Date(candidate.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>

                            {/* ... Actions ... */}
                            <div className="flex gap-3 mt-2 md:mt-0 w-full md:w-auto">
                                <button className="flex-1 md:flex-none py-2.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                    <Mail size={18} />
                                    Contact
                                </button>
                                <button className="p-2.5 rounded-lg border border-border bg-secondary hover:bg-secondary/80 text-foreground transition-all">
                                    <Share2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

                    {/* LEFT COLUMN: About & Skills */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* ... (About & Skills are already theme compliant) ... */}
                        <div className="bg-card border border-border rounded-xl shadow-sm p-8">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-foreground">
                                <User size={20} className="text-primary" />
                                About
                            </h3>
                            <div className="prose dark:prose-invert max-w-none text-muted-foreground">
                                <p className="whitespace-pre-line">{candidate.bio || "No bio provided."}</p>
                            </div>
                        </div>

                        {/* Skills */}
                        {candidate.skills && candidate.skills.length > 0 && (
                            <div className="bg-card border border-border rounded-xl shadow-sm p-8">
                                <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
                                    <Award size={20} className="text-primary" />
                                    Skills & Expertise
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium border border-border">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Sidebar stats/links */}
                    <div className="space-y-6">

                        {/* Connect Widget - Refactored to Primary */}
                        <div className="bg-card border border-border rounded-xl shadow-sm p-6">
                            <h3 className="text-lg font-bold mb-4 text-foreground">Links & Portfolio</h3>
                            <div className="space-y-3">
                                {candidate.linkedin_url && (
                                    <a href={candidate.linkedin_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <Linkedin size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground font-bold uppercase">LinkedIn</div>
                                            <div className="font-medium text-foreground text-sm truncate max-w-[180px]">View Profile</div>
                                        </div>
                                    </a>
                                )}
                                {candidate.portfolio_url && (
                                    <a href={candidate.portfolio_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground font-bold uppercase">Portfolio</div>
                                            <div className="font-medium text-foreground text-sm truncate max-w-[180px]">Visit Website</div>
                                        </div>
                                    </a>
                                )}
                                {candidate.resume_url && (
                                    <a href={candidate.resume_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors group">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                            <Download size={20} />
                                        </div>
                                        <div>
                                            <div className="text-xs text-muted-foreground font-bold uppercase">Resume</div>
                                            <div className="font-medium text-foreground text-sm">Download CV</div>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>

                        {/* Status Widget - Refactored to Primary/Secondary */}
                        <div className="bg-gradient-to-br from-primary/5 to-background dark:from-primary/10 dark:to-background border border-primary/20 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                                    <Briefcase size={20} />
                                </div>
                                <h3 className="font-bold text-foreground">Open to Work</h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                                This candidate is currently active and open to new opportunities.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
