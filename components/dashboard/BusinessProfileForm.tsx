'use client';

import React, { useState } from 'react';
import { Save, Loader2, Globe, MapPin, Phone, Mail, Building } from 'lucide-react';
import { updateBusinessProfile } from '@/app/actions/business-profile';
import { useRouter } from 'next/navigation';

export function BusinessProfileForm({ initialData }: { initialData: any }) {
    const [formData, setFormData] = useState(initialData);
    const [saving, setSaving] = useState(false);
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        const result = await updateBusinessProfile(initialData.id, formData);

        if (result.success) {
            router.refresh();
            // Optional: Show success toast
        } else {
            alert('Error: ' + result.error);
        }
        setSaving(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* Header / Identity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                        <Building size={16} /> Business Name
                    </label>
                    <input
                        name="name"
                        value={formData.name || ''}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Logo URL</label>
                    <input
                        name="logo_url"
                        value={formData.logo_url || ''}
                        onChange={handleChange}
                        placeholder="https://..."
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                    />
                </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">Description</label>
                <textarea
                    name="description"
                    rows={4}
                    value={formData.description || ''}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><Phone size={16} /> Phone</label>
                    <input
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><Mail size={16} /> Email</label>
                    <input
                        name="contact_email"
                        value={formData.contact_email || ''}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><Globe size={16} /> Website</label>
                    <input
                        name="website"
                        value={formData.website || ''}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 flex items-center gap-2"><MapPin size={16} /> Address</label>
                    <input
                        name="address"
                        value={formData.address || ''}
                        onChange={handleChange}
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-orange-500 outline-none"
                    />
                </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all disabled:opacity-50"
                >
                    {saving ? <Loader2 className="animate-spin" /> : <Save />}
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </form>
    );
}
