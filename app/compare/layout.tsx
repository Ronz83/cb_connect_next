'use client';

import React from 'react';
import { PublicHeader } from '@/components/public/PublicHeader';

export default function CompareLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#050505]">
            <PublicHeader />
            <div className="pt-0">
                {/* PublicHeader leaves its own spacer div, so we just render children. 
                  However, some compare pages have their own Hero which might want to go under the header (transparent).
                  For now, the header is sticky/fixed. 
               */}
                {children}
            </div>
        </div>
    );
}
