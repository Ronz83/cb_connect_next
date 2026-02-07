import React from 'react';
import { Search, Mic, Menu, ArrowRight, Briefcase, Car, Home, Phone, MapPin, Globe, Star, LayoutGrid, List, Gauge, Fuel, Palette, Calendar, Bed, Bath, Move, DollarSign, Clock } from 'lucide-react';

export const MOCK_COUNTRIES = [
    { code: 'AG', name: 'Antigua & Barbuda', flag: 'https://flagcdn.com/w40/ag.png' },
    { code: 'BS', name: 'Bahamas', flag: 'https://flagcdn.com/w40/bs.png' },
    { code: 'BB', name: 'Barbados', flag: 'https://flagcdn.com/w40/bb.png' },
    { code: 'BZ', name: 'Belize', flag: 'https://flagcdn.com/w40/bz.png' },
    { code: 'DM', name: 'Dominica', flag: 'https://flagcdn.com/w40/dm.png' },
    { code: 'GD', name: 'Grenada', flag: 'https://flagcdn.com/w40/gd.png' },
    { code: 'GY', name: 'Guyana', flag: 'https://flagcdn.com/w40/gy.png' },
    { code: 'HT', name: 'Haiti', flag: 'https://flagcdn.com/w40/ht.png' },
    { code: 'JM', name: 'Jamaica', flag: 'https://flagcdn.com/w40/jm.png' },
    { code: 'MS', name: 'Montserrat', flag: 'https://flagcdn.com/w40/ms.png' },
    { code: 'KN', name: 'St. Kitts & Nevis', flag: 'https://flagcdn.com/w40/kn.png' },
    { code: 'LC', name: 'St. Lucia', flag: 'https://flagcdn.com/w40/lc.png' },
    { code: 'VC', name: 'St. Vincent', flag: 'https://flagcdn.com/w40/vc.png' },
    { code: 'SR', name: 'Suriname', flag: 'https://flagcdn.com/w40/sr.png' },
    { code: 'TT', name: 'Trinidad & Tobago', flag: 'https://flagcdn.com/w40/tt.png' },
    { code: 'AI', name: 'Anguilla', flag: 'https://flagcdn.com/w40/ai.png' },
    { code: 'BM', name: 'Bermuda', flag: 'https://flagcdn.com/w40/bm.png' },
    { code: 'VG', name: 'British Virgin Is.', flag: 'https://flagcdn.com/w40/vg.png' },
    { code: 'KY', name: 'Cayman Islands', flag: 'https://flagcdn.com/w40/ky.png' },
    { code: 'TC', name: 'Turks & Caicos', flag: 'https://flagcdn.com/w40/tc.png' },
];

export const MOCK_LISTINGS = [
    {
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
        ],
        description: "Experience the epitome of luxury living in this stunning oceanfront villa...",
        gallery: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1600596542815-2a4d04774c13?q=80&w=2950&auto=format&fit=crop"
        ],
        features: ["Ocean View", "Private Pool", "Staff Quarters", "Gated Community"]
    },
    {
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
        ],
        description: "Premium car rental service offering the latest luxury vehicles...",
        gallery: [
            "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2940&auto=format&fit=crop"
        ],
        features: ["Luxury Fleet", "Chauffeur Service", "Airport Pickup"]
    },
    {
        id: 3,
        title: "Senior React Developer",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/purple/white?text=TC",
        category: { name: "Jobs", icon: <Briefcase size={14} />, color: "#d946ef" },
        location: "Bridgetown, Barbados",
        rating: 4.5,
        type: "job",
        status: "Hiring",
        price: "$80k/yr",
        infoFields: [
            { icon: <Briefcase size={14} />, label: "Full-Time" },
            { icon: <MapPin size={14} />, label: "Remote / Hybrid" }
        ],
        description: "We are seeking a talented Senior React Developer to join our team...",
        features: ["Remote Work", "Health Insurance", "Stock Options"]
    },
    {
        id: 4,
        title: "Island Spices & Grill",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/red/white?text=FOOD",
        category: { name: "Dining", icon: <Star size={14} />, color: "#ef4444" },
        location: "Kingston, Jamaica",
        rating: 4.7,
        reviewCount: 89,
        verified: true,
        status: "Closed",
        infoFields: [
            { icon: <Phone size={14} />, label: "+1 (876) 555-0199" },
            { icon: <MapPin size={14} />, label: "Downtown" }
        ],
        description: "Authentic Caribbean cuisine with a modern twist...",
        gallery: [
            "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2874&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2940&auto=format&fit=crop"
        ],
        features: ["Outdoor Seating", "Live Music", "Cocktail Bar"]
    },
    {
        id: 5,
        title: "Caribbean Tech Solutions",
        image: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=2874&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/cyan/white?text=IT",
        category: { name: "Services", icon: <Briefcase size={14} />, color: "#06b6d4" },
        location: "Port of Spain, Trinidad",
        rating: 4.9,
        reviewCount: 42,
        verified: true,
        status: "Open",
        infoFields: [
            { icon: <Phone size={14} />, label: "+1 (868) 555-0123" },
            { icon: <Globe size={14} />, label: "caribbeantech.co" }
        ],
        description: "Leading IT solutions provider in the Caribbean...",
        features: ["IT Support", "Cloud Migration", "Cybersecurity"]
    }
];

