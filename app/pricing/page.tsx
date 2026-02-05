'use server';

import React from 'react';
import { getPlans } from '@/app/actions/subscriptions';
import { PricingClientHelper } from './PricingClientHelper';
import { ThemeHeader } from '@/components/themes/MyListing/ThemeHeader';

export default async function PricingPage() {
    const plans = await getPlans();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            <ThemeHeader /> {/* Dynamic theme */}

            <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        Choose the Right Plan <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">For Your Ambitions</span>
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Whether you are a job seeker, a business, or an AI pioneer, we have a tailored tier for you.
                    </p>
                </div>

                <PricingClientHelper plans={plans} />
            </div>
        </div>
    );
}
