import React from 'react';
import Image from 'next/image';

interface CBConnectLogoProps {
    size?: 'small' | 'default' | 'large';
    animated?: boolean;
}

export const CBConnectLogo: React.FC<CBConnectLogoProps> = ({ size = 'default', animated = false }) => {
    const sizes = {
        small: { width: 32, height: 32 },
        default: { width: 48, height: 48 },
        large: { width: 112, height: 112 },
    };
    const s = sizes[size];

    return (
        <Image
            src="/assets/cb-logo.png"
            alt="CB Connect Logo"
            width={s.width}
            height={s.height}
            className="object-contain rounded-2xl"
            priority
        />
    );
};
