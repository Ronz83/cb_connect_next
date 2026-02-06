import React from 'react';
import Link from 'next/link';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';
import { ArrowRight, Globe, ShoppingBag, ShieldCheck } from 'lucide-react';

export default function MarketingLandingPage() {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <ThemeHeader />

            {/* Hero Section */}
            <div className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 -z-10" />
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                        </span>
                        The Caribbean's Digital Economy
                    </div>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                        One Platform.<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Endless Opportunities.</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
                        Join the premier network connecting Caribbean businesses, professionals, and global markets. Buy, sell, and grow with confidence.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="http://dir.localhost:3000" className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/25">
                            Browse Directory <ArrowRight size={20} />
                        </Link>
                        <button className="px-8 py-4 bg-card border border-border text-foreground font-bold rounded-xl hover:bg-muted transition-all">
                            Explore Marketplace
                        </button>
                    </div>
                </div>
            </div>

            {/* Features Material */}
            <div className="py-24 bg-muted/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link href="/marketing/registry" className="group p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md hover:border-primary/50 transition-all">
                            <Globe className="w-12 h-12 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                                Registry & Directory <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <p className="text-muted-foreground">Access a verified database of businesses across 15+ Caribbean nations. Get listed and be seen.</p>
                        </Link>

                        <Link href="/marketing/jobs" className="group p-8 rounded-3xl bg-card border border-border shadow-sm hover:shadow-md hover:border-accent/50 transition-all">
                            <ShoppingBag className="w-12 h-12 text-accent mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-2xl font-bold mb-3 flex items-center gap-2">
                                Jobs & Talent <ArrowRight size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h3>
                            <p className="text-muted-foreground">The region's most advanced recruitment platform. AI matching for top talent and dream careers.</p>
                        </Link>

                        <div className="p-8 rounded-3xl bg-card border border-border shadow-sm">
                            <ShieldCheck className="w-12 h-12 text-primary mb-6" />
                            <h3 className="text-2xl font-bold mb-3">Secure Trade</h3>
                            <p className="text-muted-foreground">Identity verification and escrow services ensuring safe cross-border trade.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
