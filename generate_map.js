
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputFile = path.join(__dirname, 'src/pages/VisitaVirtualPage.jsx');
const outputFile = path.join(__dirname, 'src/data/museumMap.js');
const outputDir = path.join(__dirname, 'src/data');

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
}

const content = fs.readFileSync(inputFile, 'utf8');

// Regex to find the images array content
const imagesMatch = content.match(/const images = \[\s*([\s\S]*?)\s*\];/);

if (imagesMatch && imagesMatch[1]) {
    const imagesContent = imagesMatch[1];
    const imageLines = imagesContent.split('\n').filter(line => line.trim().startsWith('{'));
    
    const mapItems = imageLines.map(line => {
        // Extract filename and alt
        const srcMatch = line.match(/visita-virtual\/(.*?)'/);
        const altMatch = line.match(/alt: '(.*?)'/);
        
        if (srcMatch) {
            const filename = srcMatch[1];
            const id = filename.split('.')[0]; // Remove extension for ID
            const alt = altMatch ? altMatch[1] : '';
            
            return {
                id: id,
                src: `\${import.meta.env.BASE_URL}visita-virtual/${filename}`,
                title: alt,
                hotspots: []
            };
        }
        return null;
    }).filter(item => item !== null);

    const fileContent = `export const museumMap = ${JSON.stringify(mapItems, null, 2)};\n`;
    
    // Fix the template literal in the output
    const fixedContent = fileContent.replace(/"src": "\${import.meta.env.BASE_URL}(.*?)"/g, "src: `${import.meta.env.BASE_URL}$1`")
                                    .replace(/"id":/g, "id:")
                                    .replace(/"title":/g, "title:")
                                    .replace(/"hotspots":/g, "hotspots:");

    fs.writeFileSync(outputFile, fixedContent);
    console.log(`Successfully generated ${outputFile} with ${mapItems.length} items.`);
} else {
    console.error('Could not find images array in VisitaVirtualPage.jsx');
}
