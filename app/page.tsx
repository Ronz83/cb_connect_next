'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight, CheckCircle2, Star, Zap, LayoutDashboard, ShieldCheck, PlayCircle, Briefcase, Car, Phone, Home, MapPin, CheckCircle, Globe, BarChart3 } from 'lucide-react';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { AuthButton } from '@/components/auth/AuthButton';
import { ThemeHeroSearch } from '@/components/themes/MyListing/ThemeHeroSearch';
import { ThemeListingCard } from '@/components/themes/MyListing/ThemeListingCard';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500/30">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CBConnectLogo size="small" animated />
            <span className="font-bold text-lg tracking-tight">CB Connect</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/search" className="hover:text-white transition-colors">Directory</Link>
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Log in</Link>
            <Link href="/signup" className="hidden sm:flex bg-orange-600 hover:bg-orange-500 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-orange-600/20">
              Start Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#050505]">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[#050505]">
          <div className="absolute top-0 -left-10 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 -right-10 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[128px]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 animate-fade-in-up backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-gray-300">Live in 15+ Caribbean Countries</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 animate-fade-in-up delay-100 leading-tight">
            Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Caribbean</span> <br /> Like Never Before.
          </h1>

          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
            Find top-rated businesses, properties, cars, and jobs across the islands. <br /> The directory built for growth.
          </p>

          <div className="animate-fade-in-up delay-300">
            <ThemeHeroSearch />
          </div>
        </div>
      </section>

      {/* Featured Listings Grid */}
      <section id="features" className="py-24 bg-[#0A0A0A] border-y border-[#1F1F1F]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Listings</h2>
              <p className="text-gray-400">Hand-picked highlights from the directory.</p>
            </div>
            <Link href="/search" className="text-orange-500 font-medium hover:text-orange-400 flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mock Data for Theme Integration Preview */}
            <ThemeListingCard
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
            <div className="bg-[#111] border border-[#222] rounded-3xl p-8 relative">
              <h3 className="text-xl font-bold text-gray-400 mb-2">Starter</h3>
              <div className="text-4xl font-bold text-white mb-6">$0 <span className="text-sm font-normal text-gray-500">/mo</span></div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> 1 User Seat</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> Basic Directory Listing</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> Manual Quote Builder</li>
              </ul>
              <Link href="/signup" className="block w-full text-center py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors">Start Free</Link>
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
            <div className="bg-[#111] border border-[#222] rounded-3xl p-8 relative">
              <h3 className="text-xl font-bold text-gray-400 mb-2">Enterprise</h3>
              <div className="text-4xl font-bold text-white mb-6">Custom</div>
              <ul className="space-y-4 mb-8 text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> Unlimited Seats</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> API Access</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> Custom Integrations (CRM)</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-gray-500" /> Dedicated Support</li>
              </ul>
              <Link href="/contact" className="block w-full text-center py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition-colors">Contact Sales</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#050505] border-t border-[#1F1F1F] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 opacity-50">
            <CBConnectLogo size="small" />
            <span className="font-semibold">CB Connect</span>
          </div>
          <div className="text-sm text-gray-500">
            © 2026 CB Connect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
