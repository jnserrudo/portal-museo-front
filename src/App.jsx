import React, { useState, useEffect } from "react";
import { COLORS } from "./constants/colors";
import * as eventService from "./api/eventService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.css"; // Importa el archivo CSS
// Componentes y Secciones
import Modal from "./components/Modal";
import EventForm from "./components/EventForm";
import HomeSection from "./components/sections/HomeSection";
import ColeccionesSection from "./components/sections/ColeccionesSection";
import VisitaSection from "./components/sections/VisitaSection";

// NUEVO: Un componente simple para el login simulado
const LoginModal = ({ onLogin }) => {
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulación: si la contraseña es "admin123", el login es exitoso.
    if (password === "admin123") {
      onLogin();
    } else {
      alert("Contraseña incorrecta");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <label htmlFor="password">Contraseña de Administrador:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Prueba con: admin123"
        className="form-input" // Reutilizamos una clase de EventForm.css
      />
      <button
        type="submit"
        className="form-button"
        style={{ backgroundColor: COLORS.SKY }}
      >
        Ingresar
      </button>
    </form>
  );
};

const App = () => {
  // Estados de la UI
  const [currentPage, setCurrentPage] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Estados de Datos
  const [events, setEvents] = useState([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);

  // Estados de Modales
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // NUEVO
    const [isAdmin, setIsAdmin] = useState(false); // NUEVO: Estado para saber si el usuario es admin

  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isPieceModalOpen, setIsPieceModalOpen] = useState(false);
  const [pieceModalContent, setPieceModalContent] = useState({
    imgSrc: "",
    title: "",
    description: "",
  });

  // --- Carga inicial de datos desde la API ---
  const fetchEvents = async () => {
    console.log('Fetching events...');
    try {
      setIsEventsLoading(true);
      const data = await eventService.getEvents();
      console.log('Events received:', data);
      setEvents(data);
      console.log('Events state updated');
    } catch (error) {
      console.error('Error fetching events:', error);
      toast.error('Error al cargar los eventos');
    } finally {
      setIsEventsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente.

  // Agrega esto temporalmente en App.jsx
useEffect(() => {
  console.log('Configuración de entorno:', {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_BASE_URL: import.meta.env.VITE_BASE_URL,
    NODE_ENV: import.meta.env.MODE
  });
}, []);
  // --- Funciones CRUD para pasar al formulario ---
  const saveEvent = async (eventData) => {
    console.log('Datos recibidos en saveEvent:', eventData);
    let savedEvent;
    
    try {
      // Verificar si es FormData
      const isFormData = eventData instanceof FormData;
      
      if (isFormData) {
        const id = eventData.get('id');
        
        if (id) {
          // Actualizar evento existente
          savedEvent = await eventService.updateEvent(id, eventData);
        } else {
          // Crear nuevo evento
          savedEvent = await eventService.createEvent(eventData);
        }
      } else {
        // Manejo para objeto regular (backward compatibility)
        if (eventData.id) {
          // Actualizar evento existente
          savedEvent = await eventService.updateEvent(eventData.id, eventData);
        } else {
          // Crear nuevo evento
          const { id, ...newEventData } = eventData;
          savedEvent = await eventService.createEvent(newEventData);
        }
      }
      
      // Actualizar la lista de eventos
      await fetchEvents();
      
      // Cerrar el modal de administración después de guardar exitosamente
      setIsAdminModalOpen(false);
      
      return savedEvent;
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      const errorMessage = error.response?.data?.message || error.message || 'No se pudo guardar el evento';
      toast.error(`Error: ${errorMessage}`);
      throw error; // Re-lanzar el error para que el formulario lo maneje
    }
  };

  const deleteEvent = async (id) => {
    try {
      // Mostrar confirmación antes de eliminar
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este evento?');
      if (!confirmDelete) return false;
      
      await eventService.deleteEvent(id);
      
      // Mostrar notificación de éxito
      toast.success('Evento eliminado exitosamente');
      
      // Actualizar la lista de eventos
      await fetchEvents();
      
      return true;
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      toast.error(`Error: ${error.message || 'No se pudo eliminar el evento'}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      throw error;
    }
  };

  // --- Handlers de Navegación y Modales ---
  const handleNavigation = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  const openPieceModal = (imgSrc, title, description) => {
    setPieceModalContent({ imgSrc, title, description });
    setIsPieceModalOpen(true);
  };

  const closePieceModal = () => setIsPieceModalOpen(false);

  // NUEVO: Lógica para el flujo de admin
  const handleAdminClick = () => {
    if (isAdmin) {
      setIsAdminModalOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setIsLoginModalOpen(false);
    setIsAdminModalOpen(true); // Abrir el panel de admin directamente tras el login
  };

  // --- Renderizado Condicional de Páginas ---
  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomeSection events={events} isLoading={isEventsLoading} />;
      case "colecciones":
        return <ColeccionesSection openPieceModal={openPieceModal} />;
      case "visita":
        return <VisitaSection />;
      default:
        return (
          <div className="container mx-auto px-4 py-20 text-center">
            <h2
              className="text-3xl font-serif mb-4"
              style={{ color: COLORS.OCRE }}
            >
              Sección en Construcción
            </h2>
            <p className="text-lg" style={{ color: COLORS.TIERRA }}>
              Página para <strong>{currentPage.toUpperCase()}</strong>.
            </p>
          </div>
        );
    }
  };

  // NUEVO: Array de navegación más completo
  const navItems = [
    "home",
    "el_museo",
    "colecciones",
    "visita",
    "educacion",
    "agenda",
    "contacto",
  ];

  return (
    <div>
      {/* ToastContainer para mostrar notificaciones */}
      {/* Botón de prueba para los toasts - Solo para desarrollo */}
      {process.env.NODE_ENV === 'development'&& false && (
        <button 
          onClick={() => {
            toast.success('¡Notificación de prueba exitosa!');
            toast.error('¡Error de prueba!');
          }}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: 1000,
            backgroundColor: COLORS.OCRE,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
          }}
        >
          Probar Notificaciones
        </button>
      )}
      
      {/* Configuración del ToastContainer */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        style={{ marginTop: '70px' }}
        toastStyle={{
          backgroundColor: COLORS.OCRE,
          color: '#fff',
          fontSize: '14px',
          padding: '12px 20px',
        }}
      />
      <header className="main-header">
        <div className="container header-container">
          <h1 className="header-logo">Museo Regional Andino</h1>
          <nav className="nav-desktop">
            {/* NUEVO: Usamos el array completo de ítems */}
            {navItems.map((page) => (
              <a
                key={page}
                href="#"
                onClick={() => handleNavigation(page)}
                className={`nav-link ${currentPage === page ? "active" : ""}`}
              >
                {page.toUpperCase().replace("_", " ")}
              </a>
            ))}
          </nav>
          <div className="header-utils">
            <button onClick={handleAdminClick} className="admin-button">
              ADMIN
            </button>

            <button className="menu-button">
              {/* Icono SVG de Hamburguesa */}
            </button>
          </div>
        </div>
      </header>

      <main style={{ paddingTop: "70px" }}>{renderPage()}</main>

      <footer className="main-footer">
        <div className="container footer-grid">
          <div className="footer-section">
            <h4>Museo Regional Andino</h4>
            <p>
              Nuestra misión es preservar y difundir el patrimonio cultural de
              la Puna.
            </p>
          </div>
          <div className="footer-section">
            <h4>Contacto</h4>
            <ul>
              <li>Av. 9 de Julio s/n, Salta</li>
              <li>(387) 123-4567</li>
            </ul>
          </div>
        </div>
      </footer>


  {/* NUEVO: Modal de Login */}
            <Modal title="Acceso de Administrador" isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
                <LoginModal onLogin={handleLoginSuccess} />
            </Modal>
            
      <Modal
        /* title="Administración de Eventos" */
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
      >
        <EventForm 
          events={events} 
          onSave={saveEvent} 
          onDelete={deleteEvent}
          onCreate={saveEvent}
          onUpdate={(id, data) => saveEvent(data)}
          onSaveSuccess={() => {
            // Opcional: Cerrar el modal después de guardar exitosamente
            // setIsAdminModalOpen(false);
          }}
        />
      </Modal>

      <Modal
        title={pieceModalContent.title}
        isOpen={isPieceModalOpen}
        onClose={() => setIsPieceModalOpen(false)}
      >
        <img
          src={pieceModalContent.imgSrc}
          alt={pieceModalContent.title}
          style={{
            width: "100%",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
          }}
        />
        <p>{pieceModalContent.description}</p>
      </Modal>
    </div>
  );
};

export default App;
