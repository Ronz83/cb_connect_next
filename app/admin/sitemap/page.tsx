import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, Lock, Globe, Building2, User } from 'lucide-react';

type RouteNode = {
    path: string;
    label: string;
    description: string;
    role: 'public' | 'super_admin' | 'business' | 'partner' | 'all';
    subRoutes?: RouteNode[];
    icon?: React.ElementType;
};

const routeMap: RouteNode[] = [
    {
        path: '/',
        label: 'Landing Page',
        description: 'Public homepage showcasing CBConnect/BizCompare.',
        role: 'public',
        icon: Globe,
        subRoutes: [
            { path: '/login', label: 'Login', description: 'Unified authentication portal.', role: 'public' },
            { path: '/signup', label: 'Sign Up', description: 'Registration for new businesses.', role: 'public' },
            { path: '/ghl-test', label: 'GHL Test', description: 'Debug page for GoHighLevel integration.', role: 'public' },
        ]
    },
    {
        path: '/dashboard',
        label: 'Business Portal',
        description: 'Main dashboard for Business Owners to manage their profile and quotes.',
        role: 'business',
        icon: Building2,
        subRoutes: [
            { path: '/dashboard', label: 'Overview', description: 'Key metrics and status.', role: 'business' },
            { path: '/dashboard/profile', label: 'My Business', description: 'Edit contact info and branding.', role: 'business' },
            { path: '/dashboard/quotes', label: 'QuoteNow Engine', description: 'Builder for quote calculator.', role: 'business' },
        ]
    },
    {
        path: '/admin',
        label: 'Super Admin Console',
        description: 'Master control panel for Platform Administrators.',
        role: 'super_admin',
        icon: Lock,
        subRoutes: [
            { path: '/admin', label: 'Overview', description: 'Platform-wide stats.', role: 'super_admin' },
            { path: '/admin/businesses', label: 'Businesses', description: 'Manage all business accounts.', role: 'super_admin' },
            { path: '/admin/businesses/new', label: 'Add Business', description: 'Manually onboard a partner.', role: 'super_admin' },
            { path: '/admin/users', label: 'User Management', description: 'Manage profiles and assignments.', role: 'super_admin' },
            { path: '/admin/ghl-import', label: 'GHL Import', description: 'Import contacts from GoHighLevel.', role: 'super_admin' },
            { path: '/admin/sitemap', label: 'Site Map', description: 'This visualization.', role: 'super_admin' },
        ]
    },
    {
        path: '/embed/quote/[id]',
        label: 'Embeddable Calculator',
        description: 'Public-facing widget for external websites.',
        role: 'public',
        icon: Network
    }
];

const RoleBadge = ({ role }: { role: string }) => {
    switch (role) {
        case 'super_admin': return <Badge className="bg-red-900 text-red-200 border-red-800">Super Admin</Badge>;
        case 'business': return <Badge className="bg-blue-900 text-blue-200 border-blue-800">Business</Badge>;
        case 'public': return <Badge className="bg-green-900 text-green-200 border-green-800">Public</Badge>;
        default: return <Badge variant="outline">{role}</Badge>;
    }
};

export default function SiteMapPage() {
    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                    <Network className="text-purple-500" />
                    Application Site Map
                </h1>
            </div>

            <div className="grid gap-6">
                {routeMap.map((section, idx) => (
                    <Card key={idx} className="bg-[#0A0A0A] border-[#222]">
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    {section.icon && <section.icon className="w-8 h-8 text-gray-400" />}
                                    <div>
                                        <CardTitle className="text-xl text-white font-mono">{section.path}</CardTitle>
                                        <CardDescription>{section.label}</CardDescription>
                                    </div>
                                </div>
                                <RoleBadge role={section.role} />
                            </div>
                            <p className="text-gray-400 mt-2">{section.description}</p>
                        </CardHeader>
                        {section.subRoutes && (
                            <CardContent className="space-y-4">
                                <div className="pl-4 border-l-2 border-[#222] space-y-4">
                                    {section.subRoutes.map((route, rIdx) => (
                                        <div key={rIdx} className="relative pl-6">
                                            {/* Connector line visuals could go here */}
                                            <div className="absolute left-[-2px] tops-1/2 w-4 h-[2px] bg-[#222] -translate-y-1/2" />
                                            <div className="flex justify-between items-center bg-[#111] p-3 rounded-lg border border-[#222]">
                                                <div>
                                                    <div className="font-mono text-sm text-purple-400 font-bold">{route.path}</div>
                                                    <div className="text-xs text-gray-500">{route.label}</div>
                                                </div>
                                                <div className="flex flex-col items-end gap-1">
                                                    <RoleBadge role={route.role} />
                                                    <span className="text-xs text-gray-600">{route.description}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </div>
        </div>
    );
}
