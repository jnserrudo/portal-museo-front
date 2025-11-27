import React, { useState, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaTicketAlt } from 'react-icons/fa';
import { format, parseISO, parse, isValid, compareAsc } from 'date-fns';
import { es } from 'date-fns/locale';
import Button from '../components/ui/Button';
import Modal from '../components/Modal';
import { theme } from '../styles/theme';

// Ruta a la imagen usando BASE_URL
const museoFrente = `${import.meta.env.BASE_URL}museo_frente.jpg`;

const HeroSection = styled.section`
  position: relative;
  height: 90vh;
  min-height: 450px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.text.light};
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), 
              url(${museoFrente}) center/cover no-repeat;
  margin: 0;
  padding: 0;
  margin-top: -1px;
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 ${theme.spacing.md};
  z-index: 1;
  margin: 0;
  transform: translateY(-10px);
`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.sizes.h2};
  margin: 0 0 0.5rem 0;
  color: ${theme.colors.text.light};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.1;
  padding-top: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 0.3rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.1rem;
  margin: 0 0 1rem 0;
  color: ${theme.colors.text.light};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  line-height: 1.3;
  max-width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 0 1rem;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 0.8rem;
  }
`;

const FeaturesSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.section};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: ${theme.typography.sizes.h2};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.xl};
  position: relative;
  padding-bottom: ${theme.spacing.sm};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: ${theme.colors.accent};
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const FeatureCard = styled.div`
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.lg};
  text-align: center;
  box-shadow: ${theme.shadows.light};
  transition: ${theme.transitions.default};
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.primary};
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.text.dark};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const EventsSection = styled.section`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.light};
`;

const EventCard = styled.div`
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: ${theme.shadows.light};
  transition: ${theme.transitions.default};
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const EventImage = styled.div.attrs({
  style: ({ $imageUrl }) => ({
    background: $imageUrl ? `url(${$imageUrl}) center/cover no-repeat` : 'linear-gradient(135deg, #8B5A2B20, #e3c2a140)',
    height: '200px'
  })
})`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.primary};
  
  ${props => !props.$imageUrl && `
    svg {
      font-size: 3rem;
      opacity: 0.5;
    }
  `}
`;

const EventContent = styled.div`
  padding: ${theme.spacing.lg};
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const EventDate = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.primary};
  font-weight: ${theme.typography.weights.bold};
  margin-bottom: ${theme.spacing.sm};
  
  svg {
    margin-right: ${theme.spacing.xs};
  }
`;

const EventTitle = styled.h3`
  font-size: 1.3rem;
  margin-bottom: ${theme.spacing.sm};
  color: ${theme.colors.primary};
`;

const EventDescription = styled.p`
  color: ${theme.colors.text.muted};
  line-height: 1.6;
  flex: 1;
  margin-bottom: ${theme.spacing.md};
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EventLocation = styled.div`
  display: flex;
  align-items: center;
  color: ${theme.colors.text.muted};
  font-size: 0.9rem;
  margin-bottom: ${theme.spacing.md};
  
  svg {
    margin-right: ${theme.spacing.xs};
  }
`;

const CtaSection = styled.section`
  padding: ${theme.spacing.xxl} 0;
  background-color: ${theme.colors.primary};
  color: ${theme.colors.text.light};
  text-align: center;
  
  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 ${theme.spacing.md};
  }
`;

const CtaTitle = styled.h2`
  font-size: ${theme.typography.sizes.h2};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text.light};
  font-weight: ${theme.typography.weights.bold};
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CtaText = styled.p`
  font-size: 1.25rem;
  margin-bottom: ${theme.spacing.xl};
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ModalContentWrapper = styled.div`
  padding: ${theme.spacing.lg};
`;

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
  color: ${theme.colors.primary};
  font-weight: 500;
  
  svg {
    color: ${theme.colors.primary};
    font-size: 1.2rem;
  }
