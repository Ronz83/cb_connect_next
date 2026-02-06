import React from 'react';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { CheckCircle2, XCircle, Save, ShieldCheck, Zap, BarChart3, LayoutDashboard, Globe, Lock } from 'lucide-react';
import Link from 'next/link';
import { PageHero } from '@/components/PageHero';

export default function AdminPlansPage() {
    // Mock Data for Features and Plans config
    const features = [
        { id: 'verified', name: 'Verified Badge', icon: <ShieldCheck className="w-4 h-4" /> },
        { id: 'analytics', name: 'Analytics Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
        { id: 'booking', name: 'Booking System', icon: <Zap className="w-4 h-4" /> },
        { id: 'jobs', name: 'Job Posting', icon: <LayoutDashboard className="w-4 h-4" /> },
        { id: 'gallery', name: 'Photo Gallery', icon: <Globe className="w-4 h-4" /> },
        { id: 'priority', name: 'Priority Support', icon: <CheckCircle2 className="w-4 h-4" /> },
    ];

    const plans = [
        { name: 'Basic', price: 'Free', color: 'bg-slate-100 dark:bg-slate-800' },
        { name: 'Standard', price: '$29/mo', color: 'bg-primary/10' },
        { name: 'Premium', price: '$99/mo', color: 'bg-accent/10' },
    ];

    // Mock State (In a real app, this would come from DB)
    // true = enabled, false = disabled
    const config = {
        verified: [false, true, true],
        analytics: [false, false, true],
        booking: [false, true, true],
        jobs: [false, false, true],
        gallery: [true, true, true],
        priority: [false, true, true],
    };

    return (
        <div className="min-h-screen bg-background">
            <PageHero
                title="Admin Console"
                subtitle="Manage Plans & Feature Configurations"
                backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2800&auto=format&fit=crop"
                className="min-h-[40vh]"
            />

            <main className="max-w-7xl mx-auto px-6 py-12 -mt-20 relative z-20">
                <div className="bg-card border border-border rounded-2xl shadow-xl p-8 mb-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Feature Management</h2>
                            <p className="text-muted-foreground">Toggle features on or off for each subscription tier.</p>
                        </div>
                        <button className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                            <Save className="w-5 h-5" />
                            Save Changes
                        </button>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-secondary/30">
                                    <th className="p-6 text-sm font-bold text-muted-foreground uppercase tracking-wider w-1/3">Feature</th>
                                    {plans.map((plan) => (
                                        <th key={plan.name} className={`p-6 text-center border-l border-border ${plan.color}`}>
                                            <div className="font-extrabold text-lg">{plan.name}</div>
                                            <div className="text-sm font-normal opacity-80">{plan.price}</div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {features.map((feature) => (
                                    <tr key={feature.id} className="hover:bg-secondary/5 transition-colors">
                                        <td className="p-6">
                                            <div className="flex items-center gap-3 font-medium">
                                                <span className="p-2 rounded-lg bg-secondary text-primary">{feature.icon}</span>
                                                {feature.name}
                                            </div>
                                        </td>
                                        {plans.map((plan, index) => {
                                            // In a real app, we would check the state here
                                            // For mock, we rely on the config object
                                            const isEnabled = (config as any)[feature.id][index];

                                            return (
                                                <td key={`${plan.name}-${feature.id}`} className="p-6 text-center border-l border-border relative">
                                                    <label className="inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" defaultChecked={isEnabled} />
                                                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                                    </label>
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
