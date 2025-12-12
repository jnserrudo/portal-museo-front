import fs from 'fs';

// Leer el archivo
let content = fs.readFileSync('src/data/museumMap.js', 'utf8');

// Reemplazar comillas dobles por backticks en las rutas
content = content.replace(/src: "\$\{/g, 'src: `${');
content = content.replace(/\.JPG"/g, '.JPG`');

// Guardar
fs.writeFileSync('src/data/museumMap.js', content);

console.log('✅ Template literals corregidos');
