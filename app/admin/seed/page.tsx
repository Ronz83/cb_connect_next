'use client';

import React, { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { Loader2, CheckCircle, AlertTriangle } from 'lucide-react';

export default function SeedPage() {
    const [status, setStatus] = useState<'idle' | 'seeding' | 'success' | 'error'>('idle');
    const [log, setLog] = useState<string[]>([]);

    // Hardcoded seed data to run from Client Side (using User Session)
    const seedData = async () => {
        setStatus('seeding');
        setLog([]);

        const addLog = (msg: string) => setLog(prev => [...prev, msg]);

        try {
            // Check Session
            addLog("Step 1: Verifying Session...");
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (sessionError) throw sessionError;
            if (!session) {
                throw new Error("No active session. Please log in as Admin.");
            }
            addLog(`Step 2: Validated User: ${session.user.email}`);

            // 1. Check for Joe's Plumbing
            addLog("Step 3: Checking business 'Joe's Plumbing'...");
            const { data: existingJoe, error: fetchJoeError } = await supabase.from('businesses').select('id').eq('name', "Joe's Plumbing").maybeSingle();
            if (fetchJoeError) throw fetchJoeError;

            let joeId = existingJoe?.id;

            if (!existingJoe) {
                addLog("Step 4: Inserting 'Joe's Plumbing'...");
                const { data: newJoe, error: insertJoeError } = await supabase.from('businesses').insert({
                    name: "Joe's Plumbing", industry: 'Trades', city: 'Bridgetown', country_code: 'BB', description: '24/7 Emergency Plumbing.'
                }).select().single();

                if (insertJoeError) {
                    addLog(`Insert Failed: ${insertJoeError.message} (Code: ${insertJoeError.code})`);
                    throw insertJoeError;
                }
                joeId = newJoe.id;
            } else {
                addLog("Joe's Plumbing already exists. Skipping insert.");
            }

            if (joeId) {
                addLog("Step 5: Updating Joe's Params...");
                // ... params logic
                const { error: delError } = await supabase.from('quote_parameters').delete().eq('business_id', joeId);
                if (delError) throw delError;

                const { error: paramError } = await supabase.from('quote_parameters').insert([
                    { business_id: joeId, label: 'Problem Type', field_type: 'select', options: ['Leak Repair', 'Clog Removal', 'Heater Install'], is_required: true, display_order: 1, logic_config: { prices: { "Leak Repair": 150, "Clog Removal": 100, "Heater Install": 800 } } },
                    { business_id: joeId, label: 'Emergency Service?', field_type: 'checkbox', options: [], is_required: false, display_order: 2, logic_config: { price: 100 } }
                ]);
                if (paramError) throw paramError;
            }

            // 2. Check for Top Tier Roofing
            addLog("Step 6: Checking 'Top Tier Roofing'...");
            const { data: existingTop, error: fetchTopError } = await supabase.from('businesses').select('id').eq('name', "Top Tier Roofing").maybeSingle();
            if (fetchTopError) throw fetchTopError;
            let topId = existingTop?.id;

            if (!existingTop) {
                addLog("Step 7: Inserting 'Top Tier Roofing'...");
                const { data: newTop, error: insertTopError } = await supabase.from('businesses').insert({
                    name: "Top Tier Roofing", industry: 'Construction', city: 'Kingston', country_code: 'JM', description: 'Premium roofing solutions.'
                }).select().single();
                if (insertTopError) {
                    addLog(`Insert Failed: ${insertTopError.message}`);
                    throw insertTopError;
                }
                topId = newTop.id;
            } else {
                addLog("Top Tier Roofing already exists. Skipping insert.");
            }

            if (topId) {
                addLog("Step 8: Updating Top Tier Params...");
                const { error: delError } = await supabase.from('quote_parameters').delete().eq('business_id', topId);
                if (delError) throw delError;
                const { error: paramError } = await supabase.from('quote_parameters').insert([
                    { business_id: topId, label: 'Roof Material', field_type: 'select', options: ['Asphalt Shingles', 'Metal', 'Clay Tile'], is_required: true, display_order: 1, logic_config: { prices: { "Asphalt Shingles": 500, "Metal": 2500, "Clay Tile": 4000 } } },
                    { business_id: topId, label: 'Roof Area (Sq Ft)', field_type: 'number', options: [], is_required: true, display_order: 2, logic_config: { multiplier: 4 } }
                ]);
            }

            setStatus('success');
            addLog("Done! Data seeded.");

        } catch (err: any) {
            console.error('Seed Error:', err);
            setStatus('error');

            let msg = 'Unknown Error';
            if (typeof err === 'string') {
                msg = err;
            } else if (err instanceof Error) {
                msg = err.message;
            } else if (typeof err === 'object' && err !== null) {
                // Try to extract known fields or stringify
                msg = err.message || err.desc || err.error_description || JSON.stringify(err);
            }

            addLog(`!! ERROR: ${msg}`);
            if (err?.code) addLog(`Code: ${err.code} (Postgres)`);
            if (err?.details) addLog(`Details: ${err.details}`);
            if (err?.hint) addLog(`Hint: ${err.hint}`);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto text-white">
            <h1 className="text-3xl font-bold mb-6">Admin Data Seeder</h1>
            <p className="text-gray-400 mb-8">
                Use this tool to populate the database with Demo Business Data required for the Compare Engine.
                You must be logged in as an Admin.
            </p>

            <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="font-semibold">Demo Businesses</div>
                    <button
                        onClick={seedData}
                        disabled={status === 'seeding'}
                        className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-bold transition-colors flex items-center gap-2"
                    >
                        {status === 'seeding' ? <Loader2 className="animate-spin" size={18} /> : 'Seed Data'}
                    </button>
                </div>

                <div className="bg-black/50 rounded-xl p-4 font-mono text-xs h-64 overflow-y-auto border border-[#222]">
                    {log.length === 0 ? <span className="text-gray-600">Waiting to start...</span> : log.map((l, i) => (
                        <div key={i} className="mb-1 text-green-400">
                            {`> ${l}`}
                        </div>
                    ))}
                    {status === 'error' && <div className="text-red-500 font-bold mt-2">Seed Failed.</div>}
                    {status === 'success' && <div className="text-green-500 font-bold mt-2 flex items-center gap-2"><CheckCircle size={14} /> Success!</div>}
                </div>
            </div>
        </div>
    );
}
