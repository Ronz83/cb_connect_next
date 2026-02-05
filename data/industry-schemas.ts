// Standard Industry Schemas for BizCompare
// These define the "Common Denominator" questions for each industry
// ensuring apples-to-apples comparison across businesses.

export interface StandardField {
    key: string;
    label: string;
    type: 'number' | 'select' | 'boolean';
    options?: string[]; // For select types
    unit?: string; // e.g. 'sq ft', 'hours'
}

export interface IndustrySchema {
    id: string;
    label: string;
    fields: StandardField[];
}

export const INDUSTRY_SCHEMAS: Record<string, IndustrySchema> = {
    roofing: {
        id: 'roofing',
        label: 'Roofing Services',
        fields: [
            {
                key: 'area',
                label: 'Estimated Roof Area',
                type: 'number',
                unit: 'sq ft'
            },
            {
                key: 'material',
                label: 'Preferred Material',
                type: 'select',
                options: ['Asphalt Shingles', 'Metal', 'Tile', 'Flat/TPO']
            },
            {
                key: 'stories',
                label: 'Number of Stories',
                type: 'select',
                options: ['1 Story', '2 Stories', '3+ Stories']
            },
            {
                key: 'tear_off',
                label: 'Need Old Roof Removed?',
                type: 'boolean'
            }
        ]
    },
    plumbing: {
        id: 'plumbing',
        label: 'Plumbing Services',
        fields: [
            {
                key: 'service_type',
                label: 'Service Needed',
                type: 'select',
                options: ['Leak Repair', 'Pipe Installation', 'Drain Cleaning', 'Water Heater']
            },
            {
                key: 'emergency',
                label: 'Is this an Emergency?',
                type: 'boolean'
            },
            {
                key: 'hours',
                label: 'Estimated Hours (if known)',
                type: 'number',
                unit: 'hrs'
            }
        ]
    },
    web_design: {
        id: 'web_design',
        label: 'Web Design & Development',
        fields: [
            {
                key: 'page_count',
                label: 'Number of Pages',
                type: 'number'
            },
            {
                key: 'functionality',
                label: 'Key Features',
                type: 'select',
                options: ['Informational Only', 'E-commerce', 'Booking System', 'Membership']
            },
            {
                key: 'design_level',
                label: 'Design Tier',
                type: 'select',
                options: ['Template', 'Custom Design', 'Premium Brand']
            }
        ]
    }
};

// Helper: Get schema by fuzzy search on business industry string
export function getSchemaForIndustry(industryIndex: string): IndustrySchema | null {
    const normalized = industryIndex.toLowerCase();
    if (normalized.includes('roof')) return INDUSTRY_SCHEMAS.roofing;
    if (normalized.includes('plumb')) return INDUSTRY_SCHEMAS.plumbing;
    if (normalized.includes('web') || normalized.includes('software')) return INDUSTRY_SCHEMAS.web_design;
    return null;
}
