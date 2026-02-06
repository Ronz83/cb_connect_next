'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, CheckCircle2, Star, Zap, LayoutDashboard, ShieldCheck, PlayCircle, Briefcase, Car, Phone, Home, MapPin, CheckCircle, Globe, BarChart3, Wrench, HeartPulse, Search } from 'lucide-react';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { AuthButton } from '@/components/auth/AuthButton';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-orange-500/30">

      {/* Navbar */}
      <ThemeHeader transparent={true} />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-background">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-background">
          <div className="absolute top-0 -left-10 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 -right-10 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border animate-fade-in-up backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-muted-foreground">Live in 15+ Caribbean Countries</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6 animate-fade-in-up delay-100 leading-tight">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Caribbean</span> <br /> Like Never Before.
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Find top-rated businesses, properties, cars, and jobs across the islands. <br /> The directory built for growth.
          </p>

          <div className="animate-fade-in-up delay-300">
            <ThemeHeroSearch />
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-y border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-bold text-foreground">15+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Islands</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-bold text-foreground">10,000+</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Businesses</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-3xl font-bold text-foreground">Growing</span>
              <span className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Daily</span>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For (3 Paths) */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Built for Everyone in the Caribbean Economy</h2>
            <p className="text-muted-foreground">Whether you're looking, listing, or hiring, we've got you covered.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Customer Path */}
            <div className="group p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Customers</h3>
              <p className="text-muted-foreground mb-6">Find reliable local services, verified businesses, and top-rated professionals fast.</p>
              <Link href="/search" className="flex items-center text-sm font-bold text-primary hover:gap-2 transition-all">
                Browse Businesses <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Business Path */}
            <div className="group p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 bg-primary text-primary-foreground text-xs font-bold rounded-bl-xl">Most Popular</div>
              <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-xl flex items-center justify-center mb-6">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Businesses</h3>
              <p className="text-muted-foreground mb-6">Get discovered, receive leads, and access tools that increase your revenue.</p>
              <Link href="/add-listing" className="flex items-center text-sm font-bold text-primary hover:gap-2 transition-all">
                List Your Business <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Employer Path */}
            <div className="group p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg">
              <div className="w-12 h-12 bg-pink-500/10 text-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-3">Employers</h3>
              <p className="text-muted-foreground mb-6">Post jobs, find local talent, and build your dream team with ease.</p>
              <Link href="/add-listing" className="flex items-center text-sm font-bold text-primary hover:gap-2 transition-all">
                Post a Job <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Category Section */}
      <section className="py-20 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Explore our diverse marketplace covering every aspect of Caribbean living and business.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Business', icon: <Briefcase size={24} />, color: 'bg-blue-500/10 text-blue-500 hover:bg-blue-500 hover:text-white' },
              { label: 'Automotive', icon: <Car size={24} />, color: 'bg-orange-500/10 text-orange-500 hover:bg-orange-500 hover:text-white' },
              { label: 'Real Estate', icon: <Home size={24} />, color: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500 hover:text-white' },
              { label: 'Medical', icon: <HeartPulse size={24} />, color: 'bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white' },
              { label: 'Services', icon: <Wrench size={24} />, color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500 hover:text-white' },
              { label: 'Jobs', icon: <Briefcase size={24} />, color: 'bg-pink-500/10 text-pink-500 hover:bg-pink-500 hover:text-white' },
            ].map((cat) => (
              <Link
                key={cat.label}
                href={`/search?category=${cat.label.toLowerCase().replace(' ', '_')}`}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1 ${cat.color}`}
              >
                <div className="mb-3">{cat.icon}</div>
                <span className="font-semibold text-sm">{cat.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - List Your Business */}
      <section className="py-24 relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">List Your Business in Minutes</h2>
            <p className="text-xl opacity-90 mb-8">Join the fastest growing Caribbean directory. Reach thousands of customers, showcase your services, and grow your brand.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 fill-white/20" /> Create a professional profile</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 fill-white/20" /> Get discovered by local customers</li>
              <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 fill-white/20" /> Manage leads and analytics</li>
            </ul>
            <Link href="/add-listing" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg">
              Get Listed Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Visual or Graphic */}
          <div className="w-full md:w-96 aspect-square bg-white/10 rounded-3xl backdrop-blur-sm border border-white/20 p-8 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl font-bold mb-2">15k+</div>
              <div className="opacity-80">Active Listings</div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Directory Section */}
      <section className="py-24 bg-gradient-to-b from-secondary/20 to-secondary/40 border-y border-yellow-500/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-600 rounded-full text-xs font-bold mb-3 border border-yellow-500/20">
                <Star className="w-3 h-3 fill-current" /> PREMIER SELECTION
              </div>
              <h2 className="text-3xl font-bold mb-2 text-foreground">Featured Premium Listings</h2>
              <p className="text-muted-foreground">Top-rated businesses and verified partners.</p>
            </div>
            <Link href="/search?sort=premium" className="text-primary font-medium hover:text-primary/80 flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ThemeListingCard
              variant="premium"
              listing={{
                id: 1,
                title: "Ocean View Villa",
                image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop",
                logo: "https://placehold.co/100x100/orange/white?text=RE",
                category: { name: "Real Estate", icon: <Home size={14} />, color: "#10b981" },
                location: "Montego Bay, Jamaica",
                rating: 4.9,
                reviewCount: 24,
                verified: true,
                status: "Open",
                price: "$2.5M",
                infoFields: [
                  { icon: <Briefcase size={14} />, label: "Luxury Estate" },
                  { icon: <MapPin size={14} />, label: "Beachfront" }
                ]
              }}
            />
            <ThemeListingCard
              variant="premium"
              listing={{
                id: 2,
                title: "Elite Car Rentals",
                image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop",
                logo: "https://placehold.co/100x100/blue/white?text=CR",
                category: { name: "Automotive", icon: <Car size={14} />, color: "#3b82f6" },
                location: "Nassau, Bahamas",
                rating: 4.8,
                reviewCount: 156,
                verified: true,
                status: "Open",
                infoFields: [
                  { icon: <Phone size={14} />, label: "+1 (242) 555-0192" },
                  { icon: <Globe size={14} />, label: "elitecars.demo" }
                ]
              }}
            />
            <ThemeListingCard
              variant="premium"
              listing={{
                id: 3,
                title: "Senior Developer",
                image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop",
                logo: "https://placehold.co/100x100/purple/white?text=TC",
                category: { name: "Jobs", icon: <Briefcase size={14} />, color: "#d946ef" },
                location: "Bridgetown, Barbados",
                type: "job",
                status: "Hiring",
                price: "$80k/yr",
                infoFields: [
                  { icon: <Briefcase size={14} />, label: "Full-Time" },
                  { icon: <MapPin size={14} />, label: "Remote / Hybrid" }
                ]
              }}
            />
          </div>
        </div>
      </section>

      {/* Latest / Basic Listings Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8">Latest Additions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Basic Listing 1 */}
            <ThemeListingCard
              variant="basic"
              listing={{
                id: 101,
                title: "Island Coffee Roasters",
                image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2940&auto=format&fit=crop",
                category: { name: "Business", icon: <Briefcase size={14} />, color: "#3b82f6" },
                location: "Kingston, Jamaica",
                rating: 4.5,
                verified: false,
                status: "Open",
                infoFields: [
                  { icon: <MapPin size={14} />, label: "Downtown" }
                ]
              }}
            />
            {/* Basic Listing 2 */}
            <ThemeListingCard
              variant="basic"
              listing={{
                id: 102,
                title: "Sunset Boat Tours",
                image: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?q=80&w=2940&auto=format&fit=crop",
                category: { name: "Services", icon: <Wrench size={14} />, color: "#a855f7" },
                location: "Castries, St. Lucia",
                rating: 4.7,
                verified: true,
                status: "Open",
                infoFields: [
                  { icon: <Phone size={14} />, label: "Book Now" }
                ]
              }}
            />
            {/* Basic Listing 3 */}
            <ThemeListingCard
              variant="basic"
              listing={{
                id: 103,
                title: "Medical Specialist Center",
                image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2940&auto=format&fit=crop",
                category: { name: "Medical", icon: <HeartPulse size={14} />, color: "#ef4444" },
                location: "Georgetown, Guyana",
                verified: true,
                status: "Open",
                infoFields: [
                  { icon: <Phone size={14} />, label: "Urgent Care" }
                ]
              }}
            />
            {/* Basic Listing 4 */}
            <ThemeListingCard
              variant="basic"
              listing={{
                id: 104,
                title: "Tech Solutions Ltd",
                image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2940&auto=format&fit=crop",
                category: { name: "Business", icon: <Briefcase size={14} />, color: "#3b82f6" },
                location: "Port of Spain, Trinidad",
                verified: false,
                status: "Open",
              }}
            />
          </div>

          <div className="mt-12 text-center">
            <Link href="/search" className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border bg-card hover:bg-secondary transition-colors font-medium">
              Load More Listings <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 blur-[150px] rounded-full pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Simple, transparent pricing.</h2>
            <p className="text-xl text-gray-400">Start for free, upgrade as you grow.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="bg-card border border-border rounded-3xl p-8 relative shadow-sm">
              <h3 className="text-xl font-bold text-muted-foreground mb-2">Starter</h3>
              <div className="text-4xl font-bold text-foreground mb-6">$0 <span className="text-sm font-normal text-muted-foreground">/mo</span></div>
              <ul className="space-y-4 mb-8 text-muted-foreground">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-muted-foreground" /> 1 User Seat</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-muted-foreground" /> Basic Directory Listing</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-muted-foreground" /> Manual Quote Builder</li>
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold transition-colors">Start Free</Link>
            </div>

            {/* Pro Tier */}
            <div className="bg-[#161616] border border-orange-500/50 rounded-3xl p-8 relative shadow-2xl shadow-orange-500/10 transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">POPULAR</div>
              <h3 className="text-xl font-bold text-orange-400 mb-2">Growth</h3>
              <div className="text-4xl font-bold text-white mb-6">$49 <span className="text-sm font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8 text-gray-200">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500" /> 5 User Seats</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500" /> <strong>Embeddable Quote Widget</strong></li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500" /> Verified Badge</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-orange-500" /> Analytics Dashboard</li>
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold transition-colors">Get Started</Link>
            </div>

            {/* Enterprise Tier */}
            <div className="bg-card border border-border rounded-3xl p-8 relative shadow-sm">
              <h3 className="text-xl font-bold text-muted-foreground mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-foreground mb-6">Custom</div>
              <ul className="space-y-4 mb-8 text-muted-foreground">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-muted-foreground" /> Unlimited Seats</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-muted-foreground" /> API Access</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-muted-foreground" /> Custom Integrations (CRM)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-muted-foreground" /> Dedicated Support</li>
              </ul>
              <Link href="/contact" className="block w-full text-center py-3 rounded-xl bg-secondary hover:bg-secondary/80 text-foreground font-bold transition-colors">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <CBConnectLogo size="small" />
            <span className="font-semibold text-foreground">CB Connect</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2026 CB Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
