
const GHL_API_VERSION = '2021-07-28';
const BASE_URL = 'https://services.leadconnectorhq.com';

// Define types for GHL objects
export interface GHLContact {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    tags?: string[];
    customFields?: { id: string; value: any }[];
}

export interface GHLSubAccount {
    id: string;
    name: string;
    email: string;
    address?: string;
}

export class GHLClient {
    private token: string;

    constructor(token: string) {
        this.token = token;
    }

    private async request(path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) {
        const headers = {
            'Authorization': `Bearer ${this.token}`,
            'Version': GHL_API_VERSION,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };

        const response = await fetch(`${BASE_URL}${path}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`GHL API Error [${response.status}]: ${JSON.stringify(error)}`);
        }

        return await response.json();
    }

    // --- Contacts ---

    async getContacts(locationId: string, query?: string) {
        return this.request(`/contacts/?locationId=${locationId}&query=${query || ''}`, 'GET');
    }

    async createContact(locationId: string, contact: GHLContact) {
        return this.request(`/contacts/`, 'POST', { ...contact, locationId });
    }

    async updateContact(contactId: string, updates: Partial<GHLContact>) {
        return this.request(`/contacts/${contactId}`, 'PUT', updates);
    }

    // --- Locations / Subaccounts ---
    // Note: Creating subaccounts usually requires Agency API Key, not just Location Token

    async getLocation(locationId: string) {
        return this.request(`/locations/${locationId}`, 'GET');
    }
}

// Singleton instance for the "Whitelabel" Agency connection if applicable
// For now, we will assume we are likely operating with a Location Token or an Agency Token depending on context
// The user mentioned "Whitelabel account" so we might be using OAuth or an Agency API Key.
// We'll initialize this with a placeholder or env var.
export const ghlClient = new GHLClient(process.env.GHL_ACCESS_TOKEN || '');
