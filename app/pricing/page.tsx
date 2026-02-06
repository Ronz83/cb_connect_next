'use server';

import React from 'react';
import { getPlans } from '@/app/actions/subscriptions';
import { PricingClientHelper } from './PricingClientHelper';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';

import { PageHero } from '@/components/PageHero';



export default async function PricingPage() {
    const plans = await getPlans();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <ThemeHeader /> {/* Dynamic theme */}

            <PageHero
                title="Choose Your Growth Path"
                subtitle="Whether you are a job seeker, a business, or an AI pioneer, we have a tailored tier for you."
                backgroundImage="https://images.unsplash.com/photo-1559825481-12a05cc00018?q=80&w=2800&auto=format&fit=crop"
            />

            <div className="pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Content below hero */}

                <PricingClientHelper plans={plans} />
            </div>
        </div>
    );
}
