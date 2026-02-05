import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { ThemeDetailsPage } from '@/components/themes/MyListing/ThemeDetailsPage';
import { Home } from 'lucide-react';

export default async function RealEstateDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: business, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !business) {
        console.error("Error fetching property:", error);
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
                    <p className="text-muted-foreground">ID: {id}</p>
                </div>
            </div>
        );
    }

    const detailsProps = {
        id: business.id,
        title: business.name,
        tagline: business.industry,
        description: business.description || "No description available.",
        coverImage: business.cover_image || "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2942&auto=format&fit=crop",
        logo: business.logo,
        location: business.address,
        rating: 0,
        reviewCount: 0,
        verified: false,
        status: "For Sale",
        contact: {
            website: business.website_url,
        },
        category: { name: "Real Estate", icon: <Home size={14} />, color: "#10b981" },

        // Flexible Data
        propertyDetails: business.details?.propertyDetails,
        features: business.details?.features,
        gallery: business.details?.gallery,
    };

    return (
        <ThemeDetailsPage listing={detailsProps} theme="dark" />
    );
}
