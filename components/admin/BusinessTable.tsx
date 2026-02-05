'use client';

import React, { useState } from 'react';
import { Search, Plus, Pencil, Trash2, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

interface BusinessTableProps {
    initialBusinesses: any[];
}

import { updateBusinessStatus } from '@/app/actions/business-status';
import { Archive, CheckCircle, RefreshCcw, Eye } from 'lucide-react';

export function BusinessTable({ initialBusinesses }: BusinessTableProps) {
    const [businesses, setBusinesses] = useState(initialBusinesses);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    const router = useRouter();

    const filteredBusinesses = businesses.filter(b =>
        b.name.toLowerCase().includes(search.toLowerCase()) ||
        b.description?.toLowerCase().includes(search.toLowerCase())
    );

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredBusinesses.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredBusinesses.map(b => b.id)));
        }
    };

    const toggleSelect = (id: number) => {
        const newSet = new Set(selectedIds);
        if (newSet.has(id)) newSet.delete(id);
        else newSet.add(id);
        setSelectedIds(newSet);
    };

    const handleBulkStatus = async (status: 'active' | 'archived') => {
        if (!confirm(`Are you sure you want to set ${selectedIds.size} items to ${status}?`)) return;
        setLoading(true);
        const ids = Array.from(selectedIds);

        const result = await updateBusinessStatus(ids, status);
        if (result.success) {
            // Optimistic update or refresh
            setBusinesses(businesses.map(b =>
                selectedIds.has(b.id) ? { ...b, status } : b
            ));
            setSelectedIds(new Set());
            router.refresh();
        } else {
            alert('Failed: ' + result.error);
        }
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to delete this business?')) return;
        setLoading(true);

        // We will assume RLS policies allow deletion for authenticated users
        const { error } = await supabase
            .from('businesses')
            .delete()
            .eq('id', id);

        if (error) {
            alert('Error deleting business: ' + error.message);
        } else {
            setBusinesses(businesses.filter(b => b.id !== id));
            router.refresh();
        }
        setLoading(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Businesses</h1>
                <Link
                    href="/admin/businesses/new"
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-xl text-white font-medium transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add New</span>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-[#111] p-4 rounded-xl border border-[#222]">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search businesses..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600"
                />
            </div>

            {selectedIds.size > 0 && (
                <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex items-center justify-between">
                    <span className="text-orange-500 font-medium">{selectedIds.size} Selected</span>
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleBulkStatus('active')}
                            disabled={loading}
                            className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors"
                        >
                            <CheckCircle size={14} /> Activate
                        </button>
                        <button
                            onClick={() => handleBulkStatus('archived')}
                            disabled={loading}
                            className="flex items-center gap-2 px-3 py-1.5 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-lg transition-colors"
                        >
                            <Archive size={14} /> Archive
                        </button>
                    </div>
                </div>
            )}

            <div className="border border-[#222] rounded-2xl overflow-hidden bg-[#111]">
                <table className="w-full text-left">
                    <thead className="bg-[#1A1A1A] text-gray-400 text-sm border-b border-[#222]">
                        <tr>
                            <th className="px-6 py-4 w-10">
                                <input
                                    type="checkbox"
                                    checked={selectedIds.size === filteredBusinesses.length && filteredBusinesses.length > 0}
                                    onChange={toggleSelectAll}
                                    className="rounded border-gray-600 bg-transparent text-orange-500 focus:ring-0"
                                />
                            </th>
                            <th className="px-6 py-4 font-medium">Name</th>
                            <th className="px-6 py-4 font-medium">Status</th>
                            <th className="px-6 py-4 font-medium">Industry</th>
                            <th className="px-6 py-4 font-medium">Country</th>
                            <th className="px-6 py-4 font-medium text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222]">
                        {filteredBusinesses.map((business) => (
                            <tr key={business.id} className={`hover:bg-[#1A1A1A] transition-colors ${selectedIds.has(business.id) ? 'bg-orange-500/5' : ''}`}>
                                <td className="px-6 py-4">
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.has(business.id)}
                                        onChange={() => toggleSelect(business.id)}
                                        className="rounded border-gray-600 bg-transparent text-orange-500 focus:ring-0"
                                    />
                                </td>
                                <td className="px-6 py-4">
                                    <div className="font-medium text-white">{business.name}</div>
                                    <div className="text-sm text-gray-500 truncate max-w-xs">{business.description}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-medium border ${business.status === 'archived'
                                        ? 'bg-gray-800 text-gray-400 border-gray-700'
                                        : 'bg-green-500/10 text-green-400 border-green-500/20'
                                        }`}>
                                        {business.status || 'active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                        {business.industry}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-400">
                                    {business.country_code}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button
                                            onClick={async () => {
                                                setLoading(true);
                                                const { masqueradeAsBusiness } = await import('@/app/actions/masquerade');
                                                await masqueradeAsBusiness(business.id);
                                                window.location.href = '/dashboard';
                                            }}
                                            className="p-2 hover:bg-blue-500/10 rounded-lg text-gray-400 hover:text-blue-400 transition-colors"
                                            title="View as Business"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <Link
                                            href={`/admin/businesses/${business.id}/edit`}
                                            className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(business.id)}
                                            disabled={loading}
                                            className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {filteredBusinesses.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                    No businesses found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
