import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaClock, FaTicketAlt, FaWifi, FaWheelchair, FaCamera, FaBus, FaCar, FaInfoCircle, FaBook, FaTree, FaArchive, FaCouch, FaCheck, FaGlobe, FaRoute } from 'react-icons/fa';
import { theme } from '../styles/theme';

const PageContainer = styled.div`
  padding-bottom: ${theme.spacing.xl};
  background-color: ${theme.colors.background.general};
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${import.meta.env.BASE_URL}museo_frente.jpg');
  background-size: cover;
  background-position: center;
  height: 40vh;
  min-height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: ${theme.spacing.xl};
`;

const HeroContent = styled.div`
  max-width: 800px;
  padding: 0 ${theme.spacing.md};

  h1 {
    font-size: ${theme.typography.sizes.h2};
    margin-bottom: ${theme.spacing.sm};
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    color: white;
  }

  p {
    font-size: ${theme.typography.sizes.subtitle};
    opacity: 0.9;
    color: white;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${theme.spacing.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const InfoCard = styled.div`
  background: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.light};
  border-top: 4px solid ${theme.colors.primary};
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
  
  h2, h3 {
    color: ${theme.colors.primary};
    font-size: 1.3rem;
    margin-bottom: ${theme.spacing.md};
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid ${theme.colors.accent};
    padding-bottom: ${theme.spacing.xs};
  }
  
  svg {
    color: ${theme.colors.primary};
    font-size: 1.5rem;
  }
  
  p {
    color: ${theme.colors.text.dark};
    line-height: 1.8;
    margin-bottom: ${theme.spacing.sm};
    
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.text.dark};
    display: flex;
    align-items: flex-start;
    gap: 10px;
    line-height: 1.5;
    
    svg {
      color: ${theme.colors.primary};
      margin-top: 4px;
      flex-shrink: 0;
      font-size: 0.9rem;
    }
    
    &::before {
      display: none;
    }
  }
`;

const MapSection = styled.section`
  margin-bottom: ${theme.spacing.xl};
  background: white;
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.medium};
`;

const MapTitle = styled.h2`
  text-align: center;
  color: ${theme.colors.primary};
  margin-bottom: ${theme.spacing.md};
  font-size: 2rem;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 450px;
  border-radius: ${theme.borderRadius.md};
  overflow: hidden;
  box-shadow: inset 0 0 20px rgba(0,0,0,0.1);
  
  iframe {
    width: 100%;
    height: 100%;
    border: 0;
  }
`;

const ServicesSection = styled.section`
  background-color: ${theme.colors.background.section};
  padding: ${theme.spacing.xl} 0;
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  text-align: center;
  color: ${theme.colors.primary};
  font-size: 2rem;
  margin-bottom: ${theme.spacing.xl};
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const ServiceCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.lg};
  background: white;
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.light};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.medium};
  }
  
  svg {
    font-size: 3rem;
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
  }
  
  h3 {
    color: ${theme.colors.text.dark};
    margin-bottom: ${theme.spacing.sm};
    font-size: 1.1rem;
  }
`;

const VisitaPage = () => {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <h1>{t('visit.hero.title')}</h1>
          <p>{t('visit.hero.subtitle')}</p>
        </HeroContent>
      </HeroSection>

      <Container>
        <InfoGrid>
          {/* Horarios */}
          <InfoCard>
            <h3><FaClock /> {t('visit.hours.title')}</h3>
            <p>{t('visit.hours.schedule')}</p>
          </InfoCard>

          {/* Tarifas */}
          <InfoCard>
            <h3><FaTicketAlt /> {t('visit.tickets.title')}</h3>
            <InfoList>
              <li><FaCheck /> {t('visit.tickets.info')}</li>
              <li><FaCheck /> {t('visit.tickets.exemptions')}</li>
            </InfoList>
          </InfoCard>

          {/* Ubicación */}
          <InfoCard>
            <h3><FaMapMarkerAlt /> {t('visit.location.title')}</h3>
            <InfoList>
              <li><FaMapMarkerAlt /> {t('visit.location.address.value')}</li>
              <li><FaGlobe /> {t('visit.location.province.value')}</li>
              <li><FaRoute /> {t('visit.location.howTo.value')}</li>
            </InfoList>
          </InfoCard>
        </InfoGrid>

        <MapSection>
          <MapTitle>{t('visit.map.title')}</MapTitle>
          <MapContainer>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3636.567890123456!2d-66.3854321!3d-24.2256789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94047a5890123456%3A0x1234567890abcdef!2sSan%20Antonio%20de%20los%20Cobres%2C%20Salta!5e0!3m2!1ses!2sar!4v1633024800000!5m2!1ses!2sar" 
              allowFullScreen="" 
              loading="lazy"
              title="Ubicación del Museo"
            ></iframe>
          </MapContainer>
        </MapSection>

        <ServicesSection>
          <Container>
            <SectionTitle>{t('visit.services.title')}</SectionTitle>
            <ServicesGrid>
              <ServiceCard>
                <FaInfoCircle />
                <h3>{t('visit.services.guide')}</h3>
              </ServiceCard>
              <ServiceCard>
                <FaTree />
                <h3>{t('visit.services.gardens')}</h3>
              </ServiceCard>
              <ServiceCard>
                <FaArchive />
                <h3>{t('visit.services.archive')}</h3>
              </ServiceCard>
              <ServiceCard>
                <FaBook />
                <h3>{t('visit.services.library')}</h3>
              </ServiceCard>
              <ServiceCard>
                <FaWifi />
                <h3>{t('visit.services.wifi')}</h3>
              </ServiceCard>
              <ServiceCard>
                <FaCouch />
                <h3>{t('visit.services.rest')}</h3>
              </ServiceCard>
            </ServicesGrid>
          </Container>
        </ServicesSection>

        <InfoGrid>
          {/* Accesibilidad */}
          <InfoCard>
            <h3><FaWheelchair /> {t('visit.accessibility.title')}</h3>
            <InfoList>
              <li><FaCheck /> {t('visit.accessibility.ramps')}</li>
              <li><FaCheck /> {t('visit.accessibility.bathrooms')}</li>
            </InfoList>
          </InfoCard>

          {/* Características */}
          <InfoCard>
            <h3><FaInfoCircle /> {t('visit.features.title')}</h3>
            <InfoList>
              <li><FaCheck /> {t('visit.features.type')}</li>
              <li><FaCheck /> {t('visit.features.collection')}</li>
              <li><FaCheck /> {t('visit.features.dependence')}</li>
            </InfoList>
          </InfoCard>
        </InfoGrid>

      </Container>
    </PageContainer>
  );
};

export default VisitaPage;
