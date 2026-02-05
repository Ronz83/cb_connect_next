
const https = require('https');

const token = process.env.TOKEN || 'pit-f9c95ea4-51df-496f-8b8f-8e32bdad2be9';
const locationId = 'utkMhULqPkUAjG5Kbkvf';

const options = {
    hostname: 'services.leadconnectorhq.com',
    path: `/contacts/?locationId=${locationId}&limit=10`,
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Version': '2021-07-28',
        'Accept': 'application/json'
    }
};

const req = https.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log('--- FETCH SUCCESS ---');
            if (json.contacts) {
                json.contacts.forEach(c => {
                    console.log('\nName:', c.firstName, c.lastName);
                    console.log('Email:', c.email);
                    console.log('Tags:', c.tags);
                    // Filter custom fields to specific ones provided by app if possible, or just dump them
                    console.log('CustomFields Check:', c.customFields ? c.customFields.length : 0);
                    if (c.customFields) {
                        c.customFields.forEach(cf => {
                            console.log(`  - Field ID ${cf.id}: ${JSON.stringify(cf.value)}`);
                        });
                    }
                });
            } else {
                console.log('No contacts prop:', Object.keys(json));
            }
        } catch (e) {
            console.error('Parse Error:', e.message);
            console.log('Raw Data Preview:', data.substring(0, 200));
        }
    });
});

req.on('error', (e) => {
    console.error('Request Error:', e);
});

req.end();
