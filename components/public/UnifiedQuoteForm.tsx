'use client';

import React, { useState } from 'react';
import { IndustrySchema } from '@/data/industry-schemas';
import { Loader2, CheckCircle, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

interface UnifiedQuoteFormProps {
    schema: IndustrySchema;
    businesses: any[];
}

export function UnifiedQuoteForm({ schema, businesses }: UnifiedQuoteFormProps) {
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [step, setStep] = useState<'form' | 'processing' | 'results'>('form');
    const [results, setResults] = useState<any[]>([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStep('processing');

        // Simulate "Thinking" / Engine Calculation
        setTimeout(() => {
            // MOCK LOGIC: Generate random estimates based on inputs
            // In real world, this would call each business's `logic_config`
            const mockResults = businesses.map(b => {
                const base = Math.floor(Math.random() * 2000) + 1000;
                return {
                    business: b,
                    estimate: base,
                    score: (Math.random() * 1.5 + 3.5).toFixed(1) // 3.5 - 5.0
                };
            }).sort((a, b) => a.estimate - b.estimate); // Show cheapest first

            setResults(mockResults);
            setStep('results');
        }, 1500);
    };

    if (step === 'processing') {
        return (
            <div className="text-center py-20">
                <Loader2 className="animate-spin w-16 h-16 text-orange-500 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Analyzing Requests...</h3>
                <p className="text-gray-500">Checking availability and calculating estimates...</p>
            </div>
        );
    }

    if (step === 'results') {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 text-green-500">
                        <CheckCircle size={32} />
                    </div>
                    <h2 className="text-2xl font-bold text-white">We found {results.length} Matches!</h2>
                    <p className="text-gray-400">Here are your estimated quotes.</p>
                </div>

                <div className="space-y-4">
                    {results.map((res, idx) => (
                        <div key={res.business.id} className={`bg-[#0A0A0A] border rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 ${idx === 0 ? 'border-orange-500/50 shadow-lg shadow-orange-500/10' : 'border-[#222]'}`}>
                            <div className="flex-1">
                                {idx === 0 && <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2 py-1 rounded mb-2 inline-block">BEST VALUE</span>}
                                <h3 className="text-xl font-bold text-white">{res.business.name}</h3>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                    <span className="flex items-center text-yellow-500"><Star size={12} fill="currentColor" /> {res.score}</span>
                                    <span>•</span>
                                    <span>{res.business.address}</span>
                                </div>
                            </div>

                            <div className="text-center md:text-right">
                                <div className="text-sm text-gray-400 mb-1">Estimated Quote</div>
                                <div className="text-3xl font-bold text-white font-mono">${res.estimate.toLocaleString()}</div>
                            </div>

                            <Link
                                href={`/business/${res.business.id}#quote`}
                                className={`px-6 py-3 rounded-lg font-bold text-sm transition-colors ${idx === 0 ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-[#222] hover:bg-[#333] text-gray-300'}`}
                            >
                                Book Now
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center pt-8">
                    <button onClick={() => setStep('form')} className="text-gray-500 hover:text-white text-sm">
                        Start Over
                    </button>
                </div>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {schema.fields.map(field => (
                <div key={field.key} className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                        {field.label}
                    </label>

                    {field.type === 'select' ? (
                        <select
                            required
                            className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors"
                            style={{ colorScheme: 'dark' }}
                            onChange={e => setAnswers({ ...answers, [field.key]: e.target.value })}
                        >
                            <option value="" className="bg-[#0A0A0A] text-white">Select an option</option>
                            {field.options?.map(opt => (
                                <option key={opt} value={opt} className="bg-[#0A0A0A] text-white">{opt}</option>
                            ))}
                        </select>
                    ) : field.type === 'boolean' ? (
                        <div className="flex gap-4">
                            <label className={`flex-1 border border-[#333] rounded-xl p-4 cursor-pointer hover:bg-[#0A0A0A] transition-colors ${answers[field.key] === true ? 'border-orange-500 bg-orange-500/10' : 'bg-[#0A0A0A]'}`}>
                                <input type="radio" name={field.key} className="hidden" onChange={() => setAnswers({ ...answers, [field.key]: true })} />
                                <span className={answers[field.key] === true ? 'text-orange-500 font-bold' : 'text-gray-400'}>Yes</span>
                            </label>
                            <label className={`flex-1 border border-[#333] rounded-xl p-4 cursor-pointer hover:bg-[#0A0A0A] transition-colors ${answers[field.key] === false ? 'border-orange-500 bg-orange-500/10' : 'bg-[#0A0A0A]'}`}>
                                <input type="radio" name={field.key} className="hidden" onChange={() => setAnswers({ ...answers, [field.key]: false })} />
                                <span className={answers[field.key] === false ? 'text-orange-500 font-bold' : 'text-gray-400'}>No</span>
                            </label>
                        </div>
                    ) : (
                        <div className="relative">
                            <input
                                type="number"
                                required
                                placeholder="0"
                                className="w-full bg-[#0A0A0A] border border-[#333] rounded-xl px-4 py-3 text-white outline-none focus:border-orange-500 transition-colors"
                                onChange={e => setAnswers({ ...answers, [field.key]: e.target.value })}
                            />
                            {field.unit && <span className="absolute right-4 top-3 text-gray-500">{field.unit}</span>}
                        </div>
                    )}
                </div>
            ))}

            <button
                type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 text-lg mt-8"
            >
                Get My Quotes <ArrowRight size={20} />
            </button>
        </form>
    );
}
