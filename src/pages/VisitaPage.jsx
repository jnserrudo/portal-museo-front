import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaClock, FaTicketAlt, FaWifi, FaWheelchair, FaCamera, FaBus, FaCar, FaInfoCircle } from 'react-icons/fa';
import { theme } from '../styles/theme';

const PageContainer = styled.div`
  padding-bottom: ${theme.spacing.xl};
  background-color: ${theme.colors.background.general};
`;

const HeroSection = styled.section`
  background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('${import.meta.env.BASE_URL}sala-hero.jpg');
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
  }

  p {
    font-size: ${theme.typography.sizes.subtitle};
    opacity: 0.9;
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
  box-shadow: ${theme.shadows.medium};
  transition: transform 0.3s ease;
  border-top: 4px solid ${theme.colors.primary};
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${theme.shadows.dark};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-bottom: ${theme.spacing.md};
  
  svg {
    color: ${theme.colors.primary};
    font-size: 2rem;
  }
  
  h2 {
    font-size: 1.5rem;
    color: ${theme.colors.primary};
    margin: 0;
  }
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: ${theme.spacing.sm};
    padding-bottom: ${theme.spacing.sm};
    border-bottom: 1px solid ${theme.colors.border || '#eee'};
    
    &:last-child {
      border-bottom: none;
    }
    
    strong {
      display: block;
      color: ${theme.colors.text.dark};
      margin-bottom: 4px;
    }
    
    span {
      color: ${theme.colors.text.medium};
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

const TipsSection = styled.section`
  background-color: ${theme.colors.accent}20; /* 20% opacity accent */
  padding: ${theme.spacing.xl} 0;
  border-radius: ${theme.borderRadius.lg};
  margin-bottom: ${theme.spacing.xl};
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${theme.spacing.lg};
  margin-top: ${theme.spacing.lg};
`;

const TipCard = styled.div`
  text-align: center;
  padding: ${theme.spacing.md};
  
  svg {
    font-size: 2.5rem;
    color: ${theme.colors.primary};
    margin-bottom: ${theme.spacing.md};
    background: white;
    padding: 15px;
    border-radius: 50%;
    box-shadow: ${theme.shadows.light};
  }
  
  h3 {
    color: ${theme.colors.text.dark};
    margin-bottom: ${theme.spacing.sm};
  }
  
  p {
    color: ${theme.colors.text.medium};
    font-size: 0.95rem;
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
            <CardHeader>
              <FaClock />
              <h2>{t('visit.hours.title')}</h2>
            </CardHeader>
            <InfoList>
              <li>
                <strong>{t('visit.hours.weekdays')}</strong>
                <span>{t('visit.hours.weekdays.time')}</span>
              </li>
              <li>
                <strong>{t('visit.hours.weekends')}</strong>
                <span>{t('visit.hours.weekends.time')}</span>
              </li>
              <li>
                <strong>{t('visit.hours.monday')}</strong>
                <span>{t('visit.hours.monday.status')}</span>
              </li>
              <li>
                <strong>{t('visit.hours.holidays')}</strong>
                <span>{t('visit.hours.holidays.status')}</span>
              </li>
            </InfoList>
          </InfoCard>

          {/* Tarifas */}
          <InfoCard>
            <CardHeader>
              <FaTicketAlt />
              <h2>{t('visit.tickets.title')}</h2>
            </CardHeader>
            <InfoList>
              <li>
                <strong>{t('visit.tickets.general')}</strong>
                <span>{t('visit.tickets.general.price')}</span>
              </li>
              <li>
                <strong>{t('visit.tickets.residents')}</strong>
                <span>{t('visit.tickets.residents.price')}</span>
              </li>
              <li>
                <strong>{t('visit.tickets.students')}</strong>
                <span>{t('visit.tickets.students.price')}</span>
              </li>
              <li>
                <strong>{t('visit.tickets.kids')}</strong>
                <span>{t('visit.tickets.kids.price')}</span>
              </li>
            </InfoList>
          </InfoCard>

          {/* Ubicación */}
          <InfoCard>
            <CardHeader>
              <FaMapMarkerAlt />
              <h2>{t('visit.location.title')}</h2>
            </CardHeader>
            <InfoList>
              <li>
                <strong>{t('visit.location.address.label')}</strong>
                <span>{t('visit.location.address.value')}</span>
              </li>
              <li>
                <strong>{t('visit.location.province.label')}</strong>
                <span>{t('visit.location.province.value')}</span>
              </li>
              <li>
                <strong>{t('visit.location.howTo.label')}</strong>
                <span>{t('visit.location.howTo.value')}</span>
              </li>
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

        <TipsSection>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ color: theme.colors.primary, fontSize: '2rem' }}>{t('visit.tips.title')}</h2>
            <p>{t('visit.tips.subtitle')}</p>
          </div>
          <TipsGrid>
            <TipCard>
              <FaWifi />
              <h3>{t('visit.tips.wifi.title')}</h3>
              <p>{t('visit.tips.wifi.desc')}</p>
            </TipCard>
            <TipCard>
              <FaWheelchair />
              <h3>{t('visit.tips.accessibility.title')}</h3>
              <p>{t('visit.tips.accessibility.desc')}</p>
            </TipCard>
            <TipCard>
              <FaCamera />
              <h3>{t('visit.tips.photo.title')}</h3>
              <p>{t('visit.tips.photo.desc')}</p>
            </TipCard>
            <TipCard>
              <FaInfoCircle />
              <h3>{t('visit.tips.altitude.title')}</h3>
              <p>{t('visit.tips.altitude.desc')}</p>
            </TipCard>
          </TipsGrid>
        </TipsSection>

      </Container>
    </PageContainer>
  );
};

export default VisitaPage;
