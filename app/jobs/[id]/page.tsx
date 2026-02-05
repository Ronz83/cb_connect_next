'use client';

import React from 'react';
import { notFound, useParams } from 'next/navigation';
import { ThemeDetailsPage } from '@/components/themes/MyListing/ThemeDetailsPage';
import { MOCK_JOBS } from '@/data/mock-data';

export default function JobDetailsPage() {
    const params = useParams();
    const id = Number(params?.id);

    const job = MOCK_JOBS.find((j) => j.id === id);

    if (!job) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Job Not Found</h1>
                    <p className="text-gray-400">ID: {id}</p>
                </div>
            </div>
        );
    }

    const detailsProps = {
        ...job,
        coverImage: job.image,
        description: job.description || "Detailed description coming soon.",
    };

    return (
        <ThemeDetailsPage listing={detailsProps} theme="dark" />
    );
}
