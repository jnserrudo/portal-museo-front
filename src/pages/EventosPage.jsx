import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { format, parseISO, isValid, compareDesc } from 'date-fns';
import { es } from 'date-fns/locale';
import styled from 'styled-components';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaPlus, FaEdit, FaTrash, FaClock, FaInfoCircle, FaTimes, FaTicketAlt } from 'react-icons/fa';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';
import Modal from '../components/Modal';
import EventForm from '../components/EventForm';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../context/AuthContext';

// --- Styled Components ---

const PageContainer = styled.div`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.general};
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: ${theme.spacing.xl};
  flex-wrap: wrap;
  gap: ${theme.spacing.md};
  border-bottom: 2px solid ${theme.colors.primary}20;
  padding-bottom: ${theme.spacing.md};
`;

const TitleColumn = styled.div`
  flex: 1;
`;

const Title = styled.h1`
  font-size: ${theme.typography.sizes.h2};
  color: ${theme.colors.primary};
  margin: 0 0 ${theme.spacing.xs} 0;
  font-weight: ${theme.typography.weights.black};
  letter-spacing: -0.5px;
`;

const Subtitle = styled.p`
  color: ${theme.colors.text.muted};
  font-size: 1.1rem;
  margin: 0;
`;

const Controls = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  align-items: center;
  flex-wrap: wrap;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  min-width: 300px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    min-width: 100%;
    width: 100%;
  }
  
  input {
    width: 100%;
    padding: 12px 20px 12px 45px;
    border: 1px solid ${theme.colors.border || '#ddd'};
    border-radius: 50px; /* Pill shape */
    font-size: 1rem;
    transition: ${theme.transitions.default};
    background-color: white;
    box-shadow: ${theme.shadows.light};
    
    &:focus {
      outline: none;
      border-color: ${theme.colors.primary};
      box-shadow: 0 0 0 3px ${theme.colors.primary}20;
    }
  }
  
  svg {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: ${theme.colors.primary};
    font-size: 1.1rem;
  }
