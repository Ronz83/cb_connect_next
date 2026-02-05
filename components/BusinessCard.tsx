'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Star, Building2 } from 'lucide-react';
import { industries } from '@/data/industries';
import { countries } from '@/data/countries';
import { themes } from '@/lib/themes';

import Link from 'next/link';

interface BusinessCardProps {
    business: any;
    onVoiceChat: (business: any) => void;
    onTextChat: (business: any) => void;
    index?: number;
    theme: 'dark' | 'light';
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onVoiceChat, onTextChat, index = 0, theme }) => {
    const country = countries.find(c => c.code === business.country);
    const IndustryIcon = industries.find(i => i.id === business.industry)?.icon || Building2;
    const [isHovered, setIsHovered] = useState(false);
    const t = themes[theme];

    return (
        <div
            className="rounded-2xl p-5 mb-4 transition-all duration-500 cursor-pointer relative overflow-hidden group"
            style={{
                background: isHovered ? t.bgCardHover : t.bgCard,
                boxShadow: isHovered
                    ? `0 8px 32px rgba(255,107,53,0.15), 0 4px 24px rgba(0,0,0,${theme === 'dark' ? '0.3' : '0.1'})`
                    : `0 4px 24px rgba(0,0,0,${theme === 'dark' ? '0.3' : '0.08'})`,
                border: isHovered ? `1px solid ${t.borderHover}` : `1px solid ${t.border}`,
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                animation: `slide-up 0.5s ease-out ${index * 0.1}s both`,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Hover gradient overlay */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: 'radial-gradient(circle at top right, rgba(255,107,53,0.08) 0%, transparent 60%)',
                }}
            />

            {/* Header with logo and name */}
            <div className="flex items-start gap-4 mb-3 relative z-10">
                <div className="relative">
                    <Link href={`/business/${business.id}`}>
                        <img
                            src={business.logo}
                            alt={business.name}
                            className="w-16 h-16 rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
                        />
                    </Link>
                    {/* Online indicator */}
                    <div
                        className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ background: t.bgSolid }}
                    >
                        <div className="w-3 h-3 rounded-full bg-green-500" style={{ boxShadow: '0 0 8px rgba(34,197,94,0.6)' }} />
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <Link href={`/business/${business.id}`}>
                        <h3
                            className="font-medium text-lg leading-tight mb-1 group-hover:text-orange-500 transition-colors hover:underline"
                            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif", color: t.text }}
                        >
                            {business.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-2 text-sm" style={{ color: t.textSecondary }}>
                        <IndustryIcon className="w-4 h-4 text-orange-400" />
                        <span>{industries.find(i => i.id === business.industry)?.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs mt-1" style={{ color: t.textMuted }}>
                        <MapPin className="w-3 h-3" />
                        <span>{business.address}</span>
                        <span className="ml-1">{country?.flag}</span>
                    </div>
                </div>

                {/* Featured badge for some businesses */}
                {index === 0 && (
                    <div
                        className="flex items-center gap-1 px-2 py-1 rounded-full text-xs"
                        style={{
                            background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,140,66,0.2) 100%)',
                            border: '1px solid rgba(255,107,53,0.3)'
                        }}
                    >
                        <Star className="w-3 h-3 text-orange-400" fill="#FF6B35" />
                        <span className="text-orange-400">Featured</span>
                    </div>
                )}
            </div>

            {/* Description */}
            <p className="text-sm mb-3 line-clamp-2 relative z-10" style={{ color: t.textSecondary }}>{business.description}</p>

            {/* Services tags */}
            <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                {business.services.slice(0, 3).map((service: string, idx: number) => (
                    <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-medium transition-all duration-300 hover:scale-105"
                        style={{
                            background: theme === 'dark' ? 'rgba(255,107,53,0.1)' : 'rgba(255,107,53,0.08)',
                            color: '#FF6B35',
                            border: '1px solid rgba(255,107,53,0.15)'
                        }}
                    >
                        {service}
                    </span>
                ))}
                {business.services.length > 3 && (
                    <span className="px-3 py-1 rounded-lg text-xs" style={{ color: t.textMuted }}>
                        +{business.services.length - 3} more
                    </span>
                )}
            </div>

            {/* Chat buttons */}
            <div className="flex gap-3 relative z-10">
                <button
                    onClick={(e) => { e.stopPropagation(); onVoiceChat(business); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-white transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group/btn"
                    style={{
                        background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)',
                        boxShadow: '0 4px 16px rgba(255,107,53,0.35)',
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                >
                    <Phone className="w-4 h-4 group-hover/btn:animate-pulse" />
                    <span className="text-sm tracking-tight">Call</span>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); onTextChat(business); }}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] group/btn"
                    style={{
                        background: t.bgPill,
                        color: '#FF6B35',
                        border: '1px solid rgba(255,107,53,0.2)',
                        fontFamily: "'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif"
                    }}
                >
                    <MessageCircle className="w-4 h-4 group-hover/btn:animate-pulse" />
                    <span className="text-sm tracking-tight">Text Chat</span>
                </button>
            </div>
            <style>{`
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
};
