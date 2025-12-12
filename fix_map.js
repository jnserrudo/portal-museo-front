
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, 'src/data/museumMap.js');

let content = fs.readFileSync(filePath, 'utf8');

// Fix the malformed alt property
content = content.replace(/, alt: `,/g, ',');

fs.writeFileSync(filePath, content);
console.log('Fixed museumMap.js');
