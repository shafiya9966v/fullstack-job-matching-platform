const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../data');

const readData = (file) => {
    const filePath = path.join(dataDir, file);
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return data ? JSON.parse(data) : [];
};

const writeData = (file, data) => {
    const filePath = path.join(dataDir, file);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readData, writeData };
