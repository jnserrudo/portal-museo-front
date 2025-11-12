// Reemplaza esta URL con la dirección de tu API cuando la tengas lista.
const API_BASE_URL = 'https://tu-api-backend.com/api'; // Ejemplo

/**
 * Obtiene todos los eventos del backend.
 */
export const getEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/events`);
        if (!response.ok) {
            throw new Error('Error al obtener los eventos.');
        }
        return await response.json();
    } catch (error) {
        console.error("API Error (getEvents):", error);
        // Devolvemos un array vacío en caso de error para que la UI no se rompa.
        return []; 
    }
};

/**
 * Crea un nuevo evento.
 * @param {object} eventData - Los datos del evento a crear.
 */
export const createEvent = async (eventData) => {
    const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });
    if (!response.ok) {
        throw new Error('Error al crear el evento.');
    }
    return await response.json();
};

/**
 * Actualiza un evento existente.
 * @param {string} id - El ID del evento a actualizar.
 * @param {object} eventData - Los nuevos datos del evento.
 */
export const updateEvent = async (id, eventData) => {
    const response = await fetch(`${API_-URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
    });
    if (!response.ok) {
        throw new Error('Error al actualizar el evento.');
    }
    return await response.json();
};

/**
 * Elimina un evento.
 * @param {string} id - El ID del evento a eliminar.
 */
export const deleteEvent = async (id) => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error al eliminar el evento.');
    }
    // El método DELETE a menudo no devuelve contenido.
    return { success: true }; 
};