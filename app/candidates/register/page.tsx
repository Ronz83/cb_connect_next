'use client';

import React, { useState } from 'react';
import { User, MapPin, Briefcase, FileText, Linkedin, Globe, CheckCircle } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';

export default function CandidateRegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: '',
        headline: '',
        bio: '',
        location: 'Bridgetown, Barbados',
        skills: '',
        experience_years: 0,
        linkedin_url: '',
        portfolio_url: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            alert('You must be logged in to register as a candidate.');
            setLoading(false);
            return;
        }

        // Convert skills string to array
        const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(Boolean);

        const { error } = await supabase
            .from('candidates')
            .upsert({
                id: user.id,
                full_name: formData.full_name,
                headline: formData.headline,
                bio: formData.bio,
                location: formData.location,
                skills: skillsArray,
                experience_years: formData.experience_years,
                linkedin_url: formData.linkedin_url,
                portfolio_url: formData.portfolio_url,
                is_public: true
            });

        if (error) {
            console.error('Error registering candidate:', error);
            alert('Error registering correctly: ' + error.message);
        } else {
            router.push('/dashboard'); // Or to their public profile
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-background text-foreground py-12 px-4 sm:px-6 lg:px-8">
            <ThemeHeader transparent={false} />
            <div className="max-w-2xl mx-auto pt-20">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
                        Join the Candidate Registry
                    </h1>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Create your professional profile and get noticed by top Caribbean employers.
                    </p>
                </div>

                <div className="bg-card border border-border rounded-xl shadow-lg overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-2">
                                <User size={20} className="text-primary" />
                                Basic Information
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="full_name"
                                        required
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="Jane Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                                        <input
                                            type="text"
                                            name="location"
                                            value={formData.location}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                            placeholder="City, Country"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Professional Headline</label>
                                <input
                                    type="text"
                                    name="headline"
                                    required
                                    value={formData.headline}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    placeholder="e.g. Senior React Developer | UX Enthusiast"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-muted-foreground mb-1">Bio / Summary</label>
                                <textarea
                                    name="bio"
                                    rows={4}
                                    value={formData.bio}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                    placeholder="Briefly describe your experience and what you're looking for..."
                                />
                            </div>
                        </div>

                        {/* Professional Details */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-2">
                                <Briefcase size={20} className="text-primary" />
                                Experience & Skills
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">Years of Experience</label>
                                    <input
                                        type="number"
                                        name="experience_years"
                                        min="0"
                                        value={formData.experience_years}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-muted-foreground mb-1">Skills (comma separated)</label>
                                    <input
                                        type="text"
                                        name="skills"
                                        value={formData.skills}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="React, Node.js, TypeScript, SQL"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Links */}
                        <div className="space-y-4 pt-4">
                            <h3 className="text-lg font-bold flex items-center gap-2 border-b border-border pb-2">
                                <Globe size={20} className="text-primary" />
                                Social & Portfolio
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="relative">
                                    <Linkedin className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                                    <input
                                        type="url"
                                        name="linkedin_url"
                                        value={formData.linkedin_url}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="LinkedIn URL"
                                    />
                                </div>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-2.5 text-muted-foreground" size={18} />
                                    <input
                                        type="url"
                                        name="portfolio_url"
                                        value={formData.portfolio_url}
                                        onChange={handleChange}
                                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-secondary border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                        placeholder="Portfolio / Personal Site"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50"
                            >
                                {loading ? 'Creating Profile...' : 'Create Candidate Profile'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}
