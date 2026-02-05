
const fs = require('fs');
// Handle potentially weird encoding by trying utf8 first, maybe stripping BOM
try {
    const raw = fs.readFileSync('ghl_sample.json', 'utf8'); // or 'ucs2' if it was utf16le
    // Clean up if powershell added garbage
    const cleanRaw = raw.replace(/^\uFEFF/, '');
    const data = JSON.parse(cleanRaw);

    if (data.contacts) {
        data.contacts.forEach(c => {
            console.log('--- Contact ---');
            console.log('Name:', c.firstName, c.lastName);
            console.log('Email:', c.email);
            console.log('Tags:', c.tags);
            console.log('Custom Fields:', JSON.stringify(c.customFields, null, 2));
        });
    } else {
        console.log('No contacts found in JSON:', Object.keys(data));
    }
} catch (e) {
    console.error('Error parsing:', e.message);
    // Try reading as utf16le just in case
    try {
        const raw16 = fs.readFileSync('ghl_sample.json', 'utf16le');
        const data = JSON.parse(raw16);
        if (data.contacts) {
            data.contacts.forEach(c => {
                console.log('--- Contact (UTF16) ---');
                console.log('Tags:', c.tags);
            });
        }
    } catch (e2) {
        console.error('Retry error:', e2.message);
    }
}
