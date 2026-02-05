import { createClient } from '@/utils/supabase/server';
import { Building2, Globe, Users } from 'lucide-react';

export default async function AdminDashboard() {
    const supabase = await createClient();

    // Fetch quick stats
    const { count: businessCount } = await supabase
        .from('businesses')
        .select('*', { count: 'exact', head: true });

    const { count: countryCount } = await supabase
        .from('countries')
        .select('*', { count: 'exact', head: true });

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-gray-400">Welcome back. Here's what's happening today.</p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-[#111] border border-[#222]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-gray-500 bg-white/5 py-1 px-2 rounded-full">Total</span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{businessCount || 0}</p>
                    <p className="text-sm text-gray-400">Registered Businesses</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#111] border border-[#222]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                            <Globe className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-gray-500 bg-white/5 py-1 px-2 rounded-full">Total</span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">{countryCount || 0}</p>
                    <p className="text-sm text-gray-400">Countries Covered</p>
                </div>

                <div className="p-6 rounded-2xl bg-[#111] border border-[#222]">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 rounded-xl bg-green-500/10 text-green-500">
                            <Users className="w-6 h-6" />
                        </div>
                        <span className="text-xs font-medium text-gray-500 bg-white/5 py-1 px-2 rounded-full">Active</span>
                    </div>
                    <p className="text-3xl font-bold text-white mb-1">1</p>
                    <p className="text-sm text-gray-400">Admin Users</p>
                </div>
            </div>
        </div>
    );
}
