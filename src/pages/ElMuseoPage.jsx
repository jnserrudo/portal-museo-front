import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { FaLandmark, FaHistory, FaAward, FaMapMarkerAlt, FaClock, FaTicketAlt, FaConciergeBell, FaWheelchair, FaInfoCircle, FaCheck } from 'react-icons/fa';
import { theme } from '../styles/theme';

const PageContainer = styled.div`
  padding-bottom: ${theme.spacing.xl};
  background-color: ${theme.colors.background.general};
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${import.meta.env.BASE_URL}museo_frente.jpg');
  background-size: cover;
  background-position: center;
  height: 50vh;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  margin-bottom: ${theme.spacing.xl};
  position: relative;
`;

const HeroContent = styled.div`
  max-width: 900px;
  padding: 0 ${theme.spacing.md};
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  h1 {
    font-size: ${theme.typography.sizes.h2};
    margin-bottom: ${theme.spacing.md};
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
    font-weight: ${theme.typography.weights.black};
    color: white;
  }

  p {
    font-size: ${theme.typography.sizes.subtitle};
    line-height: 1.6;
    opacity: 0.95;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
  flex-wrap: wrap;
`;

const Badge = styled.span`
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

const AboutSection = styled.section`
  background-color: white;
  padding: ${theme.spacing.xl};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.medium};
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  
  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: ${theme.colors.text.dark};
    max-width: 900px;
    margin: 0 auto;
  }
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
  
  h3 {
    color: ${theme.colors.primary};
    font-size: 1.3rem;
    margin-bottom: ${theme.spacing.md};
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid ${theme.colors.accent};
    padding-bottom: ${theme.spacing.xs};
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
  }
`;

const ElMuseoPage = () => {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <HeroSection>
        <HeroContent>
          <h1>{t('museum.hero.title')}</h1>
          {/* <p>{t('museum.hero.subtitle')}</p>
          <BadgeContainer>
            <Badge><FaLandmark /> {t('museum.badge.founded')}</Badge>
            <Badge><FaHistory /> {t('museum.badge.history')}</Badge>
            <Badge><FaAward /> {t('museum.badge.monument')}</Badge>
          </BadgeContainer> */}
        </HeroContent>
      </HeroSection>

      <Container>
        <AboutSection>
          <p>{t('museum.about.content')}</p>
        </AboutSection>

        <InfoGrid>
          {/* Ubicación y Horarios */}
          <InfoCard>
            <h3><FaMapMarkerAlt /> {t('museum.info.location.label')}</h3>
            <p>{t('museum.info.location.value')}</p>
            
            <h3 style={{ marginTop: '1.5rem' }}><FaClock /> {t('museum.info.hours.label')}</h3>
            <p>{t('museum.info.hours.value')}</p>
          </InfoCard>

          {/* Visita */}
          <InfoCard>
            <h3><FaTicketAlt /> {t('museum.info.visit.label')}</h3>
            <InfoList>
              <li><FaCheck /> {t('museum.info.visit.value')}</li>
              <li><FaInfoCircle /> {t('museum.info.visit.exemptions')}</li>
            </InfoList>
          </InfoCard>

          {/* Servicios */}
          <InfoCard>
            <h3><FaConciergeBell /> {t('museum.info.services.label')}</h3>
            <InfoList>
              <li><FaCheck /> {t('museum.info.services.guide')}</li>
              <li><FaCheck /> {t('museum.info.services.gardens')}</li>
              <li><FaCheck /> {t('museum.info.services.archive')}</li>
              <li><FaCheck /> {t('museum.info.services.library')}</li>
              <li><FaCheck /> {t('museum.info.services.wifi')}</li>
              <li><FaCheck /> {t('museum.info.services.rest')}</li>
            </InfoList>
          </InfoCard>

          {/* Accesibilidad */}
          <InfoCard>
            <h3><FaWheelchair /> {t('museum.info.accessibility.label')}</h3>
            <InfoList>
              <li><FaCheck /> {t('museum.info.accessibility.ramps')}</li>
              <li><FaCheck /> {t('museum.info.accessibility.bathrooms')}</li>
            </InfoList>
          </InfoCard>

          {/* Características */}
          <InfoCard>
            <h3><FaInfoCircle /> {t('museum.info.features.label')}</h3>
            <InfoList>
              <li><FaCheck /> {t('museum.info.features.type')}</li>
              <li><FaCheck /> {t('museum.info.features.collection')}</li>
              <li><FaCheck /> {t('museum.info.features.dependence')}</li>
            </InfoList>
          </InfoCard>
        </InfoGrid>
      </Container>
    </PageContainer>
  );
};

export default ElMuseoPage;
