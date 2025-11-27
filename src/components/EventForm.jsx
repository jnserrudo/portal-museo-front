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
        
        console.log('🎯 [EVENTO] ========== INICIO SUBMIT ==========');
        console.log('📝 [EVENTO] Datos del formulario:', formData);
        console.log('🔄 [EVENTO] ¿Es edición?:', isEditing);
        console.log('🆔 [EVENTO] ID del evento:', formData.id);
        
        if (isSubmitting) {
            console.warn('⚠️ [EVENTO] Submit bloqueado - ya hay una petición en curso');
            return;
        }
        
        if (!formData.titulo || !formData.descripcion || !formData.fecha) {
            console.error('❌ [EVENTO] Faltan campos requeridos');
            return;
        }
        
        setIsSubmitting(true);
        
        const formDataToSend = new FormData();
        
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('descripcion', formData.descripcion);
        
        // FIX TIMEZONE: Crear fecha local a mediodía para evitar problemas de timezone
        console.log('📅 [EVENTO] Fecha original del input:', formData.fecha);
        const fechaLocal = new Date(formData.fecha + 'T12:00:00');
        const fechaISO = fechaLocal.toISOString();
        console.log('📅 [EVENTO] Fecha local creada:', fechaLocal);
        console.log('📅 [EVENTO] Fecha ISO a enviar:', fechaISO);
        console.log('📅 [EVENTO] Timezone offset:', fechaLocal.getTimezoneOffset());
        
        formDataToSend.append('fecha', fechaISO);
        
        if (formData.lugar) formDataToSend.append('lugar', formData.lugar);
        formDataToSend.append('publicado', formData.publicado ? 'true' : 'false');
        formDataToSend.append('autorId', '1');
        
        // CRITICAL: Include ID for updates
        if (isEditing && formData.id !== null && formData.id !== undefined && formData.id !== '') {
            formDataToSend.append('id', formData.id);
            console.log('✏️ [EVENTO] ACTUALIZANDO evento con ID:', formData.id);
        } else {
            console.log('➕ [EVENTO] CREANDO nuevo evento');
        }
        
        // Manejo de imágenes
        console.log('🖼️ [EVENTO] Nuevas imágenes:', newImages);
        console.log('🖼️ [EVENTO] URLs existentes:', formData.imagenUrls);
        
        if (newImages && newImages.length > 0) {
            console.log(`🖼️ [EVENTO] Agregando ${newImages.length} imagen(es) nueva(s)`);
            newImages.forEach((file, index) => {
                if (file instanceof File) {
                    console.log(`  📎 [EVENTO] Imagen ${index + 1}:`, {
                        name: file.name,
                        size: file.size,
                        type: file.type
                    });
                    formDataToSend.append('imagenes', file);
                } else if (file.file) {
                    console.log(`  📎 [EVENTO] Imagen ${index + 1} (wrapped):`, {
                        name: file.file.name,
                        size: file.file.size,
                        type: file.file.type
                    });
                    formDataToSend.append('imagenes', file.file);
                }
            });
        } else if (isEditing && formData.imagenUrls && formData.imagenUrls.length > 0) {
            console.log('🖼️ [EVENTO] Manteniendo URLs existentes:', formData.imagenUrls);
            formDataToSend.append('imagenUrls', JSON.stringify(formData.imagenUrls));
        } else {
            console.log('🖼️ [EVENTO] Sin imágenes');
        }
        
        // Log del FormData completo
        console.log('📦 [EVENTO] FormData a enviar:');
        for (let [key, value] of formDataToSend.entries()) {
            if (value instanceof File) {
                console.log(`  ${key}:`, `[File: ${value.name}]`);
            } else {
                console.log(`  ${key}:`, value);
            }
        }
        
        try {
            if (typeof onSave === 'function') {
                // Pass ID explicitly as second argument
                const eventId = (isEditing && formData.id) ? formData.id : null;
                console.log('💾 [EVENTO] Llamando a onSave con ID:', eventId);
                
                const result = await onSave(formDataToSend, eventId);
                console.log('✅ [EVENTO] Respuesta de onSave:', result);
                
                handleReset();
                if (typeof onSaveSuccess === 'function') {
                    console.log('🎉 [EVENTO] Llamando a onSaveSuccess');
                    onSaveSuccess();
                }
            } else {
                throw new Error('No se encontró ninguna función para guardar el evento');
            }
        } catch (error) {
            console.error('💥 [EVENTO] Error al guardar:', error);
            console.error('💥 [EVENTO] Error stack:', error.stack);
        } finally {
            setIsSubmitting(false);
            console.log('🏁 [EVENTO] ========== FIN SUBMIT ==========');
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