export const MOCK_CARS = [
    {
        id: 1,
        title: "2024 Toyota Land Cruiser 300",
        image: "https://images.unsplash.com/photo-1594502184342-2e12f877aa71?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/black/white?text=TOYOTA",
        category: { name: "SUV", icon: <Car size={14} />, color: "#ef4444" },
        location: "Kingston, Jamaica",
        rating: 5.0,
        reviewCount: 4,
        verified: true,
        status: "Sale",
        price: "$145,000",
        infoFields: [
            { icon: <Gauge size={14} />, label: "0 mi" },
            { icon: <Fuel size={14} />, label: "Diesel" }
        ],
        description: "The all-new Land Cruiser 300 lays claim to the throne...",
        gallery: [
            "https://images.unsplash.com/photo-1594502184342-2e12f877aa71?q=80&w=2940&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=2942&auto=format&fit=crop"
        ],
        features: ["4WD", "Diesel Engine", "Leather Seats", "Sunroof"],
        specs: {
            engine: "3.3L V6 Twin Turbo Diesel",
            transmission: "10-speed Automatic",
            drivetrain: "4WD",
            color: "White Pearl",
            year: "2024",
            condition: "New"
        }
    },
    {
        id: 2,
        title: "Honda Civic Type R",
        image: "https://images.unsplash.com/photo-1605393667624-4f51fa4728d8?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/red/white?text=HONDA",
        category: { name: "Sports", icon: <Car size={14} />, color: "#f97316" },
        location: "Bridgetown, Barbados",
        rating: 4.8,
        reviewCount: 12,
        verified: true,
        status: "Sale",
        price: "$55,000",
        infoFields: [
            { icon: <Gauge size={14} />, label: "5,200 mi" },
            { icon: <Palette size={14} />, label: "Rally Red" }
        ],
        description: "The ultimate hot hatch...",
        features: ["Turbocharged", "Manual Transmission", "Sport Mode"],
        specs: {
            engine: "2.0L Turbocharged Inline-4",
            transmission: "6-speed Manual",
            drivetrain: "FWD",
            color: "Rallye Red",
            year: "2023",
            condition: "Used"
        }
    },
    {
        id: 3,
        title: "Suzuki Jimny 5-Door",
        image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/green/white?text=SZK",
        category: { name: "Compact SUV", icon: <Car size={14} />, color: "#84cc16" },
        location: "Port of Spain, Trinidad",
        rating: 4.6,
        reviewCount: 28,
        verified: true,
        status: "Rent",
        price: "$65 / day",
        infoFields: [
            { icon: <Calendar size={14} />, label: "Available Now" },
            { icon: <Fuel size={14} />, label: "Petrol" }
        ],
        description: "Compact off-roader capable of going anywhere...",
        features: ["4x4", "Compact", "Fuel Efficient"],
        specs: {
            engine: "1.5L Inline-4",
            transmission: "4-speed Automatic",
            drivetrain: "4WD",
            color: "Jungle Green",
            year: "2023",
            condition: "New"
        }
    },
    {
        id: 4,
        title: "Tesla Model 3 Long Range",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2942&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/gray/white?text=TESLA",
        category: { name: "Electric", icon: <Car size={14} />, color: "#3b82f6" },
        location: "George Town, Cayman",
        rating: 4.9,
        reviewCount: 15,
        verified: true,
        status: "Sale",
        price: "$48,000",
        infoFields: [
            { icon: <Gauge size={14} />, label: "12,000 mi" },
            { icon: <Fuel size={14} />, label: "Electric" }
        ],
        description: "Experience the future of driving with the Tesla Model 3...",
        features: ["Autopilot", "Long Range Battery", "Premium Sound"],
        specs: {
            engine: "Dual Motor Electric",
            transmission: "1-speed Automatic",
            drivetrain: "AWD",
            color: "Midnight Silver",
            year: "2022",
            condition: "Used"
        }
    },
    {
        id: 5,
        title: "Toyota Hilux",
        image: "https://images.unsplash.com/photo-1609520505218-7421dad181d8?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/black/white?text=TOYOTA",
        category: { name: "Truck", icon: <Car size={14} />, color: "#6b7280" },
        location: "Georgetown, Guyana",
        rating: 4.7,
        reviewCount: 9,
        verified: true,
        status: "Rent",
        price: "$120 / day",
        infoFields: [
            { icon: <Gauge size={14} />, label: "Unlimited mi" },
            { icon: <Fuel size={14} />, label: "Diesel" }
        ],
        description: "The indestructible pickup truck...",
        features: ["Towing Capacity", "Off-road Tires", "Cargo Bed"],
        specs: {
            engine: "2.8L Turbo Diesel",
            transmission: "6-speed Manual",
            drivetrain: "4WD",
            color: "Super White",
            year: "2023",
            condition: "Rental Fleet"
        }
    },
    {
        id: 6,
        title: "BMW X5 xDrive",
        image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2874&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/blue/white?text=BMW",
        category: { name: "Luxury SUV", icon: <Car size={14} />, color: "#2563eb" },
        location: "Nassau, Bahamas",
        rating: 4.9,
        verified: true,
        status: "Sale",
        price: "$85,000",
        infoFields: [
            { icon: <Gauge size={14} />, label: "15,400 mi" },
            { icon: <Palette size={14} />, label: "Alpine White" }
        ],
        description: "Luxury meets performance in the BMW X5...",
        features: ["Leather Interior", "Navigation System", "Heated Seats"],
        specs: {
            engine: "3.0L Inline-6 Turbo",
            transmission: "8-speed Sport Automatic",
            drivetrain: "AWD",
            color: "Alpine White",
            year: "2023",
            condition: "Used"
        }
    }
];

