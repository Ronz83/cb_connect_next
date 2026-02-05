import React from 'react';
import { Settings, Sliders } from 'lucide-react';
import { ComparisonEmbedBuilder } from '@/components/admin/ComparisonEmbedBuilder';

export default function AdminSettingsPage() {
    return (
        <div className="p-6 max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
                        <Settings className="w-8 h-8 text-orange-500" />
                        System Settings
                    </h1>
                    <p className="text-gray-400 mt-2">
                        Configure global parameters and widget tools.
                    </p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Embed Builder Section */}
                <ComparisonEmbedBuilder />

                {/* Placeholder for General Settings */}
                <div className="bg-[#111] border border-[#222] rounded-2xl p-6 opacity-50 pointer-events-none">
                    <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                        <Sliders className="text-gray-500" size={24} />
                        General Configuration (Coming Soon)
                    </h3>
                    <div className="space-y-4">
                        <div className="h-10 bg-[#222] rounded-xl w-full"></div>
                        <div className="h-10 bg-[#222] rounded-xl w-2/3"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
