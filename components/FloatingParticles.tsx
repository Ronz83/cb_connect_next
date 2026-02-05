'use client';

import React from 'react';
import { themes } from '@/lib/themes'; // We will create this

export const FloatingParticles = ({ theme }: { theme: 'dark' | 'light' }) => {
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

    const particleOpacity = theme === 'dark' ? 0.2 : 0.3;

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((p, i) => (
                <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: p.width,
                        height: p.height,
                        background: `linear-gradient(135deg, #FF6B35, #FF8C42)`,
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
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-30px) translateX(10px); opacity: 0.4; }
          50% { transform: translateY(-10px) translateX(-10px); opacity: 0.2; }
          75% { transform: translateY(-40px) translateX(5px); opacity: 0.3; }
        }
      `}</style>
        </div>
    );
};
