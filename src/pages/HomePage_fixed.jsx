import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { theme } from '../styles/theme';

// Componentes estilizados
const HeroSection = styled.section`
  position: relative;
  height: 80vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: ${theme.colors.text.light};
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), 
              url('/museo_frente.jpg') center/cover no-repeat;
  margin-bottom: ${theme.spacing.xl};
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 ${theme.spacing.md};
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: ${theme.typography.sizes.h1};
  margin-bottom: ${theme.spacing.md};
  color: ${theme.colors.text.light};
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const HeroSubtitle = styled.p`
  font-size: ${theme.typography.sizes.welcome};
  margin-bottom: ${theme.spacing.lg};
  color: ${theme.colors.text.light};
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
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

const FeatureText = styled.p`
  color: ${theme.colors.text.dark};
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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const EventImage = styled.div`
  height: 200px;
  background: ${({ imageUrl }) => `url(${imageUrl})`} center/cover no-repeat;
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
  color: ${theme.colors.text.dark};
  margin-bottom: ${theme.spacing.md};
  flex: 1;
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

// Sección CTA (Call to Action)
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
  font-size: 2.5rem;
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

// Datos de ejemplo para las características
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

// Datos de ejemplo para los eventos
const events = [
  {
    id: 1,
    title: 'Exposición de Arte Andino',
    date: '15 de Noviembre, 2025',
    description: 'Una muestra única de arte tradicional y contemporáneo de la región andina.',
    location: 'Sala Principal',
    image: '/images/evento1.jpg'
  },
  {
    id: 2,
    title: 'Taller de Tejidos Ancestrales',
    date: '22 de Noviembre, 2025',
    description: 'Aprende las técnicas tradicionales de tejido andino con maestros artesanos.',
    location: 'Sala de Talleres',
    image: '/images/evento2.jpg'
  },
  {
    id: 3,
    title: 'Concierto de Música Andina',
    date: '29 de Noviembre, 2025',
    description: 'Disfruta de una noche mágica con lo mejor de la música andina en vivo.',
    location: 'Patio Central',
    image: '/images/evento3.jpg'
  }
];

const HomePage = () => {
  return (
    <>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent>
          <HeroTitle>Bienvenidos al Museo Regional Andino</HeroTitle>
          <HeroSubtitle>Descubre la riqueza cultural y el patrimonio de nuestra región</HeroSubtitle>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button as={Link} to="/visita" variant="accent" size="large">
              Planifica tu Visita
            </Button>
            <Button as={Link} to="/coleccion" variant="outline" size="large" style={{ color: theme.colors.text.light, borderColor: theme.colors.text.light }}>
              Explora la Colección
            </Button>
          </div>
        </HeroContent>
      </HeroSection>

      {/* Features Section */}
      <FeaturesSection>
        <SectionTitle>¿Por qué visitarnos?</SectionTitle>
        <FeaturesGrid>
          {features.map((feature) => (
            <FeatureCard key={feature.id}>
              <FeatureIcon>{feature.icon}</FeatureIcon>
              <FeatureTitle>{feature.title}</FeatureTitle>
              <FeatureText>{feature.description}</FeatureText>
            </FeatureCard>
          ))}
        </FeaturesGrid>
      </FeaturesSection>

      {/* Events Section */}
      <EventsSection>
        <div className="container">
          <SectionTitle>Próximos Eventos</SectionTitle>
          <FeaturesGrid>
            {events.map((event) => (
              <EventCard key={event.id}>
                <EventImage imageUrl={event.image} />
                <EventContent>
                  <EventDate>
                    <FaCalendarAlt /> {event.date}
                  </EventDate>
                  <EventTitle>{event.title}</EventTitle>
                  <EventDescription>{event.description}</EventDescription>
                  <EventLocation>
                    <FaMapMarkerAlt /> {event.location}
                  </EventLocation>
                  <Button as={Link} to={`/eventos/${event.id}`} variant="primary" fullWidth>
                    Más Información <FaArrowRight style={{ marginLeft: '0.5rem' }} />
                  </Button>
                </EventContent>
              </EventCard>
            ))}
          </FeaturesGrid>
          <div style={{ textAlign: 'center', marginTop: theme.spacing.xl }}>
            <Button as={Link} to="/eventos" variant="primary" size="large">
              Ver todos los eventos
            </Button>
          </div>
        </div>
      </EventsSection>

      {/* CTA Section */}
      <CtaSection>
        <div className="container">
          <CtaTitle>¿Listo para vivir una experiencia única?</CtaTitle>
          <CtaText>
            Descubre la magia del arte y la cultura andina en nuestro museo. 
            Planifica tu visita hoy mismo y sumérgete en la historia de nuestra región.
          </CtaText>
          <Button as={Link} to="/visita" variant="accent" size="large">
            Planificar Visita
          </Button>
        </div>
      </CtaSection>
    </>
  );
};

export default HomePage;
