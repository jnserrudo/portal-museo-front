import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "./context/AuthContext";
import ErrorBoundary from "./components/ErrorBoundary";

// Estilos
import GlobalStyles from "./styles/GlobalStyles";
import theme from "./styles/theme";

// Componentes
import Layout from "./components/layout/Layout";
import LoadingSpinner from "./components/ui/LoadingSpinner";
import Modal from "./components/Modal";

// Páginas (cargadas con lazy loading)
const HomePage = lazy(() => import("./pages/HomePage"));
const ElMuseoPage = lazy(() => import("./pages/ElMuseoPage"));
const ColeccionPage = lazy(() => import("./pages/ColeccionPage"));
const VisitaPage = lazy(() => import("./pages/VisitaPage"));
const TecnologiaPage = lazy(() => import("./pages/TecnologiaPage"));
const EventosPage = lazy(() => import("./pages/EventosPage"));
const EventoDetallePage = lazy(() => import("./pages/EventoDetallePage"));
const ContactoPage = lazy(() => import("./pages/ContactoPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

// Servicios
import * as eventService from "./api/eventService";

const App = () => {
  // Estados de la aplicación
  const [events, setEvents] = useState([]);
  const [isEventsLoading, setIsEventsLoading] = useState(true);
  const [isPieceModalOpen, setIsPieceModalOpen] = useState(false);
  const [pieceModalContent, setPieceModalContent] = useState({
    title: '',
    description: '',
    imageUrl: ''
  });

  // Cargar eventos desde la API y ordenarlos por fecha
  const fetchEvents = async () => {
    setIsEventsLoading(true);
    try {
      const data = await eventService.getEvents();
      
      // Ordenar eventos por fecha (más cercanos primero)
      const sortedEvents = [...data].sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
        return dateA - dateB; // Orden ascendente (más cercanos primero)
      });
      
      // Filtrar eventos pasados (opcional, si lo prefieres)
      // const currentDate = new Date();
      // const upcomingEvents = sortedEvents.filter(event => new Date(event.fecha) >= currentDate);
      
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error al cargar los eventos:', error);
      toast.error('Error al cargar los eventos');
    } finally {
      setIsEventsLoading(false);
    }
  };

  // Cargar eventos al montar el componente
  useEffect(() => {
    fetchEvents();
  }, []);

  // Funciones CRUD para eventos
  const saveEvent = async (eventData) => {
    try {
      let savedEvent;
      if (eventData.id) {
        savedEvent = await eventService.updateEvent(eventData.id, eventData);
        toast.success('Evento actualizado correctamente');
      } else {
        savedEvent = await eventService.createEvent(eventData);
        toast.success('Evento creado correctamente');
      }
      await fetchEvents();
      return savedEvent;
    } catch (error) {
      console.error('Error al guardar el evento:', error);
      toast.error(`Error: ${error.message || 'No se pudo guardar el evento'}`);
      throw error;
    }
  };

  const deleteEvent = async (id) => {
    try {
      const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar este evento?');
      if (!confirmDelete) return false;
      
      await eventService.deleteEvent(id);
      await fetchEvents();
      toast.success('Evento eliminado correctamente');
      return true;
    } catch (error) {
      console.error('Error al eliminar el evento:', error);
      toast.error(`Error: ${error.message || 'No se pudo eliminar el evento'}`);
      throw error;
    }
  };

  // Manejo del modal de pieza
  const openPieceModal = (piece) => {
    setPieceModalContent({
      title: piece.title,
      description: piece.description,
      imageUrl: piece.imageUrl
    });
    setIsPieceModalOpen(true);
  };

  // Componente de carga de suspensión
  const SuspenseFallback = () => (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <LoadingSpinner size="large" />
      <p>Cargando...</p>
    </div>
  );

  // Componente de página con manejo de errores
  const Page = ({ children }) => (
    <ErrorBoundary>
      <Layout>
        {children}
      </Layout>
    </ErrorBoundary>
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AuthProvider>
        <Router basename="/portal">
          <ErrorBoundary>
            <Suspense fallback={<SuspenseFallback />}>
              <Routes>
                <Route path="/" element={
                  <Page>
                    <HomePage 
                      events={events}
                      isLoading={isEventsLoading}
                      onPieceClick={openPieceModal}
                    />
                  </Page>
                } />
                <Route path="/el-museo" element={
                  <Page>
                    <ElMuseoPage />
                  </Page>
                } />
                <Route path="/coleccion" element={
                  <Page>
                    <ColeccionPage onPieceClick={openPieceModal} />
                  </Page>
                } />
                <Route path="/visita" element={
                  <Page>
                    <VisitaPage />
                  </Page>
                } />
                <Route path="/tecnologia" element={
                  <Page>
                    <TecnologiaPage />
                  </Page>
                } />
                <Route path="/eventos" element={
                  <Page>
                    <EventosPage 
                      events={events} 
                      isLoading={isEventsLoading} 
                      onSaveEvent={saveEvent}
                      onDeleteEvent={deleteEvent}
                    />
                  </Page>
                } />
                <Route path="/eventos/:id" element={
                  <Page>
                    <EventoDetallePage />
                  </Page>
                } />
                <Route path="/contacto" element={
                  <Page>
                    <ContactoPage />
                  </Page>
                } />
                <Route path="*" element={
                  <Page>
                    <NotFoundPage />
                  </Page>
                } />
              </Routes>
            </Suspense>
          </ErrorBoundary>
        </Router>
        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </AuthProvider>

      {/* Modal de Detalle de Pieza */}
      <Modal
        isOpen={isPieceModalOpen}
        onClose={() => setIsPieceModalOpen(false)}
        title={pieceModalContent.title}
      >
        {pieceModalContent.imageUrl && (
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            <img 
              src={pieceModalContent.imageUrl} 
              alt={pieceModalContent.title}
              style={{ 
                maxWidth: '100%', 
                maxHeight: '300px', 
                borderRadius: '4px',
                marginBottom: '1rem'
              }} 
            />
          </div>
        )}
        <p>{pieceModalContent.description}</p>
      </Modal>
    </ThemeProvider>
  );
};

export default App;
