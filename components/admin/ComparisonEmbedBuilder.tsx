'use client';

import React, { useState, useEffect } from 'react';
import { Copy, Check, Code, Zap, Eye } from 'lucide-react';
import { INDUSTRY_SCHEMAS } from '@/data/industry-schemas';

export function ComparisonEmbedBuilder() {
    const [industry, setIndustry] = useState('roofing');
    const [location, setLocation] = useState('New York');
    const [width, setWidth] = useState('100%');
    const [height, setHeight] = useState('600');
    const [copied, setCopied] = useState(false);
    const [origin, setOrigin] = useState('');

    useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    const embedUrl = `${origin}/embed/compare?industry=${encodeURIComponent(industry)}&location=${encodeURIComponent(location)}`;
    const iframeCode = `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" style="border:none; overflow:hidden; border-radius: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.1);"></iframe>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(iframeCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#111] border border-[#222] rounded-2xl p-6">
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Zap className="text-orange-500" size={24} />
                        Comparison Widget Builder
                    </h3>
                    <p className="text-gray-400 text-sm mt-1 max-w-lg">
                        Generate a "Multi-Quote" widget for your partners. When they embed this, their traffic can instantly compare prices in the selected industry.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Default Industry</label>
                        <select
                            value={industry}
                            onChange={(e) => setIndustry(e.target.value)}
                            className="w-full bg-black border border-[#333] rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500"
                            style={{ colorScheme: 'dark' }}
                        >
                            {Object.values(INDUSTRY_SCHEMAS).map(schema => (
                                <option key={schema.id} value={schema.id}>{schema.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Default Location (Optional)</label>
                        <input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="e.g. Los Angeles, CA"
                            className="w-full bg-black border border-[#333] rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Width</label>
                            <input
                                value={width}
                                onChange={(e) => setWidth(e.target.value)}
                                className="w-full bg-black border border-[#333] rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Height (px)</label>
                            <input
                                value={height}
                                onChange={(e) => setHeight(e.target.value)}
                                className="w-full bg-black border border-[#333] rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <div className="relative">
                            <pre className="bg-black border border-[#333] rounded-xl p-4 text-xs text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap break-all pr-12">
                                {iframeCode}
                            </pre>
                            <button
                                onClick={handleCopy}
                                className="absolute top-2 right-2 p-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors"
                                title="Copy Code"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Preview */}
                <div className="border border-[#222] rounded-2xl bg-[#050505] p-1 flex flex-col">
                    <div className="bg-[#111] px-3 py-2 rounded-t-xl flex items-center gap-2 border-b border-[#222]">
                        <Eye size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Live Preview</span>
                    </div>

                    <div className="flex-1 bg-[url('/grid.svg')] relative flex items-center justify-center p-4">
                        {origin ? (
                            <iframe
                                src={embedUrl}
                                width="100%"
                                height={height}
                                className="bg-transparent border-0 rounded-xl shadow-2xl"
                                style={{ transform: 'scale(0.9)', transformOrigin: 'top center' }}
                            />
                        ) : (
                            <div className="animate-pulse text-gray-500 text-sm">Loading Preview...</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
