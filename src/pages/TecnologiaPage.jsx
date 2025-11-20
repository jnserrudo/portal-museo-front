import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRobot, FaVrCardboard, FaMobileAlt, FaLaptopCode, FaBrain, FaGlobeAmericas } from 'react-icons/fa';
import { theme } from '../styles/theme';
import Button from '../components/ui/Button';

const PageContainer = styled.div`
  padding: ${theme.spacing.xl} 0;
  background-color: ${theme.colors.background.general};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${theme.typography.sizes.h1};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${theme.typography.sizes.welcome};
  color: ${theme.colors.text.dark};
  max-width: 800px;
  margin: 0 auto ${theme.spacing.xl};
  line-height: 1.6;
`;

const Section = styled.section`
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${theme.typography.sizes.h2};
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.lg};
  text-align: center;
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

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const TechCard = styled.div`
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.xl};
  box-shadow: ${theme.shadows.light};
  transition: ${theme.transitions.default};
  text-align: center;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
`;

const TechIcon = styled.div`
  font-size: 2.5rem;
  color: ${theme.colors.accent};
  margin-bottom: ${theme.spacing.md};
`;

const TechTitle = styled.h3`
  font-size: 1.5rem;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.sm};
`;

const TechDescription = styled.p`
  color: ${theme.colors.text.dark};
  line-height: 1.6;
  margin-bottom: ${theme.spacing.md};
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  margin: ${theme.spacing.xl} 0;
  box-shadow: ${theme.shadows.medium};
  
  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${theme.spacing.sm};
  background-color: ${theme.colors.background.light};
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.light};
  
  svg {
    color: ${theme.colors.accent};
    font-size: 1.5rem;
    margin-top: 0.25rem;
    flex-shrink: 0;
  }
`;

const FeatureText = styled.div`
  h4 {
    margin: 0 0 ${theme.spacing.xs} 0;
    color: ${theme.colors.primary};
  }
  
  p {
    margin: 0;
    color: ${theme.colors.text.dark};
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const CtaSection = styled.div`
  text-align: center;
  background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
  color: white;
  padding: ${theme.spacing.xl} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  margin: ${theme.spacing.xl} 0;
  
  h2 {
    color: white;
    margin-bottom: ${theme.spacing.md};
  }
  
  p {
    max-width: 700px;
    margin: 0 auto ${theme.spacing.lg};
    font-size: 1.1rem;
    line-height: 1.7;
  }
`;

const TecnologiaPage = () => {
  const [activeTab, setActiveTab] = useState('realidad-aumentada');

  const technologies = [
    {
      id: 'realidad-aumentada',
      title: 'Realidad Aumentada',
      icon: <FaMobileAlt />,
      description: 'Vive una experiencia inmersiva donde las piezas del museo cobran vida a través de tu dispositivo móvil. Explora modelos 3D interactivos y descubre detalles ocultos de nuestras piezas más valiosas.'
    },
    {
      id: 'realidad-virtual',
      title: 'Realidad Virtual',
      icon: <FaVrCardboard />,
      description: 'Sumérgete en recreaciones históricas y entornos inmersivos que te transportarán al pasado. Nuestros recorridos en RV te permiten experimentar la historia como nunca antes.'
    },
    {
      id: 'inteligencia-artificial',
      title: 'Inteligencia Artificial',
      icon: <FaBrain />,
      description: 'Nuestro asistente virtual está disponible 24/7 para responder tus preguntas sobre las exhibiciones. Además, ofrecemos recomendaciones personalizadas según tus intereses.'
    },
    {
      id: 'aplicaciones-interactivas',
      title: 'Aplicaciones Interactivas',
      icon: <FaLaptopCode />,
      description: 'Explora nuestra colección digital con herramientas interactivas que te permiten examinar piezas en detalle, acceder a información adicional y participar en experiencias únicas.'
    },
    {
      id: 'guia-robotica',
      title: 'Guía Robótica',
      icon: <FaRobot />,
      description: 'Conoce a nuestros guías robóticos que te acompañarán en un recorrido personalizado por el museo, ofreciendo información detallada y respondiendo a tus preguntas en tiempo real.'
    },
    {
      id: 'experiencias-inmersivas',
      title: 'Experiencias Inmersivas',
      icon: <FaGlobeAmericas />,
      description: 'Sumérgete en proyecciones 360° y experiencias multisensoriales que te transportarán a diferentes épocas y lugares, enriqueciendo tu comprensión de las culturas andinas.'
    }
  ];

  return (
    <PageContainer>
      <Container>
        <HeroSection>
          <Title>Innovación y Tecnología</Title>
          <Subtitle>
            Descubre cómo estamos utilizando la tecnología más avanzada para transformar tu experiencia en el museo. 
            Desde realidad aumentada hasta inteligencia artificial, ofrecemos nuevas formas de interactuar con el patrimonio cultural andino.
          </Subtitle>
        </HeroSection>

        <Section>
          <SectionTitle>Nuestras Soluciones Tecnológicas</SectionTitle>
          <TechGrid>
            {technologies.map((tech) => (
              <TechCard key={tech.id}>
                <TechIcon>{tech.icon}</TechIcon>
                <TechTitle>{tech.title}</TechTitle>
                <TechDescription>{tech.description}</TechDescription>
              </TechCard>
            ))}
          </TechGrid>
        </Section>

        <Section>
          <SectionTitle>Experiencias Destacadas</SectionTitle>
          
          <VideoContainer>
            <iframe 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
              title="Tecnología en el Museo Regional Andino" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            />
          </VideoContainer>
          
          <div style={{ textAlign: 'center', marginTop: theme.spacing.lg }}>
            <Button variant="accent" size="large">
              Ver más experiencias
            </Button>
          </div>
        </Section>

        <Section>
          <SectionTitle>Beneficios para los Visitantes</SectionTitle>
          
          <FeatureList>
            <FeatureItem>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <FeatureText>
                <h4>Accesibilidad</h4>
                <p>Contenido disponible en múltiples formatos para diferentes necesidades de accesibilidad.</p>
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <FeatureText>
                <h4>Ahorro de Tiempo</h4>
                <p>Accede a la información que necesitas de manera rápida y eficiente.</p>
              </FeatureText>
            </FeatureItem>
            
            <FeatureItem>
              <div>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <FeatureText>
                <h4>Experiencia Mejorada</h4>
                <p>Una forma más inmersiva y atractiva de interactuar con las exposiciones.</p>
              </FeatureText>
            </FeatureItem>
          </FeatureList>
        </Section>

        <CtaSection>
          <h2>¿Listo para vivir una experiencia única?</h2>
          <p>
            Descubre cómo la tecnología está revolucionando la forma en que experimentamos el patrimonio cultural. 
            Visítanos y sé parte de esta innovadora forma de conectar con la historia andina.
          </p>
          <Button 
            variant="accent" 
            size="large"
            style={{
              backgroundColor: 'white',
              color: theme.colors.primary,
              minWidth: '200px',
              '&:hover': {
                backgroundColor: theme.colors.background.light,
                transform: 'translateY(-2px)'
              }
            }}
          >
            Planificar Visita
          </Button>
        </CtaSection>
      </Container>
    </PageContainer>
  );
};

export default TecnologiaPage;
