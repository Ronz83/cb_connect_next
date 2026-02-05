import { type NextRequest } from 'next/server'
import { updateSession } from './utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const url = request.nextUrl
    const hostname = request.headers.get('host') || ''

    // Domain-Based Routing
    // 1. "Main" Domain (caricombusiness.com) -> Marketing Page
    // Exclude localhost from this rule to ensure dev environment (Directory) works by default
    // To test locally, you would need to modify hosts file or assume this works in prod
    const isMainDomain = hostname === 'caricombusiness.com' || hostname === 'www.caricombusiness.com'

    // If on main domain and requesting root, rewrite to marketing page
    if (isMainDomain && url.pathname === '/') {
        return NextResponse.rewrite(new URL('/marketing', request.url))
    }

    // 2. "Directory" Subdomain (dir.caricombusiness.com) -> Default App (No Change needed)
    // 3. Localhost -> Default App (Directory)

    return await updateSession(request)
}

import { NextResponse } from 'next/server'

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}
