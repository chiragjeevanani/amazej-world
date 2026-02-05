import fs from 'fs';
const content = fs.readFileSync('src/i18n.js', 'utf8');
const lines = content.split('\n');
let output = '';
lines.forEach((line, index) => {
    if (line.includes('grow_your_network:')) {
        output += `${index + 1}|${line.trim()}\n`;
    }
});
fs.writeFileSync('key_outputs.txt', output, 'utf8');
