// Script para generar museumMap.js con navegación mejorada por salas
import fs from 'fs';

// Configuración de salas (ajustar según necesidad)
const SALAS = [
  { nombre: "Frente del Museo", inicio: 0, fin: 18 },    // Imágenes 1-19
  { nombre: "Sala 1", inicio: 19, fin: 39 },   // Imágenes 19-60
  { nombre: "Sala 2", inicio: 40, fin: 53 },   // Imágenes 19-60
  { nombre: "Sala 3", inicio: 54, fin: 64 },   // Imágenes 19-60
  { nombre: "Sala 4", inicio: 65, fin: 93 },   // Imágenes 19-60
  
  { nombre: "Sala 5", inicio: 94, fin: 102 }    // Imágenes 61-103
];

// IDs de las imágenes en orden
const imageIds = [
  "G0041653", "G0041654", "G0041655", "G0041656", "G0041657", "G0041658", "G0041659", "G0041660",
  "G0041661", "G0041662", "G0051664", "G0051665", "G0051666", "G0051667", "G0051668", "G0051669",
  "G0051670", "G0051671", "G0011623", "G0011624", "G0011625", "G0011626", "G0011627", "G0011628",
  "G0011629", "G0011630", "G0021632", "G0021633", "G0021634", "G0021635", "G0021636", "G0021637",
  "G0021638", "G0021639", "G0021640", "G0021641", "G0031644", "G0031645", "G0031646", "G0061673",
  "G0061674", "G0061675", "G0061676", "G0061677", "G0071679", "G0071680", "G0071681", "G0071682",
  "G0081684", "G0081685", "G0081686", "G0081687", "G0081688", "G0091690", "G0091691", "G0091692",
  "G0091693", "G0091694", "G0091695", "G0101697", "G0101698", "G0101699", "G0101700", "G0101701",
  "G0111703", "G0111704", "G0111705", "G0111706", "G0121708", "G0121709", "G0131711", "G0131712",
  "G0141714", "G0141715", "G0151717", "G0151718", "G0161720", "G0161721", "G0161722", "G0161723",
  "G0161724", "G0161725", "G0161726", "G0161727", "G0161728", "G0161729", "G0161730", "G0161731",
  "G0171733", "G0171734", "G0171735", "G0171736", "G0171737", "G0171738", "G0181740", "G0181741",
  "G0181742", "G0181743", "G0181744", "G0181745", "G0191747", "G0201749", "G0201750"
];

function getSalaIndex(imageIndex) {
  const index = SALAS.findIndex(sala => imageIndex >= sala.inicio && imageIndex <= sala.fin);
  return index !== -1 ? index : 0; // Default a sala 0 si no se encuentra
}

function generarHotspots(imageIndex) {
  const hotspots = [];
  const salaIndex = getSalaIndex(imageIndex);
  const sala = SALAS[salaIndex];
  
  // Todos los botones agrupados abajo en el centro
  // Botón: Anterior en sala (izquierda del grupo)
  if (imageIndex > sala.inicio) {
    hotspots.push({
      targetId: imageIds[imageIndex - 1],
      type: "prev-in-room",
      coords: [40, 90],  // Abajo, ligeramente a la izquierda
      icon: "prev"
    });
  }
  
  // Botón: Siguiente en sala (derecha del grupo)
  if (imageIndex < sala.fin) {
    hotspots.push({
      targetId: imageIds[imageIndex + 1],
      type: "next-in-room",
      coords: [60, 90],  // Abajo, ligeramente a la derecha
      icon: "next"
    });
  }
  
  // Botón: Sala anterior (izquierda extremo del grupo)
  if (salaIndex > 0) {
    const prevSala = SALAS[salaIndex - 1];
    hotspots.push({
      targetId: imageIds[prevSala.inicio],
      type: "prev-room",
      coords: [35, 90],  // Abajo, extremo izquierdo
      icon: "prev-room"
    });
  }
  
  // Botón: Sala siguiente (derecha extremo del grupo)
  if (salaIndex < SALAS.length - 1) {
    const nextSala = SALAS[salaIndex + 1];
    hotspots.push({
      targetId: imageIds[nextSala.inicio],
      type: "next-room",
      coords: [65, 90],  // Abajo, extremo derecho
      icon: "next-room"
    });
  }
  
  return hotspots;
}

// Generar el mapa
const museumMap = imageIds.map((id, index) => {
  const salaIndex = getSalaIndex(index);
  return {
    id,
    src: `\${import.meta.env.BASE_URL}visita-virtual/${id}.JPG`,
    title: `${SALAS[salaIndex].nombre} - Vista ${index - SALAS[salaIndex].inicio + 1}`,
    room: salaIndex,
    hotspots: generarHotspots(index)
  };
});

// Generar archivo
const content = `// Mapa del recorrido virtual del museo
// Sistema de navegación: 4 botones (prev/next en sala, prev/next sala)
export const museumMap = ${JSON.stringify(museumMap, null, 2)
  .replace(/"id":/g, 'id:')
  .replace(/"src":/g, 'src:')
  .replace(/"title":/g, 'title:')
  .replace(/"room":/g, 'room:')
  .replace(/"hotspots":/g, 'hotspots:')
  .replace(/"targetId":/g, 'targetId:')
  .replace(/"type":/g, 'type:')
  .replace(/"coords":/g, 'coords:')
  .replace(/"icon":/g, 'icon:')
  .replace(/"\\\$\{import\.meta\.env\.BASE_URL\}(.*?)"/g, '`$\{import.meta.env.BASE_URL}$1`')
};

// Configuración de salas
export const ROOM_CONFIG = ${JSON.stringify(SALAS, null, 2)
  .replace(/"nombre":/g, 'nombre:')
  .replace(/"inicio":/g, 'inicio:')
  .replace(/"fin":/g, 'fin:')
};
`;

fs.writeFileSync('src/data/museumMap.js', content);
console.log('✅ museumMap.js generado con éxito');
console.log(`📊 Total: ${imageIds.length} imágenes en ${SALAS.length} salas`);
