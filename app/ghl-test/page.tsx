'use client';

import React, { useEffect, useState } from 'react';
import { ghl } from '@/utils/ghl';

export default function GHLTestPage() {
    const [contacts, setContacts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchContacts() {
            try {
                const response = await ghl.getContacts();
                console.log('GHL Response:', response);
                setContacts(response.contacts || []);
            } catch (err: any) {
                console.error('GHL Fetch Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchContacts();
    }, []);

    return (
        <div className="p-10 font-sans max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Go High Level Integration Test</h1>

            {loading && <div className="text-blue-500 text-xl">Loading contacts...</div>}

            {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-xl mb-6">
                    <strong>Error:</strong> {error}
                </div>
            )}

            {!loading && !error && (
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-green-500">
                        ✅ Successfully Connected! Found {contacts.length} contacts.
                    </h2>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 overflow-auto max-h-[500px]">
                        <pre className="text-xs text-gray-300">
                            {JSON.stringify(contacts, null, 2)}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
