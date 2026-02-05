'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { ThemeDetailsPage } from '@/components/themes/MyListing/ThemeDetailsPage';
import { MOCK_CARS } from '@/data/mock-data';

export default function AutoDetailsPage() {
    const params = useParams();
    const id = Number(params?.id);

    const car = MOCK_CARS.find((c) => c.id === id);

    if (!car) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Car Not Found</h1>
                    <p className="text-gray-400">ID: {id}</p>
                </div>
            </div>
        );
    }

    const detailsProps = {
        ...car,
        coverImage: car.image,
        description: car.description || "Detailed description coming soon.",
    };

    return (
        <ThemeDetailsPage listing={detailsProps} theme="dark" />
    );
}
