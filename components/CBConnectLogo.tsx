import React from 'react';

interface CBConnectLogoProps {
    size?: 'small' | 'default' | 'large';
    animated?: boolean;
}

export const CBConnectLogo: React.FC<CBConnectLogoProps> = ({ size = 'default', animated = false }) => {
    const sizes = {
        small: { wrapper: 'w-8 h-8' },
        default: { wrapper: 'w-12 h-12' },
        large: { wrapper: 'w-28 h-28' },
    };
    const s = sizes[size];

    return (
        <div
            className={`${s.wrapper} relative flex items-center justify-center`}
        >
            {/* SVG Blue Orb Logo */}
            <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                style={{
                    filter: 'drop-shadow(0 0 15px rgba(14,165,233,0.5))',
                    overflow: 'visible'
                }}
            >
                <defs>
                    <linearGradient id="orbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7DD3FC" /> {/* sky-300 */}
                        <stop offset="100%" stopColor="#0284C7" /> {/* sky-600 */}
                    </linearGradient>
                    <radialGradient id="glowRadial" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="rgba(56, 189, 248, 0.8)" />
                        <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
                    </radialGradient>
                </defs>

                {/* Outer Glow Area */}
                {animated && (
                    <circle cx="50" cy="50" r="45" fill="url(#glowRadial)">
                        <animate attributeName="opacity" values="0.5;0.8;0.5" dur="3s" repeatCount="indefinite" />
                    </circle>
                )}

                {/* Central Orb */}
                <circle cx="50" cy="50" r="25" fill="url(#orbGradient)" stroke="#E0F2FE" strokeWidth="1">
                    {animated && <animate attributeName="r" values="25;26;25" dur="3s" repeatCount="indefinite" />}
                </circle>

                {/* Inner Detail - Energy Swirls */}
                <path d="M50 25 Q 65 25 65 50 T 50 75" fill="none" stroke="#E0F2FE" strokeWidth="1" opacity="0.5" />
                <path d="M50 25 Q 35 25 35 50 T 50 75" fill="none" stroke="#E0F2FE" strokeWidth="1" opacity="0.5" />

                {/* Orbiting Rings */}
                <ellipse cx="50" cy="50" rx="38" ry="12" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="20 15" opacity="0.8">
                    <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="8s" repeatCount="indefinite" />
                </ellipse>

                <ellipse cx="50" cy="50" rx="38" ry="12" fill="none" stroke="#7DD3FC" strokeWidth="1.5" strokeDasharray="10 20" opacity="0.6">
                    <animateTransform attributeName="transform" type="rotate" from="360 50 50" to="0 50 50" dur="12s" repeatCount="indefinite" />
                </ellipse>
            </svg>
        </div>
    );
};
