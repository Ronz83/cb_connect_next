'use client';

import React, { useEffect, useState } from 'react';
import { User, LogOut, Loader, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function AuthButton({ theme }: { theme: 'light' | 'dark' }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };

        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    const isDark = theme === 'dark';
    const textColor = isDark ? 'text-white' : 'text-gray-900';
    const hoverBg = isDark ? 'hover:bg-white/10' : 'hover:bg-black/5';

    if (loading) return <Loader className={`w-5 h-5 animate-spin ${textColor} opacity-50`} />;

    if (user) {
        return (
            <div className="flex items-center gap-3">
                {/* Avatar/User Info */}
                <div className="hidden md:flex flex-col items-end">
                    <span className={`text-xs font-medium ${textColor}`}>
                        {user.email?.split('@')[0]}
                    </span>
                </div>

                <button
                    onClick={handleSignOut}
                    className={`p-2 rounded-xl transition-all ${hoverBg} ${textColor}`}
                    title="Sign Out"
                >
                    <LogOut className="w-5 h-5" />
                </button>
            </div>
        );
    }

    return (
        <Link
            href="/login"
            className={`px-4 py-2 rounded-xl font-medium text-sm transition-all focus:scale-95 active:scale-90 flex items-center gap-2
        ${isDark ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'}
      `}
        >
            <User className="w-4 h-4" />
            Sign In
        </Link>
    );
}
