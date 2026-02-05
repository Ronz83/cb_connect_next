'use client';

import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle, AlertTriangle, Play, RefreshCw, ExternalLink, Database } from 'lucide-react';
import { checkSystemHealth, seedVerificationData, promoteSelfToAdmin } from '@/app/actions/dev-tools';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

function PermissionsButton() {
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);

    const handlePromote = async () => {
        setLoading(true);
        const res = await promoteSelfToAdmin();
        setMsg(res.message);
        setLoading(false);
    };

    return (
        <div className="space-y-2">
            <button
                onClick={handlePromote}
                disabled={loading}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 hover:bg-orange-500/20 transition-all text-left group"
            >
                <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-500">
                        <ShieldAlert size={14} />
                    </div>
                    <span className="text-sm font-medium text-orange-200">Fix Admin Permissions</span>
                </div>
                <span className="text-xs text-orange-500/60">Self-Promote</span>
            </button>
            {msg && <div className="text-xs text-gray-400 p-2 bg-black/20 rounded font-mono break-all">{msg}</div>}
        </div>
    );
}

export function DevControlPanel() {
    const [health, setHealth] = useState<{ dbConnected: boolean; schemaValid: boolean; timestamp: string; ids?: Record<string, number> } | null>(null);
    const [loading, setLoading] = useState(false);
    const [seedResult, setSeedResult] = useState<string | null>(null);

    const runHealthCheck = async () => {
        setLoading(true);
        const res = await checkSystemHealth();
        setHealth(res);
        setLoading(false);
    };

    const handleSeed = async () => {
        setLoading(true);
        setSeedResult(null);
        try {
            const res = await seedVerificationData();
            setSeedResult(res.message);
            await runHealthCheck();
        } catch (e) {
            setSeedResult("Error running seed.");
        }
        setLoading(false);
    };

    useEffect(() => {
        runHealthCheck();
    }, []);

    const currentIds = health?.ids || {};

    return (
        <div className="rounded-2xl bg-[#111] border border-[#222] overflow-hidden mt-8">
            <div className="p-4 border-b border-[#222] bg-[#151515] flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                        <Terminal size={18} />
                    </div>
                    <div>
                        <h3 className="font-bold text-white text-sm">Command Center</h3>
                        <p className="text-xs text-gray-400">System Verification & Tools</p>
                    </div>
                </div>
                <button
                    onClick={runHealthCheck}
                    disabled={loading}
                    className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white transition-colors"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
                </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Health Status */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">System Status</h4>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-[#222]">
                        <div className="flex items-center gap-3">
                            <Database size={16} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-300">Supabase Connection</span>
                        </div>
                        {health?.dbConnected ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-400">
                                <CheckCircle size={14} /> Online
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-red-400">
                                <AlertTriangle size={14} /> Error
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-[#222]">
                        <div className="flex items-center gap-3">
                            <Terminal size={16} className="text-gray-400" />
                            <span className="text-sm font-medium text-gray-300">Schema (Columns)</span>
                        </div>
                        {health?.schemaValid ? (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-green-400">
                                <CheckCircle size={14} /> Verified
                            </span>
                        ) : (
                            <span className="flex items-center gap-1.5 text-xs font-bold text-yellow-400">
                                <AlertTriangle size={14} /> Missing Cols
                            </span>
                        )}
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Actions</h4>

                    <button
                        onClick={handleSeed}
                        disabled={loading}
                        className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left group"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <Play size={14} fill="currentColor" />
                            </div>
                            <span className="text-sm font-medium text-white">Inject Verification Data</span>
                        </div>
                        <span className="text-xs text-gray-500">Auto, RE, Jobs</span>
                    </button>

                    <PermissionsButton />

                    {seedResult && (
                        <div className="text-xs text-gray-400 p-2 bg-black/20 rounded border border-white/5 font-mono">
                            {seedResult}
                        </div>
                    )}

                    <div className="grid grid-cols-4 gap-2 mt-4">
                        <Link href="/search" target="_blank" className="flex flex-col items-center gap-2 p-3 rounded-xl bg-black/40 border border-[#222] hover:border-orange-500/50 transition-colors text-center group">
                            <ExternalLink size={16} className="text-gray-500 group-hover:text-orange-500" />
                            <span className="text-xs text-gray-400">Directory</span>
                        </Link>

                        <Link href={currentIds.auto ? `/autos/${currentIds.auto}` : '#'} target="_blank" className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-black/40 border border-[#222] transition-colors text-center group ${!currentIds.auto ? 'opacity-50 cursor-not-allowed' : 'hover:border-blue-500/50'}`}>
                            <ExternalLink size={16} className={`text-gray-500 ${currentIds.auto ? 'group-hover:text-blue-500' : ''}`} />
                            <span className="text-xs text-gray-400">Auto</span>
                        </Link>

                        <Link href={currentIds.re ? `/real-estate/${currentIds.re}` : '#'} target="_blank" className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-black/40 border border-[#222] transition-colors text-center group ${!currentIds.re ? 'opacity-50 cursor-not-allowed' : 'hover:border-green-500/50'}`}>
                            <ExternalLink size={16} className={`text-gray-500 ${currentIds.re ? 'group-hover:text-green-500' : ''}`} />
                            <span className="text-xs text-gray-400">Real Estate</span>
                        </Link>

                        <Link href={currentIds.job ? `/jobs/${currentIds.job}` : '#'} target="_blank" className={`flex flex-col items-center gap-2 p-3 rounded-xl bg-black/40 border border-[#222] transition-colors text-center group ${!currentIds.job ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-500/50'}`}>
                            <ExternalLink size={16} className={`text-gray-500 ${currentIds.job ? 'group-hover:text-purple-500' : ''}`} />
                            <span className="text-xs text-gray-400">Jobs</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
