import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import styled, { keyframes } from 'styled-components';
import { theme } from '../styles/theme';
import VideoTourView from '../components/virtual-tour/VideoTourView';
import { videoTourData } from '../data/videoTourData';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  /* Estructura Grid sólida y a prueba de fallos para ocupar exactamente la pantalla visible */
  display: grid;
  grid-template-rows: auto 1fr;
  height: calc(100vh - 80px); /* El 80px compensa aproximadamente el header de layout */
  width: 100%;
  background-color: #000;
  font-family: ${theme.typography.fontFamily};
  overflow: hidden; /* Garantiza cero scroll en la ventana entera */
`;

// Ocupará exactamente el espacio que necesite por su contenido (el 'auto' del grid)
const HeaderSection = styled.section`
  width: 100%;
  background: #111;
  /* Espaciado superior ajustado para caber debajo del navbar sin quitarle espacio al video */
  padding: 5.5rem ${theme.spacing.md} 1.5rem; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
  border-bottom: 1px solid rgba(255,255,255,0.05);

  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 5.5rem ${theme.spacing.sm} 1rem;
  }
`;

const Title = styled.h1`
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  color: #F7E9DE;
  font-weight: ${theme.typography.weights.black};
  margin-bottom: ${theme.spacing.xs};
  letter-spacing: 2px;
  text-transform: uppercase;
  text-shadow: 0 4px 12px rgba(0,0,0,1);
`;

const Subtitle = styled.p`
  font-size: clamp(0.9rem, 1.5vw, 1.1rem);
  color: rgba(247, 233, 222, 0.7);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.4;
  font-weight: ${theme.typography.weights.light};
`;

/* El Grid le da a esta sección exactamente el inmenso espacio sobrante (el '1fr') */
const VideoSection = styled.section`
  width: 100%;
  height: 100%; /* Llenar la celda del grid */
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Espacio superior nulo para subir el video, y marco ancho a los lados */
  padding: 0 ${theme.spacing.xl} ${theme.spacing.xl}; 
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 0; /* Sin marco en celular, video a cara de perro */
  }
`;

const VideoTourWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1800px; /* Previene excesos ultra-anchos */
  background-color: #000;
  border-radius: ${theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 0 0 50px rgba(0,0,0,0.8);
  position: relative; /* Indispensable para que los videos <video> en position: absolute funcionen */
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    border-radius: 0;
    box-shadow: none;
  }
`;

const VisitaVirtualPage = () => {
  const { t } = useLanguage();

  return (
    <PageContainer>
      <HeaderSection>
        <Title>{t('virtualTour.hero.title')}</Title>
        <Subtitle>{t('virtualTour.hero.subtitle')}</Subtitle>
      </HeaderSection>
      
      <VideoSection>
        <VideoTourWrapper>
           <VideoTourView videoData={videoTourData} />
        </VideoTourWrapper>
      </VideoSection>
    </PageContainer>
  );
};

export default VisitaVirtualPage;

