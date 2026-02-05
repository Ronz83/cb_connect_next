'use client';

import React, { useState, useEffect } from 'react';
import { GHL_ACCOUNTS, GHLClient } from '@/utils/ghl';
import { importGHLContacts } from '@/app/actions/import-ghl';
import { User, RefreshCw, Download, CheckCircle, AlertCircle, Building2, Filter } from 'lucide-react';

export default function GHLImportPage() {
    const [selectedAccountIndex, setSelectedAccountIndex] = useState(0);
    const [allContacts, setAllContacts] = useState<any[]>([]); // Store all fetched
    const [filteredContacts, setFilteredContacts] = useState<any[]>([]); // Store displayed
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [importing, setImporting] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
    const [tagFilter, setTagFilter] = useState('');

    const currentAccount = GHL_ACCOUNTS[selectedAccountIndex];

    const fetchContacts = async () => {
        setLoading(true);
        setError(null);
        setAllContacts([]);
        setFilteredContacts([]);
        setSelectedContacts(new Set());

        try {
            const client = new GHLClient(currentAccount.token, currentAccount.locationId);
            // Fetch more to ensure we catch the tagged ones
            const response = await client.getContacts(100);
            const fetched = response.contacts || [];

            setAllContacts(fetched);
            setFilteredContacts(fetched); // Initially show all

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Failed to fetch contacts');
        } finally {
            setLoading(false);
        }
    };

    // Filter Logic
    useEffect(() => {
        if (!tagFilter.trim()) {
            setFilteredContacts(allContacts);
            return;
        }
        const lowerFilter = tagFilter.toLowerCase();
        const filtered = allContacts.filter(c =>
            c.tags?.some((t: string) => t.toLowerCase().includes(lowerFilter))
        );
        setFilteredContacts(filtered);
    }, [tagFilter, allContacts]);


    const toggleSelect = (id: string) => {
        const newSelected = new Set(selectedContacts);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedContacts(newSelected);
    };

    const handleImport = async () => {
        setImporting(true);
        const contactsToImport = allContacts.filter(c => selectedContacts.has(c.id));

        try {
            const result = await importGHLContacts(contactsToImport);
            if (result.success > 0) {
                alert(`✅ Successfully imported ${result.success} businesses!`);
                setSelectedContacts(new Set());
            }
            if (result.failed > 0) {
                alert(`⚠️ Failed to import ${result.failed} contacts.`);
            }
        } catch (err) {
            alert("CRITICAL: Import failed to run.");
            console.error(err);
        } finally {
            setImporting(false);
        }
    }

    return (
        <div className="p-8 max-w-6xl mx-auto text-white">
            <div className="flex items-center justifying-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <Building2 className="text-orange-500" size={32} />
                        Import from Go High Level
                    </h1>
                    <p className="text-gray-400 mt-2">Connect to your agency sub-accounts and import businesses directly.</p>
                </div>
            </div>

            {/* Controls */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Account Selector */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Select Source Account</label>
                        <select
                            value={selectedAccountIndex}
                            onChange={(e) => setSelectedAccountIndex(Number(e.target.value))}
                            className="w-full bg-black/50 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-orange-500"
                        >
                            {GHL_ACCOUNTS.map((acc, idx) => (
                                <option key={idx} value={idx}>
                                    {acc.name} ({acc.locationId.slice(0, 8)}...)
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tag Filter */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-400 mb-2">Filter by Tag</label>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                type="text"
                                value={tagFilter}
                                onChange={(e) => setTagFilter(e.target.value)}
                                placeholder="e.g. email-opened"
                                className="w-full bg-black/50 border border-white/20 text-white rounded-lg px-10 py-3 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>
                </div>

                <button
                    onClick={fetchContacts}
                    disabled={loading}
                    className={`mt-6 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/20'
                        }`}
                >
                    {loading ? <RefreshCw className="animate-spin" size={18} /> : <User size={18} />}
                    {loading ? 'Fetching Contacts...' : 'Fetch Contacts'}
                </button>

                {error && (
                    <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg border border-red-500/20">
                        <AlertCircle size={18} />
                        {error}
                    </div>
                )}
            </div>

            {/* Results Table */}
            {filteredContacts.length > 0 && (
                <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                        <h3 className="font-semibold text-lg">Found {filteredContacts.length} Contacts</h3>

                        {selectedContacts.size > 0 && (
                            <button
                                onClick={handleImport}
                                disabled={importing}
                                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                            >
                                {importing ? <RefreshCw className="animate-spin" size={16} /> : <Download size={16} />}
                                Import {selectedContacts.size} Selected
                            </button>
                        )}
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-gray-300">
                            <thead className="bg-black/20 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="p-4 w-12 text-center">
                                        <input type="checkbox" className="rounded border-gray-600 bg-transparent text-orange-500 focus:ring-offset-0" />
                                    </th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Company</th>
                                    <th className="p-4">Tags</th>
                                    <th className="p-4">Phone</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredContacts.map((c) => (
                                    <tr
                                        key={c.id}
                                        className={`hover:bg-white/5 transition-colors cursor-pointer ${selectedContacts.has(c.id) ? 'bg-orange-500/10' : ''}`}
                                        onClick={() => toggleSelect(c.id)}
                                    >
                                        <td className="p-4 text-center">
                                            <div className={`w-5 h-5 rounded border border-gray-500 mx-auto flex items-center justify-center transition-colors ${selectedContacts.has(c.id) ? 'bg-orange-500 border-orange-500' : ''}`}>
                                                {selectedContacts.has(c.id) && <CheckCircle size={12} className="text-white" />}
                                            </div>
                                        </td>
                                        <td className="p-4 font-medium text-white">
                                            {c.firstName || ''} {c.lastName || ''}
                                            {(!c.firstName && !c.lastName) && <span className="text-gray-600 italic">No Name</span>}
                                        </td>
                                        <td className="p-4 text-orange-400">{c.companyName || '-'}</td>
                                        <td className="p-4">
                                            <div className="flex flex-wrap gap-1">
                                                {c.tags?.map((t: string) => (
                                                    <span key={t} className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] border border-blue-500/20">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-xs">{c.phone || '-'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
