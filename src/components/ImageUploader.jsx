import React, { useCallback } from 'react';
import { toast } from 'react-toastify';
import { COLORS } from '../constants/colors';
import './ImageUploader.css';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_IMAGES = 5;

const ImageUploader = ({ onImagesChange, existingImages = [] }) => {
  const [images, setImages] = React.useState(existingImages);
  const [isUploading, setIsUploading] = React.useState(false);

  // Función para construir la URL completa de la imagen
  const getImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    
    // Si ya es una URL completa o data URL, retornarla tal cual
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://') || imageUrl.startsWith('data:')) {
      return imageUrl;
    }
    
    // Limpiar path y asegurar que empiece con slash
    let cleanPath = imageUrl;
    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    // Si la imagen está en /uploads/ y tenemos configurada una URL base para uploads
    const uploadsBaseUrl = import.meta.env.VITE_UPLOADS_BASE_URL;
    if (cleanPath.startsWith('/uploads/') && uploadsBaseUrl) {
      const base = uploadsBaseUrl.endsWith('/') ? uploadsBaseUrl.slice(0, -1) : uploadsBaseUrl;
      return `${base}${cleanPath}`;
    }
    
    // Fallback: Usar VITE_API_URL
    let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }
    
    return `${baseUrl}${cleanPath}`;
  };

  // Maneja la selección de archivos
  const handleFileChange = useCallback(async (e) => {
    const selected = Array.from(e.target.files);
    e.target.value = '';
    if (selected.length === 0) return;

    const rejected = [];
    let files = selected.filter(file => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        rejected.push(`"${file.name}": formato no permitido (solo JPG, PNG o WebP)`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        rejected.push(`"${file.name}": pesa ${(file.size / 1024 / 1024).toFixed(1)} MB (máximo 5 MB)`);
        return false;
      }
      return true;
    });

    const available = MAX_IMAGES - images.length;
    if (files.length > available) {
      rejected.push(`Se permiten hasta ${MAX_IMAGES} imágenes por evento`);
      files = files.slice(0, Math.max(available, 0));
    }
    rejected.forEach(msg => toast.error(msg));
    if (files.length === 0) return;

    setIsUploading(true);
    
    try {
      // Vista previa local; los archivos se envían al guardar el evento
      const newImages = await Promise.all(
        files.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              resolve({
                url: reader.result,
                file,
                name: file.name,
                isNew: true
              });
            };
            reader.readAsDataURL(file);
          });
        })
      );

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange(updatedImages);
    } catch (error) {
      console.error('Error al cargar las imágenes:', error);
      toast.error('Error al cargar las imágenes. Por favor, inténtalo de nuevo.');
    } finally {
      setIsUploading(false);
    }
  }, [images, onImagesChange]);

  // Elimina una imagen
  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="image-uploader">
      <div className="image-preview-container">
        {images.map((img, index) => (
          <div key={index} className="image-preview">
            <img 
              src={getImageUrl(img.url)} 
              alt={`Vista previa ${index + 1}`} 
              className="image-thumbnail"
            />
            <button 
              type="button" 
              onClick={() => removeImage(index)}
              className="remove-image-button"
              title="Eliminar imagen"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      
      <label className="upload-button" style={{
        '--color-ocre': COLORS.OCRE,
        '--color-ocre-dark': COLORS.OCRE_DARK || '#e08f4f'
      }}>
        {isUploading ? 'Cargando...' : 'Seleccionar imágenes'}
        <input
          type="file"
          accept={ALLOWED_TYPES.join(',')}
          multiple
          onChange={handleFileChange}
          disabled={isUploading || images.length >= MAX_IMAGES}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
