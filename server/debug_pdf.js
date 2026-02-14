const pdf = require('pdf-parse');
console.log('Loaded pdf-parse');
console.log('Type:', typeof pdf);
console.log('Keys:', Object.keys(pdf));
console.log('Structure:', JSON.stringify(pdf, null, 2));
// Try to find the function
try {
    if (typeof pdf === 'function') console.log('It IS a function');
    if (typeof pdf.default === 'function') console.log('Has default function');
    if (typeof pdf.PdfParse === 'function') console.log('Has PdfParse function');
} catch (e) {
    console.error(e);
}
