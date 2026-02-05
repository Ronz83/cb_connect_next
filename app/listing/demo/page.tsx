'use client';

import React from 'react';
import { ThemeDetailsPage } from '@/components/themes/MyListing/ThemeDetailsPage';
import { Home, Briefcase, Star, Wifi, Coffee, Car, Utensils, Dumbbell } from 'lucide-react';

const DEMO_LISTING = {
    id: 999,
    title: "Grand Caribbean Resort & Spa",
    tagline: "Experience luxury living in the heart of paradise.",
    description: "Welcome to the Grand Caribbean Resort & Spa, where luxury meets island tranquility. Nestled on the pristine white sands of Montego Bay, our 5-star resort offers an unparalleled escape. Enjoy world-class dining, a rejuvenating spa, and breathtaking ocean views from every suite. Whether you are here for a romantic getaway or a family adventure, our dedicated staff is committed to making your stay unforgettable.",
    coverImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2940&auto=format&fit=crop",
    logo: "https://placehold.co/200x200/gold/white?text=GCR",
    category: { name: "Resort", icon: <Home size={14} />, color: "#eab308" },
    location: "Rose Hall, Montego Bay, Jamaica",
    rating: 4.9,
    reviewCount: 124,
    verified: true,
    status: "Open",
    price: "$450 / night",
    gallery: [
        "https://images.unsplash.com/photo-1571896349842-6e53ce41e86a?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=2825&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1621293954908-3071e358c261?q=80&w=2940&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2940&auto=format&fit=crop"
    ],
    features: [
        "Free High-Speed Wifi",
        "Ocean View Suites",
        "Infinity Pool",
        "World-Class Spa",
        "Fine Dining Restaurants",
        "Private Beach Access",
        "24/7 Concierge",
        "Fitness Center"
    ],
    contact: {
        phone: "+1 (876) 999-0000",
        email: "reservations@grandcaribbean.demo",
        website: "www.grandcaribbean.demo"
    },
    hours: "Open 24/7"
};

export default function DemoListingPage() {
    return (
        <ThemeDetailsPage listing={DEMO_LISTING} theme="dark" />
    );
}
