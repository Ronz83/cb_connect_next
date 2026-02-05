import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { ThemeDetailsPage } from '@/components/themes/MyListing/ThemeDetailsPage';
import { Car } from 'lucide-react';

export default async function AutoDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: business, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !business) {
        console.error("Error fetching business:", error);
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
                    <p className="text-muted-foreground">ID: {id}</p>
                </div>
            </div>
        );
    }

    // Map Supabase data to DetailsProps
    const detailsProps = {
        id: business.id,
        title: business.name,
        tagline: business.industry, // Fallback
        description: business.description || "No description available.",
        coverImage: business.cover_image || "https://images.unsplash.com/photo-1594502184342-2e12f877aa71?q=80&w=2940&auto=format&fit=crop", // Fallback image
        logo: business.logo,
        location: business.address,
        rating: 0, // Not in DB yet
        reviewCount: 0,
        verified: false, // Could add verify_status column later
        status: "Open",
        contact: {
            website: business.website_url,
            // phone and email not in base table yet, likely in details or need column
        },
        category: { name: "Automotive", icon: <Car size={14} />, color: "#3b82f6" }, // Hardcoded for 'autos' path

        // Flexible Data from JSONB
        specs: business.details?.specs,
        features: business.details?.features,
        gallery: business.details?.gallery,
    };

    return (
        <ThemeDetailsPage listing={detailsProps} theme="dark" />
    );
}
