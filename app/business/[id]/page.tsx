'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { ThemeDetailsPage } from '@/components/themes/MyListing/ThemeDetailsPage';
import { MOCK_LISTINGS } from '@/data/mock-data';

export default function BusinessDetailsPage() {
    const params = useParams();
    const id = Number(params?.id);

    // Find the business in mock data
    const business = MOCK_LISTINGS.find((b) => b.id === id);

    if (!business) {
        // In a real app we'd trigger notFound(), but for this mock setup let's just show a message or fallback
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Business Not Found</h1>
                    <p className="text-muted-foreground">The business you are looking for (ID: {id}) does not exist in our demo data.</p>
                </div>
            </div>
        );
    }

    // Adapt Listing mock data to DetailsProps if necessary (they are mostly compatible in our mock setup)
    // We might need to add/ensure properties like 'coverImage' exist.
    const detailsProps = {
        ...business,
        // Ensure required props for ThemeDetailsPage are present if missing in listing
        coverImage: business.image, // Reuse main image as cover if specific cover missing
        description: business.description || "No description available for this business.",
    };

    return (
        <ThemeDetailsPage listing={detailsProps} />
    );
}
