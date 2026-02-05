'use client';

import React, { useState } from 'react';
import { Copy, Check, Code } from 'lucide-react';

export function EmbedCodeGenerator({ businessId }: { businessId: number }) {
    const [copied, setCopied] = useState(false);

    // Construct the URL. In production this would be the actual domain.
    // For now we use window.location.origin if available, or a placeholder.
    // Since this is SSR initially, we can't grab origin easily unless we use useEffect.
    // Or we just rely on relative paths for the display? No, iframe needs full URL ideally or absolute path.
    // MVP: Use a placeholder or relative path if same domain.

    // Let's assume localhost for dev, but we want it to work in prod.
    // We'll generate a script that points to the current origin.
    const [origin, setOrigin] = useState('');

    React.useEffect(() => {
        setOrigin(window.location.origin);
    }, []);

    const embedUrl = `${origin}/embed/quote/${businessId}`;
    const iframeCode = `<iframe src="${embedUrl}" width="100%" height="600" frameborder="0" style="border:none; overflow:hidden; border-radius: 1rem;"></iframe>`;

    const handleCopy = () => {
        navigator.clipboard.writeText(iframeCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-[#111] border border-[#222] rounded-2xl p-6 mt-8">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                        <Code className="text-orange-500" size={20} />
                        Embed Widget
                    </h3>
                    <p className="text-gray-400 text-sm mt-1">
                        Copy this code to add the Quote Calculator to your own website.
                    </p>
                </div>
            </div>

            <div className="relative">
                <pre className="bg-black border border-[#333] rounded-xl p-4 text-xs text-gray-300 font-mono overflow-x-auto whitespace-pre-wrap break-all">
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

            <div className="mt-4 flex items-center gap-2 text-xs text-blue-400 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                <span className="font-bold">Preview:</span>
                <a href={`/embed/quote/${businessId}`} target="_blank" className="underline hover:text-blue-300">
                    Open minimal version in new tab
                </a>
            </div>
        </div>
    );
}
