'use client';

import React, { useState } from 'react';
import { Check, Zap, Briefcase, User, Bot, Star } from 'lucide-react';
import { subscribeToPlan } from '@/app/actions/subscriptions';

interface Plan {
    id: string;
    name: string;
    type: string;
    price: number;
    interval: string;
    description: string;
    features: string[];
}

export function PricingClientHelper({ plans }: { plans: Plan[] }) {
    const [billing, setBilling] = useState<'month' | 'year'>('month');
    const [activeTab, setActiveTab] = useState<'main' | 'job_board' | 'registry' | 'ai_suite'>('main');
    const [loading, setLoading] = useState<string | null>(null);

    // Group plans
    const filteredPlans = plans.filter(p => {
        // Filter by tab type
        if (p.type !== activeTab) return false;

        // Filter by billing interval (always show one_time if relevant, or handle logic)
        // Main/Job/Registry/AI have explicit month/year variants in seed.
        if (p.interval === 'one_time') return true;
        return p.interval === billing;
    });

    const categories = [
        { id: 'main', label: 'Business Visibility', icon: Star },
        { id: 'job_board', label: 'Job Board', icon: Briefcase },
        { id: 'registry', label: 'Candidate Registry', icon: User },
        { id: 'ai_suite', label: 'AI Business Suite', icon: Bot },
    ];

    const handleSubscribe = async (planId: string) => {
        if (!confirm('Proceed with simulation upgrade?')) return;
        setLoading(planId);
        const res = await subscribeToPlan(planId);
        setLoading(null);
        alert(res.message);
    };

    return (
        <div>
            {/* TABS */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setActiveTab(cat.id as any)}
                        className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${activeTab === cat.id
                                ? 'bg-foreground text-background shadow-lg scale-105'
                                : 'bg-card border border-border text-muted-foreground hover:bg-secondary'
                            }`}
                    >
                        <cat.icon size={18} />
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* BILLING TOGGLE */}
            <div className="flex justify-center mb-12">
                <div className="bg-secondary p-1 rounded-full flex items-center gap-1">
                    <button
                        onClick={() => setBilling('month')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billing === 'month' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBilling('year')}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${billing === 'year' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        Yearly <span className="text-xs text-green-500 ml-1">-15%</span>
                    </button>
                </div>
            </div>

            {/* CARDS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {filteredPlans.map((plan) => (
                    <div
                        key={plan.id}
                        className={`relative flex flex-col p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${plan.price > 100 ? 'bg-gradient-to-br from-card to-secondary/30 border-blue-500/20 shadow-lg shadow-blue-500/5' : 'bg-card border-border'
                            }`}
                    >
                        {plan.price > 100 && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                Recommended
                            </div>
                        )}

                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                            <p className="text-sm text-muted-foreground h-10">{plan.description}</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-extrabold text-foreground">${plan.price}</span>
                                <span className="text-muted-foreground">/{plan.interval === 'one_time' ? 'post' : 'mo'}</span>
                            </div>
                            {billing === 'year' && plan.interval === 'year' && (
                                <div className="text-xs text-green-500 font-bold mt-2">Billed yearly</div>
                            )}
                        </div>

                        <div className="flex-1 space-y-4 mb-8">
                            {plan.features?.map((feature, i) => (
                                <div key={i} className="flex items-start gap-3">
                                    <div className="p-1 rounded-full bg-green-500/10 text-green-500 mt-0.5">
                                        <Check size={12} />
                                    </div>
                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <button
                            onClick={() => handleSubscribe(plan.id)}
                            disabled={loading === plan.id}
                            className={`w-full py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${loading === plan.id ? 'opacity-75 cursor-not-allowed' : ''
                                } ${plan.price === 0
                                    ? 'bg-secondary text-foreground hover:bg-secondary/80'
                                    : 'bg-foreground text-background hover:opacity-90 shadow-lg'
                                }`}
                        >
                            {loading === plan.id ? (
                                'Processing...'
                            ) : (
                                <>
                                    {plan.price === 0 ? 'Get Started' : 'Subscribe Now'}
                                    <Zap size={16} className={plan.price === 0 ? 'hidden' : ''} />
                                </>
                            )}
                        </button>
                    </div>
                ))}

                {filteredPlans.length === 0 && (
                    <div className="col-span-full text-center py-20 text-muted-foreground">
                        No plans available for this category/interval.
                    </div>
                )}
            </div>
        </div>
    );
}
