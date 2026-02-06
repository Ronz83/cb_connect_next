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

      {/* Job Board Preview */}
      <section className="py-20 bg-secondary/20 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Find Opportunities Across the Caribbean</h2>
              <p className="text-muted-foreground">Jobs that create daily returning traffic.</p>
            </div>
            <Link href="/jobs" className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors inline-block text-center">
              View All Jobs
            </Link>
          </div>

          <div className="grid gap-4">
            {[
              { role: 'Customer Service Rep', company: 'Island Telecom', location: 'Barbados', type: 'Full-time', ago: '2h ago' },
              { role: 'Sales Manager', company: 'Carib Brewery', location: 'Jamaica', type: 'Full-time', ago: '5h ago' },
              { role: 'Remote Designer', company: 'Creative Digital', location: 'Caribbean-wide', type: 'Contract', ago: '1d ago' },
              { role: 'Head Chef', company: 'Royal Resorts', location: 'St. Lucia', type: 'Full-time', ago: '2d ago' },
            ].map((job, i) => (
              <div key={i} className="group flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-xl font-bold text-muted-foreground">
                    {job.company[0]}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{job.role}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{job.company}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-4">
                  <span className="px-3 py-1 rounded-full bg-secondary text-xs font-medium">{job.type}</span>
                  <span className="text-sm text-muted-foreground">{job.ago}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SaaS / Growth Tools */}
      <section className="py-24 relative overflow-hidden bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-primary font-bold tracking-wider text-xs uppercase mb-2 block">Monetization & Growth</span>
            <h2 className="text-4xl font-bold mb-4">Tools That Help Your Business Grow 24/7</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Automate your operations with our integrated suite of tools.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'CRM & Pipeline', desc: 'Track every lead', icon: <BarChart3 className="w-6 h-6" />, color: 'bg-blue-500' },
              { title: 'Automation', desc: 'Follow up automatically', icon: <Zap className="w-6 h-6" />, color: 'bg-yellow-500' },
              { title: 'Website & Funnels', desc: 'Convert visitors', icon: <LayoutDashboard className="w-6 h-6" />, color: 'bg-purple-500' },
              { title: 'Booking System', desc: 'Schedule instantly', icon: <PlayCircle className="w-6 h-6" />, color: 'bg-green-500' },
            ].map((tool, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card hover:translate-y-[-4px] transition-transform duration-300">
                <div className={`w-12 h-12 rounded-xl ${tool.color} bg-opacity-10 flex items-center justify-center mb-4 text-${tool.color.split('-')[1]}-500`}>
                  {tool.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground">{tool.desc}</p>
              </div>
            ))}
          </div>

          {/* Dashboard Preview Mockup */}
          <div className="mt-16 rounded-3xl border border-border bg-card shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="p-8 md:p-12 text-center relative z-20">
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-background/80 backdrop-blur border border-border shadow-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-sm font-medium">Analytics Dashboard Live</span>
              </div>
              {/* Placeholder for complex dashboard image - using CSS/Divs for structure if no image */}
              <div className="w-full aspect-[16/9] bg-secondary/50 rounded-xl border border-dashed border-border flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Interactive Revenue Dashboard Mockup</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-20 bg-secondary/10 border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground">Real results from Caribbean businesses.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { role: 'Local Plumber', result: '3x', metric: 'More Calls', desc: 'Optimized profile & verified badge.' },
              { role: 'Boutique Hotel', result: '40%', metric: 'More Bookings', desc: 'Used our automated booking tool.' },
              { role: 'Recruiter', result: '5', metric: 'Jobs Filled', desc: 'In just 2 weeks using job board.' },
            ].map((story, i) => (
              <div key={i} className="bg-card p-8 rounded-2xl border border-border text-center shadow-lg hover:shadow-xl transition-all">
                <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">{story.role}</div>
                <div className="text-5xl font-extrabold text-foreground mb-2">{story.result}</div>
                <div className="text-xl font-bold text-muted-foreground mb-4">{story.metric}</div>
                <p className="text-sm opacity-80">{story.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Island / Country Selector */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Find Businesses in Your Island</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Barbados', 'Trinidad & Tobago', 'Jamaica', 'Guyana', 'St. Lucia', 'Bahamas', 'Antigua', 'Grenada'].map((island) => (
              <Link
                key={island}
                href={`/search?location=${island.replace(' ', '+')}`}
                className="px-6 py-3 rounded-xl border border-border hover:border-primary hover:bg-primary/5 hover:text-primary transition-all font-medium text-lg"
              >
                {island}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to Grow Your Business?</h2>
          <p className="text-xl opacity-90 mb-12 max-w-2xl mx-auto">Join the Caribbean's fastest growing digital economy today.</p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/add-listing" className="w-full md:w-auto px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
              List Your Business
            </Link>
            <Link href="/add-listing" className="w-full md:w-auto px-8 py-4 bg-primary-foreground/10 border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
              Post a Job
            </Link>
            <Link href="/search" className="w-full md:w-auto px-8 py-4 text-white font-medium hover:underline opacity-80 hover:opacity-100">
              Explore Directory
            </Link>
          </div>
        </div>
      </section>

      {/* Footer (Simplified for Page) */}
      <footer className="py-16 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12">
          <div className="col-span-2 lg:col-span-2">
            <CBConnectLogo />
            <p className="mt-6 text-muted-foreground max-w-xs">
              The trusted platform for Caribbean businesses, jobs, and growth tools.
            </p>
            <div className="flex gap-4 mt-6">
              {/* Social Placeholders */}
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors cursor-pointer"><Globe size={18} /></div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Directory</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="/search" className="hover:text-primary">All Categories</Link></li>
              <li><Link href="/search?sort=popular" className="hover:text-primary">Popular Businesses</Link></li>
              <li><Link href="/search?verified=true" className="hover:text-primary">Verified Listings</Link></li>
              <li><Link href="/search?sort=newest" className="hover:text-primary">New Additions</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Growth Tools</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Post a Job</Link></li>
              <li><Link href="#" className="hover:text-primary">SaaS Dashboard</Link></li>
              <li><Link href="#" className="hover:text-primary">Pricing Plans</Link></li>
              <li><Link href="#" className="hover:text-primary">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Partner Program</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Caricom Business Directory. All rights reserved.</p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Terms</Link>
            <Link href="#" className="hover:text-foreground">Sitemap</Link>
          </div>
        </div>
      </footer>
    </div >
  );
}
