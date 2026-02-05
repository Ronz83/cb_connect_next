
const GHL_API_BASE = 'https://services.leadconnectorhq.com';

export interface GHLAccountConfig {
    name: string;
    token: string;
    locationId: string;
}

export const GHL_ACCOUNTS: GHLAccountConfig[] = [
    {
        name: 'Nexus NWS',
        token: process.env.NEXT_PUBLIC_GHL_ACCESS_TOKEN_NWS || '',
        locationId: process.env.NEXT_PUBLIC_GHL_LOCATION_ID_NWS || ''
    },
    {
        name: 'Nexus CB',
        token: process.env.NEXT_PUBLIC_GHL_ACCESS_TOKEN_CB || '',
        locationId: process.env.NEXT_PUBLIC_GHL_LOCATION_ID_CB || ''
    }
];

export class GHLClient {
    private token: string;
    private locationId: string;
    private version: string;

    constructor(token?: string, locationId?: string) {
        // Default to the first account (Nexus NWS) if not provided
        const defaultAccount = GHL_ACCOUNTS[0];
        this.token = token || defaultAccount.token;
        this.locationId = locationId || defaultAccount.locationId;
        this.version = '2021-07-28';
    }

    private async request(endpoint: string, options: RequestInit = {}) {
        const url = `${GHL_API_BASE}${endpoint}`;

        if (!this.token) throw new Error("Missing Access Token");

        const headers = new Headers(options.headers);
        headers.set('Authorization', `Bearer ${this.token}`);
        headers.set('Version', this.version);
        headers.set('Accept', 'application/json');

        const config: RequestInit = {
            ...options,
            headers,
        };

        const response = await fetch(url, config);

        if (!response.ok) {
            const errorBody = await response.text();
            throw new Error(`GHL API Error: ${response.status} ${response.statusText} - ${errorBody}`);
        }

        return response.json();
    }

    async getContacts(limit = 20) {
        const query = new URLSearchParams({
            locationId: this.locationId,
            limit: limit.toString()
        });
        return this.request(`/contacts/?${query.toString()}`);
    }

    async getOpportunities(pipelineId?: string) {
        const query = new URLSearchParams({
            locationId: this.locationId,
        });
        if (pipelineId) query.append('pipelineId', pipelineId);
        return this.request(`/opportunities/search?${query.toString()}`);
    }
}

// Default instance (Nexus NWS)
export const ghl = new GHLClient();
