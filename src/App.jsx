import React, { useState, useEffect } from "react";
import { COLORS } from "./constants/colors";
import * as eventService from "./api/eventServiceSimulated";
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
    setIsEventsLoading(true);
    const data = await eventService.getEvents();
    setEvents(data);
    setIsEventsLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, []); // El array vacío asegura que se ejecute solo una vez al montar el componente.

  // --- Funciones CRUD para pasar al formulario ---
  const saveEvent = async (eventData) => {
    if (eventData.id) {
      // Actualizar evento existente
      await eventService.updateEvent(eventData.id, eventData);
    } else {
      // Crear nuevo evento
      // Excluimos el 'id' vacío que podría enviar el formulario
      const { id, ...newEventData } = eventData;
      await eventService.createEvent(newEventData);
    }
    // Después de guardar, volvemos a cargar la lista para ver los cambios
    await fetchEvents();
  };

  const deleteEvent = async (id) => {
    await eventService.deleteEvent(id);
    // Volvemos a cargar la lista para reflejar la eliminación
    await fetchEvents();
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
        <EventForm events={events} onSave={saveEvent} onDelete={deleteEvent} />
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
