'use client';

import React, { useState, useEffect } from 'react';
import { submitQuote } from '@/app/actions/submit-quote';
import { Loader2, CheckCircle, Send, User, Mail, Phone, Calculator, DollarSign } from 'lucide-react';

// Theme Utilities
const THEME_CLASSES = {
    orange: {
        text: 'text-orange-500',
        bg: 'bg-orange-500',
        bgHover: 'hover:bg-orange-600',
        bgLight: 'bg-orange-500/10',
        border: 'border-orange-500',
        borderLight: 'border-orange-500/20',
        ring: 'focus:ring-orange-500',
        focusBorder: 'focus:border-orange-500',
        shadow: 'shadow-orange-500/20'
    },
    blue: {
        text: 'text-blue-500',
        bg: 'bg-blue-500',
        bgHover: 'hover:bg-blue-600',
        bgLight: 'bg-blue-500/10',
        border: 'border-blue-500',
        borderLight: 'border-blue-500/20',
        ring: 'focus:ring-blue-500',
        focusBorder: 'focus:border-blue-500',
        shadow: 'shadow-blue-500/20'
    },
    green: {
        text: 'text-green-500',
        bg: 'bg-green-500',
        bgHover: 'hover:bg-green-600',
        bgLight: 'bg-green-500/10',
        border: 'border-green-500',
        borderLight: 'border-green-500/20',
        ring: 'focus:ring-green-500',
        focusBorder: 'focus:border-green-500',
        shadow: 'shadow-green-500/20'
    },
    purple: {
        text: 'text-purple-500',
        bg: 'bg-purple-500',
        bgHover: 'hover:bg-purple-600',
        bgLight: 'bg-purple-500/10',
        border: 'border-purple-500',
        borderLight: 'border-purple-500/20',
        ring: 'focus:ring-purple-500',
        focusBorder: 'focus:border-purple-500',
        shadow: 'shadow-purple-500/20'
    }
};

type ThemeColor = keyof typeof THEME_CLASSES;

interface QuoteFormProps {
    businessId: number;
    businessName: string;
    parameters: any[];
    previewMode?: boolean;
    theme?: ThemeColor;
}

