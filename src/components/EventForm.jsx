import React, { useState, useEffect } from 'react';
import './EventForm.css';
import ImageUploader from './ImageUploader';

const EventForm = ({ events = [], event = null, onSave, onDelete, onUpdate, onCreate, onSaveSuccess }) => {
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        fecha: '',
        lugar: '',
        imagenUrls: [],
        publicado: false,
        autorId: 1
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [newImages, setNewImages] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Effect to populate form when event prop changes (from parent)
    useEffect(() => {
        if (event) {
            console.log('EventForm received event prop:', event);
            const fecha = new Date(event.fecha || event.date);
            const fechaFormateada = !isNaN(fecha.getTime()) ? fecha.toISOString().split('T')[0] : '';
            
            setFormData({
                ...event,
                id: event.id,
                titulo: event.titulo || event.title,
                descripcion: event.descripcion || event.description,
                fecha: fechaFormateada,
                lugar: event.lugar || event.location,
                imagenUrls: event.imagenUrls || (event.imageUrl ? [event.imageUrl] : []),
                publicado: event.publicado !== undefined ? event.publicado : true,
                autorId: event.autorId || 1
            });
            setIsEditing(true);
            setSelectedEventId(event.id.toString());
        } else {
            // Only reset if we are not already editing via selector
            if (!selectedEventId) {
                handleReset();
            }
        }
    }, [event]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImagesChange = (images) => {
        const existingImages = images.filter(img => !img.isNew).map(img => img.url);
        const newImageFiles = images.filter(img => img.isNew).map(img => img.file);
        
        setFormData(prev => ({
            ...prev,
            imagenUrls: [...existingImages],
            imageFiles: [...newImageFiles]
        }));
        setNewImages(newImageFiles);
    };

    const handleSelectEvent = (e) => {
        const id = e.target.value;
        setSelectedEventId(id);
        if (id) {
            const eventToEdit = events.find(event => event.id.toString() === id);
            if (eventToEdit) {
                const fecha = new Date(eventToEdit.fecha);
                const fechaFormateada = !isNaN(fecha.getTime()) ? fecha.toISOString().split('T')[0] : '';
                
                setFormData({
                    ...eventToEdit,
                    fecha: fechaFormateada,
                    autorId: eventToEdit.autorId || 1
                });
                setIsEditing(true);
            }
        } else {
            handleReset();
        }
    };

    const handleReset = () => {
        setFormData({ 
            id: '', 
            titulo: '', 
            descripcion: '', 
            fecha: '',
            lugar: '',
            imagenUrls: [],
            publicado: false,
            autorId: 1
        });
        setIsEditing(false);
        setSelectedEventId('');
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isSubmitting) return; // Prevent double submission
        
        if (!formData.titulo || !formData.descripcion || !formData.fecha) {
            return;
        }
        
        setIsSubmitting(true);
        
        const formDataToSend = new FormData();
        
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('descripcion', formData.descripcion);
        formDataToSend.append('fecha', formData.fecha);
        if (formData.lugar) formDataToSend.append('lugar', formData.lugar);
        formDataToSend.append('publicado', formData.publicado ? 'true' : 'false');
        formDataToSend.append('autorId', '1');
        
        // CRITICAL: Include ID for updates
        if (isEditing && formData.id !== null && formData.id !== undefined && formData.id !== '') {
            formDataToSend.append('id', formData.id);
            console.log('UPDATING event with ID:', formData.id);
        } else {
            console.log('CREATING new event');
        }
        
        if (newImages && newImages.length > 0) {
            newImages.forEach((file) => {
                if (file instanceof File) {
                    formDataToSend.append('imagenes', file);
                } else if (file.file) {
                    formDataToSend.append('imagenes', file.file);
                }
            });
        } else if (isEditing && formData.imagenUrls && formData.imagenUrls.length > 0) {
            formDataToSend.append('imagenUrls', JSON.stringify(formData.imagenUrls));
        }
        
        try {
            if (typeof onSave === 'function') {
                // Pass ID explicitly as second argument
                const eventId = (isEditing && formData.id) ? formData.id : null;
                await onSave(formDataToSend, eventId);
                
                handleReset();
                if (typeof onSaveSuccess === 'function') {
                    onSaveSuccess();
                }
            } else {
                throw new Error('No se encontró ninguna función para guardar el evento');
            }
        } catch (error) {
            console.error('Error al guardar el evento:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteClick = async () => {
        if (isSubmitting) return; // Prevent double clicks
        
        if (!formData.id) return;
        
        setIsSubmitting(true);
        
        try {
            // App.jsx's deleteEvent handles confirmation
            const result = await onDelete(formData.id);
            // If result is false, user cancelled confirmation
            if (result) {
                handleReset();
                if (typeof onSaveSuccess === 'function') {
                    onSaveSuccess();
                }
            }
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {}, []);

    const safeEvents = Array.isArray(events) ? events : [];
    console.log(safeEvents);
    const sortedEvents = [...safeEvents].sort((a, b) => 
        new Date(a.fecha).getTime() - new Date(b.fecha).getTime()
    );
    console.log("sortedEvents", sortedEvents);

    return (
        <div className="form-wrapper">
            <h4 className="form-main-title">Administración de Eventos</h4>

            <div className="form-selector-container">
                <label htmlFor="select-event" className="form-label">
                    {isEditing ? 'Editar evento existente:' : 'Crear nuevo o seleccionar para editar:'}
                </label>
                <select id="select-event" value={selectedEventId} onChange={handleSelectEvent} className="form-select" style={{ borderColor: '#8B5A2B' }}>
                    <option value="">-- Crear un Nuevo Evento --</option>
                    {sortedEvents.map(event => (
                        <option key={`event-${event.id}`} value={event.id}>
                            {event.fecha ? new Date(event.fecha).toLocaleDateString() : 'Sin fecha'} - {event.titulo}
                        </option>
                    ))}
                </select>
            </div>

            <form onSubmit={handleSubmit} className="event-form" style={{ borderColor: '#8B5A2B' }}>
                <h5 className="form-title" style={{ color: '#8B5A2B' }}>
                    {isEditing ? `Editando: ${formData.titulo}` : 'Crear Nuevo Evento'}
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
                        min={new Date().toISOString().split('T')[0]}
                    />
                </div>

                <div className="form-field">
                    <label htmlFor="lugar" className="form-label">Lugar</label>
                    <input 
                        type="text" 
                        id="lugar" 
                        name="lugar" 
                        value={formData.lugar || ''} 
                        onChange={handleChange} 
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
                            onImagesChange={handleImagesChange}
                            existingImages={formData.imagenUrls.map(url => ({ url }))}
                        />
                        <p className="form-hint">Puedes arrastrar y soltar imágenes o hacer clic para seleccionar. Tamaño máximo por imagen: 5MB</p>
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
                    <button type="submit" className="save-button" disabled={isSubmitting}>
                        {isSubmitting ? (
                            isEditing ? 'Actualizando...' : 'Creando...'
                        ) : (
                            isEditing ? 'Actualizar Evento' : 'Crear Evento'
                        )}
                    </button>
                    {isEditing && (
                        <button 
                            type="button" 
                            className="delete-button"
                            onClick={handleDeleteClick}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Eliminando...' : 'Eliminar Evento'}
                        </button>
                    )}
                    <button 
                        type="button" 
                        onClick={handleReset} 
                        className="form-button form-button-reset"
                        disabled={isSubmitting}
                    >
                        {isEditing ? 'Cancelar' : 'Limpiar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;