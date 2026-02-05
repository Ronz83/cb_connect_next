'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { ThemeDetailsPage } from '@/components/themes/MyListing/ThemeDetailsPage';
import { MOCK_PROPERTIES } from '@/data/mock-data';

export default function RealEstateDetailsPage() {
    const params = useParams();
    const id = Number(params?.id);

    const property = MOCK_PROPERTIES.find((p) => p.id === id);

    if (!property) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
                    <p className="text-gray-400">ID: {id}</p>
                </div>
            </div>
        );
    }

    const detailsProps = {
        ...property,
        coverImage: property.image,
        description: property.description || "Detailed description coming soon.",
    };

    return (
        <ThemeDetailsPage listing={detailsProps} theme="dark" />
    );
}
