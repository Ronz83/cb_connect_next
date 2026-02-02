'use client';

import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';
import { themes } from '@/lib/themes';

interface ChatPopupProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'voice' | 'text' | null;
    business: any;
    theme: 'dark' | 'light';
}

export const ChatPopup: React.FC<ChatPopupProps> = ({ isOpen, onClose, type, business, theme }) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const t = themes[theme];

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
        }
    }, [isOpen]);

    if (!isOpen || !business) return null;

    return (
        <div
            className="fixed inset-0 z-[70] flex items-center justify-center p-4"
            style={{ backgroundColor: t.overlayBg }}
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-md rounded-2xl overflow-hidden shadow-2xl"
                style={{
                    background: t.bgDropdown,
                    height: '70vh',
                    maxHeight: '600px',
                    border: `1px solid ${t.border}`,
                    animation: isAnimating ? 'scale-in 0.3s ease-out' : 'none',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className="p-4 flex items-center justify-between relative overflow-hidden"
                    style={{
                        background: 'linear-gradient(90deg, #FF6B35 0%, #FF8C42 100%)',
                    }}
                >
                    {/* Animated background pattern */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: 'radial-gradient(circle at 20% 50%, white 1px, transparent 1px)',
                            backgroundSize: '20px 20px',
                        }}
                    />
                    <div className="flex items-center gap-3 relative z-10">
                        <img
                            src={business.logo}
                            alt={business.name}
                            className="w-12 h-12 rounded-xl object-cover border-2 border-white/20"
                        />
                        <div>
                            <h3
                                className="font-medium text-white text-base tracking-tight"
                                style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                            >
                                {business.name}
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                <p className="text-white/80 text-xs">{type === 'voice' ? 'Call' : 'Text Chat'} • Online</p>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors relative z-10"
                    >
                        <X className="w-5 h-5 text-white" />
                    </button>
                </div>

                {/* Chat Area - Demo placeholder */}
                <div className="flex-1 p-6 flex flex-col items-center justify-center text-center" style={{ height: 'calc(100% - 72px)' }}>
                    <div
                        className="w-20 h-20 rounded-full flex items-center justify-center mb-4"
                        style={{ background: 'linear-gradient(135deg, #FF6B35 0%, #FF8C42 100%)' }}
                    >
                        {type === 'voice' ? (
                            <Phone className="w-10 h-10 text-white" />
                        ) : (
                            <MessageCircle className="w-10 h-10 text-white" />
                        )}
                    </div>
                    <h4 className="text-white font-semibold text-lg mb-2">
                        {type === 'voice' ? 'Call Ready' : 'Text Chat Ready'}
                    </h4>
                    <p className="text-gray-400 text-sm mb-6 max-w-xs">
                        {type === 'voice'
                            ? 'Click below to start a call with our AI assistant.'
                            : 'Start typing below to chat with our AI assistant.'
                        }
                    </p>

                    {/* Demo message showing embed code info */}
                    <div className="bg-white/5 rounded-2xl p-4 w-full">
                        <p className="text-gray-500 text-xs mb-2">Embed Code Reference:</p>
                        <code className="text-orange-400 text-xs font-mono">
                            {type === 'voice' ? business.voiceChatEmbed : business.textChatEmbed}
                        </code>
                        <p className="text-gray-500 text-xs mt-3">
                            In production, the NWS chatbot widget will load here automatically.
                        </p>
                    </div>
                </div>
            </div>
            <style>{`
        @keyframes scale-in {
          0% { opacity: 0; transform: scale(0.9); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
};