`;

const MonthSection = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const MonthHeader = styled.h2`
  font-size: 1.8rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  text-transform: capitalize;
  
  &::before {
    content: '';
    display: block;
    width: 8px;
    height: 30px;
    background-color: ${theme.colors.primary};
    border-radius: 4px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.article`
  background: white;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.medium};
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
  border: 1px solid rgba(0,0,0,0.05);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: ${theme.shadows.dark};
    
    img {
      transform: scale(1.05);
    }
  }
`;

const CardImageContainer = styled.div`
  height: 220px;
  overflow: hidden;
  position: relative;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.5s ease;
  background-color: ${theme.colors.background.section};
`;

const CardImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, ${theme.colors.primary}20, ${theme.colors.accent}40);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  color: ${theme.colors.primary};
  
  svg {
    font-size: 3rem;
    opacity: 0.5;
  }
  
  span {
    font-size: 0.9rem;
    opacity: 0.7;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const DateBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: white;
  padding: 8px 12px;
  border-radius: 12px;
  text-align: center;
  box-shadow: ${theme.shadows.medium};
  font-weight: ${theme.typography.weights.bold};
  color: ${theme.colors.primary};
  line-height: 1.1;
  min-width: 60px;
  
  span.day {
    display: block;
    font-size: 1.4rem;
  }
  
  span.month {
    display: block;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

const CardContent = styled.div`
  padding: ${theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.4rem;
  color: ${theme.colors.primary};
  margin: 0 0 ${theme.spacing.sm} 0;
  font-weight: ${theme.typography.weights.bold};
  line-height: 1.3;
`;

const CardMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text.muted};
  font-size: 0.95rem;
  
  div {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  
  svg {
    color: ${theme.colors.primary};
  }
`;

const CardDescription = styled.p`
  color: ${theme.colors.text.dark};
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 ${theme.spacing.lg} 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
`;

const CardFooter = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid ${theme.colors.border || '#eee'};
  padding-top: ${theme.spacing.md};
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.weights.bold};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 0.95rem;
  padding: 0;
  transition: color 0.2s;
  
  &:hover {
    color: ${theme.colors.primaryHover};
    text-decoration: underline;
  }
`;

// --- Modal Styles ---


const ModalImageWrapper = styled.div`
  width: 100%;
  max-height: 400px;
  overflow: hidden;
  border-radius: ${theme.borderRadius.md};
  margin-bottom: ${theme.spacing.lg};
  background-color: ${theme.colors.background.section};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: contain;
  display: block;
`;

const ModalContentWrapper = styled.div`
  padding: ${theme.spacing.lg};
`;

const ModalTitle = styled.h2`
  font-size: 2rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const ModalMetaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  background-color: ${theme.colors.background.general};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  color: ${theme.colors.text.dark};
  font-weight: 500;
  
  svg {
    color: ${theme.colors.primary};
    font-size: 1.2rem;
  }
`;

const EventosPage = ({ 
  events = [], 
  isLoading, 
  onSaveEvent, 
  onDeleteEvent 
}) => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [viewEvent, setViewEvent] = useState(null);

  // --- Data Processing ---

  const normalizeImageUrl = (imageUrl) => {
    if (!imageUrl) {
      console.log('⚠️ [URL] Imagen no definida, retornando null');
      return null;
    }
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    // Limpiar path y asegurar que empiece con slash
    let cleanPath = imageUrl;
    if (!cleanPath.startsWith('/')) {
      cleanPath = `/${cleanPath}`;
    }

    // Si la imagen está en /uploads/ y tenemos configurada una URL base para uploads
    // Usar esa configuración (para Nginx alias)
    const uploadsBaseUrl = import.meta.env.VITE_UPLOADS_BASE_URL;
    if (cleanPath.startsWith('/uploads/') && uploadsBaseUrl) {
      // Eliminar slash final de la base si existe
      const base = uploadsBaseUrl.endsWith('/') ? uploadsBaseUrl.slice(0, -1) : uploadsBaseUrl;
      return `${base}${cleanPath}`;
    }
    
    // Fallback: Usar VITE_API_URL
    let baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    if (baseUrl.endsWith('/')) {
      baseUrl = baseUrl.slice(0, -1);
    }
    
    const fullUrl = `${baseUrl}${cleanPath}`;
    return fullUrl;
  };

  const processedEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];
    
    console.log('🔄 [EVENTOS] Procesando eventos:', events.length);
    
    const normalized = events.map((event, index) => {
      const imageUrl = (event.imagenUrls && event.imagenUrls.length > 0) 
        ? event.imagenUrls[0] 
        : event.imageUrl || null;
      
      const normalizedImageUrl = normalizeImageUrl(imageUrl);
      
      console.log(`📋 [EVENTO ${index + 1}] "${event.titulo || event.title}":`, {
        id: event.id,
        fecha: event.fecha || event.date,
        imagenOriginal: imageUrl,
        imagenNormalizada: normalizedImageUrl
      });
      
      return {
        id: event.id,
        title: event.titulo || event.title,
        description: event.descripcion || event.description,
        date: event.fecha || event.date,
        time: event.hora || event.time,
        location: event.lugar || event.location,
        imageUrl: normalizedImageUrl
      };
    });

    let filtered = normalized.filter(event => {
      const title = event.title || '';
      const desc = event.description || '';
      const term = searchTerm.toLowerCase();
      return title.toLowerCase().includes(term) || desc.toLowerCase().includes(term);
    });

    return filtered.sort((a, b) => {
      const dateAStr = a.date;
      const dateBStr = b.date;
      
      if (!dateAStr) return 1;  // sin fecha va al final
      if (!dateBStr) return -1; // sin fecha va al final

      try {
        const dateA = parseISO(dateAStr);
        const dateB = parseISO(dateBStr);
        
        if (isValid(dateA) && isValid(dateB)) {
          return dateA - dateB; // más recientes primero (ascending)
        }
      } catch (e) {
        console.error('Error parsing dates:', e);
      }
      return dateAStr.localeCompare(dateBStr); // Fallback: compare strings
    });
  }, [events, searchTerm]);

  // Group by Month
  const eventsByMonth = useMemo(() => {
    const groups = {};
    processedEvents.forEach(event => {
      const dateStr = event.date || event.fecha;
      let monthKey = t('events.upcoming');
      
      if (dateStr) {
        try {
          const date = parseISO(dateStr);
          if (isValid(date)) {
            monthKey = format(date, 'MMMM yyyy', { locale: es });
          }
        } catch (e) {
          console.error('Error parsing date for grouping', e);
        }
      }
      
      if (!groups[monthKey]) {
        groups[monthKey] = [];
      }
      groups[monthKey].push(event);
    });
    return groups;
  }, [processedEvents, t]);

  // --- Handlers ---

  const handleCardClick = (event) => {
    setViewEvent(event);
    setIsDetailOpen(true);
  };

  const handleEdit = (e, event) => {
    e.stopPropagation();
    setCurrentEvent(event);
    setIsFormOpen(true);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    if (window.confirm(t('events.confirmDelete'))) {
      try {
        await onDeleteEvent(id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (eventData) => {
    try {
      await onSaveEvent(eventData);
      setIsFormOpen(false);
      setCurrentEvent(null);
    } catch (error) {
      console.error(error);
    }
  };

  // --- Render Helpers ---

  const formatDateBadge = (dateStr) => {
    try {
      if (!dateStr) return { day: '--', month: '---' };
      const date = parseISO(dateStr);
      if (!isValid(date)) return { day: '--', month: '---' };
      return {
        day: format(date, 'dd'),
        month: format(date, 'MMM', { locale: es })
      };
    } catch (e) {
      return { day: '--', month: '---' };
    }
  };

  const formatFullDate = (dateStr) => {
    try {
      if (!dateStr) return t('events.dateToConfirm');
      const date = parseISO(dateStr);
      if (!isValid(date)) return dateStr;
      return format(date, "EEEE d 'de' MMMM, yyyy", { locale: es });
    } catch (e) {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <PageContainer>
        <LoadingSpinner size="large" />
        <p style={{ marginTop: '1rem', color: theme.colors.text.muted, textAlign: 'center' }}>{t('common.loading')}</p>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <Header>
          <TitleColumn>
            <Title>{t('nav.events')}</Title>
            <Subtitle>{t('events.subtitle')}</Subtitle>
          </TitleColumn>
          <Controls>
            <SearchContainer>
              <FaSearch />
              <input 
                type="text" 
                placeholder={t('common.search')} 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </SearchContainer>
            {isAuthenticated && (
              <Button 
                variant="primary" 
                onClick={() => {
                  setCurrentEvent(null);
                  setIsFormOpen(true);
                }}
                startIcon={<FaPlus />}
              >
                {t('events.new')}
              </Button>
            )}
          </Controls>
        </Header>

        {Object.entries(eventsByMonth).length === 0 ? (
           <div style={{ textAlign: 'center', padding: '4rem', color: theme.colors.text.muted }}>
             <FaCalendarAlt size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
             <h3>{t('events.noEventsTitle')}</h3>
             <p>{t('events.noEventsMessage')}</p>
           </div>
        ) : (
          Object.entries(eventsByMonth)
            .sort(([monthA, eventsA], [monthB, eventsB]) => {
              // Sort months in ascending order (nearest/current first)
              // Get the first event date from each month to compare
              const dateA = eventsA[0]?.date || eventsA[0]?.fecha;
              const dateB = eventsB[0]?.date || eventsB[0]?.fecha;
              
              if (!dateA) return 1;
              if (!dateB) return -1;
              
              try {
                const parsedA = parseISO(dateA);
                const parsedB = parseISO(dateB);
                if (isValid(parsedA) && isValid(parsedB)) {
                  // Use regular comparison for ascending (nearest first)
                  return parsedA - parsedB;
                }
              } catch (e) {
                console.error('Error sorting months:', e);
              }
              
              return dateA.localeCompare(dateB);
            })
            .map(([month, monthEvents]) => (
            <MonthSection key={month}>
              <MonthHeader>{month}</MonthHeader>
              <Grid>
                {monthEvents.map((event) => {
                  const dateStr = event.date || event.fecha;
                  const { day, month } = formatDateBadge(dateStr);
                  const hasImage = event.imageUrl && event.imageUrl.trim() !== '';

                  return (
                    <Card key={event.id} onClick={() => handleCardClick(event)}>
                      <CardImageContainer>
                        {hasImage ? (
                          <CardImage src={event.imageUrl} alt={event.title} onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                        ) : (
                          <CardImagePlaceholder>
                            <FaCalendarAlt />
                            <span>{t('events.noImage')}</span>
                          </CardImagePlaceholder>
                        )}
                        <DateBadge>
                          <span className="day">{day}</span>
                          <span className="month">{month}</span>
                        </DateBadge>
                      </CardImageContainer>
                      <CardContent>
                        <CardTitle>{event.title}</CardTitle>
                        <CardMeta>
                          {event.time && (
                            <div><FaClock size={14} /> {event.time}</div>
                          )}
                          {event.location && (
                            <div><FaMapMarkerAlt size={14} /> {event.location}</div>
                          )}
                        </CardMeta>
                        <CardDescription>{event.description}</CardDescription>
                        <CardFooter>
                          <ActionButton onClick={(e) => { e.stopPropagation(); handleCardClick(event); }}>
                            {t('common.viewDetails')} <FaTicketAlt />
                          </ActionButton>
                          {isAuthenticated && (
                            <div style={{ display: 'flex', gap: '8px' }}>
                              <Button 
                                variant="outline" 
                                size="small" 
                                onClick={(e) => handleEdit(e, event)}
                                style={{ padding: '4px 8px' }}
                              >
                                <FaEdit />
                              </Button>
                              <Button 
                                variant="danger" 
                                size="small" 
                                onClick={(e) => handleDelete(e, event.id)}
                                style={{ padding: '4px 8px' }}
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          )}
                        </CardFooter>
                      </CardContent>
                    </Card>
                  );
                })}
              </Grid>
            </MonthSection>
          ))
        )}
      </Container>

      {/* Modal de Detalle */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title=""
        size="lg"
        maxWidth="800px"
      >
        {viewEvent && (
          <div>
            <ModalContentWrapper>
              {viewEvent.imageUrl && (
                <ModalImageWrapper>
                  <ModalImage 
                    src={viewEvent.imageUrl} 
                    alt={viewEvent.title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </ModalImageWrapper>
              )}
              
              <ModalTitle>{viewEvent.title}</ModalTitle>
              
              <ModalMetaGrid>
                <MetaItem>
                  <FaCalendarAlt /> {formatFullDate(viewEvent.date || viewEvent.fecha)}
                </MetaItem>
                <MetaItem>
                  <FaClock /> {viewEvent.time || t('events.timeToConfirm')}
                </MetaItem>
                <MetaItem>
                  <FaMapMarkerAlt /> {viewEvent.location || t('events.locationToConfirm')}
                </MetaItem>
              </ModalMetaGrid>

              <div style={{ lineHeight: '1.8', color: theme.colors.text.muted, fontSize: '1.1rem' }}>
                {viewEvent.description}
              </div>
            </ModalContentWrapper>
          </div>
        )}
      </Modal>

      {/* Modal de Edición */}
      <Modal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setCurrentEvent(null);
        }}
        title={currentEvent ? t('events.edit') : t('events.new')}
        maxWidth="600px"
      >
        <EventForm 
          key={currentEvent ? currentEvent.id : 'new-event'}
          events={processedEvents}
          event={currentEvent}
          onSave={handleSubmit}
          onDelete={onDeleteEvent}
          onSaveSuccess={() => {
            setIsFormOpen(false);
            setCurrentEvent(null);
          }}
        />
      </Modal>
    </PageContainer>
  );
};

export default EventosPage;
