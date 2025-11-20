import React, { useState, useEffect } from 'react';
import { format, parseISO, isAfter, isBefore, isToday } from 'date-fns';
import { es } from 'date-fns/locale';
import styled from 'styled-components';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import Modal from '../components/Modal';
import EventForm from '../components/events/EventForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const PageContainer = styled.div`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.general};
  min-height: calc(100vh - 200px);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
`;

const Title = styled.h1`
  font-size: ${theme.typography.sizes.h1};
  color: ${theme.colors.primary};
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  flex-wrap: wrap;
`;

const SearchContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  
  input {
    width: 100%;
    padding: ${theme.spacing.sm} ${theme.spacing.lg} ${theme.spacing.sm} ${theme.spacing.xl};
    border: 1px solid ${theme.colors.border};
    border-radius: ${theme.borderRadius.md};
    font-size: 1rem;
    transition: ${theme.transitions.default};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 2px ${theme.colors.primary}20;
    }
  }
  
  svg {
    position: absolute;
    left: ${theme.spacing.sm};
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.text.light};
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.xl};
  overflow-x: auto;
  padding-bottom: ${theme.spacing.xs};
  
  &::-webkit-scrollbar {
    height: 4px;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.border};
    border-radius: 4px;
  }
`;

const Tab = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  border: 1px solid ${props => props.$active ? theme.colors.primary : theme.colors.border};
  background-color: ${props => props.$active ? theme.colors.primary : 'transparent'};
  color: ${props => props.$active ? 'white' : theme.colors.text.dark};
  border-radius: ${theme.borderRadius.lg};
  cursor: pointer;
  font-weight: 500;
  white-space: nowrap;
  transition: ${theme.transitions.default};
  
  &:hover {
    background-color: ${props => props.$active ? theme.colors.primary : theme.colors.background.light};
  }
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const EventCard = styled.article`
  background-color: white;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.light};
  transition: ${theme.transitions.default};
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const EventImage = styled.div`
  height: 180px;
  background: ${props => props.$imageUrl ? `url(${props.$imageUrl})` : theme.colors.background.light};
  background-size: cover;
  background-position: center;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%);
  }
`;

const EventDateBadge = styled.div`
  position: absolute;
  top: ${theme.spacing.md};
  left: ${theme.spacing.md};
  background-color: ${theme.colors.accent};
  color: white;
  padding: ${theme.spacing.xs} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-weight: 600;
  z-index: 1;
  text-align: center;
  
  .day {
    display: block;
    font-size: 1.5rem;
    line-height: 1;
    margin-bottom: 2px;
  }
  
  .month {
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
    opacity: 0.9;
  }
`;

const EventContent = styled.div`
  padding: ${theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EventTitle = styled.h3`
  font-size: 1.25rem;
  color: ${theme.colors.primary};
  margin: 0 0 ${theme.spacing.sm} 0;
`;

const EventMeta = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.text.medium};
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.md};
  
  svg {
    color: ${theme.colors.accent};
  }
`;

const EventDescription = styled.p`
  color: ${theme.colors.text.dark};
  margin: 0 0 ${theme.spacing.lg} 0;
  flex: 1;
`;

const EventActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: auto;
  
  button {
    flex: 1;
  }
`;

