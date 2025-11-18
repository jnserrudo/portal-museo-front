import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants/colors';
import './EventForm.css';
import ImageUploader from './ImageUploader';

const EventForm = ({ events, onSave, onDelete, onUpdate, onCreate, onSaveSuccess }) => {
    const [formData, setFormData] = useState({
        id: '',
        titulo: '',
        descripcion: '',
        fecha: '',
        lugar: '',
        imagenUrls: [],
        publicado: false,
        autorId: 1 // Valor temporal para el administrador
    });
    
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState('');
    // Ya no necesitamos statusMessage ya que usamos notificaciones toast
    const [newImages, setNewImages] = useState([]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Maneja el cambio en las imágenes
    const handleImagesChange = (images) => {
        // Separamos las URLs de las imágenes existentes de los nuevos archivos
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
                // Convertir la fecha al formato YYYY-MM-DD para el input date
                const fecha = new Date(eventToEdit.fecha);
                const fechaFormateada = fecha.toISOString().split('T')[0];
                
                setFormData({
                    ...eventToEdit,
                    fecha: fechaFormateada,
                    // Asegurarse de que siempre haya un autorId
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
        
        // Validar campos requeridos
        if (!formData.titulo || !formData.descripcion || !formData.fecha) {
            // setStatusMessage('Por favor, completa todos los campos obligatorios.');
            return;
        }
        
        // Crear un objeto FormData para enviar los datos del formulario
        const formDataToSend = new FormData();
        
        // Agregar campos al FormData
        formDataToSend.append('titulo', formData.titulo);
        formDataToSend.append('descripcion', formData.descripcion);
        formDataToSend.append('fecha', formData.fecha);
        if (formData.lugar) formDataToSend.append('lugar', formData.lugar);
        formDataToSend.append('publicado', formData.publicado ? 'true' : 'false');
        formDataToSend.append('autorId', '1'); // Valor temporal, debería venir de la autenticación
        
        // Si estamos editando, asegurarnos de incluir el ID
        if (isEditing && formData.id) {
            formDataToSend.append('id', formData.id);
        }
        
        // Añadir las imágenes seleccionadas
        if (newImages && newImages.length > 0) {
            newImages.forEach((file) => {
                if (file instanceof File) {
                    formDataToSend.append('imagenes', file);
                } else if (file.file) {
                    // Si es un objeto con propiedad 'file' (como los que devuelve react-dropzone)
                    formDataToSend.append('imagenes', file.file);
                }
            });
        } else if (isEditing && formData.imagenUrls && formData.imagenUrls.length > 0) {
            // Si estamos editando y hay imágenes existentes, las enviamos como string JSON
            formDataToSend.append('imagenUrls', JSON.stringify(formData.imagenUrls));
        }
        
        try {
            // Nota: Solo necesitamos llamar a onSave, ya que en App.jsx se manejan onCreate y onUpdate
            if (typeof onSave === 'function') {
                await onSave(formDataToSend);
                // Limpiar el formulario después de guardar exitosamente
                handleReset();
                // Notificar al componente padre que la operación fue exitosa
                if (typeof onSaveSuccess === 'function') {
                    onSaveSuccess();
                }
            } else {
                throw new Error('No se encontró ninguna función para guardar el evento');
            }
        } catch (error) {
            console.error('Error al guardar el evento:', error);
            // setStatusMessage(`Error: ${error.message || 'No se pudo guardar el evento'}`);
            // No lanzamos el error para evitar que se propague más allá del componente
        }
    };

    const handleDeleteClick = async () => {
        if (!formData.id || !window.confirm(`¿Estás seguro de que quieres eliminar "${formData.titulo}"?`)) return;
        
        try {
            await onDelete(formData.id);
            // setStatusMessage('Evento eliminado con éxito.');
            handleReset();
        } catch (error) {
            console.error('Error al eliminar el evento:', error);
            // setStatusMessage(`Error al eliminar: ${error.message || 'Error desconocido'}`);
        }
    };

    useEffect(() => {
        // if (statusMessage) {
        //     const timer = setTimeout(() => setStatusMessage(''), 5000);
        //     return () => clearTimeout(timer);
        // }
    }, []);

    // Ordenar eventos por fecha descendente
    const sortedEvents = [...events].sort((a, b) => 
        new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    );

    return (
        <div className="form-wrapper">
            <h4 className="form-main-title">Administración de Eventos</h4>
            
            {/* {statusMessage && (
                <div className={`form-status-message ${statusMessage.includes('Error') ? 'error' : 'success'}`}>
                    {statusMessage}
                </div>
            )} */}

            <div className="form-selector-container">
                <label htmlFor="select-event" className="form-label">
                    {isEditing ? 'Editar evento existente:' : 'Crear nuevo o seleccionar para editar:'}
                </label>
                <select id="select-event" value={selectedEventId} onChange={handleSelectEvent} className="form-select" style={{ borderColor: COLORS.OCRE }}>
                    <option value="">-- Crear un Nuevo Evento --</option>
                    {sortedEvents.map(event => (
                        <option key={`event-${event.id}`} value={event.id}>
                            {event.fecha ? new Date(event.fecha).toLocaleDateString() : 'Sin fecha'} - {event.titulo}
                        </option>
                    ))}
                </select>
            </div>

            <form onSubmit={handleSubmit} className="event-form" style={{ borderColor: isEditing ? COLORS.SKY : COLORS.TIERRA }}>
                <h5 className="form-title" style={{ color: isEditing ? COLORS.SKY : COLORS.TIERRA }}>
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
                    <button type="submit" className="save-button">
                        {isEditing ? 'Actualizar Evento' : 'Crear Evento'}
                    </button>
                    {isEditing && (
                        <button 
                            type="button" 
                            className="delete-button"
                            onClick={handleDeleteClick}
                        >
                            Eliminar Evento
                        </button>
                    )}
                    <button 
                        type="button" 
                        onClick={handleReset} 
                        className="form-button form-button-reset"
                    >
                        {isEditing ? 'Cancelar' : 'Limpiar'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;