import React from 'react';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { LogOut, LayoutDashboard, Settings, FileText, Briefcase, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { CBConnectLogo } from '@/components/CBConnectLogo';
import { SignOutButton } from '@/components/admin/SignOutButton';
import { ExitMasqueradeButton } from '@/components/admin/ExitMasqueradeButton';
import { ThemeToggle } from '@/components/ThemeToggle';

export default async function BusinessDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect('/login');
    }

    // Verify role (Double check in layout, though middleware processes it too)
    const { data: profile } = await supabase
        .from('profiles')
        .select('role, business_id')
        .eq('id', user.id)
        .single();

    if (profile?.role === 'super_admin') {
        const { cookies } = await import('next/headers');
        const cookieStore = await cookies();
        const masqueradeId = cookieStore.get('masquerade_business_id')?.value;
        if (masqueradeId) {
            // Apply Masquerade
            user.id = `masquerade_as_${masqueradeId}`; // Mock ID to prevent profile fetch conflicts if any
            // We need to inject this ID into context or just ensure downstream queries use it.
            // Actually, we can't easily mock fetch calls. 
            // Instead, we should pass the businessId down or rely on the actions reading the cookie?

            // Wait, standard pattern: 
            // The downstream components (Overview, QuoteBuilder) likely fetch using `createClient()`.
            // RLS might block them if they look for "Where business_id = my_profile.business_id".
            // Super admins usually bypass RLS or have a "select * from where business_id = X".

            // IF the queries are "where business_id = profile.business_id", we need to trick it.
            // Better: Update the layout to fetch the 'Active Business' and pass it via Context? 
            // Or easier: Just let the user be Super Admin, but if masqueradeId is present, the sidebar shows "Viewing as X".
            // The actual page content (dashboard/page.tsx) needs to know which business to load.

            // Let's assume the pages look at the parameters? No, checks profile.
            // We need to overwrite the `profile.business_id` in this scope?
            // Accessing profile is local variable.

            profile.business_id = parseInt(masqueradeId);
        }
    }

    // Check if user is a candidate
    const { data: candidate } = await supabase
        .from('candidates')
        .select('id')
        .eq('id', user.id)
        .single();

    return (
        <div className="min-h-screen bg-background text-foreground font-sans flex">
            {/* Business Sidebar */}
            <aside className="w-64 bg-card border-r border-border fixed h-full flex flex-col z-50">
                <div className="p-6 border-b border-border">
                    <CBConnectLogo />
                    <div className="mt-2 text-xs text-primary font-medium px-2 py-1 bg-primary/10 rounded inline-block">
                        Business Portal
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all">
                        <LayoutDashboard size={20} />
                        <span>Overview</span>
                    </Link>
                    <Link href="/dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all">
                        <Settings size={20} />
                        <span>My Business</span>
                    </Link>
                    <Link href="/dashboard/quotes" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all">
                        <FileText size={20} />
                        <span>QuoteNow</span>
                    </Link>

                    {/* Candidate Link */}
                    <div className="border-t border-border my-2 pt-2"></div>
                    {candidate ? (
                        <Link href={`/candidates/${user.id}`} className="flex items-center gap-3 px-4 py-3 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all font-medium">
                            <Briefcase size={20} />
                            <span>My Candidate Profile</span>
                        </Link>
                    ) : (
                        <Link href="/candidates/register" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all">
                            <Briefcase size={20} />
                            <span>Join Candidate Registry</span>
                        </Link>
                    )}

                    {/* We need to know if we are masquerading to show this. 
                        We can check the profile.business_id vs user.id logic or just check cookie presence.
                    */}
                    {profile?.role === 'super_admin' && (
                        <div className="px-4 mt-2">
                            <ExitMasqueradeButton />
                        </div>
                    )}

                </nav>

                <div className="p-4 border-t border-border space-y-2">
                    {/* Admin Switcher for Super Users */}
                    {(profile?.role === 'super_admin' || user.email === process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL) && (
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 px-4 py-3 rounded-xl text-orange-400 hover:bg-orange-500/10 hover:text-orange-300 transition-all mb-2"
                        >
                            <LayoutDashboard className="w-5 h-5" />
                            <span>Back to Admin</span>
                        </Link>
                    )}

                    <div className="px-4 py-2">
                        <ThemeToggle />
                    </div>

                    <Link href="/" className="flex items-center gap-3 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-all">
                        <ArrowRight size={20} />
                        <span>Back to Website</span>
                    </Link>

                    <SignOutButton />
                </div>
            </aside>

            <main className="pl-64 flex-1">
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div >
    );
}