`;

const features = [
  {
    id: 1,
    icon: <FaMapMarkerAlt />,
    title: 'Ubicación Privilegiada',
    description: 'En el corazón de la región andina, rodeado de paisajes impresionantes y una rica historia cultural.'
  },
  {
    id: 2,
    icon: <FaClock />,
    title: 'Horarios Flexibles',
    description: 'Abrimos de martes a domingo con horarios amplios para que puedas visitarnos cuando mejor te convenga.'
  },
  {
    id: 3,
    icon: <FaCalendarAlt />,
    title: 'Eventos Especiales',
    description: 'Talleres, exposiciones temporales y actividades culturales durante todo el año.'
  }
];

const HomePage = ({ events = [], isLoading = false }) => {
  const { t } = useLanguage();
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [viewEvent, setViewEvent] = useState(null);

  // Helper function to normalize image URLs
  const normalizeImageUrl = (imageUrl) => {
    if (!imageUrl) return null;
    
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
      return imageUrl;
    }
    
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
    const cleanPath = imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`;
    return `${baseUrl}${cleanPath}`;
  };

  const processedEvents = useMemo(() => {
    if (!Array.isArray(events)) return [];
    
    const normalized = events.map(event => {
      const imageUrl = (event.imagenUrls && event.imagenUrls.length > 0) 
        ? event.imagenUrls[0] 
        : event.imageUrl || null;
      
      return {
        id: event.id,
        title: event.titulo || event.title,
        description: event.descripcion || event.description,
        date: event.fecha || event.date,
        time: event.hora || event.time,
        location: event.lugar || event.location,
        imageUrl: normalizeImageUrl(imageUrl)
      };
    });

    return normalized.sort((a, b) => {
      const dateAStr = a.date;
      const dateBStr = b.date;
      
      if (!dateAStr) return 1;  // sin fecha va al final
      if (!dateBStr) return -1; // sin fecha va al final

      try {
        // Intentar parsear como ISO primero (YYYY-MM-DD)
        let dateA = parseISO(dateAStr);
        let dateB = parseISO(dateBStr);

        // Si no es válido como ISO, intentar como DD/MM/YYYY
        if (!isValid(dateA)) {
          dateA = parse(dateAStr, 'dd/MM/yyyy', new Date());
        }
        if (!isValid(dateB)) {
          dateB = parse(dateBStr, 'dd/MM/yyyy', new Date());
        }
        
        if (isValid(dateA) && isValid(dateB)) {
          return compareAsc(dateA, dateB); // más cercano primero (orden ascendente)
        }
      } catch (e) {
        console.error('Error parsing dates:', e);
      }
      // Fallback: ordenar string ascendente para fechas más cercanas primero
      return dateAStr.localeCompare(dateBStr);
    });
  }, [events]);

  const formatFullDate = (dateStr) => {
    try {
      if (!dateStr) return 'Fecha por confirmar';
      
      // Intentar parsear como ISO primero
      let date = parseISO(dateStr);
      
      // Si no es válido, intentar DD/MM/YYYY
      if (!isValid(date)) {
        date = parse(dateStr, 'dd/MM/yyyy', new Date());
      }
      
      if (!isValid(date)) return dateStr;
      return format(date, "EEEE d 'de' MMMM, yyyy", { locale: es });
    } catch (e) {
      return dateStr;
    }
  };

  const handleEventClick = (event) => {
    setViewEvent(event);
    setIsDetailOpen(true);
  };

  return (
    <>
      <HeroSection>
        <HeroContent>
          <HeroTitle>{t('home.hero.title')}</HeroTitle>
          <HeroSubtitle>{t('home.hero.subtitle')}</HeroSubtitle>
          <HeroButtons>
            <Button 
              variant="primary" 
              size="large" 
              onClick={() => navigate('/visita')}
            >
              {t('home.hero.cta')}
            </Button>
            <Button 
              variant="outline" 
              size="large" 
              onClick={() => navigate('/visita-virtual')}
              style={{ 
                color: 'white', 
                borderColor: 'white',
                '&:hover': {
                  backgroundColor: 'white',
                  color: theme.colors.primary
                }
              }}
            >
              {t('nav.virtualTour')}
            </Button>
            <Button 
              variant="secondary" 
              size="large" 
              onClick={() => navigate('/salas')}
            >
              {t('home.hero.rooms')}
            </Button>
          </HeroButtons>
        </HeroContent>
      </HeroSection>

      <FeaturesSection>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${theme.spacing.md}` }}>
          <SectionTitle>{t('home.features.title')}</SectionTitle>
          <FeaturesGrid>
            <FeatureCard>
              <FeatureIcon><FaMapMarkerAlt /></FeatureIcon>
              <FeatureTitle>{t('home.features.location.title')}</FeatureTitle>
              <FeatureDescription>{t('home.features.location.desc')}</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><FaClock /></FeatureIcon>
              <FeatureTitle>{t('home.features.hours.title')}</FeatureTitle>
              <FeatureDescription>{t('home.features.hours.desc')}</FeatureDescription>
            </FeatureCard>
            <FeatureCard>
              <FeatureIcon><FaCalendarAlt /></FeatureIcon>
              <FeatureTitle>{t('home.features.events.title')}</FeatureTitle>
              <FeatureDescription>{t('home.features.events.desc')}</FeatureDescription>
            </FeatureCard>
          </FeaturesGrid>
        </div>
      </FeaturesSection>

      <EventsSection>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: `0 ${theme.spacing.md}` }}>
          <SectionTitle>{t('home.events.title')}</SectionTitle>
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>{t('common.loading')}</p>
            </div>
          ) : processedEvents.length > 0 ? (
            <>
              <FeaturesGrid>
                {processedEvents.slice(0, 3).map((event) => {
                  const formattedDate = formatFullDate(event.date);
                  
                  return (
                    <EventCard key={event.id} onClick={() => handleEventClick(event)}>
                      <EventImage $imageUrl={event.imageUrl}>
                        {!event.imageUrl && <FaCalendarAlt />}
                      </EventImage>
                      <EventContent>
                        <EventDate>
                          <FaCalendarAlt /> {formattedDate}
                        </EventDate>
                        <EventTitle>{event.title}</EventTitle>
                        <EventDescription>{event.description}</EventDescription>
                        <EventLocation>
                          <FaMapMarkerAlt /> {event.location || 'Museo Regional Andino'}
                        </EventLocation>
                        <Button variant="primary" fullWidth>
                          {t('common.viewDetails')} <FaArrowRight style={{ marginLeft: '0.5rem' }} />
                        </Button>
                      </EventContent>
                    </EventCard>
                  );
                })}
              </FeaturesGrid>
              <div style={{ textAlign: 'center', marginTop: theme.spacing.xl }}>
                <Button as={Link} to="/eventos" variant="primary" size="large">
                  {t('home.events.viewAll')}
                </Button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>{t('home.events.empty')}</p>
              <Button as={Link} to="/eventos" variant="primary" size="large" style={{ marginTop: '1rem' }}>
                {t('home.events.viewSection')}
              </Button>
            </div>
          )}
        </div>
      </EventsSection>

      <CtaSection>
        <div className="container">
          <CtaTitle>{t('home.cta.title')}</CtaTitle>
          <CtaText>
            {t('home.cta.desc')}
          </CtaText>
          <Button as={Link} to="/visita" variant="accent" size="large">
            {t('home.cta.button')}
          </Button>
        </div>
      </CtaSection>

      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={t('event.detail.title')}
        size="lg"
        maxWidth="800px"
      >
        {viewEvent && (
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
                <FaCalendarAlt /> {formatFullDate(viewEvent.date)}
              </MetaItem>
              <MetaItem>
                <FaClock /> {viewEvent.time || 'Horario a confirmar'}
              </MetaItem>
              <MetaItem>
                <FaMapMarkerAlt /> {viewEvent.location || 'Lugar a confirmar'}
              </MetaItem>
            </ModalMetaGrid>

            <div style={{ lineHeight: '1.8', color: theme.colors.text.muted, fontSize: '1.1rem' }}>
              {viewEvent.description}
            </div>
          </ModalContentWrapper>
        )}
      </Modal>
    </>
  );
};

export default HomePage;
