import React from 'react';
import Link from 'next/link';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { Globe, ShieldCheck, TrendingUp, Search, Building2, ArrowRight } from 'lucide-react';

export default function RegistryMarketingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <ThemeHeader />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5 -z-10" />
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium mb-6">
                        <Building2 size={16} />
                        The Official Caribbean Business Registry
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        Be Seen. Be Verified. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">Do Business Globally.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Join the most trusted network of Caribbean businesses. Get listed, build credibility, and access exclusive international trade opportunities.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/login/business" className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/25">
                            Claim Your Listing
                        </Link>
                        <Link href="/search" className="w-full sm:w-auto px-8 py-4 bg-card border border-border text-foreground font-bold rounded-xl hover:bg-muted transition-all flex items-center justify-center gap-2">
                            Search Directory
                        </Link>
                    </div>
                </div>
            </div>

            {/* Benefits Grid */}
            <div className="py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Why Join the Registry?</h2>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            In a digital-first world, trust is your currency. We help you build it.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div className="p-8 rounded-3xl bg-card border border-border hover:border-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Verification Badge</h3>
                            <p className="text-muted-foreground">
                                Stand out with the "Verified Business" badge. Prove to international partners and customers that you are a legitimate, registered entity.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="p-8 rounded-3xl bg-card border border-border hover:border-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Globe className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Global Visibility</h3>
                            <p className="text-muted-foreground">
                                Your profile is optimized for SEO and accessible to investors worldwide. Break out of the local market.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="p-8 rounded-3xl bg-card border border-border hover:border-accent/50 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-6">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">B2B Opportunities</h3>
                            <p className="text-muted-foreground">
                                Access our internal Request for Quote (RFQ) system. Get leads directly from other businesses looking for your services.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="rounded-3xl bg-card border-2 border-primary/20 p-12 text-center shadow-2xl relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">Put Your Business on the Map</h2>
                            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                                Don't stay hidden. Join thousands of verified Caribbean businesses today.
                            </p>
                            <Link href="/login/business" className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
                                Register Free Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </div>
                        {/* Decorative Background */}
                        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
