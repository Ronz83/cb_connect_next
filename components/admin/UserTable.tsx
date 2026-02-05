'use client';

import React, { useState } from 'react';
import { Search, Shield, Briefcase, ChevronDown } from 'lucide-react';
import { updateUserRole, assignBusinessToUser } from '@/app/actions/admin-users';
import { useRouter } from 'next/navigation';

interface UserTableProps {
    initialProfiles: any[];
    availableBusinesses: any[];
}

export function UserTable({ initialProfiles, availableBusinesses }: UserTableProps) {
    const [profiles, setProfiles] = useState(initialProfiles);
    const [search, setSearch] = useState('');
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const router = useRouter();

    const filteredProfiles = profiles.filter(p =>
        (p.full_name?.toLowerCase() || '').includes(search.toLowerCase()) ||
        (p.email?.toLowerCase() || '').includes(search.toLowerCase())
    );

    const handleRoleChange = async (userId: string, newRole: string) => {
        if (!confirm(`Change role to ${newRole}?`)) return;
        setLoadingId(userId);

        await updateUserRole(userId, newRole as any);

        // Optimistic Update
        setProfiles(profiles.map(p => p.id === userId ? { ...p, role: newRole } : p));
        setLoadingId(null);
        router.refresh();
    };

    const handleBusinessAssign = async (userId: string, businessIdStr: string) => {
        setLoadingId(userId);
        const businessId = businessIdStr === 'null' ? null : parseInt(businessIdStr);

        await assignBusinessToUser(userId, businessId);

        // Optimistic Update
        setProfiles(profiles.map(p =>
            p.id === userId ? {
                ...p,
                business_id: businessId,
                businesses: businessId ? { name: availableBusinesses.find(b => b.id === businessId)?.name } : null
            } : p
        ));
        setLoadingId(null);
        router.refresh();
    };

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="flex items-center gap-4 bg-[#111] p-4 rounded-xl border border-[#222]">
                <Search className="w-5 h-5 text-gray-500" />
                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-transparent border-none outline-none text-white w-full placeholder-gray-600"
                />
            </div>

            {/* Table */}
            <div className="border border-[#222] rounded-2xl overflow-hidden bg-[#111]">
                <table className="w-full text-left">
                    <thead className="bg-[#1A1A1A] text-gray-400 text-sm border-b border-[#222]">
                        <tr>
                            <th className="px-6 py-4 font-medium">User</th>
                            <th className="px-6 py-4 font-medium">Role</th>
                            <th className="px-6 py-4 font-medium">Assigned Business</th>
                            <th className="px-6 py-4 font-medium text-right">Last Joined</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#222]">
                        {filteredProfiles.map((user) => (
                            <tr key={user.id} className="hover:bg-[#1A1A1A] transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-medium text-white">{user.full_name || 'Unknown Name'}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="relative group inline-block">
                                        <div className={`
                                            flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium cursor-pointer border
                                            ${user.role === 'super_admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : ''}
                                            ${user.role === 'partner' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : ''}
                                            ${user.role === 'business' ? 'bg-gray-800 text-gray-300 border-gray-700' : ''}
                                        `}>
                                            <Shield size={14} />
                                            {user.role}
                                        </div>
                                        {/* Simple Dropdown on Hover/Click could go here, but using select for MVP */}
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                            disabled={loadingId === user.id}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        >
                                            <option value="business">Business</option>
                                            <option value="partner">Partner</option>
                                            <option value="super_admin">Super Admin</option>
                                        </select>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {user.role === 'business' ? (
                                        <div className="flex items-center gap-2">
                                            <Briefcase size={14} className="text-gray-500" />
                                            <select
                                                value={user.business_id || 'null'}
                                                onChange={(e) => handleBusinessAssign(user.id, e.target.value)}
                                                disabled={loadingId === user.id}
                                                className="bg-transparent text-sm text-gray-300 border-b border-gray-700 focus:border-orange-500 outline-none py-1 max-w-[200px] truncate"
                                            >
                                                <option value="null">-- Unassigned --</option>
                                                {availableBusinesses.map(b => (
                                                    <option key={b.id} value={b.id}>{b.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <span className="text-gray-600 text-sm">N/A</span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right text-sm text-gray-500">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
