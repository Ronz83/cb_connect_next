'use client';

import React from 'react';
import { useTheme } from 'next-themes';

export const FloatingParticles = () => {
    const { resolvedTheme } = useTheme();
    const [particles, setParticles] = React.useState<Array<{
        width: string;
        height: string;
        left: string;
        top: string;
        animationDuration: string;
        animationDelay: string;
    }>>([]);

    React.useEffect(() => {
        const newParticles = [...Array(20)].map(() => ({
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            animationDuration: 10 + Math.random() * 20 + 's',
            animationDelay: `-${Math.random() * 20}s`,
        }));
        setParticles(newParticles);
    }, []);

    const isDark = resolvedTheme === 'dark';
    // Dark mode: Orange, Light mode: Blue/Orange or Subtle Gray? 
    // Let's stick to Orange but maybe more subtle in light mode if needed.
    // For now, simple opacity adjustment.
    const particleOpacity = isDark ? 0.2 : 0.4;
    const gradient = isDark
        ? 'linear-gradient(135deg, #FF6B35, #FF8C42)' // Orange
        : 'linear-gradient(135deg, #f97316, #ea580c)'; // Slightly distinct orange for light

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: p.width,
                        height: p.height,
                        background: gradient,
                        left: p.left,
                        top: p.top,
                        opacity: particleOpacity,
                        animation: `float ${p.animationDuration} ease-in-out infinite`,
                        animationDelay: p.animationDelay,
                    }}
                />
            ))}
            <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: ${isDark ? 0.2 : 0.4}; }
          25% { transform: translateY(-30px) translateX(10px); opacity: ${isDark ? 0.4 : 0.6}; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: ${isDark ? 0.2 : 0.4}; }
          75% { transform: translateY(-40px) translateX(5px); opacity: ${isDark ? 0.3 : 0.5}; }
        }
      `}</style>
        </div>
    );
};
