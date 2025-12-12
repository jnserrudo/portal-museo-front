/**
 * Script para reorganizar el orden de las imágenes en el recorrido virtual
 * 
 * INSTRUCCIONES:
 * 1. Modifica el array NEW_ORDER con los IDs en el orden que desees
 * 2. Ejecuta: node reorder_tour.js
 * 3. Se generará un nuevo museumMap.js con el orden correcto
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ============================================
// CONFIGURA AQUÍ EL NUEVO ORDEN
// ============================================
// Ejemplo: Si quieres que G0101697 sea la primera imagen, ponla primero en el array
// Puedes reorganizar completamente o solo mover algunas imágenes al inicio

const NEW_ORDER = [
  // Coloca aquí los IDs en el orden que quieras
  // Ejemplo:
  // "G0101697",  // Esta será la primera (entrada del museo)
  // "G0101698",  // Segunda
  // "G0011623",  // Tercera
  // ... etc
  
  // Si dejas este array vacío, se usará el orden actual
];

// ============================================
// NO MODIFICAR DEBAJO DE ESTA LÍNEA
// ============================================

const mapFile = path.join(__dirname, 'src/data/museumMap.js');
const backupFile = path.join(__dirname, 'src/data/museumMap.backup.js');

// Leer el archivo actual
const content = fs.readFileSync(mapFile, 'utf8');

// Hacer backup
fs.writeFileSync(backupFile, content);
console.log('✓ Backup creado en museumMap.backup.js');

// Extraer cada imagen manualmente
const imagePattern = /\{\s*id:\s*"([^"]+)",\s*src:\s*`\$\{import\.meta\.env\.BASE_URL\}([^`]+)`,\s*title:\s*"([^"]+)",\s*hotspots:\s*(\[[^\]]*(?:\{[^\}]*\}[^\]]*)*\])\s*\}/g;

const museumMap = [];
let match;
while ((match = imagePattern.exec(content)) !== null) {
  const [, id, srcPath, title, hotspotsStr] = match;
  
  // Parsear hotspots manualmente
  const hotspots = [];
  const hotspotPattern = /\{\s*targetId:\s*"([^"]+)",\s*description:\s*"([^"]+)",\s*coords:\s*\[([^\]]+)\],\s*icon:\s*"([^"]+)"\s*\}/g;
  let hotspotMatch;
  while ((hotspotMatch = hotspotPattern.exec(hotspotsStr)) !== null) {
    const [, targetId, description, coordsStr, icon] = hotspotMatch;
    const coords = coordsStr.split(',').map(c => parseFloat(c.trim()));
    hotspots.push({ targetId, description, coords, icon });
  }
  
  museumMap.push({
    id,
    src: `\${import.meta.env.BASE_URL}${srcPath}`,
    title,
    hotspots
  });
}

console.log(`📊 Total de imágenes encontradas: ${museumMap.length}`);

// Si no hay orden nuevo, mantener el actual
if (NEW_ORDER.length === 0) {
  console.log('⚠️  No se especificó un nuevo orden en NEW_ORDER');
  console.log('   Edita el archivo reorder_tour.js y agrega los IDs en el orden deseado');
  process.exit(0);
}

// Verificar que todos los IDs existen
const allIds = museumMap.map(item => item.id);
const missingIds = NEW_ORDER.filter(id => !allIds.includes(id));
if (missingIds.length > 0) {
  console.error('❌ IDs no encontrados:', missingIds);
  process.exit(1);
}

// Reorganizar según NEW_ORDER
const reorderedMap = [];
const usedIds = new Set();

// Primero agregar las imágenes en el nuevo orden
NEW_ORDER.forEach(id => {
  const item = museumMap.find(img => img.id === id);
  if (item) {
    reorderedMap.push(item);
    usedIds.add(id);
  }
});

// Luego agregar las que no están en NEW_ORDER (mantienen su orden relativo)
museumMap.forEach(item => {
  if (!usedIds.has(item.id)) {
    reorderedMap.push(item);
  }
});

// Actualizar hotspots para navegación secuencial
reorderedMap.forEach((item, index) => {
  item.hotspots = [];
  
  // Agregar hotspot "Anterior" si no es la primera
  if (index > 0) {
    item.hotspots.push({
      targetId: reorderedMap[index - 1].id,
      description: "Anterior",
      coords: [10, 50],
      icon: "left"
    });
  }
  
  // Agregar hotspot "Siguiente" si no es la última
  if (index < reorderedMap.length - 1) {
    item.hotspots.push({
      targetId: reorderedMap[index + 1].id,
      description: "Siguiente",
      coords: [90, 50],
      icon: "right"
    });
  }
});

// Generar el nuevo archivo
const newContent = `// Mapa del recorrido virtual del museo
// Cada imagen tiene hotspots que permiten navegar a otras vistas
export const museumMap = ${JSON.stringify(reorderedMap, null, 2)
  .replace(/"id":/g, 'id:')
  .replace(/"src":/g, 'src:')
  .replace(/"title":/g, 'title:')
  .replace(/"hotspots":/g, 'hotspots:')
  .replace(/"targetId":/g, 'targetId:')
  .replace(/"description":/g, 'description:')
  .replace(/"coords":/g, 'coords:')
  .replace(/"icon":/g, 'icon:')
  .replace(/"\$\{import\.meta\.env\.BASE_URL\}(.*?)"/g, '`${import.meta.env.BASE_URL}$1`')
};
`;

fs.writeFileSync(mapFile, newContent);

console.log('✅ Archivo reorganizado exitosamente!');
console.log(`   Primera imagen: ${reorderedMap[0].id} - ${reorderedMap[0].title}`);
console.log(`   Última imagen: ${reorderedMap[reorderedMap.length - 1].id} - ${reorderedMap[reorderedMap.length - 1].title}`);
console.log('');
console.log('💡 Si algo salió mal, restaura el backup:');
console.log('   copy src\\data\\museumMap.backup.js src\\data\\museumMap.js');
