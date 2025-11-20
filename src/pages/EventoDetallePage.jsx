import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaCalendarAlt, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import * as eventService from '../api/eventService';

const PageContainer = styled.div`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.general};
  min-height: 100vh;
  margin-top: 60px; /* Altura del header */
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const BackButton = styled(Button)`
  margin: ${theme.spacing.md} 0;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${theme.colors.primary};
  color: white;
  border: none;
  
  &:hover {
    background-color: ${theme.colors.primaryDark};
    color: white;
  }
`;

const EventContainer = styled.div`
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  margin-bottom: ${theme.spacing.xl};
`;

const EventHeader = styled.div`
  position: relative;
  height: 400px;
  background: ${({ $imageUrl }) => {
    if (!$imageUrl) return theme.colors.primary;
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const imagePath = $imageUrl.startsWith('http') ? $imageUrl : `${baseUrl}${$imageUrl}`;
    return `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${imagePath})`;
  }};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: flex-end;
  padding: ${theme.spacing.xl};
  color: ${theme.colors.text.light};
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const EventTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  color: ${theme.colors.text.light};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.md};
  font-size: 1.1rem;
  
  & > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 0.5rem 1rem;
    border-radius: ${theme.borderRadius.full};
  }
`;

const EventContent = styled.div`
  padding: ${theme.spacing.xl};
  
  @media (max-width: 768px) {
    padding: ${theme.spacing.lg} ${theme.spacing.md};
  }
`;

const EventDescription = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: ${theme.colors.text.dark};
  white-space: pre-line;
  margin-bottom: ${theme.spacing.xl};
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.xl};
`;

const GalleryImage = styled.div`
  height: 200px;
  border-radius: ${theme.borderRadius.md};
  background: ${({ $imageUrl }) => 
    $imageUrl 
      ? `url(${$imageUrl})`
      : theme.colors.background.grey};
  background-size: cover;
  background-position: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const EventoDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGoBack = () => {
    // Navegar a la página anterior
    navigate(-1);
    // Hacer scroll al inicio de la página
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const data = await eventService.getEventById(id);
        console.log(data);
        setEvent(data);
      } catch (err) {
        console.error('Error al cargar el evento:', err);
        setError('No se pudo cargar la información del evento.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchEvent();
    }
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no definida';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('es-ES', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error('Error al formatear la fecha:', error);
      return 'Fecha inválida';
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <Container style={{ textAlign: 'center', padding: '4rem 0' }}>
          <LoadingSpinner size="large" />
          <p style={{ marginTop: '1rem' }}>Cargando evento...</p>
        </Container>
      </PageContainer>
    );
  }

  if (error || !event) {
    return (
      <PageContainer>
        <Container style={{ textAlign: 'center', padding: '4rem 0' }}>
          <h2>Error al cargar el evento</h2>
          <p>{error || 'El evento solicitado no existe o no está disponible.'}</p>
          <Button 
            onClick={() => navigate('/eventos')} 
            variant="primary" 
            style={{ marginTop: '1rem' }}
          >
            Volver a Eventos
          </Button>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <BackButton 
          onClick={handleGoBack}
          variant="text"
        >
          <FaArrowLeft /> Volver
        </BackButton>

        <EventContainer>
          <EventHeader $imageUrl={event.imagenUrls && event.imagenUrls.length > 0 ? event.imagenUrls[0] : ''}>
            <div>
              <EventTitle>{event.titulo}</EventTitle>
              <EventMeta>
                <div>
                  <FaCalendarAlt />
                  <span>{formatDate(event.fecha)}</span>
                </div>
                {event.lugar && (
                  <div>
                    <FaMapMarkerAlt />
                    <span>{event.lugar}</span>
                  </div>
                )}
              </EventMeta>
            </div>
          </EventHeader>

          <EventContent>
            <EventDescription>
              {event.descripcion}
            </EventDescription>

            {event.imagenUrls && event.imagenUrls.length > 1 && (
              <>
                <h3>Galería de Imágenes</h3>
                <Gallery>
                  {event.imagenUrls.slice(1).map((url, index) => (
                    <GalleryImage 
                      key={index} 
                      $imageUrl={url} 
                      alt={`Imagen ${index + 2} de ${event.titulo}`}
                      onClick={() => window.open(url, '_blank')}
                    />
                  ))}
                </Gallery>
              </>
            )}
          </EventContent>
        </EventContainer>
      </Container>
    </PageContainer>
  );
};

export default EventoDetallePage;
