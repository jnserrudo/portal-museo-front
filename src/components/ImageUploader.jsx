import React, { useCallback } from 'react';
import { COLORS } from '../constants/colors';
import './ImageUploader.css';

const ImageUploader = ({ onImagesChange, existingImages = [] }) => {
  const [images, setImages] = React.useState(existingImages);
  const [isUploading, setIsUploading] = React.useState(false);

  // Maneja la selección de archivos
  const handleFileChange = useCallback(async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    
    try {
      // Aquí iría la lógica para subir las imágenes al servidor
      // Por ahora, simulamos la subida creando URLs locales
      const newImages = await Promise.all(
        files.map(file => {
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              // En una implementación real, aquí subirías el archivo al servidor
              // y obtendrías la URL de la imagen subida
              // Por ahora, usamos una URL local para la vista previa
              resolve({
                url: reader.result,
                file, // Guardamos el archivo para enviarlo al servidor después
                name: file.name,
                isNew: true // Marcamos como nueva para saber que hay que subirla
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
      alert('Error al cargar las imágenes. Por favor, inténtalo de nuevo.');
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
              src={img.url} 
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
        {isUploading ? 'Subiendo...' : 'Seleccionar imágenes'}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={isUploading}
          style={{ display: 'none' }}
        />
      </label>
    </div>
  );
};

export default ImageUploader;
