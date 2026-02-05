'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import { Loader, Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { industries as staticIndustries } from '@/data/industries';

interface BusinessFormProps {
    initialData?: any;
    countries: any[];
}

export function BusinessForm({ initialData, countries }: BusinessFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        industry: initialData?.industry || '',
        country_code: initialData?.country_code || '',
        description: initialData?.description || '',
        logo_url: initialData?.logo_url || '',
        website_url: initialData?.website_url || '',
        services: initialData?.services ? initialData.services.join(', ') : '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                services: formData.services.split(',').map((s: string) => s.trim()).filter(Boolean),
            };

            if (initialData?.id) {
                // Update
                const { error } = await supabase
                    .from('businesses')
                    .update(payload)
                    .eq('id', initialData.id);
                if (error) throw error;
            } else {
                // Create
                const { error } = await supabase
                    .from('businesses')
                    .insert([payload]);
                if (error) throw error;
            }

            router.push('/admin/businesses');
            router.refresh();
        } catch (error: any) {
            alert('Error saving business: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-6">
                <Link
                    href="/admin/businesses"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Businesses</span>
                </Link>
                <h1 className="text-3xl font-bold">
                    {initialData ? 'Edit Business' : 'Add New Business'}
                </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-[#111] p-8 rounded-2xl border border-[#222]">

                {/* Name */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Business Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="e.g. Acme Corp"
                    />
                </div>

                {/* Industry & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Industry</label>
                        <select
                            name="industry"
                            required
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        >
                            <option value="">Select Industry</option>
                            {staticIndustries.map(ind => (
                                <option key={ind.id} value={ind.id}>{ind.name}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Country</label>
                        <select
                            name="country_code"
                            required
                            value={formData.country_code}
                            onChange={handleChange}
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        >
                            <option value="">Select Country</option>
                            {countries.map(c => (
                                <option key={c.code} value={c.code}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Description</label>
                    <textarea
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="A brief description of the business..."
                    />
                </div>

                {/* Services */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Services (comma separated)</label>
                    <input
                        type="text"
                        name="services"
                        value={formData.services}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="e.g. Web Design, SEO, Marketing"
                    />
                </div>

                {/* Logo URL */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Logo URL</label>
                    <input
                        type="url"
                        name="logo_url"
                        value={formData.logo_url}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="https://example.com/logo.png"
                    />
                </div>

                {/* Website URL */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Website URL</label>
                    <input
                        type="url"
                        name="website_url"
                        value={formData.website_url}
                        onChange={handleChange}
                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
                        placeholder="https://example.com"
                    />
                </div>

                <div className="pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                    >
                        {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        <span>Save Business</span>
                    </button>
                </div>

            </form>
        </div>
    );
}
