// src/api/eventService.js

// --- 1. BASE DE DATOS SIMULADA EN MEMORIA ---
// Estos son los datos con los que la aplicación comenzará.
let mockEvents = [
    {
        id: '1',
        title: 'Exposición de Textiles Ancestrales',
        description: 'Un recorrido único por las técnicas de tejido de la Puna, transmitidas de generación en generación. Incluye demostraciones en vivo.',
        date: '2024-08-15T00:00:00',
    },
    {
        id: '2',
        title: 'Charla: La Ingeniería del Tren a las Nubes',
        description: 'El historiador local, Ricardo Rojas, presenta un análisis fascinante sobre los desafíos y proezas de la construcción del Ramal C14.',
        date: '2024-09-05T00:00:00',
    },
    {
        id: '3',
        title: 'Noche de los Museos: Edición Puna',
        description: 'El museo abre sus puertas de noche con visitas guiadas especiales, música andina en vivo y degustación de productos regionales.',
        date: '2024-09-21T00:00:00',
    },
];

// --- 2. FUNCIONES DE LA API SIMULADA ---

// Función para simular un retraso de red
const simulateNetworkLatency = (callback) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(callback());
        }, 500); // 500ms de retraso
    });
};

/**
 * Obtiene todos los eventos.
 */
export const getEvents = () => {
    return simulateNetworkLatency(() => {
        console.log("SIMULACIÓN: Obteniendo todos los eventos", mockEvents);
        // Devolvemos una copia para evitar mutaciones directas del array original
        return [...mockEvents];
    });
};

/**
 * Crea un nuevo evento.
 * @param {object} eventData - Datos del evento sin ID.
 */
export const createEvent = (eventData) => {
    return simulateNetworkLatency(() => {
        const newEvent = {
            ...eventData,
            // Creamos un ID único simple para la simulación
            id: Date.now().toString(), 
        };
        mockEvents.push(newEvent);
        console.log("SIMULACIÓN: Evento creado", newEvent);
        return newEvent;
    });
};

/**
 * Actualiza un evento existente.
 * @param {string} id - ID del evento a actualizar.
 * @param {object} updatedData - Nuevos datos para el evento.
 */
export const updateEvent = (id, updatedData) => {
    return simulateNetworkLatency(() => {
        const eventIndex = mockEvents.findIndex(event => event.id === id);
        if (eventIndex !== -1) {
            mockEvents[eventIndex] = { ...mockEvents[eventIndex], ...updatedData };
            console.log("SIMULACIÓN: Evento actualizado", mockEvents[eventIndex]);
            return mockEvents[eventIndex];
        }
        throw new Error("Evento no encontrado para actualizar");
    });
};

/**
 * Elimina un evento.
 * @param {string} id - ID del evento a eliminar.
 */
export const deleteEvent = (id) => {
    return simulateNetworkLatency(() => {
        const initialLength = mockEvents.length;
        mockEvents = mockEvents.filter(event => event.id !== id);
        if (mockEvents.length < initialLength) {
            console.log("SIMULACIÓN: Evento eliminado con ID", id);
            return { success: true };
        }
        throw new Error("Evento no encontrado para eliminar");
    });
};