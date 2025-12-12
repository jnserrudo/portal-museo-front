/**
 * Script para listar todas las imágenes del tour con sus IDs
 * Útil para identificar qué imagen es cuál antes de reorganizar
 * 
 * Ejecuta: node list_images.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mapFile = path.join(__dirname, 'src/data/museumMap.js');

const content = fs.readFileSync(mapFile, 'utf8');

// Extraer todos los bloques de imágenes usando regex
const imageBlocks = content.matchAll(/\{\s*id:\s*"([^"]+)",\s*src:[^,]+,\s*title:\s*"([^"]+)"/g);

const images = [];
for (const match of imageBlocks) {
  images.push({
    id: match[1],
    title: match[2]
  });
}

if (images.length === 0) {
  console.error('❌ No se pudieron extraer las imágenes del archivo');
  process.exit(1);
}

console.log('📋 LISTADO DE IMÁGENES DEL RECORRIDO VIRTUAL\n');
console.log('═'.repeat(70));

images.forEach((item, index) => {
  console.log(`${String(index + 1).padStart(3, ' ')}. ID: ${item.id.padEnd(12)} | ${item.title}`);
});

console.log('═'.repeat(70));
console.log(`\nTotal: ${images.length} imágenes`);
console.log('\n💡 Tip: Abre las imágenes en public/visita-virtual/ para ver cuál es cuál');
console.log('   Luego usa estos IDs en reorder_tour.js para reorganizar');