const AdminActions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.md};
  padding-top: ${theme.spacing.md};
  border-top: 1px solid ${theme.colors.border};
  
  button {
    flex: 1;
    padding: ${theme.spacing.xs};
    font-size: 0.9rem;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${theme.spacing.xl} 0;
  color: ${theme.colors.text.medium};
  
  svg {
    font-size: 3rem;
    margin-bottom: ${theme.spacing.md};
    color: ${theme.colors.border};
  }
  
  h3 {
    color: ${theme.colors.text.dark};
    margin-bottom: ${theme.spacing.sm};
  }
`;

const EventosPage = ({ 
  events = [], 
  isLoading, 
  isAdmin, 
  onSaveEvent, 
  onDeleteEvent 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('todos');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  // Filtrar eventos según el término de búsqueda y el filtro activo
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const now = new Date();
    const eventDate = new Date(event.date);
    
    const matchesFilter = 
      activeFilter === 'todos' ||
      (activeFilter === 'proximos' && isAfter(eventDate, now)) ||
      (activeFilter === 'hoy' && isToday(eventDate)) ||
      (activeFilter === 'pasados' && isBefore(eventDate, now));
    
    return matchesSearch && matchesFilter;
  });

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        await onDeleteEvent(id);
        toast.success('Evento eliminado correctamente');
      } catch (error) {
        toast.error('Error al eliminar el evento');
      }
    }
  };

  const handleSubmit = async (eventData) => {
    try {
      await onSaveEvent(eventData);
      setIsFormOpen(false);
      setCurrentEvent(null);
      toast.success(`Evento ${eventData.id ? 'actualizado' : 'creado'} correctamente`);
    } catch (error) {
      toast.error(`Error al ${eventData.id ? 'actualizar' : 'crear'} el evento`);
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <Container style={{ textAlign: 'center', padding: '4rem 0' }}>
          <LoadingSpinner size="large" />
          <p>Cargando eventos...</p>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <Header>
          <Title>Eventos</Title>
          <Controls>
            <SearchContainer>
              <FaSearch />
              <input 
                type="text" 
                placeholder="Buscar eventos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
            {isAdmin && (
              <Button 
                variant="primary" 
                onClick={() => {
                  setCurrentEvent(null);
                  setIsFormOpen(true);
                }}
                startIcon={<FaPlus />}
              >
                Nuevo Evento
              </Button>
            )}
          </Controls>
        </Header>

        <FilterTabs>
          <Tab 
            $active={activeFilter === 'todos'}
            onClick={() => setActiveFilter('todos')}
          >
            Todos los Eventos
          </Tab>
          <Tab 
            $active={activeFilter === 'proximos'}
            onClick={() => setActiveFilter('proximos')}
          >
            Próximos
          </Tab>
          <Tab 
            $active={activeFilter === 'hoy'}
            onClick={() => setActiveFilter('hoy')}
          >
            Hoy
          </Tab>
          <Tab 
            $active={activeFilter === 'pasados'}
            onClick={() => setActiveFilter('pasados')}
          >
            Pasados
          </Tab>
        </FilterTabs>

        {filteredEvents.length > 0 ? (
          <EventsGrid>
            {filteredEvents.map((event) => {
              const eventDate = new Date(event.date);
              const formattedDate = format(eventDate, "d 'de' MMMM, yyyy", { locale: es });
              const day = format(eventDate, 'd');
              const month = format(eventDate, 'MMM', { locale: es });
              
              return (
                <EventCard key={event.id}>
                  <EventImage $imageUrl={event.imageUrl}>
                    <EventDateBadge>
                      <span className="day">{day}</span>
                      <span className="month">{month}</span>
                    </EventDateBadge>
                  </EventImage>
                  <EventContent>
                    <EventTitle>{event.title}</EventTitle>
                    <EventMeta>
                      <FaCalendarAlt />
                      <span>{formattedDate} • {event.time}</span>
                    </EventMeta>
                    <EventMeta>
                      <FaMapMarkerAlt />
                      <span>{event.location}</span>
                    </EventMeta>
                    <EventDescription>
                      {event.description.length > 150 
                        ? `${event.description.substring(0, 150)}...` 
                        : event.description}
                    </EventDescription>
                    <EventActions>
                      <Button variant="outline" size="small">
                        Más información
                      </Button>
                      <Button size="small">
                        Reservar
                      </Button>
                    </EventActions>
                    
                    {isAdmin && (
                      <AdminActions>
                        <Button 
                          variant="outline" 
                          size="small" 
                          onClick={() => handleEdit(event)}
                          startIcon={<FaEdit />}
                        >
                          Editar
                        </Button>
                        <Button 
                          variant="danger" 
                          size="small" 
                          onClick={() => handleDelete(event.id)}
                          startIcon={<FaTrash />}
                        >
                          Eliminar
                        </Button>
                      </AdminActions>
                    )}
                  </EventContent>
                </EventCard>
              );
            })}
          </EventsGrid>
        ) : (
          <EmptyState>
            <FaCalendarAlt />
            <h3>No se encontraron eventos</h3>
            <p>No hay eventos programados para los criterios de búsqueda seleccionados.</p>
            {isAdmin && (
              <div style={{ marginTop: theme.spacing.md }}>
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setCurrentEvent(null);
                    setIsFormOpen(true);
                  }}
                  startIcon={<FaPlus />}
                >
                  Crear primer evento
                </Button>
              </div>
            )}
          </EmptyState>
        )}
      </Container>

      {/* Modal de formulario de evento */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCurrentEvent(null);
        }}
        title={currentEvent ? 'Editar Evento' : 'Nuevo Evento'}
        maxWidth="600px"
      >
        <EventForm 
          event={currentEvent}
          onSubmit={handleSubmit}
          onCancel={() => {
            setIsFormOpen(false);
            setCurrentEvent(null);
          }}
        />
      </Modal>
    </PageContainer>
  );
};

export default EventosPage;
