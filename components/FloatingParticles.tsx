'use client';

import React from 'react';
import { themes } from '@/lib/themes'; // We will create this

export const FloatingParticles = ({ theme }: { theme: 'dark' | 'light' }) => {
    // Fallback if themes not loaded yet, or handle import differently
    // Since themes acts as a constant, maybe we pass 't' or use a hook.
    // For now, let's replicate the theme data or imports.
    // Actually, I should extract 'themes' to a constant file first to avoid circular deps or prop drilling issues.
    // I will create `lib/themes.ts` later. For now, assuming it exists.

    // NOTE: Modified to accept the theme object properties directly or re-import
    // But wait, the component just needs `particleOpacity`.

    const particleOpacity = theme === 'dark' ? 0.2 : 0.3; // Hardcoded from original constants for now to simplify

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: Math.random() * 4 + 2 + 'px',
                        height: Math.random() * 4 + 2 + 'px',
                        background: `linear-gradient(135deg, #FF6B35, #FF8C42)`,
                        left: Math.random() * 100 + '%',
                        top: Math.random() * 100 + '%',
                        opacity: particleOpacity,
                        animation: `float ${10 + Math.random() * 20}s ease-in-out infinite`,
                        animationDelay: `-${Math.random() * 20}s`,
                    }}
                />
            ))}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-30px) translateX(10px); opacity: 0.4; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.2; }
          75% { transform: translateY(-40px) translateX(5px); opacity: 0.3; }
        }
      `}</style>
        </div>
    );
};
