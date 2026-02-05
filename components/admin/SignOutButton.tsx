'use client';

import { LogOut } from 'lucide-react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    return (
        <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all w-full text-left"
        >
            <LogOut size={20} />
            <span>Sign Out</span>
        </button>
    );
}
