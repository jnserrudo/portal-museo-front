
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputFile = path.join(__dirname, 'src/pages/VisitaVirtualPage.jsx');
const outputFile = path.join(__dirname, 'src/data/museumMap.js');

const content = fs.readFileSync(inputFile, 'utf8');

// Regex to find the images array content
const imagesMatch = content.match(/const images = \[\s*([\s\S]*?)\s*\];/);

if (imagesMatch && imagesMatch[1]) {
    const imagesContent = imagesMatch[1];
    const imageLines = imagesContent.split('\n').filter(line => line.trim().startsWith('{'));
    
    // First pass: parse all items
    const mapItems = imageLines.map(line => {
        const srcMatch = line.match(/visita-virtual\/(.*?)'/);
        const altMatch = line.match(/alt: '(.*?)'/);
        
        if (srcMatch) {
            const filename = srcMatch[1];
            const id = filename.split('.')[0];
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

    // Second pass: add sequential hotspots
    mapItems.forEach((item, index) => {
        // Add 'Previous' hotspot if not first item
        if (index > 0) {
            item.hotspots.push({
                targetId: mapItems[index - 1].id,
                description: 'Anterior',
                coords: [10, 50], // Left side
                icon: 'left'
            });
        }

        // Add 'Next' hotspot if not last item
        if (index < mapItems.length - 1) {
            item.hotspots.push({
                targetId: mapItems[index + 1].id,
                description: 'Siguiente',
                coords: [90, 50], // Right side
                icon: 'right'
            });
        }
    });

    const fileContent = `export const museumMap = ${JSON.stringify(mapItems, null, 2)};\n`;
    
    // Fix the template literal in the output
    const fixedContent = fileContent.replace(/"src": "\${import.meta.env.BASE_URL}(.*?)"/g, "src: `${import.meta.env.BASE_URL}$1`")
                                    .replace(/"id":/g, "id:")
                                    .replace(/"title":/g, "title:")
                                    .replace(/"hotspots":/g, "hotspots:")
                                    .replace(/"targetId":/g, "targetId:")
                                    .replace(/"description":/g, "description:")
                                    .replace(/"coords":/g, "coords:")
                                    .replace(/"icon":/g, "icon:");

    fs.writeFileSync(outputFile, fixedContent);
    console.log(`Successfully generated ${outputFile} with sequential hotspots for ${mapItems.length} items.`);
} else {
    console.error('Could not find images array in VisitaVirtualPage.jsx');
}
