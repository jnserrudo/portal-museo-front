import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './EventForm.css';
import ImageUploader from './ImageUploader';

const pad = (n) => String(n).padStart(2, '0');

// Fecha local (YYYY-MM-DD), la misma que muestran las paginas publicas.
const toDateInput = (value) => {
    if (!value) return '';
    const d = new Date(value);
    if (isNaN(d.getTime())) return '';
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const formFromEvent = (event) => ({
    titulo: event?.titulo || event?.title || '',
    descripcion: event?.descripcion || event?.description || '',
    fecha: toDateInput(event?.fecha || event?.date),
    hora: event?.hora || event?.time || '',
    lugar: event?.lugar || event?.location || '',
    imagenUrls: event?.imagenUrls || (event?.imageUrl ? [event.imageUrl] : []),
    publicado: event?.publicado !== undefined ? event.publicado : true
});

const EventForm = ({ event = null, onSave, onDelete, onCancel }) => {
    const isEditing = Boolean(event?.id);
    const [formData, setFormData] = useState(() => formFromEvent(event));
    const [newImages, setNewImages] = useState([]);
    const [uploaderKey, setUploaderKey] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImagesChange = (images) => {
        setFormData(prev => ({
            ...prev,
            imagenUrls: images.filter(img => !img.isNew).map(img => img.url)
        }));
        setNewImages(images.filter(img => img.isNew).map(img => img.file));
    };

    const handleReset = () => {
        if (isEditing) {
            onCancel?.();
            return;
        }
        setFormData(formFromEvent(null));
        setNewImages([]);
        setUploaderKey(k => k + 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSaving) return;

        const titulo = formData.titulo.trim();
        const descripcion = formData.descripcion.trim();
        if (!titulo || !descripcion || !formData.fecha) {
            toast.error('Completá el título, la fecha y la descripción.');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('titulo', titulo);
        formDataToSend.append('descripcion', descripcion);
        // Mediodia local para que la fecha no cambie de dia al pasar a UTC.
        formDataToSend.append('fecha', new Date(`${formData.fecha}T12:00:00`).toISOString());
        formDataToSend.append('hora', formData.hora || '');
        formDataToSend.append('lugar', formData.lugar.trim());
        formDataToSend.append('publicado', formData.publicado ? 'true' : 'false');
        formDataToSend.append('imagenUrls', JSON.stringify(formData.imagenUrls));
        newImages.forEach(file => formDataToSend.append('imagenes', file));

        setIsSaving(true);
        try {
            await onSave(formDataToSend, isEditing ? event.id : null);
            if (!isEditing) handleReset();
        } catch (error) {
            // eventService ya muestra los errores que responde el servidor; fetch lanza TypeError si no hay conexión.
            if (error instanceof TypeError) {
                toast.error('No se pudo conectar con el servidor. Revisá la conexión e intentá de nuevo.');
            }
            console.error('Error al guardar el evento:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="form-wrapper">
            <h4 className="form-main-title">{isEditing ? 'Editar Evento' : 'Crear Nuevo Evento'}</h4>

            <form onSubmit={handleSubmit} className="event-form" style={{ borderColor: '#8B5A2B', marginTop: '1rem' }}>
                <h5 className="form-title" style={{ color: '#8B5A2B' }}>
                    {isEditing ? `Editando: ${event.titulo || event.title || 'Evento'}` : 'Detalles del Evento'}
                </h5>
                <p className="form-note">Los campos marcados con * son obligatorios</p>

                <div className="form-field">
                    <label htmlFor="titulo" className="form-label">Título del Evento *</label>
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        required
                        maxLength={200}
                        className="form-input"
                        placeholder="Ej: Exposición de Arte Contemporáneo"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="fecha" className="form-label">Fecha del Evento *</label>
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        value={formData.fecha}
                        onChange={handleChange}
                        required
                        className="form-input"
                        min={!isEditing ? toDateInput(new Date()) : undefined}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="hora" className="form-label">Hora del Evento</label>
                    <input
                        type="time"
                        id="hora"
                        name="hora"
                        value={formData.hora}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="lugar" className="form-label">Lugar</label>
                    <input
                        type="text"
                        id="lugar"
                        name="lugar"
                        value={formData.lugar}
                        onChange={handleChange}
                        maxLength={200}
                        className="form-input"
                        placeholder="Ej: Salón Principal del Museo"
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="descripcion" className="form-label">Descripción Detallada *</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        rows="5"
                        value={formData.descripcion}
                        onChange={handleChange}
                        required
                        className="form-textarea"
                        placeholder="Proporciona una descripción detallada del evento..."
                    ></textarea>
                </div>

                <div className="form-field">
                    <label className="form-label">Imágenes del evento</label>
                    <div className="image-uploader-container">
                        <ImageUploader
                            key={uploaderKey}
                            onImagesChange={handleImagesChange}
                            existingImages={formData.imagenUrls.map(url => ({ url }))}
                        />
                        <p className="form-hint">Hasta 5 imágenes JPG, PNG o WebP. Tamaño máximo por imagen: 5MB. La primera es la portada.</p>
                    </div>
                </div>

                <div className="form-field">
                    <label className="form-checkbox">
                        <input
                            type="checkbox"
                            name="publicado"
                            checked={formData.publicado}
                            onChange={handleChange}
                        />
                        <span>Publicar este evento</span>
                    </label>
                    <p className="form-hint">Si está marcado, el evento será visible para los visitantes del sitio.</p>
                </div>

                <div className="form-actions">
                    <button type="submit" className="save-button" disabled={isSaving}>
                        {isSaving
                            ? (isEditing ? 'Actualizando...' : 'Creando...')
                            : (isEditing ? 'Actualizar Evento' : 'Crear Evento')}
                    </button>
                    {isEditing && onDelete && (
                        <button
                            type="button"
                            className="delete-button"
                            onClick={() => onDelete(event)}
                            disabled={isSaving}
                        >
                            Eliminar Evento
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={handleReset}
                        className="form-button form-button-reset"
                        disabled={isSaving}
                    >
                        {isEditing ? 'Cancelar' : 'Limpiar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;
