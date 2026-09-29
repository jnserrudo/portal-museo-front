import optimizedImages from './optimizedImages.json';

// Con VITE_USE_OPTIMIZED_IMAGES=true se sirven las copias livianas (.webp) generadas por
// `npm run images:opt`. Con false (o sin definir) se usan exactamente los archivos originales.
export const USE_OPTIMIZED_IMAGES = import.meta.env.VITE_USE_OPTIMIZED_IMAGES === 'true';

const BASE = import.meta.env.BASE_URL;
const cleanPath = (path) => path.replace(/^\/+/, '');

/**
 * URL de una imagen de /public.
 * @param {string} path ruta relativa a /public, p. ej. 'salas/portal_sala_historia.JPG'
 * @param {'opt'|'thumb'} variant 'thumb' solo existe para las fotos de la visita virtual
 */
export const asset = (path, variant = 'opt') => {
  const clean = cleanPath(path);
  if (USE_OPTIMIZED_IMAGES && optimizedImages[clean]?.v.includes(variant)) {
    return `${BASE}opt/${clean}.${variant}.webp`;
  }
  return `${BASE}${clean}`;
};

/**
 * Ancho y alto del original, para reservar el espacio de la imagen antes de que cargue.
 * Devuelve {} si la imagen no esta en el manifiesto.
 */
export const assetSize = (path) => {
  const entry = optimizedImages[cleanPath(path)];
  return entry ? { width: entry.w, height: entry.h } : {};
};

/**
 * Dada una URL generada por asset(), devuelve su miniatura (.thumb.webp) si existe;
 * si no (o con la bandera en false), devuelve la misma URL.
 */
export const thumbnailFor = (url) => {
  const prefix = `${BASE}opt/`;
  if (!USE_OPTIMIZED_IMAGES || !url?.startsWith(prefix) || !url.endsWith('.opt.webp')) return url;
  const clean = url.slice(prefix.length, -'.opt.webp'.length);
  return optimizedImages[clean]?.v.includes('thumb') ? asset(clean, 'thumb') : url;
};

/**
 * Convierte la URL de una imagen subida (/uploads/archivo.jpg, relativa o absoluta)
 * a su copia liviana /uploads/opt/archivo.jpg.opt.webp. Si no es de /uploads la deja igual.
 */
export const optimizedUploadUrl = (url) => {
  if (!USE_OPTIMIZED_IMAGES || !url) return url;
  return url.replace(/\/uploads\/(?!opt\/)([^/?#]+)(?=$|[?#])/, '/uploads/opt/$1.opt.webp');
};

/**
 * Handler para onError de <img>: si falla la copia liviana, vuelve una sola vez a la URL original.
 * Si el original tambien falla (o no hay copia), ejecuta onFinalError (comportamiento previo).
 */
export const fallbackTo = (originalUrl, onFinalError) => (e) => {
  const img = e.currentTarget;
  const originalAbs = originalUrl ? new URL(originalUrl, window.location.href).href : null;
  if (originalAbs && img.dataset.fallback !== '1' && img.src !== originalAbs) {
    img.dataset.fallback = '1';
    img.src = originalUrl;
    return;
  }
  onFinalError?.(e);
};