export const MOCK_PROPERTIES = [
    {
        id: 1,
        title: "Sunset Villa Estate",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/orange/white?text=RE",
        category: { name: "Villa", icon: <Home size={14} />, color: "#10b981" },
        location: "Montego Bay, Jamaica",
        rating: 4.9,
        verified: true,
        status: "Sale",
        price: "$2,500,000",
        infoFields: [
            { icon: <Bed size={14} />, label: "5 Beds" },
            { icon: <Bath size={14} />, label: "6 Baths" }
        ],
        description: "Spectacular oceanfront villa with stunning sunset views...",
        gallery: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop"
        ],
        features: ["Pool", "Beach Access", "Gated"],
        propertyDetails: {
            yearBuilt: "2018",
            lotSize: "0.75 Acres",
            sqFt: "6,500",
            hoaFees: "$500/mo",
            type: "Single Family"
        }
    },
    {
        id: 2,
        title: "Modern Condo at The Gap",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/blue/white?text=SEA",
        category: { name: "Condo", icon: <Home size={14} />, color: "#3b82f6" },
        location: "St. Lawrence Gap, Barbados",
        rating: 4.7,
        verified: true,
        status: "Rent",
        price: "$3,500 / mo",
        infoFields: [
            { icon: <Bed size={14} />, label: "2 Beds" },
            { icon: <Move size={14} />, label: "1,200 sqft" }
        ],
        description: "Contemporary condo in the heart of the action...",
        features: ["Balcony", "Gym", "Parking"],
        propertyDetails: {
            yearBuilt: "2021",
            lotSize: "N/A",
            sqFt: "1,200",
            hoaFees: "Included",
            type: "Condominium"
        }
    },
    {
        id: 3,
        title: "Beachfront Land",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2936&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/green/white?text=LAND",
        category: { name: "Land", icon: <Home size={14} />, color: "#84cc16" },
        location: "Exuma, Bahamas",
        rating: 5.0,
        verified: true,
        status: "Sale",
        price: "$850,000",
        infoFields: [
            { icon: <Move size={14} />, label: "2.5 Acres" },
            { icon: <MapPin size={14} />, label: "Ocean View" }
        ],
        description: "Prime beachfront land ready for development...",
        features: ["Beachfront", "Utilities Available"],
        propertyDetails: {
            yearBuilt: "N/A",
            lotSize: "2.5 Acres",
            sqFt: "N/A",
            hoaFees: "N/A",
            type: "Land"
        }
    },
    {
        id: 4,
        title: "Downtown Commercial Space",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2938&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/purple/white?text=BIZ",
        category: { name: "Commercial", icon: <Home size={14} />, color: "#d946ef" },
        location: "Port of Spain, Trinidad",
        rating: 4.5,
        verified: true,
        status: "Rent",
        price: "$5,000 / mo",
        infoFields: [
            { icon: <Move size={14} />, label: "3,000 sqft" },
            { icon: <MapPin size={14} />, label: "City Center" }
        ],
        description: "Ideally located commercial space...",
        features: ["Open Plan", "Renovated", "Elevator"],
        propertyDetails: {
            yearBuilt: "2005",
            lotSize: "N/A",
            sqFt: "3,000",
            hoaFees: "$800/mo",
            type: "Commercial"
        }
    },
    {
        id: 5,
        title: "Hilltop Mansion",
        image: "https://images.unsplash.com/photo-1600596542815-2a4d04774c13?q=80&w=2950&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/orange/white?text=LUX",
        category: { name: "Estate", icon: <Home size={14} />, color: "#f59e0b" },
        location: "St. Thomas, USVI",
        rating: 4.9,
        verified: true,
        status: "Sale",
        price: "$6,200,000",
        infoFields: [
            { icon: <Bed size={14} />, label: "8 Beds" },
            { icon: <Bath size={14} />, label: "10 Baths" }
        ],
        description: "Opulent hilltop estate with panoramic views...",
        gallery: [
            "https://images.unsplash.com/photo-1600596542815-2a4d04774c13?q=80&w=2950&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1512914890251-2f96a93217cb?q=80&w=2942&auto=format&fit=crop"
        ],
        features: ["Home Theater", "Wine Cellar", "Infinity Pool", "Guest House"],
        propertyDetails: {
            yearBuilt: "2010",
            lotSize: "2.1 Acres",
            sqFt: "12,000",
            hoaFees: "$1,200/mo",
            type: "Hiltop Estate"
        }
    }
];

