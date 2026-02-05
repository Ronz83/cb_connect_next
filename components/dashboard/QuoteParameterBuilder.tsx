'use client';

import React, { useState } from 'react';
import { Plus, Trash2, Edit2, GripVertical, Check, X } from 'lucide-react';
import { upsertQuoteParameter, deleteQuoteParameter } from '@/app/actions/quote-parameters';
import { useRouter } from 'next/navigation';
import { QuoteForm } from '@/components/public/QuoteForm';

interface Parameter {
    id?: number;
    label: string;
    field_type: 'text' | 'number' | 'select' | 'textarea' | 'checkbox';
    options?: string; // Comma separated for UI
    is_required: boolean;
    display_order: number;
    logic_config?: {
        multiplier?: number;
        price?: number;
    };
}

const FIELD_TYPES = [
    { value: 'text', label: 'Short Text' },
    { value: 'textarea', label: 'Long Text' },
    { value: 'number', label: 'Number' },
    { value: 'select', label: 'Dropdown Selection' },
    { value: 'checkbox', label: 'Checkbox' },
];

export function QuoteParameterBuilder({ businessId, initialParameters }: { businessId: number, initialParameters: any[] }) {
    const [parameters, setParameters] = useState<any[]>(initialParameters);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [theme, setTheme] = useState<'orange' | 'blue' | 'green' | 'purple'>('orange');
    const router = useRouter();

    // Default new parameter state
    const [newItem, setNewItem] = useState<Parameter>({
        label: '',
        field_type: 'text',
        options: '',
        is_required: false,
        display_order: initialParameters.length
    });

    // Computed preview parameters (Existing + Work In Progress)
    const previewParams = React.useMemo(() => {
        const list = [...parameters];
        if (isAdding && newItem.label) {
            // Convert newItem options string to array for preview if needed
            // The QuoteForm expects 'options' as string[]? 
            // Wait, QuoteForm expects what?
            // "options": parameter.options ? parameter.options.split(',').map((o: string) => o.split(':')[0].trim()) : [],
            // The QuoteForm logic handles "options" as string[] usually.
            // Let's check QuoteForm... it maps param.options?.map.
            // But in DB it's array. In Builder state `newItem.options` is string.
            // We need to transform `newItem` to match the shape QuoteForm expects.

            const logic_config = newItem.logic_config || {};
            if (newItem.field_type === 'select' && newItem.options) {
                const rawOptions = newItem.options.split(',').map(s => s.trim());
                // Extract prices for logic_config
                const prices: Record<string, number> = {};
                const cleanOptions = rawOptions.map(o => {
                    const [opt, price] = o.split(':');
                    if (price) prices[opt.trim()] = parseFloat(price);
                    return opt.trim();
                });

                list.push({
                    ...newItem,
                    id: 9999, // Temp ID
                    options: cleanOptions, // Array of strings
                    logic_config: { ...logic_config, prices }
                });
            } else {
                list.push({ ...newItem, id: 9999 });
            }
        }
        return list;
    }, [parameters, isAdding, newItem]);


    const handleAdd = async () => {
        if (!newItem.label) return;
        setLoading(true);

        await upsertQuoteParameter(businessId, newItem);

        setIsAdding(false);
        setNewItem({ label: '', field_type: 'text', options: '', is_required: false, display_order: parameters.length + 1 });
        setLoading(false);
        router.refresh();
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Delete this field?')) return;
        await deleteQuoteParameter(id);
        router.refresh();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* LEFT COLUMN: Builder Controls */}
            <div className="space-y-6 order-2 lg:order-1">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">Form Builder</h2>
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Editor Mode</span>
                </div>

                {/* Theme Selector */}
                <div className="bg-[#111] border border-[#222] p-4 rounded-xl flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-300">Color Theme</span>
                    <div className="flex gap-2">
                        {(['orange', 'blue', 'green', 'purple'] as const).map(c => (
                            <button
                                key={c}
                                onClick={() => setTheme(c)}
                                className={`w-6 h-6 rounded-full border-2 transition-all ${theme === c ? 'border-white scale-110' : 'border-transparent opacity-50 hover:opacity-100'
                                    }`}
                                style={{ backgroundColor: c === 'orange' ? '#f97316' : c === 'blue' ? '#3b82f6' : c === 'green' ? '#22c55e' : '#a855f7' }}
                                aria-label={`Select ${c} theme`}
                            />
                        ))}
                    </div>
                </div>

                {/* List of Existing Parameters */}
                <div className="space-y-3">
                    {parameters.map((param, index) => (
                        <div key={param.id} className="bg-[#111] border border-[#222] p-4 rounded-xl flex items-center gap-4 group hover:border-orange-500/30 transition-all">
                            <div className="text-gray-600 cursor-move"><GripVertical size={20} /></div>

                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-white">{param.label}</span>
                                    {param.is_required && <span className="text-xs text-red-500 bg-red-500/10 px-2 py-0.5 rounded">Required</span>}
                                </div>
                                <div className="text-xs text-gray-500 uppercase mt-1">{param.field_type}</div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDelete(param.id)}
                                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}

                    {parameters.length === 0 && !isAdding && (
                        <div className="text-center py-12 border-2 border-dashed border-[#222] rounded-2xl bg-[#0A0A0A]">
                            <p className="text-gray-500 mb-4">No questions defined yet.</p>
                            <button
                                onClick={() => setIsAdding(true)}
                                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl text-sm font-medium transition-colors"
                            >
                                + Add First Question
                            </button>
                        </div>
                    )}
                </div>

                {/* Add New Form */}
                {isAdding && (
                    <div className="bg-[#1A1A1A] border border-orange-500/30 p-6 rounded-2xl animate-in slide-in-from-top-2 shadow-2xl shadow-orange-900/10 relative">
                        <div className="absolute -left-3 top-6 w-3 h-3 bg-[#1A1A1A] border-l border-t border-orange-500/30 rotate-45 lg:block hidden"></div>
                        <h3 className="font-semibold text-white mb-4">New Question</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="text-xs text-gray-400 block mb-1">Question Label</label>
                                <input
                                    value={newItem.label}
                                    onChange={e => setNewItem({ ...newItem, label: e.target.value })}
                                    placeholder="e.g. What is your estimated budget?"
                                    className="w-full bg-black border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none"
                                    autoFocus
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Answer Type</label>
                                    <select
                                        value={newItem.field_type}
                                        onChange={e => setNewItem({ ...newItem, field_type: e.target.value as any })}
                                        className="w-full bg-black border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none"
                                    >
                                        {FIELD_TYPES.map(t => (
                                            <option key={t.value} value={t.value}>{t.label}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-center">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={newItem.is_required}
                                            onChange={e => setNewItem({ ...newItem, is_required: e.target.checked })}
                                            className="rounded border-gray-600 bg-transparent text-orange-500 focus:ring-0"
                                        />
                                        <span className="text-sm text-gray-300">Required Field</span>
                                    </label>
                                </div>
                            </div>

                            {newItem.field_type === 'select' && (
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Options (format: "Option Name: Price increment")</label>
                                    <input
                                        value={newItem.options}
                                        onChange={e => setNewItem({ ...newItem, options: e.target.value })}
                                        placeholder="Standard: 0, Premium: 500, Deluxe: 1000"
                                        className="w-full bg-black border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none"
                                    />
                                    <p className="text-[10px] text-gray-500 mt-1">Example: "Asphalt: 0, Tile: 1200" (Adds $1200 if Tile selected)</p>
                                </div>
                            )}

                            {newItem.field_type === 'number' && (
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Price Multiplier ($ per unit)</label>
                                    <input
                                        type="number"
                                        value={newItem.logic_config?.multiplier || ''}
                                        onChange={e => setNewItem({ ...newItem, logic_config: { ...newItem.logic_config, multiplier: parseFloat(e.target.value) } })}
                                        placeholder="e.g. 5 (for $5 per sq ft)"
                                        className="w-full bg-black border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none"
                                    />
                                </div>
                            )}

                            {newItem.field_type === 'checkbox' && (
                                <div>
                                    <label className="text-xs text-gray-400 block mb-1">Add-on Price ($)</label>
                                    <input
                                        type="number"
                                        value={newItem.logic_config?.price || ''}
                                        onChange={e => setNewItem({ ...newItem, logic_config: { ...newItem.logic_config, price: parseFloat(e.target.value) } })}
                                        placeholder="e.g. 150"
                                        className="w-full bg-black border border-[#333] rounded-lg px-3 py-2 text-white text-sm focus:border-orange-500 outline-none"
                                    />
                                </div>
                            )}

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    onClick={() => setIsAdding(false)}
                                    className="px-4 py-2 text-gray-400 hover:text-white text-sm"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAdd}
                                    disabled={loading}
                                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : 'Add Question'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {!isAdding && parameters.length > 0 && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="w-full py-3 border border-dashed border-[#333] hover:border-orange-500/50 hover:bg-orange-500/5 text-gray-400 hover:text-orange-500 rounded-xl transition-all flex items-center justify-center gap-2 text-sm font-medium"
                    >
                        <Plus size={16} /> Add Another Question
                    </button>
                )}
            </div>

            {/* RIGHT COLUMN: Live Preview */}
            <div className="order-1 lg:order-2 sticky top-8">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-white">Live App Preview</h2>
                    <span className="text-xs bg-green-500/10 text-green-500 px-2 py-1 rounded-full animate-pulse border border-green-500/20">● Live Updates</span>
                </div>

                {/* Mobile Frame */}
                <div className="relative mx-auto border-gray-800 bg-gray-900 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl overflow-hidden ring ring-gray-900/50">
                    <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                    <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>

                    {/* Internal Screen */}
                    <div className="rounded-[2rem] overflow-hidden w-full h-full bg-[#050505] relative flex flex-col">
                        <div className="p-4 overflow-y-auto no-scrollbar pb-12">
                            <QuoteForm
                                businessId={businessId}
                                businessName="Your Business"
                                parameters={previewParams}
                                previewMode={true}
                                theme={theme}
                            />
                        </div>
                    </div>
                </div>
                <p className="text-center text-xs text-gray-500 mt-4">Previewing as Customer</p>
            </div>
        </div>
    );
}
