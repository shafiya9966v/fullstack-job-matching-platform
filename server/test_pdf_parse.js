const fs = require('fs');
const pdf = require('pdf-parse');

console.log('Type of pdf:', typeof pdf);

try {
    const dummyBuffer = Buffer.from('dummy pdf content');

    if (typeof pdf === 'function') {
        console.log('pdf is a function, calling it...');
        pdf(dummyBuffer).then(data => {
            console.log('Parsed data:', data.text);
        }).catch(err => {
            console.log('Parsing failed (expected for dummy data):', err.message);
        });
    } else {
        console.error('ERROR: pdf is NOT a function. Keys:', Object.keys(pdf));
    }

} catch (e) {
    console.error('Runtime error:', e);
}
