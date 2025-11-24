import { toast } from 'react-toastify';

// Usamos la variable de entorno para la URL base de la API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getApiUrl = (endpoint) => {
  // Eliminamos cualquier /api/ duplicado
  const cleanEndpoint = endpoint.replace(/^\/api\//, '');
  // Si la URL base ya termina en /api, no lo agregamos de nuevo
  const baseUrl = API_BASE_URL.endsWith('/api') ? 
    API_BASE_URL : 
    `${API_BASE_URL}/api`;
  return `${baseUrl}/${cleanEndpoint}`;
};

/**
 * Obtiene todos los eventos del backend.
 * @returns {Promise<Array>} Lista de eventos
 */
/**
 * Obtiene todos los eventos del backend.
 * @returns {Promise<Array>} Lista de eventos
 */
export const getEvents = async () => {
    try {
        const apiUrl = getApiUrl('eventos');
        // Add timestamp to prevent caching
        const urlWithTimestamp = `${apiUrl}?t=${new Date().getTime()}`;
        console.log('Solicitando eventos a:', urlWithTimestamp);
        
        const response = await fetch(urlWithTimestamp, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch (e) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            throw new Error(errorData.message || `Error al obtener los eventos (${response.status})`);
        }
        const data = await response.json();
        console.log('Respuesta del servidor:', data);
        return data;
    } catch (error) {
        console.error('Error en getEvents:', {
            message: error.message,
            stack: error.stack,
            url: window.location.href
        });
        throw error; // Re-lanzamos el error para que lo maneje el componente
    }
};

/**
 * Crea un nuevo evento con soporte para subida de archivos
 * @param {FormData} formData - Datos del formulario incluyendo archivos
 * @returns {Promise<Object>} Datos del evento creado
 */
export const createEvent = async (formData) => {
    try {
        console.log('Enviando datos al servidor...');
        
        // Mostrar el contenido del FormData para depuración
        const formDataObj = {};
        for (let [key, value] of formData.entries()) {
            formDataObj[key] = value;
        }
        console.log('Contenido de FormData:', formDataObj);
        
        const response = await fetch(getApiUrl('eventos'), {
            method: 'POST',
            body: formData,
            // No establecer Content-Type manualmente para FormData
            // El navegador lo hará automáticamente con el boundary correcto
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include' // Importante para mantener la sesión si usas autenticación
        });

        let responseData;
        try {
            // Intentar parsear la respuesta como JSON
            responseData = await response.json();
        } catch (e) {
            // Si no se puede parsear como JSON, lanzar un error con el texto de la respuesta
            const text = await response.text();
            throw new Error(`Error al parsear la respuesta del servidor: ${text}`);
        }
        
        if (!response.ok) {
            console.error('Error en la respuesta del servidor:', {
                status: response.status,
                statusText: response.statusText,
                data: responseData
            });
            
            const errorMessage = responseData.message || responseData.error || `Error al crear el evento (${response.status})`;
            
            // Mostrar notificación de error
            toast.error(errorMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            
            throw new Error(errorMessage);
        }
        console.log('Respuesta del servidor:', responseData);
        // Mostrar notificación de éxito
        toast.success(`Evento "${responseData.data.titulo}" creado exitosamente`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        return responseData;
    } catch (error) {
        console.error('Error en createEvent:', {
            message: error.message,
            stack: error.stack,
            formData: formData ? Object.fromEntries(formData.entries()) : null
        });
        throw error;
    }
};

/**
 * Actualiza un evento existente
 * @param {number} id - ID del evento a actualizar
 * @param {FormData} formData - Datos del formulario incluyendo imágenes
 * @returns {Promise<Object>} Evento actualizado
 */
export const updateEvent = async (id, formData) => {
    try {
        console.log(`Actualizando evento con ID: ${id}`);
        
        // Mostrar el contenido del FormData para depuración
        const formDataObj = {};
        for (let [key, value] of formData.entries()) {
            formDataObj[key] = value;
        }
        console.log('Contenido de FormData para actualización:', formDataObj);
        
        const response = await fetch(getApiUrl(`eventos/${id}`), {
            method: 'PUT',
            body: formData,
            // No establecer Content-Type manualmente para FormData
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include'
        });

        let responseData;
        try {
            // Intentar parsear la respuesta como JSON
            responseData = await response.json();
        } catch (e) {
            // Si no se puede parsear como JSON, lanzar un error con el texto de la respuesta
            const text = await response.text();
            throw new Error(`Error al parsear la respuesta del servidor: ${text}`);
        }
        
        if (!response.ok) {
            console.error('Error en la respuesta del servidor al actualizar:', {
                status: response.status,
                statusText: response.statusText,
                data: responseData
            });
            
            const errorMessage = responseData.message || responseData.error || `Error al actualizar el evento (${response.status})`;
            
            // Mostrar notificación de error
            toast.error(errorMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            
            throw new Error(errorMessage);
        }
        
        // Mostrar notificación de éxito
        toast.success(`Evento "${responseData.data.titulo}" actualizado exitosamente`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        return responseData;
    } catch (error) {
        console.error('Error en updateEvent:', {
            message: error.message,
            stack: error.stack,
            formData: formData ? Object.fromEntries(formData.entries()) : null
        });
        throw error;
    }
};

/**
 * Elimina un evento
 * @param {number} id - ID del evento a eliminar
 * @returns {Promise<Object>} Resultado de la operación
 */
/**
 * Obtiene un evento por su ID
 * @param {string|number} id - ID del evento a obtener
 * @returns {Promise<Object>} Datos del evento
 */
export const getEventById = async (id) => {
    try {
        const apiUrl = getApiUrl(`eventos/${id}`);
        console.log(`Solicitando evento con ID ${id} desde:`, apiUrl);
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            let errorData;
            try {
                errorData = JSON.parse(errorText);
            } catch (e) {
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }
            throw new Error(errorData.message || `Error al obtener el evento (${response.status})`);
        }
        
        const data = await response.json();
        console.log('Evento obtenido:', data);
        return data;
    } catch (error) {
        console.error('Error en getEventById:', {
            message: error.message,
            stack: error.stack,
            url: window.location.href
        });
        throw error;
    }
};

/**
 * Elimina un evento
 * @param {string|number} id - ID del evento a eliminar
 * @returns {Promise<Object>} Resultado de la operación
 */
export const deleteEvent = async (id) => {
    try {
        const response = await fetch(getApiUrl(`eventos/${id}`), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            },
            credentials: 'include' // Importante para mantener la sesión si usas autenticación
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            const errorMessage = errorData.message || 'Error al eliminar el evento';
            
            // Mostrar notificación de error
            toast.error(errorMessage, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
            
            throw new Error(errorMessage);
        }
        
        const result = await response.json();
        
        // Mostrar notificación de éxito
        toast.success('Evento eliminado correctamente', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        
        return result;
    } catch (error) {
        console.error('Error en deleteEvent:', error);
        throw error;
    }
};