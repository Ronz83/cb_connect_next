import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://beazuqogozbjltunxjhd.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJlYXp1cW9nb3piamx0dW54amhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwNzExMzEsImV4cCI6MjA4NTY0NzEzMX0.j3A1WbDylwvmX4Kg3fRDQe6FEP8GH6IjcUoUp1JTlWI',
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // 4. Role-Based Access Control
    if (user) {
        // Fetch User Role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        const role = profile?.role || 'business'; // Default to business if no profile found
        const path = request.nextUrl.pathname;

        // A. Protect /admin routes (Super Admin Only)
        // A. Protect /admin routes (Super Admin Only)
        // Bypass if email matches env var
        const isSuperAdminEmail = user.email === process.env.NEXT_PUBLIC_SUPER_ADMIN_EMAIL;

        if (path.startsWith('/admin') && role !== 'super_admin' && !isSuperAdminEmail) {
            // Redirect unauthorized users to their dashboard
            const url = request.nextUrl.clone();
            url.pathname = '/dashboard';
            return NextResponse.redirect(url);
        }

        // B. Protect /dashboard routes (Business/Partner Only)
        // Super Admins (by role or email) can access dashboard freely.
        // We only redirect if they are at LOGIN page.

        if (path.startsWith('/login')) {
            const url = request.nextUrl.clone();
            // Default landing: Admin -> Admin Panel, Others -> Dashboard
            if (role === 'super_admin' || isSuperAdminEmail) {
                url.pathname = '/admin';
            } else {
                url.pathname = '/dashboard';
            }
            return NextResponse.redirect(url);
        }
    } else {
        // Not logged in
        if (request.nextUrl.pathname.startsWith('/admin') || request.nextUrl.pathname.startsWith('/dashboard')) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            return NextResponse.redirect(url);
        }
    }

    return supabaseResponse
}