export const MOCK_JOBS = [
    {
        id: 1,
        title: "Senior Full Stack Engineer",
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/purple/white?text=TECH",
        category: { name: "Technology", icon: <Briefcase size={14} />, color: "#d946ef" },
        location: "Bridgetown, Barbados",
        rating: 4.8,
        type: "job",
        status: "Hiring",
        price: "$80k - $120k",
        infoFields: [
            { icon: <Clock size={14} />, label: "Full-time" },
            { icon: <MapPin size={14} />, label: "Remote" }
        ],
        description: "Join our dynamic team building the future of Caribbean tech...",
        features: ["Medical Insurance", "Remote Options", "Learning Budget"],
        jobDetails: {
            salary: "$80,000 - $120,000 / yr",
            type: "Full-time",
            department: "Engineering",
            posted: "2 days ago",
            remote: true
        }
    },
    {
        id: 3,
        title: "Marketing Manager",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/red/white?text=MKT",
        category: { name: "Marketing", icon: <Briefcase size={14} />, color: "#ef4444" },
        location: "Kingston, Jamaica",
        rating: 4.5,
        type: "job",
        status: "Urgent",
        price: "$50k - $70k",
        infoFields: [
            { icon: <Clock size={14} />, label: "Full-time" },
            { icon: <MapPin size={14} />, label: "On-site" }
        ],
        description: "Lead our marketing efforts and drive growth...",
        features: ["Performance Bonus", "Travel Allowance"],
        jobDetails: {
            salary: "$50,000 - $70,000 / yr",
            type: "Full-time",
            department: "Marketing",
            posted: "1 weeks ago",
            remote: false
        }
    },
    {
        id: 2,
        title: "Hotel General Manager",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/blue/white?text=RESORT",
        category: { name: "Hospitality", icon: <Briefcase size={14} />, color: "#3b82f6" },
        location: "Nassau, Bahamas",
        rating: 5.0,
        type: "job",
        status: "Hiring",
        price: "$90k+",
        infoFields: [
            { icon: <Clock size={14} />, label: "Contract" },
            { icon: <Briefcase size={14} />, label: "Manager" }
        ],
        description: "Experienced GM needed for a 5-star resort...",
        features: ["Housing Provided", "Relocation Support", "Executive Benefits"],
        jobDetails: {
            salary: "$90,000+ / yr",
            type: "Contract",
            department: "Management",
            posted: "3 days ago",
            remote: false
        }
    },
    {
        id: 4,
        title: "Construction Project Lead",
        image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2940&auto=format&fit=crop",
        logo: "https://placehold.co/100x100/orange/white?text=BUILD",
        category: { name: "Construction", icon: <Briefcase size={14} />, color: "#f97316" },
        location: "Georgetown, Guyana",
        rating: 4.6,
        type: "job",
        status: "Hiring",
        price: "$75k / yr",
        infoFields: [
            { icon: <Clock size={14} />, label: "Full-time" },
            { icon: <MapPin size={14} />, label: "On-site" }
        ],
        description: "Oversee major infrastructure projects...",
        features: ["Vehicle Provided", "Project Bonuses"],
        jobDetails: {
            salary: "$75,000 / yr",
            type: "Full-time",
            department: "Operations",
            posted: "5 days ago",
            remote: false
        }
    }
];
