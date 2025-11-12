import React, { useState, useEffect } from 'react';
import { COLORS } from '../constants/colors';
import './EventForm.css'; // Importamos los nuevos estilos

const EventForm = ({ events, onSave, onDelete }) => {
    const [formData, setFormData] = useState({ id: '', title: '', description: '', date: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSelectEvent = (e) => {
        const id = e.target.value;
        setSelectedEventId(id);
        if (id) {
            const eventToEdit = events.find(event => event.id === id);
            if (eventToEdit) {
                const dateObj = new Date(eventToEdit.date);
                const formattedDate = dateObj.toISOString().split('T')[0];
                setFormData({ ...eventToEdit, date: formattedDate });
                setIsEditing(true);
            }
        } else {
            handleReset();
        }
    };

    const handleReset = () => {
        setFormData({ id: '', title: '', description: '', date: '' });
        setIsEditing(false);
        setSelectedEventId('');
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSave(formData);
            setStatusMessage(`Evento '${formData.title}' ${isEditing ? 'actualizado' : 'creado'} con éxito.`);
            handleReset();
        } catch (error) {
            setStatusMessage(`Error al guardar: ${error.message}`);
        }
    };

    const handleDeleteClick = async () => {
        if (!formData.id || !window.confirm(`¿Estás seguro de que quieres eliminar "${formData.title}"?`)) return;
        
        try {
            await onDelete(formData.id);
            setStatusMessage('Evento eliminado con éxito.');
            handleReset();
        } catch (error) {
            setStatusMessage(`Error al eliminar: ${error.message}`);
        }
    };

    useEffect(() => {
        if (statusMessage) {
            const timer = setTimeout(() => setStatusMessage(''), 5000);
            return () => clearTimeout(timer);
        }
    }, [statusMessage]);
    
    const sortedEvents = [...events].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return (
        <div className="form-wrapper">
            <h4 className="form-main-title">Administración de Eventos</h4>
            
            {statusMessage && (
                <div className={`form-status-message ${statusMessage.includes('Error') ? 'error' : 'success'}`}>
                    {statusMessage}
                </div>
            )}

            <div className="form-selector-container">
                <label htmlFor="select-event" className="form-label">
                    {isEditing ? 'Editar evento existente:' : 'Crear nuevo o seleccionar para editar:'}
                </label>
                <select id="select-event" value={selectedEventId} onChange={handleSelectEvent} className="form-select" style={{ borderColor: COLORS.OCRE }}>
                    <option value="">-- Crear un Nuevo Evento --</option>
                    {sortedEvents.map(event => (
                        <option key={event.id} value={event.id}>
                            {new Date(event.date).toLocaleDateString()} - {event.title}
                        </option>
                    ))}
                </select>
            </div>

            <form onSubmit={handleSubmit} className="event-form" style={{ borderColor: isEditing ? COLORS.SKY : COLORS.TIERRA }}>
                <h5 className="form-title" style={{ color: isEditing ? COLORS.SKY : COLORS.TIERRA }}>
                    {isEditing ? `Editando: ${formData.title}` : 'Crear Nuevo Evento'}
                </h5>

                <div className="form-field">
                    <label htmlFor="title" className="form-label">Título</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-field">
                    <label htmlFor="date" className="form-label">Fecha del Evento</label>
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required className="form-input" />
                </div>

                <div className="form-field">
                    <label htmlFor="description" className="form-label">Descripción Detallada</label>
                    <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleChange} required className="form-textarea"></textarea>
                </div>

                <div className="form-actions">
                    <button type="submit" className="form-button" style={{ backgroundColor: isEditing ? COLORS.SKY : COLORS.OCRE }}>
                        {isEditing ? 'Guardar Cambios' : 'Crear Evento'}
                    </button>
                    
                    {isEditing && (
                        <button type="button" onClick={handleDeleteClick} className="form-button form-button-delete">
                            Eliminar Evento
                        </button>
                    )}

                    <button type="button" onClick={handleReset} className="form-button form-button-reset">
                        {isEditing ? 'Cancelar Edición' : 'Limpiar Formulario'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;