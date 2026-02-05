
export function parseCSV(csvText: string): any[] {
    const lines = csvText.split(/\r\n|\n/).filter(line => line.trim() !== '');
    if (lines.length < 2) return [];

    const headers = parseCSVLine(lines[0]);
    const results = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = parseCSVLine(lines[i]);
        if (currentLine.length === headers.length) {
            const obj: any = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j].trim()] = currentLine[j]?.trim() || '';
            }
            results.push(obj);
        }
    }
    return results;
}

// Helper to handle quotes and commas
function parseCSVLine(text: string): string[] {
    const result = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < text.length; i++) {
        const char = text[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(cell);
            cell = '';
        } else {
            cell += char;
        }
    }
    result.push(cell);
    return result.map(c => c.replace(/^"|"$/g, '').replace(/""/g, '"')); // Remove surrounding quotes and unescape double quotes
}
