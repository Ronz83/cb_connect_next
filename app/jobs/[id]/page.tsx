import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import { ThemeDetailsPage } from '@/components/themes/MyListing/ThemeDetailsPage';
import { Briefcase } from 'lucide-react';

export default async function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: business, error } = await supabase
        .from('businesses')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !business) {
        console.error("Error fetching job:", error);
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
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
        coverImage: business.cover_image || "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop",
        logo: business.logo,
        location: business.address,
        rating: 0,
        reviewCount: 0,
        verified: false,
        status: "Hiring",
        contact: {
            website: business.website_url,
        },
        category: { name: "Jobs", icon: <Briefcase size={14} />, color: "#d946ef" },

        // Flexible Data
        jobDetails: business.details?.jobDetails,
        features: business.details?.features,
    };

    return (
        <ThemeDetailsPage listing={detailsProps} theme="dark" />
    );
}
