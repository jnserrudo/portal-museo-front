import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaCalendarAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import Button from '../components/ui/Button';
import { theme } from '../styles/theme';

// Importar la imagen
import museoFrente from '/museo_frente.jpg';

// Componentes estilizados
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
  margin-top: -1px; /* Asegura que no haya espacio entre el header y el hero */
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 ${theme.spacing.md};
  z-index: 1;
  margin: 0;
  transform: translateY(-10px); /* Pequeño ajuste vertical */
`;

const HeroTitle = styled.h1`
  font-size: 2.5rem;
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

const EventImage = styled.div.attrs({
  // Extraer la prop imageUrl para que no se pase al DOM
  style: ({ $imageUrl }) => ({
    background: $imageUrl ? `url(${$imageUrl}) center/cover no-repeat` : 'none',
    height: '200px'
  })
})`
  // Estilos adicionales si son necesarios
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

const HomePage = ({ events = [], isLoading = false }) => {
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
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Cargando eventos...</p>
            </div>
          ) : events.length > 0 ? (
            <>
              <FeaturesGrid>
                {events.slice(0, 3).map((event) => {
                  const eventDate = new Date(event.fecha);
                  const formattedDate = eventDate.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                  });
                  
                  return (
                    <EventCard key={event.id}>
                      <EventImage $imageUrl={event.imagenUrl || '/images/evento-default.jpg'} />
                      <EventContent>
                        <EventDate>
                          <FaCalendarAlt /> {formattedDate}
                        </EventDate>
                        <EventTitle>{event.titulo}</EventTitle>
                        <EventDescription>{event.descripcion}</EventDescription>
                        <EventLocation>
                          <FaMapMarkerAlt /> {event.lugar || 'Museo Regional Andino'}
                        </EventLocation>
                        <Button as={Link} to={`/eventos/${event.id}`} variant="primary" fullWidth>
                          Más Información <FaArrowRight style={{ marginLeft: '0.5rem' }} />
                        </Button>
                      </EventContent>
                    </EventCard>
                  );
                })}
              </FeaturesGrid>
              <div style={{ textAlign: 'center', marginTop: theme.spacing.xl }}>
                <Button as={Link} to="/eventos" variant="primary" size="large">
                  Ver todos los eventos
                </Button>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>No hay eventos programados por el momento.</p>
              <Button as={Link} to="/eventos" variant="primary" size="large" style={{ marginTop: '1rem' }}>
                Ver eventos pasados
              </Button>
            </div>
          )}
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
