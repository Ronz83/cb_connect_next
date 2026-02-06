import React from 'react';
import Link from 'next/link';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { Briefcase, Search, Zap, CheckCircle, Users, ArrowRight } from 'lucide-react';

export default function JobsMarketingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <ThemeHeader />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent -z-10" />
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                        <Briefcase size={16} />
                        Next-Gen Caribbean Recruitment
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        The Future of Work <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Is Right Here.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Connect with top-tier Caribbean talent or find your dream role with our AI-powered matchmaking engine.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/jobs/browse" className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-foreground font-bold rounded-xl hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                            <Search size={20} /> Browse Jobs
                        </Link>
                        <Link href="/login/business" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
                            Post a Job
                        </Link>
                        <Link href="/login/candidate" className="w-full sm:w-auto px-8 py-4 bg-card border border-border text-foreground font-bold rounded-xl hover:bg-muted transition-all flex items-center justify-center gap-2">
                            Create Talent Profile
                        </Link>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why CB Jobs?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            We don't just list jobs; we build careers and empower businesses with smarter hiring tools.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">AI-Powered Matching</h3>
                            <p className="text-muted-foreground">
                                Our algorithms analyze skills, experience, and culture fit to instantly surface the best candidates for every role.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                                <CheckCircle className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Verified Profiles</h3>
                            <p className="text-muted-foreground">
                                Save time with pre-vetted candidate profiles. We verify skills and past employment so you can hire with confidence.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Users className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Talent Pools</h3>
                            <p className="text-muted-foreground">
                                Build your own database of potential hires continuously, so you're ready when a vacancy opens up.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-gradient-to-r from-[#002D56] to-primary p-12 text-center text-white shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workforce?</h2>
                            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                                Join thousands of Caribbean companies building their future with CB Connect.
                            </p>
                            <Link href="/login/business" className="inline-flex items-center px-8 py-4 bg-white text-[#002D56] font-bold rounded-xl hover:bg-gray-100 transition-colors">
                                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                        {/* Decorative Pattern */}
                        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}
