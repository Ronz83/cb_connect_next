'use client';

import { exitMasquerade } from '@/app/actions/masquerade';
import { LogOut, EyeOff } from 'lucide-react';

export function ExitMasqueradeButton() {
    return (
        <button
            onClick={async () => {
                try {
                    await exitMasquerade();
                    // Force hard navigation to ensure strictly fresh state
                    window.location.href = '/admin';
                } catch (error) {
                    console.error('Failed to exit masquerade:', error);
                }
            }}
            className="w-full flex items-center gap-2 mt-4 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold hover:bg-red-500/30 transition-all"
        >
            <EyeOff size={14} /> Stop Viewing As
        </button>
    );
}