export function QuoteForm({ businessId, businessName, parameters, previewMode = false, theme = 'orange' }: QuoteFormProps) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [contact, setContact] = useState({ name: '', email: '', phone: '' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [estimatedPrice, setEstimatedPrice] = useState<number>(0);

    const colors = THEME_CLASSES[theme] || THEME_CLASSES.orange;

    // Calculate Price Effect
    useEffect(() => {
        let total = 0;

        parameters.forEach(param => {
            const val = answers[param.label];
            if (!val) return;

            const logic = param.logic_config || {};

            if (param.field_type === 'number') {
                if (logic.multiplier) {
                    total += (parseFloat(val) || 0) * logic.multiplier;
                }
            } else if (param.field_type === 'checkbox') {
                if (val === 'Yes' && logic.price) {
                    total += logic.price;
                }
            } else if (param.field_type === 'select') {
                if (logic.prices && logic.prices[val]) {
                    total += logic.prices[val];
                }
            }
        });

        setEstimatedPrice(total);
    }, [answers, parameters]);

    const handleAnswerChange = (label: string, value: string) => {
        setAnswers(prev => ({ ...prev, [label]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (previewMode) {
            alert("This is a preview. Quote submission is disabled.");
            return;
        }

        setSubmitting(true);

        const payload = {
            customer_name: contact.name,
            customer_email: contact.email,
            customer_phone: contact.phone,
            answers: {
                ...answers,
                _calculated_estimate: estimatedPrice
            }
        };

        const result = await submitQuote(businessId, payload);

        if (result.success) {
            setSuccess(true);
        } else {
            alert(result.error);
        }
        setSubmitting(false);
    };

    if (success) {
        return (
            <div className="text-center py-12 animate-in fade-in zoom-in">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${colors.bgLight} ${colors.text}`}>
                    <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Quote Sent!</h2>
                <div className={`text-4xl font-bold my-4 ${colors.text}`}>
                    ${estimatedPrice.toLocaleString()}
                </div>
                <p className="text-gray-400">
                    Your estimated quote has been sent to <strong>{businessName}</strong>.
                </p>
                {previewMode && (
                    <button
                        onClick={() => setSuccess(false)}
                        className={`mt-6 text-sm underline hover:opacity-80 ${colors.text}`}
                    >
                        Reset Preview
                    </button>
                )}
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Live Estimate Header */}
            <div className={`bg-[#1A1A1A] border rounded-2xl p-6 flex items-center justify-between sticky top-4 z-10 backdrop-blur-xl bg-opacity-90 shadow-2xl ${colors.borderLight}`}>
                <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${colors.bgLight} ${colors.text}`}>
                        <Calculator size={24} />
                    </div>
                    <div>
                        <div className="text-xs text-gray-500 uppercase font-bold tracking-wider">Estimated Quote</div>
                        <div className="text-gray-300 text-xs">Based on your inputs</div>
                    </div>
                </div>
                <div className="text-3xl font-bold text-white font-mono">
                    ${estimatedPrice.toLocaleString()}
                </div>
            </div>

            {/* Dynamic Questions */}
            {parameters.length > 0 ? (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Project Details</h3>
                    {parameters.map(param => (
                        <div key={param.id || param.label} className="space-y-2">
                            {/* Use label as fallback key for preview if id missing */}
                            <label className="text-sm text-gray-300 font-medium flex justify-between">
                                <span>{param.label} {param.is_required && <span className={colors.text}>*</span>}</span>
                                {param.logic_config?.multiplier && <span className="text-xs text-gray-500 bg-gray-800 px-2 rounded">${param.logic_config.multiplier}/unit</span>}
                            </label>

                            {param.field_type === 'textarea' ? (
                                <textarea
                                    required={param.is_required}
                                    value={answers[param.label] || ''}
                                    onChange={e => handleAnswerChange(param.label, e.target.value)}
                                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none transition-colors min-h-[100px] ${colors.focusBorder}`}
                                />
                            ) : param.field_type === 'select' ? (
                                <select
                                    required={param.is_required}
                                    value={answers[param.label] || ''}
                                    onChange={e => handleAnswerChange(param.label, e.target.value)}
                                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none transition-colors appearance-none ${colors.focusBorder}`}
                                >
                                    <option value="">-- Select --</option>
                                    {param.options?.map((opt: string) => (
                                        <option key={opt} value={opt}>
                                            {opt}
                                            {param.logic_config?.prices?.[opt] ? ` (+$${param.logic_config.prices[opt]})` : ''}
                                        </option>
                                    ))}
                                </select>
                            ) : param.field_type === 'checkbox' ? (
                                <label className={`flex items-center gap-3 cursor-pointer bg-white/5 p-3 rounded-xl border border-white/10 transition-colors hover:border-opacity-50 ${colors.bgHover}/5`}>
                                    <input
                                        type="checkbox"
                                        checked={answers[param.label] === 'Yes'}
                                        onChange={e => handleAnswerChange(param.label, e.target.checked ? 'Yes' : 'No')}
                                        className={`rounded border-gray-600 bg-transparent focus:ring-0 w-5 h-5 ${colors.text}`}
                                    />
                                    <span className="text-gray-300">Yes</span>
                                    {param.logic_config?.price && <span className="ml-auto text-green-400 font-mono text-sm">+${param.logic_config.price}</span>}
                                </label>
                            ) : (
                                <input
                                    type={param.field_type}
                                    required={param.is_required}
                                    value={answers[param.label] || ''}
                                    onChange={e => handleAnswerChange(param.label, e.target.value)}
                                    className={`w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none transition-colors ${colors.focusBorder}`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10 text-gray-500 bg-white/5 rounded-xl border border-dashed border-white/10">
                    {previewMode ? "Add questions to see them here" : "No questions configured yet."}
                </div>
            )}

            {/* Contact Section */}
            <div className="space-y-4 pt-4 border-t border-white/10">
                <h3 className="text-lg font-semibold text-white border-b border-white/10 pb-2">Your Contact Info</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            required
                            placeholder="Full Name"
                            value={contact.name}
                            onChange={e => setContact({ ...contact, name: e.target.value })}
                            className={`w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none transition-colors ${colors.focusBorder}`}
                        />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            type="email"
                            required
                            placeholder="Email Address"
                            value={contact.email}
                            onChange={e => setContact({ ...contact, email: e.target.value })}
                            className={`w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none transition-colors ${colors.focusBorder}`}
                        />
                    </div>
                    <div className="relative">
                        <Phone className="absolute left-3 top-3 text-gray-500" size={18} />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            value={contact.phone}
                            onChange={e => setContact({ ...contact, phone: e.target.value })}
                            className={`w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none transition-colors ${colors.focusBorder}`}
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={submitting}
                className={`w-full text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 text-lg ${colors.bg} ${colors.bgHover} ${colors.shadow}`}
            >
                {submitting ? <Loader2 className="animate-spin" /> : <Send />}
                {submitting ? 'Submit Quote Request' : (previewMode ? `Preview Submit ($${estimatedPrice.toLocaleString()})` : `Submit & Save ($${estimatedPrice.toLocaleString()})`)}
            </button>
        </form>
    );
}
