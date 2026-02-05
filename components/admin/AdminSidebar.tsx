'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Building2, Globe, Settings, LogOut, Home, FileText, Users, Network, Database, User } from 'lucide-react';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export function AdminSidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const links = [
        { href: '/admin', label: 'Overview', icon: LayoutDashboard },
        { href: '/admin/businesses', label: 'Businesses', icon: Building2 },
        { href: '/admin/countries', label: 'Countries', icon: Globe },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
        { href: '/admin/users', label: 'Users', icon: Users },
        { href: '/admin/csv-import', label: 'Import CSV', icon: FileText },
        { href: '/admin/sitemap', label: 'Site Map', icon: Network },
        { href: '/admin/seed', label: 'Data Seeder', icon: Database },
    ];

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    };

    return (
        <aside className="w-64 h-screen fixed left-0 top-0 bg-[#0A0A0A] border-r border-[#1F1F1F] flex flex-col z-50">
            <div className="p-6 flex items-center gap-3 border-b border-[#1F1F1F]">
                <CBConnectLogo size="small" animated />
                <span className="font-bold text-white tracking-tight">CB Connect</span>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                ${isActive
                                    ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                }
              `}
                        >
                            <Icon className={`w-5 h-5 ${isActive ? 'text-orange-500' : 'text-gray-500 group-hover:text-white'}`} />
                            <span className="font-medium">{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <Link
                href="/candidates/register"
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all mx-4 mb-2"
            >
                <User className="w-5 h-5" />
                <span>Candidate Profile</span>
            </Link>

            <div className="p-4 border-t border-[#1F1F1F] space-y-2">
                {/* Admin Switcher for Super Users */}
                <Link
                    href="/"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                    <Home className="w-5 h-5" />
                    <span>View Site</span>
                </Link>
                <Link
                    href="/dashboard"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-all"
                >
                    <LayoutDashboard className="w-5 h-5" />
                    <span>Business Portal</span>
                </Link>
                <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all text-left"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
}
