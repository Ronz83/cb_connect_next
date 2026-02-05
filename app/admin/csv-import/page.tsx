'use client';

import React, { useState, useRef } from 'react';
import { Upload, FileText, Check, AlertCircle, RefreshCw, Save, ArrowRight } from 'lucide-react';
import { parseCSV } from '@/utils/csv-parser';
import { importCSVData, ImportResult } from '@/app/actions/import-csv';

const REQUIRED_FIELDS = ['name'];
const OPTIONAL_FIELDS = ['email', 'phone', 'website', 'address', 'city', 'country', 'industry', 'description'];

// Map friendly names to DB fields
const FIELD_MAPPING_OPTIONS = [
    { label: 'Business Name', value: 'name', required: true },
    { label: 'Category / Industry', value: 'industry' },
    { label: 'Email', value: 'contact_email' },
    { label: 'Phone', value: 'phone' },
    { label: 'Website', value: 'website' },
    { label: 'Address', value: 'address' },
    { label: 'City', value: 'city' },
    { label: 'Country (Code)', value: 'country' },
    { label: 'Description', value: 'description' },
    { label: '-- Ignore --', value: '' }
];

export default function CSVImportPage() {
    const [file, setFile] = useState<File | null>(null);
    const [rawData, setRawData] = useState<any[]>([]);
    const [headers, setHeaders] = useState<string[]>([]);
    const [columnMapping, setColumnMapping] = useState<Record<string, string>>({});
    const [step, setStep] = useState(1); // 1: Upload, 2: Map & Preview, 3: Importing
    const [importing, setImporting] = useState(false);
    const [result, setResult] = useState<ImportResult | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        const text = await selectedFile.text();
        const data = parseCSV(text);

        if (data.length > 0) {
            setRawData(data);
            setHeaders(Object.keys(data[0]));
            // Auto-guess mapping
            const cleanHeaders = Object.keys(data[0]).map(h => h.toLowerCase());
            const newMapping: Record<string, string> = {};

            Object.keys(data[0]).forEach(header => {
                const h = header.toLowerCase();
                if (h.includes('name')) newMapping[header] = 'name';
                else if (h.includes('email')) newMapping[header] = 'contact_email';
                else if (h.includes('phone')) newMapping[header] = 'phone';
                else if (h.includes('web') || h.includes('url')) newMapping[header] = 'website';
                else if (h.includes('add')) newMapping[header] = 'address';
                else if (h.includes('city')) newMapping[header] = 'city';
                else if (h.includes('country')) newMapping[header] = 'country';
                else if (h.includes('ind') || h.includes('cat') || h.includes('type')) newMapping[header] = 'industry';
            });
            setColumnMapping(newMapping);
            setStep(2);
        }
    };

    const handleMappingChange = (header: string, mappedField: string) => {
        setColumnMapping(prev => ({ ...prev, [header]: mappedField }));
    };

    const executeImport = async () => {
        setImporting(true);

        // Transform data based on mapping
        const transformedData = rawData.map(row => {
            const newRow: any = {};
            Object.keys(columnMapping).forEach(header => {
                const targetField = columnMapping[header];
                if (targetField) {
                    newRow[targetField] = row[header];
                }
            });
            return newRow;
        });

        // Filter out rows without required name
        const validData = transformedData.filter(r => r.name && r.name.trim() !== '');

        try {
            const res = await importCSVData(validData);
            setResult(res);
            setStep(3);
        } catch (err) {
            console.error(err);
            alert("Import Failed");
        } finally {
            setImporting(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto text-white">
            <h1 className="text-3xl font-bold flex items-center gap-3 mb-2">
                <FileText className="text-orange-500" size={32} />
                Import Businesses via CSV
            </h1>
            <p className="text-gray-400 mb-8">Upload a list of businesses to bulk import them into the database.</p>

            {/* Step 1: Upload */}
            {step === 1 && (
                <div
                    className="border-2 border-dashed border-white/20 rounded-2xl p-12 flex flex-col items-center justify-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <Upload size={48} className="text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Drop your CSV file here</h3>
                    <p className="text-gray-500 mb-6">or click to browse</p>
                    <input
                        type="file"
                        accept=".csv"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                    />
                    <button className="bg-orange-500 text-white px-6 py-2 rounded-lg font-medium">Select File</button>
                </div>
            )}

            {/* Step 2: Map & Preview */}
            {step === 2 && (
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Map Columns</h3>
                            <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white text-sm">Change File</button>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {headers.map(header => (
                                <div key={header} className="bg-black/40 p-3 rounded-lg border border-white/10">
                                    <label className="text-xs text-orange-400 font-medium block mb-1 truncate" title={header}>{header}</label>
                                    <select
                                        value={columnMapping[header] || ''}
                                        onChange={(e) => handleMappingChange(header, e.target.value)}
                                        className="w-full bg-black border border-white/20 text-sm rounded px-2 py-1 text-white focus:border-orange-500 outline-none"
                                    >
                                        {FIELD_MAPPING_OPTIONS.map(opt => (
                                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                                        ))}
                                    </select>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <div className="p-4 border-b border-white/10 bg-black/20">
                            <h3 className="font-semibold text-sm uppercase text-gray-400">Preview ({rawData.length} rows)</h3>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm text-gray-300">
                                <thead className="bg-black/40 text-gray-500 text-xs uppercase">
                                    <tr>
                                        {headers.map(h => (
                                            <th key={h} className="p-3 whitespace-nowrap">{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {rawData.slice(0, 5).map((row, i) => (
                                        <tr key={i}>
                                            {headers.map(h => (
                                                <td key={h} className="p-3 truncate max-w-[200px]">{row[h]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            onClick={executeImport}
                            disabled={importing}
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-green-600/20"
                        >
                            {importing ? <RefreshCw className="animate-spin" /> : <Save />}
                            {importing ? "Importing..." : "Run Import"}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Result */}
            {step === 3 && result && (
                <div className="max-w-xl mx-auto text-center py-12">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 border border-green-500/20">
                        <Check size={40} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Import Complete!</h2>
                    <p className="text-gray-400 mb-8">Your data has been processed.</p>

                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-green-900/20 border border-green-500/30 p-4 rounded-xl">
                            <div className="text-2xl font-bold text-green-400">{result.success}</div>
                            <div className="text-sm text-green-200/60">Successful</div>
                        </div>
                        <div className="bg-red-900/20 border border-red-500/30 p-4 rounded-xl">
                            <div className="text-2xl font-bold text-red-400">{result.failed}</div>
                            <div className="text-sm text-red-200/60">Failed</div>
                        </div>
                    </div>

                    {result.errors.length > 0 && (
                        <div className="bg-black/40 rounded-xl p-4 text-left max-h-40 overflow-y-auto border border-white/10 mb-8">
                            <h4 className="text-red-400 font-medium text-sm mb-2">Error Log:</h4>
                            {result.errors.map((e, i) => (
                                <div key={i} className="text-xs text-mono text-gray-400">{e}</div>
                            ))}
                        </div>
                    )}

                    <button
                        onClick={() => {
                            setStep(1);
                            setFile(null);
                            setRawData([]);
                            setResult(null);
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 py-2 rounded-lg"
                    >
                        Import Another File
                    </button>
                </div>
            )}
        </div>
    );
}
